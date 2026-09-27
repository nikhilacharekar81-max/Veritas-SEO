import React, { useState } from 'react';
import type { SeoTool } from '../../lib/schemas';
import { calculateReadability } from '../../lib/seo-math';
import { BookOpen, Sparkles, CheckCircle2, GraduationCap, Award } from 'lucide-react';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

export const ReadabilityFleschAnalyzerEngine: React.FC<Props> = () => {
  const [text, setText] = useState(
    'Technical search engine optimization focuses on improving the crawlability and indexing architecture of a website. When web pages load quickly with clear navigation structures, search engine crawlers can index every article without exhausting crawl limits. Ensuring proper sentence length and clear vocabulary helps users understand complex topics with minimal cognitive effort.'
  );

  const res = calculateReadability(text);

  return (
    <div className="space-y-8">
      {/* Score overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" /> Flesch Reading Ease
          </span>
          <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
            {res.fleschReadingEase} <span className="text-xs text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg inline-block">
            {res.readingEaseLabel}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-600" /> Flesch-Kincaid Grade
          </span>
          <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
            Grade {res.fleschGradeLevel}
          </div>
          <div className="text-xs text-slate-500">
            Target: Grade 7.0 - 9.0 for standard web audiences
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-purple-600" /> Syllables & Density
          </span>
          <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
            {res.totalSyllables} <span className="text-xs text-slate-400 font-normal">syllables</span>
          </div>
          <div className="text-xs text-slate-500">
            Across {res.totalWords} words &amp; {res.totalSentences} sentences
          </div>
        </div>
      </div>

      {/* Editor text */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Text Content for Linguistic Evaluation
          </h3>
          <span className="text-xs font-mono text-slate-500">Decimal.js Precision Math</span>
        </div>

        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste draft copy to evaluate reading ease..."
          className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed resize-none font-sans text-slate-900"
        />
      </div>
    </div>
  );
};
