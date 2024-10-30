import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TokenDecode } from "./utils/tokenDecode";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.cookies.get("userToken")?.value);
  const token = request.cookies.get("userToken")?.value;
  // have not token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const user = TokenDecode(token);
  console.log(request);

  // invalid token
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: "/about/:path*",
  matcher: ["/dashboard", "/profile/:path*"],
};
