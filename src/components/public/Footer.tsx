import React from 'react';
import { useCms } from '../../lib/store';
import { EditableText } from './EditableText';
import { ShieldCheck, FileCode, Bot, Sparkles } from 'lucide-react';

interface Props {
  onNavigateHome: () => void;
  onNavigateCategory: (slug: string) => void;
  onNavigateTool: (slug: string) => void;
  onOpenSitemapModal: () => void;
  onOpenRobotsModal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<Props> = ({
  onNavigateHome,
  onNavigateCategory,
  onNavigateTool,
  onOpenSitemapModal,
  onOpenRobotsModal,
  onOpenAdmin,
}) => {
  const { publicCategories, publicTools } = useCms();

  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Platform Brand */}
          <div className="space-y-3 md:col-span-1">
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm font-serif">
                V
              </div>
              <span className="font-extrabold text-sm tracking-tight text-slate-900">
                VERITAS <span className="font-serif italic font-normal text-slate-600">SEO</span>
              </span>
            </button>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              <EditableText
                blockKey="footer.tagline"
                defaultContent="Enterprise SEO tools platform & taxonomy CMS engineered with semantic HTML5, Decimal.js exact precision math, and automated schema-dts structured data."
                label="Footer Tagline"
                multiline
              />
            </p>
            <div className="flex items-center gap-2 text-emerald-700 font-mono text-[10px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> CLS = 0.00 Certified
            </div>
          </div>

          {/* Col 2: Category Hubs */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider text-slate-900 text-[11px] block">
              Active Category Hubs
            </span>
            <ul className="space-y-1.5">
              {publicCategories.length === 0 ? (
                <li className="text-slate-400 italic">No categories published yet.</li>
              ) : (
                publicCategories.slice(0, 5).map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => onNavigateCategory(cat.slug)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Col 3: Popular Tools */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider text-slate-900 text-[11px] block">
              Calculators &amp; Engines
            </span>
            <ul className="space-y-1.5">
              {publicTools.length === 0 ? (
                <li className="text-slate-400 italic">No tools published yet.</li>
              ) : (
                publicTools.slice(0, 5).map((tool) => (
                  <li key={tool.id}>
                    <button
                      type="button"
                      onClick={() => onNavigateTool(tool.slug)}
                      className="hover:text-slate-900 transition-colors truncate max-w-[200px] block"
                    >
                      {tool.title}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Col 4: Crawl & Architecture */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider text-slate-900 text-[11px] block">
              Crawl &amp; Governance
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  type="button"
                  onClick={onOpenSitemapModal}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <FileCode className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dynamic sitemap.xml</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenRobotsModal}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5 text-slate-400" />
                  <span>Crawler robots.txt</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1.5 font-semibold text-slate-900"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Taxonomy Admin Panel</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px] font-mono">
          <span>
            <EditableText
              blockKey="footer.copyright"
              defaultContent="© 2026 Veritas SEO Platform. All rights reserved."
              label="Footer Copyright"
            />
          </span>
          <span>Googlebot &amp; Bingbot Ready · JSON-LD &middot; Zod Runtime Validated</span>
        </div>
      </div>
    </footer>
  );
};
