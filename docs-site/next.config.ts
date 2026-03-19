import type { NextConfig } from "next";
import path from "node:path";

const appRoot = process.cwd().endsWith("docs-site")
  ? process.cwd()
  : path.join(process.cwd(), "docs-site");

const nextConfig: NextConfig = {
  transpilePackages: ["@kesko/ds-react"],
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
