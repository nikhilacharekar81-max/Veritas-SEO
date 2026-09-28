'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useCms, DEFAULT_CONTENT_BLOCKS } from '../../lib/store';
import { generateId, normalizeRichHtml, htmlToPlainText, plainTextToHtml } from '../../lib/utils';

const RichTextEditor = dynamic(
  () => import('./RichTextEditor').then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 text-center text-slate-400 font-mono text-xs animate-pulse">
        Loading Rich Editor...
      </div>
    ),
  }
);
import {
  Sparkles,
  Search,
  Plus,
  RotateCcw,
  Trash2,
  Check,
  ExternalLink,
  Layers,
  Wrench,
  Folder,
  HelpCircle,
  BookOpen,
  FileText,
  Edit3,
} from 'lucide-react';

interface Props {
  onLaunchFrontendEditor?: () => void;
}

const BLOCK_LABELS: Record<string, { label: string; group: 'hero' | 'analyzer' | 'footer' | 'custom' }> = {
  'hero.badge': { label: 'Homepage Hero Top Badge', group: 'hero' },
  'hero.headline': { label: 'Homepage Hero H1 Headline', group: 'hero' },
  'hero.subheadline': { label: 'Homepage Hero Subheadline', group: 'hero' },
  'hero.categories_heading': { label: 'Homepage Category Hubs Heading', group: 'hero' },
  'hero.categories_subheading': { label: 'Homepage Category Hubs Subheading', group: 'hero' },
  'analyzer.comparison_title': { label: 'Comparison Table H2 Heading', group: 'analyzer' },
  'analyzer.contextual_title': { label: 'Contextual Analysis Card Heading', group: 'analyzer' },
  'analyzer.contextual_desc': { label: 'Contextual Analysis Card Description', group: 'analyzer' },
  'analyzer.matrix_title': { label: 'Frequency Matrix Card Heading', group: 'analyzer' },
  'analyzer.matrix_desc': { label: 'Frequency Matrix Card Description', group: 'analyzer' },
  'analyzer.section1_title': { label: 'Section 1 (H2): Why Modern SEO Requires N-Gram Analysis', group: 'analyzer' },
  'analyzer.section1_intro': { label: 'Section 1: Intro Paragraph', group: 'analyzer' },
  'analyzer.section1_ngram1': { label: 'Section 1: 1-Gram (Unigram) Definition', group: 'analyzer' },
  'analyzer.section1_ngram2': { label: 'Section 1: 2-Gram (Bigram) Definition', group: 'analyzer' },
  'analyzer.section1_ngram3': { label: 'Section 1: 3-Gram (Trigram) Definition', group: 'analyzer' },
  'analyzer.section1_ngram4': { label: 'Section 1: 4-Gram (Quadgram) Definition', group: 'analyzer' },
  'analyzer.section1_outro': { label: 'Section 1: Closing Summary Paragraph', group: 'analyzer' },
  'analyzer.section2_title': { label: 'Section 2 (H2): Key Features Heading', group: 'analyzer' },
  'analyzer.feature1_title': { label: 'Feature 1 Title: Live Visual Distribution Map', group: 'analyzer' },
  'analyzer.feature1_desc': { label: 'Feature 1 Description: Distribution Map', group: 'analyzer' },
  'analyzer.feature2_title': { label: 'Feature 2 Title: Prominence & Metric Ranking', group: 'analyzer' },
  'analyzer.feature2_desc': { label: 'Feature 2 Description: Prominence Score', group: 'analyzer' },
  'analyzer.feature3_title': { label: 'Feature 3 Title: Color-Coded Target Diagnostics', group: 'analyzer' },
  'analyzer.feature4_title': { label: 'Feature 4 Title: Advanced Lexical Metrics', group: 'analyzer' },
  'analyzer.feature4_desc': { label: 'Feature 4 Description: Lexical Diversity', group: 'analyzer' },
  'analyzer.feature5_title': { label: 'Feature 5 Title: 100% Client-Side Privacy', group: 'analyzer' },
  'analyzer.feature5_desc': { label: 'Feature 5 Description: Client-Side Privacy', group: 'analyzer' },
  'footer.tagline': { label: 'Footer Platform Tagline', group: 'footer' },
  'footer.copyright': { label: 'Footer Copyright Notice', group: 'footer' },
};

