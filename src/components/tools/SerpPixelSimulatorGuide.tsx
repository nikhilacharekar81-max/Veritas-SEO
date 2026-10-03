'use client';

import React, { useState } from 'react';
import { EditableText } from '../public/EditableText';
import {
  Info,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  XCircle,
  FileText,
} from 'lucide-react';

const SERP_SIMULATOR_FAQS = [
  {
    id: 'faq_1',
    q: 'What does a SERP pixel width simulator do?',
    a: 'It estimates how much horizontal space your SEO title takes up and shows a visual search-result preview. This lets you check the title before publishing instead of relying only on its character count.',
  },
  {
    id: 'faq_2',
    q: 'Why can two titles with the same number of characters have different widths?',
    a: "Letters and symbols don't all have the same width. For example, a title containing several W characters will generally take up more space than one containing the same number of i characters. Pixel width accounts for this difference, while character count does not.",
  },
  {
    id: 'faq_3',
    q: 'What pixel width should my SEO title be?',
    a: 'There is no single pixel width that guarantees a title will display perfectly in every Google search result. Common figures such as 580–600 pixels are useful reference points, but they are not official Google limits.\n\nUse the number together with the preview rather than trying to hit one exact target.',
  },
  {
    id: 'faq_4',
    q: 'Is a 60-character SEO title limit required by Google?',
    a: 'No. Google does not require titles to stay within 60 characters. The 50–60 character guideline is a common SEO recommendation, but titles can be shorter or longer.\n\nWhat matters more is whether the title clearly describes the page and puts useful information where people can see it.',
  },
  {
    id: 'faq_5',
    q: 'Can a title fit within the pixel width but still be a bad SEO title?',
    a: "Yes.\n\nA title can have a reasonable width and still be vague, misleading, repetitive, or difficult to understand. Pixel width only tells you about the space the text occupies. It doesn't tell you whether the title is useful or relevant to the page.",
  },
  {
    id: 'faq_6',
    q: 'Will the simulator show exactly what Google will display?',
    a: 'No. A simulator is an approximation.\n\nGoogle can change the way search results are displayed, and the final appearance can vary depending on factors such as the device, search query, and other search-result elements. Use the preview to review your title, not as a guarantee of its final appearance.',
  },
  {
    id: 'faq_7',
    q: "Why doesn't Google always show the title I wrote?",
    a: 'Google can create the title link shown in search results from information on the page and other relevant sources. Because of this, the text you put in the HTML <title> element is not an absolute guarantee of what Google will display.',
  },
  {
    id: 'faq_8',
    q: 'Should I shorten a title if the simulator shows it as too wide?',
    a: 'Not automatically.\n\nFirst check whether the title contains unnecessary words or whether the important information could be moved earlier. If the title is clear and useful as it is, changing it solely to reach a particular pixel number may not improve it.',
  },
  {
    id: 'faq_9',
    q: 'Is pixel width more important than character count?',
    a: 'They measure different things.\n\nCharacter count tells you how many characters your title contains. Pixel width estimates how much horizontal space those characters occupy. Neither number should be treated as a standalone rule for writing titles.',
  },
  {
    id: 'faq_10',
    q: 'Why should I check the mobile preview?',
    a: 'Mobile screens generally provide less horizontal space than desktop layouts. Looking at the mobile preview can help you notice when a title becomes crowded or when important information appears too far into the title.',
  },
  {
    id: 'faq_11',
    q: 'Can this tool tell me whether my page will rank?',
    a: 'No. Pixel width is a presentation measurement, not a ranking metric.\n\nThe tool can help you review the appearance and readability of your title, but it cannot predict where your page will appear in Google.',
  },
  {
    id: 'faq_12',
    q: 'Does the simulator check my meta description too?',
    a: 'That depends on the features provided by the tool. If a meta description preview is available, it can help you review how the description may look in a search result. However, Google may generate a different snippet from the content on your page.',
  },
  {
    id: 'faq_13',
    q: 'What should I look for after checking my title?',
    a: "Don't focus only on the pixel number. Read the title as if you were seeing it in a search result.\n\nCheck that:\n• The page topic is immediately clear.\n• The most useful information isn't buried at the end.\n• There are no unnecessary words.\n• The title sounds natural.\n• The title accurately matches the page.\n• The preview still makes sense on smaller screens.",
  },
  {
    id: 'faq_14',
    q: 'Should I try to make every SEO title the same length?',
    a: 'No.\n\nDifferent pages need different titles. A product page, blog post, category page, and SEO tool page may need different amounts of information to describe what they offer.\n\nWrite the clearest title for the specific page, then use the pixel-width check to review how it may appear.',
  },
];

