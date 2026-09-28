import React from 'react';
import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
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
import App from '../../../src/App';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const redirectRule = DEMO_PRESET_REDIRECTS.find((r) => r.fromPath === `/tool/${slug}`);
  const targetSlug = redirectRule ? redirectRule.toPath.replace('/tool/', '') : slug;

  const tool = DEMO_PRESET_TOOLS.find((t) => t.slug === targetSlug);

  if (!tool) {
    return {
      title: `${slug.replace(/-/g, ' ')} | Veritas SEO Tool`,
      description: 'Interactive technical SEO calculator and diagnostic tool.',
    };
  }

  const canonicalUrl = tool.seo?.canonicalUrl || `https://veritas-seo.dev/tool/${tool.slug}`;

  return {
    title: tool.seo?.metaTitle || `${tool.title} | Veritas SEO`,
    description: tool.seo?.metaDescription || tool.shortSummary,
    robots: {
      index: tool.seo?.robots ? tool.seo.robots.index : true,
      follow: tool.seo?.robots ? tool.seo.robots.follow : true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: tool.seo?.ogTitle || tool.title,
      description: tool.seo?.ogDescription || tool.shortSummary,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Veritas SEO',
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

  // Server-Side Permanent HTTP Redirect via RedirectRule Model
  const redirectRule = DEMO_PRESET_REDIRECTS.find((r) => r.fromPath === `/tool/${slug}`);
  if (redirectRule) {
    permanentRedirect(redirectRule.toPath);
  }

  const tool = DEMO_PRESET_TOOLS.find((t) => t.slug === slug);
  const category = tool ? DEMO_PRESET_CATEGORIES.find((c) => c.id === tool.categoryId) : undefined;
  const subCategory = tool ? DEMO_PRESET_SUBCATEGORIES.find((s) => s.id === tool.subCategoryId) : undefined;
  const canonicalUrl = tool?.seo?.canonicalUrl || `https://veritas-seo.dev/tool/${slug}`;

  const webAppSchema = tool ? generateToolWebApplicationSchema(tool) : null;
  const faqSchema = tool && tool.faqs?.length ? generateFaqPageSchema(tool.faqs, canonicalUrl) : null;
  const breadcrumbSchema = tool
    ? generateBreadcrumbSchema([
        { name: 'Home', url: 'https://veritas-seo.dev/' },
        ...(category
          ? [{ name: category.name, url: `https://veritas-seo.dev/category/${category.slug}` }]
          : []),
        ...(subCategory && category
          ? [{ name: subCategory.name, url: `https://veritas-seo.dev/subcategory/${subCategory.slug}` }]
          : []),
        { name: tool.title, url: `https://veritas-seo.dev/tool/${tool.slug}` },
      ])
    : null;

  return (
    <>
      {webAppSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      <App initialRoute={{ type: 'tool', toolSlug: slug }} />
    </>
  );
}
