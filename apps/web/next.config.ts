import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@vibeline/ui', '@vibeline/utils', '@vibeline/types', '@vibeline/constants'],
  async rewrites() {
    return [
      { source: '/v1/:path*', destination: 'http://127.0.0.1:5001/v1/:path*' }
    ];
  }
};

export default nextConfig;
