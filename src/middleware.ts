import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

interface JwtPayload {
  id: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("accessToken", accessToken);
  let user: JwtPayload | null = null;
  console.log("user1", user);
  if (accessToken) {
    try {
      const decoded = decodeJwt(accessToken);

      if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
        user = decoded as JwtPayload;
        console.log("user2", user);
      }
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
    }
  }

  if (
    user?.id &&
    (pathname.startsWith("/login") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log("user3", user);
  const protectedRoutes = [
    "/items/create",
    "/items/(.*)/edit",
    "/community/create",
    "/community/(.*)/edit",
    "/items/(.*)",
    "/community/(.*)",
  ];

  const isProtected = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace("(.*)", "[^/]+")}$`);
    return regex.test(pathname);
  });

  if (!user?.id && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/items/:path*", "/community/:path*"],
};
