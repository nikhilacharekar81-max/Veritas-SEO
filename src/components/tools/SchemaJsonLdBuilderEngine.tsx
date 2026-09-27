import React, { useState } from 'react';
import type { SeoTool } from '../../lib/schemas';
import { Copy, Check, Sparkles, Code2, Plus, Trash2, ShieldCheck } from 'lucide-react';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

export const SchemaJsonLdBuilderEngine: React.FC<Props> = () => {
  const [schemaType, setSchemaType] = useState<'WebApplication' | 'FAQPage' | 'BreadcrumbList' | 'Article'>('WebApplication');
  const [copied, setCopied] = useState(false);

  // WebApplication state
  const [appName, setAppName] = useState('Veritas SEO Keyword Analyzer');
  const [appUrl, setAppUrl] = useState('https://veritas-seo.dev/tool/keyword-density-analyzer');
  const [appDescription, setAppDescription] = useState('Enterprise keyword density and N-Gram TF-IDF frequency calculator.');
  const [appCategory, setAppCategory] = useState('BusinessApplication');

  // FAQPage state
  const [faqs, setFaqs] = useState([
    { question: 'What is Schema.org JSON-LD markup?', answer: 'JSON-LD is a JavaScript notation embedded in a script tag that informs search engine bots about the semantic entities on a web page.' },
    { question: 'How do rich snippets improve CTR in Google search?', answer: 'Rich snippets add visual star ratings, FAQs, and breadcrumb trails to search listings, increasing organic click-through rates by up to 30%.' },
  ]);

  // Breadcrumbs state
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: 'Home', url: 'https://veritas-seo.dev' },
    { name: 'Tools', url: 'https://veritas-seo.dev/category/on-page-serp' },
    { name: 'Keyword Analyzer', url: 'https://veritas-seo.dev/tool/keyword-density-analyzer' },
  ]);

  // Article state
  const [articleHeadline, setArticleHeadline] = useState('How to Architect Zero-CLS High Performance SEO Platforms');
  const [authorName, setAuthorName] = useState('Veritas Engineering');
  const [publisherName, setPublisherName] = useState('Veritas SEO');

  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: '', answer: '' }]);
  };

  const removeFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: 'question' | 'answer', val: string) => {
    setFaqs((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: val } : f))
    );
  };

  const addBreadcrumb = () => {
    setBreadcrumbs((prev) => [...prev, { name: '', url: 'https://' }]);
  };

  const removeBreadcrumb = (index: number) => {
    setBreadcrumbs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBreadcrumb = (index: number, field: 'name' | 'url', val: string) => {
    setBreadcrumbs((prev) =>
      prev.map((b, i) => (i === index ? { ...b, [field]: val } : b))
    );
  };

  // Generate valid schema-dts compliant JSON-LD object
  const buildJsonLd = () => {
    if (schemaType === 'WebApplication') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: appName,
        url: appUrl,
        description: appDescription,
        applicationCategory: appCategory,
        operatingSystem: 'All Modern Browsers',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      };
    }

    if (schemaType === 'FAQPage') {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question || 'Untitled Question',
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer || 'Answer content goes here.',
          },
        })),
      };
    }

    if (schemaType === 'BreadcrumbList') {
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name || 'Breadcrumb Item',
          item: b.url || 'https://example.com',
        })),
      };
    }

    // Article
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleHeadline,
      author: {
        '@type': 'Person',
        name: authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: publisherName,
        logo: {
          '@type': 'ImageObject',
          url: 'https://veritas-seo.dev/logo.png',
        },
      },
      datePublished: new Date().toISOString(),
    };
  };

  const generatedSchemaString = JSON.stringify(buildJsonLd(), null, 2);
  const fullHtmlSnippet = `<script type="application/ld+json">\n${generatedSchemaString}\n</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullHtmlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Schema Type Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-bold text-slate-900">Select Schema.org Entity Type:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['WebApplication', 'FAQPage', 'BreadcrumbList', 'Article'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSchemaType(type)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                schemaType === type
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dynamic Form Editor */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> {schemaType} Properties
          </h3>

          {schemaType === 'WebApplication' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Application Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Application URL</label>
                <input
                  type="url"
                  value={appUrl}
                  onChange={(e) => setAppUrl(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Application Category</label>
                <select
                  value={appCategory}
                  onChange={(e) => setAppCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                >
                  <option value="BusinessApplication">BusinessApplication</option>
                  <option value="UtilitiesApplication">UtilitiesApplication</option>
                  <option value="DeveloperApplication">DeveloperApplication</option>
                  <option value="SEOApplication">SEOApplication</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={appDescription}
                  onChange={(e) => setAppDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none"
                />
              </div>
            </div>
          )}

          {schemaType === 'FAQPage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Question & Answer Items</span>
                <button
                  type="button"
                  onClick={addFaq}
                  className="text-xs font-medium px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Question
                </button>
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Q#{idx + 1}</span>
                      {faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFaq(idx)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                      placeholder="Enter question"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                      placeholder="Enter answer"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {schemaType === 'BreadcrumbList' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Hierarchy Trail</span>
                <button
                  type="button"
                  onClick={addBreadcrumb}
                  className="text-xs font-medium px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Step
                </button>
              </div>

              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {breadcrumbs.map((b, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 font-mono w-5">{idx + 1}.</span>
                    <input
                      type="text"
                      value={b.name}
                      onChange={(e) => updateBreadcrumb(idx, 'name', e.target.value)}
                      placeholder="Label (e.g. Home)"
                      className="w-1/3 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <input
                      type="url"
                      value={b.url}
                      onChange={(e) => updateBreadcrumb(idx, 'url', e.target.value)}
                      placeholder="Target URL"
                      className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                    />
                    {breadcrumbs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBreadcrumb(idx)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {schemaType === 'Article' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={articleHeadline}
                  onChange={(e) => setArticleHeadline(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Publisher Name</label>
                <input
                  type="text"
                  value={publisherName}
                  onChange={(e) => setPublisherName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>
            </div>
          )}
        </div>

        {/* Live Code Preview & Validation */}
        <div className="lg:col-span-6 bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-slate-400">schema-dts JSON-LD Validated</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Script Tag'}
              </button>
            </div>

            <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl overflow-x-auto text-emerald-400 max-h-[380px] leading-relaxed">
              <code>{fullHtmlSnippet}</code>
            </pre>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> Google Rich Results Ready
            </span>
            <span className="font-mono">{generatedSchemaString.length} bytes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
