import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import { Copy, Check, FileCode, Bot, X } from 'lucide-react';

interface Props {
  type: 'sitemap' | 'robots' | null;
  onClose: () => void;
}

export const SitemapRobotsModal: React.FC<Props> = ({ type, onClose }) => {
  const { publicCategories, publicSubCategories, publicTools, robotsConfig } = useCms();
  const [copied, setCopied] = useState(false);

  if (!type) return null;

  const generateSitemapXml = () => {
    const siteUrl = 'https://veritas-seo.dev';
    const now = new Date().toISOString().split('T')[0];

    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
      { loc: siteUrl, lastmod: now, changefreq: 'daily', priority: '1.0' },
    ];

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

  const generateRobotsTxt = () => {
    const disallows = robotsConfig.disallowPaths.map((p) => `Disallow: ${p}`).join('\n');
    return `User-agent: ${robotsConfig.userAgent}
Allow: /
${disallows}

${robotsConfig.customRules}

Sitemap: https://veritas-seo.dev/sitemap.xml`;
  };

  const content = type === 'sitemap' ? generateSitemapXml() : generateRobotsTxt();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === 'sitemap' ? (
              <FileCode className="w-5 h-5 text-emerald-400" />
            ) : (
              <Bot className="w-5 h-5 text-emerald-400" />
            )}
            <div>
              <h3 className="text-base font-bold text-white">
                {type === 'sitemap' ? 'Dynamic sitemap.xml' : 'Crawler robots.txt Directives'}
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Live Googlebot &amp; Bingbot Endpoint View
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <pre className="flex-1 p-6 font-mono text-xs text-emerald-400 bg-slate-950 overflow-auto leading-relaxed">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
};
