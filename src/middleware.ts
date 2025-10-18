import { DefaultJWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse, URLPattern } from "next/server";
import { REFRESH_TOKEN_ERROR } from "./utils/constants";

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

  const isValidToken = token;
  console.log(`==> MIDDLEWARE_ERROR__${token?.error}`);

  if (token?.error === REFRESH_TOKEN_ERROR) {
    const signoutUrl = new URL("/api/auth/signout", origin);
    signoutUrl.searchParams.set("callbackUrl", "/signin");
    return NextResponse.redirect(signoutUrl);
  }

  if (
    (pathname === "/signin" && isValidToken) ||
    (pathname === "/register" && isValidToken)
  ) {
    return NextResponse.redirect(new URL("/", origin));
  }

  if (pathname === "/") {
    if (!isValidToken)
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin`);
    const redirectPath = "/home";
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}${redirectPath}`);
  }

  const matchedRoute = protectedRoutes.find((rule) =>
    rule.pattern.test({ pathname })
  );

  if (matchedRoute) {
    if (!isValidToken)
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|public|api/auth).*)"],
};
