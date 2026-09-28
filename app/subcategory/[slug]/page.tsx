import React from 'react';
import type { Metadata } from 'next';
import {
  DEMO_PRESET_CATEGORIES,
  DEMO_PRESET_SUBCATEGORIES,
} from '../../../src/lib/demo-presets';
import App from '../../../src/App';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subCategory = DEMO_PRESET_SUBCATEGORIES.find((s) => s.slug === slug);

  if (!subCategory) {
    return {
      title: `${slug.replace(/-/g, ' ')} Sub-Category Hub | Veritas SEO`,
      description: 'Explore specialized sub-category SEO tools and calculators.',
    };
  }

  const canonicalUrl =
    subCategory.seo?.canonicalUrl || `https://veritas-seo.dev/subcategory/${subCategory.slug}`;

  return {
    title: subCategory.seo?.metaTitle || `${subCategory.name} | Veritas SEO`,
    description: subCategory.seo?.metaDescription || subCategory.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: subCategory.seo?.ogTitle || subCategory.name,
      description: subCategory.seo?.ogDescription || subCategory.description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function SubCategoryPage({ params }: Props) {
  const { slug } = await params;
  const subCategory = DEMO_PRESET_SUBCATEGORIES.find((s) => s.slug === slug);
  const parentCategory = subCategory
    ? DEMO_PRESET_CATEGORIES.find((c) => c.id === subCategory.categoryId)
    : DEMO_PRESET_CATEGORIES[0];

  return (
    <App
      initialRoute={{
        type: 'subcategory',
        categorySlug: parentCategory?.slug || 'on-page-serp',
        subCategorySlug: slug,
      }}
    />
  );
}
