import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    if (
      token &&
      (req.nextUrl.pathname === "/signin" ||
        req.nextUrl.pathname === "/signup" ||
        req.nextUrl.pathname === "/")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const protectedRoutes = [
          "/dashboard",
          "/profile",
          "/settings",
          "/quiz",
        ];

        const isProtected = protectedRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route)
        );

        if (isProtected) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/quiz/:path*",
    "/signin",
    "/signup",
  ],
};