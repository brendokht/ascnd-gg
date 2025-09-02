import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "workoscdn.com" }],
  },
  experimental: {
    browserDebugInfoInTerminal: true,
  },
  typedRoutes: true,
};

export default nextConfig;
