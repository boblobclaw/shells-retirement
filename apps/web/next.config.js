/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@retirement-advisor/database', '@retirement-advisor/types'],
};

module.exports = nextConfig;
