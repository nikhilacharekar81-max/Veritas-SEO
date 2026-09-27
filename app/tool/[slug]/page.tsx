import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEMO_PRESET_TOOLS, DEMO_PRESET_CATEGORIES, DEMO_PRESET_SUBCATEGORIES } from '../../../src/lib/demo-presets';
import { generateToolWebApplicationSchema, generateFaqPageSchema, generateBreadcrumbSchema } from '../../../src/lib/schema-generator';
import { PublicToolDetailClient } from './ToolClientComponent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = DEMO_PRESET_TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | Veritas SEO',
      description: 'The requested technical SEO tool could not be found.',
    };
  }

  const canonicalUrl = tool.seo?.canonicalUrl || `https://veritas-seo.dev/tool/${tool.slug}`;

  return {
    title: tool.seo?.metaTitle || `${tool.title} | Veritas SEO`,
    description: tool.seo?.metaDescription || tool.shortSummary,
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
  const tool = DEMO_PRESET_TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const category = DEMO_PRESET_CATEGORIES.find((c) => c.id === tool.categoryId);
  const subCategory = DEMO_PRESET_SUBCATEGORIES.find((s) => s.id === tool.subCategoryId);

  // Generate Google-compliant Schema.org JSON-LD
  const webAppSchema = generateToolWebApplicationSchema(tool);
  const faqSchema = generateFaqPageSchema(tool.faqs || []);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://veritas-seo.dev/' },
    ...(category ? [{ name: category.name, url: `https://veritas-seo.dev/category/${category.slug}` }] : []),
    ...(subCategory && category ? [{ name: subCategory.name, url: `https://veritas-seo.dev/subcategory/${subCategory.slug}` }] : []),
    { name: tool.title, url: `https://veritas-seo.dev/tool/${tool.slug}` },
  ]);

  return (
    <>
      {/* Server-Rendered JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {tool.faqs && tool.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Semantic HTML5 Server Structure */}
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-950 text-slate-100 focus:outline-none">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span className="uppercase tracking-wider">{category?.name || 'SEO Engine'}</span>
              <span>/</span>
              <span>{subCategory?.name || 'Tools'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{tool.title}</h1>
            <p className="mt-3 text-lg text-slate-300 max-w-3xl">{tool.shortSummary}</p>
          </header>

          {/* Isolated Client Component for Interactive Calculator & Controls */}
          <PublicToolDetailClient toolSlug={tool.slug} />
        </article>
      </main>
    </>
  );
}
