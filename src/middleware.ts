import {auth} from "@/lib/auth";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/students") ||
    request.nextUrl.pathname.startsWith("/courses");

  const isAuthRoute = request.nextUrl.pathname.startsWith("/login");

  if (isProtectedRoute && !isLoggedIn) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/students/:path*",
    "/courses/:path*",
    "/login",
    "/",
  ],
};
