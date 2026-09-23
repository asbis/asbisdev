import type { NextConfig } from "next";
import path from "node:path";

// next.config.ts is loaded as an ES module, so `__dirname` is not available here;
// next dev/build always run from apps/console, so resolve the monorepo root from cwd.
const monorepoRoot = path.resolve(process.cwd(), "..", "..");

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    // Turbopack's persisted dev cache is not invalidated when `turbopack.root` changes.
    // On 2026-09-07 a stale cache made `next dev` spawn hundreds of postcss workers
    // (67 GB) and take the machine down. The cache saves ~1s per restart on this app,
    // so it stays off. See AGENTS.md "Known issue".
    turbopackFileSystemCacheForDev: false,
  },
  turbopack: {
    // Pin the root: the worktree has its own lockfile and Next otherwise picks the main checkout.
    root: monorepoRoot,
  },
};

export default nextConfig;
