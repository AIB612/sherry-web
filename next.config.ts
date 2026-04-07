import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 👈 核心修改 1：开启静态导出模式，生成 out 文件夹
  output: 'export', 
  
  // 👈 核心修改 2：静态导出不支持 Image Optimization，必须关闭
  images: {
    unoptimized: true,
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
  
  /* 注意：由于开启了 output: 'export'，
     原有的 ppr: true 和 useCache: true 会导致构建失败，
     因为它们需要动态服务器环境，所以在此模式下必须移除。
  */
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;