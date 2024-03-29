/** @type {import('next').NextConfig} */

/*
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: 'false',
  openAnalyzer: false,
});
*/

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  i18n: {
    locales: ['cs'],
    defaultLocale: 'cs',
    localeDetection: false,
  },
};

module.exports = nextConfig;
//module.exports = { ...nextConfig, ...withBundleAnalyzer({}) };
