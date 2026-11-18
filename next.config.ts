import type { NextConfig } from "next";

// A static site: every page is built to HTML, so it can be served from
// GitHub Pages, any static host, or the Foundation's own domain later.
// NEXT_PUBLIC_BASE_PATH is set only when served from a sub-folder.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
