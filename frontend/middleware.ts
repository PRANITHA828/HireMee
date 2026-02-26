import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  // 🔒 User NOT logged in → allow ONLY login & register
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔐 User logged in → block login & register
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/homee", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
