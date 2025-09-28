import { DefaultJWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse, URLPattern } from "next/server";

interface RouteRule {
  pattern: URLPattern;
  roles?: string[];
}

const protectedRoutes: RouteRule[] = [
  { pattern: new URLPattern({ pathname: "/home" }) },
  { pattern: new URLPattern({ pathname: "/part/:partId*" }) },
  {
    pattern: new URLPattern({
      pathname: "/part/:partId/question/:questionId*",
    }),
  },
  { pattern: new URLPattern({ pathname: "/final-result" }) },
  { pattern: new URLPattern({ pathname: "/ai-test-message" }) },
];

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as DefaultJWT;

  // const isValidToken =
  //   token && isExpiredTimeToken(token.loginDate, token.expiresIn);
  // Redirect từ /signin nếu đã login
  if (pathname === "/signin" && token) {
    return NextResponse.redirect(new URL("/", origin));
  }

  // Redirect từ "/" đến trang phù hợp theo role
  if (pathname === "/") {
    if (!token)
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin`);
    const redirectPath = "/home";
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}${redirectPath}`);
  }

  // Kiểm tra các route bảo vệ
  const matchedRoute = protectedRoutes.find((rule) =>
    rule.pattern.test({ pathname })
  );

  if (matchedRoute) {
    if (!token)
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|public|api/auth).*)"], // tránh apply middleware cho static files
};
