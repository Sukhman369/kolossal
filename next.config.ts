import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/store',
        destination: '/collections',
        permanent: true,
      },
      {
        source: '/store/:path*',
        destination: '/collections',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
