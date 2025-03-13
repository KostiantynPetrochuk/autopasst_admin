export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  const userRoles = token.user.roles || [];
  if (!userRoles.includes("admin")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
