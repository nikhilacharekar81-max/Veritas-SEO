import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import { ToolCard } from './ToolCard';
import { EditableText } from './EditableText';
import { IconRenderer } from '../ui/IconRenderer';
import {
  Search,
  Sparkles,
  Sliders,
  FolderTree,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface Props {
  onSelectCategory: (slug: string) => void;
  onSelectSubCategory: (catSlug: string, subSlug: string) => void;
  onSelectTool: (slug: string) => void;
  onOpenAdmin: () => void;
}

export const HeroSection: React.FC<Props> = ({
  onSelectCategory,
  onSelectSubCategory,
  onSelectTool,
  onOpenAdmin,
}) => {
  const { publicCategories, publicSubCategories, publicTools, seedDemoPresets, updateCategory } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  const filteredTools = publicTools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === 'all' || tool.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const isZeroState = publicCategories.length === 0 && publicTools.length === 0;

  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Hero Headline Landmark */}
      <section className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <EditableText
            blockKey="hero.badge"
            defaultContent="Enterprise Technical SEO & Precision Calculators"
            label="Hero Badge"
          />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          <EditableText
            blockKey="hero.headline"
            defaultContent='Precision SEO Engineering & <span class="font-serif italic font-normal text-slate-700">Taxonomy Suite</span>'
            label="Hero H1 Headline"
          />
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          <EditableText
            blockKey="hero.subheadline"
            defaultContent="Simulate Google SERP pixel truncation, calculate n-gram keyword density using exact Decimal.js math, generate Schema.org JSON-LD, and manage hierarchical SEO tool taxonomies."
            label="Hero Subheadline"
            multiline
          />
        </p>

        {/* Global Search Bar */}
        <div className="max-w-xl mx-auto pt-4">
          <div className="relative flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:border-slate-900 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SERP simulators, keyword analyzers, JSON-LD builders..."
              className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>
      </section>

      {/* ZERO DATA MANDATE: Professional Empty State */}
      {isZeroState ? (
        <section className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-xs space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-800">
            <FolderTree className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Taxonomy &amp; Tools Registry Initialized</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              The platform is running in clean zero-data state with 0 categories, 0 sub-categories, and 0 SEO tools. All taxonomy entities and SEO tools are managed in real time via the Admin Panel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Sliders className="w-4 h-4" /> Open Admin Panel &amp; Create Categories
            </button>
            <button
              type="button"
              onClick={() => {
                seedDemoPresets();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" /> One-Click Seed Demo Suite
            </button>
          </div>

          {/* Feature Highlight Pill Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-left text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-600" /> 3-Tier Hierarchy
              </span>
              <p className="text-slate-500 text-[11px]">
                Main Categories ➔ Sub-Categories ➔ SEO Tools with instant cascading visibility.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-600" /> 301 Redirect Guard
              </span>
              <p className="text-slate-500 text-[11px]">
                Automatic 301 rewrite mappings protect Googlebot rankings during slug changes.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-slate-600" /> schema-dts JSON-LD
              </span>
              <p className="text-slate-500 text-[11px]">
                Google-compliant WebApplication, FAQPage, and BreadcrumbList rich markup.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="space-y-8">
          {/* Category Filter Navigation Bar */}
          {publicCategories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 px-4">
              <button
                type="button"
                onClick={() => setSelectedCategoryFilter('all')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                All Tools ({publicTools.length})
              </button>

              {publicCategories.map((cat) => {
                const count = publicTools.filter((t) => t.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <IconRenderer name={cat.icon} className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        selectedCategoryFilter === cat.id
                          ? 'bg-slate-800 text-slate-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Tools Grid Section */}
          <section aria-labelledby="tools-directory-heading" className="max-w-7xl mx-auto px-4 sm:px-8">
            <h2 id="tools-directory-heading" className="sr-only">
              SEO Tools Directory
            </h2>

            {filteredTools.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
                No published SEO tools found matching your current filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
                ))}
              </div>
            )}
          </section>

          {/* Main Category Hubs Showcase */}
          {publicCategories.length > 0 && selectedCategoryFilter === 'all' && !searchQuery && (
            <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
              <div className="border-t border-slate-200/80 pt-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    <EditableText
                      blockKey="hero.categories_heading"
                      defaultContent="Explore by Category Hub"
                      label="Category Hubs Heading"
                    />
                  </h2>
                  <p className="text-xs text-slate-500">
                    <EditableText
                      blockKey="hero.categories_subheading"
                      defaultContent="Deep dive into specialized sub-category workflows and diagnostic engines."
                      label="Category Hubs Subheading"
                    />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {publicCategories.map((cat) => {
                  const catTools = publicTools.filter((t) => t.categoryId === cat.id);
                  const catSubs = publicSubCategories.filter((s) => s.categoryId === cat.id);

                  return (
                    <div
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.slug)}
                      className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center text-slate-800 transition-colors">
                          <IconRenderer name={cat.icon} className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          <EditableText
                            value={cat.name}
                            onSave={(val) => updateCategory(cat.id, { name: val })}
                            label={`Category Name (${cat.slug})`}
                            allowHtml={false}
                          />
                        </h3>
                        <p className="text-xs text-slate-600">
                          <EditableText
                            value={cat.description}
                            onSave={(val) => updateCategory(cat.id, { description: val })}
                            label={`Category Description (${cat.slug})`}
                            multiline
                            allowHtml={false}
                          />
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
                        <span className="text-slate-400 font-mono text-[11px]">
                          {catSubs.length} sub-cats · {catTools.length} tools
                        </span>
                        <span className="flex items-center gap-1">
                          View Hub <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </section>
      )}
    </div>
  );
};
