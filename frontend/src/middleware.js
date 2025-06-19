import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/api/auth/login",
    "/api/auth/register",
  ];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (!token && !isPublicPath) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login/admin", request.url));
    }
    if (pathname.startsWith("/campaign")) {
      return NextResponse.redirect(new URL("/login/campaign", request.url));
    }
    if (pathname.startsWith("/donor")) {
      return NextResponse.redirect(new URL("/login/donor", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    if (pathname.startsWith("/admin")) {
      if (!pathname.startsWith("/admin/login")) {
        return NextResponse.redirect(new URL("/login/admin", request.url));
      }
    }

    if (pathname.startsWith("/campaign")) {
      if (!pathname.startsWith("/campaign/login")) {
        return NextResponse.redirect(new URL("/login/campaign", request.url));
      }
    }

    if (pathname.startsWith("/donor")) {
      if (!pathname.startsWith("/donor/login")) {
        return NextResponse.redirect(new URL("/login/donor", request.url));
      }
    }

    if (isPublicPath && pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
