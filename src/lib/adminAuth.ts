import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "egynileflax_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function getAdminSecret(): string | null {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.GOOGLE_CLIENT_SECRET ||
    process.env.ADMIN_PASSWORD ||
    process.env.B2B_MAIL_PASSWORD ||
    null
  );
}

function timingSafeMatch(aStr: string, bStr: string): boolean {
  const a = Buffer.from(aStr, "utf8");
  const b = Buffer.from(bStr, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function verifyAdminPassword(password: string): boolean {
  const secret = getAdminSecret();
  if (!secret || !password) return false;
  return timingSafeMatch(password, secret);
}

function signPayload(payloadB64: string, secret: string): string {
  return crypto
    .createHmac("sha256", `egynileflax-crm:${secret}`)
    .update(payloadB64)
    .digest("base64url");
}

export function createAdminSessionToken(): string {
  const secret = getAdminSecret();
  if (!secret) {
    throw new Error("ADMIN_PASSWORD or B2B_MAIL_PASSWORD is not configured.");
  }
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payloadB64 = Buffer.from(JSON.stringify({ exp }), "utf8").toString("base64url");
  const sig = signPayload(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  const secret = getAdminSecret();
  if (!secret || !token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;

  const expectedSig = signPayload(payloadB64, secret);
  if (!timingSafeMatch(sig, expectedSig)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8")) as {
      exp?: number;
    };
    return typeof parsed.exp === "number" && parsed.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
