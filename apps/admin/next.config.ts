import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@vibeline/ui', '@vibeline/utils', '@vibeline/types']
};

export default nextConfig;
