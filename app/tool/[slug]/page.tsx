import React from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { DEMO_PRESET_TOOLS, DEMO_PRESET_CATEGORIES, DEMO_PRESET_SUBCATEGORIES, DEMO_PRESET_REDIRECTS } from '../../../src/lib/demo-presets';
import { generateToolWebApplicationSchema, generateFaqPageSchema, generateBreadcrumbSchema } from '../../../src/lib/schema-generator';
import { PublicToolDetailClient } from './ToolClientComponent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Check if requested slug is an alias in DEMO_PRESET_REDIRECTS
  const redirectRule = DEMO_PRESET_REDIRECTS.find((r) => r.fromPath === `/tool/${slug}`);
  const targetSlug = redirectRule ? redirectRule.toPath.replace('/tool/', '') : slug;
  
  const tool = DEMO_PRESET_TOOLS.find((t) => t.slug === targetSlug);

  if (!tool) {
    return {
      title: 'Tool Not Found | Veritas SEO',
      description: 'The requested technical SEO tool could not be found.',
      robots: {
        index: false,
        follow: false,
      },
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

  if (!tool || tool.status !== 'published' || !tool.isActive) {
    notFound();
  }

  const category = DEMO_PRESET_CATEGORIES.find((c) => c.id === tool.categoryId);
  const subCategory = DEMO_PRESET_SUBCATEGORIES.find((s) => s.id === tool.subCategoryId);
  const canonicalUrl = tool.seo?.canonicalUrl || `https://veritas-seo.dev/tool/${tool.slug}`;

  // Generate Google-compliant Schema.org JSON-LD
  const webAppSchema = generateToolWebApplicationSchema(tool);
  const faqSchema = generateFaqPageSchema(tool.faqs || [], canonicalUrl);
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
          <nav aria-label="Breadcrumb Navigation" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400 font-mono">
              <li>
                <a href="/" className="hover:text-emerald-400 transition-colors">Home</a>
              </li>
              {category && (
                <>
                  <li>/</li>
                  <li>
                    <a href={`/category/${category.slug}`} className="hover:text-emerald-400 transition-colors">
                      {category.name}
                    </a>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-white font-medium" aria-current="page">{tool.title}</li>
            </ol>
          </nav>

          <header className="mb-8 border-b border-slate-800 pb-6">
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

          {/* Server-Rendered FAQ & Educational Guide Section */}
          {tool.faqs && tool.faqs.length > 0 && (
            <section aria-labelledby="faq-heading" className="mt-16 border-t border-slate-800 pt-10">
              <h2 id="faq-heading" className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {tool.faqs.map((faq, idx) => (
                  <details key={idx} className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-white group-open:text-emerald-400">
                      <span>{faq.question}</span>
                      <span className="ml-4 transition group-open:rotate-180">↓</span>
                    </summary>
                    <p className="mt-4 text-slate-300 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
}
