/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com"],
  },
  basePath: '/app',
  pageExtensions: ['jsx'],
};

module.exports = nextConfig;
