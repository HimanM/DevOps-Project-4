import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS && process.env.DEPLOY_AWS !== 'true';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: isGitHubPages ? 'export' : 'standalone',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