export const SerpPixelSimulatorGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    SERP_SIMULATOR_FAQS.forEach((faq) => {
      initial[faq.id] = true;
    });
    return initial;
  });

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };

  return (
    <div className="space-y-10 mt-10">
      {/* 1. HERO INTRO SECTION */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Complete Engineering Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            <EditableText
              blockKey="serp_guide.main_heading"
              defaultContent="Google SERP Pixel Width Simulator"
              label="SERP Guide Main Heading"
            />
          </h2>
          <p className="text-base sm:text-lg font-medium text-emerald-700">
            <EditableText
              blockKey="serp_guide.sub_heading"
              defaultContent="See how your SEO title may look in Google"
              label="SERP Guide Subheading"
            />
          </p>
        </div>

        <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            <EditableText
              blockKey="serp_guide.p1"
              defaultContent="Writing a good SEO title is only part of the job. You also want to know how much space that title takes up when it appears in a search result."
              label="Intro Paragraph 1"
              multiline
            />
          </p>
          <p>
            <EditableText
              blockKey="serp_guide.p2"
              defaultContent="Enter your title into the Google SERP Pixel Width Simulator to check its approximate pixel width and see a search-result preview. You can use the preview to spot titles that look too long, put important information too far to the right, or simply don't look good at a glance."
              label="Intro Paragraph 2"
              multiline
            />
          </p>
          <p className="font-semibold text-slate-900">
            <EditableText
              blockKey="serp_guide.p3"
              defaultContent="It is a quick way to check your title before you publish a page."
              label="Intro Paragraph 3"
            />
          </p>
        </div>
      </section>

      {/* 2. WHY CHECK PIXEL WIDTH */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <Info className="w-6 h-6 text-emerald-600 shrink-0" />
          <EditableText
            blockKey="serp_guide.why_heading"
            defaultContent="Why check the pixel width of a title?"
            label="Why Check Heading"
          />
        </h3>

        <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            <EditableText
              blockKey="serp_guide.why_p1"
              defaultContent="You may have heard that an SEO title should be around 50–60 characters. That can be a useful starting point, but characters do not all take up the same amount of space."
              label="Why Check P1"
              multiline
            />
          </p>
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-bold flex items-center justify-center shrink-0">
              W vs i
            </div>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Proportional Font Math:</strong> For example, a title made mostly of narrow letters such as <code className="bg-white px-1.5 py-0.5 rounded border text-emerald-700 font-mono">i</code> can take up much less horizontal space than one containing many wide letters such as <code className="bg-white px-1.5 py-0.5 rounded border text-emerald-700 font-mono">W</code>.
            </div>
          </div>

          <p>
            <EditableText
              blockKey="serp_guide.why_p2"
              defaultContent="That's why character count alone cannot tell you exactly how wide a title will appear. Pixel width gives you another way to look at the title: how much horizontal space the text takes up."
              label="Why Check P2"
              multiline
            />
          </p>

          <p className="font-semibold text-slate-900 border-l-4 border-emerald-600 pl-4 py-1">
            <EditableText
              blockKey="serp_guide.why_p3"
              defaultContent="The goal isn't to hit a magic number. The goal is to make sure the important part of your title is clear and useful to someone looking at the search result."
              label="Why Check P3"
            />
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE THE SIMULATOR (5 STEPS) */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <EditableText
            blockKey="serp_guide.how_heading"
            defaultContent="How to use the SERP Pixel Width Simulator"
            label="How to Use Heading"
          />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center font-mono">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-900">Enter your SEO title</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paste or type the title you plan to use for your page into the title tag input field.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center font-mono">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-900">Check the pixel width</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The tool estimates how wide your title is in pixels. This gives you more information than character count alone.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center font-mono">
              3
            </div>
            <h4 className="font-bold text-sm text-slate-900">Look at the search preview</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Don't just look at the number. Check if the main topic is obvious, if important info appears early, and if it feels unnecessarily long.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center font-mono">
              4
            </div>
            <h4 className="font-bold text-sm text-slate-900">Check different screen sizes</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toggle between desktop and mobile previews. A title that looks comfortable in one layout may have less visible space in another.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2 md:col-span-2 lg:col-span-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center font-mono">
              5
            </div>
            <h4 className="font-bold text-sm text-slate-900">Edit only when there is a reason</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your title looks good and clearly describes the page, you don't need to shorten it just because it crosses an arbitrary character or pixel number. Make changes when they improve clarity.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHAT IS SERP PIXEL WIDTH & COMPARISON TABLE */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <FileText className="w-6 h-6 text-emerald-600 shrink-0" />
          <EditableText
            blockKey="serp_guide.what_heading"
            defaultContent="What is SERP pixel width?"
            label="What is SERP Pixel Width Heading"
          />
        </h3>

        <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            SERP pixel width refers to the horizontal space that text takes up when displayed in a search result. A pixel is a unit used to measure the dimensions of something on a screen. In a SERP simulator, pixel width is used to estimate how much horizontal space your title may occupy.
          </p>
          <p>
            This is different from counting characters. For example, <strong>&quot;SEO Tool&quot;</strong> has 8 characters including the space. Another title can have the same number of characters but occupy more or less horizontal space depending on the actual letters, numbers, spaces, and symbols used.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-6">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-4 font-bold">Measurement</th>
                <th className="p-4 font-bold">What it tells you</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="hover:bg-slate-50/70">
                <td className="p-4 font-bold text-slate-900">Character count</td>
                <td className="p-4 text-slate-600">How many characters are in the title</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-4 font-bold text-slate-900">Pixel width</td>
                <td className="p-4 text-slate-600">Approximately how much horizontal space the title uses</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="p-4 font-bold text-slate-900">SERP preview</td>
                <td className="p-4 text-slate-600">Gives you a visual idea of how the title may appear</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 italic">
          Each measurement answers a different question. If you&apos;re editing a title, the preview is often more useful than obsessing over one specific number.
        </p>
      </section>

      {/* 5. SEARCH ENGINE BEHAVIOR & GUIDELINES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h4 className="font-bold text-base sm:text-lg text-slate-900">
            Is there a maximum pixel width for Google titles?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            There isn&apos;t one permanent, official pixel-width number that guarantees a title will always fit in Google&apos;s search results. Recommendations around 580–600 pixels are practical estimates rather than an official Google rule. Search-result layouts can change based on the device and user context.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h4 className="font-bold text-base sm:text-lg text-slate-900">
            Why does Google sometimes change my title?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            You may write one title in your HTML and see something slightly different in Google. Google generates title links using information from the page (such as H1 tags, anchor text, and structured data) and other sources when it considers them more relevant to the search query.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h4 className="font-bold text-base sm:text-lg text-slate-900">
            What about the meta description?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            There is no fixed limit guaranteeing your description always appears as written. Google may use your meta description or generate a search snippet from on-page text. Use the preview to review clarity, but treat it as a guide rather than an exact prediction.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h4 className="font-bold text-base sm:text-lg text-slate-900">
            Why should you check mobile too?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            People search on different devices with varying screen widths. A title that looks fine on desktop may wrap to more lines or feel crowded on mobile. Check both to ensure key info remains visible without unnecessary filler words.
          </p>
        </div>
      </div>

      {/* 6. HOW TO WRITE A USEFUL SEO TITLE */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
          <span>How to write a useful SEO title</span>
        </h3>
        <p className="text-sm text-slate-600">
          Before worrying about pixels, make sure the title actually helps the person searching.
        </p>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h5 className="font-bold text-slate-900">1. Tell people what the page is about</h5>
            <p className="text-slate-600">
              Someone should be able to understand the page from the title without guessing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-xs">
                <span className="font-bold block">Instead of:</span> &quot;Welcome to Our Website&quot;
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs">
                <span className="font-bold block">Try:</span> &quot;Free Technical SEO Audit Tool&quot;
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h5 className="font-bold text-slate-900">2. Put the important information early</h5>
            <p className="text-slate-600">
              If the most useful part of your title is at the end, it may be truncated in compact search layouts. Put the main topic, product, service, or primary benefit where it makes sense naturally.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h5 className="font-bold text-slate-900">3. Don&apos;t add words just to reach a target length</h5>
            <p className="text-slate-600">
              A longer title isn&apos;t automatically better. If removing a few words makes the title punchier and clearer, remove them.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h5 className="font-bold text-slate-900">4. Keep it natural</h5>
            <p className="text-slate-600">
              Write for the person who will see the search result. Avoid repeating the same keyword several times or turning the title into a comma-separated list of search terms.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h5 className="font-bold text-slate-900">5. Make sure it matches the page</h5>
            <p className="text-slate-600">
              Your title should accurately describe what someone will find after clicking. A title that promises something the page doesn&apos;t deliver creates a poor user experience and high bounce rates.
            </p>
          </div>
        </div>
      </section>

      {/* 7. COMMON MISTAKES & WHAT THE TOOL TELLS YOU */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h4 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Common SEO title mistakes</span>
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span><strong>Following the &quot;60-character rule&quot; too strictly</strong> — character count is only one estimate.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span><strong>Ignoring actual glyph widths</strong> — narrow letters vs. wide uppercase letters.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span><strong>Putting important keywords at the end</strong> — risk of mobile truncation.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span><strong>Writing for bots instead of humans</strong> — keyword stuffing hurts click-through rate.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span><strong>Treating pixel width as a ranking score</strong> — it measures visual layout, not rank algorithms.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h4 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>What does this tool tell me?</span>
          </h4>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-900 block mb-1">The simulator CAN help you:</span>
              <ul className="space-y-1">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Check estimated pixel width of an SEO title</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Compare different title versions side-by-side</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Spot text pushed too far right in preview</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Review desktop and mobile layouts</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-900 block mb-1">It CANNOT guarantee:</span>
              <p className="text-[11px] text-slate-500">
                Google rankings, the exact title link Google displays, or specific search snippet layouts for every query.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. SIMPLE 5-STEP WORKFLOW */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          A simple workflow for better SEO titles
        </h3>
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs sm:text-sm font-semibold font-mono">
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">Write</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">Check</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">Preview</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">Improve</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white">Publish</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          First, write a title that accurately describes the page. Then check its pixel width and preview. If something feels unnecessarily long or important keywords are hard to spot, make targeted improvements before publishing.
        </p>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <HelpCircle className="w-6 h-6 text-emerald-600" />
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500">
              Direct answers to common questions about SERP title pixel widths and Google snippet formatting.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {SERP_SIMULATOR_FAQS.map((faq) => {
            const isOpen = openFaq[faq.id];
            return (
              <div key={faq.id} className="rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-xs sm:text-sm text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL TAKEAWAY */}
      <section className="bg-emerald-50/80 border border-emerald-200/80 rounded-3xl p-6 sm:p-10 space-y-3">
        <h4 className="font-bold text-base sm:text-lg text-emerald-950">Final Takeaway</h4>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          A good SEO title isn&apos;t about finding one perfect number. It should tell people what the page is about, make sense when they see it in search, and avoid unnecessary words.
        </p>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          The Google SERP Pixel Width Simulator gives you a practical way to check the visual side of your title before you publish it. Use the pixel measurement as a guide, look at the preview, and then make the change that improves the title for the person who is going to read it.
        </p>
      </section>
    </div>
  );
};
