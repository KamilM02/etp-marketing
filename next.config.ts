import type { NextConfig } from "next";


const isProd = process.env.NODE_ENV === "production";


const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  basePath: isProd ? "/etp-marketing" : "",
  assetPrefix: isProd ? "/etp-marketing/" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};


export default nextConfig;