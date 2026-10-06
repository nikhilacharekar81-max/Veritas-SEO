'use client';

import React from 'react';
import {
  Layout,
  Gauge,
  Clock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight,
  Code2,
  Eye,
  Check,
} from 'lucide-react';

export const CoreWebVitalsGuide: React.FC = () => {
  return (
    <article className="w-full space-y-10 text-slate-800 antialiased pt-6">
      {/* CLS IN SIMPLE TERMS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layout className="w-5 h-5 text-emerald-600" /> CLS in simple terms
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            CLS is about unexpected movement on the page.
          </p>
          <p>
            Say you're reading an article and an image loads above the paragraph. The paragraph moves down because the page hadn't reserved enough space for the image.
          </p>
          <p>
            Or an ad loads into an empty area and pushes the content underneath it.
          </p>
          <p>
            Those movements can contribute to CLS.
          </p>
          <p>
            A lower CLS is better. Google's current thresholds are:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 my-4 max-w-lg">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 text-right font-mono">CLS</th>
                  <th className="p-3.5">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 text-right font-mono font-bold text-emerald-700">0.10 or less</td>
                  <td className="p-3.5 text-emerald-700 font-semibold">Good</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 text-right font-mono font-bold text-amber-700">More than 0.10 up to 0.25</td>
                  <td className="p-3.5 text-amber-700 font-semibold">Needs Improvement</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 text-right font-mono font-bold text-red-700">More than 0.25</td>
                  <td className="p-3.5 text-red-700 font-semibold">Poor</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            A score by itself doesn't tell you what caused the problem. It tells you how much layout instability was measured.
          </p>
          <p className="font-semibold text-slate-900">
            That's an important difference.
          </p>
        </div>
      </section>

      {/* HOW THE CLS CALCULATION WORKS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            How the CLS calculation works
          </h2>
        </div>

        <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            For an individual layout shift, the basic calculation is:
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white font-mono text-sm sm:text-base font-bold shadow-xs">
            Layout Shift Score = Impact Fraction × Distance Fraction
          </div>

          <p>
            The two numbers describe different parts of the movement.
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                Impact Fraction
              </h3>
              <p className="text-slate-600">
                Impact Fraction represents the portion of the viewport affected by the shift.
              </p>
              <p className="text-slate-600">
                If a large part of the visible page is affected, the impact fraction is larger.
              </p>
              <p className="text-slate-600">
                If only a small area is affected, it is smaller.
              </p>
              <p className="text-slate-600">
                Use the <strong className="text-slate-900 font-semibold">Impact Fraction</strong> control in the calculator to see the effect directly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                Distance Fraction
              </h3>
              <p className="text-slate-600">
                Distance Fraction describes how far the affected content moved compared with the viewport.
              </p>
              <p className="text-slate-600">
                A small movement produces a smaller value.
              </p>
              <p className="text-slate-600">
                A larger movement produces a larger value.
              </p>
              <p className="text-slate-600">
                The calculator's <strong className="text-slate-900 font-semibold">Distance Fraction</strong> control lets you change this value and see the resulting score.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                A quick example
              </h3>
              <p className="text-slate-700">
                Suppose the values are:
              </p>
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                <li>Impact Fraction: <strong className="text-slate-900">0.25</strong></li>
                <li>Distance Fraction: <strong className="text-slate-900">0.12</strong></li>
              </ul>
              <p className="text-slate-700">
                The calculation is:
              </p>
              <p className="font-mono font-bold text-slate-900 bg-white/80 p-2.5 rounded-xl border border-emerald-200 inline-block">
                0.25 × 0.12 = 0.03
              </p>
              <p className="text-slate-700">
                So that individual layout shift contributes <strong className="text-slate-900">0.03</strong>.
              </p>
              <p className="text-slate-700">
                This is why the size of the affected area and the amount of movement both matter.
              </p>
              <p className="text-slate-700">
                A large area moving a little can produce a meaningful shift. So can a smaller area moving much farther.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DON'T TREAT EVERY MOVEMENT AS A CLS PROBLEM */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Don't treat every movement as a CLS problem
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            A page changing isn't automatically a CLS problem.
          </p>
          <p>
            For example, a user clicks a button and a menu opens. The user caused that change, so it isn't the same situation as content unexpectedly jumping because an image or advertisement appeared.
          </p>
          <p>
            This matters when you're debugging.
          </p>
          <p>
            If a page has a poor CLS value, don't look for every single thing that moves. Look for <strong className="text-slate-900 font-bold">unexpected layout shifts that affect the user's view</strong>.
          </p>
        </div>
      </section>

      {/* COMMON THINGS THAT CAUSE LAYOUT SHIFTS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Common things that cause layout shifts
          </h2>
          <p className="text-sm text-slate-500">
            There isn't one universal cause. In practice, a few problems show up repeatedly.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          {/* Images without reserved space */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">
              Images without reserved space
            </h3>
            <p>
              An image can load after the text around it has already appeared.
            </p>
            <p>
              If the browser doesn't know how much space to reserve, the image can push the existing content down when it arrives.
            </p>
            <p>
              For example:
            </p>
            <pre className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
              <code>{`<img
  src="/product.webp"
  width="800"
  height="600"
  alt="Product image"
>`}</code>
            </pre>
            <p>
              The dimensions should reflect the image's intended aspect ratio and display.
            </p>
            <p>
              The point isn't simply to add arbitrary numbers. The browser needs enough information to reserve the correct space.
            </p>
          </div>

          {/* Ads that change the layout */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">
              Ads that change the layout
            </h3>
            <p>
              Ads are a common source of unexpected movement.
            </p>
            <p>
              An empty ad area may initially have little height. When the ad arrives, it can expand and push the content below it.
            </p>
            <p>
              Where possible, reserve the space for the ad before it loads.
            </p>
          </div>

          {/* Videos, iframes and other embeds */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">
              Videos, iframes and other embeds
            </h3>
            <p>
              Third-party embeds can change size after they load.
            </p>
            <p>
              Videos, maps, social embeds and iframes are easier on the layout when their dimensions are known in advance.
            </p>
          </div>

          {/* Content inserted after the page loads */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">
              Content inserted after the page loads
            </h3>
            <p>
              This can include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>recommendation boxes</li>
              <li>promotional banners</li>
              <li>API content</li>
              <li>related products</li>
              <li>notifications</li>
              <li>personalized content</li>
              <li>lazy-loaded sections</li>
            </ul>
            <p className="pt-1">
              If new content appears above something that is already visible, the existing content can move.
            </p>
          </div>

          {/* Fonts */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">
              Fonts
            </h3>
            <p>
              A font change can alter the size of text.
            </p>
            <p>
              That can cause lines to wrap differently and move other content around them.
            </p>
            <p>
              If you're chasing a stubborn CLS issue, font loading is worth checking rather than assuming the problem is an image or ad.
            </p>
          </div>

          {/* Animations */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">
              Animations
            </h3>
            <p>
              Be careful with animations that change layout.
            </p>
            <p>
              Changing properties such as <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800">top</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800">left</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800">width</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800">height</code>, or margins can cause layout changes during an animation.
            </p>
            <p>
              For effects that only need to move something visually, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800">transform</code> is often a better choice.
            </p>
            <p>
              That doesn't mean every use of <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800">top</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800">height</code> is wrong. The right approach depends on what the component is doing.
            </p>
          </div>
        </div>
      </section>

      {/* A CLS SCORE DOESN'T TELL YOU WHAT CAUSED IT */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          A CLS score doesn't tell you what caused it
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            This is one of the most important things to keep in mind when using a calculator.
          </p>
          <p>
            Suppose you get:
          </p>
          <p className="font-mono font-bold text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200 inline-block text-base">
            CLS = 0.28
          </p>
          <p>
            You know that the value is in the Poor range.
          </p>
          <p>
            You don't know from that number alone whether the problem came from:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>an image</li>
            <li>an advertisement</li>
            <li>a web font</li>
            <li>an iframe</li>
            <li>dynamically inserted content</li>
            <li>a cookie banner</li>
            <li>an animation</li>
            <li>another component</li>
          </ul>
          <p className="pt-1">
            The number describes the result. It doesn't identify the culprit.
          </p>
          <p>
            For a real website, use browser performance tools or field data to find the element responsible for the shift.
          </p>
        </div>
      </section>

      {/* CLS, LCP AND INP ARE MEASURING DIFFERENT THINGS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            CLS, LCP and INP are measuring different things
          </h2>
          <p className="text-sm text-slate-500">
            The calculator includes all three Core Web Vitals, but they answer different questions.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">
              CLS — visual stability
            </h3>
            <p className="font-semibold text-slate-900">
              Does the page unexpectedly move?
            </p>
            <p>
              That's what CLS is concerned with.
            </p>
            <p>
              A page can load quickly but still be frustrating if the content keeps jumping around.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">
              LCP — loading
            </h3>
            <p className="font-semibold text-slate-900">
              How quickly does the main content become visible?
            </p>
            <p>
              The current Good threshold for LCP is <strong className="text-slate-900">2.5 seconds or less</strong>.
            </p>
            <p>
              Enter your LCP value in the calculator to see where it falls against that threshold.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">
              INP — responsiveness
            </h3>
            <p className="font-semibold text-slate-900">
              How quickly does the page respond when someone interacts with it?
            </p>
            <p>
              The current Good threshold for INP is <strong className="text-slate-900">200 milliseconds or less</strong>.
            </p>
            <p>
              Enter your interaction latency to check the result.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p>
              These aren't three ways of measuring the same thing.
            </p>
            <p>
              A page can have a good LCP and a poor CLS. It can have a good CLS and a poor INP. Fixing one metric doesn't automatically fix the others.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CLS CAN BE DIFFERENT IN DIFFERENT TOOLS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Why CLS can be different in different tools
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            This is a common source of confusion.
          </p>
          <p>
            You may see one CLS value in a lab test and another value in field data.
          </p>
          <p>
            That doesn't automatically mean one of the tools is wrong.
          </p>
          <p>
            A lab test runs under a particular set of conditions. Real visitors don't behave in exactly the same way.
          </p>
          <p>
            A real visitor might:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>scroll before the page finishes loading</li>
            <li>trigger lazy-loaded content</li>
            <li>interact with the page</li>
            <li>encounter an advertisement</li>
            <li>receive personalized content</li>
            <li>use a slower device</li>
            <li>have a different viewport</li>
            <li>use a different network</li>
          </ul>
          <p className="pt-1">
            Field data reflects those real-world conditions.
          </p>
          <p>
            The calculator here is useful for understanding the calculation and checking values against the thresholds. It isn't a replacement for measuring the actual experience of visitors.
          </p>
        </div>
      </section>

      {/* CLS USES SESSION WINDOWS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          CLS uses session windows
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            There is another detail that is easy to miss.
          </p>
          <p>
            Modern CLS isn't simply the sum of every layout shift that happens during the entire lifetime of a page.
          </p>
          <p>
            Layout shifts are grouped into <strong className="text-slate-900 font-bold">session windows</strong>.
          </p>
          <p>
            The largest qualifying session window is used for the CLS value.
          </p>
          <p>
            So if a page has several small shifts, you shouldn't automatically add every shift you have ever seen and call that the page's CLS.
          </p>
          <p>
            This is one reason a simple hand calculation and a browser's reported CLS value aren't always the same thing.
          </p>
          <p>
            For detailed investigation, use a performance trace or field data alongside this calculator.
          </p>
        </div>
      </section>

      {/* WHAT SHOULD YOU DO WHEN CLS IS HIGH? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            What should you do when CLS is high?
          </h2>
          <p className="text-sm text-slate-500">
            Start with the biggest shifts you can identify.
          </p>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Check images
            </h3>
            <p className="text-slate-600">
              Do images have appropriate dimensions or reserved aspect-ratio space?
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Check ads
            </h3>
            <p className="text-slate-600">
              Does an ad appear in a container that had no reserved space?
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Check dynamic content
            </h3>
            <p className="text-slate-600">
              Is something being inserted above content that is already visible?
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Check fonts
            </h3>
            <p className="text-slate-600">
              Does the page reflow when the final font replaces the fallback font?
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Check embeds
            </h3>
            <p className="text-slate-600">
              Do iframes, videos or third-party components change size after loading?
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Check animations
            </h3>
            <p className="text-slate-600">
              Are you changing layout properties when you only need a visual movement?
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Check banners
            </h3>
            <p className="text-slate-600">
              Do cookie notices, promotional messages or alerts push the page content instead of occupying a predictable area?
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <p>
              Don't make ten changes at once if you can avoid it.
            </p>
            <p>
              Find the largest shift, identify what moved, fix that problem, and measure again.
            </p>
          </div>
        </div>
      </section>

      {/* A SIMPLE EXAMPLE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            A simple example
          </h2>
        </div>

        <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Imagine someone is reading an article.
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-slate-900 text-sm">
              Before a promotional banner loads:
            </p>
            <pre className="bg-slate-50 text-slate-800 p-4 rounded-2xl font-mono text-xs sm:text-sm border border-slate-200/80">
{`Heading

Paragraph

Paragraph`}
            </pre>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-slate-900 text-sm">
              The banner then loads above the first paragraph:
            </p>
            <pre className="bg-slate-50 text-slate-800 p-4 rounded-2xl font-mono text-xs sm:text-sm border border-slate-200/80">
{`Heading

Promotional banner

Paragraph

Paragraph`}
            </pre>
          </div>

          <p>
            The paragraphs have moved.
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-slate-900 text-sm">
              If the page reserved the banner's space from the start, the layout could instead have been:
            </p>
            <pre className="bg-slate-50 text-slate-800 p-4 rounded-2xl font-mono text-xs sm:text-sm border border-slate-200/80">
{`Heading

Reserved banner space

Paragraph

Paragraph`}
            </pre>
          </div>

          <p>
            When the banner loads, it fills the space instead of pushing the article down.
          </p>
          <p>
            That is the basic idea behind preventing this type of layout shift.
          </p>
        </div>
      </section>

      {/* DON'T CONFUSE CLS WITH OVERALL PAGE SPEED */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Don't confuse CLS with overall page speed
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            CLS is only concerned with visual stability.
          </p>
          <p>
            LCP is about loading the main content.
          </p>
          <p>
            INP is about how quickly the page responds to interactions.
          </p>
          <p>
            So a fast page can still have a poor CLS.
          </p>
          <p>
            For example, the main content may appear quickly, but an advertisement may load a moment later and push everything down.
          </p>
          <p>
            Likewise, a page can have stable content but take too long to show its main content.
          </p>
          <p className="font-semibold text-slate-900">
            There isn't one Core Web Vital that tells the whole performance story.
          </p>
        </div>
      </section>

      {/* WHAT THIS CALCULATOR CAN TELL YOU */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          What this calculator can tell you
        </h2>

        <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Use this calculator to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>calculate an individual layout-shift score from Impact Fraction and Distance Fraction</li>
            <li>experiment with different CLS values</li>
            <li>check whether a CLS value is Good, Needs Improvement, or Poor</li>
            <li>check an LCP value against the recommended threshold</li>
            <li>check an INP value against the recommended threshold</li>
            <li>understand how the three Core Web Vitals differ</li>
            <li>see how changing the CLS inputs changes the result</li>
          </ul>
        </div>
      </section>

      {/* WHAT IT CANNOT TELL YOU */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          What it cannot tell you
        </h2>

        <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            A calculator can't inspect your production page and tell you exactly which DOM element caused a real-world shift.
          </p>
          <p>
            It also doesn't replace:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>browser performance traces</li>
            <li>real-user monitoring</li>
            <li>CrUX data</li>
            <li>Lighthouse testing</li>
            <li>PageSpeed Insights</li>
            <li>Search Console's Core Web Vitals report</li>
          </ul>
          <p className="pt-1">
            Those tools answer different questions.
          </p>
          <p>
            Use this calculator when you want to understand the numbers. Use real performance data when you need to find the problem on an actual website.
          </p>
        </div>
      </section>

      {/* CORE WEB VITALS AND GOOGLE RANKINGS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Core Web Vitals and Google rankings
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            It's tempting to turn Core Web Vitals into a simple ranking formula:
          </p>

          <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 italic text-slate-800 font-medium my-2 bg-slate-50 rounded-r-xl">
            Good score = better ranking.
          </blockquote>

          <p>
            That's not how you should use these metrics.
          </p>
          <p>
            Core Web Vitals are part of Google's page-experience considerations, but passing the thresholds does not guarantee a particular ranking.
          </p>
          <p>
            A good score is still worth having. A stable, responsive and reasonably fast page is a better experience for visitors.
          </p>
          <p>
            Just don't treat <strong className="text-slate-900 font-bold">0.09 CLS</strong> as a magic SEO number.
          </p>
        </div>
      </section>

      {/* A PRACTICAL WAY TO INVESTIGATE CLS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          A practical way to investigate CLS
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            If you're working on a real site, keep the process simple.
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Start with the score.
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Find out whether the page is in the Good, Needs Improvement, or Poor range.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Then find the shift.
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Use a browser performance tool or field data to identify what actually moved.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Find the cause.
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Was it an image, ad, font, iframe, dynamic component or something else?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Reserve the space.
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Where appropriate, make the expected dimensions known before the content arrives.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Measure again.
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Don't assume a fix worked because the code looks right. Test the page again.
              </p>
            </div>
          </div>

          <p className="pt-2">
            That is usually more useful than applying a long list of unrelated performance optimizations.
          </p>
        </div>
      </section>

      {/* CLS CHECKLIST */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> CLS checklist
        </h2>

        <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            When investigating a high CLS value, check:
          </p>
          <ul className="space-y-2 text-slate-700">
            {[
              'Images have appropriate dimensions or aspect-ratio space',
              'Videos and iframes have reserved space',
              'Ad containers don\'t unexpectedly expand',
              'Dynamic content doesn\'t push existing content down',
              'Font changes don\'t cause significant reflow',
              'Animations aren\'t unnecessarily changing layout',
              'Cookie and promotional UI doesn\'t unexpectedly move page content',
              'The largest layout shifts have been identified',
              'Lab and field measurements aren\'t being treated as the same thing',
              'The page has been measured again after the fix',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THE MAIN THING TO REMEMBER */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-md space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <Info className="w-5 h-5 text-emerald-400" /> The main thing to remember
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p>
            CLS isn't just a number to get into the green.
          </p>
          <p className="text-white font-semibold text-base sm:text-lg">
            The useful question is:
          </p>
          <p className="text-emerald-400 font-bold text-base sm:text-lg font-mono">
            What moved, how much did it move, and why did it move?
          </p>
          <p>
            This calculator helps with the first part of that investigation by showing how <strong className="text-white">Impact Fraction</strong> and <strong className="text-white">Distance Fraction</strong> affect the CLS calculation.
          </p>
          <p className="text-slate-400">
            For a real website, combine that understanding with browser performance data and field measurements. That's how you get from a CLS number to the actual problem on the page.
          </p>
        </div>
      </section>
    </article>
  );
};
