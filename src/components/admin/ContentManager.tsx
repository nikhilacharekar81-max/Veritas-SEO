'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useCms, DEFAULT_CONTENT_BLOCKS } from '../../lib/store';
import { generateId, normalizeRichHtml, htmlToPlainText, plainTextToHtml } from '../../lib/utils';
import { calculatePixelWidth, calculateReadability } from '../../lib/seo-math';
import { ensureToolSections, getDefaultToolSections, STANDARD_SECTION_TYPES } from '../../lib/tool-sections';
import type { ToolSection, ToolSectionType } from '../../lib/schemas';
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
  Download,
  Upload,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Monitor,
  Smartphone,
  Copy,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
  Code2,
  RefreshCw,
  History,
  Sliders,
  Type,
  Gauge,
  ListOrdered,
  Maximize2,
  ToggleLeft,
  ToggleRight,
  Settings2,
  LayoutTemplate,
  CheckSquare,
  Square,
  Power,
  EyeOff,
} from 'lucide-react';

const RichTextEditor = dynamic(
  () => import('./RichTextEditor').then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 text-center text-slate-400 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl animate-pulse">
        Initializing Rich Visual Content Studio...
      </div>
    ),
  }
);

interface Props {
  onLaunchFrontendEditor?: () => void;
}

const BLOCK_LABELS: Record<
  string,
  { label: string; group: 'hero' | 'analyzer' | 'serp' | 'footer' | 'custom' }
