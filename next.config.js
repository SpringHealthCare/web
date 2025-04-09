/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['drive.google.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc',
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.externals = [...config.externals, { encoding: 'encoding' }];
    return config;
  },
  experimental: {
    optimizeCss: true
  }
}

module.exports = nextConfig 