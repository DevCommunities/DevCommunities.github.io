import { verifyAccess } from "./access.ts";

export type Identity = { label: string; method: "staff" | "password" };
type Account = {
  id: string;
  username: string;
  salt: string;
  hash: string;
  enabled: boolean;
  version: string;
  createdAt: string;
};
type Registry = { accounts: Account[] };
const accountsKey = "auth/accounts.json";
const cookieName = "__Host-devcommu_admin";
const lifetime = 12 * 60 * 60;
const encoder = new TextEncoder();

function hex(bytes: ArrayBuffer | Uint8Array): string {
  return [...new Uint8Array(bytes)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
function random(bytes = 24): string {
  return btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(bytes))),
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
async function digest(value: string): Promise<string> {
  return hex(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}
async function passwordHash(password: string, salt: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  // Cloudflare's deployed runtime caps each PBKDF2 call at 100,000 iterations.
  // Account passwords are server-generated with 192 bits of random entropy.
  return hex(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-512",
        salt: encoder.encode(salt),
        iterations: 100000,
      },
      key,
      256,
    ),
  );
}
function equal(a: string, b: string): boolean {
  let difference = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++)
    difference |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return difference === 0;
}
function sessionToken(request: Request): string | null {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);
  return token && /^[A-Za-z0-9_-]{43}$/.test(token) ? token : null;
}
export function sessionCookie(token: string, clear = false): string {
  return `${cookieName}=${clear ? "" : token}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${clear ? 0 : lifetime}`;
}
export async function readAccounts(bucket: R2Bucket) {
  const object = await bucket.get(accountsKey);
  const data = object ? await object.json<Registry>() : { accounts: [] };
  if (!Array.isArray(data.accounts) || data.accounts.length > 100)
    throw new Error("INVALID_ACCOUNT_STORE");
  return { data, etag: object?.etag || "new" };
}
async function writeAccounts(bucket: R2Bucket, data: Registry, etag: string) {
  return bucket.put(accountsKey, JSON.stringify(data), {
    onlyIf: etag === "new" ? { etagDoesNotMatch: "*" } : { etagMatches: etag },
    httpMetadata: { contentType: "application/json", cacheControl: "no-store" },
  });
}
export function publicAccounts(data: Registry) {
  return data.accounts.map(({ id, username, enabled, createdAt }) => ({
    id,
    username,
    enabled,
    createdAt,
  }));
}
export async function manageAccount(
  bucket: R2Bucket,
  action: string,
  value: string,
) {
  const { data, etag } = await readAccounts(bucket);
  let account: Account | undefined;
  let password: string | undefined;
  if (action === "create") {
    const username = value.trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9._-]{2,47}$/.test(username))
      throw new Error(
        "ชื่อผู้ใช้ต้องมี 3–48 ตัว ใช้ a–z, 0–9, จุด ขีดกลาง หรือขีดล่าง",
      );
    if (data.accounts.some((a) => a.username === username))
      throw new Error("ชื่อผู้ใช้นี้มีอยู่แล้ว");
    if (data.accounts.length >= 100)
      throw new Error("สร้างบัญชีได้ไม่เกิน 100 บัญชี");
    account = {
      id: crypto.randomUUID(),
      username,
      salt: random(),
      hash: "",
      enabled: true,
      version: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    data.accounts.push(account);
  } else {
    account = data.accounts.find((a) => a.id === value);
    if (!account || !["reset", "disable", "enable"].includes(action))
      throw new Error("ไม่พบบัญชีหรือคำสั่งไม่ถูกต้อง");
    account.version = crypto.randomUUID();
    if (action === "disable") account.enabled = false;
    if (action === "enable") account.enabled = true;
  }
  if (action === "create" || action === "reset") {
    password = random();
    account.salt = random();
    account.hash = await passwordHash(password, account.salt);
  }
  if (!(await writeAccounts(bucket, data, etag)))
    throw new Error("ข้อมูลบัญชีเปลี่ยนแล้ว กรุณาโหลดใหม่");
  return {
    accounts: publicAccounts(data),
    ...(password
      ? { credentials: { username: account.username, password } }
      : {}),
  };
}

// Reserve attempts with a conditional write before doing password work. This
// prevents concurrent requests from bypassing the limits and bounds storage.
export async function reserveLogin(
  bucket: R2Bucket,
  request: Request,
  username: string,
): Promise<boolean> {
  const key = "auth/login-attempts.json";
  const object = await bucket.get(key);
  const now = Date.now();
  type Attempts = {
    until: number;
    total: number;
    ips: Record<string, number>;
    names: Record<string, number>;
  };
  let state = object ? await object.json<Attempts>() : null;
  if (!state || state.until <= now)
    state = { until: now + 60000, total: 0, ips: {}, names: {} };
  const ip = await digest(request.headers.get("cf-connecting-ip") || "local");
  const name = await digest(username);
  if (
    state.total >= 60 ||
    (state.ips[ip] || 0) >= 10 ||
    (state.names[name] || 0) >= 5
  )
    return false;
  state.total++;
  state.ips[ip] = (state.ips[ip] || 0) + 1;
  state.names[name] = (state.names[name] || 0) + 1;
  return !!(await bucket.put(key, JSON.stringify(state), {
    onlyIf: object ? { etagMatches: object.etag } : { etagDoesNotMatch: "*" },
    httpMetadata: { contentType: "application/json", cacheControl: "no-store" },
  }));
}
export async function passwordLogin(
  bucket: R2Bucket,
  username: string,
  password: string,
): Promise<string | null> {
  const { data } = await readAccounts(bucket);
  const account = data.accounts.find((a) => a.username === username);
  const hash = await passwordHash(
    password,
    account?.salt || "unknown-account-password-check",
  );
  if (!account || !account.enabled || !equal(hash, account.hash)) return null;
  const token = random(32);
  await bucket.put(
    `auth/sessions/${await digest(token)}.json`,
    JSON.stringify({
      id: account.id,
      version: account.version,
      expires: Date.now() + lifetime * 1000,
    }),
    {
      httpMetadata: {
        contentType: "application/json",
        cacheControl: "no-store",
      },
    },
  );
  return token;
}
export async function passwordIdentity(
  request: Request,
  bucket: R2Bucket,
): Promise<Identity | null> {
  const token = sessionToken(request);
  if (!token) return null;
  const object = await bucket.get(`auth/sessions/${await digest(token)}.json`);
  if (!object) return null;
  const session = await object.json<{
    id: string;
    version: string;
    expires: number;
  }>();
  if (!Number.isFinite(session.expires) || session.expires <= Date.now()) {
    await bucket.delete(`auth/sessions/${await digest(token)}.json`);
    return null;
  }
  const { data } = await readAccounts(bucket);
  const account = data.accounts.find((a) => a.id === session.id);
  if (!account?.enabled || account.version !== session.version) {
    await bucket.delete(`auth/sessions/${await digest(token)}.json`);
    return null;
  }
  return { label: account.username, method: "password" };
}
export async function identity(
  request: Request,
  env: Env,
): Promise<Identity | null> {
  if (
    request.headers.get("cf-access-jwt-assertion") ||
    request.headers.get("cookie")?.includes("CF_Authorization=")
  ) {
    try {
      return { label: await verifyAccess(request, env), method: "staff" };
    } catch {
      /* A separate contractor session can still be valid. */
    }
  }
  return env.HUB_CONTENT ? passwordIdentity(request, env.HUB_CONTENT) : null;
}
export async function logout(request: Request, bucket: R2Bucket) {
  const token = sessionToken(request);
  if (token) await bucket.delete(`auth/sessions/${await digest(token)}.json`);
}
