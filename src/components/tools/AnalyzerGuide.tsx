import React from 'react';
import { EditableText } from '../public/EditableText';
import {
  Info,
  BarChart3,
  Target,
  Layers,
  Sparkles,
  Activity,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

export const AnalyzerGuide: React.FC = () => {
  return (
    <div className="space-y-8 mt-8">
      {/* Side-by-Side Comparison: Keyword Contextual Analysis vs N-Gram Frequency Matrix */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5 flex-wrap">
          <Info className="w-5 h-5 text-emerald-600 shrink-0" />
          <EditableText
            blockKey="analyzer.comparison_title"
            defaultContent="Keyword Contextual Analysis vs. N-Gram Keyword Frequency Matrix"
            label="Comparison Section Heading"
          />
        </h2>

        <div className="overflow-x-auto mb-6 rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                <th className="p-3.5 font-semibold">
                  <EditableText
                    blockKey="analyzer.table_th1"
                    defaultContent="Feature"
                    label="Table Column 1 Header"
                  />
                </th>
                <th className="p-3.5 font-semibold">
                  <EditableText
                    blockKey="analyzer.table_th2"
                    defaultContent="Keyword Contextual Analysis"
                    label="Table Column 2 Header"
                  />
                </th>
                <th className="p-3.5 font-semibold">
                  <EditableText
                    blockKey="analyzer.table_th3"
                    defaultContent="N-Gram Frequency Matrix"
                    label="Table Column 3 Header"
                  />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">
                  <EditableText
                    blockKey="analyzer.table_r1_c1"
                    defaultContent="Primary Goal"
                    label="Row 1 Feature Name"
                  />
                </td>
                <td className="p-3.5 text-slate-600">
                  <EditableText
                    blockKey="analyzer.table_r1_c2"
                    defaultContent="Optimizing semantic relevance & document structure."
                    label="Primary Goal — Contextual Analysis"
                  />
                </td>
                <td className="p-3.5 text-slate-600">
                  <EditableText
                    blockKey="analyzer.table_r1_c3"
                    defaultContent="Detecting technical repetition & phrase patterns."
                    label="Primary Goal — N-Gram Matrix"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">
                  <EditableText
                    blockKey="analyzer.table_r2_c1"
                    defaultContent="Focus Area"
                    label="Row 2 Feature Name"
                  />
                </td>
                <td className="p-3.5 text-slate-600">
                  <EditableText
                    blockKey="analyzer.table_r2_c2"
                    defaultContent="Distribution position map, target diagnostics, prominence."
                    label="Focus Area — Contextual Analysis"
                  />
                </td>
                <td className="p-3.5 text-slate-600">
                  <EditableText
                    blockKey="analyzer.table_r2_c3"
                    defaultContent="1-Gram to 4-Gram density, frequency counts, over-optimization."
                    label="Focus Area — N-Gram Matrix"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">
                  <EditableText
                    blockKey="analyzer.table_r3_c1"
                    defaultContent="When to Use"
                    label="Row 3 Feature Name"
                  />
                </td>
                <td className="p-3.5 text-slate-600">
                  <EditableText
                    blockKey="analyzer.table_r3_c2"
                    defaultContent="While drafting and structuring content paragraphs."
                    label="When to Use — Contextual Analysis"
                  />
                </td>
                <td className="p-3.5 text-slate-600">
                  <EditableText
                    blockKey="analyzer.table_r3_c3"
                    defaultContent="During final on-page SEO audit before publishing."
                    label="When to Use — N-Gram Matrix"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60">
            <Target className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">
                <EditableText
                  blockKey="analyzer.contextual_title"
                  defaultContent="Contextual Analysis"
                  label="Contextual Analysis Title"
                />
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <EditableText
                  blockKey="analyzer.contextual_desc"
                  defaultContent="Use this to ensure your primary keyword is distributed evenly throughout the document (check the 10-segment position map) and maintains a natural density profile."
                  label="Contextual Analysis Description"
                  multiline
                />
              </p>
            </div>
          </div>
          <div className="flex gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60">
            <BarChart3 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">
                <EditableText
                  blockKey="analyzer.matrix_title"
                  defaultContent="Frequency Matrix"
                  label="Frequency Matrix Title"
                />
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <EditableText
                  blockKey="analyzer.matrix_desc"
                  defaultContent='Use this to identify technical red flags across unigrams, bigrams, trigrams, and quadgrams. Check for "Dense" status indicators and high frequency counts that may signal keyword stuffing.'
                  label="Frequency Matrix Description"
                  multiline
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 (H2): Why Modern SEO Requires N-Gram Analysis Over Simple Keyword Density */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <Layers className="w-5 h-5 text-emerald-600 shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            <EditableText
              blockKey="analyzer.section1_title"
              defaultContent="Why Modern SEO Requires N-Gram Analysis Over Simple Keyword Density"
              label="Section 1 (H2) Heading"
            />
          </h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          <EditableText
            blockKey="analyzer.section1_intro"
            defaultContent='Simple word counters only tell half the story. If you write an article about digital marketing strategies, a basic tool counts "digital," "marketing," and "strategies" as completely separate words.'
            label="Section 1 Intro Paragraph"
            multiline
          />
        </p>

        <div className="space-y-2.5 pt-1">
          <p className="text-sm font-semibold text-slate-900">
            <EditableText
              blockKey="analyzer.section1_list_heading"
              defaultContent="N-Gram analysis looks at phrase patterns:"
              label="Section 1 List Heading"
            />
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 font-semibold block mb-0.5">
                <EditableText
                  blockKey="analyzer.section1_ngram1_title"
                  defaultContent="1-Gram (Unigram):"
                  label="1-Gram Title"
                />
              </strong>
              <EditableText
                blockKey="analyzer.section1_ngram1"
                defaultContent='Single words (e.g., "SEO", "content", "traffic").'
                label="1-Gram Definition"
              />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 font-semibold block mb-0.5">
                <EditableText
                  blockKey="analyzer.section1_ngram2_title"
                  defaultContent="2-Gram (Bigram):"
                  label="2-Gram Title"
                />
              </strong>
              <EditableText
                blockKey="analyzer.section1_ngram2"
                defaultContent='Two-word phrases (e.g., "keyword density", "search engine").'
                label="2-Gram Definition"
              />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 font-semibold block mb-0.5">
                <EditableText
                  blockKey="analyzer.section1_ngram3_title"
                  defaultContent="3-Gram (Trigram):"
                  label="3-Gram Title"
                />
              </strong>
              <EditableText
                blockKey="analyzer.section1_ngram3"
                defaultContent='Three-word long-tail phrases (e.g., "real-time content analysis").'
                label="3-Gram Definition"
              />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 font-semibold block mb-0.5">
                <EditableText
                  blockKey="analyzer.section1_ngram4_title"
                  defaultContent="4-Gram (Quadgram):"
                  label="4-Gram Title"
                />
              </strong>
              <EditableText
                blockKey="analyzer.section1_ngram4"
                defaultContent='Four-word structural phrases (e.g., "free online keyword density").'
                label="4-Gram Definition"
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed pt-1">
          <EditableText
            blockKey="analyzer.section1_outro"
            defaultContent="By analyzing multi-word combinations, you can instantly identify unintended word repetition, uncover natural long-tail phrases, and align your writing with how modern search engines understand context."
            label="Section 1 Closing Paragraph"
            multiline
          />
        </p>
      </section>

      {/* Section 2 (H2): Key Features of Our Free Keyword & Text Analyzer */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 flex-wrap">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            <EditableText
              blockKey="analyzer.section2_title"
              defaultContent="Key Features of Our Free Keyword & Text Analyzer"
              label="Section 2 (H2) Heading"
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 flex-wrap">
              <Activity className="w-4 h-4 text-emerald-600" />
              <EditableText
                blockKey="analyzer.feature1_title"
                defaultContent="Live Visual Distribution Map"
                label="Feature 1 Title"
              />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <EditableText
                blockKey="analyzer.feature1_desc"
                defaultContent="Most tools only give you a raw count. Our tool splits your text into 10 document segments to show you where your keywords appear, helping you fix uneven keyword clustering across paragraphs."
                label="Feature 1 Description"
                multiline
              />
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 flex-wrap">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <EditableText
                blockKey="analyzer.feature2_title"
                defaultContent="Prominence & Metric Ranking"
                label="Feature 2 Title"
              />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <EditableText
                blockKey="analyzer.feature2_desc"
                defaultContent="Instead of sorting words strictly by count, our tool calculates a Prominence Score (Frequency × Phrase Length). This highlights meaningful, semantically rich phrases instead of generic filler words."
                label="Feature 2 Description"
                multiline
              />
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2 md:col-span-2">
            <h3 className="text-sm font-bold text-slate-900">
              <EditableText
                blockKey="analyzer.feature3_title"
                defaultContent="Color-Coded Target Diagnostics"
                label="Feature 3 Title"
              />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900">
                <strong className="block font-semibold mb-0.5">
                  <EditableText
                    blockKey="analyzer.diag_natural_title"
                    defaultContent="🟢 Natural (0.5% – 2.5%)"
                    label="Natural Threshold Heading"
                  />
                </strong>
                <EditableText
                  blockKey="analyzer.diag_natural_desc"
                  defaultContent="Balanced, reader-friendly keyword integration."
                  label="Natural Threshold Description"
                />
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                <strong className="block font-semibold mb-0.5">
                  <EditableText
                    blockKey="analyzer.diag_high_title"
                    defaultContent="🟡 High Density (2.5% – 4.0%)"
                    label="High Density Threshold Heading"
                  />
                </strong>
                <EditableText
                  blockKey="analyzer.diag_high_desc"
                  defaultContent="Borderline repetition; review for natural flow."
                  label="High Density Threshold Description"
                />
              </div>
              <div className="p-3 rounded-xl bg-red-50/70 border border-red-200 text-xs text-red-900">
                <strong className="block font-semibold mb-0.5">
                  <EditableText
                    blockKey="analyzer.diag_over_title"
                    defaultContent="🔴 Over-Optimized (> 4.0%)"
                    label="Over-Optimized Threshold Heading"
                  />
                </strong>
                <EditableText
                  blockKey="analyzer.diag_over_desc"
                  defaultContent="High risk of keyword stuffing."
                  label="Over-Optimized Threshold Description"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 flex-wrap">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <EditableText
                blockKey="analyzer.feature4_title"
                defaultContent="Advanced Lexical Metrics"
                label="Feature 4 Title"
              />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <EditableText
                blockKey="analyzer.feature4_desc"
                defaultContent="Track Lexical Diversity (the ratio of unique words to total words), Reading Time, and overall vocabulary complexity to ensure high readability."
                label="Feature 4 Description"
                multiline
              />
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 flex-wrap">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <EditableText
                blockKey="analyzer.feature5_title"
                defaultContent="100% Client-Side Privacy"
                label="Feature 5 Title"
              />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <EditableText
                blockKey="analyzer.feature5_desc"
                defaultContent="Your text is processed directly inside your web browser. Nothing is ever uploaded to a remote server, keeping your confidential drafts and articles 100% private."
                label="Feature 5 Description"
                multiline
              />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
