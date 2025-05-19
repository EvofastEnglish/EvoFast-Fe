import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  transpilePackages: [
    "rc-util",
    "@ant-design",
    "kitchen-flow-editor",
    "@ant-design/pro-editor",
    "zustand",
    "leva",
    "rc-pagination",
    "rc-picker",
    "antd",
    "@ant-design/icons",
    "@ant-design/icons-svg",
    "rc-tree",
    "rc-table",
  ],
  devIndicators: false,
};

export default nextConfig;

/*
Đây là file cấu hình chính của Next.js.

Dùng để tùy chỉnh hành vi build và chạy của Next.js.

Bạn có thể cấu hình:

Đường dẫn basePath, assetPrefix

Bật/tắt tính năng như React strict mode, image optimization, i18n, rewrites/redirects

Cấu hình Webpack bổ sung nếu cần
*/
