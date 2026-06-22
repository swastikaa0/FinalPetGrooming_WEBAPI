import type { NextConfig } from "next";

const backendURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const IsDEV = backendURL.startsWith("http://localhost");


const nextConfig: NextConfig = {

  /* config options here */
  images: {
    dangerouslyAllowLocalIP: IsDEV,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8089',
        pathname: '/uploads/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // which domain
        port: "",
        pathname: "/**",
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
