const removeImports = require('next-remove-imports')();
module.exports = removeImports({});
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'kumo-thumbnail.s3.ap-northeast-2.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
      },
      {
        source: '/test/:path*',
        destination: `${process.env.NEXT_PUBLIC_TEST_SERVER_URL}/:path*`,
      },
      {
        source: '/svg/:path*',
        destination: `${process.env.NEXT_PUBLIC_S3_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
