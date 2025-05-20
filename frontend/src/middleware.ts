import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = true;
  // // Get auth token from cookies
  // const authToken = request.cookies.get("auth_token")?.value;
  // const isLogin = !!authToken;

  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/campaign/:path*"],
};
