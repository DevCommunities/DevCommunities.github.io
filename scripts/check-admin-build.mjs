import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

for (const path of ["admin", "admin/login", "admin/accounts"]) {
  const html = await readFile(`dist/${path}/index.html`, "utf8");
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
  assert(scripts.length, `${path}: missing application script`);
  for (const [, attributes, body] of scripts) {
    assert(
      /\bsrc="\/_astro\//.test(attributes),
      `${path}: inline script is blocked by the admin CSP`,
    );
    assert.equal(body.trim(), "", `${path}: unexpected inline script body`);
  }
  assert(
    html.includes('name="robots" content="noindex,nofollow"'),
    `${path}: missing noindex`,
  );
  if (path === "admin/login") {
    const form = html.match(/<form\b[^>]*id="password-login"[^>]*>/)?.[0];
    assert(
      form?.includes('method="post"'),
      "Login must never put a password in a query string",
    );
    assert(
      form.includes('action="/api/admin/login"'),
      "Unexpected native login destination",
    );
  }
}
console.log(
  "Admin build checks passed: external scripts, private pages, POST-only login form.",
);
