import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — output dir `out/` is deployed to Cloudflare Pages.
  output: "export",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "googleusercontent.com" },
    ],
  },
  // Compress output for faster delivery
  compress: true,
};

export default nextConfig;
