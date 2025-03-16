import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  basePath: "/etp-marketing",
  trailingSlash: true,
};

export default nextConfig;