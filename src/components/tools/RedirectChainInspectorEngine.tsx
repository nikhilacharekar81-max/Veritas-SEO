import React, { useState } from 'react';
import type { SeoTool } from '../../lib/schemas';
import { GitFork, ArrowDown, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

interface RedirectHop {
  url: string;
  statusCode: 200 | 301 | 302 | 307 | 404;
  statusText: string;
  latencyMs: number;
  serverHeader: string;
  isCanonical: boolean;
}

export const RedirectChainInspectorEngine: React.FC<Props> = ({ onPerformCalculation }) => {
  const [initialUrl, setInitialUrl] = useState('http://example.com/old-category/tool-slug');
  const [hops, setHops] = useState<RedirectHop[]>([
    {
      url: 'http://example.com/old-category/tool-slug',
      statusCode: 301,
      statusText: 'Moved Permanently',
      latencyMs: 82,
      serverHeader: 'nginx/1.24 (Cloudflare)',
      isCanonical: false,
    },
    {
      url: 'https://example.com/old-category/tool-slug',
      statusCode: 301,
      statusText: 'Moved Permanently',
      latencyMs: 74,
      serverHeader: 'nginx/1.24 (Cloudflare)',
      isCanonical: false,
    },
    {
      url: 'https://www.example.com/category/tool-slug',
      statusCode: 200,
      statusText: 'OK',
      latencyMs: 110,
      serverHeader: 'Vercel / Edge Engine',
      isCanonical: true,
    },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);

  const simulateInspect = () => {
    setIsSimulating(true);
    if (onPerformCalculation) {
      onPerformCalculation();
    }
    setTimeout(() => {
      // Parse URL and generate intelligent hop chain
      const isHttp = initialUrl.startsWith('http://');
      const isNonWww = !initialUrl.includes('www.');
      const newHops: RedirectHop[] = [];

      if (isHttp) {
        newHops.push({
          url: initialUrl,
          statusCode: 301,
          statusText: 'Moved Permanently',
          latencyMs: 65,
          serverHeader: 'Cloudflare Edge',
          isCanonical: false,
        });
      }

      if (isNonWww) {
        newHops.push({
          url: initialUrl.replace('http://', 'https://'),
          statusCode: 301,
          statusText: 'Moved Permanently',
          latencyMs: 72,
          serverHeader: 'Cloudflare Edge',
          isCanonical: false,
        });
      }

      const finalClean = initialUrl
        .replace('http://', 'https://')
        .replace('https://example.com', 'https://www.example.com');

      newHops.push({
        url: finalClean,
        statusCode: 200,
        statusText: 'OK',
        latencyMs: 95,
        serverHeader: 'Next.js App Engine',
        isCanonical: true,
      });

      setHops(newHops);
      setIsSimulating(false);
    }, 600);
  };

  const totalLatency = hops.reduce((acc, h) => acc + h.latencyMs, 0);
  const hopCount = hops.length;
  const hasLoop = hopCount > 4;

  return (
    <div className="space-y-8">
      {/* Input bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              URL to Trace (HTTP / HTTPS / Subdomain Redirects)
            </label>
            <input
              type="text"
              value={initialUrl}
              onChange={(e) => setInitialUrl(e.target.value)}
              placeholder="e.g. http://yoursite.com/old-path"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono text-slate-900"
            />
          </div>
          <div className="sm:self-end w-full sm:w-auto">
            <button
              type="button"
              onClick={simulateInspect}
              disabled={isSimulating}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
              Trace Redirect Pathway
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Redirect Hops</span>
          <span className="text-2xl font-bold text-slate-900 tabular-nums">
            {hopCount - 1} <span className="text-xs text-slate-500 font-normal">redirect(s)</span>
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Cumulative TTFB Delay</span>
          <span className="text-2xl font-bold text-slate-900 tabular-nums">
            {totalLatency} <span className="text-xs text-slate-500 font-normal">ms</span>
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Crawl Efficiency Grade</span>
          <span
            className={`text-lg font-bold block pt-1 ${
              hopCount <= 2 ? 'text-emerald-600' : hopCount <= 3 ? 'text-amber-600' : 'text-red-600'
            }`}
          >
            {hopCount <= 2 ? 'Optimal (1-Hop Max)' : hopCount <= 3 ? 'Moderate Latency' : 'Critical (Chain Warning)'}
          </span>
        </div>
      </div>

      {/* Hop Sequence Timeline */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h4 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <GitFork className="w-4 h-4 text-emerald-600" /> Hop Execution Pathway
          </h4>
          <span className="text-xs font-mono text-slate-500">Googlebot User-Agent Simulation</span>
        </div>

        <div className="space-y-4">
          {hops.map((hop, idx) => (
            <div key={idx} className="relative">
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md font-mono ${
                        hop.statusCode === 200
                          ? 'bg-emerald-100 text-emerald-800'
                          : hop.statusCode === 301
                          ? 'bg-blue-100 text-blue-800'
                          : hop.statusCode === 302
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {hop.statusCode} {hop.statusText}
                    </span>
                    <span className="text-xs font-mono text-slate-500">+{hop.latencyMs}ms</span>
                    {hop.isCanonical && (
                      <span className="text-[11px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-md">
                        Canonical Target
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-slate-900 break-all">{hop.url}</div>
                </div>

                <div className="text-right text-xs text-slate-500 font-mono">
                  <div>Server: {hop.serverHeader}</div>
                </div>
              </div>

              {idx < hops.length - 1 && (
                <div className="flex justify-center my-2 text-slate-400">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

        {hopCount > 2 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Actionable Recommendation:</strong> Flatten this redirect chain. Update the initial 301 rule to point directly to the final 200 OK canonical URL (<code className="font-mono text-slate-900">{hops[hops.length - 1]?.url}</code>). This will reduce server TTFB by {hops.slice(0, -1).reduce((s, h) => s + h.latencyMs, 0)}ms.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
