import React, { useState, useEffect, useMemo } from 'react';
import { useCms } from '../../lib/store';
import {
  Search,
  Wrench,
  Folder,
  Layers,
  ShieldCheck,
  TrendingUp,
  GitFork,
  Bot,
  Database,
  ArrowRight,
  Sparkles,
  Command,
  X,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTool: (slug: string) => void;
  onNavigateToCategory: (slug: string) => void;
  onNavigateToAdminTab: (tab: string) => void;
}

export const CommandPalette: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigateToTool,
  onNavigateToCategory,
  onNavigateToAdminTab,
}) => {
  const { tools, categories, subCategories } = useCms();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();

    const toolItems = tools
      .filter((t) => t.title.toLowerCase().includes(q) || t.shortSummary.toLowerCase().includes(q) || t.engineType.includes(q))
      .map((t) => ({
        type: 'tool' as const,
        id: t.id,
        title: t.title,
        subtitle: t.shortSummary,
        icon: <Wrench className="w-4 h-4 text-emerald-600" />,
        action: () => onNavigateToTool(t.slug),
        badge: t.badge !== 'None' ? t.badge : 'Tool',
      }));

    const categoryItems = categories
      .filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
      .map((c) => ({
        type: 'category' as const,
        id: c.id,
        title: c.name,
        subtitle: c.description,
        icon: <Folder className="w-4 h-4 text-purple-600" />,
        action: () => onNavigateToCategory(c.slug),
        badge: 'Category',
      }));

    const adminActions = [
      {
        type: 'admin' as const,
        id: 'adm_analytics',
        title: 'Open Analytics Dashboard',
        subtitle: 'View real-time tool computations, calendar heatmap, and usage metrics',
        icon: <TrendingUp className="w-4 h-4 text-blue-600" />,
        action: () => onNavigateToAdminTab('analytics'),
        badge: 'Admin',
      },
      {
        type: 'admin' as const,
        id: 'adm_health',
        title: 'Run Site-Wide Technical SEO Audit',
        subtitle: 'Simulate Googlebot crawler across all categories, tools, and canonicals',
        icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
        action: () => onNavigateToAdminTab('health'),
        badge: 'Admin',
      },
      {
        type: 'admin' as const,
        id: 'adm_redirects',
        title: 'Manage 301 Redirect Registry',
        subtitle: 'Audit redirect chains, loop detections, and URL rewrite rules',
        icon: <GitFork className="w-4 h-4 text-amber-600" />,
        action: () => onNavigateToAdminTab('redirects'),
        badge: 'Admin',
      },
      {
        type: 'admin' as const,
        id: 'adm_robots',
        title: 'Robots.txt & XML Sitemap Manager',
        subtitle: 'Configure crawl rules, bot directives, and live sitemap index',
        icon: <Bot className="w-4 h-4 text-indigo-600" />,
        action: () => onNavigateToAdminTab('robots_sitemap'),
        badge: 'Admin',
      },
      {
        type: 'admin' as const,
        id: 'adm_backup',
        title: 'CMS Database Backup & JSON Seed',
        subtitle: 'Export complete platform snapshot or restore factory demo presets',
        icon: <Database className="w-4 h-4 text-rose-600" />,
        action: () => onNavigateToAdminTab('backup'),
        badge: 'Admin',
      },
    ].filter((a) => a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q));

    return [...toolItems, ...categoryItems, ...adminActions];
  }, [query, tools, categories, onNavigateToTool, onNavigateToCategory, onNavigateToAdminTab]);

  // Handle arrow key navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      results[selectedIndex].action();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-start justify-center pt-[12vh] p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a tool name, category, diagnostic engine, or admin command..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 flex-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No matching tools, categories, or commands found for "{query}".
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected ? 'bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-slate-800 text-emerald-400'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-300'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 shadow-2xs">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 shadow-2xs">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 shadow-2xs">↵</kbd> to select</span>
          </div>
          <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 shadow-2xs">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
