import { LoginResponse } from "@/model/user";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await httpClient.postForm<LoginResponse>({
    url: apiLinks.user.login,
    data: {
      username,
      password,
      grant_type: "password",
      client_id: "m2m.client",
      client_secret: "ClientSecret1",
    },
  });
  return response.data;
};

const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
  const response = await httpClient.postForm<LoginResponse>({
    url: apiLinks.user.refreshToken,
    data: {
      refresh_token: refreshToken,
      client_id: "m2m.client",
      client_secret: "ClientSecret1",
      grant_type: "refresh_token",
    },
  });
  return response.data;
};

const removeToken = async (refreshToken: string): Promise<LoginResponse> => {
  const response = await httpClient.postForm<LoginResponse>({
    url: apiLinks.user.refreshToken,
    data: {
      token: refreshToken,
      client_id: "m2m.client",
      client_secret: "ClientSecret1",
    },
  });
  return response.data;
};

const authService = {
  login,
  refreshToken,
  removeToken,
};

export default authService;
