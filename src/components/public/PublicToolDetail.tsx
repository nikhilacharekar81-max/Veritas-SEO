import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import { Breadcrumbs } from './Breadcrumbs';
import { ToolEngineDispatcher } from '../tools/ToolEngineDispatcher';
import { IconRenderer } from '../ui/IconRenderer';
import { ToolCard } from './ToolCard';
import {
  generateToolWebApplicationSchema,
  generateFaqPageSchema,
} from '../../lib/schema-generator';
import {
  BookOpen,
  Sparkles,
  HelpCircle,
  Code2,
  ChevronDown,
  CheckCircle2,
  Share2,
  Info,
  Layers,
  Wrench,
  Eye,
} from 'lucide-react';

interface Props {
  toolSlug: string;
  onNavigateHome: () => void;
  onNavigateCategory: (slug: string) => void;
  onNavigateSubCategory: (catSlug: string, subSlug: string) => void;
  onNavigateTool: (slug: string) => void;
}

export const PublicToolDetail: React.FC<Props> = ({
  toolSlug,
  onNavigateHome,
  onNavigateCategory,
  onNavigateSubCategory,
  onNavigateTool,
}) => {
  const { publicCategories, publicSubCategories, publicTools, trackToolUsage } = useCms();
  const [activeEduTab, setActiveEduTab] = useState<'how' | 'formula' | 'steps'>('how');
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({ f1: true, faq_1: true });
  const [showMetaInspector, setShowMetaInspector] = useState(false);

  const tool = publicTools.find((t) => t.slug === toolSlug);

  // Track tool engagement event on mount
  React.useEffect(() => {
    if (tool) {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const device = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
      trackToolUsage(
        tool.id,
        tool.title,
        tool.engineType,
        Math.floor(250 + Math.random() * 400),
        device,
        tool.seo?.focusKeyword || undefined
      );
    }
  }, [tool?.id]);

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">SEO Tool Not Found or Unpublished</h2>
        <p className="text-xs text-slate-500">
          This SEO tool is not available in the public registry.
        </p>
        <button
          type="button"
          onClick={onNavigateHome}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
        >
          Return to Tools Directory
        </button>
      </div>
    );
  }

  const category = publicCategories.find((c) => c.id === tool.categoryId);
  const subCategory = publicSubCategories.find((s) => s.id === tool.subCategoryId);

  // Related tools
  const relatedTools = publicTools
    .filter((t) => t.id !== tool.id && t.categoryId === tool.categoryId)
    .slice(0, 3);

  // Build Breadcrumbs
  const breadcrumbs = [{ label: 'Home', url: '/' }];
  if (category) {
    breadcrumbs.push({ label: category.name, url: `/category/${category.slug}` });
  }
  if (category && subCategory) {
    breadcrumbs.push({ label: subCategory.name, url: `/subcategory/${subCategory.slug}` });
  }
  breadcrumbs.push({ label: tool.title, url: `/tool/${tool.slug}` });

  // Googlebot JSON-LD Schemas
  const webAppSchema = generateToolWebApplicationSchema(tool, category, subCategory);
  const faqSchema = generateFaqPageSchema(tool.faqs || [], `https://veritas-seo.dev/tool/${tool.slug}`);

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-10">
      {/* 1. Googlebot schema-dts JSON-LD injection */}
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

      {/* Semantic Breadcrumbs */}
      <Breadcrumbs
        items={breadcrumbs}
        onNavigate={(url) => {
          if (url === '/') onNavigateHome();
          else if (url.startsWith('/category/') && category) onNavigateCategory(category.slug);
          else if (url.startsWith('/subcategory/') && category && subCategory)
            onNavigateSubCategory(category.slug, subCategory.slug);
        }}
      />

      {/* Tool Header Section */}
      <header className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <IconRenderer name={tool.icon} className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {tool.badge !== 'None' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 font-mono">
                    {tool.badge}
                  </span>
                )}
                <span className="text-[11px] font-mono text-slate-400">Engine: {tool.engineType}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                {tool.title}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMetaInspector(true)}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Inspect Live On-Page SEO &amp; Schemas
          </button>
        </div>

        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {tool.shortSummary}
        </p>
      </header>

      {/* PRIMARY INTERACTIVE TOOL ENGINE */}
      <main aria-label="Interactive SEO Tool Execution Canvas">
        <section aria-labelledby="tool-execution-heading" className="space-y-4">
          <h2 id="tool-execution-heading" className="sr-only">
            Interactive Tool Engine
          </h2>
          <ToolEngineDispatcher tool={tool} />
        </section>
      </main>

      {/* EDUCATIONAL METHODOLOGY & DOCUMENTATION SECTION */}
      {tool.educationalContent && (
        <section aria-labelledby="educational-guide-heading" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2 id="educational-guide-heading" className="text-lg font-bold text-slate-900">
                Technical Execution Guide &amp; Formula Methodology
              </h2>
            </div>

            {/* Tabs */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveEduTab('how')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeEduTab === 'how' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                How It Works
              </button>
              <button
                type="button"
                onClick={() => setActiveEduTab('formula')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeEduTab === 'formula' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Mathematical Methodology
              </button>
              <button
                type="button"
                onClick={() => setActiveEduTab('steps')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeEduTab === 'steps' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Step-by-Step Tutorial
              </button>
            </div>
          </div>

          <div className="text-sm text-slate-700 leading-relaxed">
            {activeEduTab === 'how' && (
              <p className="whitespace-pre-line">
                {tool.educationalContent.howItWorks ||
                  'This diagnostic engine executes real-time mathematical validation against Google Chromium rendering benchmarks and Schema.org specifications.'}
              </p>
            )}

            {activeEduTab === 'formula' && (
              <div className="space-y-3">
                <p className="whitespace-pre-line">
                  {tool.educationalContent.formulaMethodology ||
                    'Calculations rely on Decimal.js arbitrary-precision floating point arithmetic to guarantee zero cumulative rounding errors.'}
                </p>
              </div>
            )}

            {activeEduTab === 'steps' && (
              <div className="space-y-4">
                {tool.educationalContent.stepByStepGuide?.map((step, idx) => (
                  <div key={step.id || idx} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-sm">{step.stepTitle}</h3>
                      <p className="text-xs text-slate-600">{step.stepDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* DYNAMIC FAQ ACCORDION SECTION (Google FAQPage Schema compliant) */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section aria-labelledby="faqs-heading" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 id="faqs-heading" className="text-lg font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500">
                Indexed directly into Google search snippets via Schema.org FAQPage markup.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {tool.faqs.map((faq, idx) => {
              const isOpen = expandedFaqs[faq.id] || expandedFaqs[`faq_${idx + 1}`];

              return (
                <div key={faq.id || idx} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-slate-900' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-slate-600 border-t border-slate-100 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* RELATED TOOLS IN CATEGORY */}
      {relatedTools.length > 0 && (
        <section aria-labelledby="related-tools-heading" className="space-y-4 pt-4">
          <h2 id="related-tools-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Related SEO Tools in {category?.name || 'Category'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} onSelect={onNavigateTool} />
            ))}
          </div>
        </section>
      )}

      {/* LIVE ON-PAGE META & SCHEMA INSPECTOR MODAL */}
      {showMetaInspector && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Live On-Page SEO &amp; Schema Inspector</h3>
                <p className="text-xs text-slate-500">
                  Exact meta tags and Schema.org JSON-LD scripts rendered for Googlebot.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMetaInspector(false)}
                className="px-3 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs text-slate-800">
              <div className="space-y-1">
                <span className="font-bold text-slate-500 block uppercase tracking-wider text-[11px]">
                  HTML &lt;head&gt; Meta Elements
                </span>
                <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed">
                  <code>{`<title>${tool.seo.metaTitle || tool.title}</title>
<meta name="description" content="${tool.seo.metaDescription || tool.shortSummary}" />
<link rel="canonical" href="${tool.seo.canonicalUrl || `https://veritas-seo.dev/tool/${tool.slug}`}" />
<meta name="robots" content="${[
                    tool.seo.robots.index ? 'index' : 'noindex',
                    tool.seo.robots.follow ? 'follow' : 'nofollow',
                    `max-image-preview:${tool.seo.robots.maxImagePreview}`,
                  ].join(', ')}" />`}</code>
                </pre>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-500 block uppercase tracking-wider text-[11px]">
                  WebApplication JSON-LD Schema
                </span>
                <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed max-h-48">
                  <code>{JSON.stringify(webAppSchema, null, 2)}</code>
                </pre>
              </div>

              {faqSchema && (
                <div className="space-y-1">
                  <span className="font-bold text-slate-500 block uppercase tracking-wider text-[11px]">
                    FAQPage JSON-LD Schema
                  </span>
                  <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed max-h-48">
                    <code>{JSON.stringify(faqSchema, null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
