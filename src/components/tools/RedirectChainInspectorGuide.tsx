'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  GitFork,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  Search,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export const REDIRECT_INSPECTOR_FAQS = [
  {
    id: 'faq_redir_1',
    q: 'What is a 301 redirect?',
    a: 'A 301 tells clients and search engines that a URL has moved permanently to another location.',
  },
  {
    id: 'faq_redir_2',
    q: 'What is a redirect chain?',
    a: 'A redirect chain happens when one URL redirects to another URL, which redirects again before reaching the final page.',
  },
  {
    id: 'faq_redir_3',
    q: 'Are redirect chains bad for SEO?',
    a: 'Long or unnecessary chains can add latency and make crawling less efficient. Google recommends redirecting directly to the final destination when possible.',
  },
  {
    id: 'faq_redir_4',
    q: 'What is the difference between 301 and 302?',
    a: 'A 301 indicates a permanent move, while a 302 indicates a temporary redirect. Google treats them differently when determining which URL should be canonical.',
  },
  {
    id: 'faq_redir_5',
    q: 'What does 200 OK mean?',
    a: 'It means the server successfully returned the requested resource.',
  },
  {
    id: 'faq_redir_6',
    q: 'What does 404 mean?',
    a: 'A 404 means the requested resource could not be found.',
  },
  {
    id: 'faq_redir_7',
    q: 'What should I do if a redirect ends in 404?',
    a: 'Check the redirect rule and make sure the destination URL exists and is the intended replacement.',
  },
];

const COMMON_STATUS_CODES = [
  {
    code: '200 OK',
    type: '2xx Success',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    desc: 'The page responded successfully.',
  },
  {
    code: '301 Moved Permanently',
    type: '3xx Redirect',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    desc: 'The URL has permanently moved.',
  },
  {
    code: '302 Found',
    type: '3xx Redirect',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    desc: 'A temporary redirect.',
  },
  {
    code: '307 Temporary Redirect',
    type: '3xx Redirect',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    desc: 'Temporary redirect while preserving the request method.',
  },
  {
    code: '308 Permanent Redirect',
    type: '3xx Redirect',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    desc: 'Permanent redirect while preserving the request method.',
  },
  {
    code: '404 Not Found',
    type: '4xx Client Error',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
    desc: "The requested page doesn't exist.",
  },
  {
    code: '410 Gone',
    type: '4xx Client Error',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
    desc: 'The resource has been permanently removed.',
  },
  {
    code: '500 Server Error',
    type: '5xx Server Error',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    desc: 'Something went wrong on the server.',
  },
];

export const RedirectChainInspectorGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <article className="w-full h-auto overflow-visible space-y-10 text-slate-800 antialiased">
      {/* 1. HERO INTRO */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Technical HTTP &amp; Crawl Diagnostic Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            HTTP Status &amp; 301 Redirect Chain Inspector
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
            Check the <strong>HTTP status code</strong> of a URL and see exactly where its redirects lead.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            This tool helps you spot <strong>301 redirect chains, 302 redirects, redirect loops, broken destinations, and unexpected HTTP errors</strong> without manually checking each URL.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE IT */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-emerald-600" />
            How to Use It
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Enter a URL and run the check. The inspector follows the redirect path and shows each step, including the <strong>status code, URL, and final destination</strong>.
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For example:</p>
          <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto flex items-center gap-2">
            <code>Old URL → 301 → Another URL → 301 → Final URL → 200</code>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A single redirect is often fine. If several redirects are chained together, it is usually cleaner to point the old URL directly to the final destination. Google specifically recommends avoiding unnecessary redirect chains.
        </p>
      </section>

      {/* 3. COMMON HTTP STATUS CODES */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-600" />
            Common HTTP Status Codes
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COMMON_STATUS_CODES.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-bold text-sm text-slate-900">{item.code}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${item.badgeClass}`}>
                  {item.type}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium">
          HTTP status codes are grouped into success (<code className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800">2xx</code>), redirects (<code className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800">3xx</code>), client errors (<code className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800">4xx</code>), and server errors (<code className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800">5xx</code>).
        </div>
      </section>

      {/* 4. WHY CHECK 301 REDIRECT CHAINS? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Why Check 301 Redirect Chains?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Redirect chains can add unnecessary requests and latency. They can also make migrations and URL changes harder to maintain.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          For permanent URL changes, Google recommends using <strong>server-side 301 or 308 redirects</strong> where appropriate and redirecting old URLs directly to their final destinations.
        </p>

        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">Example</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Instead of (Inefficient Multi-Hop):
              </span>
              <p className="font-mono text-xs text-rose-950 bg-white/80 p-2.5 rounded-xl border border-rose-200/60 break-all">
                /old-page → 301 → /new-page → 301 → /final-page
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Prefer (Direct Single Hop):
              </span>
              <p className="font-mono text-xs text-emerald-950 bg-white/80 p-2.5 rounded-xl border border-emerald-200/60 break-all">
                /old-page → 301 → /final-page
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT SHOULD YOU LOOK FOR? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            What Should You Look For?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 font-semibold">
          When reviewing the results, pay attention to:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Long redirect chains',
            'Redirect loops',
            '301 followed by another redirect',
            'Unexpected 302 redirects',
            'Redirects ending in 404 or 5xx errors',
            'HTTP → HTTPS → another redirect',
            "A final URL that isn't the page you expected",
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-900"
            >
              <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 leading-relaxed">
          Google says its crawlers generally follow up to 10 redirect hops, but recommends keeping chains short and avoiding unnecessary hops.
        </div>
      </section>

      {/* 6. QUICK SEO CHECK */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Quick SEO Check
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          If you recently changed URLs, migrated a website, switched domains, or changed your HTTP/HTTPS setup, run the important old URLs through this inspector.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          A clean redirect path makes it easier to see whether visitors and crawlers are being sent where you intended.
        </p>
        <div className="pt-2">
          <p className="text-sm font-bold text-emerald-400">
            Enter a URL above to inspect its HTTP status and redirect chain.
          </p>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> Redirect &amp; Status Code FAQ
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {REDIRECT_INSPECTOR_FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
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
                    <p className="whitespace-pre-line">{faq.a}</p>
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
