import crypto from "node:crypto";
import { NextResponse } from "next/server";

const OAUTH_STATE_COOKIE = "egynileflax_oauth_state";
const OAUTH_NEXT_COOKIE = "egynileflax_oauth_next";

function getOrigin(request: Request): string {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || (host?.startsWith("localhost") ? "http" : "https");
  if (host) return `${proto}://${host}`;
  return new URL(request.url).origin;
}

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(new URL("/admin?error=google_not_configured", getOrigin(request)));
  }

  const origin = getOrigin(request);
  const reqUrl = new URL(request.url);
  const nextParam = reqUrl.searchParams.get("next") || "/admin";
  const safeNext = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/admin";

  const redirectUri = `${origin}/api/admin/google/callback`;
  const state = crypto.randomBytes(24).toString("base64url");

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("prompt", "select_account");
  authUrl.searchParams.set("state", state);

  const res = NextResponse.redirect(authUrl.toString());
  res.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });
  res.cookies.set(OAUTH_NEXT_COOKIE, safeNext, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return res;
}
