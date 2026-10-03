import React, { useState } from 'react';
import { calculateKeywordDensity } from '../../lib/seo-math';
import type { SeoTool } from '../../lib/schemas';
import { Sparkles, AlertTriangle, CheckCircle2, Sliders, Type, Download } from 'lucide-react';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

const CONTENT_PRESETS = [
  {
    name: 'Technical SEO Guide',
    keyword: 'technical seo',
    text: 'Enterprise technical SEO requires a strict execution pipeline combining semantic HTML5 landmarks, clean canonical URL structures, and validated Schema.org JSON-LD structured data. When search engine crawlers evaluate enterprise technical SEO architecture, they prioritize fast server response times, zero cumulative layout shift, and unambiguous internal linking hierarchies. By auditing technical SEO metrics regularly, search visibility scales reliably across Google desktop and mobile indices.',
  },
  {
    name: 'SaaS Product Landing Page',
    keyword: 'workflow automation',
    text: 'Modern teams require workflow automation to eliminate repetitive operational bottlenecks. Our cloud-native workflow automation suite coordinates database triggers, webhook events, and third-party integrations seamlessly. Accelerate productivity with automated workflow automation templates that scale with your enterprise infrastructure.',
  },
  {
    name: 'E-Commerce Product Page',
    keyword: 'ergonomic office chair',
    text: 'Engineered for lumbar support, this ergonomic office chair features adjustable 4D armrests, breathable mesh fabric, and synchronized tilt mechanisms. Invest in an ergonomic office chair that prevents fatigue during extended focus sessions while maintaining sleek aesthetic workspace design.',
  },
];

