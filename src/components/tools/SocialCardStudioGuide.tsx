'use client';

import React, { useState } from 'react';
import {
  Share2,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Layers,
  Sparkles,
  Terminal,
} from 'lucide-react';

export const SocialCardStudioGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: 'faq_1',
      q: 'What size should an Open Graph image be?',
      a: 'The universal standard for Open Graph and Twitter/X large card images is 1200×630 pixels (an exact 1.91:1 aspect ratio). Using this resolution ensures images display crisply across Facebook, LinkedIn, Discord, Slack, and X without awkward cropping or letterboxing.',
    },
    {
      id: 'faq_2',
      q: 'How do I force Facebook or X to refresh a cached social card?',
      a: 'Platforms cache social metadata aggressively. To force a refresh, use the official debugger tools: paste your URL into the Facebook Sharing Debugger (click "Scrape Again") or the X Card Validator to clear their edge scrapers and fetch the latest tags.',
    },
    {
      id: 'faq_3',
      q: 'What happens if my og:title is too long?',
      a: 'Most platforms truncate titles that exceed 60 characters with ellipses (...). It is best practice to keep your primary hook and brand name within the first 50–60 characters to ensure full readability in shared feed previews.',
    },
  ];

  return (
    <article className="w-full h-auto overflow-visible space-y-10 text-slate-800 antialiased pt-8 border-t border-slate-200/80">
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

      {/* 1. QUICK-REFERENCE CORE PROPERTIES TABLE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Social Metadata Cheat Sheet
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Quick-Reference Core Social Properties
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            Developers and technical marketers rely on standardized Open Graph and Twitter Card properties in the HTML <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">&lt;head&gt;</code> to control how links unfurl across social feeds.
          </p>
        </div>

        {/* Core Properties Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Meta Property</th>
                <th className="p-3.5">Syntax Example</th>
                <th className="p-3.5">Primary Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-emerald-800">og:title</td>
                <td className="p-3.5 font-mono text-slate-600 text-xs">&lt;meta property=&quot;og:title&quot; content=&quot;Your Headline&quot; /&gt;</td>
                <td className="p-3.5 text-slate-700">The headline shown on the shared social card.</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-emerald-800">og:description</td>
                <td className="p-3.5 font-mono text-slate-600 text-xs">&lt;meta property=&quot;og:description&quot; content=&quot;Summary text...&quot; /&gt;</td>
                <td className="p-3.5 text-slate-700">The supporting summary text below the title.</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-emerald-800">og:image</td>
                <td className="p-3.5 font-mono text-slate-600 text-xs">&lt;meta property=&quot;og:image&quot; content=&quot;https://.../img.jpg&quot; /&gt;</td>
                <td className="p-3.5 text-slate-700">The visual asset (must be a fully qualified absolute URL).</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-emerald-800">og:url</td>
                <td className="p-3.5 font-mono text-slate-600 text-xs">&lt;meta property=&quot;og:url&quot; content=&quot;https://...&quot; /&gt;</td>
                <td className="p-3.5 text-slate-700">The canonical URL associated with the shared object.</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-blue-800">twitter:card</td>
                <td className="p-3.5 font-mono text-slate-600 text-xs">&lt;meta name=&quot;twitter:card&quot; content=&quot;summary_large_image&quot; /&gt;</td>
                <td className="p-3.5 text-slate-700">Controls X card formatting (large image vs. summary).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. OFFICIAL PLATFORM DEBUGGERS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-emerald-600" /> Official Platform Scrapers &amp; Debugging Tools
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Every practitioner knows the frustration of publishing correct Open Graph tags only to find a social platform displaying stale cached previews. Use these official developer debuggers to force-refresh scraper caches:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Facebook Sharing Debugger</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Used for Facebook and WhatsApp link previews. Click &quot;Scrape Again&quot; to clear edge cache.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">X Card Validator</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Used for Twitter/X cards. Inspects raw card markup and previews large image layout.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">LinkedIn Post Inspector</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Used for professional shares on LinkedIn. Clears thumbnail cache and verifies og:image dimensions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq-section" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> FAQ Reference
          </div>
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
