import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 모든 외부 도메인 허용 (https)
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://api.to-do-domain.com/:path*",
      },
    ];
  },
};

export default nextConfig;