export const ContentManager: React.FC<Props> = ({ onLaunchFrontendEditor }) => {
  const {
    contentBlocks,
    setContentBlock,
    deleteContentBlock,
    resetContentBlocks,
    tools,
    updateTool,
    categories,
    updateCategory,
    setIsFrontendEditMode,
  } = useCms();

  const [activeMode, setActiveMode] = useState<'blocks' | 'tools' | 'categories'>('blocks');
  const [groupFilter, setGroupFilter] = useState<'all' | 'hero' | 'analyzer' | 'footer' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKey, setSelectedKey] = useState<string>(
    contentBlocks[0]?.key || 'analyzer.section1_title'
  );
  const [newKey, setNewKey] = useState('');
  const [newContent, setNewContent] = useState('');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Tool Content Editor state
  const [selectedToolId, setSelectedToolId] = useState<string>(
    tools.find((t) => t.id === 'tool_keyword_density')?.id || tools[0]?.id || ''
  );

  // Category Content Editor state
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || '');

  useEffect(() => {
    if (!selectedKey && contentBlocks.length > 0) {
      setSelectedKey(contentBlocks[0].key);
    }
  }, [contentBlocks, selectedKey]);

  useEffect(() => {
    if (!selectedToolId && tools.length > 0) {
      setSelectedToolId(tools.find((t) => t.id === 'tool_keyword_density')?.id || tools[0].id);
    }
  }, [tools, selectedToolId]);

  useEffect(() => {
    if (!selectedCategoryId && categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  const showSavedToast = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 2500);
  };

  const filteredBlocks = contentBlocks.filter((block) => {
    const meta = BLOCK_LABELS[block.key] || { label: block.key, group: 'custom' };
    const matchesGroup = groupFilter === 'all' || meta.group === groupFilter;
    const matchesSearch =
      block.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meta.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const activeBlock =
    contentBlocks.find((b) => b.key === selectedKey) || filteredBlocks[0] || contentBlocks[0];
  const defaultForActiveBlock = DEFAULT_CONTENT_BLOCKS.find((d) => d.key === activeBlock?.key);

  const activeTool = tools.find((t) => t.id === selectedToolId) || tools[0];
  const activeCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];

  return (
    <div className="space-y-6">
      {/* Top Studio Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              Visual &amp; Structured CMS
            </span>
            {savedNotice && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-900 text-emerald-400 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3 h-3" /> {savedNotice}
              </span>
            )}
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Content Manager &amp; Front-End Inline Editor
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl">
            Modify any page section, SEO tool headline, educational guide, FAQ, or category copy below — or launch the Live Front-End Visual Editor to click and edit text directly on the page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setIsFrontendEditMode(true);
              if (onLaunchFrontendEditor) onLaunchFrontendEditor();
            }}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Launch Live Front-End Editor</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              resetContentBlocks();
              showSavedToast('All blocks restored to defaults');
            }}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            title="Restore all default content blocks"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveMode('blocks')}
          className={`flex-1 min-w-[180px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeMode === 'blocks'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Page &amp; Section Content Blocks ({contentBlocks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('tools')}
          className={`flex-1 min-w-[180px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeMode === 'tools'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>SEO Tool Copy, Blueprints &amp; FAQs ({tools.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('categories')}
          className={`flex-1 min-w-[180px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeMode === 'categories'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span>Category Hub Copy ({categories.length})</span>
        </button>
      </div>

      {/* MODE 1: PAGE & SECTION CONTENT BLOCKS */}
      {activeMode === 'blocks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar: Block Selector & Filter */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search content blocks by section or text..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            {/* Section Group Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All' },
                { id: 'analyzer', label: 'N-Gram Blueprint' },
                { id: 'hero', label: 'Homepage Hero' },
                { id: 'footer', label: 'Footer' },
                { id: 'custom', label: 'Custom' },
              ].map((grp) => (
                <button
                  key={grp.id}
                  type="button"
                  onClick={() => setGroupFilter(grp.id as typeof groupFilter)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    groupFilter === grp.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {grp.label}
                </button>
              ))}
            </div>

            {/* Scrollable Block List */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {filteredBlocks.map((blk) => {
                const meta = BLOCK_LABELS[blk.key] || { label: blk.key, group: 'custom' };
                const isSelected = activeBlock?.key === blk.key;
                return (
                  <button
                    key={blk.id}
                    type="button"
                    onClick={() => setSelectedKey(blk.key)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200/70 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold truncate">{meta.label}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-slate-800 text-emerald-400' : 'bg-white text-slate-500 border border-slate-200'
                        }`}
                      >
                        {blk.key}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] line-clamp-2 ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {htmlToPlainText(blk.content)}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Add Custom Content Block */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Create New Content Block
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder="Block key (e.g. promo.banner)"
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    const cleanKey = newKey.trim();
                    if (!cleanKey) return;
                    setContentBlock(cleanKey, newContent.trim() || 'New editable content block');
                    setSelectedKey(cleanKey);
                    setNewKey('');
                    setNewContent('');
                    showSavedToast(`Created block "${cleanKey}"`);
                  }}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Create
                </button>
              </div>
            </div>
          </div>

          {/* Right Pane: Active Block Editor */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            {activeBlock ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {activeBlock.key}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {BLOCK_LABELS[activeBlock.key]?.label || activeBlock.key}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {defaultForActiveBlock && activeBlock.content !== defaultForActiveBlock.content && (
                      <button
                        type="button"
                        onClick={() => {
                          setContentBlock(activeBlock.key, defaultForActiveBlock.content);
                          showSavedToast(`Reset "${activeBlock.key}" to default`);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Restore Default
                      </button>
                    )}

                    {!defaultForActiveBlock && (
                      <button
                        type="button"
                        onClick={() => {
                          deleteContentBlock(activeBlock.key);
                          setSelectedKey(contentBlocks[0]?.key || '');
                          showSavedToast(`Deleted block "${activeBlock.key}"`);
                        }}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Direct Text Editor (Pure Plain Text — Preserves Newlines & Paragraphs) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Quick Plain Text Editor (Press Enter once for line break, twice for new paragraph)</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {htmlToPlainText(activeBlock.content).length} chars
                    </span>
                  </label>
                  <textarea
                    value={htmlToPlainText(activeBlock.content)}
                    onChange={(e) => {
                      setContentBlock(activeBlock.key, plainTextToHtml(e.target.value));
                    }}
                    rows={4}
                    className="w-full p-3.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
                  />
                </div>

                {/* Rich Text Editor for HTML Formatting */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Rich Visual Editor (Bold, Italic, Lists, Headings, Line Breaks &amp; Paragraph Spacing)
                  </label>
                  <RichTextEditor
                    content={normalizeRichHtml(activeBlock.content)}
                    onChange={(html) => {
                      setContentBlock(activeBlock.key, normalizeRichHtml(html));
                    }}
                  />
                </div>

                {/* Live Rendered Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Live Front-End Render Preview
                  </span>
                  <div
                    className="veritas-rich-content text-sm text-slate-800 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: normalizeRichHtml(activeBlock.content) || '<em>Empty content</em>',
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Select a content block on the left to start editing.
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: SEO TOOL PAGE CONTENT, EDUCATIONAL BLUEPRINTS & FAQS */}
      {activeMode === 'tools' && activeTool && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Select SEO Tool Page to Edit
              </label>
              <select
                value={activeTool.id}
                onChange={(e) => setSelectedToolId(e.target.value)}
                className="px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 min-w-[300px]"
              >
                {tools.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} (/tool/{t.slug})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                Auto-saves to Live Page &amp; Schema.org JSON-LD
              </span>
            </div>
          </div>

          {/* Hero Headline & Subheadline & SEO Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Hero H1 Headline
              </label>
              <input
                type="text"
                value={activeTool.title}
                onChange={(e) => {
                  updateTool(activeTool.id, { title: e.target.value });
                  showSavedToast('Updated Tool H1 Headline');
                }}
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                SEO Title Tag (&lt;title&gt;)
              </label>
              <input
                type="text"
                value={activeTool.seo.metaTitle}
                onChange={(e) => {
                  updateTool(activeTool.id, {
                    seo: { ...activeTool.seo, metaTitle: e.target.value, ogTitle: e.target.value },
                  });
                  showSavedToast('Updated SEO Title Tag');
                }}
                className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Hero Subheadline (Short Summary)
              </label>
              <textarea
                rows={3}
                value={activeTool.shortSummary}
                onChange={(e) => {
                  updateTool(activeTool.id, { shortSummary: e.target.value });
                  showSavedToast('Updated Tool Subheadline');
                }}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                SEO Meta Description
              </label>
              <textarea
                rows={3}
                value={activeTool.seo.metaDescription}
                onChange={(e) => {
                  updateTool(activeTool.id, {
                    seo: {
                      ...activeTool.seo,
                      metaDescription: e.target.value,
                      ogDescription: e.target.value,
                    },
                  });
                  showSavedToast('Updated Meta Description');
                }}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
              />
            </div>
          </div>

          {/* Educational Content: How It Works & Formula */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Educational Architecture &amp; Formula Methodology
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  How It Works &amp; Why It Matters
                </label>
                <textarea
                  rows={4}
                  value={activeTool.educationalContent.howItWorks}
                  onChange={(e) => {
                    updateTool(activeTool.id, {
                      educationalContent: {
                        ...activeTool.educationalContent,
                        howItWorks: e.target.value,
                      },
                    });
                    showSavedToast('Updated How It Works');
                  }}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Exact Formula &amp; Diagnostic Methodology
                </label>
                <textarea
                  rows={4}
                  value={activeTool.educationalContent.formulaMethodology}
                  onChange={(e) => {
                    updateTool(activeTool.id, {
                      educationalContent: {
                        ...activeTool.educationalContent,
                        formulaMethodology: e.target.value,
                      },
                    });
                    showSavedToast('Updated Formula Methodology');
                  }}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions (FAQ) Editor */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                Frequently Asked Questions (FAQPage Schema)
              </h3>
              <button
                type="button"
                onClick={() => {
                  const nextFaqs = [
                    ...activeTool.faqs,
                    {
                      id: generateId('faq'),
                      question: 'New Frequently Asked Question?',
                      answer: 'Enter your detailed SEO answer here.',
                    },
                  ];
                  updateTool(activeTool.id, { faqs: nextFaqs });
                  showSavedToast('Added new FAQ item');
                }}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </button>
            </div>

            <div className="space-y-3">
              {activeTool.faqs.map((faq, idx) => (
                <div
                  key={faq.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-emerald-700">
                      FAQ #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const nextFaqs = activeTool.faqs.filter((f) => f.id !== faq.id);
                        updateTool(activeTool.id, { faqs: nextFaqs });
                        showSavedToast('Removed FAQ item');
                      }}
                      className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const nextFaqs = activeTool.faqs.map((f) =>
                        f.id === faq.id ? { ...f, question: e.target.value } : f
                      );
                      updateTool(activeTool.id, { faqs: nextFaqs });
                    }}
                    placeholder="Question"
                    className="w-full px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                  />

                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => {
                      const nextFaqs = activeTool.faqs.map((f) =>
                        f.id === faq.id ? { ...f, answer: e.target.value } : f
                      );
                      updateTool(activeTool.id, { faqs: nextFaqs });
                    }}
                    placeholder="Answer"
                    className="w-full px-3 py-2 text-xs sm:text-sm text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: CATEGORY HUB COPY EDITOR */}
      {activeMode === 'categories' && activeCategory && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Select Category Hub to Edit
            </label>
            <select
              value={activeCategory.id}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 min-w-[280px]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} (/category/{c.slug})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Category Hub Name (H1)</label>
              <input
                type="text"
                value={activeCategory.name}
                onChange={(e) => {
                  updateCategory(activeCategory.id, { name: e.target.value });
                  showSavedToast('Updated Category Name');
                }}
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">SEO Title Tag</label>
              <input
                type="text"
                value={activeCategory.seo.metaTitle}
                onChange={(e) => {
                  updateCategory(activeCategory.id, {
                    seo: { ...activeCategory.seo, metaTitle: e.target.value },
                  });
                  showSavedToast('Updated Category Meta Title');
                }}
                className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block">Category Hub Description</label>
              <textarea
                rows={3}
                value={activeCategory.description}
                onChange={(e) => {
                  updateCategory(activeCategory.id, { description: e.target.value });
                  showSavedToast('Updated Category Description');
                }}
                className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
