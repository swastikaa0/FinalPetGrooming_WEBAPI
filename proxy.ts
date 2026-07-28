import { NextRequest, NextResponse } from "next/server";
import { getTokenCookie, getUserData } from "./lib/cookies";

const publicRoutes = ["/login","/register","/forgot-password","/reset-password",
];

const adminRoutes = ["/admin"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getTokenCookie();
  const user = await getUserData();

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && user) {
    const isAdminRoute = adminRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    if (isPublicRoute) {
      if (user.role === "admin") {
        return NextResponse.redirect(
          new URL("/admin/bookings", request.url)
        );
      }

      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",

    "/dashboard/:path*",
    "/bookings/:path*",
    "/pets/:path*",
    "/services/:path*",
    "/payment/:path*",
    "/notification/:path*",
    "/profile/:path*",
    "/password/:path*",
    "/recommendations/:path*",
    "/ai_gemini/:path*",

    "/admin/:path*",
  ],
};