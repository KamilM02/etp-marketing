import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  basePath: "/event-ticketing-platform",
  trailingSlash: true,
};

export default nextConfig;