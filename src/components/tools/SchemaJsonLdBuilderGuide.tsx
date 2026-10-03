'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Layers,
  FileCheck,
  Calendar,
  AlertOctagon,
  ShieldCheck,
  ListFilter,
  CheckSquare,
} from 'lucide-react';

export const SCHEMA_BUILDER_FAQS = [
  {
    id: 'faq_1',
    q: 'What is a JSON-LD Schema Generator?',
    a: "A JSON-LD Schema Generator creates Schema.org structured data in JSON-LD format from information you provide, so you don't have to write the markup manually.",
  },
  {
    id: 'faq_2',
    q: 'What is a structured data builder?',
    a: 'A structured data builder helps you create structured data by selecting an appropriate schema type and entering its relevant properties.',
  },
  {
    id: 'faq_3',
    q: 'What is a Schema Markup Tool?',
    a: 'A Schema Markup Tool helps create or work with structured data that describes the content and entities on a webpage.',
  },
  {
    id: 'faq_4',
    q: 'Is JSON-LD the same as Schema.org?',
    a: 'No. Schema.org provides the vocabulary, while JSON-LD is one format used to express structured data.',
  },
  {
    id: 'faq_5',
    q: 'Does JSON-LD improve Google rankings?',
    a: 'Valid JSON-LD does not guarantee higher rankings. It can help search engines understand page content and may make eligible pages suitable for supported rich-result features.',
  },
  {
    id: 'faq_6',
    q: "Why isn't my schema showing as a rich result?",
    a: 'Check that the schema matches the page, required properties are present, the information is accurate, and Google can access the page. Even valid markup does not guarantee a rich result.',
  },
  {
    id: 'faq_7',
    q: 'Does valid JSON mean my schema is correct?',
    a: "No. Valid JSON only confirms that the data follows JSON syntax. The schema can still use the wrong type, contain incorrect information or fail Google's requirements.",
  },
  {
    id: 'faq_8',
    q: 'Should Schema markup match visible content?',
    a: 'Yes. Important information in your structured data should accurately represent what users can find on the page.',
  },
  {
    id: 'faq_9',
    q: 'Should I fill every Schema field?',
    a: 'No. Use required properties and relevant optional properties that contain accurate information. More properties do not automatically make better Schema.',
  },
  {
    id: 'faq_10',
    q: 'How do I test JSON-LD?',
    a: "Use Google's Rich Results Test for supported Google rich-result features. The Schema.org Validator can also help inspect Schema.org markup.",
  },
  {
    id: 'faq_11',
    q: 'Can I have multiple Schema types on one page?',
    a: 'Yes, when they genuinely describe relevant entities or content on the page. Avoid adding unrelated types simply to target more search features.',
  },
  {
    id: 'faq_12',
    q: 'Can I use FAQPage schema on any website?',
    a: 'FAQPage is a valid Schema.org type, but Google currently limits FAQ rich-result eligibility primarily to well-known authoritative government and health websites.',
  },
  {
    id: 'faq_13',
    q: 'Where should I put JSON-LD?',
    a: 'JSON-LD is commonly placed in a <script type="application/ld+json"> block on the page. Follow the implementation requirements of your website platform.',
  },
  {
    id: 'faq_14',
    q: 'Should I check for existing Schema markup?',
    a: 'Yes. Your CMS, SEO plugin, theme, ecommerce platform or framework may already generate structured data.',
  },
  {
    id: 'faq_15',
    q: 'Can I use this tool without knowing JSON-LD?',
    a: 'Yes. The builder creates the JSON-LD structure for you. You should still review the generated information before publishing it.',
  },
];

const COMMON_SCHEMA_PROBLEMS = [
  { problem: 'Wrong schema type', check: 'Does it actually describe the page?' },
  { problem: 'Missing required property', check: 'Check the requirements for the specific Google feature.' },
  { problem: 'Wrong URL', check: 'Does the URL point to the intended, accessible resource?' },
  { problem: 'Bad date format', check: 'Check the expected date or date-time format.' },
  { problem: 'Fake rating or review', check: 'Is it genuine and supported by the page?' },
  { problem: 'Hidden information', check: 'Does the markup represent information users can actually access?' },
  { problem: 'Conflicting information', check: 'Do the page and JSON-LD agree?' },
  { problem: 'Duplicate markup', check: 'Is another plugin, theme or CMS already generating it?' },
  { problem: 'Inaccessible page', check: 'Can Google access the page?' },
  { problem: 'No rich result', check: 'Remember that valid markup does not guarantee display.' },
];

