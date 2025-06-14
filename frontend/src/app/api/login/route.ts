import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { name, password } = await req.json();
  const res = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });
  if (!res.ok)
    return NextResponse.json({ message: "Login gagal" }, { status: 401 });
  const { token } = await res.json();
  const nextRes = NextResponse.json({ message: "Login berhasil" });
  cookies().set("auth_token", token, { httpOnly: true, path: "/" });
  return nextRes;
}
