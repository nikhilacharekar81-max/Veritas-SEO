import React from 'react';
import type { Metadata } from 'next';
import { DEMO_PRESET_CATEGORIES } from '../../../src/lib/demo-presets';
import App from '../../../src/App';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = DEMO_PRESET_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: `${slug.replace(/-/g, ' ')} Category Hub | Veritas SEO`,
      description: 'Explore specialized technical SEO tools and diagnostic workflows.',
    };
  }

  const canonicalUrl = category.seo?.canonicalUrl || `https://veritas-seo.dev/category/${category.slug}`;

  return {
    title: category.seo?.metaTitle || `${category.name} | Veritas SEO`,
    description: category.seo?.metaDescription || category.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: category.seo?.ogTitle || category.name,
      description: category.seo?.ogDescription || category.description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  return <App initialRoute={{ type: 'category', categorySlug: slug }} />;
}
