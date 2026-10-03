'use client';

import React, { useState } from 'react';
import {
  Bot,
  Globe,
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Sparkles,
  Server,
  FileCode,
  Terminal,
  HelpCircle,
  Eye,
  Check,
  Search,
} from 'lucide-react';

export const BotHeaderInspectorGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: 'faq_1',
      q: 'Why does Googlebot see a different header than my browser?',
      a: "Your server, CDN, WAF, application, or caching layer may make decisions based on the request's User-Agent, IP, headers, cookies, or other characteristics. A browser response therefore does not prove that Googlebot receives the same response.",
    },
    {
      id: 'faq_2',
      q: 'What is an X-Robots-Tag?',
      a: 'X-Robots-Tag is an HTTP response header used to send robots directives from the server. It can be especially useful for resources that do not contain HTML, such as PDFs. It should be checked alongside HTML robots directives when investigating indexability.',
    },
    {
      id: 'faq_3',
      q: 'Can a page return 200 OK and still be blocked from indexing?',
      a: 'Yes. 200 OK only means the HTTP request succeeded. The response can still contain an X-Robots-Tag: noindex, and the HTML can contain a robots noindex directive.',
    },
    {
      id: 'faq_4',
      q: 'Why does Googlebot get a 403 when Chrome gets 200?',
      a: 'A WAF, CDN, firewall, bot-management system, server rule, or application layer may be treating the crawler differently. Compare the two responses and then inspect the security and infrastructure layer responsible for the different behavior.',
    },
    {
      id: 'faq_5',
      q: 'How do I block AI training bots without blocking AI search crawlers?',
      a: 'Don&apos;t use a blanket "block AI" rule. Identify the individual crawler and its documented purpose. For example, OpenAI documents OAI-SearchBot and GPTBot as separate controls, allowing site owners to make different decisions for search and training.',
    },
    {
      id: 'faq_6',
      q: 'Can caching cause a crawler to receive old content?',
      a: 'Yes. Caches can reuse stored responses according to their caching rules. Cache-Control controls caching behavior, while Vary tells caches when different request headers can produce different representations. If a crawler appears to receive stale or unexpected content, inspect the CDN/cache layer as well as the origin server.',
    },
  ];

  return (
    <article className="w-full h-auto overflow-visible space-y-10 text-slate-800 antialiased">
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

      {/* 1. HERO TITLE & INTRO */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Technical SEO Infrastructure Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Googlebot &amp; AI Crawler HTTP Header Inspector
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed max-w-4xl">
            A page can look perfectly normal in your browser and still return a completely different response to a crawler.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            That difference is often hidden in the HTTP response.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
            The <strong>Googlebot &amp; AI Crawler HTTP Header Inspector</strong> lets you inspect how a URL responds when requested with different crawler User-Agents. Instead of guessing what your server is doing, you can check the actual status code and response headers returned for crawlers such as <strong>Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, or Google-Extended</strong>.
          </p>
        </div>

        {/* Useful When Checklist */}
        <div className="space-y-2.5 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            This inspector is especially useful when:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
            {[
              'Googlebot gets a different response from your browser.',
              'A page unexpectedly becomes noindex.',
              'A WAF or CDN blocks a crawler.',
              'A crawler receives a 403, 503, or redirect.',
              'Different bots receive different Content-Type or caching headers.',
              'Server-side rendering works for users but fails for crawlers.',
              'You want to separate AI search access from AI training access.',
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Idea Callout */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-2 shadow-xs">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
            The Key Idea:
          </span>
          <p className="text-base sm:text-lg font-bold text-slate-100">
            &quot;Don&apos;t inspect only what the page looks like. Inspect what the server actually sends.&quot;
          </p>
        </div>

        {/* Table of Contents Jump Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-slate-900 shrink-0">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Jump to:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold text-emerald-700">
            <a href="#what-it-checks" className="hover:text-emerald-900 hover:underline transition-colors">
              What It Checks
            </a>
            <span className="text-slate-300">•</span>
            <a href="#x-robots-tag" className="hover:text-emerald-900 hover:underline transition-colors">
              X-Robots-Tag
            </a>
            <span className="text-slate-300">•</span>
            <a href="#browser-vs-crawler" className="hover:text-emerald-900 hover:underline transition-colors">
              Browser vs. Crawler
            </a>
            <span className="text-slate-300">•</span>
            <a href="#search-vs-ai" className="hover:text-emerald-900 hover:underline transition-colors">
              Search vs. AI Crawlers
            </a>
            <span className="text-slate-300">•</span>
            <a href="#user-agent-matrix" className="hover:text-emerald-900 hover:underline transition-colors">
              User-Agent Matrix
            </a>
            <span className="text-slate-300">•</span>
            <a href="#status-codes" className="hover:text-emerald-900 hover:underline transition-colors">
              Status Codes
            </a>
            <span className="text-slate-300">•</span>
            <a href="#common-problems" className="hover:text-emerald-900 hover:underline transition-colors">
              Common Server Problems
            </a>
            <span className="text-slate-300">•</span>
            <a href="#faq-section" className="hover:text-emerald-900 hover:underline transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHAT DOES AN HTTP HEADER INSPECTOR CHECK? */}
      <section id="what-it-checks" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            What Does an HTTP Header Inspector Check?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          When you open a page in a browser, you usually see the final rendered result. A crawler first receives an HTTP response. A simplified response might look like this:
        </p>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{`HTTP/2 200\nContent-Type: text/html; charset=UTF-8\nX-Robots-Tag: index, follow\nCache-Control: public, max-age=3600`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Those headers can tell you things that are not obvious from the visible page. The inspector helps you examine:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-medium text-slate-800">
          {[
            'HTTP status code',
            'Redirect behavior',
            'X-Robots-Tag',
            'Content-Type',
            'Cache-Control',
            'Vary',
            'Security headers (HSTS/CSP)',
            'Crawler-specific differences',
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              {item}
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          A <code className="font-mono font-bold text-slate-900">200 OK</code> means the request succeeded, but that alone does not tell you whether the response is indexable, whether it contains the expected content, or whether a CDN/WAF has altered the response.
        </p>
      </section>

      {/* 3. WHY CHECK HEADERS INSTEAD OF ONLY LOOKING AT HTML? */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Why Check Headers Instead of Only Looking at the HTML?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A common technical SEO mistake is checking the HTML and stopping there. You might find:
        </p>

        <pre className="p-3.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-mono text-xs">
          <code>{`<meta name="robots" content="index, follow">`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          and assume everything is fine. But the HTTP response could contain:
        </p>

        <pre className="p-3.5 bg-slate-950 text-rose-400 rounded-xl font-mono text-xs border border-slate-800">
          <code>{`X-Robots-Tag: noindex`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Now you have two conflicting signals.
        </p>

        <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-950 space-y-2">
          <p>
            The important point is that <strong>X-Robots-Tag</strong> is an HTTP response header and can provide robots directives for the resource before you get into the page&apos;s HTML. It is particularly useful for resources that are not HTML, such as PDFs.
          </p>
          <p>
            For an HTML document, Google supports the robots meta tag. For non-HTML resources, the HTTP header is the appropriate mechanism.
          </p>
          <p className="font-bold">
            So when debugging indexability, inspect both the HTML and the HTTP response rather than assuming the &lt;meta name=&quot;robots&quot;&gt; tag tells the entire story.
          </p>
        </div>
      </section>

      {/* 4. X-ROBOTS-TAG: THE HEADER SEO TEAMS OFTEN MISS */}
      <section id="x-robots-tag" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            X-Robots-Tag: The Header SEO Teams Often Miss
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A typical response might contain:
        </p>

        <pre className="p-3.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-mono text-xs">
          <code>{`X-Robots-Tag: noindex\n\n# Or with follow directives:\nX-Robots-Tag: noindex, nofollow\n\n# Or bot-specific:\nX-Robots-Tag: googlebot: noindex`}</code>
        </pre>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The exact configuration depends on your server and deployment. This is one reason an HTTP inspector is useful: the directive may be coming from Nginx, Apache, application middleware, a CDN, a plugin, or another layer rather than from the HTML template.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900">Developer View (HTML)</span>
            <p className="text-slate-600">
              Sees <code className="font-mono bg-white px-1 py-0.5 rounded">&lt;meta name=&quot;robots&quot; content=&quot;index, follow&quot;&gt;</code> and assumes the page is fully indexable.
            </p>
          </div>
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
            <span className="font-bold text-rose-950">Crawler View (HTTP Header)</span>
            <p className="text-rose-800">
              Receives <code className="font-mono bg-white px-1 py-0.5 rounded">X-Robots-Tag: noindex</code> from a CDN rule or staging header that was never removed.
            </p>
          </div>
        </div>
      </section>

      {/* 5. A BROWSER RESPONSE IS NOT NECESSARILY A CRAWLER RESPONSE */}
      <section id="browser-vs-crawler" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            A Browser Response Is Not Necessarily a Crawler Response
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Consider this simple test:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Browser Request</span>
            <pre className="p-3 bg-white border border-slate-200 text-slate-800 rounded-xl font-mono text-xs">
              <code>{`GET /pricing/\nUser-Agent: Chrome\n\n→ 200 OK\nContent-Type: text/html`}</code>
            </pre>
          </div>

          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900">Googlebot Request</span>
            <pre className="p-3 bg-white border border-rose-200 text-rose-700 rounded-xl font-mono text-xs">
              <code>{`GET /pricing/\nUser-Agent: Googlebot\n\n→ 403 Forbidden`}</code>
            </pre>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Your page works. Your server is also blocking Googlebot. Those are both true at the same time. This happens because traffic passes through multiple architectural layers:
        </p>

        <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-xs text-center space-y-1">
          <div>Crawler</div>
          <div className="text-slate-500">↓</div>
          <div>DNS</div>
          <div className="text-slate-500">↓</div>
          <div>CDN (Cloudflare / Fastly)</div>
          <div className="text-slate-500">↓</div>
          <div className="text-emerald-400 font-bold">WAF (Web Application Firewall)</div>
          <div className="text-slate-500">↓</div>
          <div>Reverse Proxy (Nginx)</div>
          <div className="text-slate-500">↓</div>
          <div>Web Server &amp; Application</div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          The block does not necessarily come from your application code. A Cloudflare rule, security product, hosting firewall, bot-management system, reverse proxy, or custom server rule can alter the response before the request ever reaches your application.
        </p>

        {/* Mid-Article Tool Integration CTA 1 */}
        <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs sm:text-sm text-emerald-950 font-medium text-center sm:text-left">
            Test whether Googlebot or AI crawlers get a 403 or noindex on your URL:
          </span>
          <a
            href="#interactive-inspector"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <span>Jump up to inspect bot headers</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 6. SEARCH CRAWLERS AND AI CRAWLERS ARE NOT THE SAME THING */}
      <section id="search-vs-ai" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Search Crawlers and AI Crawlers Are Not the Same Thing
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          It is useful to separate crawler access into different functional purposes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4 text-emerald-600" /> Traditional Search Crawlers
            </span>
            <ul className="text-xs text-slate-600 space-y-1 font-mono">
              <li>• Googlebot (Smartphone &amp; Desktop)</li>
              <li>• Bingbot</li>
            </ul>
            <p className="text-xs text-slate-500 pt-1">
              Associated with traditional search indexation and organic rank discovery.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-blue-600" /> AI-Related Crawlers
            </span>
            <ul className="text-xs text-slate-600 space-y-1 font-mono">
              <li>• GPTBot vs. OAI-SearchBot (OpenAI)</li>
              <li>• ClaudeBot (Anthropic)</li>
              <li>• PerplexityBot (Perplexity)</li>
              <li>• Google-Extended (Gemini AI control)</li>
            </ul>
            <p className="text-xs text-slate-500 pt-1">
              Split between real-time AI search citation and background model pre-training.
            </p>
          </div>
        </div>

        <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-950 space-y-2">
          <span className="font-bold block">Don&apos;t Assume Every AI Bot Has the Same Purpose</span>
          <p>
            For example, OpenAI documents <strong>OAI-SearchBot</strong> separately from <strong>GPTBot</strong>. OpenAI says <code>OAI-SearchBot</code> is used to surface websites in ChatGPT search, while <code>GPTBot</code> is controlled separately for training foundation models.
          </p>
          <p>
            That means a rule such as <code className="font-mono bg-white px-1 py-0.5 rounded text-rose-700">Block GPTBot</code> does not automatically mean <code className="font-mono bg-white px-1 py-0.5 rounded text-emerald-800">Block OAI-SearchBot</code>. They are separate controls.
          </p>
          <p className="font-bold">
            This distinction is crucial if your organization policy is: &quot;Do not allow training crawlers, but we do want our pages available to AI search.&quot;
          </p>
        </div>

        {/* Quick-Reference Matrix Table for User-Agents */}
        <div id="user-agent-matrix" className="space-y-2.5 pt-2 scroll-mt-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Quick-Reference Matrix: User-Agents, Failure Points &amp; Inspection Steps
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">User-Agent</th>
                  <th className="p-3.5">Expected Status</th>
                  <th className="p-3.5">Common Failure Point</th>
                  <th className="p-3.5">What to Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-mono font-bold text-slate-900">Googlebot</td>
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">200 OK</td>
                  <td className="p-3.5 text-slate-700">WAF / Cloudflare bot management</td>
                  <td className="p-3.5 text-slate-600 font-mono text-xs">WAF logs, rate limits, IP blocks</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-mono font-bold text-blue-900">GPTBot</td>
                  <td className="p-3.5 font-mono text-slate-700 font-bold">200 OK or 403</td>
                  <td className="p-3.5 text-slate-700">Intentional or accidental blanket block</td>
                  <td className="p-3.5 text-slate-600 font-mono text-xs">robots.txt or server rules</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-mono font-bold text-emerald-900">OAI-SearchBot</td>
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">200 OK</td>
                  <td className="p-3.5 text-slate-700">Missing citation access</td>
                  <td className="p-3.5 text-slate-600 font-mono text-xs">Separate rules from training bots</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-mono font-bold text-slate-900">ClaudeBot</td>
                  <td className="p-3.5 font-mono text-slate-700 font-bold">200 OK or 403</td>
                  <td className="p-3.5 text-slate-700">Anthropic AI crawler blocking policy</td>
                  <td className="p-3.5 text-slate-600 font-mono text-xs">robots.txt User-agent: ClaudeBot</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-mono font-bold text-slate-900">PerplexityBot</td>
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">200 OK</td>
                  <td className="p-3.5 text-slate-700">Blocked search answer citations</td>
                  <td className="p-3.5 text-slate-600 font-mono text-xs">WAF user-agent filters, Cloudflare rules</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. THE HTTP STATUS CODE COMES FIRST */}
      <section id="status-codes" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            The HTTP Status Code Comes First
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The first thing to check in a crawler response is the status code. It quickly tells you whether you&apos;re dealing with a successful response, redirect, access problem, or server failure.
        </p>

        <div className="space-y-4">
          {/* 200 OK */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm font-mono flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">200 OK</span>
                Request Succeeded
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For a normal indexable HTML page, you expect a 200 containing the intended document. But a 200 page can still have <code className="font-mono bg-white px-1 py-0.5 rounded">X-Robots-Tag: noindex</code> or return empty partial content. A 200 means the HTTP transport succeeded, not that SEO is healthy.
            </p>
          </div>

          {/* 301 and 302 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm font-mono flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold">301 / 302</span>
                Permanent &amp; Temporary Redirects
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Don&apos;t inspect only the first response—follow the entire redirect path. You may discover a chain like: <code className="font-mono bg-white px-1 py-0.5 rounded">Googlebot → 301 /old-page/ → 302 /temp/ → 403 /blocked/</code>.
            </p>
          </div>

          {/* 403 Forbidden */}
          <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-rose-950 text-sm font-mono flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-rose-200 text-rose-900 font-bold">403 Forbidden</span>
                Server Refusing Access
              </h4>
            </div>
            <p className="text-xs text-rose-900 leading-relaxed">
              If Chrome gets 200 and Googlebot gets 403, don&apos;t immediately edit on-page SEO settings. Look at: WAF rules, CDN bot protection, IP restrictions, rate limits, server rules, and User-Agent filtering. Find the infrastructure layer producing the 403.
            </p>
          </div>

          {/* 410 Gone */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm font-mono flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 font-bold">410 Gone</span>
                Resource Permanently Removed
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Correct for intentionally deleted URLs with no forwarding address. Becomes an urgent bug when a live revenue page accidentally returns 410 due to bad rewrite rules or CMS conditions.
            </p>
          </div>

          {/* 503 Service Unavailable */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-950 text-sm font-mono flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold">503 Service Unavailable</span>
                Temporary Server Overload
              </h4>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Indicates temporary maintenance or resource exhaustion. Look at: CPU/memory limits, database connection pool exhaustion, serverless execution timeouts, or CDN-to-origin gateway drops.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CONTENT-TYPE, CACHE-CONTROL & VARY */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Content-Type, Cache-Control &amp; Vary
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
              Content-Type
            </span>
            <code className="text-xs font-mono text-emerald-700 block">text/html; charset=UTF-8</code>
            <p className="text-xs text-slate-600 leading-relaxed">
              If an endpoint returns 200 OK with <code className="font-mono bg-white px-1">application/json</code> or <code className="font-mono bg-white px-1">text/plain</code> when an HTML article was expected, search engines cannot index the rendered document.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
              Cache-Control
            </span>
            <code className="text-xs font-mono text-emerald-700 block">public, max-age=3600</code>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your origin publishes an update but your CDN continues serving an older cached response for 24 hours, Googlebot will crawl and evaluate stale content.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
              Vary Header
            </span>
            <code className="text-xs font-mono text-emerald-700 block">Vary: Accept-Language, User-Agent</code>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tells shared edge caches which request characteristics alter the response. Missing Vary headers can cause mobile crawler responses to be served to desktop users.
            </p>
          </div>
        </div>
      </section>

      {/* 9. COMMON SERVER-SIDE PROBLEMS */}
      <section id="common-problems" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5 scroll-mt-24">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            5 Common Server-Side Problems That Look Like SEO Problems
          </h3>
        </div>

        <div className="space-y-3.5">
          {[
            {
              title: '1. robots.txt allows the URL, but the response says noindex',
              desc: 'robots.txt controls crawling access. noindex controls whether an accessible resource should be indexed. Allowed to crawl is not equivalent to allowed to index.',
            },
            {
              title: '2. WAF blocks Googlebot with a 403',
              desc: 'Browser receives 200 OK while Googlebot gets 403. Common causes: IP reputation filters, bot challenge rules, aggressive rate limits, or bad User-Agent blocking rules.',
            },
            {
              title: '3. The CDN has a different response than the origin',
              desc: 'You fix the origin server, but the public URL still returns 403 because the CDN serves a cached edge response. Always distinguish origin response from public crawler-facing response.',
            },
            {
              title: '4. User-Agent detection changes the page',
              desc: 'Systems that conditionally render: Browser → 200 full HTML, Googlebot → 200 partial HTML, GPTBot → 403. This is three distinct responses from the same single URL.',
            },
            {
              title: '5. CAPTCHA or Challenge instead of a normal HTTP response',
              desc: 'Security systems return a JavaScript challenge page. Browsers pass automatically, but crawlers fail the challenge and receive an empty 403 or un-indexable HTML.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. STEP-BY-STEP WORKFLOW & PRACTICAL DEBUGGING */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            How to Use the Header Inspector &amp; Debugging Example
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {[
            { step: '1. Enter URL', desc: 'Exact public production URL' },
            { step: '2. Select Crawler', desc: 'Googlebot, Bingbot, GPTBot, etc.' },
            { step: '3. Inspect Status', desc: 'Verify 200, 301, 403, or 503' },
            { step: '4. Check Headers', desc: 'X-Robots-Tag, Content-Type, Vary' },
            { step: '5. Compare Bots', desc: 'Compare Googlebot vs GPTBot' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-emerald-700 block">{item.step}</span>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Practical Example Box */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
            Practical Debugging Case:
          </span>
          <p className="text-xs sm:text-sm text-slate-300">
            Browser returns <code className="font-mono text-white">200 OK</code> with <code className="font-mono text-white">&lt;meta name=&quot;robots&quot; content=&quot;index, follow&quot;&gt;</code>. But Googlebot receives <code className="font-mono text-white">200 OK</code> with <code className="font-mono text-rose-400">X-Robots-Tag: noindex</code>.
          </p>
          <p className="text-xs text-slate-400">
            Where to look: Nginx, Apache, .htaccess, application middleware, CMS SEO plugins, CDN edge rules, or staging environment configs.
          </p>
        </div>
      </section>

      {/* 11. CRAWLER COMPARISON TABLE */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Don&apos;t Test Only Googlebot
          </h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Crawler</th>
                <th className="p-3">Purpose to Investigate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">Googlebot</td>
                <td className="p-3 text-slate-600">Google Search crawling and indexation</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">Bingbot</td>
                <td className="p-3 text-slate-600">Bing search crawling and indexation</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-800">OAI-SearchBot</td>
                <td className="p-3 text-slate-600">ChatGPT search web citation and indexing</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-blue-800">GPTBot</td>
                <td className="p-3 text-slate-600">OpenAI crawling for model training and improvements</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">ClaudeBot</td>
                <td className="p-3 text-slate-600">Anthropic AI crawler</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">PerplexityBot</td>
                <td className="p-3 text-slate-600">Perplexity AI search engine crawling</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">Google-Extended</td>
                <td className="p-3 text-slate-600">Google&apos;s control for Gemini and Vertex AI training</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 12. SIMPLE TROUBLESHOOTING ORDER */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            A Simple Troubleshooting Order
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          When crawler behavior looks wrong, use this disciplined diagnostic order:
        </p>

        <div className="space-y-2">
          {[
            '1. Which crawler is affected? (Googlebot, GPTBot, etc.)',
            '2. What HTTP status does it receive? (200, 301, 403, 503)',
            '3. Where does the URL redirect? (Inspect complete redirect path)',
            '4. What Content-Type is returned? (Verify text/html)',
            '5. Is X-Robots-Tag present? (Inspect for noindex / nofollow)',
            '6. What are Cache-Control and Vary doing? (Inspect cache freshness)',
            '7. Is a WAF/CDN changing the response? (Inspect Cloudflare / Fastly)',
            '8. Is the application changing output by User-Agent? (Dynamic rendering)',
            '9. Does the final HTML contain the expected content?',
            '10. Check server logs and web server configuration.',
          ].map((step, idx) => (
            <div key={idx} className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <span className="font-mono text-emerald-700">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 13. FREQUENTLY ASKED QUESTIONS */}
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

      {/* 14. THE RESPONSE IS THE EVIDENCE */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          The Response Is the Evidence
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          When debugging crawler access, don&apos;t rely only on what your browser shows. Check the response. A useful investigation starts with just five things:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs text-center">
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 font-bold text-emerald-300">HTTP status</div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 font-bold text-emerald-300">Location</div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 font-bold text-emerald-300">Content-Type</div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 font-bold text-emerald-300">X-Robots-Tag</div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 font-bold text-emerald-300">Cache / Vary</div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          If Googlebot receives 200 while another crawler receives 403, that&apos;s useful evidence. If Googlebot receives 200 with X-Robots-Tag: noindex, that&apos;s useful evidence. The goal of this tool is to show you <strong>what your infrastructure is actually sending to the crawler you are investigating</strong>.
        </p>

        <div className="p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl text-xs sm:text-sm font-bold text-emerald-200 text-center">
          Once you can see the actual HTTP headers, server logs, CDN rules, WAF settings, framework middleware, and deployment configuration become much easier to troubleshoot.
        </div>
      </section>
    </article>
  );
};
