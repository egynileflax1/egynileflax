import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminSecret,
  getAdminSessionUser,
} from "@/lib/adminAuth";

export async function GET() {
  const user = await getAdminSessionUser();
  const allowedList = (
    process.env.ADMIN_ALLOWED_EMAILS ||
    "egynileflax1@gmail.com,hazemmf3501@gmail.com,hazemyasser991@gmail.com"
  )
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return NextResponse.json({
    authenticated: Boolean(user),
    adminEmail: user?.email || "",
    adminName: user?.name || "",
    allowedAdmins: allowedList,
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
