import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  experimental: {
    turbo: {
      rules: {
        font: false, // 👈 disable Turbopack's broken font pipeline
      },
    },
  },
};

export default nextConfig;
