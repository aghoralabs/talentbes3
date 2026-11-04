import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
