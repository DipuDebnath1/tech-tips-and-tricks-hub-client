import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TokenDecode } from "./utils/tokenDecode";

const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("userToken")?.value;

  // Redirect to login if there's no token
  if (!token) {
    console.log(token);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decode the token to get user details
  const user = TokenDecode(token);

  // Redirect to login if token decoding fails
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent authenticated users from accessing /login and /register
  if (authPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Restrict access to /user paths for non-users
  if (pathname.startsWith("/user") && user.role !== "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Restrict access to /admin paths for non-admins
  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to continue if the token and role are valid
  return NextResponse.next();
}

// Matcher configuration with corrected paths
export const config = {
  matcher: ["/", "/admin/:path*", "/user/:path*"],
};
