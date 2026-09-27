import React, { useState } from 'react';
import type { SeoTool } from '../../lib/schemas';
import { evaluateOnPageSeoHealth } from '../../lib/seo-math';
import { ShieldCheck, AlertCircle, CheckCircle, Info, Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

export const OnPageAuditScorerEngine: React.FC<Props> = () => {
  const [metaTitle, setMetaTitle] = useState('Enterprise Technical SEO Architecture & Core Web Vitals');
  const [metaDesc, setMetaDesc] = useState('Learn how to architect zero-CLS semantic HTML5 pages, configure Schema.org JSON-LD, and optimize crawl equity for enterprise search visibility.');
  const [focusKeyword, setFocusKeyword] = useState('enterprise technical seo');
  const [canonicalUrl, setCanonicalUrl] = useState('https://veritas-seo.dev/enterprise-technical-seo');
  const [howItWorks, setHowItWorks] = useState('Deep technical methodology explaining crawler parsing, tokenization, and rendering steps.');
  const [ogImage, setOgImage] = useState('https://veritas-seo.dev/og-image.png');
  const [faqsCount, setFaqsCount] = useState(3);

  const audit = evaluateOnPageSeoHealth({
    metaTitle,
    metaDescription: metaDesc,
    focusKeyword,
    canonicalUrl,
    howItWorks,
    ogImage,
    faqsCount,
  });

  return (
    <div className="space-y-8">
      {/* Top Score Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-bold font-mono text-white shadow-sm ${
              audit.score >= 85 ? 'bg-emerald-600' : audit.score >= 70 ? 'bg-blue-600' : audit.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
            }`}
          >
            <span className="text-2xl leading-none">{audit.score}</span>
            <span className="text-[11px] uppercase tracking-wider opacity-90">Grade {audit.grade}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">On-Page Technical SEO Health Score</h3>
            <p className="text-xs text-slate-500 mt-1">
              Passed <strong className="text-slate-900">{audit.passedChecks}</strong> of {audit.totalChecks} core on-page algorithmic quality signals.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
            Calculated via Decimal.js Engine
          </span>
        </div>
      </div>

      {/* Editor & Issue Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Test On-Page Parameters
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Title ({metaTitle.length} chars)</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Description ({metaDesc.length} chars)</label>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Focus Keyword</label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">FAQs Count</label>
              <input
                type="number"
                min={0}
                max={20}
                value={faqsCount}
                onChange={(e) => setFaqsCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Canonical URL</label>
            <input
              type="url"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">OpenGraph Image URL</label>
            <input
              type="url"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
            />
          </div>
        </div>

        {/* Audit Results */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Audit Findings & Penalties
            </span>
            <span className="text-xs font-mono text-slate-500">{audit.issues.length} checks</span>
          </h4>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {audit.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-start gap-3 text-xs ${
                  issue.type === 'pass'
                    ? 'bg-emerald-50/50 border-emerald-200/70 text-emerald-900'
                    : issue.type === 'warning'
                    ? 'bg-amber-50/60 border-amber-200/70 text-amber-900'
                    : 'bg-red-50/60 border-red-200/70 text-red-900'
                }`}
              >
                {issue.type === 'pass' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      issue.type === 'critical' ? 'text-red-600' : 'text-amber-600'
                    }`}
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium">{issue.message}</p>
                </div>
                {issue.pointsLost > 0 && (
                  <span className="font-mono font-bold text-red-600 bg-red-100/80 px-1.5 py-0.5 rounded text-[11px]">
                    -{issue.pointsLost} pts
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
