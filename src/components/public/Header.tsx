import React, { useState } from 'react';
import Link from 'next/link';
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
  Edit3,
  Check,
  Globe,
  Copy,
  ArrowLeft,
  ArrowRight,
  Home,
  FileText,
} from 'lucide-react';

interface Props {
  currentPath?: string;
  onNavigateByPath?: (path: string) => void;
  onOpenAdmin?: () => void;
  onOpenSearch?: () => void;
  onNavigateHome?: () => void;
  onNavigateCategory?: (slug: string) => void;
  onNavigateSubCategory?: (catSlug: string, subSlug: string) => void;
  onNavigateTool?: (slug: string) => void;
  onNavigateBlog?: () => void;
  onOpenSitemapModal?: () => void;
  onOpenRobotsModal?: () => void;
}

export const Header: React.FC<Props> = ({
  currentPath = '/',
  onNavigateByPath,
  onOpenAdmin = () => {},
  onOpenSearch = () => {},
  onNavigateHome,
  onNavigateCategory,
  onNavigateSubCategory,
  onNavigateTool,
  onNavigateBlog,
  onOpenSitemapModal = () => {},
  onOpenRobotsModal = () => {},
}) => {
  const {
    publicCategories,
    publicSubCategories,
    publicTools,
    publicBlogPosts,
    isFrontendEditMode,
    setIsFrontendEditMode,
  } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownCatId, setActiveDropdownCatId] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const fullCanonicalUrl = `https://veritas-seo.dev${currentPath === '/' ? '' : currentPath}`;

  const handleCopyUrl = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullCanonicalUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Live Webpage URL & Route Address Bar (Visible in Preview) */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') window.history.back();
              }}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Browser Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') window.history.forward();
              }}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Browser Forward"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/"
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Home (/)"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Address Bar + Quick Route Directory Dropdown */}
          <div className="flex-1 max-w-2xl flex items-center gap-2 bg-slate-950/90 border border-slate-700/80 rounded-xl px-3 py-1 font-mono text-[11px]">
            <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-400 hidden sm:inline shrink-0">https://veritas-seo.dev</span>
            <select
              value={currentPath}
              onChange={(e) => {
                const nextPath = e.target.value;
                if (onNavigateByPath) {
                  onNavigateByPath(nextPath);
                }
              }}
              aria-label="Current Webpage URL Route"
              className="flex-1 bg-transparent text-emerald-300 font-bold focus:outline-none cursor-pointer truncate"
            >
              <option value="/" className="bg-slate-900 text-white">
                / (Homepage Hub)
              </option>
              <optgroup label="── Categories (/category/[slug]) ──" className="bg-slate-900 text-emerald-400">
                {publicCategories.map((c) => (
                  <option key={c.id} value={`/category/${c.slug}`} className="bg-slate-900 text-white">
                    /category/{c.slug} — {c.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="── Sub-Categories (/subcategory/[slug]) ──" className="bg-slate-900 text-emerald-400">
                {publicSubCategories.map((s) => (
                  <option key={s.id} value={`/subcategory/${s.slug}`} className="bg-slate-900 text-white">
                    /subcategory/{s.slug} — {s.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="── SEO Tools (/tool/[slug]) ──" className="bg-slate-900 text-emerald-400">
                {publicTools.map((t) => (
                  <option key={t.id} value={`/tool/${t.slug}`} className="bg-slate-900 text-white">
                    /tool/{t.slug} — {t.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="── Blog (/blog & /blog/[slug]) ──" className="bg-slate-900 text-emerald-400">
                <option value="/blog" className="bg-slate-900 text-white">
                  /blog — Veritas SEO Engineering Blog Hub
                </option>
                {publicBlogPosts.map((p) => (
                  <option key={p.id} value={`/blog/${p.slug}`} className="bg-slate-900 text-white">
                    /blog/{p.slug} — {p.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="── System ──" className="bg-slate-900 text-emerald-400">
                <option value="/admin" className="bg-slate-900 text-white">
                  /admin — Enterprise Taxonomy &amp; SEO CMS
                </option>
              </optgroup>
            </select>

            <button
              type="button"
              onClick={handleCopyUrl}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-sans font-semibold flex items-center gap-1 shrink-0 transition-colors"
              title="Copy Webpage URL"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400 hidden xl:inline">
            Route: <strong className="text-emerald-400">{currentPath}</strong>
          </span>
        </div>
      </div>

      {isFrontendEditMode && (
        <div className="bg-emerald-600 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between gap-4">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <Edit3 className="w-3.5 h-3.5 shrink-0" />
              <span>
                <strong>Front-End Visual Editor Active:</strong> Click the <strong>Edit</strong> button next to any heading, description, blueprint section, or FAQ to modify it. Clicking titles or cards directly will navigate as normal.
              </span>
            </span>
            <button
              type="button"
              onClick={() => setIsFrontendEditMode(false)}
              className="px-2.5 py-0.5 bg-white text-emerald-800 font-bold rounded-lg text-[11px] hover:bg-emerald-50 flex items-center gap-1 shrink-0"
            >
              <Check className="w-3 h-3" /> Done Editing
            </button>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
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
          </Link>

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
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                      activeDropdownCatId === cat.id
                        ? 'bg-slate-100 text-slate-900'
                        : 'hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <IconRenderer name={cat.icon} className="w-3.5 h-3.5 text-slate-500" />
                    <span>{cat.name}</span>
                    {childSubs.length > 0 && <ChevronDown className="w-3 h-3 text-slate-400" />}
                  </Link>

                  {/* Mega-Dropdown Menu */}
                  {activeDropdownCatId === cat.id && childSubs.length > 0 && (
                    <div className="absolute left-0 top-full pt-1.5 w-64 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-3 space-y-2">
                        <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {cat.name} Hubs
                        </div>
                        {childSubs.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/subcategory/${sub.slug}`}
                            onClick={() => setActiveDropdownCatId(null)}
                            className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 text-xs flex items-center justify-between group"
                          >
                            <span className="font-semibold group-hover:text-emerald-700">{sub.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {publicTools.filter((t) => t.subCategoryId === sub.id).length} tools
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/blog"
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                currentPath.startsWith('/blog')
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Blog</span>
            </Link>
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

          {/* Front-End Live Edit Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsFrontendEditMode(!isFrontendEditMode)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all border ${
              isFrontendEditMode
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}
            title="Toggle inline front-end text editing"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isFrontendEditMode ? 'Editing Page' : 'Edit Page'}
            </span>
          </button>

          {/* Admin CMS Button */}
          <Link
            href="/admin"
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </Link>

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
              <Link
                href={`/category/${cat.slug}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50 rounded-xl flex items-center gap-2"
              >
                <IconRenderer name={cat.icon} className="w-4 h-4 text-slate-600" />
                <span>{cat.name}</span>
              </Link>
              <div className="pl-6 space-y-1">
                {publicSubCategories
                  .filter((s) => s.categoryId === cat.id)
                  .map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/subcategory/${sub.slug}`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg block"
                    >
                      ↳ {sub.name}
                    </Link>
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
