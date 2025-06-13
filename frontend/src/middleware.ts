import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const res = await fetch("http://localhost:8080/api/auth/validate", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
