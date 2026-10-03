import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DEMO_PRESET_CATEGORIES,
  DEMO_PRESET_TOOLS,
} from '../../../src/lib/demo-presets';
import { generateCollectionPageSchema } from '../../../src/lib/schema-generator';
import App from '../../../src/App';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://veritas-seo.dev';
  const category = DEMO_PRESET_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found | Veritas SEO',
      description: 'Explore specialized technical SEO tools and diagnostic workflows.',
    };
  }

  const canonicalUrl = category.seo?.canonicalUrl || `${baseUrl}/category/${category.slug}`;

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
      siteName: 'Veritas SEO',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.seo?.twitterTitle || category.name,
      description: category.seo?.twitterDescription || category.description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const baseUrl = 'https://veritas-seo.dev';

  const category = DEMO_PRESET_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const categoryTools = DEMO_PRESET_TOOLS.filter((t) => t.categoryId === category.id);
  const canonicalUrl = category.seo?.canonicalUrl || `${baseUrl}/category/${category.slug}`;

  const collectionSchema = generateCollectionPageSchema(category, categoryTools, canonicalUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <App initialRoute={{ type: 'category', categorySlug: slug }} />
    </>
  );
}
