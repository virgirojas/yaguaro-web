import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yaguaro.ar",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
