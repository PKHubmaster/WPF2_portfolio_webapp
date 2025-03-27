import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable strict mode to match dev behavior
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint errors during build
  },
};

export default nextConfig;
