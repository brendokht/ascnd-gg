import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "localhost", port: "9000", protocol: "http" },
      { hostname: "placehold.co" },
    ],
    qualities: [25, 50, 75, 100],
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
  experimental: {
    browserDebugInfoInTerminal: true,
  },
  typedRoutes: true,
};

export default nextConfig;
