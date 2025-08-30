/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true
  },
  reactStrictMode: true,
  images: { unoptimized: true } // keeps export simple
};
export default nextConfig;