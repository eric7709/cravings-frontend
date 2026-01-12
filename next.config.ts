import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipbjywutwrfmuvgybjbq.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // 👇 IMPORTANT FIX
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.101:3000",
  ],
};

export default nextConfig;
