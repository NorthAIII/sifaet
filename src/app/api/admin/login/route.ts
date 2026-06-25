import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminPassword } from "@/lib/admin";

export async function POST(request: Request) {
  const pw = getAdminPassword();
  if (!pw) {
    return NextResponse.json(
      { error: "Admin parolası ayarlı değil (ADMIN_PASSWORD)" },
      { status: 503 },
    );
  }

  const { password } = await request.json().catch(() => ({ password: "" }));
  if (password !== pw) {
    return NextResponse.json({ error: "Hatalı parola" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, pw, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 saat
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
