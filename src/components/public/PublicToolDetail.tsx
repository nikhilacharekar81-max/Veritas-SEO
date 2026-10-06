import React, { useState } from 'react';
import Link from 'next/link';
import { useCms } from '../../lib/store';
import { Breadcrumbs } from './Breadcrumbs';
import { ToolEngineDispatcher } from '../tools/ToolEngineDispatcher';
import { SerpPixelSimulatorGuide } from '../tools/SerpPixelSimulatorGuide';
import { AnalyzerGuide } from '../tools/AnalyzerGuide';
import { SchemaJsonLdBuilderGuide } from '../tools/SchemaJsonLdBuilderGuide';
import { IconRenderer } from '../ui/IconRenderer';
import { ToolCard } from './ToolCard';
import { EditableText } from './EditableText';
import { generateId, normalizeRichHtml } from '../../lib/utils';
import { ensureToolSections } from '../../lib/tool-sections';
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
  Plus,
} from 'lucide-react';

interface Props {
  toolSlug: string;
  onNavigateHome?: () => void;
  onNavigateCategory?: (slug: string) => void;
  onNavigateSubCategory?: (catSlug: string, subSlug: string) => void;
  onNavigateTool?: (slug: string) => void;
}

export const PublicToolDetail: React.FC<Props> = ({
  toolSlug,
}) => {
  const {
    publicCategories,
    publicSubCategories,
    publicTools,
    trackToolUsage,
    updateTool,
    isFrontendEditMode,
  } = useCms();
  const [activeEduTab, setActiveEduTab] = useState<'how' | 'formula' | 'steps'>('how');
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({
    f1: true,
    faq_1: true,
    faq_2: true,
    faq_3: true,
  });
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
        <Link
          href="/"
          className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
        >
          Return to Tools Directory
        </Link>
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

  // Debug schemas for Inspector Modal UI
  const webAppSchema = generateToolWebApplicationSchema(tool, category, subCategory);
  const faqSchema = generateFaqPageSchema(tool.faqs || [], `https://veritas-seo.dev/tool/${tool.slug}`);

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-10">
      {/* Semantic Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* DYNAMIC MODULAR SECTIONS (Ordered & Toggleable from Content Manager) */}
      {ensureToolSections(tool)
        .filter((sec) => sec.isEnabled !== false)
        .map((section) => {
          if (section.type === 'hero_header') {
            return (
              <header
                key={section.id}
                className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4"
              >
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
                        <EditableText
                          value={tool.title}
                          onSave={(newVal) => updateTool(tool.id, { title: newVal })}
                          label="Tool H1 Headline"
                          allowHtml={false}
                        />
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
                  <EditableText
                    value={tool.shortSummary}
                    onSave={(newVal) => updateTool(tool.id, { shortSummary: newVal })}
                    label="Tool Subheadline Summary"
                    multiline
                    allowHtml={false}
                  />
                </p>
              </header>
            );
          }

          if (section.type === 'interactive_engine') {
            return (
              <main key={section.id} aria-label="Interactive SEO Tool Execution Canvas">
                <section aria-labelledby="tool-execution-heading" className="space-y-4">
                  <h2 id="tool-execution-heading" className="sr-only">
                    {section.title || 'Interactive Tool Engine'}
                  </h2>
                  <ToolEngineDispatcher tool={tool} />
                </section>
              </main>
            );
          }

          if (section.type === 'educational_methodology') {
            if (tool.id === 'tool_serp_pixel' || tool.engineType === 'serp-pixel-simulator') {
              return (
                <section key={section.id} className="space-y-6">
                  <SerpPixelSimulatorGuide />
                </section>
              );
            }

            if (tool.id === 'tool_keyword_density' || tool.engineType === 'keyword-density-analyzer') {
              return (
                <section key={section.id} className="space-y-6">
                  <AnalyzerGuide />
                </section>
              );
            }

            if (
              tool.id === 'tool_schema_jsonld' ||
              tool.engineType === 'schema-jsonld-generator' ||
              tool.id === 'tool_redirect_inspector' ||
              tool.engineType === 'redirect-chain-inspector' ||
              tool.slug === 'redirect-chain-inspector' ||
              tool.id === 'tool_bot_headers' ||
              tool.engineType === 'bot-header-inspector' ||
              tool.slug === 'bot-header-inspector' ||
              tool.id === 'tool_hreflang_matrix' ||
              tool.engineType === 'hreflang-tag-matrix' ||
              tool.slug === 'hreflang-tag-matrix' ||
              tool.id === 'tool_ctr_forecaster' ||
              tool.engineType === 'serp-rank-calculator' ||
              tool.slug === 'serp-ctr-forecaster' ||
              tool.id === 'tool_social_cards' ||
              tool.engineType === 'social-card-studio' ||
              tool.slug === 'social-card-studio' ||
              tool.id === 'tool_robots_validator' ||
              tool.engineType === 'robots-sitemap-validator' ||
              tool.slug === 'robots-sitemap-validator' ||
              tool.id === 'tool_onpage_scorer' ||
              tool.engineType === 'onpage-audit-scorer' ||
              tool.slug === 'onpage-audit-scorer' ||
              tool.id === 'tool_cwv_cls' ||
              tool.engineType === 'cwv-cls-calculator' ||
              tool.slug === 'cwv-cls-calculator' ||
              tool.id === 'tool_readability_flesch' ||
              tool.engineType === 'readability-flesch-analyzer' ||
              tool.slug === 'readability-flesch-analyzer'
            ) {
              return null;
            }

            if (!tool.educationalContent) return null;
            return (
              <section
                key={section.id}
                aria-labelledby="educational-guide-heading"
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h2 id="educational-guide-heading" className="text-lg font-bold text-slate-900">
                        {section.title || 'Technical Execution Guide & Formula Methodology'}
                      </h2>
                      {section.subtitle && (
                        <p className="text-xs text-slate-500">{section.subtitle}</p>
                      )}
                    </div>
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
                    <div className="whitespace-pre-line">
                      <EditableText
                        value={
                          tool.educationalContent.howItWorks ||
                          'This diagnostic engine executes real-time mathematical validation against Google Chromium rendering benchmarks and Schema.org specifications.'
                        }
                        onSave={(newVal) =>
                          updateTool(tool.id, {
                            educationalContent: { ...tool.educationalContent, howItWorks: newVal },
                          })
                        }
                        label="How It Works Content"
                        multiline
                        allowHtml={false}
                      />
                    </div>
                  )}

                  {activeEduTab === 'formula' && (
                    <div className="space-y-3">
                      <div className="whitespace-pre-line">
                        <EditableText
                          value={
                            tool.educationalContent.formulaMethodology ||
                            'Calculations rely on Decimal.js arbitrary-precision floating point arithmetic to guarantee zero cumulative rounding errors.'
                          }
                          onSave={(newVal) =>
                            updateTool(tool.id, {
                              educationalContent: {
                                ...tool.educationalContent,
                                formulaMethodology: newVal,
                              },
                            })
                          }
                          label="Formula Methodology"
                          multiline
                          allowHtml={false}
                        />
                      </div>
                    </div>
                  )}

                  {activeEduTab === 'steps' && (
                    <div className="space-y-4">
                      {tool.educationalContent.stepByStepGuide?.map((step, idx) => (
                        <div
                          key={step.id || idx}
                          className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 flex items-start gap-4"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                            {idx + 1}
                          </div>
                          <div className="space-y-1 flex-1">
                            <h3 className="font-bold text-slate-900 text-sm">
                              <EditableText
                                value={step.stepTitle}
                                onSave={(newVal) => {
                                  const updatedSteps = tool.educationalContent.stepByStepGuide.map((s, i) =>
                                    i === idx ? { ...s, stepTitle: newVal } : s
                                  );
                                  updateTool(tool.id, {
                                    educationalContent: {
                                      ...tool.educationalContent,
                                      stepByStepGuide: updatedSteps,
                                    },
                                  });
                                }}
                                label={`Step ${idx + 1} Title`}
                                allowHtml={false}
                              />
                            </h3>
                            <p className="text-xs text-slate-600">
                              <EditableText
                                value={step.stepDescription}
                                onSave={(newVal) => {
                                  const updatedSteps = tool.educationalContent.stepByStepGuide.map((s, i) =>
                                    i === idx ? { ...s, stepDescription: newVal } : s
                                  );
                                  updateTool(tool.id, {
                                    educationalContent: {
                                      ...tool.educationalContent,
                                      stepByStepGuide: updatedSteps,
                                    },
                                  });
                                }}
                                label={`Step ${idx + 1} Description`}
                                multiline
                                allowHtml={false}
                              />
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          }

          if (section.type === 'step_tutorial') {
            if (
              tool.id === 'tool_redirect_inspector' ||
              tool.engineType === 'redirect-chain-inspector' ||
              tool.slug === 'redirect-chain-inspector' ||
              tool.id === 'tool_bot_headers' ||
              tool.engineType === 'bot-header-inspector' ||
              tool.slug === 'bot-header-inspector' ||
              tool.id === 'tool_hreflang_matrix' ||
              tool.engineType === 'hreflang-tag-matrix' ||
              tool.slug === 'hreflang-tag-matrix' ||
              tool.id === 'tool_ctr_forecaster' ||
              tool.engineType === 'serp-rank-calculator' ||
              tool.slug === 'serp-ctr-forecaster' ||
              tool.id === 'tool_social_cards' ||
              tool.engineType === 'social-card-studio' ||
              tool.slug === 'social-card-studio' ||
              tool.id === 'tool_robots_validator' ||
              tool.engineType === 'robots-sitemap-validator' ||
              tool.slug === 'robots-sitemap-validator' ||
              tool.id === 'tool_onpage_scorer' ||
              tool.engineType === 'onpage-audit-scorer' ||
              tool.slug === 'onpage-audit-scorer' ||
              tool.id === 'tool_cwv_cls' ||
              tool.engineType === 'cwv-cls-calculator' ||
              tool.slug === 'cwv-cls-calculator' ||
              tool.id === 'tool_readability_flesch' ||
              tool.engineType === 'readability-flesch-analyzer' ||
              tool.slug === 'readability-flesch-analyzer' ||
              !tool.educationalContent?.stepByStepGuide ||
              tool.educationalContent.stepByStepGuide.length === 0
            ) {
              return null;
            }
            return (
              <section
                key={section.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
              >
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {section.title || 'Step-by-Step Practical Tutorial'}
                    </h2>
                    {section.subtitle && (
                      <p className="text-xs text-slate-500">{section.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {tool.educationalContent.stepByStepGuide.map((step, idx) => (
                    <div
                      key={step.id || idx}
                      className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 flex items-start gap-4"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <div className="space-y-1 flex-1">
                        <h3 className="font-bold text-slate-900 text-sm">{step.stepTitle}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{step.stepDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === 'faq_accordion') {
            if (
              tool.id === 'tool_redirect_inspector' ||
              tool.engineType === 'redirect-chain-inspector' ||
              tool.slug === 'redirect-chain-inspector' ||
              tool.id === 'tool_bot_headers' ||
              tool.engineType === 'bot-header-inspector' ||
              tool.slug === 'bot-header-inspector' ||
              tool.id === 'tool_hreflang_matrix' ||
              tool.engineType === 'hreflang-tag-matrix' ||
              tool.slug === 'hreflang-tag-matrix' ||
              tool.id === 'tool_ctr_forecaster' ||
              tool.engineType === 'serp-rank-calculator' ||
              tool.slug === 'serp-ctr-forecaster' ||
              tool.id === 'tool_social_cards' ||
              tool.engineType === 'social-card-studio' ||
              tool.slug === 'social-card-studio' ||
              tool.id === 'tool_robots_validator' ||
              tool.engineType === 'robots-sitemap-validator' ||
              tool.slug === 'robots-sitemap-validator' ||
              tool.id === 'tool_onpage_scorer' ||
              tool.engineType === 'onpage-audit-scorer' ||
              tool.slug === 'onpage-audit-scorer' ||
              tool.id === 'tool_cwv_cls' ||
              tool.engineType === 'cwv-cls-calculator' ||
              tool.slug === 'cwv-cls-calculator' ||
              tool.id === 'tool_readability_flesch' ||
              tool.engineType === 'readability-flesch-analyzer' ||
              tool.slug === 'readability-flesch-analyzer' ||
              !tool.faqs ||
              tool.faqs.length === 0
            ) {
              return null;
            }
            return (
              <section
                key={section.id}
                aria-labelledby="faqs-heading"
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
              >
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h2 id="faqs-heading" className="text-lg font-bold text-slate-900">
                        {section.title || 'Frequently Asked Questions (FAQ)'}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {section.subtitle || 'Indexed directly into Google search snippets via Schema.org FAQPage markup.'}
                      </p>
                    </div>
                  </div>

                  {isFrontendEditMode && (
                    <button
                      type="button"
                      onClick={() => {
                        const newId = generateId('faq');
                        const nextFaqs = [
                          ...tool.faqs,
                          {
                            id: newId,
                            question: 'New Frequently Asked Question?',
                            answer: 'Click here to edit the answer for this FAQ item.',
                          },
                        ];
                        updateTool(tool.id, { faqs: nextFaqs });
                        setExpandedFaqs((prev) => ({ ...prev, [newId]: true }));
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add FAQ
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {tool.faqs.map((faq, idx) => {
                    const isOpen = expandedFaqs[faq.id] ?? true;

                    return (
                      <div key={faq.id || idx} className="rounded-2xl border border-slate-200 overflow-hidden">
                        <div
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <span className="font-semibold text-xs sm:text-sm text-slate-900 flex-1">
                            <EditableText
                              value={faq.question}
                              onSave={(newVal) => {
                                const updatedFaqs = tool.faqs.map((f) =>
                                  f.id === faq.id ? { ...f, question: newVal } : f
                                );
                                updateTool(tool.id, { faqs: updatedFaqs });
                              }}
                              label={`FAQ #${idx + 1} Question`}
                              allowHtml={false}
                            />
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                              isOpen ? 'rotate-180 text-slate-900' : ''
                            }`}
                          />
                        </div>

                        {isOpen && (
                          <div className="p-4 bg-white text-xs text-slate-600 border-t border-slate-100 leading-relaxed whitespace-pre-line">
                            <EditableText
                              value={faq.answer}
                              onSave={(newVal) => {
                                const updatedFaqs = tool.faqs.map((f) =>
                                  f.id === faq.id ? { ...f, answer: newVal } : f
                                );
                                updateTool(tool.id, { faqs: updatedFaqs });
                              }}
                              label={`FAQ #${idx + 1} Answer`}
                              multiline
                              allowHtml={false}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          }

          if (section.type === 'related_tools') {
            if (relatedTools.length === 0) return null;
            return (
              <section
                key={section.id}
                aria-labelledby="related-tools-heading"
                className="space-y-4 pt-4"
              >
                <h2 id="related-tools-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  {section.title || `Related SEO Tools in ${category?.name || 'Category'}`}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedTools.map((relTool) => (
                    <ToolCard key={relTool.id} tool={relTool} />
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === 'custom_content') {
            return (
              <section
                key={section.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4"
              >
                {section.title && (
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
                    {section.subtitle && (
                      <p className="text-xs text-slate-500 mt-0.5">{section.subtitle}</p>
                    )}
                  </div>
                )}
                <div
                  className="veritas-rich-content text-sm text-slate-800 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: normalizeRichHtml(section.content || '<em>No custom content specified.</em>'),
                  }}
                />
              </section>
            );
          }

          return null;
        })}

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
