import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
       {
        protocol: "https",
        hostname: "static.startuptalky.com",
      },
      {
        protocol: "https",
        hostname: "www.yogaiya.in",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "content.linkedin.com",
      },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "webstrot.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        pathname: "/**",
      },
       
    ],
  },
  /* config options here */
};

export default nextConfig;
