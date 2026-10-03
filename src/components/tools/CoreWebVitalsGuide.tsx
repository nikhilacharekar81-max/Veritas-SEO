'use client';

import React, { useState } from 'react';
import {
  Zap,
  Layout,
  Clock,
  ChevronDown,
  Check,
  AlertTriangle,
  Info,
  Sparkles,
  MousePointer2,
} from 'lucide-react';

export const CoreWebVitalsGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: 'faq_1',
      q: 'Why does my CLS score fluctuate between different tests?',
      a: 'Layout shifts are often caused by the order in which resources load. If a slow third-party script or a heavy image finishes loading at a slightly different time, it can push content down differently. Real user data (CrUX) often shows higher CLS than lab tools because users interact with the page, triggering shifts that automated bots might miss.',
    },
    {
      id: 'faq_2',
      q: 'Does a 0.11 CLS score really hurt my rankings?',
      a: 'Google treats 0.10 as the "Good" threshold. While a 0.11 score won\'t cause your site to disappear, you technically fall into the "Needs Improvement" category. For highly competitive niches, hitting that "Good" green checkmark across all three Core Web Vitals is a significant tie-breaker in search rankings.',
    },
    {
      id: 'faq_3',
      q: 'How does INP differ from the old First Input Delay (FID)?',
      a: 'FID only measured the delay of the very first interaction. INP (Interaction to Next Paint) is much more thorough—it looks at the latency of all interactions (clicks, taps, keyboard presses) throughout the entire time a user is on your page. It measures how long it takes for the browser to actually show a visual response after you click something.',
    },
    {
      id: 'faq_4',
      q: 'Can images with "width" and "height" attributes still cause CLS?',
      a: 'If you have the attributes but your CSS overrides them without maintaining the aspect ratio (e.g., setting "width: 100%; height: auto;" without a parent container or modern aspect-ratio CSS), you might still see shifts. Always ensure the browser can reserve the exact space before the image file itself arrives.',
    },
  ];

  return (
    <article className="w-full h-auto overflow-visible space-y-12 text-slate-800 antialiased pt-10 border-t border-slate-200/80">
      {/* FAQPage JSON-LD Schema */}
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

      {/* 1. THE HUMAN HOOK */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold font-mono">
            <Zap className="w-3.5 h-3.5" /> Performance Engineering Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Stop the "Click-and-Shift" Frustration
          </h2>
        </div>

        <div className="prose prose-slate text-sm sm:text-base leading-relaxed space-y-4 text-slate-700">
          <p className="font-medium text-slate-900 text-base sm:text-lg">
            We've all been there: you're about to click a "Read More" button, and suddenly—without warning—the entire page jumps. You end up clicking a random ad instead.
          </p>
          <p>
            That jump is exactly what <strong className="text-slate-900">Cumulative Layout Shift (CLS)</strong> measures. It's not about how fast your page loads; it's about how stable it feels while it's loading. Google uses this, along with LCP and INP, to decide if your website is a "good experience" or a technical mess that annoys users.
          </p>
          <p>
            If your page elements move around like a game of Whac-A-Mole, your technical SEO health is taking a hit. This guide breaks down the math behind the shifts and how to fix them.
          </p>
        </div>
      </section>

      {/* 2. THE THREE PILLARS (CORE WEB VITALS) */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          The Three Pillars of User Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Layout className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900">CLS: Stability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Measures visual jumps. Goal is <strong>0.10 or less</strong>. High scores usually mean images or ads are loading without reserved space.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900">LCP: Speed</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Measures when the largest "hero" element is visible. Goal is <strong>2.5 seconds or less</strong>. Slow servers or heavy images kill this.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <MousePointer2 className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900">INP: Responsiveness</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Measures how fast the page reacts to clicks. Goal is <strong>200ms or less</strong>. Long-running JavaScript blocks this interaction.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Metric</th>
                <th className="p-4">What it measures</th>
                <th className="p-4">Good</th>
                <th className="p-4">Needs Improvement</th>
                <th className="p-4">Poor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">CLS</td>
                <td className="p-4 text-slate-600">Visual Stability</td>
                <td className="p-4 text-emerald-700 font-mono font-bold">≤ 0.10</td>
                <td className="p-4 text-amber-700 font-mono font-bold">0.11 – 0.25</td>
                <td className="p-4 text-red-700 font-mono font-bold">&gt; 0.25</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">LCP</td>
                <td className="p-4 text-slate-600">Loading Performance</td>
                <td className="p-4 text-emerald-700 font-mono font-bold">≤ 2.5s</td>
                <td className="p-4 text-amber-700 font-mono font-bold">2.6s – 4.0s</td>
                <td className="p-4 text-red-700 font-mono font-bold">&gt; 4.0s</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">INP</td>
                <td className="p-4 text-slate-600">Interactivity</td>
                <td className="p-4 text-emerald-700 font-mono font-bold">≤ 200ms</td>
                <td className="p-4 text-amber-700 font-mono font-bold">201ms – 500ms</td>
                <td className="p-4 text-red-700 font-mono font-bold">&gt; 500ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. CLS MATH BREAKDOWN */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          The Math Behind the Shift
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          Google doesn't just "feel" the shift; they calculate it using two specific numbers: the <strong>Impact Fraction</strong> and the <strong>Distance Fraction</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">1</div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Impact Fraction</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  This measures how much space the unstable element takes up in the total viewport. If an element that takes up 50% of your screen moves, your impact fraction is high.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">2</div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Distance Fraction</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  This is the greatest distance the unstable element moved, relative to the largest dimension of the viewport (usually the height).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 flex flex-col justify-center space-y-4">
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">A Concrete Example</h5>
            <div className="space-y-2">
              <p className="text-xs text-slate-300">
                Imagine an image taking up <strong>40% (0.40)</strong> of the screen height. 
                It suddenly shifts down by <strong>15% (0.15)</strong> of the screen height.
              </p>
              <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 font-mono text-xs text-white">
                Impact (0.40) + Shift (0.15) = 0.55 Total Area Affected<br/>
                0.55 × 0.15 = <span className="text-emerald-400 font-bold">0.0825 CLS Score</span>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                *Since 0.0825 is less than 0.10, this specific shift is technically "Good".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FIXING WORKFLOW */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          How to Lower Your CLS Scores
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          If you're staring at a red "Poor" score in the calculator, here is your sequential fixing workflow:
        </p>

        <div className="space-y-4">
          <div className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">1</div>
            <div className="space-y-1">
              <h5 className="font-bold text-slate-900 text-sm">Specify Dimensions for Media</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Always include <code>width</code> and <code>height</code> attributes on your <code>&lt;img&gt;</code> and <code>&lt;video&gt;</code> tags. This lets the browser reserve the space before the file even starts downloading.
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">2</div>
            <div className="space-y-1">
              <h5 className="font-bold text-slate-900 text-sm">Reserve Space for Ad Slots</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dynamic ads are the #1 killer of CLS. Style the container div with a minimum height so that when the ad eventually pops in, it doesn't push the text below it.
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">3</div>
            <div className="space-y-1">
              <h5 className="font-bold text-slate-900 text-sm">Use "font-display: swap"</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Web fonts can cause shifts when they swap from a system font to your custom brand font. Using "swap" ensures text is visible immediately, but you should also match the fallback font's size to the brand font.
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">4</div>
            <div className="space-y-1">
              <h5 className="font-bold text-slate-900 text-sm">Avoid Injecting Content Above Existing Content</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Never use JavaScript to insert a banner or a newsletter popup at the top of the page after the initial load. If you must have a top banner, it should be in the initial HTML or have a reserved placeholder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE TRAP */}
      <section className="p-6 sm:p-10 rounded-3xl bg-amber-50 border border-amber-200 space-y-4">
        <div className="flex items-center gap-2 text-amber-800">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold text-lg">The "Optimization Trap"</h3>
        </div>
        <p className="text-sm text-amber-900 leading-relaxed">
          It's tempting to think that only huge shifts matter. But <strong className="font-bold">Cumulative</strong> Layout Shift is exactly that: cumulative. Five tiny shifts of 0.02 can add up to a 0.10 "Needs Improvement" score. 
        </p>
        <p className="text-sm text-amber-900 leading-relaxed">
          That doesn't mean you should spend weeks chasing a 0.00 score. If you're at 0.05, you're in the green—spend your time on LCP or content quality instead.
        </p>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Expert QA: Core Web Vitals
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
                      isOpen ? 'rotate-180 text-blue-600' : ''
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

      {/* FINAL TAKEAWAY */}
      <section className="text-center space-y-4 pt-6">
        <div className="max-w-2xl mx-auto">
          <h4 className="text-lg font-bold text-slate-900">Final Action Item</h4>
          <p className="text-sm text-slate-600 mt-2">
            Go to the calculator above. Enter your measured Impact and Distance fractions from Chrome DevTools. If you see red, start with image dimensions—it fixes 80% of CLS issues overnight.
          </p>
        </div>
      </section>
    </article>
  );
};
