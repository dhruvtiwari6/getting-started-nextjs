import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Skip linting errors during builds (useful for Vercel)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
