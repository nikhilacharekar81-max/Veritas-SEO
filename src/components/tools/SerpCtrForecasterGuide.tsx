'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  BarChart3,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Check,
  ChevronDown,
  Info,
  DollarSign,
  HelpCircle,
  Activity,
  Sliders,
  Eye,
} from 'lucide-react';

export const SerpCtrForecasterGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: 'faq_1',
      q: 'What is a SERP CTR forecast?',
      a: 'A SERP CTR forecast estimates potential organic clicks using search volume, ranking position, and an assumed click-through rate.',
    },
    {
      id: 'faq_2',
      q: 'How do I calculate estimated clicks?',
      a: 'Use: Estimated clicks = search volume × CTR. For example, 10,000 searches at a 5% CTR gives 500 estimated clicks.',
    },
    {
      id: 'faq_3',
      q: 'Is the forecast guaranteed traffic?',
      a: 'No. It is a scenario based on the assumptions you enter. Actual clicks depend on the real SERP, ranking, search intent, device, country, and other factors.',
    },
    {
      id: 'faq_4',
      q: 'What is a good CTR for Google Search?',
      a: "There isn't one CTR that is good for every keyword. Compare similar queries, ranking positions, devices, countries, and SERPs whenever possible.",
    },
    {
      id: 'faq_5',
      q: 'Why do CTR studies show different numbers?',
      a: 'Studies use different datasets, countries, devices, query types, time periods, and methodologies. Published figures should be treated as benchmarks rather than universal CTR rules.',
    },
    {
      id: 'faq_6',
      q: 'Should I use my own Search Console data?',
      a: "If you have enough comparable data, it's a useful place to start. Your own data reflects your site's audience and the types of searches where your pages actually appear.",
    },
    {
      id: 'faq_7',
      q: 'Can AI Overviews affect organic CTR?',
      a: "Yes, they can. Third-party research has found different CTR patterns on SERPs with AI Overviews, but there isn't one universal adjustment that applies to every keyword.",
    },
    {
      id: 'faq_8',
      q: 'Does position #1 always get the same CTR?',
      a: 'No. CTR can vary based on search intent, device, country, SERP features, query type, and the results surrounding the listing.',
    },
    {
      id: 'faq_9',
      q: 'Should I always forecast position #1?',
      a: 'No. Test realistic targets as well. Moving from #10 to #5 may be a more useful scenario for an SEO project than assuming the page will reach #1.',
    },
    {
      id: 'faq_10',
      q: 'Is keyword search volume the same as impressions?',
      a: "No. Search volume estimates search demand. Search Console impressions measure when your site's result appears in Google Search.",
    },
    {
      id: 'faq_11',
      q: 'Why can a page have many impressions but few clicks?',
      a: 'Possible reasons include a low ranking, a crowded SERP, search features, weak relevance to the query, or competing results that attract more clicks.',
    },
    {
      id: 'faq_12',
      q: 'Can this calculator predict rankings?',
      a: 'No. It calculates potential clicks for the ranking scenario you choose. It does not predict whether your page will reach that position.',
    },
    {
      id: 'faq_13',
      q: 'What CTR data should I use?',
      a: 'Use the most relevant data available. Comparable Search Console data is useful when you have enough of it. Otherwise, choose a recent benchmark that resembles your country, device, query type, intent, and SERP.',
    },
  ];

  return (
    <article className="w-full h-auto overflow-visible space-y-10 text-slate-800 antialiased">
      {/* 1. FAQ SCHEMA MARKUP (FAQPage JSON-LD) */}
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

      {/* 1. HERO TITLE & INTRO */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Organic Traffic Modeling Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            SERP CTR Forecaster
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed max-w-4xl">
            Estimate how many organic clicks a keyword could generate at different Google ranking positions.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            Enter the search volume, choose your CTR assumptions, and compare your current ranking with a target position.
          </p>
        </div>

        {/* Intro Scenario Table */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">For example:</span>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Scenario</th>
                  <th className="p-3.5 text-right">Search Volume</th>
                  <th className="p-3.5 text-right">Position</th>
                  <th className="p-3.5 text-right">CTR</th>
                  <th className="p-3.5 text-right">Estimated Clicks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-semibold text-slate-800">Current</td>
                  <td className="p-3.5 text-right font-mono">15,000</td>
                  <td className="p-3.5 text-right font-mono font-bold text-slate-600">#10</td>
                  <td className="p-3.5 text-right font-mono">2%</td>
                  <td className="p-3.5 text-right font-mono">300/month</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-semibold text-slate-800">Target</td>
                  <td className="p-3.5 text-right font-mono">15,000</td>
                  <td className="p-3.5 text-right font-mono font-bold text-emerald-700">#5</td>
                  <td className="p-3.5 text-right font-mono">5%</td>
                  <td className="p-3.5 text-right font-mono font-semibold text-emerald-800">750/month</td>
                </tr>
                <tr className="bg-emerald-50/70 font-bold border-t border-emerald-100">
                  <td className="p-3.5 text-emerald-950">Difference</td>
                  <td className="p-3.5 text-right text-slate-400 font-mono">—</td>
                  <td className="p-3.5 text-right text-emerald-800 font-mono">+5 positions</td>
                  <td className="p-3.5 text-right text-slate-400 font-mono">—</td>
                  <td className="p-3.5 text-right text-emerald-800 font-mono text-sm sm:text-base">
                    +450/month
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
          <p>
            The important number here isn&apos;t 750. It&apos;s the <strong>difference between the two scenarios</strong>.
          </p>
          <p>
            If improving a page from #10 to #5 could represent roughly 450 additional clicks a month under your assumptions, you now have something useful to investigate.
          </p>
          <p className="text-slate-600">
            The forecast is still only a forecast. Actual CTR depends on the query, search intent, device, country, SERP layout, and what appears around your organic result.
          </p>
        </div>

        {/* Key Takeaways Box */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-3 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Key Takeaways
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Search volume represents demand. It isn&apos;t guaranteed traffic or impressions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span>A position-one result does not have one universal CTR.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span>AI Overviews, ads, local results, shopping, videos, and other SERP features can change the click opportunity.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Your own comparable Search Console data is often more useful than blindly copying a generic CTR curve.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Comparing a current ranking with a realistic target is usually more useful than trying to predict one perfect CTR number.</span>
            </li>
          </ul>
        </div>

        {/* 2. TABLE OF CONTENTS / ANCHOR LINKS BAR */}
        <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-slate-900 shrink-0">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Jump to:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold text-emerald-700">
            <a href="#how-to-use" className="hover:text-emerald-900 hover:underline transition-colors">
              How to Use the Forecaster
            </a>
            <span className="text-slate-300">•</span>
            <a href="#why-curves-lie" className="hover:text-emerald-900 hover:underline transition-colors">
              Why Curves Lie
            </a>
            <span className="text-slate-300">•</span>
            <a href="#ai-overviews" className="hover:text-emerald-900 hover:underline transition-colors">
              AI Overviews &amp; CTR
            </a>
            <span className="text-slate-300">•</span>
            <a href="#worked-example" className="hover:text-emerald-900 hover:underline transition-colors">
              Worked Example
            </a>
            <span className="text-slate-300">•</span>
            <a href="#forecasting-workflow" className="hover:text-emerald-900 hover:underline transition-colors">
              Step-by-Step Workflow
            </a>
            <span className="text-slate-300">•</span>
            <a href="#faq-section" className="hover:text-emerald-900 hover:underline transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </section>

      {/* 2. HOW TO USE THE SERP CTR FORECASTER */}
      <section id="how-to-use" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            How to Use the SERP CTR Forecaster
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Use the tool with a keyword you are actually considering for SEO work. You need three basic inputs:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { num: '1', title: 'Search volume', desc: 'Monthly query volume estimate' },
            { num: '2', title: 'Ranking position', desc: 'Current rank vs realistic target' },
            { num: '3', title: 'CTR assumption', desc: 'Model based on intent & SERP' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                {item.num}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Let&apos;s say a keyword gets an estimated 10,000 searches per month and your page currently ranks around #9. You might want to see what happens if the page reaches #4. Enter the two scenarios and compare the estimated clicks.
        </p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`Current position: 9\nEstimated CTR: 2%\n\nTarget position: 4\nEstimated CTR: 6%`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The calculator turns those assumptions into estimated monthly clicks. That gives you a way to put a rough traffic value against a ranking improvement instead of saying only, &quot;We should rank higher.&quot;
        </p>
      </section>

      {/* 3. HOW IS CTR CALCULATED? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            How Is CTR Calculated?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          CTR stands for <strong>click-through rate</strong>. It represents the percentage of impressions that result in clicks. Google Search Console calculates CTR using clicks divided by impressions.
        </p>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For a simple traffic forecast, the calculation is:</span>
          <pre className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs sm:text-sm text-center leading-relaxed">
            <code>{`Estimated clicks\n=\nsearch volume × estimated CTR`}</code>
          </pre>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For example:</span>
          <pre className="p-4 bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl font-mono text-xs text-center leading-relaxed">
            <code>{`25,000 searches\n×\n4% CTR\n=\n1,000 estimated clicks`}</code>
          </pre>
        </div>

        <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
          <p>The calculation isn&apos;t the difficult part. <strong>Choosing the inputs is.</strong></p>
          <p>
            A search-volume estimate can differ from the number of impressions your page actually receives. Your CTR can also be very different from a generic industry benchmark.
          </p>
          <p className="font-semibold text-slate-900">
            That&apos;s why the number produced by this tool should be read as a <em>scenario based on your assumptions</em>, not as a prediction of exactly what Google will send you.
          </p>
        </div>
      </section>

      {/* 4. WHY YOU CAN'T USE ONE CTR CURVE FOR EVERY KEYWORD */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Why You Can&apos;t Use One CTR Curve for Every Keyword
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          You&apos;ve probably seen a standard table showing something like:
        </p>

        <pre className="p-3.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-mono text-xs">
          <code>{`Position 1 → X%\nPosition 2 → Y%\nPosition 3 → Z%`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          It&apos;s tempting to copy those numbers into a spreadsheet and use them for every keyword. That is where things get messy.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          CTR studies are built from particular datasets. They can differ by country, device, query type, search intent, date range, SERP features, and methodology. Historical studies can also describe a search environment that looks quite different from the one users see today.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          For example, a well-known historical Backlinko study reported an average CTR of 27.6% for position #1 in its dataset. More recent studies have produced different figures depending on the market and SERP conditions being measured.
        </p>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-950 font-semibold">
          Treat published CTR studies as rough benchmarks, not laws. If your keyword triggers a very different SERP from the dataset behind the benchmark, copying the benchmark doesn&apos;t suddenly make the forecast accurate.
        </div>
      </section>

      {/* 5. WHY GENERIC CTR CURVES CAN LIE */}
      <section id="why-curves-lie" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Why Generic CTR Curves Can Lie
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A ranking position tells you where the result appears. It doesn&apos;t tell you what appears around it. Consider two keywords where your page ranks #1:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Keyword A (Clean SERP)</span>
            <pre className="p-3 bg-white border border-slate-200 text-slate-800 rounded-xl font-mono text-xs">
              <code>{`Organic result #1\nOrganic result #2\nOrganic result #3`}</code>
            </pre>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Keyword B (Crowded SERP)</span>
            <pre className="p-3 bg-white border border-slate-200 text-slate-800 rounded-xl font-mono text-xs">
              <code>{`AI Overview\nAds\nOrganic result #1\nPeople Also Ask\nVideo results`}</code>
            </pre>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Both pages are technically ranking #1. The opportunity to earn an organic click can still be very different.
        </p>

        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">Strategic Mindset Shift:</span>
          <p className="text-xs sm:text-sm text-slate-300">
            Instead of asking: <em>&quot;What&apos;s the CTR for position #1?&quot;</em>
          </p>
          <p className="text-sm sm:text-base font-extrabold text-emerald-400">
            &quot;What does the actual SERP look like for this keyword?&quot;
          </p>
          <p className="text-xs text-slate-400">
            That small change in thinking makes CTR forecasting much more useful.
          </p>
        </div>

        {/* Mid-Article Tool Integration CTA 1 */}
        <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs sm:text-sm text-emerald-950 font-medium text-center sm:text-left">
            Ready to test these numbers on your target query?
          </span>
          <a
            href="#interactive-calculator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <span>Jump back up to test your keyword in the calculator</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 6. WHAT CAN CHANGE ORGANIC CTR? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            What Can Change Organic CTR?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Look at the page before choosing your CTR assumption. Depending on the query, you may see:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {[
            'Google Ads',
            'AI Overviews',
            'Featured snippets',
            'People Also Ask',
            'Local packs',
            'Shopping results',
            'Videos',
            'Image results',
            'Knowledge panels',
            'Other search features',
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 text-center"
            >
              {feature}
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Research from Advanced Web Ranking shows substantial differences in measured CTR depending on SERP features, device, search intent, and AI Overview presence. SISTRIX has likewise documented differences between SERPs with different feature combinations.
        </p>

        <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          The point isn&apos;t that one particular feature always produces a fixed CTR reduction. There isn&apos;t a reliable universal adjustment you can apply to every keyword. The useful thing is to <strong>look at the SERP you&apos;re actually trying to win</strong>.
        </p>
      </section>

      {/* 7. HOW DO AI OVERVIEWS CHANGE CTR? */}
      <section id="ai-overviews" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            How Do AI Overviews Change CTR?
          </h3>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs text-center space-y-1">
          <div>Ranking position</div>
          <div className="text-slate-400">↓</div>
          <div>CTR</div>
          <div className="text-slate-400">↓</div>
          <div className="font-bold text-slate-900">Clicks</div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          That still works as a basic calculation, but it doesn&apos;t describe every modern SERP. Google Search now includes AI Overviews and AI Mode. AI Overviews can also contain links to web sources.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Third-party research has found different organic CTR patterns on searches where AI Overviews appear. Advanced Web Ranking&apos;s 2026 research, for example, reports meaningful differences between its datasets with and without AI Overviews.
        </p>

        <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
          <p className="font-semibold text-slate-900">
            For your forecast, the practical approach is much simpler:
          </p>
          <div className="font-bold text-emerald-800">
            Search the keyword. Check whether an AI Overview appears. Look at what it contains. Then choose an assumption that makes sense for that SERP.
          </div>
        </div>
      </section>

      {/* 8. SEARCH INTENT CAN CHANGE THE CLICK PATTERN */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Search Intent Can Change the Click Pattern
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">Compare these three searches:</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-700">facebook login</span>
            <p className="text-xs text-slate-600">Navigational: Specific destination in mind. Position #1 absorbs almost all clicks.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700">how to improve website speed</span>
            <p className="text-xs text-slate-600">Informational: User opens several results, reads guides, and compares insights.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700">buy running shoes</span>
            <p className="text-xs text-slate-600">Commercial: Dispersed clicks across Google Shopping, filters, ads, and category pages.</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          That difference matters when you&apos;re choosing a CTR benchmark. A CTR study based heavily on one type of query isn&apos;t automatically a good benchmark for another. If you have your own data, compare similar searches rather than mixing everything together.
        </p>
      </section>

      {/* 9. SEARCH VOLUME IS NOT YOUR TRAFFIC */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Search Volume Is Not Your Traffic
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          This is probably the easiest mistake to make when looking at keyword tools. Suppose a keyword shows <strong>100,000 monthly searches</strong>. That does <em>not</em> mean your page has 100,000 potential visits.
        </p>

        <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2 text-center">
          <div className="text-slate-300">100,000 searches (Demand)</div>
          <div className="text-rose-400">≠ is not the same as</div>
          <div className="text-slate-300">100,000 impressions (Visibility)</div>
          <div className="text-rose-400">≠ is certainly not</div>
          <div className="text-emerald-400 font-bold">100,000 clicks (Actual Traffic)</div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The CTR calculation only estimates the final part of that journey.
        </p>
      </section>

      {/* 10. YOUR SEARCH CONSOLE DATA IS WORTH CHECKING */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Your Search Console Data Is Worth Checking
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          If your site already has enough organic traffic, start looking at your own data before reaching for a generic CTR table. Search Console lets you break performance down by queries, pages, countries, devices, search appearance, and dates.
        </p>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            For example, suppose you have enough comparable data to see:
          </span>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Ranking range</th>
                  <th className="p-3 text-right">Observed CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono font-medium">
                <tr>
                  <td className="p-3">Positions 1–2</td>
                  <td className="p-3 text-right font-bold text-emerald-700">14%</td>
                </tr>
                <tr>
                  <td className="p-3">Positions 3–5</td>
                  <td className="p-3 text-right font-bold text-emerald-700">7%</td>
                </tr>
                <tr>
                  <td className="p-3">Positions 6–10</td>
                  <td className="p-3 text-right font-bold text-emerald-700">3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          That may be a useful starting point for forecasting on your own site. The closer your comparison is to the keyword you&apos;re forecasting, the more useful it becomes.
        </p>
      </section>

      {/* 11. CURRENT POSITION VS. TARGET POSITION */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Current Position vs. Target Position
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          This is where the tool becomes especially useful for SEO planning. Let&apos;s say a page currently sits around #9. After looking at the SERP and competing pages, you decide that #4 is a reasonable target. You can compare:
        </p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`Current: #9 → estimated clicks\nTarget:  #4 → estimated clicks\n\nDifference = traffic opportunity of that ranking improvement`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          You can also run several scenarios: <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">#9 → #8</code>, <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">#9 → #5</code>, <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">#9 → #3</code>, <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">#9 → #1</code>. Now you&apos;re looking at a range of possible outcomes rather than building the entire SEO plan around a single position.
        </p>
      </section>

      {/* 12. DON'T AUTOMATICALLY MAKE POSITION #1 THE GOAL */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Don&apos;t Automatically Make Position #1 the Goal
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Position #1 looks attractive in a calculator because it usually produces the largest theoretical traffic number. But SEO projects don&apos;t work from theoretical traffic alone.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          If you&apos;re currently at #11, moving to #7 may be a meaningful improvement. Moving to #5 may be the next serious target. Position #1 can remain a longer-term scenario. The point of the calculator is to compare those possibilities.
        </p>
      </section>

      {/* 13. USE A RANGE WHEN THE CTR IS UNCERTAIN */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Use a Range When the CTR Is Uncertain
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          If you&apos;re unsure whether a keyword should use a 3%, 5%, or 7% CTR assumption, don&apos;t pretend one of those numbers is definitely correct. Run all three.
        </p>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">For 20,000 searches:</span>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 text-right">CTR assumption</th>
                  <th className="p-3 text-right">Estimated clicks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono font-medium">
                <tr>
                  <td className="p-3 text-right">3%</td>
                  <td className="p-3 text-right">600</td>
                </tr>
                <tr>
                  <td className="p-3 text-right font-bold text-slate-900">5%</td>
                  <td className="p-3 text-right font-bold text-slate-900">1,000</td>
                </tr>
                <tr>
                  <td className="p-3 text-right">7%</td>
                  <td className="p-3 text-right">1,400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Now you have a reasonable range to work with. That is often more useful than reporting something like <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">Expected traffic: 1,037 clicks</code> when the underlying search volume and CTR are themselves estimates. More decimal places don&apos;t make an uncertain forecast more reliable.
        </p>
      </section>

      {/* 14. A LOW CTR DOESN'T AUTOMATICALLY MEAN YOUR TITLE IS BAD */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            A Low CTR Doesn&apos;t Automatically Mean Your Title Is Bad
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A low CTR can have several explanations:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Maybe the page ranks too low',
            'Maybe the query isn&apos;t a particularly good match for the page',
            'Maybe the SERP is crowded with features',
            'Maybe an AI Overview, local pack, shopping results, or videos take attention',
            'Maybe competing results have titles that look more relevant to intent',
            'Or the query itself may simply have a different click pattern',
          ].map((reason, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: reason }} />
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Before rewriting a title because CTR looks low, look at the surrounding data: Query + Page + Impressions + Clicks + CTR + Average position + Device + Country + SERP.
        </p>
      </section>

      {/* 15. THE SAME POSITION CAN PRODUCE VERY DIFFERENT TRAFFIC */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            The Same Position Can Produce Very Different Traffic
          </h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Page</th>
                <th className="p-3 text-right">Search Volume</th>
                <th className="p-3 text-right">Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono font-medium">
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">Page A</td>
                <td className="p-3 text-right">20,000</td>
                <td className="p-3 text-right font-bold text-emerald-700">#4</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">Page B</td>
                <td className="p-3 text-right">2,000</td>
                <td className="p-3 text-right font-bold text-emerald-700">#4</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The ranking is identical. The available search demand isn&apos;t. Now add the SERP: Page A has AI Overviews, ads, and videos. Page B has mostly traditional organic blue links. Again, the ranking is identical, but the click environment isn&apos;t.
        </p>
      </section>

      {/* 16. BE CAREFUL WITH AVERAGE POSITION */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Be Careful With Average Position
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Search Console&apos;s average position is useful, but it isn&apos;t the same as saying: <em>&quot;My page ranked exactly at #5.&quot;</em> A page can appear at different positions for different searches, devices, locations, and SERP situations. The reported number is an aggregate.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          So if you see Average position: 5 with CTR: 6%, don&apos;t automatically conclude that Position #5 = 6% CTR across all queries.
        </p>
      </section>

      {/* 17. DON'T PUT EVERY QUERY INTO ONE CTR BUCKET */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Don&apos;t Put Every Query Into One CTR Bucket
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A site-wide CTR can be useful as a quick health check. It&apos;s not necessarily useful for forecasting one keyword.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          For example: <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">Mobile + Non-branded + Informational + Positions 4–6</code> is a much better comparison for a specific informational keyword than blending all queries, all devices, all countries, and all positions together.
        </p>
      </section>

      {/* 18. A WORKED EXAMPLE */}
      <section id="worked-example" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            A Worked Example
          </h3>
        </div>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`Monthly search volume: 15,000\nCurrent position: 10 (2% CTR → 300 clicks)\nTarget position: 5 (5% CTR → 750 clicks)\n\nOpportunity = +450 additional clicks/month`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Under those assumptions, the move from #10 to #5 represents about <strong>450 additional clicks per month</strong>. That&apos;s the useful part of the calculation. But it doesn&apos;t answer everything. You still need to ask:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            'Can the page realistically reach #5?',
            'Does the keyword have enough business value?',
            'Does the actual SERP support a 5% CTR assumption?',
            'Is the search volume relevant to your target country?',
            'Will the traffic convert?',
          ].map((q, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              <span>{q}</span>
            </div>
          ))}
        </div>

        {/* Mid-Article Tool Integration CTA 2 */}
        <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
          <span className="text-xs sm:text-sm text-emerald-950 font-medium text-center sm:text-left">
            Have a target position in mind for your rankings?
          </span>
          <a
            href="#interactive-calculator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <span>Jump back up to test your keyword in the calculator</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 19. TRAFFIC POTENTIAL ISN'T THE SAME AS BUSINESS VALUE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Traffic Potential Isn&apos;t the Same as Business Value
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900">Keyword A</span>
            <div className="text-xs font-mono text-slate-600">100,000 searches • Broad intent • Low business relevance</div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
            <span className="text-xs font-bold text-emerald-950">Keyword B</span>
            <div className="text-xs font-mono text-emerald-800">5,000 searches • Strong commercial intent • Highly relevant</div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Keyword A has a larger theoretical traffic pool, but that doesn&apos;t automatically make it more valuable. When prioritising keywords, consider traffic alongside business relevance, conversion potential, competition, ranking difficulty, existing authority, content quality, estimated effort, and SERP characteristics.
        </p>
      </section>

      {/* 20. HOW TO USE YOUR OWN RESULTS TO IMPROVE FUTURE FORECASTS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            How to Use Your Own Results to Improve Future Forecasts
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Suppose you forecast Position #5 with a 6% CTR assumption. A few months later, comparable pages on your site are consistently getting around 4.2% CTR at similar positions. That&apos;s useful evidence that your original assumption may have been too high for that particular group of searches. Over time, that historical evidence makes your forecasts increasingly realistic.
        </p>
      </section>

      {/* 21. COMMON CTR FORECASTING MISTAKES */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Common CTR Forecasting Mistakes
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {[
            {
              title: 'Copying an old CTR table',
              desc: 'A benchmark is useful, but the search environment behind it may no longer match the SERP you are analysing.',
            },
            {
              title: 'Using the same CTR for every keyword',
              desc: 'Different query types (informational, navigational, commercial) behave very differently.',
            },
            {
              title: 'Ignoring the SERP',
              desc: 'A ranking position without SERP context (ads, AI Overviews, videos) tells only part of the story.',
            },
            {
              title: 'Treating search volume as guaranteed traffic',
              desc: "Search volume describes demand. It doesn't guarantee impressions or clicks for your site.",
            },
            {
              title: 'Making position #1 the default target',
              desc: 'A realistic incremental target usually gives you a far more actionable planning scenario.',
            },
            {
              title: 'Giving an estimate false precision',
              desc: "If inputs are uncertain, don't present the output as though it were measured to the single decimal click.",
            },
            {
              title: 'Ignoring Search Console',
              desc: 'Once your site has enough data, your own comparable queries provide the most accurate benchmark.',
            },
            {
              title: 'Confusing CTR forecasting with ranking prediction',
              desc: "The calculator models traffic IF the ranking happens; it does not predict whether Google will rank you there.",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-rose-100 text-rose-800 flex items-center justify-center text-xs">✕</span>
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 22. A SIMPLE SEO FORECASTING WORKFLOW */}
      <section id="forecasting-workflow" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            A Simple SEO Forecasting Workflow
          </h3>
        </div>

        <div className="space-y-2.5">
          {[
            { step: 'Start with the keyword', desc: 'Make sure the query is relevant to the page and the business.' },
            { step: 'Check the search demand', desc: 'Use the best available volume estimate for the market you are targeting.' },
            { step: 'Check the current ranking', desc: 'Search Console or a reliable rank tracker gives you the starting point.' },
            { step: 'Search the keyword yourself', desc: 'Look at the actual SERP rather than relying only on a keyword tool.' },
            { step: 'Check the SERP features', desc: 'Look for AI Overviews, ads, videos, local results, and shopping carousels.' },
            { step: 'Choose the CTR assumption', desc: 'Use comparable Search Console data or a matching intent benchmark.' },
            { step: 'Set a realistic target', desc: "Don't jump straight from #10 to #1 unless there's strong justification." },
            { step: 'Compare several outcomes', desc: 'Current, realistic, and ambitious targets tell you more than one number.' },
            { step: 'Track the real result', desc: 'Compare the forecast with actual impressions, clicks, CTR, and rankings.' },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 flex items-start gap-3 text-xs sm:text-sm">
              <span className="font-bold font-mono text-emerald-700 shrink-0">{idx + 1}.</span>
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900">{item.step}: </span>
                <span className="text-slate-600">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 23. WHAT THIS TOOL CANNOT PREDICT */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            What This Tool Cannot Predict
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          There are limits to what a CTR calculator can tell you. It cannot predict:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            'Whether Google will rank your page',
            'The exact position you will reach',
            'How quickly rankings will change',
            'Whether a competitor will overtake you',
            'Whether search demand will remain stable',
            'Whether the SERP layout will change',
            'Whether an AI Overview will appear every time',
            'Whether users will choose your result',
            'Whether the traffic will convert',
            'Whether a particular CTR study accurately represents your keyword',
          ].map((limit, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>{limit}</span>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
          It estimates the click opportunity <strong>under a set of assumptions</strong>. That&apos;s enough. You don&apos;t need the tool to predict the future. You need it to make the traffic side of an SEO opportunity easier to understand.
        </p>
      </section>

      {/* 24. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq-section" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6 scroll-mt-24">
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

      {/* 25. USE THE FORECAST TO UNDERSTAND THE OPPORTUNITY */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Use the Forecast to Understand the Opportunity
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          A useful CTR forecast is not trying to guess the future down to the last click. It&apos;s answering a simpler question:
        </p>

        <div className="p-4 bg-white/10 rounded-2xl text-emerald-300 font-bold text-sm sm:text-base border border-white/10">
          &quot;If this page moves from where it is now to a realistic target, what could the additional organic click opportunity look like?&quot;
        </div>

        <div className="p-4 bg-white/5 rounded-2xl font-mono text-xs space-y-1 text-slate-300 border border-white/10 text-center">
          <div>Search demand</div>
          <div className="text-slate-500">↓</div>
          <div>Ranking scenario</div>
          <div className="text-slate-500">↓</div>
          <div>SERP environment</div>
          <div className="text-slate-500">↓</div>
          <div>CTR assumption</div>
          <div className="text-slate-500">↓</div>
          <div className="text-emerald-400 font-bold">Estimated clicks</div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Search volume gives you the demand estimate. The ranking scenario gives you the visibility assumption. The SERP tells you what the searcher actually sees. The CTR connects those pieces to an estimated number of clicks.
        </p>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Use the number as a planning input, not a promise. Then compare it with real Search Console data as your pages gain impressions and clicks.
        </p>

        <div className="p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl text-xs sm:text-sm font-bold text-emerald-200 text-center">
          The best CTR forecast isn&apos;t the one with the most impressive number. It&apos;s the one built from assumptions that make sense for the search you&apos;re actually targeting.
        </div>
      </section>
    </article>
  );
};
