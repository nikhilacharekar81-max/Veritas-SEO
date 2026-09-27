import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEMO_PRESET_CATEGORIES } from '../../../src/lib/demo-presets';
import { CategoryClientComponent } from './CategoryClientComponent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = DEMO_PRESET_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found | Veritas SEO',
      description: 'The requested category hub could not be found.',
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
  const category = DEMO_PRESET_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-950 text-slate-100 focus:outline-none">
      <CategoryClientComponent categorySlug={category.slug} />
    </main>
  );
}
