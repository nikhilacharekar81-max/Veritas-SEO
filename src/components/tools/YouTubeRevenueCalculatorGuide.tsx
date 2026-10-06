import React from 'react';
import {
  HelpCircle,
  BookOpen,
  DollarSign,
  TrendingUp,
  Target,
  Video,
  Film,
  ShieldCheck,
  Compass,
  ArrowRight,
  Calculator,
} from 'lucide-react';

export const YouTubeRevenueCalculatorGuide: React.FC = () => {
  return (
    <div className="space-y-10 pt-6">
      {/* 1. Core Mathematical Formula & Mechanics */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Calculation Mechanics
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            How YouTube Estimated Revenue is Calculated
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            The calculator evaluates your revenue using the standard creator earnings equation.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 font-mono">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Formula</div>
          <div className="text-base sm:text-lg font-black text-emerald-400">
            Estimated Revenue = (Views ÷ 1,000) × RPM
          </div>
          <div className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
            When you enter an RPM value, the calculator uses it directly as your net creator payout rate. It does not deduct YouTube&apos;s platform cut a second time, because creator RPM is already net of YouTube&apos;s revenue share.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-700 block">Monthly Revenue</span>
            <code className="text-slate-900 font-bold block">(Monthly Views ÷ 1,000) × RPM</code>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-700 block">Daily Average</span>
            <code className="text-slate-900 font-bold block">Monthly Revenue ÷ 30.44</code>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-700 block">Weekly Average</span>
            <code className="text-slate-900 font-bold block">(Monthly Revenue ÷ 30.44) × 7</code>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-700 block">Annual Projected</span>
            <code className="text-slate-900 font-bold block">Monthly Revenue × 12</code>
          </div>
        </div>
      </section>

      {/* 2. Understanding RPM vs CPM */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" /> Creator Economics
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Understanding RPM vs. CPM in Plain English
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Knowing the distinction helps you use the right numbers for accurate planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">CPM (Cost Per Mille)</h4>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                Advertiser Side
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              CPM is the price advertisers pay to YouTube for every 1,000 ad impressions. This is measured <em>before</em> YouTube deducts its platform share, and it applies only to monetized playback impressions where ads were actually served.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emerald-950 text-sm">RPM (Revenue Per Mille)</h4>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                Creator Net Metric
              </span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              RPM represents your real earnings per 1,000 total video views. It reflects what you actually take home after YouTube&apos;s cut, factoring in all views (both monetized and unmonetized) as well as alternative revenue sources like YouTube Premium and Super Thanks.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-700" /> Use Channel-Specific Metrics
          </div>
          <p className="leading-relaxed">
            RPM is not a single fixed universal number. It fluctuates based on audience geography, viewer demographics, video duration, and seasonal ad spend. Using your channel&apos;s actual historical RPM from YouTube Studio yields the most realistic results.
          </p>
        </div>
      </section>

      {/* 3. Long-Form vs. Shorts Modeling */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
            <Film className="w-4 h-4" /> Multi-Format Modeling
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            How Long-Form &amp; Shorts Differ in the Calculator
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            The tool lets you model formats separately or combine them into a single blended calculation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Film className="w-4 h-4 text-indigo-600" /> Long-Form Video Format
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Long-form videos feature dedicated pre-roll, mid-roll, and post-roll video ads. When modeling long-form content, you specify views and RPM corresponding to your standard video catalog.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Video className="w-4 h-4 text-red-600" /> YouTube Shorts Format
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shorts are monetized via an aggregated revenue pool where ad revenue between feed videos is distributed among creators. Because view volumes and monetization mechanics differ from regular videos, Shorts are tracked with their own separate RPM.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <span className="font-bold text-slate-900 block">Hybrid Channels &amp; Blended RPM</span>
          <p className="text-slate-600 leading-relaxed">
            When you select <strong>Long-Form + Shorts (Hybrid)</strong>, the calculator computes earnings for each format independently:
          </p>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-slate-800 space-y-1">
            <div>Total Revenue = Long-Form Revenue + Shorts Revenue</div>
            <div>Blended RPM = (Total Revenue ÷ Total Combined Views) × 1,000</div>
          </div>
        </div>
      </section>

      {/* 4. Income Goal Reverse Calculation */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-4 h-4" /> Reverse Planning
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Calculating Views Needed for an Income Target
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Determine how much traffic is required to reach a specific monthly or annual revenue milestone.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 font-mono">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reverse Formula</div>
          <div className="text-base sm:text-lg font-black text-cyan-400">
            Required Monthly Views = (Monthly Income Goal ÷ RPM) × 1,000
          </div>
          <div className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
            Required Daily Views = Required Monthly Views ÷ 30.44
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
          <h4 className="font-bold text-blue-950 text-sm">Illustrative Example</h4>
          <p className="text-xs text-blue-900 leading-relaxed">
            If your target monthly income is <strong>₹1,00,000 ($1,200)</strong> and your channel&apos;s expected RPM is <strong>₹100 ($1.20)</strong>:
          </p>
          <div className="p-3 bg-white/80 rounded-xl border border-blue-200/80 font-mono text-xs text-slate-800">
            ₹1,00,000 ÷ ₹100 × 1,000 = 1,000,000 monthly views (~32,852 daily views)
          </div>
          <p className="text-[11px] text-blue-800 italic">
            * Note: This is an illustrative mathematical calculation based on the selected RPM. It does not guarantee that generating that volume of views will result in exact revenue, as RPM fluctuates in practice.
          </p>
        </div>
      </section>

      {/* 5. Practical YouTube Studio Workflow */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-slate-700" /> Step-by-Step Workflow
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            How to Use Your Own YouTube Studio RPM
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Follow this simple five-step workflow to calibrate the calculator with your real channel data.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Open YouTube Studio</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Log into your YouTube Studio dashboard on desktop or mobile.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Go to Analytics</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Navigate to the Analytics section in the left navigation sidebar.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Review Revenue / RPM</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Inspect your reported RPM under the Revenue tab for the last 28, 90, or 365 days.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Enter RPM in Tool</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Input your exact historical RPM into the calculator along with your view numbers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              5
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Explore Scenarios</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Adjust view targets and growth rates to plan your channel&apos;s financial goals.
            </p>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 italic">
          * Note: This calculator is an independent planning tool and does not connect directly to YouTube Studio or access private account data.
        </div>
      </section>

      {/* 6. Interpreting Scenarios & Projections */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" /> Scenario Modeling
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            How to Interpret Scenarios &amp; Compound Projections
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Understand how planning ranges and growth simulations function.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase block">Conservative Tier</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Models revenue when RPM or views dip below baseline (e.g., during lower-spend seasonal periods like post-holiday Q1).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase block">Expected Tier</span>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Reflects your baseline inputs and typical channel performance under normal operating conditions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase block">Optimistic Tier</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Models revenue when views spike or high advertiser demand lifts RPM (such as during Q4 holiday marketing surges).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <strong>12-Month Projections:</strong> The compound projection tool applies your custom monthly growth rate assumption month-over-month to project cumulative revenue over a full year. These models serve as strategic planning aids rather than guaranteed forecasts.
        </div>
      </section>

      {/* 7. Assumptions, Trust & Limitations */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-slate-700" /> Transparency &amp; Assumptions
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Assumptions &amp; Practical Limitations
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Understanding what the calculator does and does not account for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900">What the Calculator Does</h4>
            <ul className="space-y-2 text-slate-600 list-disc list-inside">
              <li>Executes deterministic arithmetic using your exact inputs.</li>
              <li>Calculates daily, weekly, monthly, and annual distributions.</li>
              <li>Handles format blending for hybrid Long-form and Shorts channels.</li>
              <li>Computes reverse required views for customizable income goals.</li>
            </ul>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900">Variables Outside the Calculator</h4>
            <ul className="space-y-2 text-slate-600 list-disc list-inside">
              <li>Ad blocker adoption rates among your specific audience.</li>
              <li>Sudden advertiser budget swings and regional seasonality.</li>
              <li>Video watch time, audience retention, and ad inventory density.</li>
              <li>YouTube algorithm shifts affecting organic impressions.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions Accordion */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-700" /> Frequently Asked Questions
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            YouTube Earnings &amp; Calculation FAQs
          </h3>
        </div>

        <div className="space-y-4 text-sm divide-y divide-slate-100">
          <div className="pt-3 space-y-1.5">
            <h4 className="font-bold text-slate-900">How does this YouTube Revenue Calculator work?</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              It calculates estimated revenue from your view count and net creator RPM (Revenue Per Mille). Long-form and Shorts earnings can be modeled individually or blended proportionally for hybrid channels.
            </p>
          </div>

          <div className="pt-3 space-y-1.5">
            <h4 className="font-bold text-slate-900">What is the difference between CPM and RPM?</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              CPM (Cost Per Mille) is what advertisers pay to YouTube per 1,000 ad impressions before YouTube takes its revenue share. RPM (Revenue Per Mille) is your actual net creator earnings per 1,000 total video views across all monetization sources.
            </p>
          </div>

          <div className="pt-3 space-y-1.5">
            <h4 className="font-bold text-slate-900">How many views are required to earn ₹1,00,000 ($1,200) per month?</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              At an RPM of ₹100 ($1.20), a channel needs 1,000,000 monthly views (approximately 32,852 daily views). If your RPM is ₹200 ($2.40), 500,000 monthly views are required for the same target.
            </p>
          </div>

          <div className="pt-3 space-y-1.5">
            <h4 className="font-bold text-slate-900">Why are YouTube Shorts earnings calculated separately from long-form videos?</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Shorts and long-form videos use different monetization structures. Long-form video ads run directly on videos, while Shorts ad revenue is pooled across the Shorts feed and shared among eligible creators, typically resulting in different RPM rates.
            </p>
          </div>

          <div className="pt-3 space-y-1.5">
            <h4 className="font-bold text-slate-900">Does the calculator connect directly to my YouTube Studio?</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              No. The calculator is a standalone mathematical planning tool that does not access or connect to private YouTube Studio accounts. You enter your own metrics from YouTube Studio Analytics directly into the tool.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
