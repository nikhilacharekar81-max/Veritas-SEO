'use client';

import React, { useState } from 'react';
import {
  Globe,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ArrowRight,
  ArrowDown,
  Layers,
  Sparkles,
  ShieldAlert,
  Server,
  Code2,
  Check,
  Copy,
  Info,
  ExternalLink,
} from 'lucide-react';

export const HreflangMatrixGuide: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <article className="w-full h-auto overflow-visible space-y-10 text-slate-800 antialiased">
      {/* 1. HERO TITLE & INTRO */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" /> International Technical SEO Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hreflang Tag Matrix &amp; International SEO Validator
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
            Check your hreflang setup, compare language and regional page versions, and find missing or incorrect alternate URLs.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            The <strong>Hreflang Tag Matrix &amp; International SEO Validator</strong> helps you see how your international pages are connected. Instead of checking hreflang tags one page at a time, you can review the relationships between language and country versions in one place.
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            It can help you spot problems such as:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {[
              'Missing hreflang tags',
              'Missing return links',
              'Missing self-referencing tags',
              'Invalid language or region codes',
              'Duplicate language or regional targets',
              'Hreflang URLs that redirect',
              'Hreflang URLs that return errors',
              'Hreflang pointing to the wrong page',
              'Canonical and hreflang conflicts',
              'Missing x-default',
              'Incomplete language or country matrices',
            ].map((problem, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center gap-2.5 text-xs font-medium text-slate-700"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>{problem}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-900 leading-relaxed">
          Google supports hreflang through <strong>HTML, HTTP headers, and XML sitemaps</strong>. The important part is that the alternate versions are correctly connected and consistently referenced.
        </div>
      </section>

      {/* 2. WHAT IS HREFLANG? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            What Is Hreflang?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Hreflang tells search engines that different URLs are versions of a page intended for different languages or regions.
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For example, a website may have:</p>
          <pre className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
            <code>{`https://example.com/\nhttps://example.com/fr/\nhttps://example.com/de/\nhttps://example.com/en-gb/`}</code>
          </pre>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The English, French, German, and UK English pages may cover the same product or topic, but they are intended for different audiences.
        </p>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">A basic hreflang tag looks like this:</span>
            <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <code>{`<link rel="alternate"\n      hreflang="fr"\n      href="https://example.com/fr/" />`}</code>
            </pre>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">A regional version can use a language and country code:</span>
            <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <code>{`<link rel="alternate"\n      hreflang="en-GB"\n      href="https://example.com/en-gb/" />`}</code>
            </pre>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
          Google&apos;s documentation specifies language codes using <strong>ISO 639-1</strong> and optional region codes using <strong>ISO 3166-1 Alpha 2</strong>. The country code cannot be used by itself.
        </p>
      </section>

      {/* 3. WHY USE A HREFLANG MATRIX? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Why Use a Hreflang Matrix?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Hreflang becomes difficult to check when a site has several languages and countries.
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Imagine you have:</p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs space-y-1 text-slate-800">
            <div>English</div>
            <div>French</div>
            <div>German</div>
            <div>Spanish</div>
            <div>English - United States</div>
            <div>English - United Kingdom</div>
            <div>English - Australia</div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Each page may need to reference the appropriate alternate versions. One missing connection can be difficult to notice by looking at the HTML manually. A matrix makes these relationships easier to understand.
        </p>

        {/* Matrix Table */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For example:</span>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Page</th>
                  <th className="p-3 text-center">en</th>
                  <th className="p-3 text-center">en-GB</th>
                  <th className="p-3 text-center">en-AU</th>
                  <th className="p-3 text-center">fr</th>
                  <th className="p-3 text-center">de</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {['English', 'UK English', 'Australian English', 'French', 'German'].map((name, i) => (
                  <tr key={i} className="hover:bg-slate-50/70">
                    <td className="p-3 font-semibold text-slate-900">{name}</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The exact matrix depends on your website. The important idea is simple: <strong>the page versions that belong to the same international content group should have a consistent hreflang relationship.</strong>
        </p>

        <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          Google recommends that each language version list itself as well as the other relevant versions.
        </p>
      </section>

      {/* 4. HOW TO USE THE VALIDATOR */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            How to Use the Validator
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Enter or provide the hreflang information you want to check.
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            The validator can then help you review the relationship between:
          </p>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl font-bold text-xs sm:text-sm text-emerald-950 text-center">
            Source page → hreflang value → alternate URL
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For example:</p>
          <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs sm:text-sm text-center leading-relaxed">
            <div>/en/product/</div>
            <div className="text-slate-400 py-1">↓</div>
            <div className="text-amber-300 font-bold">hreflang=&quot;fr&quot;</div>
            <div className="text-slate-400 py-1">↓</div>
            <div>/fr/produit/</div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          You can then check whether the French URL is actually the intended French version and whether the relationship is also represented from the other side.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          For a larger international site, look at the matrix rather than checking individual tags in isolation. That is where many implementation problems become easier to see.
        </p>
      </section>

      {/* 5. WHAT THE HREFLANG MATRIX SHOWS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            What the Hreflang Matrix Shows
          </h3>
        </div>

        <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm">
          A useful matrix should answer a basic question: <br />
          <strong className="text-emerald-700 text-sm sm:text-base">Which version of this page is intended for each language or region?</strong>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For example:</p>
          <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            <code>{`Content Group: /seo-tools/\n\nen        → /seo-tools/\nen-GB     → /gb/seo-tools/\nde        → /de/seo-tools/\nfr        → /fr/seo-tools/\nx-default → /seo-tools/`}</code>
          </pre>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          You can then compare the entries across the different versions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 space-y-1">
            <strong>Return-Link Problem:</strong> If the English page says the German version is <code className="font-mono bg-white px-1 py-0.5 rounded">/de/seo-tools/</code>, but the German page does not reference the English page, you have a potential return-link problem.
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
            <strong>URL Mismatch:</strong> If one version points to <code className="font-mono bg-white px-1 py-0.5 rounded">/de/old-page/</code> while the current German page is <code className="font-mono bg-white px-1 py-0.5 rounded">/de/new-page/</code>, the matrix can expose that mismatch quickly.
          </div>
        </div>
      </section>

      {/* 6. SELF-REFERENCING HREFLANG */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Self-Referencing Hreflang
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A page should normally include a hreflang annotation for itself.
        </p>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For example, the English page can contain:</span>
            <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <code>{`<link rel="alternate"\n      hreflang="en"\n      href="https://example.com/page/" />`}</code>
            </pre>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">The French version can contain:</span>
            <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <code>{`<link rel="alternate"\n      hreflang="fr"\n      href="https://example.com/fr/page/" />`}</code>
            </pre>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Self-referencing tags are easy to forget because they can look unnecessary when you are already looking at the current URL. They are part of Google&apos;s recommended setup.
        </p>
      </section>

      {/* 7. RETURN LINKS MATTER */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Return Links Matter
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Hreflang is not simply a list of URLs that you place on one page. The alternate versions need to reference each other consistently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs text-center">
            <div>English</div>
            <div className="text-slate-400 py-1">↓</div>
            <div className="text-white font-bold">French</div>
          </div>
          <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs text-center">
            <div>French</div>
            <div className="text-slate-400 py-1">↓</div>
            <div className="text-white font-bold">English</div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          This is often called a <strong>reciprocal hreflang relationship</strong> or a <strong>return tag</strong>.
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">A common problem looks like this:</p>
          <pre className="p-4 bg-rose-50 border border-rose-200 text-rose-950 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed">
            <code>{`/en/page/\n  → fr → /fr/page/\n\n/fr/page/\n  → en → missing`}</code>
          </pre>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The English page knows about French, but the French page does not properly return the relationship.
        </p>

        <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          Google specifically recommends that each version list itself and all other language versions.
        </p>
      </section>

      {/* 8. CHECK THE HREFLANG CODE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Check the Hreflang Code
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Not every hreflang value is valid.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">A language-only value can look like:</span>
            <pre className="p-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl font-mono text-xs leading-relaxed">
              <code>{`en\nfr\nde\nes`}</code>
            </pre>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">A language-region value can look like:</span>
            <pre className="p-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl font-mono text-xs leading-relaxed">
              <code>{`en-US\nen-GB\nfr-CA\nde-DE`}</code>
            </pre>
          </div>
        </div>

        <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
          <div>The language comes first. The region comes second.</div>
          <div className="font-semibold text-slate-900">
            Use a hyphen between them: <code className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">en-GB</code>, not <code className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-mono">en_GB</code>.
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Google documents supported language and region code formats and notes that unsupported codes can be ignored.
        </p>
      </section>

      {/* 9. COMMON HREFLANG ERRORS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Common Hreflang Errors
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Error 1 */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">1</span>
              Missing self-reference
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The page lists other versions but does not list itself.
            </p>
            <pre className="p-2.5 bg-white border border-slate-200 text-slate-800 rounded-xl font-mono text-[11px]">
              <code>{`Current: /fr/page/\nhreflang: en → /page/, de → /de/page/\nMissing: fr → /fr/page/`}</code>
            </pre>
          </div>

          {/* Error 2 */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">2</span>
              Missing return tag
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              One page references another version, but the other version does not reference it back. This creates an incomplete relationship.
            </p>
          </div>

          {/* Error 3 */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">3</span>
              Wrong language code
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Examples include incorrectly formatted or unsupported language values. Always use valid ISO 639-1 language codes.
            </p>
          </div>

          {/* Error 4 */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">4</span>
              Wrong country code
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A regional hreflang value needs a valid region code. For example, <code className="font-mono font-bold">en-GB</code> is different from <code className="font-mono font-bold">en-US</code>. They both use English, but target different regions.
            </p>
          </div>

          {/* Error 5 */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">5</span>
              Using the wrong URL
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The hreflang tag contains a URL belonging to the wrong language. For example: <code className="font-mono text-[11px]">hreflang=&quot;de&quot; href=&quot;.../fr/page/&quot;</code>.
            </p>
          </div>

          {/* Error 6 */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">6</span>
              Hreflang points to a redirect
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              An alternate URL that redirects creates a messy implementation. Point directly to the intended canonical page.
            </p>
          </div>

          {/* Error 7 */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">7</span>
              Hreflang points to a broken page
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A tag can be technically valid HTML but still point to a URL that returns 404 or 5xx errors. Always verify destinations.
            </p>
          </div>

          {/* Error 8 */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">8</span>
              Hreflang points to a non-canonical URL
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hreflang and canonical signals must agree. If <code className="font-mono text-[11px]">hreflang=&quot;de&quot; → /de/page/</code> but <code className="font-mono text-[11px]">/de/page/</code> canonicalizes elsewhere, search engines receive conflicting signals.
            </p>
          </div>

          {/* Error 9 */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2 md:col-span-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">9</span>
              Duplicate language targets
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A page should not accidentally assign several different URLs to the same language or language-region target when they are supposed to represent one version. This makes international setup difficult to interpret and maintain.
            </p>
          </div>
        </div>
      </section>

      {/* 10. WHAT IS X-DEFAULT? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            What Is <code className="text-emerald-700">x-default</code>?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <code className="font-mono font-bold text-slate-900">x-default</code> is used for users whose language or region does not match one of the specifically declared hreflang alternatives.
        </p>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Example:</span>
          <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            <code>{`<link rel="alternate"\n      hreflang="x-default"\n      href="https://example.com/" />`}</code>
          </pre>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
          <p>Think of it as the <strong>fallback version</strong>.</p>
          <p>It does not mean &quot;English.&quot;</p>
          <p className="font-semibold text-slate-900">
            It means something closer to: <em>Use this version when no more specific hreflang version applies.</em>
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Google documents <code className="font-mono">x-default</code> as a supported value for this purpose.
        </p>
      </section>

      {/* 11. HREFLANG AND CANONICAL TAGS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Hreflang and Canonical Tags
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1.5">
            <span className="text-xs font-bold text-emerald-900">Hreflang</span>
            <p className="text-xs text-emerald-800">Describes the relationship between localized versions.</p>
          </div>
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1.5">
            <span className="text-xs font-bold text-blue-900">Canonical</span>
            <p className="text-xs text-blue-800">Identifies the preferred URL for a page or duplicate group.</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          For international pages, do not automatically canonicalize every language version to the main-language page.
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            For example, if these are genuine localized versions:
          </p>
          <pre className="p-3.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-mono text-xs">
            <code>{`/en/product/\n/fr/product/\n/de/product/`}</code>
          </pre>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Each version may have its own canonical URL. Your hreflang links can then connect those versions. The key is consistency.
        </p>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 space-y-2">
          <div className="font-bold">A common audit problem is:</div>
          <div className="font-mono text-xs">hreflang → /de/product/<br />canonical → /product/</div>
          <p className="text-xs text-amber-800">
            The German page is saying that <code className="font-mono">/de/product/</code> is its alternate-language URL while its canonical points to another URL. That deserves investigation rather than being treated as a simple formatting issue.
          </p>
        </div>
      </section>

      {/* 12. HREFLANG DOES NOT TRANSLATE YOUR CONTENT */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Hreflang Does Not Translate Your Content
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Hreflang does not translate a page. It does not create localized content. It simply tells search engines about the relationship between different versions.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          You still need the actual localized pages:
        </p>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs space-y-1 text-slate-800">
          <div>English page</div>
          <div>French page</div>
          <div>German page</div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Hreflang connects those pages. It does not turn the English page into French or German.
        </p>

        <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          Google also notes that hreflang and the HTML <code className="font-mono">lang</code> attribute are not how Google determines the language of a page; Google uses its own algorithms to determine language.
        </p>
      </section>

      {/* 13. HREFLANG CAN BE IMPLEMENTED IN THREE WAYS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Hreflang Can Be Implemented in Three Ways
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Google supports three main implementation methods:
        </p>

        <div className="space-y-4">
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">1. HTML</h4>
            <p className="text-xs text-slate-600">Add hreflang links inside the <code className="font-mono">&lt;head&gt;</code>:</p>
            <pre className="p-3.5 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <code>{`<link rel="alternate"\n      hreflang="en"\n      href="https://example.com/" />\n\n<link rel="alternate"\n      hreflang="fr"\n      href="https://example.com/fr/" />`}</code>
            </pre>
          </div>

          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">2. HTTP Headers</h4>
            <p className="text-xs text-slate-600">
              Hreflang can also be sent using HTTP response headers. This can be useful for files that are not normal HTML pages, such as PDFs.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">3. XML Sitemap</h4>
            <p className="text-xs text-slate-600">
              Hreflang information can also be included in XML sitemaps.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          Google considers HTML, HTTP headers, and sitemaps equivalent methods for communicating localized versions. You generally do not need to use all three simply because they are available.
        </p>
      </section>

      {/* 14. DON'T MIX UP LANGUAGE AND COUNTRY */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Don&apos;t Mix Up Language and Country
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          This is one of the easiest mistakes to make.
        </p>

        <div className="space-y-2 font-mono text-xs text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div><strong>en</strong> — This identifies English.</div>
          <div><strong>en-GB</strong> — identifies English targeted to Great Britain.</div>
          <div><strong>en-US</strong> — identifies English targeted to the United States.</div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The language and region are separate parts of the value. You do not create a country-only value such as <code className="font-mono bg-rose-100 text-rose-800 px-1 py-0.5 rounded font-bold">GB</code>. The first part must be the language.
        </p>
      </section>

      {/* 15. A SIMPLE EXAMPLE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            A Simple Example
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Suppose an online store sells the same product in three markets: <strong>United States, United Kingdom, Germany</strong>.
        </p>

        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Its URLs might be:</span>
          <pre className="p-3.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-mono text-xs">
            <code>{`https://example.com/product/\nhttps://example.com/gb/product/\nhttps://example.com/de/product/`}</code>
          </pre>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">The English version could contain:</span>
          <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            <code>{`<link rel="alternate"\n      hreflang="en-US"\n      href="https://example.com/product/" />\n\n<link rel="alternate"\n      hreflang="en-GB"\n      href="https://example.com/gb/product/" />\n\n<link rel="alternate"\n      hreflang="de-DE"\n      href="https://example.com/de/product/" />`}</code>
          </pre>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          And the German page should have the appropriate corresponding set of alternate references. The exact URLs and language-region values depend on the site&apos;s actual targeting.
        </p>
      </section>

      {/* 16. WHAT THIS TOOL HELPS YOU FIND */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            What This Tool Helps You Find
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Use the validator when you want to answer questions such as:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            'Does every international version reference itself?',
            'Are the language codes valid?',
            'Are the country codes valid?',
            'Are alternate URLs pointing to the correct pages?',
            'Are the alternate URLs returning successful responses?',
            'Are the hreflang relationships reciprocal?',
            'Are there missing language versions?',
            'Are multiple URLs assigned to the same language target?',
            'Are hreflang URLs redirected?',
            'Are hreflang URLs canonicalized somewhere unexpected?',
            'Is x-default present where you intend to use it?',
            'Does the international page structure match your intended market targeting?',
          ].map((q, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-xs sm:text-sm text-slate-900 flex items-start gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>{q}</span>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
          These checks are especially useful when a website has grown over time and international pages have been added by different teams, CMS plugins, developers, or migrations.
        </p>
      </section>

      {/* 17. WHEN SHOULD YOU RUN A HREFLANG CHECK? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            When Should You Run a Hreflang Check?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          You do not need to wait for a major SEO problem. Run a check when:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[
            'Launching a new language',
            'Launching a new country version',
            'Moving international URLs',
            'Changing URL structures',
            'Migrating a website',
            'Changing CMS platforms',
            'Changing SEO plugins',
            'Reworking canonical tags',
            'Adding or removing translated pages',
            'Moving from subdomains to subdirectories',
            'Changing international domains',
            'Adding regional versions such as US and UK English',
            'Investigating the wrong language appearing in search',
            'Auditing an existing international website',
          ].map((scenario, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
              <span>{scenario}</span>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
          A hreflang implementation can work correctly today and become inconsistent after a URL change tomorrow. That is why international SEO needs ongoing checking rather than a one-time setup.
        </p>
      </section>

      {/* 18. A QUICK TROUBLESHOOTING WORKFLOW */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            A Quick Troubleshooting Workflow
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          If the validator reports an error, don&apos;t change everything at once. Start with the affected page.
        </p>

        <div className="space-y-3">
          {[
            {
              step: 'Step 1: Check the source URL',
              desc: 'Make sure you are looking at the correct international version.',
            },
            {
              step: 'Step 2: Check the hreflang value',
              desc: 'Confirm the language and optional region are valid.',
            },
            {
              step: 'Step 3: Check the destination',
              desc: 'Open the alternate URL and make sure it is the intended localized page.',
            },
            {
              step: 'Step 4: Check the HTTP response',
              desc: 'Look for redirects, 404 errors, server errors, or other unexpected responses.',
            },
            {
              step: 'Step 5: Check the canonical',
              desc: "Make sure the alternate page's canonical setup makes sense for that localized version.",
            },
            {
              step: 'Step 6: Check the return relationship',
              desc: 'Go to the alternate page and verify that it references the source version appropriately.',
            },
            {
              step: 'Step 7: Check the complete matrix',
              desc: 'Do not stop after fixing one tag. Look at the entire group of related pages.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
            >
              <span className="font-bold text-slate-900 text-xs sm:text-sm sm:w-64 shrink-0">
                {item.step}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed">
          A single missing connection may be easy to fix. A repeated pattern across hundreds of pages usually points to a template, CMS, plugin, or generation problem.
        </p>
      </section>

      {/* 19. HREFLANG IS NOT A RANKING GUARANTEE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Hreflang Is Not a Ranking Guarantee
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Adding hreflang does not guarantee higher rankings, more traffic, or that Google will always show the exact URL you expect.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          It is a way of providing information about the relationship between localized versions. Google may use that information when determining which localized version is appropriate for a searcher.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A valid hreflang tag is therefore not the same thing as a guarantee of a particular search result. The goal of validation is to make your international signals <strong>accurate, complete, and consistent</strong>.
        </p>
      </section>

      {/* 20. KEEP YOUR INTERNATIONAL SEO MATRIX CLEAN */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-5">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Keep Your International SEO Matrix Clean
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          A good international setup should be easy to understand. For every group of related pages, you should be able to answer:
        </p>

        <div className="p-4 bg-white/10 rounded-2xl font-mono text-xs space-y-1 text-emerald-300 backdrop-blur-sm border border-white/10">
          <div>What is the English version?</div>
          <div>What is the French version?</div>
          <div>What is the German version?</div>
          <div>Which regions are targeted?</div>
          <div>Which URL is the fallback?</div>
          <div>Does every version reference the others?</div>
          <div>Are all referenced URLs live?</div>
          <div>Are the URLs canonical?</div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          If you cannot answer those questions quickly, your hreflang implementation probably deserves an audit.
        </p>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Use the <strong>Hreflang Tag Matrix &amp; International SEO Validator</strong> to turn a complicated collection of alternate URLs into a clearer picture of your international setup.
        </p>
      </section>

      {/* 21. QUICK CHECKLIST */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Quick Checklist
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Before considering a hreflang implementation complete, check:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Every relevant language version is included',
            'Regional versions use the correct language-region format',
            'Each page references itself',
            'Alternate versions reference each other',
            'URLs are correct',
            'Alternate URLs are live',
            'Redirected URLs are reviewed',
            'Broken URLs are fixed',
            'Canonical signals are consistent',
            'Duplicate language targets are investigated',
            'x-default is used where appropriate',
            'HTML, sitemap, or HTTP-header implementation is kept consistent',
            'Changes are checked after international URL migrations',
          ].map((checkItem, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-900"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{checkItem}</span>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
          The cleaner the matrix, the easier your international SEO setup is to maintain.
        </p>
      </section>
    </article>
  );
};
