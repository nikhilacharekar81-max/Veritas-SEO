/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: '/serp-pixel-calculator',
        destination: '/tool/serp-pixel-simulator',
        permanent: true,
      },
      {
        source: '/keyword-density-analyzer',
        destination: '/tool/keyword-density-analyzer',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
