import authService from "@/services/user";
import { parseJWT } from "@/utils/helpers";
import moment from "moment";
import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const response = await authService.login(
          credentials.username,
          credentials.password
        );
        const result = parseJWT(response.access_token);
        if (result) {
          const user = {
            userId: result.sub,
            access_token: response.access_token,
            roles: result.role,
            expiresIn: response.expires_in,
            loginDate: moment().format(),
            refresh_token: response.refresh_token,
          } as User;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.roles = user.roles;
        token.userId = user.userId;
        token.expiresIn = user.expiresIn;
        token.loginDate = user.loginDate;
        token.refresh_token = user.refresh_token;
      }

      const loginDate = moment(token.loginDate);
      const expireAt = loginDate.clone().add(token.expiresIn, "seconds");
      const expired = expireAt.isBefore(moment());

      // console.log(`loginDate value: ${loginDate}`);
      // console.log(`expireAt value: ${expireAt}`);

      if (expired) {
        // console.log(`Start refresh token ${expired}`);
        return await refreshAccessToken(token);
      }
      console.log(`token hiện tại ${JSON.stringify(token, null, 2)}`);

      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.expires = moment().add(token.expiresIn, "seconds").toDate();
        session.user.access_token = token.access_token;
        session.user.roles = token.roles;
        session.user.userId = token.userId;
        session.user.refresh_token = token.refresh_token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

async function refreshAccessToken(token: JWT) {
  try {
    const response = await authService.refreshToken(token.refresh_token);
    const result = parseJWT(response.access_token);
    // console.log(`refresh thành công ${JSON.stringify(response, null, 2)}`);

    return {
      ...token,
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      expiresIn: response.expires_in,
      loginDate: moment().format(),
      roles: result?.role ?? "",
      userId: result?.sub ?? "",
    };
  } catch (error) {
    console.error("Lỗi khi refresh token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
