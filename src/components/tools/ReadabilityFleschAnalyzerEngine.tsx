import React, { useState } from 'react';
import type { SeoTool } from '../../lib/schemas';
import { calculateReadability } from '../../lib/seo-math';
import { BookOpen, Sparkles, Award, GraduationCap, AlignLeft, Hash, Layers } from 'lucide-react';
import { ReadabilityFleschGuide } from './ReadabilityFleschGuide';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

export const ReadabilityFleschAnalyzerEngine: React.FC<Props> = () => {
  const [text, setText] = useState(
    'Technical search engine optimization focuses on improving the crawlability and indexing architecture of a website. When web pages load quickly with clear navigation structures, search engine crawlers can index every article without exhausting crawl limits. Ensuring proper sentence length and clear vocabulary helps users understand complex topics with minimal cognitive effort.'
  );

  const res = calculateReadability(text);

  const wordsPerSentence = res.totalSentences > 0 ? (res.totalWords / res.totalSentences).toFixed(1) : '0';
  const syllablesPerWord = res.totalWords > 0 ? (res.totalSyllables / res.totalWords).toFixed(2) : '0';

  return (
    <div className="space-y-10">
      {/* Intro Hook Section */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4 text-slate-700">
        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Writing something can be technically correct and still be difficult to read.
        </p>
        <p className="text-sm sm:text-base leading-relaxed">
          This analyzer gives you a quick way to check that. Paste your text into the tool and it calculates <strong className="text-slate-900 font-bold">Flesch Reading Ease</strong>, <strong className="text-slate-900 font-bold">Flesch-Kincaid Grade Level</strong>, syllable count, word count, sentence count, and other basic readability measurements.
        </p>
        <p className="text-sm sm:text-base leading-relaxed">
          The numbers are useful, but don't treat them as a final verdict on your writing. A readability score is a signal. You still need to read the text yourself.
        </p>
      </section>

      {/* Interactive Tool Execution Canvas */}
      <div id="calculator" className="space-y-6 scroll-mt-24">
        {/* Score overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" /> Flesch Reading Ease
            </span>
            <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
              {res.fleschReadingEase} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg inline-block">
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
              Approx. {Math.round(res.fleschGradeLevel)}th Grade Reading Level
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
              Avg. {syllablesPerWord} syllables / word
            </div>
          </div>
        </div>

        {/* Supporting metrics bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Words</div>
            <div className="text-lg font-bold font-mono text-slate-900">{res.totalWords}</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Sentences</div>
            <div className="text-lg font-bold font-mono text-slate-900">{res.totalSentences}</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Words / Sentence</div>
            <div className="text-lg font-bold font-mono text-slate-900">{wordsPerSentence}</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Syllables / Word</div>
            <div className="text-lg font-bold font-mono text-slate-900">{syllablesPerWord}</div>
          </div>
        </div>

        {/* Editor text input */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Text Content for Linguistic Evaluation
            </h3>
            <span className="text-xs font-mono text-slate-500">Real-Time Linguistic Math</span>
          </div>

          <textarea
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste draft copy, blog posts, or landing page paragraphs to evaluate readability in real time..."
            className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white leading-relaxed resize-y font-sans text-slate-900 transition-colors"
          />
        </div>
      </div>

      {/* Comprehensive Educational Guide */}
      <ReadabilityFleschGuide />
    </div>
  );
};
