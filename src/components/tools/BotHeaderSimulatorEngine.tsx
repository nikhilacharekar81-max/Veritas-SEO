import React, { useState, useMemo } from 'react';
import type { SeoTool } from '../../lib/schemas';
import {
  Bot,
  Globe,
  Shield,
  Zap,
  Play,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Terminal,
} from 'lucide-react';
import { BotHeaderInspectorGuide } from './BotHeaderInspectorGuide';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

interface BotProfile {
  name: string;
  userAgent: string;
  supportsBrotli: boolean;
  respectsXRobots: boolean;
  category: 'Search Crawler' | 'AI Search' | 'AI Training' | 'Assistant';
}

const BOTS: Record<string, BotProfile> = {
  googlebot: {
    name: 'Googlebot Smartphone (Chromium 124)',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    supportsBrotli: true,
    respectsXRobots: true,
    category: 'Search Crawler',
  },
  googlebot_desktop: {
    name: 'Googlebot Desktop (Chromium 124)',
    userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/124.0.0.0 Safari/537.36',
    supportsBrotli: true,
    respectsXRobots: true,
    category: 'Search Crawler',
  },
  bingbot: {
    name: 'Microsoft Bingbot',
    userAgent: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    supportsBrotli: true,
    respectsXRobots: true,
    category: 'Search Crawler',
  },
  oai_searchbot: {
    name: 'OAI-SearchBot (ChatGPT Search)',
    userAgent: 'Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)',
    supportsBrotli: true,
    respectsXRobots: true,
    category: 'AI Search',
  },
  gptbot: {
    name: 'OpenAI GPTBot (AI Model Training)',
    userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
    supportsBrotli: false,
    respectsXRobots: true,
    category: 'AI Training',
  },
  claudebot: {
    name: 'Anthropic ClaudeBot',
    userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
    supportsBrotli: true,
    respectsXRobots: true,
    category: 'AI Training',
  },
  perplexitybot: {
    name: 'PerplexityBot (Search Engine)',
    userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
    supportsBrotli: true,
    respectsXRobots: true,
    category: 'AI Search',
  },
  google_extended: {
    name: 'Google-Extended (Gemini & Vertex AI)',
    userAgent: 'Google-Extended (+https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)',
    supportsBrotli: true,
    respectsXRobots: true,
    category: 'AI Training',
  },
  applebot: {
    name: 'Applebot (Siri & Spotlight)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)',
    supportsBrotli: true,
    respectsXRobots: true,
    category: 'Assistant',
  },
};

export const BotHeaderSimulatorEngine: React.FC<Props> = ({ onPerformCalculation }) => {
  const [selectedBotKey, setSelectedBotKey] = useState<string>('googlebot');
  const [targetUrl, setTargetUrl] = useState('https://veritas-seo.dev/tool/serp-pixel-simulator');
  const [statusCode, setStatusCode] = useState<number>(200);
  const [includeXRobots, setIncludeXRobots] = useState(true);
  const [includeHsts, setIncludeHsts] = useState(true);
  const [includeCsp, setIncludeCsp] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentBot = BOTS[selectedBotKey] || BOTS.googlebot;

  // Generated Raw Headers
  const rawHeaders = useMemo(() => {
    const headers: string[] = [
      `HTTP/2 ${statusCode} ${statusCode === 200 ? 'OK' : statusCode === 301 ? 'Moved Permanently' : statusCode === 404 ? 'Not Found' : 'Internal Server Error'}`,
      `Date: ${new Date().toUTCString()}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Server: cloudflare`,
      `CF-RAY: 88f2a99182a9c-IAD`,
      `Content-Encoding: ${currentBot.supportsBrotli ? 'br' : 'gzip'}`,
      `Vary: Accept-Encoding`,
      `Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=600`,
    ];

    if (includeXRobots) {
      headers.push(`X-Robots-Tag: index, follow, max-snippet:-1, max-image-preview:large`);
    }

    if (includeHsts) {
      headers.push(`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`);
    }

    if (includeCsp) {
      headers.push(`Content-Security-Policy: default-src 'self' https:; script-src 'self' 'unsafe-inline'`);
    }

    headers.push(`X-Content-Type-Options: nosniff`);
    headers.push(`X-Frame-Options: SAMEORIGIN`);

    return headers.join('\n');
  }, [statusCode, includeXRobots, includeHsts, includeCsp, currentBot]);

  const handleSimulate = () => {
    setIsSimulating(true);
    onPerformCalculation?.();
    setTimeout(() => {
      setIsSimulating(false);
    }, 300);
  };

  const handleCopyHeaders = () => {
    navigator.clipboard.writeText(rawHeaders);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="interactive-inspector" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-600" /> Googlebot &amp; AI Crawler HTTP Header Inspector
          </h3>
          <p className="text-xs text-slate-500">
            Simulate how search engine bots and LLM scrapers perceive raw HTTP response headers, compression, and security tags.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSimulate}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5" /> Run Bot Request Simulation
        </button>
      </div>

      {/* Simulator Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Crawler User-Agent
          </label>
          <select
            value={selectedBotKey}
            onChange={(e) => setSelectedBotKey(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
          >
            {Object.entries(BOTS).map(([key, b]) => (
              <option key={key} value={key}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Target URL Endpoint
          </label>
          <input
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Simulated Status Code
          </label>
          <select
            value={statusCode}
            onChange={(e) => setStatusCode(Number(e.target.value))}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800"
          >
            <option value={200}>200 OK</option>
            <option value={301}>301 Moved Permanently</option>
            <option value={302}>302 Found</option>
            <option value={307}>307 Temporary Redirect</option>
            <option value={404}>404 Not Found</option>
            <option value={500}>500 Internal Server Error</option>
          </select>
        </div>
      </div>

      {/* Header Directives Toggles */}
      <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeXRobots}
            onChange={(e) => setIncludeXRobots(e.target.checked)}
            className="rounded text-emerald-600 border-slate-300"
          />
          Include X-Robots-Tag Directives
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeHsts}
            onChange={(e) => setIncludeHsts(e.target.checked)}
            className="rounded text-emerald-600 border-slate-300"
          />
          Strict-Transport-Security (HSTS Preload)
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeCsp}
            onChange={(e) => setIncludeCsp(e.target.checked)}
            className="rounded text-emerald-600 border-slate-300"
          />
          Content-Security-Policy (CSP)
        </label>
      </div>

      {/* Raw Response Stream */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Raw HTTP/2 Wire Response Stream
          </span>
          <button
            type="button"
            onClick={handleCopyHeaders}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Headers'}
          </button>
        </div>

        <pre className="p-5 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{rawHeaders}</code>
        </pre>
      </div>

      {/* COMPREHENSIVE BOT HEADER INSPECTOR GUIDE */}
      <div className="w-full h-auto pt-8 border-t border-slate-200/80">
        <BotHeaderInspectorGuide />
      </div>
    </div>
  );
};
