import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DEMO_PRESET_CATEGORIES,
  DEMO_PRESET_SUBCATEGORIES,
  DEMO_PRESET_TOOLS,
} from '../../../src/lib/demo-presets';
import { generateCollectionPageSchema } from '../../../src/lib/schema-generator';
import { PublicSubCategoryHub } from '../../../src/components/public/PublicSubCategoryHub';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://veritas-seo.dev';
  const subCategory = DEMO_PRESET_SUBCATEGORIES.find((s) => s.slug === slug);

  if (!subCategory) {
    return {
      title: 'Sub-Category Not Found | Veritas SEO',
      description: 'Explore specialized sub-category SEO tools and calculators.',
    };
  }

  const canonicalUrl = subCategory.seo?.canonicalUrl || `${baseUrl}/subcategory/${subCategory.slug}`;

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
      siteName: 'Veritas SEO',
    },
    twitter: {
      card: 'summary_large_image',
      title: subCategory.seo?.twitterTitle || subCategory.name,
      description: subCategory.seo?.twitterDescription || subCategory.description,
    },
  };
}

export default async function SubCategoryPage({ params }: Props) {
  const { slug } = await params;
  const baseUrl = 'https://veritas-seo.dev';

  const subCategory = DEMO_PRESET_SUBCATEGORIES.find((s) => s.slug === slug);
  if (!subCategory) {
    notFound();
  }

  const parentCategory = DEMO_PRESET_CATEGORIES.find((c) => c.id === subCategory.categoryId);
  const subCategoryTools = DEMO_PRESET_TOOLS.filter((t) => t.subCategoryId === subCategory.id);
  const canonicalUrl = subCategory.seo?.canonicalUrl || `${baseUrl}/subcategory/${slug}`;

  const collectionSchema = generateCollectionPageSchema(subCategory, subCategoryTools, canonicalUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <PublicSubCategoryHub
        categorySlug={parentCategory?.slug || 'on-page-serp'}
        subCategorySlug={slug}
      />
    </>
  );
}
