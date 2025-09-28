import axios, { AxiosResponse, ResponseType } from "axios";
import { getSession } from "next-auth/react";
import apiLinks from "./api-links";

interface Options {
  url: ((al: typeof apiLinks) => string) | string;
  data?: object | string;
  params?: object;
  signal?: AbortSignal;
  contentType?: string;
  responseType?: ResponseType;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";

const getToken = async (): Promise<string | undefined> => {
  try {
    const session = await getSession();
    return session?.user.access_token;
  } catch (error) {
    console.error("Failed to get session token:", error);
    return undefined;
  }
};

const request = async <T = unknown>({
  method,
  url,
  data,
  params,
  signal,
  contentType = "application/json",
  responseType = "json",
}: Options & { method: HttpMethod }): Promise<AxiosResponse<T>> => {
  const token = await getToken();

  return axios.request<T>({
    method,
    url: typeof url === "string" ? url : url(apiLinks),
    data,
    params,
    signal,
    responseType,
    headers: {
      "content-type": contentType,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

// Hàm postForm để gửi x-www-form-urlencoded
const postForm = async <T = unknown>({
  url,
  data,
  params,
  signal,
}: Omit<Options, "contentType">): Promise<AxiosResponse<T>> => {
  const token = await getToken();

  const formData = new URLSearchParams();
  if (data && typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }

  return axios.post<T>(
    typeof url === "string" ? url : url(apiLinks),
    formData,
    {
      params,
      signal,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
};

// Hàm postMultipart để gửi multipart/form-data (cho file audio)
const postMultipart = async <T = unknown>({
  url,
  data,
  params,
  signal,
}: Omit<Options, "contentType" | "responseType"> & {
  data: FormData;
}): Promise<AxiosResponse<T>> => {
  const token = await getToken();

  return axios.post<T>(typeof url === "string" ? url : url(apiLinks), data, {
    params,
    signal,
    headers: {
      "content-type": "multipart/form-data",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

// let isRefreshing = false;
// let requestQueue: ((token: string) => void)[] = [];

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     // 🧠 Chỉ xử lý nếu bị CORS (không có response trả về)
//     if (!error.response) {
//       // Nếu đã retry rồi → logout luôn
//       if (originalRequest._retry) {
//         await signOut({ callbackUrl: "/signin" });
//         return Promise.reject(error);
//       }

//       originalRequest._retry = true;

//       // Nếu đang refresh → xếp request vào hàng đợi
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           requestQueue.push((newToken: string) => {
//             originalRequest.headers.Authorization = `Bearer ${newToken}`;
//             resolve(axios(originalRequest));
//           });
//         });
//       }

//       isRefreshing = true;
//       const session = await getSession();
//       const refresh_token = session?.user?.refresh_token;
//       try {
//         if (!refresh_token) throw new Error("No refresh token");

//         const newTokenData = await authService.refreshToken(refresh_token);
//         const result = parseJWT(newTokenData.access_token);

//         // Cập nhật session
//         await fetch("/api/session/update-session", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             user: {
//               access_token: newTokenData.access_token,
//               refresh_token: newTokenData.refresh_token,
//               expiresIn: newTokenData.expires_in,
//               loginDate: new Date().toISOString(),
//               roles: result?.role ?? "",
//               userId: result?.sub ?? "",
//             },
//           }),
//         });

//         // Gọi lại các request đang chờ
//         requestQueue.forEach((cb) => cb(newTokenData.access_token));
//         requestQueue = [];

//         // Gọi lại request gốc
//         originalRequest.headers.Authorization = `Bearer ${newTokenData.access_token}`;
//         return axios(originalRequest);
//       } catch (err) {
//         requestQueue = [];
//         await signOut({ callbackUrl: "/signin" });
//         await authService.removeToken(refresh_token!);
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     // Với các lỗi khác (có response) → không xử lý gì
//     return Promise.reject(error);
//   }
// );

const httpClient = {
  request,
  postForm,
  postMultipart,
  ...(["GET", "POST", "PUT", "DELETE", "OPTIONS"] as const).reduce(
    (acc, method) => {
      acc[method.toLowerCase() as Lowercase<typeof method>] = <T = unknown>(
        options: Options
      ) => request<T>({ ...options, method });
      return acc;
    },
    {} as Record<
      Lowercase<HttpMethod>,
      <T>(options: Options) => Promise<AxiosResponse<T>>
    >
  ),
};

export default httpClient;
