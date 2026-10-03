import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://veritas-seo.dev';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/private/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