export const KeywordDensityAnalyzerEngine: React.FC<Props> = ({ tool, onPerformCalculation }) => {
  const [bodyText, setBodyText] = useState(
    tool.defaultInputConfig?.sampleBodyText || CONTENT_PRESETS[0].text
  );
  const [targetKeyword, setTargetKeyword] = useState(
    tool.defaultInputConfig?.sampleTargetKeyword || CONTENT_PRESETS[0].keyword
  );
  const [includeStopWords, setIncludeStopWords] = useState(false);
  const [activeTab, setActiveTab] = useState<'1gram' | '2gram' | '3gram' | '4gram'>('2gram');

  const metrics = calculateKeywordDensity(bodyText, targetKeyword, includeStopWords, 2);

  // Advanced NLP Metrics: Lexical Diversity & Stuffing Risk
  const lexicalDiversity = metrics.totalWords > 0
    ? Math.round((metrics.uniqueWords / metrics.totalWords) * 100)
    : 0;

  const stuffingRiskScore = metrics.targetMetrics
    ? metrics.targetMetrics.density > 3.5
      ? 92
      : metrics.targetMetrics.density > 2.5
      ? 68
      : metrics.targetMetrics.density >= 1.0
      ? 15
      : 5
    : 0;

  const handleInputChange = () => {
    onPerformCalculation?.();
  };

  const handlePresetSelect = (presetIdx: number) => {
    const p = CONTENT_PRESETS[presetIdx];
    if (p) {
      setBodyText(p.text);
      setTargetKeyword(p.keyword);
      onPerformCalculation?.();
    }
  };

  const exportCsv = () => {
    const list =
      activeTab === '1gram'
        ? metrics.top1Grams
        : activeTab === '2gram'
        ? metrics.top2Grams
        : activeTab === '3gram'
        ? metrics.top3Grams
        : metrics.top4Grams;
    const rows = [
      ['N-Gram Phrase', 'Occurrences', 'Prominence', 'Density %', 'Over-Optimized Status'],
      ...list.map((item) => [
        `"${item.phrase}"`,
        item.count,
        item.prominence,
        `${item.density}%`,
        item.isOverOptimized ? 'YES' : 'NO',
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `veritas_seo_${activeTab}_density_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Input controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-emerald-600" /> Article / Copy Content
            </h3>
            {/* Presets */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Load Sample:</span>
              <select
                onChange={(e) => handlePresetSelect(Number(e.target.value))}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium"
              >
                {CONTENT_PRESETS.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            rows={8}
            value={bodyText}
            onChange={(e) => {
              setBodyText(e.target.value);
              handleInputChange();
            }}
            placeholder="Paste your drafted article, blog post, or landing page content here..."
            className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-slate-900 font-sans leading-relaxed resize-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Primary Target Keyword
              </label>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => {
                  setTargetKeyword(e.target.value);
                  handleInputChange();
                }}
                placeholder="e.g. technical seo"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-slate-800"
              />
            </div>
            <div className="flex items-end pb-1.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={includeStopWords}
                  onChange={(e) => {
                    setIncludeStopWords(e.target.checked);
                    handleInputChange();
                  }}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                Include Common Stop Words (the, is, and)
              </label>
            </div>
          </div>
        </div>

        {/* Target Keyword Gauge & Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Keyword Contextual Analysis
            </h4>
            
            {/* Target Diagnostic */}
            {metrics.targetMetrics ? (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-600">Focus Phrase:</span>
                  <strong className="text-sm text-slate-900 font-semibold font-mono">
                    "{metrics.targetMetrics.phrase}"
                  </strong>
                </div>

                {/* Keyword Distribution Map */}
                <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Distribution Position</span>
                    <div className="flex h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        {Array.from({length: 10}).map((_, i) => {
                            const segmentStart = (i * bodyText.length) / 10;
                            const segmentEnd = ((i + 1) * bodyText.length) / 10;
                            const countInSegment = metrics.targetMetrics!.positions.filter(p => p >= segmentStart && p < segmentEnd).length;
                            return (
                                <div key={i} className={`h-full ${countInSegment > 0 ? 'bg-emerald-500' : 'bg-slate-200'}`} style={{width: '10%'}} />
                            )
                        })}
                    </div>
                </div>

                {/* Progress bar... [KEEP EXISTING PROGRESS BAR LOGIC] */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mt-2">
                    <div
                      className={`h-full transition-all duration-300 ${
                        metrics.targetMetrics.density > 4.0
                          ? 'bg-red-500'
                          : metrics.targetMetrics.density > 2.5
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (metrics.targetMetrics.density / 4) * 100)}%` }}
                    />
                </div>
                {/* [KEEP EXISTING DIAGNOSTIC ALERTS] */}
                {metrics.targetMetrics.density > 4.0 ? (
                  <div className="p-3 rounded-xl bg-red-50/70 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div><strong>Over-Optimized (Risk)!</strong> Density exceeds 4.0%.</div>
                  </div>
                ) : metrics.targetMetrics.density > 2.5 ? (
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div><strong>High Density (Caution).</strong></div>
                  </div>
                ) : metrics.targetMetrics.density >= 0.5 ? (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div><strong>Natural Density.</strong></div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-800 flex items-start gap-2">
                    <Sliders className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div><strong>Low Prominence.</strong></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                Enter a target keyword to evaluate.
              </div>
            )}
          </div>


          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Total Words</span>
              <span className="text-base font-bold text-slate-900 tabular-nums">{metrics.totalWords}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Unique Words</span>
              <span className="text-base font-bold text-slate-900 tabular-nums">{metrics.uniqueWords}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Lexical Diversity</span>
              <span className="text-base font-bold text-emerald-700 tabular-nums">{lexicalDiversity}%</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Reading Time</span>
              <span className="text-base font-bold text-slate-900 tabular-nums">~{metrics.readingTimeMinutes}m</span>
            </div>
          </div>
        </div>
      </div>

      {/* N-Gram Density Breakdown Tables */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-semibold text-slate-900">N-Gram Keyword Frequency Matrix</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Exact Decimal.js distribution across single words, 2-word phrases, and 3-word n-grams.
            </p>
          </div>

          {/* Actions & Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('1gram')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === '1gram' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                1-Word (Unigrams)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('2gram')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === '2gram' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                2-Word (Bigrams)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('3gram')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === '3gram' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                3-Word (Trigrams)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('4gram')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === '4gram' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                4-Word (Quadgrams)
              </button>
            </div>

            <button
              type="button"
              onClick={exportCsv}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {(() => {
            const list = activeTab === '1gram' ? metrics.top1Grams : activeTab === '2gram' ? metrics.top2Grams : activeTab === '3gram' ? metrics.top3Grams : metrics.top4Grams;

            if (list.length === 0) {
              return (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No {activeTab} phrases repeated at least 2 times found in this text.
                </div>
              );
            }

            return (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-6">Phrase</th>
                    <th className="py-3 px-6 text-center">Freq</th>
                    <th className="py-3 px-6 text-center">Prominence</th>
                    <th className="py-3 px-6 text-center">Density</th>
                    <th className="py-3 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {list.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-6 font-medium text-slate-900 text-xs font-mono">
                        {item.phrase}
                      </td>
                      <td className="py-3.5 px-6 text-center tabular-nums text-slate-600">
                        {item.count}
                      </td>
                      <td className="py-3.5 px-6 text-center tabular-nums font-semibold text-indigo-700">
                        {item.prominence}
                      </td>
                      <td className="py-3.5 px-6 text-center tabular-nums font-semibold text-slate-900">
                        {item.density}%
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        {item.isOverOptimized ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                            <AlertTriangle className="w-3 h-3" /> Dense
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            <CheckCircle2 className="w-3 h-3" /> Natural
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
