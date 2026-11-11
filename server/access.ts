type AccessConfig = {
  ACCESS_TEAM_DOMAIN: string;
  ACCESS_AUD: string;
  ADMIN_EMAIL_DOMAIN: string;
};
type TokenClaims = {
  iss?: string;
  aud?: string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  email?: string;
  type?: string;
};
type SigningKey = JsonWebKey & { kid?: string };

function decodeBase64(value: string): Uint8Array {
  return Uint8Array.from(
    atob(value.replace(/-/g, "+").replace(/_/g, "/")),
    (character) => character.charCodeAt(0),
  );
}

export async function verifyAccess(
  request: Request,
  config: AccessConfig,
): Promise<string> {
  const issuer = config.ACCESS_TEAM_DOMAIN.replace(/\/$/, "");
  if (
    !/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(issuer) ||
    !config.ACCESS_AUD ||
    !config.ADMIN_EMAIL_DOMAIN
  )
    throw new Error("ACCESS_NOT_CONFIGURED");
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("CF_Authorization="))
    ?.slice("CF_Authorization=".length);
  const token = request.headers.get("cf-access-jwt-assertion") || cookie;
  if (!token || token.length > 16384) throw new Error("UNAUTHORIZED");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("UNAUTHORIZED");
  const header = JSON.parse(
    new TextDecoder().decode(decodeBase64(parts[0])),
  ) as { alg?: string; kid?: string };
  const claims = JSON.parse(
    new TextDecoder().decode(decodeBase64(parts[1])),
  ) as TokenClaims;
  if (header.alg !== "RS256" || typeof header.kid !== "string")
    throw new Error("UNAUTHORIZED");
  const response = await fetch(`${issuer}/cdn-cgi/access/certs`);
  if (!response.ok) throw new Error("ACCESS_UNAVAILABLE");
  const keys = (await response.json()) as { keys: SigningKey[] };
  const jwk = keys.keys.find(
    (key) => key.kid === header.kid && key.kty === "RSA",
  );
  if (!jwk) throw new Error("UNAUTHORIZED");
  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    decodeBase64(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
  );
  const now = Date.now() / 1000;
  if (
    !valid ||
    claims.iss !== issuer ||
    !Array.isArray(claims.aud) ||
    !claims.aud.includes(config.ACCESS_AUD) ||
    typeof claims.exp !== "number" ||
    claims.exp <= now ||
    (claims.nbf !== undefined &&
      (typeof claims.nbf !== "number" || claims.nbf > now + 30)) ||
    (claims.iat !== undefined &&
      (typeof claims.iat !== "number" || claims.iat > now + 30))
  )
    throw new Error("UNAUTHORIZED");
  const email = claims.email?.trim().toLowerCase();
  if (
    !email ||
    !/^[^@\s]+@[^@\s]+$/.test(email) ||
    email.split("@")[1] !== config.ADMIN_EMAIL_DOMAIN.toLowerCase()
  )
    throw new Error("UNAUTHORIZED");
  return email;
}
