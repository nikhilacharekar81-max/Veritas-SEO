import React from 'react';
import type { Metadata } from 'next';
import { permanentRedirect, notFound } from 'next/navigation';
import {
  DEMO_PRESET_TOOLS,
  DEMO_PRESET_CATEGORIES,
  DEMO_PRESET_SUBCATEGORIES,
  DEMO_PRESET_REDIRECTS,
} from '../../../src/lib/demo-presets';
import {
  generateToolWebApplicationSchema,
  generateFaqPageSchema,
  generateBreadcrumbSchema,
} from '../../../src/lib/schema-generator';
import { PublicToolDetailClient } from './ToolClientComponent';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DEMO_PRESET_TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://veritas-seo.dev';

  // Handle redirects server-side
  const redirectRule = DEMO_PRESET_REDIRECTS.find((r) => r.fromPath === `/tool/${slug}`);
  const targetSlug = redirectRule ? redirectRule.toPath.replace('/tool/', '') : slug;

  const tool = DEMO_PRESET_TOOLS.find((t) => t.slug === targetSlug);

  if (!tool) {
    return {
      title: 'Tool Not Found | Veritas SEO',
      description: 'The requested technical SEO tool could not be found.',
    };
  }

  const canonicalUrl = tool.seo?.canonicalUrl || `${baseUrl}/tool/${tool.slug}`;

  return {
    title: tool.seo?.metaTitle || `${tool.title} | Veritas SEO`,
    description: tool.seo?.metaDescription || tool.shortSummary,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: tool.seo?.robots?.index ?? true,
      follow: tool.seo?.robots?.follow ?? true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: tool.seo?.ogTitle || tool.title,
      description: tool.seo?.ogDescription || tool.shortSummary,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Veritas SEO',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seo?.twitterTitle || tool.title,
      description: tool.seo?.twitterDescription || tool.shortSummary,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const baseUrl = 'https://veritas-seo.dev';

  // Server-Side Redirect Logic
  const redirectRule = DEMO_PRESET_REDIRECTS.find((r) => r.fromPath === `/tool/${slug}`);
  if (redirectRule) {
    permanentRedirect(redirectRule.toPath);
  }

  const tool = DEMO_PRESET_TOOLS.find((t) => t.slug === slug);
  if (!tool) {
    notFound();
  }

  const category = DEMO_PRESET_CATEGORIES.find((c) => c.id === tool.categoryId);
  const subCategory = DEMO_PRESET_SUBCATEGORIES.find((s) => s.id === tool.subCategoryId);
  const canonicalUrl = tool.seo?.canonicalUrl || `${baseUrl}/tool/${slug}`;

  // Generate Schemas Server-Side
  const webAppSchema = generateToolWebApplicationSchema(tool);
  const faqSchema = tool.faqs?.length 
    ? generateFaqPageSchema(tool.faqs.map(f => ({ question: f.question, answer: f.answer })), canonicalUrl) 
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    ...(category ? [{ name: category.name, url: `/category/${category.slug}` }] : []),
    ...(subCategory ? [{ name: subCategory.name, url: `/subcategory/${subCategory.slug}` }] : []),
    { name: tool.title, url: `/tool/${tool.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PublicToolDetailClient toolSlug={slug} />
    </>
  );
}
