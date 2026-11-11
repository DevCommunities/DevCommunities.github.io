import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultHubContent,
  validateHubContent,
} from "../src/lib/hub-content.ts";
import { renderEvents } from "../src/lib/hub-render.ts";
import { verifyAccess } from "../server/access.ts";
import { readState, saveState, imageType } from "../server/content-store.ts";
import { onRequest } from "../functions/_middleware.ts";

const config = {
  ACCESS_TEAM_DOMAIN: "https://devcommu-test.cloudflareaccess.com",
  ACCESS_AUD: "test-application",
  ADMIN_EMAIL_DOMAIN: "devcommu.org",
};
const pair = await crypto.subtle.generateKey(
  {
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true,
  ["sign", "verify"],
);
const publicKey = {
  ...(await crypto.subtle.exportKey("jwk", pair.publicKey)),
  kid: "test-key",
};
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input) => {
  if (String(input) === `${config.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`)
    return Response.json({ keys: [publicKey] });
  throw new Error("Unexpected network request during test");
};
test.after(() => {
  globalThis.fetch = originalFetch;
});

async function token(overrides = {}) {
  const header = Buffer.from(
    JSON.stringify({ alg: "RS256", kid: "test-key" }),
  ).toString("base64url");
  const claims = {
    iss: config.ACCESS_TEAM_DOMAIN,
    aud: [config.ACCESS_AUD],
    exp: Math.floor(Date.now() / 1000) + 600,
    email: "staff@devcommu.org",
    ...overrides,
  };
  const body = `${header}.${Buffer.from(JSON.stringify(claims)).toString("base64url")}`;
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    pair.privateKey,
    new TextEncoder().encode(body),
  );
  return `${body}.${Buffer.from(signature).toString("base64url")}`;
}

class Bucket {
  entries = new Map();
  revision = 0;
  async get(key) {
    const item = this.entries.get(key);
    if (!item) return null;
    return {
      etag: item.etag,
      httpEtag: `"${item.etag}"`,
      json: async () => JSON.parse(item.body),
      body: item.body,
      writeHttpMetadata: (headers) => {
        if (item.type) headers.set("content-type", item.type);
      },
    };
  }
  async put(key, body, options = {}) {
    const current = this.entries.get(key);
    const condition = options.onlyIf;
    if (condition?.etagMatches && current?.etag !== condition.etagMatches)
      return null;
    if (condition?.etagDoesNotMatch === "*" && current) return null;
    const etag = String(++this.revision);
    this.entries.set(key, {
      body,
      etag,
      type: options.httpMetadata?.contentType,
    });
    return { etag };
  }
}

async function api(bucket, path, options = {}) {
  const headers = new Headers(options.headers);
  if (!headers.has("cf-access-jwt-assertion"))
    headers.set("cf-access-jwt-assertion", await token());
  return onRequest({
    request: new Request(`https://devcommu.org${path}`, {
      ...options,
      headers,
    }),
    env: { ...config, HUB_CONTENT: bucket },
    next: async () => new Response("static asset"),
  });
}

test("staff identity requires a valid signature, expiry, issuer, audience, and exact email domain", async () => {
  assert.equal(
    await verifyAccess(
      new Request("https://devcommu.org/admin", {
        headers: { "cf-access-jwt-assertion": await token() },
      }),
      config,
    ),
    "staff@devcommu.org",
  );
  for (const claims of [
    { email: "attacker@devcommu.org.example.com" },
    { email: "attacker@example.com" },
    { exp: 1 },
    { aud: ["another-app"] },
    { iss: "https://another.cloudflareaccess.com" },
  ]) {
    await assert.rejects(() =>
      verifyAccess(
        new Request("https://devcommu.org/admin", {
          headers: { "cf-access-jwt-assertion": "" },
        }),
        config,
      ),
    );
    const invalid = await token(claims);
    await assert.rejects(() =>
      verifyAccess(
        new Request("https://devcommu.org/admin", {
          headers: { "cf-access-jwt-assertion": invalid },
        }),
        config,
      ),
    );
  }
  const valid = await token();
  const tampered = valid.replace("eyJ", "eyK");
  await assert.rejects(() =>
    verifyAccess(
      new Request("https://devcommu.org/admin", {
        headers: { "cf-access-jwt-assertion": tampered },
      }),
      config,
    ),
  );
});

test("missing Access configuration fails closed", async () => {
  const response = await onRequest({
    request: new Request("https://devcommu.org/api/admin/content"),
    env: { ...config, ACCESS_AUD: "", HUB_CONTENT: new Bucket() },
    next: async () => new Response("unsafe"),
  });
  assert.equal(response.status, 503);
});

