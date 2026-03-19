import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Turbopack needs an absolute project root. Derive it from this config file
// so the value stays correct regardless of where `next dev` is launched.
const appRoot = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.dirname(appRoot);

const nextConfig: NextConfig = {
  transpilePackages: ["@kesko/ds-react"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "public.keskofiles.com", pathname: "/**" },
      { protocol: "https", hostname: "www.byggmakker.no", pathname: "/**" },
    ],
  },
  turbopack: {
    // In this monorepo `next` is installed/hoisted at the workspace root.
    // Point Turbopack at the workspace root so it can resolve `next/package.json`.
    root: monorepoRoot,
  },
};

export default nextConfig;
