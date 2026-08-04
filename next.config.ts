import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't pick up a stray
  // package-lock.json from a parent directory.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
