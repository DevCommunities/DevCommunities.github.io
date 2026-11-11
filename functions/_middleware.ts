import { verifyAccess } from "../server/access.ts";
import {
  identity,
  logout,
  manageAccount,
  passwordLogin,
  publicAccounts,
  readAccounts,
  reserveLogin,
  sessionCookie,
} from "../server/password-auth.ts";
import {
  imageType,
  readBody,
  readState,
  referencedMedia,
  saveState,
} from "../server/content-store.ts";
import { validateHubContent, type HubContent } from "../src/lib/hub-content.ts";
import { renderEvents, renderPrices } from "../src/lib/hub-render.ts";

type Context = { request: Request; env: Env; next: () => Promise<Response> };
const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};
function json(value: unknown, status = 200): Response {
  return new Response(JSON.stringify(value), { status, headers: jsonHeaders });
}
function redirect(path: string): Response {
  return new Response(null, {
    status: 302,
    headers: {
      Location: path,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
function securePage(response: Response): Response {
  const secured = new Response(response.body, response);
  secured.headers.set("Cache-Control", "private, no-store");
  secured.headers.set("X-Robots-Tag", "noindex, nofollow");
  secured.headers.set("X-Frame-Options", "DENY");
  secured.headers.set("Referrer-Policy", "same-origin");
  secured.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'",
  );
  return secured;
}
async function authBody(
  request: Request,
  origin: string,
): Promise<Record<string, unknown>> {
  if (request.headers.get("origin") !== origin)
    throw new Error("ต้นทางคำขอไม่ถูกต้อง");
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json")
    throw new Error("ต้องส่งข้อมูล JSON");
  return JSON.parse(new TextDecoder().decode(await readBody(request, 4096)));
}

function rewriteHub(response: Response, content: HubContent): Response {
  const { settings, camps, competitions, prices } = content;
  const today = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Bangkok",
  }).format(new Date());
  const currentCamps = camps.filter(
    (event) => event.visible && event.deadline >= today,
  );
  let rewriter = new HTMLRewriter();
  const replacements: Record<string, string> = {
    ".hub-intro h1": settings.heading,
    ".hub-intro p": settings.description,
    "#camps h2": settings.campsHeading,
    "#camps .hub-section-heading p": settings.campsDescription,
    "#camps .hub-month h3": settings.campsMonth,
    "#camps .hub-month > span": `${currentCamps.length} ค่าย`,
    "#competitions h2": settings.competitionsHeading,
    "#competitions .hub-section-heading p": settings.competitionsDescription,
    "#competitions .hub-month h3": settings.competitionsMonth,
    "#competitions .hub-month > span": `${competitions.filter((event) => event.visible).length} รายการ`,
    ".hub-archive-note": settings.competitionNote,
    ".hub-portfolio summary b": `เริ่มต้นประมาณ ${prices.solo.online[0].toLocaleString("en-US")} บาท / ชั่วโมง`,
  };
  for (const [selector, value] of Object.entries(replacements))
    rewriter = rewriter.on(selector, {
      element(element) {
        element.setInnerContent(value);
      },
    });
  rewriter = rewriter
    .on("#camps .hub-events", {
      element(element) {
        element.setInnerContent(
          renderEvents(currentCamps, settings.lineUrl, today),
          { html: true },
        );
      },
    })
    .on("#competitions .hub-events", {
      element(element) {
        element.setInnerContent(
          renderEvents(competitions, settings.lineUrl, today),
          { html: true },
        );
      },
    })
    .on(".hub-banner img", {
      element(element) {
        element.setAttribute("src", settings.banner);
        element.removeAttribute("srcset");
        element.setAttribute("alt", settings.bannerAlt);
        element.setAttribute("width", String(settings.bannerWidth));
        element.setAttribute("height", String(settings.bannerHeight));
      },
    })
    .on("a", {
      element(element) {
        if (element.getAttribute("href") === "https://line.me/R/ti/p/@468httmq")
          element.setAttribute("href", settings.lineUrl);
        const social = element.getAttribute("data-social") as
          keyof typeof settings.socials | null;
        if (social && social in settings.socials)
          element.setAttribute("href", settings.socials[social]);
      },
    });
  for (const type of ["solo", "group"] as const) {
    rewriter = rewriter
      .on(`[data-price-table="${type}"]`, {
        element(element) {
          element.setInnerContent(
            renderPrices(prices[type], type === "group"),
            { html: true },
          );
        },
      })
      .on(`[data-pricing="${type}"] summary b`, {
        element(element) {
          element.setInnerContent(
            `ออนไลน์ ${prices[type].online[0].toLocaleString("en-US")} บาท / ชั่วโมง${type === "group" ? " / คน" : ""}`,
          );
        },
      });
  }
  const result = rewriter.transform(new Response(response.body, response));
  result.headers.set("Cache-Control", "no-store");
  result.headers.delete("ETag");
  result.headers.delete("Content-Length");
  return result;
}

async function handle(context: Context): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "");
  if (path === "/admin/login") {
    if (!["GET", "HEAD"].includes(request.method))
      return json({ error: "Method not allowed" }, 405);
    if (await identity(request, env)) return redirect("/admin/");
    return securePage(await context.next());
  }
  if (path === "/admin/staff") {
    try {
      await verifyAccess(request, env);
      return redirect("/admin/");
    } catch {
      return json({ error: "กรุณาเข้าสู่ระบบด้วยอีเมล @devcommu.org" }, 401);
    }
  }
  if (path === "/api/admin/login") {
    if (request.method !== "POST")
      return json({ error: "Method not allowed" }, 405);
    if (!env.HUB_CONTENT)
      return json({ error: "ยังไม่ได้เชื่อมต่อพื้นที่จัดเก็บ R2" }, 503);
    let body: Record<string, unknown>;
    try {
      body = await authBody(request, url.origin);
    } catch {
      return json(
        { error: "คำขอเข้าสู่ระบบไม่ถูกต้อง" },
        request.headers.get("origin") !== url.origin ? 403 : 400,
      );
    }
    const username =
      typeof body.username === "string"
        ? body.username.trim().toLowerCase()
        : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (username.length > 48 || password.length > 128)
      return json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, 401);
    if (!(await reserveLogin(env.HUB_CONTENT, request, username))) {
      const limited = json(
        { error: "ลองเข้าสู่ระบบหลายครั้งแล้ว กรุณารอ 1 นาที" },
        429,
      );
      limited.headers.set("Retry-After", "60");
      return limited;
    }
    const token = await passwordLogin(env.HUB_CONTENT, username, password);
    if (!token) return json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, 401);
    const response = json({ ok: true });
    response.headers.set("Set-Cookie", sessionCookie(token));
    console.log(JSON.stringify({ event: "admin_password_login", username }));
    return response;
  }
  const admin =
    path === "/admin" ||
    path.startsWith("/admin/") ||
    path.startsWith("/api/admin/");
  const preview =
    path === "/@devcommu" && url.searchParams.get("preview") === "1";
  const user = admin || preview ? await identity(request, env) : null;
  const email = user?.label || null;
  if (admin || preview) {
    if (!user) {
      if (
        (path === "/admin" || path.startsWith("/admin/")) &&
        request.method === "GET"
      )
        return redirect("/admin/login/");
      return json({ error: "กรุณาเข้าสู่ระบบอีกครั้ง" }, 401);
    }
  }
  if (!env.HUB_CONTENT)
    return admin
      ? json({ error: "ยังไม่ได้เชื่อมต่อพื้นที่จัดเก็บ R2" }, 503)
      : context.next();
  if (path === "/admin/accounts" && user?.method !== "staff")
    return redirect("/admin/");

  if (path === "/api/admin/logout") {
    if (request.method !== "POST")
      return json({ error: "Method not allowed" }, 405);
    if (request.headers.get("origin") !== url.origin)
      return json({ error: "ต้นทางคำขอไม่ถูกต้อง" }, 403);
    await logout(request, env.HUB_CONTENT);
    const response = json({
      redirect:
        user?.method === "staff" ? "/cdn-cgi/access/logout" : "/admin/login/",
    });
    response.headers.set("Set-Cookie", sessionCookie("", true));
    return response;
  }
  if (path === "/api/admin/staff/accounts") {
    if (user?.method !== "staff")
      return json(
        { error: "เฉพาะทีม @devcommu.org เท่านั้นที่จัดการบัญชีได้" },
        403,
      );
    if (request.method === "GET")
      return json({
        accounts: publicAccounts((await readAccounts(env.HUB_CONTENT)).data),
      });
    if (request.method !== "POST")
      return json({ error: "Method not allowed" }, 405);
    try {
      const body = await authBody(request, url.origin);
      const result = await manageAccount(
        env.HUB_CONTENT,
        String(body.action),
        String(body.value),
      );
      console.log(
        JSON.stringify({
          event: "admin_account_changed",
          actor: email,
          action: body.action,
          account: body.value,
        }),
      );
      return json(result);
    } catch (error) {
      return json(
        {
          error:
            error instanceof Error ? error.message : "จัดการบัญชีไม่สำเร็จ",
        },
        request.headers.get("origin") !== url.origin ? 403 : 400,
      );
    }
  }

  if (path === "/api/admin/content") {
    const { state, etag } = await readState(env.HUB_CONTENT);
    if (request.method === "GET")
      return json({
        ...state,
        etag,
        email,
        manageUsers: user?.method === "staff",
      });
    if (request.method !== "PUT")
      return json({ error: "Method not allowed" }, 405);
    if (request.headers.get("origin") !== url.origin)
      return json({ error: "ต้นทางคำขอไม่ถูกต้อง" }, 403);
    if (
      request.headers.get("content-type")?.split(";")[0] !== "application/json"
    )
      return json({ error: "ต้องส่งข้อมูล JSON" }, 415);
    const expected = request.headers.get("if-match");
    if (!expected) return json({ error: "โหลดข้อมูลก่อนบันทึก" }, 428);
    if (expected !== etag)
      return json(
        {
          error:
            "มีพนักงานคนอื่นอัปเดตข้อมูลแล้ว กรุณาโหลดข้อมูลล่าสุดก่อนบันทึก",
        },
        409,
      );
    let content: HubContent;
    let action: string;
    try {
      const data = JSON.parse(
        new TextDecoder().decode(await readBody(request, 256 * 1024)),
      );
      action = data.action;
      if (!["draft", "publish"].includes(action))
        throw new Error("เลือกบันทึกร่างหรือเผยแพร่");
      content = validateHubContent(data.content);
    } catch (error) {
      return json(
        { error: error instanceof Error ? error.message : "ตรวจสอบข้อมูล" },
        400,
      );
    }
    // Keep draft and published snapshots in one conditional R2 write.
    const now = new Date().toISOString();
    const next = { ...state, draft: content, updatedAt: now, updatedBy: email };
    if (action === "publish") {
      next.published = content;
      next.publishedAt = now;
    }
    const saved = await saveState(env.HUB_CONTENT, next, expected);
    if (!saved)
      return json(
        { error: "ข้อมูลเปลี่ยนระหว่างบันทึก กรุณาโหลดข้อมูลล่าสุด" },
        409,
      );
    console.log(
      JSON.stringify({
        event: "admin_content_saved",
        action,
        email,
        revision: saved.etag,
      }),
    );
    return json({
      ...next,
      etag: saved.etag,
      email,
      manageUsers: user?.method === "staff",
    });
  }

  if (path === "/api/admin/media") {
    if (request.method !== "POST")
      return json({ error: "Method not allowed" }, 405);
    if (request.headers.get("origin") !== url.origin)
      return json({ error: "ต้นทางคำขอไม่ถูกต้อง" }, 403);
    let bytes: Uint8Array;
    try {
      bytes = await readBody(request, 5 * 1024 * 1024);
    } catch {
      return json({ error: "รูปต้องมีขนาดไม่เกิน 5 MB" }, 413);
    }
    const image = imageType(bytes);
    if (!image || request.headers.get("content-type") !== image.type)
      return json({ error: "ใช้รูป JPEG, PNG หรือ WebP เท่านั้น" }, 415);
    const key = `media/${crypto.randomUUID()}.${image.extension}`;
    await env.HUB_CONTENT.put(key, bytes, {
      httpMetadata: {
        contentType: image.type,
        cacheControl: "public, max-age=31536000, immutable",
      },
    });
    console.log(
      JSON.stringify({
        event: "admin_media_uploaded",
        email,
        key,
        size: bytes.length,
      }),
    );
    return json({ url: `/${key}` }, 201);
  }

  if (path.startsWith("/media/")) {
    if (!["GET", "HEAD"].includes(request.method))
      return new Response(null, { status: 405 });
    if (!/^\/media\/[a-f0-9-]{36}\.(webp|png|jpg)$/.test(path))
      return new Response(null, { status: 404 });
    const { state } = await readState(env.HUB_CONTENT);
    const published = referencedMedia(state.published).has(path);
    if (!published) {
      if (!(await identity(request, env)))
        return new Response(null, { status: 404 });
    }
    const object = await env.HUB_CONTENT.get(path.slice(1));
    if (!object) return new Response(null, { status: 404 });
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("ETag", object.httpEtag);
    headers.set(
      "Cache-Control",
      published ? "public, max-age=31536000, immutable" : "private, no-store",
    );
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Content-Security-Policy", "default-src 'none'; sandbox");
    return new Response(request.method === "HEAD" ? null : object.body, {
      headers,
    });
  }

  if (path === "/api/hub" || path === "/@devcommu") {
    if (!["GET", "HEAD"].includes(request.method))
      return json({ error: "Method not allowed" }, 405);
    const { state } = await readState(env.HUB_CONTENT);
    const content = preview ? state.draft : state.published;
    if (path === "/api/hub") return json({ prices: content.prices });
    const response = await context.next();
    if (
      !response.ok ||
      !response.headers.get("content-type")?.includes("text/html")
    )
      return response;
    const rewritten = rewriteHub(response, content);
    if (preview) {
      rewritten.headers.set("X-Robots-Tag", "noindex, nofollow");
      return new HTMLRewriter()
        .on("body", {
          element(element) {
            element.prepend(
              '<div style="position:sticky;top:0;z-index:100;background:#71334c;color:white;text-align:center;padding:10px;font:14px sans-serif">ตัวอย่างฉบับร่าง ยังไม่เผยแพร่ · <a href="/admin/" style="color:white;text-decoration:underline">กลับไปหน้าแอดมิน</a></div>',
              { html: true },
            );
          },
        })
        .transform(rewritten);
    }
    return rewritten;
  }

  const response = await context.next();
  if (!admin) return response;
  return securePage(response);
}

export async function onRequest(context: Context): Promise<Response> {
  try {
    return await handle(context);
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "content_request_failed",
        path: new URL(context.request.url).pathname,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    );
    return json(
      { error: "บันทึกหรือโหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" },
      503,
    );
  }
}
