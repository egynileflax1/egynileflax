import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_OPTIONS,
  createAdminSessionToken,
  getAdminSecret,
} from "@/lib/adminAuth";

const OAUTH_STATE_COOKIE = "egynileflax_oauth_state";
const OAUTH_NEXT_COOKIE = "egynileflax_oauth_next";

function getOrigin(request: Request): string {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || (host?.startsWith("localhost") ? "http" : "https");
  if (host) return `${proto}://${host}`;
  return new URL(request.url).origin;
}

export async function GET(request: Request) {
  const origin = getOrigin(request);
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  if (oauthError || !code || !state) {
    return NextResponse.redirect(`${origin}/admin?error=google_cancelled`);
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value;
  if (!expectedState || expectedState !== state) {
    return NextResponse.redirect(`${origin}/admin?error=invalid_state`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret || !getAdminSecret()) {
    return NextResponse.redirect(`${origin}/admin?error=google_not_configured`);
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${origin}/api/admin/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(`${origin}/admin?error=token_exchange_failed`);
    }

    const tokenData = (await tokenRes.json()) as { access_token?: string };
    if (!tokenData.access_token) {
      return NextResponse.redirect(`${origin}/admin?error=token_exchange_failed`);
    }

    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(`${origin}/admin?error=userinfo_failed`);
    }

    const userInfo = (await userRes.json()) as {
      email?: string;
      email_verified?: boolean;
    };

    const allowedList = (
      process.env.ADMIN_ALLOWED_EMAILS ||
      "egynileflax1@gmail.com,hazemmf3501@gmail.com,hazemyasser991@gmail.com"
    )
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    const email = (userInfo.email || "").toLowerCase();
    if (!userInfo.email_verified || !allowedList.includes(email)) {
      const denied = NextResponse.redirect(`${origin}/admin?error=unauthorized_email`);
      denied.cookies.delete(OAUTH_STATE_COOKIE);
      return denied;
    }

    const rawNext = cookieStore.get(OAUTH_NEXT_COOKIE)?.value || "/admin";
    const safeNext = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/admin";

    const sessionToken = createAdminSessionToken();
    const res = NextResponse.redirect(`${origin}${safeNext}`);
    res.cookies.delete(OAUTH_STATE_COOKIE);
    res.cookies.delete(OAUTH_NEXT_COOKIE);
    res.cookies.set(ADMIN_COOKIE_NAME, sessionToken, ADMIN_COOKIE_OPTIONS);
    return res;
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(`${origin}/admin?error=oauth_failed`);
  }
}
