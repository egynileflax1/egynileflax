import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminSecret,
  isAdminAuthenticated,
} from "@/lib/adminAuth";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({
    authenticated,
    dbConfigured: Boolean(process.env.DATABASE_URL),
    googleConfigured: Boolean(
      process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && getAdminSecret()
    ),
  });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}
