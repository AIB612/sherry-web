import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/s/files/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "www.adobe.com" },
      { protocol: "https", hostname: "resources.jetbrains.com" },
      { protocol: "https", hostname: "www.axure.com" },
      { protocol: "https", hostname: "www.navicat.com" },
      { protocol: "https", hostname: "www.vandyke.com" },
    ],
  },
};

export default nextConfig;
