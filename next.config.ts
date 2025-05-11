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
        source: "/articles/:path*",
        destination: "https://api.to-do-domain.com/articles/:path*",
      },
      {
        source: "/auth/:path*",
        destination: "https://api.to-do-domain.com/auth/:path*",
      },
      {
        source: "/comments/:path*",
        destination: "https://api.to-do-domain.com/comments/:path*",
      },
      {
        source: "/products/:path*",
        destination: "https://api.to-do-domain.com/products/:path*",
      },
    ];
  },
};

export default nextConfig;
