import type { MetadataRoute } from 'next';
import { DEMO_PRESET_CATEGORIES, DEMO_PRESET_TOOLS } from '../src/lib/demo-presets';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://veritas-seo.dev';

  const homeRoute = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  };

  const categoryRoutes = DEMO_PRESET_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(cat.updatedAt || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const toolRoutes = DEMO_PRESET_TOOLS.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date(tool.updatedAt || Date.now()),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [homeRoute, ...categoryRoutes, ...toolRoutes];
}
