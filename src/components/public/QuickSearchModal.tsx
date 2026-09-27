import React, { useState, useEffect } from 'react';
import { useCms } from '../../lib/store';
import { IconRenderer } from '../ui/IconRenderer';
import {
  Search,
  Command,
  Wrench,
  Folder,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (slug: string) => void;
  onSelectSubCategory: (catSlug: string, subSlug: string) => void;
  onSelectTool: (slug: string) => void;
}

export const QuickSearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onSelectSubCategory,
  onSelectTool,
}) => {
  const { publicCategories, publicSubCategories, publicTools } = useCms();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // toggle search handled in header
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search Results
  const matchedTools = publicTools.filter(
    (t) =>
      t.title.toLowerCase().includes(cleanQuery) ||
      t.shortSummary.toLowerCase().includes(cleanQuery) ||
      t.slug.toLowerCase().includes(cleanQuery)
  );

  const matchedCategories = publicCategories.filter(
    (c) =>
      c.name.toLowerCase().includes(cleanQuery) ||
      c.description.toLowerCase().includes(cleanQuery) ||
      c.slug.toLowerCase().includes(cleanQuery)
  );

  const matchedSubCategories = publicSubCategories.filter(
    (s) =>
      s.name.toLowerCase().includes(cleanQuery) ||
      s.description.toLowerCase().includes(cleanQuery) ||
      s.slug.toLowerCase().includes(cleanQuery)
  );

  const hasResults =
    matchedTools.length > 0 || matchedCategories.length > 0 || matchedSubCategories.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search SEO tools, calculators, schemas, or categories..."
            className="w-full text-sm bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
          />
          <kbd className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-4">
          {!hasResults && query && (
            <div className="text-center py-10 text-slate-400 text-xs">
              No matching SEO tools or categories found for "{query}".
            </div>
          )}

          {!query && (
            <div className="text-center py-6 text-slate-400 text-xs">
              Start typing to instantly query the live SEO taxonomy index.
            </div>
          )}

          {/* Tools */}
          {matchedTools.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
                SEO Tools &amp; Calculators
              </span>
              {matchedTools.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    onSelectTool(t.slug);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center text-slate-700">
                      <IconRenderer name={t.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                        {t.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{t.shortSummary}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Categories */}
          {matchedCategories.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
                Main Categories
              </span>
              {matchedCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(c.slug);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Folder className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{c.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Sub-Categories */}
          {matchedSubCategories.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
                Sub-Categories
              </span>
              {matchedSubCategories.map((s) => {
                const parent = publicCategories.find((c) => c.id === s.categoryId);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      if (parent) onSelectSubCategory(parent.slug, s.slug);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{s.name}</div>
                        {parent && (
                          <div className="text-[11px] text-slate-400">in {parent.name}</div>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 shrink-0" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