> = {
  // Hero & Global
  'hero.badge': { label: 'Homepage Hero Top Badge', group: 'hero' },
  'hero.headline': { label: 'Homepage Hero H1 Headline', group: 'hero' },
  'hero.subheadline': { label: 'Homepage Hero Subheadline', group: 'hero' },
  'hero.categories_heading': { label: 'Homepage Category Hubs Heading', group: 'hero' },
  'hero.categories_subheading': { label: 'Homepage Category Hubs Subheading', group: 'hero' },

  // N-Gram & Keyword Density Analyzer Guide
  'analyzer.comparison_title': { label: 'Comparison Table H2 Heading', group: 'analyzer' },
  'analyzer.table_th1': { label: 'Comparison Table: Column 1 Header', group: 'analyzer' },
  'analyzer.table_th2': { label: 'Comparison Table: Column 2 Header', group: 'analyzer' },
  'analyzer.table_th3': { label: 'Comparison Table: Column 3 Header', group: 'analyzer' },
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

  // SERP Simulator Guide
  'serp_guide.main_heading': { label: 'SERP Guide: Main H2 Headline', group: 'serp' },
  'serp_guide.sub_heading': { label: 'SERP Guide: Subheading / Lead', group: 'serp' },
  'serp_guide.p1': { label: 'SERP Guide: Overview Paragraph 1', group: 'serp' },
  'serp_guide.p2': { label: 'SERP Guide: Overview Paragraph 2', group: 'serp' },
  'serp_guide.p3': { label: 'SERP Guide: Overview Paragraph 3', group: 'serp' },
  'serp_guide.why_heading': { label: 'SERP Guide: Why Check Width Heading', group: 'serp' },
  'serp_guide.why_p1': { label: 'SERP Guide: 50-60 Characters Discussion', group: 'serp' },
  'serp_guide.why_p2': { label: 'SERP Guide: Horizontal Space Explanation', group: 'serp' },
  'serp_guide.why_p3': { label: 'SERP Guide: Core Objective Statement', group: 'serp' },
  'serp_guide.how_heading': { label: 'SERP Guide: How to Use Heading', group: 'serp' },
  'serp_guide.what_heading': { label: 'SERP Guide: What is SERP Pixel Width', group: 'serp' },

  // Footer & Compliance
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
    subCategories,
    updateSubCategory,
    setIsFrontendEditMode,
  } = useCms();

  const [activeMode, setActiveMode] = useState<'blocks' | 'tools' | 'categories' | 'export_import'>('tools');
  const [groupFilter, setGroupFilter] = useState<'all' | 'hero' | 'analyzer' | 'serp' | 'footer' | 'custom'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'modified' | 'default'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKey, setSelectedKey] = useState<string>(contentBlocks[0]?.key || 'hero.headline');
  const [newKey, setNewKey] = useState('');
  const [newContent, setNewContent] = useState('');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeToolSubTab, setActiveToolSubTab] = useState<'sections' | 'meta' | 'guide' | 'steps' | 'faqs' | 'presets'>('sections');

  // Tool Content Editor state
  const [selectedToolId, setSelectedToolId] = useState<string>(
    tools.find((t) => t.id === 'tool_serp_pixel')?.id || tools[0]?.id || ''
  );

  // Section Editing Modal / Expansion State
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [isCreatingCustomSection, setIsCreatingCustomSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionSubtitle, setNewSectionSubtitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');

  // Category Content Editor state
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || '');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>(subCategories[0]?.id || '');

  // JSON Import/Export
  const [jsonExportPayload, setJsonExportPayload] = useState('');
  const [jsonImportInput, setJsonImportInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedKey && contentBlocks.length > 0) {
      setSelectedKey(contentBlocks[0].key);
    }
  }, [contentBlocks, selectedKey]);

  useEffect(() => {
    if (!selectedToolId && tools.length > 0) {
      setSelectedToolId(tools[0].id);
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

  // Content Blocks Metrics
  const blockStats = useMemo(() => {
    let modifiedCount = 0;
    contentBlocks.forEach((b) => {
      const defaultMatch = DEFAULT_CONTENT_BLOCKS.find((d) => d.key === b.key);
      if (!defaultMatch || defaultMatch.content !== b.content) {
        modifiedCount++;
      }
    });
    return {
      total: contentBlocks.length,
      modified: modifiedCount,
      defaults: contentBlocks.length - modifiedCount,
    };
  }, [contentBlocks]);

  // Filtered Content Blocks
  const filteredBlocks = useMemo(() => {
    return contentBlocks.filter((block) => {
      const meta = BLOCK_LABELS[block.key] || { label: block.key, group: 'custom' };
      const defaultMatch = DEFAULT_CONTENT_BLOCKS.find((d) => d.key === block.key);
      const isModified = !defaultMatch || defaultMatch.content !== block.content;

      const matchesGroup = groupFilter === 'all' || meta.group === groupFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'modified' && isModified) ||
        (statusFilter === 'default' && !isModified);

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        block.key.toLowerCase().includes(q) ||
        meta.label.toLowerCase().includes(q) ||
        block.content.toLowerCase().includes(q);

      return matchesGroup && matchesStatus && matchesSearch;
    });
  }, [contentBlocks, groupFilter, statusFilter, searchQuery]);

  const activeBlock =
    contentBlocks.find((b) => b.key === selectedKey) || filteredBlocks[0] || contentBlocks[0];
  const defaultForActiveBlock = DEFAULT_CONTENT_BLOCKS.find((d) => d.key === activeBlock?.key);
  const isBlockModified = defaultForActiveBlock && activeBlock?.content !== defaultForActiveBlock.content;

  // Active Tool & Sections
  const activeTool = tools.find((t) => t.id === selectedToolId) || tools[0];
  const activeCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];
  const activeSubCategory = subCategories.find((s) => s.id === selectedSubCategoryId) || subCategories[0];

  const currentToolSections: ToolSection[] = useMemo(() => {
    if (!activeTool) return [];
    return ensureToolSections(activeTool);
  }, [activeTool]);

  // Section Management Handlers
  const handleToggleSection = (sectionId: string) => {
    if (!activeTool) return;
    const sections = ensureToolSections(activeTool);
    const updated = sections.map((sec) =>
      sec.id === sectionId ? { ...sec, isEnabled: !sec.isEnabled } : sec
    );
    updateTool(activeTool.id, { sections: updated });
    const target = updated.find((s) => s.id === sectionId);
    showSavedToast(`Section "${target?.title || sectionId}" ${target?.isEnabled ? 'Enabled' : 'Disabled'}`);
  };

  const handleReorderSection = (sectionId: string, direction: 'up' | 'down') => {
    if (!activeTool) return;
    const sections = [...ensureToolSections(activeTool)];
    const index = sections.findIndex((s) => s.id === sectionId);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    // Swap positions
    const temp = sections[index];
    sections[index] = sections[targetIndex];
    sections[targetIndex] = temp;

    // Normalize display orders
    const normalized = sections.map((s, idx) => ({ ...s, displayOrder: idx }));
    updateTool(activeTool.id, { sections: normalized });
    showSavedToast(`Moved section ${direction}`);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!activeTool) return;
    const sections = ensureToolSections(activeTool);
    const updated = sections.filter((s) => s.id !== sectionId);
    updateTool(activeTool.id, { sections: updated });
    if (editingSectionId === sectionId) setEditingSectionId(null);
    showSavedToast('Deleted section from tool');
  };

  const handleUpdateSection = (sectionId: string, updates: Partial<ToolSection>) => {
    if (!activeTool) return;
    const sections = ensureToolSections(activeTool);
    const updated = sections.map((sec) => (sec.id === sectionId ? { ...sec, ...updates } : sec));
    updateTool(activeTool.id, { sections: updated });
    showSavedToast('Updated section configuration');
  };

  const handleCreateCustomSection = () => {
    if (!activeTool || !newSectionTitle.trim()) return;
    const sections = ensureToolSections(activeTool);
    const newSec: ToolSection = {
      id: generateId('sec_custom'),
      title: newSectionTitle.trim(),
      subtitle: newSectionSubtitle.trim() || undefined,
      type: 'custom_content',
      isEnabled: true,
      displayOrder: sections.length,
      content: newSectionContent.trim() || '<p>Enter your custom section content here.</p>',
    };
    const updated = [...sections, newSec];
    updateTool(activeTool.id, { sections: updated });
    setNewSectionTitle('');
    setNewSectionSubtitle('');
    setNewSectionContent('');
    setIsCreatingCustomSection(false);
    showSavedToast(`Added custom section "${newSec.title}"`);
  };

  const handleResetSections = () => {
    if (!activeTool) return;
    const defaults = getDefaultToolSections(activeTool);
    updateTool(activeTool.id, { sections: defaults });
    showSavedToast('Reset all sections to standard default order');
  };

  // Tool SEO Title & Desc metrics
  const activeToolTitleMetrics = useMemo(() => {
    if (!activeTool) return { pixelWidth: 0, isTruncated: false };
    return calculatePixelWidth(activeTool.seo?.metaTitle || activeTool.title, 18, previewDevice === 'mobile');
  }, [activeTool, previewDevice]);

  const activeToolDescMetrics = useMemo(() => {
    if (!activeTool) return { pixelWidth: 0, isTruncated: false };
    return calculatePixelWidth(activeTool.seo?.metaDescription || activeTool.shortSummary, 14, previewDevice === 'mobile');
  }, [activeTool, previewDevice]);

  // Readability for active tool How It Works
  const activeToolHowItWorksFlesch = useMemo(() => {
    if (!activeTool?.educationalContent?.howItWorks) return { fleschReadingEase: 70, readingEaseLabel: 'Fairly Easy' };
    return calculateReadability(activeTool.educationalContent.howItWorks);
  }, [activeTool?.educationalContent?.howItWorks]);

  // Handle JSON export
  const handleGenerateExport = () => {
    const payload = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      contentBlocks,
      tools: tools.map((t) => ({
        id: t.id,
        slug: t.slug,
        title: t.title,
        shortSummary: t.shortSummary,
        sections: ensureToolSections(t),
        educationalContent: t.educationalContent,
        faqs: t.faqs,
        seo: t.seo,
      })),
      categories: categories.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        description: c.description,
        seo: c.seo,
      })),
    };
    setJsonExportPayload(JSON.stringify(payload, null, 2));
    showSavedToast('Generated complete CMS backup payload');
  };

  // Handle JSON import
  const handleExecuteImport = () => {
    try {
      if (!jsonImportInput.trim()) {
        setImportStatus('Please paste a valid JSON backup string');
        return;
      }
      const data = JSON.parse(jsonImportInput);
      if (data.contentBlocks && Array.isArray(data.contentBlocks)) {
        data.contentBlocks.forEach((b: { key: string; content: string }) => {
          if (b.key && b.content) setContentBlock(b.key, b.content);
        });
      }
      if (data.tools && Array.isArray(data.tools)) {
        data.tools.forEach((t: Partial<ToolSection> & { id: string }) => {
          if (t.id) updateTool(t.id, t as any);
        });
      }
      setImportStatus('Successfully imported and applied all CMS content & sections!');
      showSavedToast('Import complete');
    } catch (err: any) {
      setImportStatus(`JSON Parse Error: ${err?.message || 'Invalid JSON format'}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP STATS & COMMAND BAR */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-white">
              Enterprise Headless CMS
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              Modular Sections Engine
            </span>
            {savedNotice && (
              <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-600 text-white flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> {savedNotice}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            Advanced Content &amp; Modular Sections Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Select any SEO tool from the dropdown to manage, edit, enable/disable, reorder, or delete page sections with instant live frontend synchronization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsFrontendEditMode(true);
              if (onLaunchFrontendEditor) onLaunchFrontendEditor();
            }}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>Launch Front-End Visual Editor</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              resetContentBlocks();
              showSavedToast('All content blocks restored to system defaults');
            }}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            title="Restore all default content blocks"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* 2. STATS KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Tools Managed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {tools.length}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">
              (100% active)
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Active Tool Sections
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {currentToolSections.filter((s) => s.isEnabled !== false).length}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">
              / {currentToolSections.length} total
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Global Content Blocks
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {blockStats.total}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">
              ({blockStats.modified} modified)
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Category Hubs
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {categories.length}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">
              ({subCategories.length} sub-hubs)
            </span>
          </div>
        </div>
      </div>

      {/* 3. PRIMARY MODE SWITCHER TABS */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveMode('tools')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeMode === 'tools'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <LayoutTemplate className="w-4 h-4 text-emerald-400" />
          <span>SEO Tools &amp; Sections Manager ({tools.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('blocks')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeMode === 'blocks'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Section Content Blocks ({contentBlocks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('categories')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeMode === 'categories'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Folder className="w-4 h-4 text-emerald-400" />
          <span>Category Hubs &amp; Sub-Taxonomy ({categories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveMode('export_import');
            handleGenerateExport();
          }}
          className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeMode === 'export_import'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export / Import JSON</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: SEO TOOLS & MODULAR SECTIONS MANAGER */}
      {/* ========================================================================= */}
      {activeMode === 'tools' && activeTool && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Tool Selector Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-200">
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Select SEO Tool to Manage Sections &amp; Copy
              </label>
              <select
                value={activeTool.id}
                onChange={(e) => {
                  setSelectedToolId(e.target.value);
                  setEditingSectionId(null);
                }}
                className="px-4 py-2.5 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 min-w-[320px]"
              >
                {tools.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} (/tool/{t.slug})
                  </option>
                ))}
              </select>
            </div>

            {/* Tool Sub-Tab Switcher */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl">
              {[
                { id: 'sections', label: `Page Sections (${currentToolSections.length})` },
                { id: 'meta', label: 'Meta & Headlines' },
                { id: 'guide', label: 'Educational Guide' },
                { id: 'steps', label: 'Step Tutorial' },
                { id: 'faqs', label: `FAQs (${activeTool.faqs?.length || 0})` },
                { id: 'presets', label: 'Default Presets' },
              ].map((subTab) => (
                <button
                  key={subTab.id}
                  type="button"
                  onClick={() => setActiveToolSubTab(subTab.id as typeof activeToolSubTab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeToolSubTab === subTab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {subTab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SUB-TAB 1: MODULAR SECTIONS ENGINE (EDIT, DELETE, ENABLE, DISABLE, REORDER) */}
          {activeToolSubTab === 'sections' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-emerald-600" />
                    Modular Page Sections for &quot;{activeTool.title}&quot;
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enable, disable, edit titles/content, reorder, or delete sections below. Changes reflect instantly on the public tool page.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingCustomSection(true)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Custom Section
                  </button>

                  <button
                    type="button"
                    onClick={handleResetSections}
                    className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 flex items-center gap-1"
                    title="Reset to default sections order"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Order
                  </button>
                </div>
              </div>

              {/* Create Custom Section Modal / Form */}
              {isCreatingCustomSection && (
                <div className="p-6 bg-emerald-50/70 border border-emerald-200/80 rounded-3xl space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      Create New Custom Page Section
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsCreatingCustomSection(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Section Title</label>
                      <input
                        type="text"
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        placeholder="e.g., Industry Benchmarks & Case Studies"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Section Subtitle / Description</label>
                      <input
                        type="text"
                        value={newSectionSubtitle}
                        onChange={(e) => setNewSectionSubtitle(e.target.value)}
                        placeholder="e.g., Performance standards for enterprise websites"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Section Content (HTML &amp; Rich Text)</label>
                    <textarea
                      rows={4}
                      value={newSectionContent}
                      onChange={(e) => setNewSectionContent(e.target.value)}
                      placeholder="Enter section text, recommendations, bullet points, or HTML..."
                      className="w-full p-3.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl leading-relaxed"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleCreateCustomSection}
                    disabled={!newSectionTitle.trim()}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-4 h-4" /> Save &amp; Add Section
                  </button>
                </div>
              )}

              {/* Sections List */}
              <div className="space-y-3">
                {currentToolSections.map((section, idx) => {
                  const isEnabled = section.isEnabled !== false;
                  const isCustom = section.type === 'custom_content';
                  const isEditing = editingSectionId === section.id;

                  return (
                    <div
                      key={section.id}
                      className={`rounded-2xl border transition-all ${
                        isEnabled
                          ? 'bg-white border-slate-200/90 shadow-2xs'
                          : 'bg-slate-50/80 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Left: Drag / Order Indicator & Info */}
                        <div className="flex items-start sm:items-center gap-3.5 flex-1">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </div>

                          <div className="space-y-0.5 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-slate-900">
                                {section.title}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                {section.type}
                              </span>
                              {isEnabled ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                                  <Check className="w-3 h-3" /> Enabled
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                                  <EyeOff className="w-3 h-3" /> Disabled
                                </span>
                              )}
                            </div>
                            {section.subtitle && (
                              <p className="text-xs text-slate-500 line-clamp-1">{section.subtitle}</p>
                            )}
                          </div>
                        </div>

                        {/* Right: Controls (Reorder, Enable/Disable, Edit, Delete) */}
                        <div className="flex items-center gap-1.5 self-end md:self-auto flex-wrap">
                          {/* Reorder Buttons */}
                          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
                            <button
                              type="button"
                              onClick={() => handleReorderSection(section.id, 'up')}
                              disabled={idx === 0}
                              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg transition-colors"
                              title="Move section up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReorderSection(section.id, 'down')}
                              disabled={idx === currentToolSections.length - 1}
                              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg transition-colors"
                              title="Move section down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Enable / Disable Toggle Button */}
                          <button
                            type="button"
                            onClick={() => handleToggleSection(section.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                              isEnabled
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            <Power className="w-3.5 h-3.5" />
                            <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
                          </button>

                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => setEditingSectionId(isEditing ? null : section.id)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isEditing ? 'Close' : 'Edit'}</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteSection(section.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            title="Delete section"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Section Editor */}
                      {isEditing && (
                        <div className="p-5 border-t border-slate-100 bg-slate-50/60 space-y-4 animate-in fade-in">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 block">Section Title</label>
                              <input
                                type="text"
                                value={section.title}
                                onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
                                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 block">Section Subtitle</label>
                              <input
                                type="text"
                                value={section.subtitle || ''}
                                onChange={(e) => handleUpdateSection(section.id, { subtitle: e.target.value })}
                                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-600"
                              />
                            </div>
                          </div>

                          {isCustom && (
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 block">Custom Section Content</label>
                              <textarea
                                rows={5}
                                value={section.content || ''}
                                onChange={(e) => handleUpdateSection(section.id, { content: e.target.value })}
                                className="w-full p-3.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl leading-relaxed font-sans"
                              />
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                            <span className="text-[11px] text-slate-500">
                              Direct auto-save enabled. Click Close when finished.
                            </span>
                            <button
                              type="button"
                              onClick={() => setEditingSectionId(null)}
                              className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
                            >
                              Done Editing
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-TAB 2: META & HEADLINES */}
          {activeToolSubTab === 'meta' && (
            <div className="space-y-6">
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
                      showSavedToast('Updated H1 Headline');
                    }}
                    className="w-full px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 block">
                      SEO Title Tag (&lt;title&gt;)
                    </label>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        activeToolTitleMetrics.isTruncated
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {activeToolTitleMetrics.pixelWidth}px / 580px{' '}
                      {activeToolTitleMetrics.isTruncated ? '(Truncated)' : '(Safe)'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={activeTool.seo?.metaTitle || activeTool.title}
                    onChange={(e) => {
                      updateTool(activeTool.id, {
                        seo: {
                          ...activeTool.seo,
                          metaTitle: e.target.value,
                          ogTitle: e.target.value,
                        },
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
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 block">
                      SEO Meta Description
                    </label>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        activeToolDescMetrics.isTruncated
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {activeToolDescMetrics.pixelWidth}px / 920px{' '}
                      {activeToolDescMetrics.isTruncated ? '(Truncated)' : '(Safe)'}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={activeTool.seo?.metaDescription || activeTool.shortSummary}
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

              {/* SERP Search Preview Simulation */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5" />
                    Google Search Result Simulator
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg flex items-center gap-1 ${
                        previewDevice === 'desktop' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Monitor className="w-3 h-3" /> Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg flex items-center gap-1 ${
                        previewDevice === 'mobile' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" /> Mobile
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5 max-w-2xl font-sans">
                  <div className="text-xs text-slate-700 truncate font-mono">
                    https://veritas-seo.dev › tool › {activeTool.slug}
                  </div>
                  <div className="text-base sm:text-lg font-medium text-blue-800 hover:underline cursor-pointer truncate">
                    {activeTool.seo?.metaTitle || activeTool.title}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {activeTool.seo?.metaDescription || activeTool.shortSummary}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: EDUCATIONAL GUIDE & METHODOLOGY */}
          {activeToolSubTab === 'guide' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-700" />
                  <span>
                    <strong>Flesch Reading Ease:</strong> {activeToolHowItWorksFlesch.fleschReadingEase}/100 (
                    {activeToolHowItWorksFlesch.readingEaseLabel})
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-700">
                  {activeTool.educationalContent?.howItWorks?.split(/\s+/).filter(Boolean).length || 0} words
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>How It Works &amp; Why It Matters (Multi-Paragraph Guide)</span>
                </label>
                <textarea
                  rows={8}
                  value={activeTool.educationalContent?.howItWorks || ''}
                  onChange={(e) => {
                    updateTool(activeTool.id, {
                      educationalContent: {
                        ...activeTool.educationalContent,
                        howItWorks: e.target.value,
                      },
                    });
                    showSavedToast('Updated How It Works');
                  }}
                  className="w-full px-4 py-3 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  <span>Exact Mathematical &amp; Diagnostic Methodology</span>
                </label>
                <textarea
                  rows={6}
                  value={activeTool.educationalContent?.formulaMethodology || ''}
                  onChange={(e) => {
                    updateTool(activeTool.id, {
                      educationalContent: {
                        ...activeTool.educationalContent,
                        formulaMethodology: e.target.value,
                      },
                    });
                    showSavedToast('Updated Formula Methodology');
                  }}
                  className="w-full px-4 py-3 text-xs sm:text-sm font-mono text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* SUB-TAB 4: STEP-BY-STEP TUTORIAL */}
          {activeToolSubTab === 'steps' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-emerald-600" />
                    Step-by-Step Practical Tutorial
                  </h4>
                  <p className="text-xs text-slate-500">
                    Displayed directly in the tool detail tutorial tab and indexed for rich search snippets.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const currentSteps = activeTool.educationalContent?.stepByStepGuide || [];
                    const nextSteps = [
                      ...currentSteps,
                      {
                        id: generateId('step'),
                        stepTitle: `Step ${currentSteps.length + 1}: New Step Title`,
                        stepDescription: 'Enter the action instructions for this tutorial step.',
                      },
                    ];
                    updateTool(activeTool.id, {
                      educationalContent: {
                        ...activeTool.educationalContent,
                        stepByStepGuide: nextSteps,
                      },
                    });
                    showSavedToast('Added tutorial step');
                  }}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Step
                </button>
              </div>

              <div className="space-y-3">
                {(activeTool.educationalContent?.stepByStepGuide || []).map((step, idx) => (
                  <div
                    key={step.id || idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={step.stepTitle}
                          onChange={(e) => {
                            const updated = (activeTool.educationalContent.stepByStepGuide || []).map(
                              (s, i) => (i === idx ? { ...s, stepTitle: e.target.value } : s)
                            );
                            updateTool(activeTool.id, {
                              educationalContent: {
                                ...activeTool.educationalContent,
                                stepByStepGuide: updated,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (activeTool.educationalContent.stepByStepGuide || []).filter(
                              (_, i) => i !== idx
                            );
                            updateTool(activeTool.id, {
                              educationalContent: {
                                ...activeTool.educationalContent,
                                stepByStepGuide: updated,
                              },
                            });
                            showSavedToast('Removed step');
                          }}
                          className="text-xs text-red-600 hover:text-red-800 shrink-0 px-2 py-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={step.stepDescription}
                        onChange={(e) => {
                          const updated = (activeTool.educationalContent.stepByStepGuide || []).map(
                            (s, i) => (i === idx ? { ...s, stepDescription: e.target.value } : s)
                          );
                          updateTool(activeTool.id, {
                            educationalContent: {
                              ...activeTool.educationalContent,
                              stepByStepGuide: updated,
                            },
                          });
                        }}
                        className="w-full px-3 py-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-xl leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 5: FAQS (SCHEMAS & ACCORDION) */}
          {activeToolSubTab === 'faqs' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    Frequently Asked Questions (Schema.org FAQPage)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Live JSON-LD schema injected automatically for Google SERP rich snippet enhancement.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const nextFaqs = [
                      ...(activeTool.faqs || []),
                      {
                        id: generateId('faq'),
                        question: 'New Frequently Asked Question?',
                        answer: 'Enter detailed search engine optimized response here.',
                      },
                    ];
                    updateTool(activeTool.id, { faqs: nextFaqs });
                    showSavedToast('Added new FAQ item');
                  }}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add FAQ
                </button>
              </div>

              <div className="space-y-3">
                {(activeTool.faqs || []).map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-emerald-700">
                        FAQ #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const nextFaqs = (activeTool.faqs || []).filter((f) => f.id !== faq.id);
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
                        const nextFaqs = (activeTool.faqs || []).map((f) =>
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
                        const nextFaqs = (activeTool.faqs || []).map((f) =>
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
          )}

          {/* SUB-TAB 6: DEFAULT PRESETS */}
          {activeToolSubTab === 'presets' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                Default Input Presets (Pre-populated form values)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Sample URL</label>
                  <input
                    type="text"
                    value={activeTool.defaultInputConfig?.sampleUrl || ''}
                    onChange={(e) => {
                      updateTool(activeTool.id, {
                        defaultInputConfig: {
                          ...activeTool.defaultInputConfig,
                          sampleUrl: e.target.value,
                        },
                      });
                      showSavedToast('Updated sample URL');
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Sample Target Keyword</label>
                  <input
                    type="text"
                    value={activeTool.defaultInputConfig?.sampleTargetKeyword || ''}
                    onChange={(e) => {
                      updateTool(activeTool.id, {
                        defaultInputConfig: {
                          ...activeTool.defaultInputConfig,
                          sampleTargetKeyword: e.target.value,
                        },
                      });
                      showSavedToast('Updated sample keyword');
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block">Sample Title</label>
                  <input
                    type="text"
                    value={activeTool.defaultInputConfig?.sampleTitle || ''}
                    onChange={(e) => {
                      updateTool(activeTool.id, {
                        defaultInputConfig: {
                          ...activeTool.defaultInputConfig,
                          sampleTitle: e.target.value,
                        },
                      });
                      showSavedToast('Updated sample title');
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: SECTION CONTENT BLOCKS */}
      {/* ========================================================================= */}
      {activeMode === 'blocks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar: Filter, Search & Selector */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search block keys, labels, or content..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            {/* Group Filter Badges */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Category Scope
              </span>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'serp', label: 'SERP Simulator' },
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
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {grp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 text-xs border-t border-slate-100 pt-2">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`flex-1 py-1 text-center font-semibold rounded-lg text-[11px] ${
                  statusFilter === 'all' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-500'
                }`}
              >
                All ({contentBlocks.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('modified')}
                className={`flex-1 py-1 text-center font-semibold rounded-lg text-[11px] ${
                  statusFilter === 'modified' ? 'bg-amber-100 text-amber-900' : 'text-slate-500'
                }`}
              >
                Overridden ({blockStats.modified})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('default')}
                className={`flex-1 py-1 text-center font-semibold rounded-lg text-[11px] ${
                  statusFilter === 'default' ? 'bg-slate-200 text-slate-800' : 'text-slate-500'
                }`}
              >
                Default ({blockStats.defaults})
              </button>
            </div>

            {/* Scrollable Block List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredBlocks.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No content blocks matching current filters.
                </div>
              ) : (
                filteredBlocks.map((blk) => {
                  const meta = BLOCK_LABELS[blk.key] || { label: blk.key, group: 'custom' };
                  const isSelected = activeBlock?.key === blk.key;
                  const defaultMatch = DEFAULT_CONTENT_BLOCKS.find((d) => d.key === blk.key);
                  const isOverridden = !defaultMatch || defaultMatch.content !== blk.content;

                  return (
                    <button
                      key={blk.id || blk.key}
                      type="button"
                      onClick={() => setSelectedKey(blk.key)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200/70 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold truncate">{meta.label}</span>
                        {isOverridden ? (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                            Custom
                          </span>
                        ) : (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-400 border border-slate-200'
                            }`}
                          >
                            Default
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-mono block mb-1 truncate ${
                          isSelected ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {blk.key}
                      </span>
                      <p
                        className={`text-[11px] line-clamp-2 leading-relaxed ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {htmlToPlainText(blk.content)}
                      </p>
                    </button>
                  );
                })
              )}
            </div>

            {/* Create Custom Block */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Create New Content Block
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder="Block Key (e.g. promo.headline)"
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

          {/* Right Pane: Active Block Editor & Live Split Preview */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            {activeBlock ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        {activeBlock.key}
                      </span>
                      {isBlockModified && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Modified from Original
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {BLOCK_LABELS[activeBlock.key]?.label || activeBlock.key}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {defaultForActiveBlock && isBlockModified && (
                      <button
                        type="button"
                        onClick={() => {
                          setContentBlock(activeBlock.key, defaultForActiveBlock.content);
                          showSavedToast(`Reset "${activeBlock.key}" to default`);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Revert Default
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

                {/* Quick Plain Text Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Plain Text &amp; Markdown Input</span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">
                      {htmlToPlainText(activeBlock.content).length} characters |{' '}
                      {htmlToPlainText(activeBlock.content).split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    value={htmlToPlainText(activeBlock.content)}
                    onChange={(e) => {
                      setContentBlock(activeBlock.key, plainTextToHtml(e.target.value));
                    }}
                    rows={4}
                    className="w-full p-4 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
                  />
                </div>

                {/* Rich Visual Editor */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Rich Text WYSIWYG Editor (Bold, Lists, Headings, Line Breaks)</span>
                  </label>
                  <RichTextEditor
                    content={normalizeRichHtml(activeBlock.content)}
                    onChange={(html) => {
                      setContentBlock(activeBlock.key, normalizeRichHtml(html));
                    }}
                  />
                </div>

                {/* Live Split Preview Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      Live Rendered Output
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-semibold border border-emerald-200">
                      Normalized HTML5
                    </span>
                  </div>
                  <div
                    className="veritas-rich-content text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-200"
                    dangerouslySetInnerHTML={{
                      __html: normalizeRichHtml(activeBlock.content) || '<em>Empty content block</em>',
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-slate-400 text-xs">
                Select a content block on the left to start editing.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: CATEGORY HUBS & SUB-TAXONOMY */}
      {/* ========================================================================= */}
      {activeMode === 'categories' && activeCategory && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Category Hub Editor */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Select Category Hub
                </label>
                <select
                  value={activeCategory.id}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="px-3.5 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 min-w-[240px]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (/category/{c.slug})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Category Hub Name (H1)</label>
                <input
                  type="text"
                  value={activeCategory.name}
                  onChange={(e) => {
                    updateCategory(activeCategory.id, { name: e.target.value });
                    showSavedToast('Updated Category Name');
                  }}
                  className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">SEO Meta Title</label>
                <input
                  type="text"
                  value={activeCategory.seo?.metaTitle || activeCategory.name}
                  onChange={(e) => {
                    updateCategory(activeCategory.id, {
                      seo: { ...activeCategory.seo, metaTitle: e.target.value },
                    });
                    showSavedToast('Updated Category SEO Title');
                  }}
                  className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Long-form Hub Description</label>
                <textarea
                  rows={4}
                  value={activeCategory.description}
                  onChange={(e) => {
                    updateCategory(activeCategory.id, { description: e.target.value });
                    showSavedToast('Updated Category Description');
                  }}
                  className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Sub-Category Hub Editor */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Select Sub-Category Hub
                </label>
                <select
                  value={activeSubCategory?.id || ''}
                  onChange={(e) => setSelectedSubCategoryId(e.target.value)}
                  className="px-3.5 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 min-w-[240px]"
                >
                  {subCategories.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (/subcategory/{s.slug})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeSubCategory && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Sub-Category Name (H1)</label>
                  <input
                    type="text"
                    value={activeSubCategory.name}
                    onChange={(e) => {
                      updateSubCategory(activeSubCategory.id, { name: e.target.value });
                      showSavedToast('Updated Sub-Category Name');
                    }}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">SEO Meta Title</label>
                  <input
                    type="text"
                    value={activeSubCategory.seo?.metaTitle || activeSubCategory.name}
                    onChange={(e) => {
                      updateSubCategory(activeSubCategory.id, {
                        seo: { ...activeSubCategory.seo, metaTitle: e.target.value },
                      });
                      showSavedToast('Updated SubCategory SEO Title');
                    }}
                    className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Sub-Category Summary</label>
                  <textarea
                    rows={4}
                    value={activeSubCategory.description}
                    onChange={(e) => {
                      updateSubCategory(activeSubCategory.id, { description: e.target.value });
                      showSavedToast('Updated Sub-Category Description');
                    }}
                    className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: EXPORT / IMPORT JSON STUDIO */}
      {/* ========================================================================= */}
      {activeMode === 'export_import' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Export Panel */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-600" />
                  Export Complete CMS Content Payload
                </h3>
                <p className="text-xs text-slate-500">
                  Export all blocks, SEO blueprints, and FAQs to JSON for instant backup and migration.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(jsonExportPayload);
                  showSavedToast('Copied JSON payload to clipboard');
                }}
                className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy JSON
              </button>
            </div>

            <textarea
              readOnly
              rows={16}
              value={jsonExportPayload}
              className="w-full p-4 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none"
            />
          </div>

          {/* Import Panel */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-600" />
                Import CMS Content Payload
              </h3>
              <p className="text-xs text-slate-500">
                Paste a previously exported JSON backup payload to apply changes across all pages.
              </p>
            </div>

            <textarea
              rows={12}
              value={jsonImportInput}
              onChange={(e) => setJsonImportInput(e.target.value)}
              placeholder="Paste exported CMS JSON payload here..."
              className="w-full p-4 font-mono text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-900 focus:bg-white"
            />

            {importStatus && (
              <div
                className={`p-3.5 rounded-xl text-xs font-semibold ${
                  importStatus.includes('Error')
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {importStatus}
              </div>
            )}

            <button
              type="button"
              onClick={handleExecuteImport}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <CheckCircle2 className="w-4 h-4" /> Apply &amp; Hydrate CMS Content
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
