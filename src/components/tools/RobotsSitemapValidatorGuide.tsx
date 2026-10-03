'use client';

import React, { useState } from 'react';
import {
  Bot,
  ChevronDown,
  Check,
} from 'lucide-react';

export const RobotsSitemapValidatorGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: 'faq_1',
      q: 'Does robots.txt prevent a URL from being indexed in Google?',
      a: 'No. Blocking a URL in robots.txt prevents crawling, but if external pages link to that URL, Google may still index the URL without page content. Use a noindex meta tag or X-Robots-Tag to guarantee de-indexation.',
    },
    {
      id: 'faq_2',
      q: 'What is the maximum number of URLs allowed in an XML Sitemap?',
      a: 'A single XML Sitemap file can contain up to 50,000 URLs and must be uncompressed under 50 MB. Larger websites should use a Sitemap index file to reference multiple sitemap files.',
    },
    {
      id: 'faq_3',
      q: 'Why does my Sitemap URL get blocked by robots.txt?',
      a: 'This is a common cross-file conflict where a URL is listed in your XML sitemap for search discovery, but your robots.txt file contains a Disallow rule covering that path. Review whether the path should be crawlable or removed from the sitemap.',
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

      {/* Intro Box & Jump Link */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
            <Bot className="w-3.5 h-3.5" /> Complete Technical Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Robots.txt &amp; XML Sitemap Directive Validator
          </h2>
        </div>

        <div className="prose prose-slate text-sm sm:text-base leading-relaxed space-y-4 text-slate-700">
          <p className="font-medium text-slate-900 text-base sm:text-lg">
            Don&apos;t validate your robots.txt and XML Sitemap separately.
          </p>
          <p>
            A robots.txt file controls crawler access, while an XML Sitemap helps search engines discover URLs. Looking at only one of them can miss problems that appear when the two files are considered together.
          </p>
          <p>
            This validator checks both and looks for conflicts between them, including URLs that appear in your Sitemap but are blocked from crawling.
          </p>
        </div>

        {/* Tool Jump Callout */}
        <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <strong className="text-emerald-950 font-bold block text-sm">Ready to check your files?</strong>
            <p className="text-xs text-emerald-800">
              Use the validator above to audit robots.txt, XML Sitemaps, and cross-file conflicts.
            </p>
          </div>
          <a
            href="#validator"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-xs"
          >
            Jump straight to the validator →
          </a>
        </div>
      </div>

      {/* The Two Pillars */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          The two pillars of crawl control
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Control mechanism</th>
                <th className="p-3.5">Primary purpose</th>
                <th className="p-3.5">What it can do</th>
                <th className="p-3.5">What it cannot do</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">robots.txt</td>
                <td className="p-3.5 text-slate-700">Manage crawler access</td>
                <td className="p-3.5 text-slate-600">Allow or disallow crawling of paths for specific user agents</td>
                <td className="p-3.5 text-slate-600">Guarantee that a URL is removed from search results</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">XML Sitemap</td>
                <td className="p-3.5 text-slate-700">Help search engines discover important URLs</td>
                <td className="p-3.5 text-slate-600">Provide URLs that you want search engines to discover</td>
                <td className="p-3.5 text-slate-600">Force a URL to be crawled or indexed</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>These files work together, but they solve different problems.</p>
          <p>
            A Sitemap says, in effect, <strong className="text-slate-900">&ldquo;these are URLs I want search engines to know about.&rdquo;</strong>
          </p>
          <p>
            robots.txt says, <strong className="text-slate-900">&ldquo;these are the paths this crawler is allowed to request.&rdquo;</strong>
          </p>
          <p>That difference becomes important when the same URL appears in both systems.</p>
        </div>
      </section>

      {/* Check the complete configuration, not just individual files */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Check the complete configuration, not just individual files
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A technically valid robots.txt can still be part of a poor crawl configuration.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">For example, your Sitemap might contain:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>https://example.com/products/widget-a</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700">while robots.txt contains:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`User-agent: *\nDisallow: /products/`}</code>
        </pre>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>The Sitemap tells search engines about the URL. robots.txt prevents compliant crawlers from fetching it.</p>
          <p>The files are individually understandable, but the combined configuration deserves attention.</p>
          <p>The validator can flag this kind of cross-file conflict so you can investigate it instead of checking each file in isolation.</p>
        </div>
      </section>

      {/* A practical troubleshooting flow */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          A practical troubleshooting flow
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          When a URL is not being crawled or indexed as expected, check the configuration in this order:
        </p>

        <ol className="list-decimal list-inside space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <li className="font-bold text-slate-900">
            <span className="font-normal text-slate-700"><strong className="text-slate-900">Check the live URL</strong>
              <ul className="list-disc list-inside ml-5 mt-1.5 space-y-1">
                <li>Does it return the expected HTTP status?</li>
                <li>Is the URL reachable?</li>
                <li>Does it redirect somewhere else?</li>
              </ul>
            </span>
          </li>
          <li className="font-bold text-slate-900">
            <span className="font-normal text-slate-700"><strong className="text-slate-900">Check robots.txt</strong>
              <ul className="list-disc list-inside ml-5 mt-1.5 space-y-1">
                <li>Is the relevant crawler allowed to access the URL?</li>
                <li>Does a broader <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">Disallow</code> rule cover the path?</li>
              </ul>
            </span>
          </li>
          <li className="font-bold text-slate-900">
            <span className="font-normal text-slate-700"><strong className="text-slate-900">Check the XML Sitemap</strong>
              <ul className="list-disc list-inside ml-5 mt-1.5 space-y-1">
                <li>Is the URL actually listed?</li>
                <li>Is the Sitemap accessible and valid?</li>
              </ul>
            </span>
          </li>
          <li className="font-bold text-slate-900">
            <span className="font-normal text-slate-700"><strong className="text-slate-900">Check indexing directives</strong>
              <ul className="list-disc list-inside ml-5 mt-1.5 space-y-1">
                <li>Does the page return a <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">noindex</code> directive?</li>
                <li>Is there an <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">X-Robots-Tag</code> header?</li>
              </ul>
            </span>
          </li>
          <li className="font-bold text-slate-900">
            <span className="font-normal text-slate-700"><strong className="text-slate-900">Check for cross-file conflicts</strong>
              <ul className="list-disc list-inside ml-5 mt-1.5 space-y-1">
                <li>Is a Sitemap URL blocked by robots.txt?</li>
                <li>Is the Sitemap pointing to URLs that should not be indexed?</li>
              </ul>
            </span>
          </li>
          <li className="font-bold text-slate-900">
            <span className="font-normal text-slate-700"><strong className="text-slate-900">Check the host and protocol</strong>
              <ul className="list-disc list-inside ml-5 mt-1.5 space-y-1">
                <li>Are you mixing HTTP and HTTPS?</li>
                <li>Are <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">www</code> and non-<code className="font-mono bg-slate-100 px-1 py-0.5 rounded">www</code> versions being mixed?</li>
                <li>Is the Sitemap hosted on the expected hostname?</li>
              </ul>
            </span>
          </li>
        </ol>

        <p className="text-xs sm:text-sm text-slate-700">
          This prevents a common mistake: treating a Sitemap problem as a robots.txt problem, or vice versa.
        </p>
      </section>

      {/* How robots.txt actually works */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          How robots.txt actually works
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          robots.txt is a plain-text file normally placed at the root of a host:
        </p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>https://example.com/robots.txt</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700">A basic configuration might look like this:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`User-agent: *
Disallow: /admin/
Disallow: /private/

Sitemap: https://example.com/sitemap.xml`}</code>
        </pre>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p><code className="font-mono bg-slate-100 px-1 py-0.5 rounded">User-agent</code> identifies the crawler group to which the following rules apply.</p>
          <p><code className="font-mono bg-slate-100 px-1 py-0.5 rounded">Disallow</code> specifies paths that the crawler should not request.</p>
          <p>A <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">Sitemap</code> directive provides the location of an XML Sitemap.</p>
          <p className="font-semibold text-slate-900">
            The important point is that robots.txt controls <span className="underline">crawling</span>, not guaranteed indexing.
          </p>
        </div>
      </section>

      {/* User-agent groups matter */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          User-agent groups matter
        </h3>
        <p className="text-xs sm:text-sm text-slate-700">Rules can be written for all crawlers or for a particular crawler.</p>
        <p className="text-xs sm:text-sm text-slate-700">For example:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`User-agent: *
Disallow: /private/

User-agent: Googlebot
Disallow: /internal/`}</code>
        </pre>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>The effective rules depend on which user agent is requesting the URL.</p>
          <p>
            This is one reason a validator should show which crawler group a rule applies to instead of treating every <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">Disallow</code> line as universally applicable.
          </p>
        </div>
      </section>

      {/* robots.txt is not an indexing control */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          robots.txt is not an indexing control
        </h3>
        <p className="text-xs sm:text-sm text-slate-700">A common misconception is:</p>

        <blockquote className="p-4 bg-slate-50 border-l-4 border-slate-900 text-slate-800 italic text-xs sm:text-sm">
          &ldquo;If I block a URL in robots.txt, Google will remove it from search.&rdquo;
        </blockquote>

        <p className="text-xs sm:text-sm text-slate-700">That is not what robots.txt is designed to guarantee.</p>
        <p className="text-xs sm:text-sm text-slate-700">
          If a crawler cannot fetch a URL, it may not be able to see page-level indexing directives such as <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">noindex</code>.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">
          If your goal is to prevent a page from being indexed, the correct technical approach depends on the situation. For a page that should remain accessible to crawlers but should not be indexed, a page-level <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">noindex</code> directive can be appropriate.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">For example:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`<meta name="robots" content="noindex">`}</code>
        </pre>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <p>The important relationship is:</p>
          <p className="text-slate-900 font-bold">robots.txt controls access to crawling.</p>
          <p className="text-slate-900 font-bold">noindex controls indexing when the crawler can access and process the page.</p>
          <p className="text-red-700 font-semibold">Do not use robots.txt as a security mechanism.</p>
        </div>
      </section>

      {/* robots.txt does not protect sensitive information */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          robots.txt does not protect sensitive information
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Blocking a directory does not make its contents private. A compliant crawler may follow the rule, but robots.txt is publicly accessible and does not prevent arbitrary clients from requesting a URL.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          For sensitive information, use actual access controls such as authentication, authorization, server-side restrictions, or appropriate CDN/WAF controls.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">For example, this:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`User-agent: *
Disallow: /private/`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700">
          should not be treated as a substitute for protecting <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">/private/</code> at the server level.
        </p>
      </section>

      {/* XML Sitemaps have a different job */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          XML Sitemaps have a different job
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          An XML Sitemap gives search engines a structured list of URLs that you want them to discover.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">A simple Sitemap looks like this:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-09-28</lastmod>
  </url>
</urlset>`}</code>
        </pre>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>The <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">&lt;loc&gt;</code> element contains the URL.</p>
          <p><code className="font-mono bg-slate-100 px-1 py-0.5 rounded">&lt;lastmod&gt;</code> can communicate when the page was last modified when the value is accurate and maintained correctly.</p>
          <p>A Sitemap is a discovery mechanism. It is not a command telling a search engine that every listed URL must be crawled or indexed.</p>
        </div>
      </section>

      {/* A Sitemap is not a priority queue */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          A Sitemap is not a priority queue
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Adding a URL to a Sitemap does not guarantee that search engines will crawl it immediately. Likewise, putting every URL on your site into a Sitemap does not automatically make the Sitemap better.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A useful Sitemap should represent URLs that you actually want search engines to discover and evaluate. Large sites often generate Sitemaps automatically, but the generated output still needs to be checked.
        </p>
      </section>

      {/* The Sitemap noindex trap */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          The Sitemap &ldquo;noindex&rdquo; trap
        </h3>
        <p className="text-xs sm:text-sm text-slate-700">Consider a Sitemap containing:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`<loc>https://example.com/old-page/</loc>`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700">If that page returns:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`<meta name="robots" content="noindex">`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          you have created a configuration that deserves investigation. The Sitemap is presenting the URL as a URL worth discovering, while the page is explicitly asking crawlers not to index it. This does not necessarily mean the Sitemap file itself is syntactically invalid. It means the URL selection may not match your indexing policy.
        </p>
      </section>

      {/* The robots.txt + Sitemap conflict */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          The robots.txt + Sitemap conflict
        </h3>
        <p className="text-xs sm:text-sm text-slate-700">One of the most useful checks is comparing URLs across both files.</p>
        <p className="text-xs sm:text-sm text-slate-700 font-semibold">For example:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">robots.txt</h4>
            <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
              <code>{`User-agent: *
Disallow: /checkout/
Disallow: /account/`}</code>
            </pre>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">Sitemap</h4>
            <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
              <code>{`<url>
  <loc>https://example.com/checkout/</loc>
</url>

<url>
  <loc>https://example.com/products/widget-a</loc>
</url>`}</code>
            </pre>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The Sitemap includes <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">/checkout/</code>, but robots.txt blocks that path. That does not mean the two files have a syntax error. It means the configuration contains a conflict worth reviewing. The validator should make this relationship visible instead of forcing you to compare thousands of URLs manually.
        </p>
      </section>

      {/* Modern AI crawlers need separate consideration */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Modern AI crawlers need separate consideration
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          AI-related crawler names are not interchangeable. For OpenAI services, for example, <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">GPTBot</code> and <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">OAI-SearchBot</code> serve different purposes. A configuration that blocks one should not automatically be described as blocking every OpenAI crawler.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">For example:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
Disallow:`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          This is a crawler-specific configuration. Whether it is appropriate depends on the site&apos;s own policy and objectives. The important part when auditing robots.txt is to identify the actual <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">User-agent</code> group rather than applying a blanket interpretation to every AI crawler.
        </p>
      </section>

      {/* Common robots.txt mistakes */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Common robots.txt mistakes
        </h3>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Blocking an important directory accidentally</h4>
            <p>A rule such as <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">Disallow: /products/</code> can affect every URL underneath that path for the applicable crawler group. Review broad path rules carefully.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Using the wrong user-agent</h4>
            <p>A rule aimed at one crawler does not automatically apply to every crawler.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Assuming an empty Disallow means &ldquo;block everything&rdquo;</h4>
            <p>It does not. For example:</p>
            <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
              <code>{`User-agent: *
Disallow:`}</code>
            </pre>
            <p>means there is no path restriction specified for that group.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Blocking CSS, JavaScript, or other resources without understanding the effect</h4>
            <p>Older robots.txt configurations sometimes contain broad resource restrictions that no longer make sense for modern sites. Before blocking a resource, understand whether crawlers need to access it to process the page correctly.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Forgetting that robots.txt is host-specific</h4>
            <p>These are different locations:</p>
            <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
              <code>{`https://example.com/robots.txt
https://www.example.com/robots.txt`}</code>
            </pre>
            <p>A configuration on one host does not automatically become the configuration for another host. Protocol and hostname changes can therefore matter during an audit.</p>
          </div>
        </div>
      </section>

      {/* XML Sitemap syntax problems */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          XML Sitemap syntax problems
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          XML is less forgiving than plain text. A malformed Sitemap may fail validation even when the URLs themselves look correct. For example, XML characters need to be escaped correctly.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">An ampersand in a URL may need to appear as:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`<loc>https://example.com/search?type=book&amp;sort=price</loc>`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700">rather than:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`<loc>https://example.com/search?type=book&sort=price</loc>`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 font-semibold">Other problems worth checking include:</p>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700">
          <li>malformed XML</li>
          <li>missing closing tags</li>
          <li>incorrect namespaces</li>
          <li>invalid URL structure</li>
          <li>invalid characters</li>
          <li>incorrect encoding</li>
          <li>unexpected bytes or whitespace</li>
          <li>relative URLs where absolute URLs are required</li>
          <li>redirected URLs</li>
          <li>inaccessible Sitemap files</li>
          <li>duplicate URLs</li>
          <li>URLs that no longer exist</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-700">A validator should check both the XML structure and the URLs contained inside it.</p>
      </section>

      {/* Invisible characters can cause real problems */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Invisible characters can cause real problems
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Files can contain characters that are difficult to notice in a normal editor. Encoding issues, unexpected byte-order marks, control characters, or copied whitespace can make a file behave differently from what it appears to show on screen. This is particularly useful to check when a Sitemap works after being regenerated but fails when manually edited.
        </p>
      </section>

      {/* Redirected Sitemap URLs deserve attention */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Redirected Sitemap URLs deserve attention
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A Sitemap should normally contain the canonical URL you actually want search engines to discover, rather than a URL that simply redirects somewhere else.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">For example:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>https://example.com/old-product/</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700">redirecting to:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>https://example.com/products/widget/</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          is a configuration worth reviewing if the old URL remains in the Sitemap. The same principle applies to broken URLs, non-canonical variants, and URLs that return unexpected status codes.
        </p>
      </section>

      {/* Don't turn the Sitemap into a URL dump */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Don&apos;t turn the Sitemap into a URL dump
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A Sitemap is not supposed to be a database export of every URL your application can generate. Be especially careful with URLs created by:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700">
          <li>search filters</li>
          <li>tracking parameters</li>
          <li>session parameters</li>
          <li>internal search</li>
          <li>duplicate category paths</li>
          <li>temporary URLs</li>
          <li>user-specific pages</li>
          <li>URLs that return errors</li>
          <li>URLs that redirect elsewhere</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          If a URL does not belong in your search-discovery strategy, putting it into the Sitemap can make the configuration harder to understand.
        </p>
      </section>

      {/* Sitemap size limits */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Sitemap size limits
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A Sitemap file can contain up to <strong className="text-slate-900">50,000 URLs</strong> or <strong className="text-slate-900">50 MB uncompressed</strong>, subject to the applicable Sitemap protocol rules. Large sites can split their URLs across multiple Sitemap files and use a Sitemap index.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">For example:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-products.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-categories.xml</loc>
  </sitemap>
</sitemapindex>`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The important thing is that the resulting structure remains valid and that the referenced files are accessible.
        </p>
      </section>

      {/* Keep the production configuration simple */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Keep the production configuration simple
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A straightforward configuration is usually easier to audit. For example:
        </p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`User-agent: *
Disallow: /admin/
Disallow: /account/
Disallow: /private/

Sitemap: https://example.com/sitemap.xml`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700">And:</p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
  </url>
  <url>
    <loc>https://example.com/products/widget-a</loc>
  </url>
</urlset>`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Treat these as templates. Replace the paths and URLs with values that match your actual site.
        </p>
      </section>

      {/* A better way to debug a crawling problem */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          A better way to debug a crawling problem
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Suppose a product page is not appearing as expected. Don&apos;t immediately edit robots.txt. Start with the URL itself. Check whether it returns <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">200</code>, redirects, or produces an error. Then check robots.txt for the exact crawler and path. Next, confirm whether the URL appears in the Sitemap. After that, inspect page-level indexing directives and HTTP headers. Finally, compare the configuration across the files.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          That sequence often makes the problem much easier to isolate because each layer answers a different question:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Check</th>
                <th className="p-3.5">Question</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">HTTP response</td>
                <td className="p-3.5 text-slate-700">Can the URL be reached successfully?</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">robots.txt</td>
                <td className="p-3.5 text-slate-700">Can the crawler access the path?</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">Sitemap</td>
                <td className="p-3.5 text-slate-700">Is the URL being presented for discovery?</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">noindex / X-Robots-Tag</td>
                <td className="p-3.5 text-slate-700">Is indexing being restricted?</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">Canonical</td>
                <td className="p-3.5 text-slate-700">Which URL does the page identify as its preferred version?</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-mono font-bold text-slate-900">Cross-file audit</td>
                <td className="p-3.5 text-slate-700">Do these signals agree with each other?</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* What this validator should help you catch */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          What this validator should help you catch
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A useful audit should go beyond checking whether a file is technically valid. It should help surface issues such as:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700">
          <li>Sitemap URLs blocked by robots.txt</li>
          <li>Sitemap URLs returning errors</li>
          <li>Sitemap URLs redirecting</li>
          <li>URLs marked <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">noindex</code></li>
          <li>malformed XML</li>
          <li>invalid or suspicious robots.txt rules</li>
          <li>crawler-specific rule differences</li>
          <li>duplicate Sitemap URLs</li>
          <li>host or protocol mismatches</li>
          <li>inaccessible Sitemap files</li>
          <li>overly broad <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">Disallow</code> rules</li>
          <li>URLs that appear inconsistent with the site&apos;s indexing strategy</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The goal is not to automatically declare every unusual configuration &ldquo;wrong.&rdquo; Some configurations are intentional. The useful result is a clear explanation of <strong className="text-slate-900">what was detected, why it may matter, and what should be checked next.</strong>
        </p>
      </section>

      {/* Quick checklist */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Quick checklist
        </h3>
        <p className="text-xs sm:text-sm text-slate-700">Before considering your crawl configuration finished, check:</p>

        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> robots.txt is available at the expected host</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> The relevant crawler rules are correct</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Important paths are not accidentally blocked</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Sensitive areas are protected by real access controls</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> The Sitemap is valid XML</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Sitemap URLs are absolute</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Sitemap URLs are accessible</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Important URLs are not unnecessarily redirected</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> URLs marked noindex are reviewed</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Sitemap URLs are not unintentionally blocked by robots.txt</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> HTTP and HTTPS versions are consistent</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> www and non-www hosts are handled correctly</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Large Sitemap sets are split correctly when necessary</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> AI crawler rules match the site&apos;s actual policy</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> The final configuration has been tested against the live files</li>
        </ul>
      </section>

      {/* Final takeaway */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Final takeaway
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          robots.txt and XML Sitemaps answer different questions.
        </p>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-800 font-semibold">
          <p>robots.txt: can this crawler access this path?</p>
          <p>XML Sitemap: which URLs should search engines discover?</p>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Neither file should be evaluated in isolation. A good audit checks the syntax, the live URLs, the crawler rules, the indexing signals, and—most importantly—the relationships between them.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Use the validator to check the live configuration, then investigate any conflicts against the actual indexing and crawling requirements of your site.
        </p>
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
