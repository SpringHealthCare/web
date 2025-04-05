import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**", // Allows all paths under the domain
      },
    ],
  },
};

export default nextConfig;
