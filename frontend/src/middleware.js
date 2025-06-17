import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/api/auth/login",
    "/api/auth/register",
  ];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  const isAdminPath = pathname.startsWith("/admin");
  const isCampaignPath = pathname.startsWith("/campaign");
  const isDonorPath = pathname.startsWith("/donor");

  if (!token && !isPublicPath) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (token && isPublicPath) {
    return NextResponse.next();
  }

  if (token) {
    if (isAdminPath && !pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    if (isCampaignPath && !pathname.startsWith("/campaign/login")) {
      return NextResponse.next();
    }

    if (isDonorPath && !pathname.startsWith("/donor/login")) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
