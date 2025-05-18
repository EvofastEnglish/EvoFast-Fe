import { DefaultSession } from "next-auth";

declare module "next-auth" {
  //CUSTOM MODEL SESSION
  interface Session {
    expires: Date;
    user: {
      access_token: string;
      tokenType: string;
      userId: string;
      expiresIn: number;
      userName: string;
      currenNoticeCount: number;
      roles: string;
      refresh_token: string;
    } & DefaultSession["user"];
  }
  // CUSTOM MODEL USER IN NEXT-AUTH
  interface DefaultUser {
    access_token: string;
    tokenType: string;
    userId: string;
    expiresIn: number;
    loginDate: string;
    currenNoticeCount: number;
    roles: string;
    refresh_token: string;
  }
}
// CUSTOM MODEL JWT NEXT-AUTH
declare module "next-auth/jwt" {
  interface DefaultJWT extends Record<string, unknown> {
    access_token: string;
    tokenType: string;
    userId: string;
    expiresIn: number;
    userName: string;
    loginDate: string;
    roles: string;
    refresh_token: string;
  }
}
