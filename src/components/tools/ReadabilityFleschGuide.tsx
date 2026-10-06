'use client';

import React from 'react';
import {
  BookOpen,
  Award,
  GraduationCap,
  Scale,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Lightbulb,
  Check,
  Info,
} from 'lucide-react';

export const ReadabilityFleschGuide: React.FC = () => {
  return (
    <article className="w-full space-y-10 text-slate-800 antialiased pt-6">
      {/* WHAT DOES THE READABILITY SCORE ACTUALLY TELL YOU */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-emerald-600" /> What does the readability score actually tell you?
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            The tool looks mainly at two things:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 font-medium">
            <li>How long your sentences are</li>
            <li>How complex your words are, based largely on syllable count</li>
          </ul>
          <p>
            That gives you a rough idea of how easy the text may be to read.
          </p>
          <p>
            For example, compare these two sentences:
          </p>

          <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50/50 rounded-r-2xl text-slate-900 font-medium my-2">
            The tool checks your page.
          </blockquote>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">and:</p>

          <blockquote className="border-l-4 border-slate-400 pl-4 py-2 bg-slate-50 rounded-r-2xl text-slate-800 font-medium my-2">
            The tool performs an automated evaluation of the linguistic characteristics present throughout your page content.
          </blockquote>

          <p>
            The second sentence isn't necessarily wrong. It is simply harder to process.
          </p>
          <p className="font-semibold text-slate-900">
            That is the kind of difference readability formulas are designed to pick up.
          </p>
        </div>
      </section>

      {/* FLESCH READING EASE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Award className="w-5 h-5 text-emerald-600" /> Flesch Reading Ease
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            <strong className="text-slate-900 font-bold">Flesch Reading Ease</strong> gives your text a score from roughly 0 to 100.
          </p>
          <p>
            In general:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 font-medium">
            <li><strong className="text-emerald-700">Higher score</strong> = easier to read</li>
            <li><strong className="text-slate-800">Lower score</strong> = more difficult to read</li>
          </ul>
          <p>
            A very simple piece of writing may score highly. Academic, legal, scientific, or highly technical writing can score much lower.
          </p>
          <p>
            The commonly used formula is:
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white font-mono text-sm sm:text-base font-bold shadow-xs">
            206.835 − 1.015 × (words ÷ sentences) − 84.6 × (syllables ÷ words)
          </div>

          <p>
            You don't need to calculate this yourself. The analyzer does it for you.
          </p>
          <p>
            What matters more is understanding what the result is telling you.
          </p>
          <p>
            If your score is unexpectedly low, look at your sentences first. Are they running on? Are several technical terms packed into the same sentence? Could you explain the same idea with fewer words?
          </p>
        </div>
      </section>

      {/* FLESCH-KINCAID GRADE LEVEL */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-blue-600" /> Flesch-Kincaid Grade Level
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            The <strong className="text-slate-900 font-bold">Flesch-Kincaid Grade Level</strong> expresses readability as a U.S. school grade level.
          </p>
          <p>
            For example, a result of <strong className="text-slate-900 font-bold">Grade 8</strong> roughly means that the text has the linguistic characteristics associated with around an eighth-grade reading level under the formula.
          </p>
          <p>
            The formula is:
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white font-mono text-sm sm:text-base font-bold shadow-xs">
            0.39 × (words ÷ sentences) + 11.8 × (syllables ÷ words) − 15.59
          </div>

          <p>
            Again, the number is an estimate. It does not mean that only people in that school grade can understand your content.
          </p>
          <p>
            A technical article can receive a high grade-level score simply because it uses necessary technical vocabulary.
          </p>
        </div>
      </section>

      {/* DON'T AUTOMATICALLY CHASE A LOWER GRADE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Don't automatically chase a lower grade
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            This is one of the easiest mistakes to make with readability tools.
          </p>
          <p>
            Suppose you're writing about JavaScript, HTTP headers, structured data, or international SEO. Some of the terminology is unavoidable.
          </p>
          <p>
            Replacing every technical term with a simpler word may actually make the explanation worse.
          </p>
          <p className="text-slate-600">
            The goal isn't:
          </p>
          <p className="font-bold text-slate-900 bg-slate-100 p-3 rounded-xl inline-block font-mono text-sm">
            "Get the lowest possible grade level."
          </p>
          <p className="text-slate-600">
            The better goal is:
          </p>
          <p className="font-bold text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 block text-sm sm:text-base">
            "Make the explanation as clear as it can be for the people who need it."
          </p>
          <p>
            A technical audience can handle technical words. They shouldn't have to fight through unnecessarily complicated sentences, though.
          </p>
          <p className="font-semibold text-slate-900">
            That's where the score becomes useful.
          </p>
        </div>
      </section>

      {/* WHAT THIS ANALYZER MEASURES */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-purple-600" /> What this analyzer measures
          </h2>
          <p className="text-sm text-slate-500">
            Depending on the text you enter, the tool calculates measurements such as:
          </p>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Measurement</th>
                  <th className="p-4">What it tells you</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Flesch Reading Ease</td>
                  <td className="p-4 text-slate-600">General reading difficulty</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Flesch-Kincaid Grade</td>
                  <td className="p-4 text-slate-600">Approximate grade-level score</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Words</td>
                  <td className="p-4 text-slate-600">Total words analyzed</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Sentences</td>
                  <td className="p-4 text-slate-600">Number of detected sentences</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Syllables</td>
                  <td className="p-4 text-slate-600">Estimated syllable count</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Syllables per word</td>
                  <td className="p-4 text-slate-600">Average word complexity</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Words per sentence</td>
                  <td className="p-4 text-slate-600">Average sentence length</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            These numbers work together.
          </p>
          <p>
            For example, a long sentence combined with several multi-syllable words will generally push the readability score toward greater difficulty.
          </p>
        </div>
      </section>

      {/* SENTENCE LENGTH CAN MAKE A BIG DIFFERENCE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Sentence length can make a big difference
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            You don't always need to replace words to make something easier to read.
          </p>
          <p>
            Sometimes you just need to split a sentence.
          </p>
          <p className="font-semibold text-slate-900">
            Instead of:
          </p>
          <blockquote className="border-l-4 border-red-400 pl-4 py-2 bg-red-50/50 rounded-r-2xl text-slate-800 text-sm sm:text-base">
            Before publishing the page, review the title, description, headings, internal links, structured data, canonical URL, image information, and other technical elements to make sure they all describe the same page correctly.
          </blockquote>

          <p className="font-semibold text-slate-900 pt-2">
            You could write:
          </p>
          <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50/50 rounded-r-2xl text-slate-900 font-medium text-sm sm:text-base">
            Before publishing the page, review its main SEO elements. Check the title, description, headings, internal links, structured data, canonical URL, and images. Make sure they all describe the same page.
          </blockquote>

          <p>
            The information hasn't disappeared.
          </p>
          <p>
            It's simply easier to work through.
          </p>
          <p>
            That's the sort of change worth looking for when your score is higher than you'd like.
          </p>
        </div>
      </section>

      {/* WHAT ABOUT DIFFICULT WORDS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          What about difficult words?
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            The formulas use syllables as one of their main measurements.
          </p>
          <p>
            That means a word with more syllables can contribute to a higher difficulty score.
          </p>
          <p>
            But syllable count isn't the same thing as actual comprehension.
          </p>
          <p>
            Someone working in SEO may find <strong className="text-slate-900 font-bold">canonicalization</strong> perfectly familiar, even though the word is longer than something like <strong className="text-slate-900 font-bold">page</strong>.
          </p>
          <p>
            So don't remove a useful technical term just because the analyzer doesn't like its syllable count.
          </p>
          <p>
            Explain it if your audience may not know it, then move on.
          </p>
        </div>
      </section>

      {/* WHY TWO READABILITY TOOLS CAN GIVE DIFFERENT RESULTS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Why two readability tools can give different results
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            You may paste the same paragraph into two different readability checkers and get slightly different results.
          </p>
          <p>
            That's normal.
          </p>
          <p>
            Readability tools have to decide things such as:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>where one sentence ends</li>
            <li>how words are separated</li>
            <li>how many syllables a word contains</li>
            <li>how unusual words should be handled</li>
            <li>how punctuation affects sentence detection</li>
          </ul>
          <p className="pt-1">
            Syllable counting can be particularly difficult for software because English pronunciation isn't perfectly predictable from spelling.
          </p>
          <p>
            So treat small differences between tools as normal rather than assuming one of them must be broken.
          </p>
        </div>
      </section>

      {/* A SHORT TEXT CAN PRODUCE A MISLEADING SCORE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          A short text can produce a misleading score
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Readability formulas work better when they have enough text to analyze.
          </p>
          <p>
            If you paste only one or two short sentences, one unusual word or an unusually long sentence can have a large effect on the result.
          </p>
          <p>
            For that reason, don't make a major editorial decision based on a tiny sample.
          </p>
          <p>
            If you're checking an article, analyze a meaningful section of the article or the full draft.
          </p>
        </div>
      </section>

      {/* A HIGH SCORE ISN'T AUTOMATICALLY BAD */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          A high score isn't automatically bad
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            A high grade level doesn't mean your writing is poor.
          </p>
          <p>
            A research paper, developer documentation page, medical explanation, or legal document may genuinely need more complex language.
          </p>
          <p>
            The important question is whether the complexity is <strong className="text-slate-900 font-bold">necessary</strong>.
          </p>
          <p>
            If your audience needs the terminology, keep it.
          </p>
          <p>
            If you're using complicated language simply because it sounds impressive, simplify it.
          </p>
          <p className="font-semibold text-slate-900">
            That's a much better editorial test than chasing a particular number.
          </p>
        </div>
      </section>

      {/* A LOW SCORE ISN'T AUTOMATICALLY GOOD EITHER */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          A low score isn't automatically good either
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Very easy-to-read writing can still be vague, shallow, or inaccurate.
          </p>
          <p>
            For example:
          </p>
          <blockquote className="border-l-4 border-slate-300 pl-4 py-2 bg-slate-50 rounded-r-2xl text-slate-700 my-2">
            SEO helps websites get visitors from search engines.
          </blockquote>
          <p>
            That's easy to understand, but it doesn't tell the reader very much.
          </p>
          <p>
            A useful article may need more detail:
          </p>
          <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50/50 rounded-r-2xl text-slate-900 font-medium my-2">
            SEO helps search engines understand your pages and can improve how those pages are discovered and presented in search results.
          </blockquote>
          <p>
            The second sentence is a little more complex, but it communicates more.
          </p>
          <p className="font-bold text-slate-900 pt-1">
            Readability is about clarity, not making every sentence as simple as possible.
          </p>
        </div>
      </section>

      {/* HOW TO USE THE ANALYZER WHILE EDITING */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            How to use the analyzer while editing
          </h2>
          <p className="text-sm text-slate-500">
            A simple workflow works well:
          </p>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h3 className="font-bold text-slate-900">
              1. Write normally.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Don't constantly watch the score while drafting.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h3 className="font-bold text-slate-900">
              2. Run the text through the analyzer.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Look at the overall score and the supporting numbers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h3 className="font-bold text-slate-900">
              3. Find the difficult parts.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Look for long sentences, dense paragraphs, unnecessary jargon, and repeated ideas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h3 className="font-bold text-slate-900">
              4. Edit the actual writing.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Split long sentences. Remove words that don't add anything. Explain unfamiliar terminology where needed.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h3 className="font-bold text-slate-900">
              5. Run the text again.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              See whether the changes improved the score without making the writing less useful.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h3 className="font-bold text-slate-900">
              6. Read the final version yourself.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              This is the part a formula can't replace.
            </p>
          </div>
        </div>
      </section>

      {/* A PRACTICAL EXAMPLE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          A practical example
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Imagine your analyzer gives you:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 font-medium">
            <li>Flesch Reading Ease: <strong className="text-slate-900">17</strong></li>
            <li>Flesch-Kincaid Grade: <strong className="text-slate-900">15.1</strong></li>
            <li>51 words</li>
            <li>3 sentences</li>
            <li>104 estimated syllables</li>
          </ul>
          <p>
            That tells you the sample is relatively dense.
          </p>
          <p>
            But the numbers don't tell you exactly <strong className="text-slate-900 font-bold">why</strong>.
          </p>
          <p>
            Read the text.
          </p>
          <p>
            Maybe the problem is three very long sentences. Maybe there are several technical terms close together. Maybe the wording is unnecessarily formal.
          </p>
          <p>
            Once you identify the cause, you can make a useful edit instead of blindly replacing words until the number changes.
          </p>
        </div>
      </section>

      {/* READABILITY AND SEO */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Readability and SEO
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Readability can help you improve the experience of people reading your content, but don't turn a readability score into an SEO target.
          </p>
          <p>
            A Flesch score isn't a magic number that tells you whether a page will rank.
          </p>
          <p>
            For SEO content, the more useful approach is to make the page:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>easy to understand</li>
            <li>accurate</li>
            <li>useful for the searcher's actual question</li>
            <li>specific rather than vague</li>
            <li>well organized</li>
            <li>appropriate for its audience</li>
          </ul>
          <p className="pt-1">
            Sometimes that produces a very easy-to-read article.
          </p>
          <p>
            Sometimes it produces technical documentation with a much higher grade-level score.
          </p>
          <p className="font-semibold text-slate-900">
            Both can be good writing.
          </p>
        </div>
      </section>

      {/* WHEN THIS TOOL IS ESPECIALLY USEFUL */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          When this tool is especially useful
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            The analyzer can be helpful when reviewing:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>blog posts</li>
            <li>landing pages</li>
            <li>product descriptions</li>
            <li>documentation</li>
            <li>educational content</li>
            <li>email copy</li>
            <li>help articles</li>
            <li>website pages</li>
            <li>technical explanations</li>
          </ul>
          <p className="pt-1">
            It is particularly useful when a draft <strong className="text-slate-900 font-bold">feels harder to read than it should</strong>, but you aren't sure what is causing the problem.
          </p>
          <p>
            The numbers give you somewhere to start looking.
          </p>
        </div>
      </section>

      {/* WHAT THE SCORE CANNOT TELL YOU */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          What the score cannot tell you
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            A readability formula cannot understand everything about good writing.
          </p>
          <p>
            It doesn't know whether your explanation is correct.
          </p>
          <p>
            It doesn't know whether you answered the reader's question.
          </p>
          <p>
            It doesn't know whether your example is useful.
          </p>
          <p>
            It doesn't understand your audience the way a human editor does.
          </p>
          <p>
            It also doesn't measure things such as originality, factual accuracy, usefulness, tone, argument quality, or whether the content actually solves the reader's problem.
          </p>
          <p className="font-semibold text-slate-900">
            That's why readability should be treated as one editing signal, not a complete writing-quality test.
          </p>
        </div>
      </section>

      {/* THE BEST WAY TO USE THE RESULT */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          The best way to use the result
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p className="text-slate-600">
            Don't ask:
          </p>
          <p className="font-bold text-slate-900 bg-slate-100 p-3 rounded-xl inline-block font-mono text-sm">
            "How do I get my score to Grade 7?"
          </p>
          <p className="text-slate-600">
            Ask:
          </p>
          <p className="font-bold text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 block text-sm sm:text-base">
            "Which part of this text is making it harder to read than it needs to be?"
          </p>
          <p>
            That small change in approach makes the tool much more useful.
          </p>
          <p>
            Use the score to spot possible problems. Then use your own judgment to decide what should actually change.
          </p>
          <p>
            A good readability score is helpful.
          </p>
          <p className="font-bold text-slate-900">
            A clear, useful piece of writing is the real goal.
          </p>
        </div>
      </section>

      {/* READABILITY FORMULAS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Readability formulas
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            For reference, the analyzer uses the standard Flesch formulas.
          </p>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Flesch Reading Ease
            </h3>
            <pre className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
              <code>206.835 − 1.015 × (words / sentences) − 84.6 × (syllables / words)</code>
            </pre>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Flesch-Kincaid Grade Level
            </h3>
            <pre className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
              <code>0.39 × (words / sentences) + 11.8 × (syllables / words) − 15.59</code>
            </pre>
          </div>

          <p className="pt-2">
            Both formulas rely heavily on sentence length and syllable density. That is why those two measurements are so important when interpreting the result.
          </p>
        </div>
      </section>

      {/* ONE FINAL TIP */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-md space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <Info className="w-5 h-5 text-emerald-400" /> One final tip
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p>
            If the score looks bad, don't immediately rewrite the whole page.
          </p>
          <p className="text-white font-medium">
            Pick one difficult paragraph.
          </p>
          <p className="text-white font-medium">
            Read it out loud.
          </p>
          <p>
            You'll often hear the problem before you see it: a sentence that keeps going, a phrase that says the same thing twice, or a technical explanation that tries to do too much at once.
          </p>
          <p>
            Fix that paragraph, run the analyzer again, and keep going.
          </p>
          <p className="text-emerald-400 font-bold text-base sm:text-lg">
            The tool gives you the measurement. You make the editorial decision.
          </p>
        </div>
      </section>
    </article>
  );
};
