import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import type { RobotsTxtConfig } from '../../lib/schemas';
import { Bot, FileCode, Copy, Check, ShieldCheck, RefreshCw, ExternalLink } from 'lucide-react';

export const RobotsSitemapManager: React.FC = () => {
  const { categories, subCategories, tools, robotsConfig, updateRobotsConfig, publicCategories, publicSubCategories, publicTools } = useCms();

  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots'>('sitemap');
  const [copied, setCopied] = useState(false);

  // Robots Form state
  const [userAgent, setUserAgent] = useState(robotsConfig.userAgent);
  const [customRules, setCustomRules] = useState(robotsConfig.customRules);
  const [disallowAdmin, setDisallowAdmin] = useState(robotsConfig.disallowPaths.includes('/admin'));

  // Generate dynamic sitemap XML based on active published items with index: true
  const generateSitemapXml = () => {
    const siteUrl = 'https://veritas-seo.dev';
    const now = new Date().toISOString().split('T')[0];

    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
      { loc: siteUrl, lastmod: now, changefreq: 'daily', priority: '1.0' },
    ];

    // Public active categories with index !== false
    publicCategories.forEach((cat) => {
      if (cat.seo.robots.index) {
        urls.push({
          loc: `${siteUrl}/category/${cat.slug}`,
          lastmod: cat.updatedAt.split('T')[0] || now,
          changefreq: 'weekly',
          priority: '0.8',
        });
      }
    });

    // Public active sub-categories
    publicSubCategories.forEach((sub) => {
      if (sub.seo.robots.index) {
        urls.push({
          loc: `${siteUrl}/subcategory/${sub.slug}`,
          lastmod: sub.updatedAt.split('T')[0] || now,
          changefreq: 'weekly',
          priority: '0.7',
        });
      }
    });

    // Public active published SEO tools
    publicTools.forEach((tool) => {
      if (tool.seo.robots.index) {
        urls.push({
          loc: `${siteUrl}/tool/${tool.slug}`,
          lastmod: tool.updatedAt.split('T')[0] || now,
          changefreq: 'weekly',
          priority: '0.9',
        });
      }
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  };

  const sitemapXmlString = generateSitemapXml();

  const generateRobotsTxt = () => {
    const disallows = disallowAdmin ? ['Disallow: /admin/', 'Disallow: /api/internal/'] : [];
    return `User-agent: ${userAgent}
Allow: /
${disallows.join('\n')}

${customRules}

Sitemap: https://veritas-seo.dev/sitemap.xml`;
  };

  const robotsTxtString = generateRobotsTxt();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveRobots = () => {
    updateRobotsConfig({
      ...robotsConfig,
      userAgent,
      customRules,
      disallowPaths: disallowAdmin ? ['/admin', '/api/internal'] : [],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Dynamic sitemap.xml &amp; robots.txt Suite</h3>
            <p className="text-xs text-slate-500">
              Live crawler endpoint generator. Excludes hidden drafts and noindex pages automatically.
            </p>
          </div>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('sitemap')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'sitemap' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> Dynamic sitemap.xml
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'robots' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Bot className="w-3.5 h-3.5" /> robots.txt Directives
          </button>
        </div>
      </div>

      {activeTab === 'sitemap' && (
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-300">
                Live XML Sitemap Feed ({publicCategories.length + publicSubCategories.length + publicTools.length + 1} published URLs)
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(sitemapXmlString)}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied XML!' : 'Copy sitemap.xml'}
            </button>
          </div>

          <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl overflow-x-auto text-emerald-400 max-h-[480px] leading-relaxed">
            <code>{sitemapXmlString}</code>
          </pre>
        </div>
      )}

      {activeTab === 'robots' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3">
              Configure robots.txt Crawler Rules
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target User-Agent</label>
              <input
                type="text"
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                placeholder="*"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={disallowAdmin}
                  onChange={(e) => setDisallowAdmin(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
                />
                Disallow Admin Panel &amp; API Routes (/admin/, /api/internal/)
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Crawl Directives</label>
              <textarea
                rows={5}
                value={customRules}
                onChange={(e) => setCustomRules(e.target.value)}
                placeholder="# Add additional directives or bot overrides here..."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono resize-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSaveRobots}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              Save robots.txt Configuration
            </button>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">Rendered robots.txt Output</span>
                <button
                  type="button"
                  onClick={() => handleCopy(robotsTxtString)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>

              <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl text-emerald-400 leading-relaxed max-h-[300px] overflow-y-auto">
                <code>{robotsTxtString}</code>
              </pre>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Automatically advertises valid sitemap XML endpoint
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
