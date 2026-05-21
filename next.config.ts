import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tartai-test-3.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
