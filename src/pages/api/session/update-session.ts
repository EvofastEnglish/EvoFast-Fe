import { NextApiRequest, NextApiResponse } from "next";
import { encode, DefaultJWT } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { user } = req.body;

  if (!user?.access_token || !user?.expiresIn) {
    return res.status(400).json({ error: "Missing access_token or expiresIn" });
  }

  try {
    const token: DefaultJWT = {
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      expiresIn: user.expiresIn,
      loginDate: user.loginDate,
      roles: user.roles,
      userId: user.userId,
      tokenType: "Bearer",
      userName: "",
    };
    // Tạo lại JWT token mới theo payload cập nhật
    const newToken = await encode({
      secret: secret!,
      token,
    });

    // Gửi cookie mới (giả định đang dùng JWT cookie strategy)
    res.setHeader(
      "Set-Cookie",
      `next-auth.session-token=${newToken}; Path=/; HttpOnly; SameSite=Lax; Secure`
    );

    return res.status(200).json({ message: "Session updated successfully" });
  } catch (error) {
    console.error("Session update error:", error);
    return res.status(500).json({ error: "Failed to update session" });
  }
}
