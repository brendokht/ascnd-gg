import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "localhost" },
      { hostname: "placehold.co" },
    ],
    qualities: [25, 50, 75, 100],
  },
  experimental: {
    browserDebugInfoInTerminal: true,
  },
  typedRoutes: true,
};

export default nextConfig;
