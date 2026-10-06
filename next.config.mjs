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
      {
        source: '/youtube-revenue-calculator',
        destination: '/tool/youtube-revenue-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
