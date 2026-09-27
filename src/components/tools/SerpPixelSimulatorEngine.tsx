import React, { useState } from 'react';
import { calculatePixelWidth } from '../../lib/seo-math';
import type { SeoTool } from '../../lib/schemas';
import {
  Monitor,
  Smartphone,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  Info,
  Bot,
  Layers,
  Star,
  Globe,
} from 'lucide-react';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

export const SerpPixelSimulatorEngine: React.FC<Props> = ({ tool, onPerformCalculation }) => {
  const [url, setUrl] = useState(tool.defaultInputConfig?.sampleUrl || 'https://veritas-seo.dev/enterprise-technical-seo');
  const [title, setTitle] = useState(tool.defaultInputConfig?.sampleTitle || 'Enterprise Technical SEO Architecture & Zero-CLS Guide');
  const [description, setDescription] = useState(
    tool.defaultInputConfig?.sampleDescription ||
      'Master enterprise technical SEO with our complete guide on semantic HTML5 hierarchy, schema-dts structured data, and sub-millisecond Core Web Vitals.'
  );
  const [targetKeyword, setTargetKeyword] = useState(tool.defaultInputConfig?.sampleTargetKeyword || 'enterprise technical seo');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showRating, setShowRating] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showSitelinks, setShowSitelinks] = useState(true);
  const [showAiOverview, setShowAiOverview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Exact Pixel Metrics using Decimal.js
  const titleMetrics = calculatePixelWidth(title, 18, viewMode === 'mobile');
  const descMetrics = calculatePixelWidth(description, 14, viewMode === 'mobile');

  // Breadcrumb generator from URL
  const formatBreadcrumb = (urlString: string) => {
    try {
      const u = new URL(urlString);
      const host = u.hostname.replace(/^www\./, '');
      const parts = u.pathname.split('/').filter(Boolean);
      return { host, parts };
    } catch {
      return { host: 'veritas-seo.dev', parts: ['guide', 'technical-seo'] };
    }
  };

  const breadcrumbs = formatBreadcrumb(url);

  // Highlighting target keywords in description like Google does
  const renderHighlightedSnippet = (text: string, kw: string) => {
    if (!kw.trim()) return text;
    const regex = new RegExp(`(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === kw.toLowerCase() ? (
        <strong key={i} className="font-semibold text-slate-900">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  const handleCopyMeta = () => {
    const code = `<title>${title}</title>\n<meta name="description" content="${description}" />\n<link rel="canonical" href="${url}" />`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = () => {
    onPerformCalculation?.();
  };

  return (
    <div className="space-y-8">
      {/* Interactive Controls & Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" /> SERP Snippet Input Parameters
            </h3>
            <button
              type="button"
              onClick={handleCopyMeta}
              className="text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied HTML!' : 'Copy <meta> Tags'}
            </button>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Destination URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                handleInputChange();
              }}
              placeholder="https://example.com/page-slug"
              className="w-full px-3.5 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-mono text-slate-800"
            />
          </div>

          {/* Title Input & Exact Pixel Meter */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span className="uppercase tracking-wider">Title Tag (SERP Heading)</span>
              <span className="tabular-nums font-mono text-slate-600">
                {title.length} chars |{' '}
                <strong className={titleMetrics.isTruncated ? 'text-amber-600' : 'text-emerald-700'}>
                  {titleMetrics.pixelWidth}px
                </strong>{' '}
                / {titleMetrics.maxAllowed}px
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleInputChange();
              }}
              placeholder="Page title for search engines"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-slate-900"
            />
            {/* Real-time Pixel Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  titleMetrics.isTruncated ? 'bg-amber-500' : titleMetrics.percentage > 70 ? 'bg-emerald-600' : 'bg-slate-400'
                }`}
                style={{ width: `${Math.min(100, titleMetrics.percentage)}%` }}
              />
            </div>
            {titleMetrics.isTruncated && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Warning: Title exceeds {titleMetrics.maxAllowed}px and will be truncated with an ellipsis on Google.
              </p>
            )}
          </div>

          {/* Meta Description Input & Exact Pixel Meter */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span className="uppercase tracking-wider">Meta Description</span>
              <span className="tabular-nums font-mono text-slate-600">
                {description.length} chars |{' '}
                <strong className={descMetrics.isTruncated ? 'text-amber-600' : 'text-emerald-700'}>
                  {descMetrics.pixelWidth}px
                </strong>{' '}
                / {descMetrics.maxAllowed}px
              </span>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                handleInputChange();
              }}
              placeholder="Concise summary for search snippet"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-slate-900 resize-none"
            />
            {/* Real-time Pixel Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  descMetrics.isTruncated ? 'bg-amber-500' : descMetrics.percentage > 60 ? 'bg-emerald-600' : 'bg-slate-400'
                }`}
                style={{ width: `${Math.min(100, descMetrics.percentage)}%` }}
              />
            </div>
          </div>

          {/* Target Keyword Highlight Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Focus Search Query (Simulates Google Bold Matching)
            </label>
            <input
              type="text"
              value={targetKeyword}
              onChange={(e) => {
                setTargetKeyword(e.target.value);
                handleInputChange();
              }}
              placeholder="e.g. enterprise technical seo"
              className="w-full px-3.5 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-slate-800"
            />
          </div>

          {/* Feature toggles */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={showRating}
                onChange={(e) => setShowRating(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              Star Review Schema
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={showDate}
                onChange={(e) => setShowDate(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              Date Prefix
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={showSitelinks}
                onChange={(e) => setShowSitelinks(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              Rich Sitelinks
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={showAiOverview}
                onChange={(e) => setShowAiOverview(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              Google AI Overview
            </label>
          </div>
        </div>

        {/* Live Google SERP Simulation Screen */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live SERP Preview</span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-200/80 font-mono text-slate-700">
                {viewMode === 'desktop' ? '580px Canvas' : '540px Mobile'}
              </span>
            </div>
            {/* Mode Switcher */}
            <div className="inline-flex p-1 bg-slate-200/70 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
            </div>
          </div>

          {/* SERP Card Frame */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex-1 flex flex-col justify-center space-y-4">
            {/* Optional AI Overview (SGE) Snapshot */}
            {showAiOverview && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-indigo-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
                  <span className="flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-indigo-600" /> Google AI Overview
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                    Generative Summary
                  </span>
                </div>
                <p className="text-xs text-indigo-950 leading-relaxed">
                  According to enterprise benchmark data, {targetKeyword || 'technical SEO'} requires sub-50ms TTFB server responses, comprehensive JSON-LD structured schema graphs, and zero CLS layout shifts to maximize organic SERP visibility.
                </p>
              </div>
            )}

            <div
              className={`transition-all duration-300 mx-auto w-full ${
                viewMode === 'mobile' ? 'max-w-[420px] bg-slate-50/40 p-4 rounded-xl border border-slate-200' : ''
              }`}
            >
              {/* Google Search Result Item */}
              <div className="space-y-1.5 font-sans text-left">
                {/* Google Site Identity & Favicon */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {breadcrumbs.host.charAt(0).toUpperCase()}
                  </div>
                  <div className="leading-tight overflow-hidden">
                    <div className="text-xs font-medium text-slate-800 truncate">{breadcrumbs.host}</div>
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 truncate">
                      <span>{url}</span>
                    </div>
                  </div>
                </div>

                {/* Google SERP Blue Title Link */}
                <h4 className="text-[20px] leading-[26px] font-normal text-[#1a0dab] hover:underline cursor-pointer transition-colors pt-1">
                  {title || 'Untitled Document'}
                  {titleMetrics.isTruncated && '...'}
                </h4>

                {/* Rich Snippet Star Ratings */}
                {showRating && (
                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-0.5">
                    <div className="flex text-amber-500">★★★★★</div>
                    <span className="font-semibold text-slate-800">4.9</span>
                    <span>(128 reviews)</span>
                  </div>
                )}

                {/* Snippet Description */}
                <p className="text-[14px] leading-[22px] text-[#4d5156] pt-0.5 break-words">
                  {showDate && <span className="text-slate-500 text-xs mr-1.5">Sep 27, 2026 — </span>}
                  {renderHighlightedSnippet(description || 'No meta description provided.', targetKeyword)}
                  {descMetrics.isTruncated && '...'}
                </p>

                {/* Rich Sitelinks */}
                {showSitelinks && (
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 mt-2">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-[#1a0dab] hover:underline cursor-pointer block truncate">
                        Core Architecture
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate">
                        Semantic hierarchy guidelines
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-[#1a0dab] hover:underline cursor-pointer block truncate">
                        Schema JSON-LD
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate">
                        Structured data entities
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Metric Diagnostic Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200/60">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Title Pixel Width</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {titleMetrics.pixelWidth} <span className="text-xs text-slate-500 font-normal">px</span>
              </span>
            </div>
            <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200/60">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Title Max Allowed</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {titleMetrics.maxAllowed} <span className="text-xs text-slate-500 font-normal">px</span>
              </span>
            </div>
            <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200/60">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Desc Pixel Width</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {descMetrics.pixelWidth} <span className="text-xs text-slate-500 font-normal">px</span>
              </span>
            </div>
            <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200/60">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Truncation Status</span>
              <span
                className={`text-sm font-bold block pt-1 ${
                  titleMetrics.isTruncated || descMetrics.isTruncated ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {titleMetrics.isTruncated || descMetrics.isTruncated ? 'Truncated' : 'Safe (Zero CLS)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-slate-900">Technical Tip:</strong> Google measures title pixels dynamically using Chromium layout rendering. Capital letters (M, W) consume up to 12px, whereas narrow characters (i, l, t) consume only 4-5px. Staying below 580px guarantees 100% visibility on desktop search result cards.
        </div>
      </div>
    </div>
  );
};
