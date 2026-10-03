'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  Check,
  Sparkles,
  Sliders,
  Terminal,
} from 'lucide-react';

export const OnPageAuditScorerGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: 'faq_1',
      q: 'How does the On-Page Technical SEO Audit Scorer calculate its score?',
      a: 'The tool evaluates your live inputs (Meta Title, Meta Description, Focus Keyword, Canonical URL, OpenGraph Image, and FAQs count) against weighted technical SEO quality algorithms. Each parameter is tested for length, keyword presence, and architectural validity, deducting penalty points for failures.',
    },
    {
      id: 'faq_2',
      q: 'What parameters can I test in the interactive auditor?',
      a: 'You can test your Meta Title character length and keyword match, Meta Description length and relevance, Focus Keyword consistency, Canonical URL format, OpenGraph Image absolute path, and FAQ block count.',
    },
    {
      id: 'faq_3',
      q: 'What is considered an ideal Meta Title and Description length?',
      a: 'An optimal Meta Title should be between 30 and 60 characters with your focus keyword front-loaded. An optimal Meta Description should be between 120 and 160 characters to prevent truncation in search engine result pages (SERPs).',
    },
  ];

  return (
    <article className="w-full h-auto overflow-visible space-y-12 text-slate-800 antialiased pt-10 border-t border-slate-200/80">
      {/* FAQPage JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.a,
              },
            })),
          }),
        }}
      />

      {/* 1. INTRODUCTION / HOOK */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Tool Documentation
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            On-Page Technical SEO Audit Scorer
          </h2>
        </div>

        <div className="prose prose-slate text-sm sm:text-base leading-relaxed space-y-4 text-slate-700">
          <p className="font-medium text-slate-900 text-base sm:text-lg">
            Test and score your webpage parameters instantly with our interactive on-page technical SEO auditor.
          </p>
          <p>
            Basic SEO checkers only look at isolated metadata. This tool evaluates your complete on-page parameter set—including <strong className="text-slate-900">Meta Titles</strong>, <strong className="text-slate-900">Meta Descriptions</strong>, <strong className="text-slate-900">Focus Keywords</strong>, <strong className="text-slate-900">Canonical URLs</strong>, <strong className="text-slate-900">OpenGraph Images</strong>, and <strong className="text-slate-900">FAQ Schema Counts</strong>—against weighted algorithmic quality signals.
          </p>
        </div>

        {/* Tool Jump Callout */}
        <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <strong className="text-emerald-950 font-bold block text-sm">Ready to score your page?</strong>
            <p className="text-xs text-emerald-800">
              Input your metadata and focus keyword in the auditor above to view real-time health grades and penalties.
            </p>
          </div>
          <a
            href="#validator"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-xs"
          >
            Jump to the Audit Scorer →
          </a>
        </div>
      </section>

      {/* 2. THE CORE AUDIT PARAMETERS EVALUATED */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Core Parameters Evaluated by the Scorer
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The interactive tool tests your inputs against these specific technical benchmarks:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Parameter Input</th>
                <th className="p-3.5">What the Tool Checks</th>
                <th className="p-3.5">Optimal Benchmark</th>
                <th className="p-3.5">Penalty / Failure Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">Meta Title</td>
                <td className="p-3.5 text-slate-700">Character length &amp; focus keyword inclusion</td>
                <td className="p-3.5 text-slate-600">30–60 characters with exact keyword match</td>
                <td className="p-3.5 text-red-700">Missing title, too short/long, or keyword absent</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">Meta Description</td>
                <td className="p-3.5 text-slate-700">Snippet length &amp; persuasive copy depth</td>
                <td className="p-3.5 text-slate-600">120–160 characters</td>
                <td className="p-3.5 text-red-700">Empty description or truncation risk (&gt;160 chars)</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">Focus Keyword</td>
                <td className="p-3.5 text-slate-700">Topical consistency across metadata &amp; content</td>
                <td className="p-3.5 text-slate-600">Present in Title, Description, and body copy</td>
                <td className="p-3.5 text-red-700">Keyword missing from title or metadata tags</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">Canonical URL</td>
                <td className="p-3.5 text-slate-700">Absolute URL format &amp; duplicate protection</td>
                <td className="p-3.5 text-slate-600">Valid absolute URL starting with https://</td>
                <td className="p-3.5 text-red-700">Missing canonical, relative URL, or invalid protocol</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">OpenGraph Image &amp; FAQs</td>
                <td className="p-3.5 text-slate-700">Social sharing assets and structured data count</td>
                <td className="p-3.5 text-slate-600">Absolute OG image URL and 3+ FAQ items</td>
                <td className="p-3.5 text-red-700">Missing social preview image or zero FAQ schema blocks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. HOW SCORING & PENALTIES WORK */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          How Scoring &amp; Penalties Work in the Tool
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The auditor starts at a baseline score of 100 and applies weighted penalties for each failed check:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-red-50/60 rounded-2xl border border-red-200 space-y-3">
            <h4 className="font-bold text-red-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Critical Penalties (-15 to -25 pts)
            </h4>
            <p className="text-xs text-red-800 leading-relaxed">
              Triggered when foundational elements are missing or invalid—such as a missing meta title, missing canonical tag, or absent focus keyword. These severely impact search visibility and indexation.
            </p>
          </div>

          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
            <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Warning Penalties (-5 to -10 pts)
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Triggered by sub-optimal metadata lengths, missing OpenGraph preview images, or insufficient FAQ structured data items. These impair click-through rates and rich result eligibility.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PRACTICAL AUDITING WORKFLOW WITH THE TOOL */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Practical Auditing Workflow with the Tool
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Follow these steps when testing your web pages using our interactive scorer:
        </p>

        <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <li className="text-slate-900">
            <strong className="text-slate-900">Input Your Focus Keyword:</strong> Define your primary target keyword so the tool can verify exact semantic matching across titles and descriptions.
          </li>
          <li className="text-slate-900">
            <strong className="text-slate-900">Paste Your Meta Title &amp; Description:</strong> Enter your live HTML tags to check character length counters and keyword presence instantly.
          </li>
          <li className="text-slate-900">
            <strong className="text-slate-900">Provide Canonical &amp; OpenGraph URLs:</strong> Ensure absolute URL formatting and prevent duplicate content penalties.
          </li>
          <li className="text-slate-900">
            <strong className="text-slate-900">Review Live Audit Findings:</strong> Examine the real-time penalty breakdown in the results panel to identify exactly which checks failed.
          </li>
          <li className="text-slate-900">
            <strong className="text-slate-900">Iterate &amp; Achieve a 90+ Grade:</strong> Refine your inputs until all critical blockers are resolved and your health grade reaches A+.
          </li>
        </ol>
      </section>

      {/* 5. OPTIMIZED META TAGS FOR THE TOOL LANDING PAGE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Optimized Meta Tags for the Audit Tool
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          High-CTR meta title and description options configured for this tool:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Option 1 (Direct &amp; Action-Oriented)
            </span>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900">Meta Title:</p>
              <p className="text-xs font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-800">
                On-Page Technical SEO Audit Scorer | Veritas SEO
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900">Meta Description:</p>
              <p className="text-xs font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-800">
                Run a comprehensive 100-point on-page SEO checklist evaluating title tags, H1 hierarchy, keyword placement, and meta directives.
              </p>
            </div>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Option 2 (Authority &amp; Enterprise Focus)
            </span>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900">Meta Title:</p>
              <p className="text-xs font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-800">
                Technical SEO Audit Scorer: On-Page Health Check
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900">Meta Description:</p>
              <p className="text-xs font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-800">
                Diagnose critical on-page SEO blockers, canonical mismatches, and semantic heading errors with our enterprise audit health scorer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
};