const SUPPORTED_SCHEMA_TYPES = [
  'Article',
  'Product',
  'Organization',
  'LocalBusiness',
  'Event',
  'BreadcrumbList',
  'Recipe',
  'VideoObject',
  'SoftwareApplication',
  'Person',
  'Service',
  'WebSite',
  'FAQPage',
];

export const SchemaJsonLdBuilderGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleSnippet = `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Improve Website Speed",
  "author": {
    "@type": "Person",
    "name": "Example Author"
  },
  "datePublished": "2026-10-02"
}`;

  const handleCopySample = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <article className="w-full h-auto overflow-visible space-y-10 text-slate-800 antialiased">
      {/* 1. SECTION: HERO INTRO */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Official Documentation &amp; User Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Schema.org JSON-LD Structured Data Builder
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
            Generate <strong>Schema.org JSON-LD</strong> without hand-writing the markup.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            Choose what your page actually represents, add the information you already have, and generate ready-to-copy structured data.
          </p>
        </div>

        <div className="p-4 sm:p-5 bg-amber-50/80 border border-amber-200/90 rounded-2xl flex items-start gap-3 text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <strong className="font-bold block text-amber-950">Crucial Search Reality:</strong>
            <p className="leading-relaxed text-xs sm:text-sm text-amber-900/90">
              One thing is worth knowing before you start: <strong>valid JSON-LD does not guarantee a Google rich result.</strong> Your markup can pass a test and still not produce a special search appearance.
            </p>
            <p className="leading-relaxed text-xs sm:text-sm text-amber-900/90">
              That&apos;s normal. The goal is to make the structured data accurate, useful, and consistent with the page.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SECTION: HOW TO USE THE SCHEMA MARKUP TOOL */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            How to Use the Schema Markup Tool
          </h3>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="space-y-3 p-5 sm:p-6 bg-slate-50/70 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Start with the page, not the schema list
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Look at the page you are marking up.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If it is a product page, <strong>Product</strong> may be appropriate. A local service business might use <strong>LocalBusiness</strong> or another more specific type. An article may use <strong>Article</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Don&apos;t choose a schema type just because you saw someone using it on another website.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200/80">
              The markup should describe what the page actually is.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3 p-5 sm:p-6 bg-slate-50/70 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Enter real information
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Fill in the required fields first. Then add optional properties that genuinely belong to the page.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>If you don&apos;t have a real rating, don&apos;t invent one.</li>
              <li>If there is no publication date, don&apos;t create one.</li>
              <li>If a property doesn&apos;t apply, leave it out.</li>
            </ul>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 pt-1">
              You are better off with a smaller block of accurate structured data than a huge block full of information that the page doesn&apos;t support.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-3 p-5 sm:p-6 bg-slate-50/70 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Look at the code before publishing
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The generated JSON-LD is meant to save you time, not replace your judgment.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              Check the important values before copying it:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {[
                'Page or entity name',
                'URLs',
                'Dates',
                'Prices',
                'Images',
                'Authors',
                'Business details',
                'Ratings and reviews',
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{val}</span>
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-amber-900 bg-amber-50 px-3.5 py-2.5 rounded-xl border border-amber-200 mt-2">
              Pay particular attention to anything that visitors can see on the page. If the product costs ₹999 on the page but the JSON-LD says ₹899, you have a problem.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-3 p-5 sm:p-6 bg-slate-50/70 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Test it
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Once the markup looks right, test it with Google&apos;s <strong>Rich Results Test</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you&apos;re working with Schema.org itself, the <strong>Schema.org Validator</strong> is also useful.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              And don&apos;t panic if the test passes but Google doesn&apos;t immediately show a rich result. <strong>Validation and search appearance are two different things.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 3. SECTION: QUICK CODE PREVIEW */}
      <section className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-xl space-y-6 text-slate-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-mono">
              <Code2 className="w-5 h-5 text-emerald-400" />
              Quick Code Preview
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Here is a small example of what generated JSON-LD can look like:
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopySample}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied!' : 'Copy Example'}</span>
          </button>
        </div>

        <pre className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
          <code>{sampleSnippet}</code>
        </pre>

        <div className="space-y-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
          <p>That&apos;s it. JSON-LD is essentially structured information describing an entity or piece of content.</p>
          <p>The builder handles the structure for you.</p>
          <p className="text-white font-medium">
            Your job is to make sure the <strong>information inside it is true and appropriate for the page</strong>.
          </p>
        </div>
      </section>

      {/* 4. SECTION: WHY ISN'T MY SCHEMA SHOWING AS A RICH RESULT? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Why Isn&apos;t My Schema Showing as a Rich Result?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            This is where things get confusing.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            You generate the markup. The JSON is valid. The test doesn&apos;t complain. You publish it.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Then you search Google and... nothing.
          </p>
          <p className="text-xs sm:text-sm font-semibold text-slate-900">
            There are several possible reasons.
          </p>
        </div>

        <div className="space-y-6">
          {/* Sub 1 */}
          <div className="space-y-2 p-5 bg-slate-50/70 rounded-2xl border border-slate-200">
            <h4 className="text-base font-bold text-slate-900">
              Your markup doesn&apos;t match the page
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This is one of the first things to investigate.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If your structured data says something that visitors cannot find or understand on the page, fix the mismatch rather than trying to make the markup more elaborate.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">For example:</p>
            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs space-y-1">
              <div><strong className="text-slate-900">Page:</strong> Product price = ₹1,499</div>
              <div><strong className="text-slate-900">JSON-LD:</strong> Product price = ₹1,299</div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">That&apos;s not a harmless difference.</p>
            <p className="text-xs sm:text-sm text-slate-600">
              The same applies to product availability, article dates, names, reviews, ratings and other important information.
            </p>
          </div>

          {/* Sub 2 */}
          <div className="space-y-2 p-5 bg-slate-50/70 rounded-2xl border border-slate-200">
            <h4 className="text-base font-bold text-slate-900">
              You chose the wrong schema type
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A generator can make technically valid JSON-LD for a schema type that isn&apos;t appropriate for your page.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Don&apos;t select <strong>Article</strong> for a page just because Article happens to be available in the generator.
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-900">
              Describe the page you actually have.
            </p>
          </div>

          {/* Sub 3 */}
          <div className="space-y-2 p-5 bg-slate-50/70 rounded-2xl border border-slate-200">
            <h4 className="text-base font-bold text-slate-900">
              A required property is missing
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Some Google rich-result features have required properties.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If one is missing, the page may not be eligible for that feature.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This is where testing tools are particularly useful because they can point you toward the missing information.
            </p>
          </div>

          {/* Sub 4 */}
          <div className="space-y-2 p-5 bg-slate-50/70 rounded-2xl border border-slate-200">
            <h4 className="text-base font-bold text-slate-900">
              Google can&apos;t access the page
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your structured data won&apos;t help much if Google cannot properly access the page containing it.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">Check things such as:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>Indexing status</li>
              <li>Canonical URLs</li>
              <li>Access restrictions</li>
              <li>Important resources being blocked</li>
              <li>Incorrect or inaccessible URLs</li>
            </ul>
          </div>

          {/* Sub 5 */}
          <div className="space-y-2 p-5 bg-slate-50/70 rounded-2xl border border-slate-200">
            <h4 className="text-base font-bold text-slate-900">
              The markup is valid, but Google still doesn&apos;t show the feature
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This is the part many schema guides gloss over.
            </p>
            <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
              <strong>A valid implementation does not create a guarantee that Google will display a rich result.</strong>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Eligibility is not the same thing as guaranteed appearance.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              So don&apos;t keep adding more properties just because a rich result hasn&apos;t appeared yet.
            </p>
            <p className="text-xs sm:text-sm font-bold text-emerald-800">
              First make sure the implementation itself is correct.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SECTION: THE SCHEMA PROBLEMS WE SEE MOST OFTEN */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            The Schema Problems We See Most Often
          </h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900 text-white font-mono uppercase text-[11px]">
              <tr>
                <th className="p-4 font-bold">Problem</th>
                <th className="p-4 font-bold">What to check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-700">
              {COMMON_SCHEMA_PROBLEMS.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                    {item.problem}
                  </td>
                  <td className="p-4 text-slate-600">{item.check}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. SECTION: DUPLICATE SCHEMA */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Check for Duplicate Schema Before Adding More
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          This one catches people surprisingly often.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          A website may already generate Schema markup through its:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
          <li>SEO plugin</li>
          <li>WordPress theme</li>
          <li>ecommerce platform</li>
          <li>CMS</li>
          <li>website builder</li>
          <li>framework</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          So before pasting another JSON-LD block into the page, inspect what is already there.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          You might discover that your site already outputs <strong>Organization</strong>, <strong>WebSite</strong>, <strong>BreadcrumbList</strong>, <strong>Product</strong>, <strong>Article</strong>, or other structured data.
        </p>
        <p className="text-xs sm:text-sm font-semibold text-slate-900">
          Adding a second implementation without checking the first can create duplicate or conflicting information and makes debugging much harder.
        </p>
      </section>

      {/* 7. SECTION: DON'T TURN SCHEMA INTO A DATA DUMP */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Don&apos;t Turn Your Schema Into a Data Dump
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Schema.org offers a lot of properties.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          That doesn&apos;t mean you should use all of them.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          If a property doesn&apos;t add useful, accurate information about the entity, leave it alone.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
          <li>For example, don&apos;t add an <code className="font-mono bg-slate-100 px-1 rounded">aggregateRating</code> simply because the Product schema has one.</li>
          <li>Don&apos;t manufacture an author.</li>
          <li>Don&apos;t make up an <code className="font-mono bg-slate-100 px-1 rounded">eventStatus</code>.</li>
          <li>Don&apos;t add a price that isn&apos;t displayed on the page.</li>
        </ul>
        <p className="text-xs sm:text-sm font-bold text-slate-900 pt-1">
          Useful schema is not the same as large schema.
        </p>
      </section>

      {/* 8. SECTION: BE CAREFUL WITH DATES */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Be Careful With Dates
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Dates are another small detail that can cause unnecessary problems.
        </p>
        <p className="text-xs sm:text-sm text-slate-600">
          A date-only value can look like:
        </p>
        <pre className="p-3 bg-slate-100 rounded-xl font-mono text-xs text-slate-800">
          <code>2026-10-02</code>
        </pre>
        <p className="text-xs sm:text-sm text-slate-600">
          A date and time with an India timezone can look like:
        </p>
        <pre className="p-3 bg-slate-100 rounded-xl font-mono text-xs text-slate-800">
          <code>2026-10-02T19:30:00+05:30</code>
        </pre>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Use the format appropriate for the property you&apos;re working with, and use the actual date represented by the page.
        </p>
        <p className="text-xs sm:text-sm font-semibold text-slate-900">
          Don&apos;t change dates just to make old content look new.
        </p>
      </section>

      {/* 9. SECTION: SCHEMA.ORG AND GOOGLE ARE NOT THE SAME THING */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Schema.org and Google Are Not the Same Thing
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          This distinction is important when troubleshooting.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <strong>Schema.org</strong> provides the vocabulary — the types and properties used to describe things such as products, people, organizations, events and articles.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Google uses Schema.org vocabulary for many structured-data features, but Google also has its own requirements for those features.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 font-semibold pt-1">
          So there are really two questions:
        </p>
        <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900">
          <p>Is this valid Schema.org structured data?</p>
          <p className="text-slate-500 font-normal text-xs">and</p>
          <p>Does this meet Google&apos;s requirements for the search feature I&apos;m interested in?</p>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          A &ldquo;yes&rdquo; to the first question doesn&apos;t automatically mean &ldquo;yes&rdquo; to the second.
        </p>
      </section>

      {/* 10. SECTION: JSON-LD, MICRODATA OR RDFA? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          JSON-LD, Microdata or RDFa?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Schema.org supports several ways of expressing structured data, including <strong>JSON-LD, Microdata and RDFa</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          JSON-LD is often easier to maintain because the structured data can live separately from the visible HTML rather than being distributed across individual elements.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Google recommends JSON-LD when your site&apos;s setup allows it.
        </p>
        <p className="text-xs sm:text-sm font-semibold text-slate-900">
          For most people using this builder, JSON-LD is the practical choice.
        </p>
      </section>

      {/* 11. SECTION: WHICH SCHEMA TYPES CAN YOU CREATE? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Which Schema Types Can You Create?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The available options depend on the schema types supported by this builder.
        </p>
        <p className="text-xs sm:text-sm font-semibold text-slate-900">
          Common examples include:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
          {SUPPORTED_SCHEMA_TYPES.map((type) => (
            <div
              key={type}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-800 transition-colors"
            >
              {type}
            </div>
          ))}
        </div>
        <div className="pt-2 space-y-1">
          <p className="text-xs sm:text-sm text-slate-600">
            The important question isn&apos;t &ldquo;Which schema can I add?&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-slate-600">
            It&apos;s:
          </p>
          <p className="text-sm sm:text-base font-bold text-emerald-800">
            Which schema accurately describes this page?
          </p>
        </div>
      </section>

      {/* 12. SECTION: WHAT ABOUT FAQ SCHEMA? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          What About FAQ Schema?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">FAQPage</code> is a legitimate Schema.org type.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          But don&apos;t confuse that with the old expectation that adding FAQ markup automatically creates expandable FAQ results in Google.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Google&apos;s current guidance limits FAQ rich-result eligibility primarily to <strong>well-known, authoritative government and health websites</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          For other websites, adding FAQ markup should not be treated as a shortcut to getting FAQ dropdowns in search.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          You can still use Schema.org vocabulary where it genuinely applies. Just don&apos;t build your implementation around a rich-result appearance that Google doesn&apos;t promise.
        </p>
      </section>

      {/* 13. SECTION: WHAT STRUCTURED DATA ACTUALLY DOES */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          What Structured Data Actually Does
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Structured data gives search engines clearer, machine-readable information about the content and entities on a page.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          For supported Google features, it can make a page eligible for certain richer search appearances.
        </p>
        <p className="text-xs sm:text-sm font-bold text-slate-900 pt-1">
          It does <span className="underline">not</span> guarantee:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
          <li>higher rankings</li>
          <li>more traffic</li>
          <li>a particular position</li>
          <li>a rich result</li>
          <li>a specific search appearance</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
          So if someone tells you that adding Schema markup automatically boosts your rankings, be careful with that claim.
        </p>
        <p className="text-xs sm:text-sm font-semibold text-slate-900">
          The useful part is much simpler: <strong>describe the page accurately and give search engines structured information they can process.</strong>
        </p>
      </section>

      {/* 14. SECTION: BEFORE YOU PUBLISH */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Before You Publish
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            You don&apos;t need a 20-step process.
          </p>
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            Run through these checks:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Does the schema type fit the page?',
            'Are the values real?',
            'Do the important values match what visitors see?',
            'Did you check whether another system is already generating Schema?',
            'Are the URLs correct and accessible?',
            'Are dates formatted correctly?',
            'Are ratings and reviews genuine?',
            'Does the markup pass the relevant tests?',
          ].map((checkText, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900"
            >
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{checkText}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1 pt-1 text-xs sm:text-sm text-slate-600">
          <p>Then test the live page.</p>
          <p className="font-semibold text-slate-900">That&apos;s enough for most implementations.</p>
        </div>
      </section>

      {/* 15. SECTION: GENERATE YOUR JSON-LD */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Generate Your JSON-LD
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Use the <strong>Schema.org JSON-LD Structured Data Builder</strong> above to create your markup.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Pick the entity that matches your page, enter the information you actually have, review the generated code, and test it before publishing.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          If something isn&apos;t working, start with the practical checks above — especially <strong>content mismatches, duplicate Schema, incorrect schema types, missing required properties, bad dates, and inaccessible URLs</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Don&apos;t add more markup just because the first version didn&apos;t produce a rich result.
        </p>
        <p className="text-sm font-bold text-emerald-400">
          Find the actual problem first.
        </p>
      </section>

      {/* 16. SECTION: FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> 15 Questions &amp; Answers
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {SCHEMA_BUILDER_FAQS.map((faq) => {
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
