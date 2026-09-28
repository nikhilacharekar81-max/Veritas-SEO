/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
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
        source: '/schema-jsonld-generator',
        destination: '/tool/schema-jsonld-builder',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
