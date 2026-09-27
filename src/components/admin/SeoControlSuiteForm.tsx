import React, { useState } from 'react';
import type { SeoMetadata } from '../../lib/schemas';
import { calculatePixelWidth } from '../../lib/seo-math';
import {
  Globe,
  Share2,
  Bot,
  Code2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Smartphone,
  Monitor,
} from 'lucide-react';

interface Props {
  seo: SeoMetadata;
  onChange: (updatedSeo: SeoMetadata) => void;
  entityName: string;
  defaultPath: string;
}

export const SeoControlSuiteForm: React.FC<Props> = ({
  seo,
  onChange,
  entityName,
  defaultPath,
}) => {
  const [activeTab, setActiveTab] = useState<'serp' | 'social' | 'robots' | 'schema'>('serp');
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');

  const titleText = seo.metaTitle || entityName || '';
  const descText = seo.metaDescription || '';

  const titleMetrics = calculatePixelWidth(titleText, 18, serpDevice === 'mobile');
  const descMetrics = calculatePixelWidth(descText, 14, serpDevice === 'mobile');

  const updateField = <K extends keyof SeoMetadata>(key: K, value: SeoMetadata[K]) => {
    onChange({ ...seo, [key]: value });
  };

  const updateRobots = <K extends keyof SeoMetadata['robots']>(key: K, value: SeoMetadata['robots'][K]) => {
    onChange({
      ...seo,
      robots: {
        ...seo.robots,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('serp')}
          className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'serp'
              ? 'border-slate-900 text-slate-900 bg-slate-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Globe className="w-3.5 h-3.5" /> SERP &amp; Meta Tags
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'social'
              ? 'border-slate-900 text-slate-900 bg-slate-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" /> OpenGraph &amp; Twitter
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('robots')}
          className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'robots'
              ? 'border-slate-900 text-slate-900 bg-slate-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bot className="w-3.5 h-3.5" /> Robots Directives
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'schema'
              ? 'border-slate-900 text-slate-900 bg-slate-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" /> Schema Preview
        </button>
      </div>

      {/* TAB 1: SERP & Meta Tags */}
      {activeTab === 'serp' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Meta Title ({titleText.length} / 60 chars)</span>
                  <span className="font-mono text-slate-600">
                    <strong className={titleMetrics.isTruncated ? 'text-amber-600' : 'text-emerald-700'}>
                      {titleMetrics.pixelWidth}px
                    </strong>{' '}
                    / {titleMetrics.maxAllowed}px
                  </span>
                </div>
                <input
                  type="text"
                  value={seo.metaTitle}
                  onChange={(e) => updateField('metaTitle', e.target.value)}
                  placeholder={entityName || 'Page Title for Google'}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      titleMetrics.isTruncated ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${Math.min(100, titleMetrics.percentage)}%` }}
                  />
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Meta Description ({descText.length} / 160 chars)</span>
                  <span className="font-mono text-slate-600">
                    <strong className={descMetrics.isTruncated ? 'text-amber-600' : 'text-emerald-700'}>
                      {descMetrics.pixelWidth}px
                    </strong>{' '}
                    / {descMetrics.maxAllowed}px
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={seo.metaDescription}
                  onChange={(e) => updateField('metaDescription', e.target.value)}
                  placeholder="Concise summary that appears underneath title in search engine result pages."
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none"
                />
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      descMetrics.isTruncated ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${Math.min(100, descMetrics.percentage)}%` }}
                  />
                </div>
              </div>

              {/* Focus Keyword & Canonical URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Focus Keyword
                  </label>
                  <input
                    type="text"
                    value={seo.focusKeyword}
                    onChange={(e) => updateField('focusKeyword', e.target.value)}
                    placeholder="e.g. technical seo audit"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Canonical URL Override
                  </label>
                  <input
                    type="url"
                    value={seo.canonicalUrl}
                    onChange={(e) => updateField('canonicalUrl', e.target.value)}
                    placeholder={defaultPath || 'https://veritas-seo.dev/...'}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Live Google SERP Preview Box */}
            <div className="lg:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> SERP Preview
                </span>
                <div className="inline-flex p-0.5 bg-slate-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setSerpDevice('desktop')}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ${
                      serpDevice === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setSerpDevice('mobile')}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ${
                      serpDevice === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-left space-y-1">
                <div className="text-[11px] text-slate-500 font-mono truncate">
                  veritas-seo.dev &gt; {defaultPath.replace(/^\//, '') || 'page'}
                </div>
                <div className="text-sm font-medium text-[#1a0dab] line-clamp-1">
                  {titleText || 'Title will appear here'}
                </div>
                <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                  {descText || 'Meta description snippet will render here with simulated character constraints.'}
                </p>
              </div>

              <div className="text-[11px] text-slate-500 space-y-1 pt-1">
                <div className="flex justify-between">
                  <span>SERP Title Status:</span>
                  <strong className={titleMetrics.isTruncated ? 'text-amber-600' : 'text-emerald-700'}>
                    {titleMetrics.isTruncated ? 'Truncated (>580px)' : 'Safe (<580px)'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Snippet Description Status:</span>
                  <strong className={descMetrics.isTruncated ? 'text-amber-600' : 'text-emerald-700'}>
                    {descMetrics.isTruncated ? 'Truncated (>920px)' : 'Safe (<920px)'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OpenGraph & Twitter */}
      {activeTab === 'social' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">OpenGraph Title (og:title)</label>
              <input
                type="text"
                value={seo.ogTitle}
                onChange={(e) => updateField('ogTitle', e.target.value)}
                placeholder={titleText}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">OpenGraph Description (og:description)</label>
              <textarea
                rows={2}
                value={seo.ogDescription}
                onChange={(e) => updateField('ogDescription', e.target.value)}
                placeholder={descText}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Social Image URL (og:image &amp; twitter:image)</label>
              <input
                type="url"
                value={seo.ogImage}
                onChange={(e) => updateField('ogImage', e.target.value)}
                placeholder="https://veritas-seo.dev/images/og-card.png"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Twitter Card Type</label>
                <select
                  value={seo.twitterCard}
                  onChange={(e) => updateField('twitterCard', e.target.value as 'summary' | 'summary_large_image')}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="summary_large_image">summary_large_image (Recommended)</option>
                  <option value="summary">summary (Square thumbnail)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">OG Type</label>
                <select
                  value={seo.ogType}
                  onChange={(e) => updateField('ogType', e.target.value as 'website' | 'article')}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                </select>
              </div>
            </div>
          </div>

          {/* Social Card Mockup */}
          <div className="lg:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-700">Social Card Share Mockup</span>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="h-32 bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
                {seo.ogImage ? (
                  <img src={seo.ogImage} alt="Social Share Card" className="w-full h-full object-cover" />
                ) : (
                  <span>1200 x 630 OpenGraph Banner</span>
                )}
              </div>
              <div className="p-3 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">veritas-seo.dev</span>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{seo.ogTitle || titleText || 'Social Title'}</div>
                <div className="text-[11px] text-slate-500 line-clamp-2">{seo.ogDescription || descText || 'Social description excerpt'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Robots Directives */}
      {activeTab === 'robots' && (
        <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={seo.robots.index}
                onChange={(e) => updateRobots('index', e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Allow Indexing (index)</span>
                <span className="text-[11px] text-slate-500">Allow search bots to index this page in search results</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={seo.robots.follow}
                onChange={(e) => updateRobots('follow', e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Follow Links (follow)</span>
                <span className="text-[11px] text-slate-500">Allow search bots to crawl outbound links on this page</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={seo.robots.noarchive}
                onChange={(e) => updateRobots('noarchive', e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">No Archive (noarchive)</span>
                <span className="text-[11px] text-slate-500">Prevent Google from showing cached page copies</span>
              </div>
            </label>

            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-900 block">Max Image Preview</span>
              <select
                value={seo.robots.maxImagePreview}
                onChange={(e) => updateRobots('maxImagePreview', e.target.value as 'none' | 'standard' | 'large')}
                className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="large">max-image-preview: large (Recommended)</option>
                <option value="standard">max-image-preview: standard</option>
                <option value="none">max-image-preview: none</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs">
            <code>
              &lt;meta name="robots" content="
              {[
                seo.robots.index ? 'index' : 'noindex',
                seo.robots.follow ? 'follow' : 'nofollow',
                seo.robots.noarchive ? 'noarchive' : null,
                `max-image-preview:${seo.robots.maxImagePreview}`,
              ]
                .filter(Boolean)
                .join(', ')}
              " /&gt;
            </code>
          </div>
        </div>
      )}

      {/* TAB 4: Schema Preview */}
      {activeTab === 'schema' && (
        <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
            <span>Automated schema-dts JSON-LD Preview</span>
            <span className="text-emerald-400">Valid</span>
          </div>
          <pre className="text-emerald-400 overflow-x-auto p-2 bg-slate-950 rounded-lg leading-relaxed">
            <code>
              {JSON.stringify(
                {
                  '@context': 'https://schema.org',
                  '@type': 'WebPage',
                  name: titleText,
                  description: descText,
                  url: `https://veritas-seo.dev${defaultPath}`,
                  inLanguage: 'en-US',
                },
                null,
                2
              )}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};
