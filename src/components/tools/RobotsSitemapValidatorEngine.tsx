import React, { useState } from 'react';
import type { SeoTool } from '../../lib/schemas';
import { Terminal, CheckCircle2, XCircle, Play, FileCode, Check } from 'lucide-react';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

export const RobotsSitemapValidatorEngine: React.FC<Props> = ({ onPerformCalculation }) => {
  const [robotsText, setRobotsText] = useState(
    `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/internal/\nDisallow: /draft/\n\nUser-agent: Googlebot\nAllow: /public/\n\nSitemap: https://veritas-seo.dev/sitemap.xml`
  );
  const [testPath, setTestPath] = useState('/admin/settings');
  const [testUserAgent, setTestUserAgent] = useState('Googlebot');
  const [testResult, setTestResult] = useState<{ isAllowed: boolean; matchedRule: string } | null>(null);

  const runTest = () => {
    if (onPerformCalculation) {
      onPerformCalculation();
    }
    const lines = robotsText.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
    let currentUserAgent = '*';
    let allowed = true;
    let ruleMatched = 'Default Allow: /';

    for (const line of lines) {
      if (line.toLowerCase().startsWith('user-agent:')) {
        currentUserAgent = line.split(':')[1]?.trim() || '*';
      }

      if (currentUserAgent === '*' || currentUserAgent.toLowerCase() === testUserAgent.toLowerCase()) {
        if (line.toLowerCase().startsWith('disallow:')) {
          const path = line.split(':')[1]?.trim();
          if (path && testPath.startsWith(path)) {
            allowed = false;
            ruleMatched = line;
          }
        } else if (line.toLowerCase().startsWith('allow:')) {
          const path = line.split(':')[1]?.trim();
          if (path && testPath.startsWith(path)) {
            allowed = true;
            ruleMatched = line;
          }
        }
      }
    }

    setTestResult({ isAllowed: allowed, matchedRule: ruleMatched });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-600" /> robots.txt Directives
            </h3>
            <span className="text-xs font-mono text-slate-500">Live Syntax Parser</span>
          </div>

          <textarea
            rows={10}
            value={robotsText}
            onChange={(e) => setRobotsText(e.target.value)}
            className="w-full font-mono text-xs p-4 bg-slate-950 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 leading-relaxed resize-none"
          />
        </div>

        {/* Tester */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Terminal className="w-4 h-4 text-emerald-600" /> Crawl Path Simulator
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target User-Agent</label>
            <select
              value={testUserAgent}
              onChange={(e) => setTestUserAgent(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="Googlebot">Googlebot (Web Search)</option>
              <option value="Googlebot-Image">Googlebot-Image</option>
              <option value="Bingbot">Bingbot</option>
              <option value="*">Wildcard (*)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">URL Path to Check</label>
            <input
              type="text"
              value={testPath}
              onChange={(e) => setTestPath(e.target.value)}
              placeholder="/example/path"
              className="w-full px-3 py-2 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <button
            type="button"
            onClick={runTest}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <Play className="w-3.5 h-3.5" /> Test Crawl Permission
          </button>

          {testResult && (
            <div
              className={`p-4 rounded-xl border transition-all ${
                testResult.isAllowed
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-red-50/70 border-red-200 text-red-900'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-sm">
                {testResult.isAllowed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>ALLOWED by robots.txt</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>BLOCKED (Disallowed)</span>
                  </>
                )}
              </div>
              <p className="text-xs mt-1.5 font-mono">Matched rule: "{testResult.matchedRule}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