test("Access cookie authenticates draft preview and image requests", async () => {
  const jwt = await token();
  assert.equal(
    await verifyAccess(
      new Request("https://devcommu.org/media/test", {
        headers: { cookie: `CF_Authorization=${jwt}` },
      }),
      config,
    ),
    "staff@devcommu.org",
  );
});

test("validation rejects unsafe links, duplicate IDs, invalid dates, and invalid prices", () => {
  for (const mutate of [
    (content) => {
      content.settings.lineUrl = "javascript:alert(1)";
    },
    (content) => {
      content.camps.push(content.camps[0]);
    },
    (content) => {
      content.camps[0].deadline = "2026-02-30";
    },
    (content) => {
      content.prices.solo.online[0] = -1;
    },
    (content) => {
      content.settings.banner = "//attacker.example/image.svg";
    },
  ]) {
    const content = structuredClone(defaultHubContent);
    mutate(content);
    assert.throws(() => validateHubContent(content));
  }
});

test("rendered staff text is escaped and expired signups are omitted", () => {
  const event = structuredClone(defaultHubContent.camps[0]);
  event.title = '<script>alert("x")</script>';
  const html = renderEvents(
    [event],
    defaultHubContent.settings.lineUrl,
    "2026-11-21",
  );
  assert(!html.includes("<script>"));
  assert(html.includes("&lt;script&gt;"));
  assert(!html.includes("data-event-signup"));
});

test("draft saves preserve public content, publish replaces it atomically", async () => {
  const bucket = new Bucket();
  const content = structuredClone(defaultHubContent);
  content.settings.heading = "Updated draft";
  const save = await api(bucket, "/api/admin/content", {
    method: "PUT",
    headers: {
      origin: "https://devcommu.org",
      "content-type": "application/json",
      "if-match": "new",
    },
    body: JSON.stringify({ action: "draft", content }),
  });
  assert.equal(save.status, 200);
  const draft = await save.json();
  assert.equal(draft.draft.settings.heading, "Updated draft");
  assert.notEqual(draft.published.settings.heading, "Updated draft");
  const publish = await api(bucket, "/api/admin/content", {
    method: "PUT",
    headers: {
      origin: "https://devcommu.org",
      "content-type": "application/json",
      "if-match": draft.etag,
    },
    body: JSON.stringify({ action: "publish", content }),
  });
  assert.equal(publish.status, 200);
  assert.equal(
    (await readState(bucket)).state.published.settings.heading,
    "Updated draft",
  );
});

test("concurrent first writes and stale revisions cannot overwrite content", async () => {
  const bucket = new Bucket();
  const { state } = await readState(bucket);
  const results = await Promise.all([
    saveState(bucket, state, "new"),
    saveState(bucket, state, "new"),
  ]);
  assert.equal(results.filter(Boolean).length, 1);
  assert.equal(await saveState(bucket, state, "new"), null);
  const stale = await api(bucket, "/api/admin/content", {
    method: "PUT",
    headers: {
      origin: "https://devcommu.org",
      "content-type": "application/json",
      "if-match": "new",
    },
    body: JSON.stringify({ action: "publish", content: defaultHubContent }),
  });
  assert.equal(stale.status, 409);
});

test("cross-origin writes are rejected and SVG uploads are rejected", async () => {
  const bucket = new Bucket();
  const csrf = await api(bucket, "/api/admin/content", {
    method: "PUT",
    headers: { origin: "https://attacker.example" },
    body: "{}",
  });
  assert.equal(csrf.status, 403);
  const svg = await api(bucket, "/api/admin/media", {
    method: "POST",
    headers: {
      origin: "https://devcommu.org",
      "content-type": "image/svg+xml",
    },
    body: '<svg onload="alert(1)"></svg>',
  });
  assert.equal(svg.status, 415);
  assert.equal(
    imageType(new TextEncoder().encode("<script>bad</script>")),
    null,
  );
});

test("unpublished uploaded images are private until referenced by published content", async () => {
  const bucket = new Bucket();
  const bytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0]);
  const upload = await api(bucket, "/api/admin/media", {
    method: "POST",
    headers: { origin: "https://devcommu.org", "content-type": "image/png" },
    body: bytes,
  });
  assert.equal(upload.status, 201);
  const { url } = await upload.json();
  const anonymous = await onRequest({
    request: new Request(`https://devcommu.org${url}`),
    env: { ...config, HUB_CONTENT: bucket },
    next: async () => new Response("static"),
  });
  assert.equal(anonymous.status, 404);
  const authenticated = await api(bucket, url);
  assert.equal(authenticated.status, 200);
  assert.equal(authenticated.headers.get("cache-control"), "private, no-store");
});
