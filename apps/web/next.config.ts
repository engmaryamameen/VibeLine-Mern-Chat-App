import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@vibeline/ui', '@vibeline/utils', '@vibeline/types', '@vibeline/constants']
};

export default nextConfig;
