import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import { IconRenderer } from '../ui/IconRenderer';
import {
  Search,
  Command,
  Sliders,
  ChevronDown,
  Layers,
  Bot,
  FileCode,
  Sparkles,
  Menu,
  X,
  Folder,
} from 'lucide-react';

interface Props {
  onOpenAdmin: () => void;
  onOpenSearch: () => void;
  onNavigateHome: () => void;
  onNavigateCategory: (slug: string) => void;
  onNavigateSubCategory: (catSlug: string, subSlug: string) => void;
  onNavigateTool: (slug: string) => void;
  onOpenSitemapModal: () => void;
  onOpenRobotsModal: () => void;
}

export const Header: React.FC<Props> = ({
  onOpenAdmin,
  onOpenSearch,
  onNavigateHome,
  onNavigateCategory,
  onNavigateSubCategory,
  onNavigateTool,
  onOpenSitemapModal,
  onOpenRobotsModal,
}) => {
  const { publicCategories, publicSubCategories, publicTools } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownCatId, setActiveDropdownCatId] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base font-serif shadow-xs group-hover:scale-105 transition-transform">
              V
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                VERITAS <span className="font-serif italic font-normal text-slate-600">SEO</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 font-mono">Enterprise Platform</span>
            </div>
          </button>

          {/* Desktop Category Dropdown Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
            {publicCategories.slice(0, 4).map((cat) => {
              const childSubs = publicSubCategories.filter((s) => s.categoryId === cat.id);

              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdownCatId(cat.id)}
                  onMouseLeave={() => setActiveDropdownCatId(null)}
                >
                  <button
                    type="button"
                    onClick={() => onNavigateCategory(cat.slug)}
                    className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                      activeDropdownCatId === cat.id
                        ? 'bg-slate-100 text-slate-900'
                        : 'hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <IconRenderer name={cat.icon} className="w-3.5 h-3.5 text-slate-500" />
                    <span>{cat.name}</span>
                    {childSubs.length > 0 && <ChevronDown className="w-3 h-3 text-slate-400" />}
                  </button>

                  {/* Mega-Dropdown Menu */}
                  {activeDropdownCatId === cat.id && childSubs.length > 0 && (
                    <div className="absolute left-0 top-full pt-1.5 w-64 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-3 space-y-2">
                        <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {cat.name} Hubs
                        </div>
                        {childSubs.map((sub) => (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              onNavigateSubCategory(cat.slug, sub.slug);
                              setActiveDropdownCatId(null);
                            }}
                            className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 text-xs flex items-center justify-between group"
                          >
                            <span className="font-semibold group-hover:text-emerald-700">{sub.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {publicTools.filter((t) => t.subCategoryId === sub.id).length} tools
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button (Cmd + K) */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 rounded-xl text-xs font-medium transition-all"
            title="Press Cmd+K to search"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Search SEO tools...</span>
            <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Quick Sitemap & Robots Inspection Modals */}
          <button
            type="button"
            onClick={onOpenSitemapModal}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            title="View live XML sitemap feed"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            <span>sitemap.xml</span>
          </button>

          <button
            type="button"
            onClick={onOpenRobotsModal}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            title="View robots.txt directives"
          >
            <Bot className="w-3.5 h-3.5 text-slate-500" />
            <span>robots.txt</span>
          </button>

          {/* Admin CMS Button */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-4 animate-in slide-in-from-top-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
            Categories &amp; Hubs
          </div>
          {publicCategories.map((cat) => (
            <div key={cat.id} className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  onNavigateCategory(cat.slug);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50 rounded-xl flex items-center gap-2"
              >
                <IconRenderer name={cat.icon} className="w-4 h-4 text-slate-600" />
                <span>{cat.name}</span>
              </button>
              <div className="pl-6 space-y-1">
                {publicSubCategories
                  .filter((s) => s.categoryId === cat.id)
                  .map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        onNavigateSubCategory(cat.slug, sub.slug);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg block"
                    >
                      ↳ {sub.name}
                    </button>
                  ))}
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-slate-100 flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                onOpenSitemapModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center bg-slate-100 rounded-xl font-medium"
            >
              sitemap.xml
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenRobotsModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center bg-slate-100 rounded-xl font-medium"
            >
              robots.txt
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
