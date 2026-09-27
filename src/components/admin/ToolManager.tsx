import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import type {
  SeoTool,
  SeoMetadata,
  ToolEngineType,
  ToolBadge,
  ToolStatus,
  FaqItem,
  GuideStep,
} from '../../lib/schemas';
import {
  createDefaultSeoMetadata,
  createDefaultToolInputConfig,
} from '../../lib/schemas';
import { slugify, generateId } from '../../lib/utils';
import { AVAILABLE_ICONS, IconRenderer } from '../ui/IconRenderer';
import { SeoControlSuiteForm } from './SeoControlSuiteForm';
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  MoveRight,
  Search,
  CheckSquare,
  Square,
  Sparkles,
  HelpCircle,
  BookOpen,
  Layers,
} from 'lucide-react';

interface Props {
  editingId: string | null;
  onCloseEdit: () => void;
  isOpenCreate: boolean;
  onCloseCreate: () => void;
  initialCatId?: string;
  initialSubCatId?: string;
}

export const ToolManager: React.FC<Props> = ({
  editingId,
  onCloseEdit,
  isOpenCreate,
  onCloseCreate,
  initialCatId,
  initialSubCatId,
}) => {
  const {
    categories,
    subCategories,
    tools,
    createTool,
    updateTool,
    toggleToolStatus,
    setToolPublishStatus,
    moveTool,
    duplicateTool,
    deleteTool,
    bulkToggleTools,
    bulkMoveTools,
    bulkDeleteTools,
  } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCatId, setFilterCatId] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Bulk Selection State
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);
  const [bulkTargetCatId, setBulkTargetCatId] = useState<string>('');
  const [bulkTargetSubId, setBulkTargetSubId] = useState<string>('');

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formIcon, setFormIcon] = useState('Search');
  const [formBadge, setFormBadge] = useState<ToolBadge>('None');
  const [formStatus, setFormStatus] = useState<ToolStatus>('published');
  const [formActive, setFormActive] = useState(true);
  const [formEngine, setFormEngine] = useState<ToolEngineType>('serp-pixel-simulator');
  const [formCategoryId, setFormCategoryId] = useState<string>(initialCatId || categories[0]?.id || '');
  const [formSubCategoryId, setFormSubCategoryId] = useState<string>(initialSubCatId || '');
  const [formOrder, setFormOrder] = useState(1);

  // Educational Content & FAQs
  const [formHowItWorks, setFormHowItWorks] = useState('');
  const [formFormula, setFormFormula] = useState('');
  const [formGuideSteps, setFormGuideSteps] = useState<GuideStep[]>([
    { id: 's1', stepTitle: 'Enter Target Input Parameters', stepDescription: 'Provide the primary URL or keywords.' },
  ]);
  const [formFaqs, setFormFaqs] = useState<FaqItem[]>([
    { id: 'f1', question: 'How is the calculation performed?', answer: 'Calculations utilize Decimal.js precision math algorithms.' },
  ]);

  const [formSeo, setFormSeo] = useState<SeoMetadata>(createDefaultSeoMetadata());
  const [activeModalTab, setActiveModalTab] = useState<'general' | 'education' | 'faqs' | 'seo'>('general');

  const editingTool = tools.find((t) => t.id === editingId);

  const initEditModal = (tool: SeoTool) => {
    setFormTitle(tool.title);
    setFormSlug(tool.slug);
    setFormSummary(tool.shortSummary);
    setFormIcon(tool.icon);
    setFormBadge(tool.badge);
    setFormStatus(tool.status);
    setFormActive(tool.isActive);
    setFormEngine(tool.engineType);
    setFormCategoryId(tool.categoryId || '');
    setFormSubCategoryId(tool.subCategoryId || '');
    setFormOrder(tool.displayOrder);
    setFormHowItWorks(tool.educationalContent?.howItWorks || '');
    setFormFormula(tool.educationalContent?.formulaMethodology || '');
    setFormGuideSteps(tool.educationalContent?.stepByStepGuide || []);
    setFormFaqs(tool.faqs || []);
    setFormSeo(tool.seo);
    setActiveModalTab('general');
  };

  const handleTitleChange = (title: string) => {
    setFormTitle(title);
    if (!editingId) {
      const generatedSlug = slugify(title);
      setFormSlug(generatedSlug);
      setFormSeo((prev) => ({
        ...prev,
        metaTitle: `${title} | Veritas SEO Tools`,
        metaDescription: prev.metaDescription || formSummary || `Free online ${title} tool with real-time analysis.`,
        canonicalUrl: `https://veritas-seo.dev/tool/${generatedSlug}`,
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSlug.trim()) return;

    const payload = {
      title: formTitle,
      slug: formSlug,
      shortSummary: formSummary,
      icon: formIcon,
      badge: formBadge,
      status: formStatus,
      isActive: formActive,
      usageCount: editingTool?.usageCount || 0,
      engineType: formEngine,
      categoryId: formCategoryId || null,
      subCategoryId: formSubCategoryId || null,
      displayOrder: formOrder,
      defaultInputConfig: editingTool?.defaultInputConfig || createDefaultToolInputConfig(),
      educationalContent: {
        howItWorks: formHowItWorks,
        formulaMethodology: formFormula,
        stepByStepGuide: formGuideSteps,
      },
      faqs: formFaqs,
      seo: formSeo,
    };

    if (editingId) {
      updateTool(editingId, payload);
      onCloseEdit();
    } else {
      createTool(payload);
      onCloseCreate();
    }
  };

  // Bulk Selection Helpers
  const toggleSelectTool = (id: string) => {
    setSelectedToolIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedToolIds.length === filteredTools.length) {
      setSelectedToolIds([]);
    } else {
      setSelectedToolIds(filteredTools.map((t) => t.id));
    }
  };

  const handleBulkMove = () => {
    if (selectedToolIds.length === 0) return;
    bulkMoveTools(
      selectedToolIds,
      bulkTargetCatId || null,
      bulkTargetSubId || null
    );
    setSelectedToolIds([]);
  };

  const handleBulkDelete = () => {
    if (selectedToolIds.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedToolIds.length} SEO tools?`)) {
      bulkDeleteTools(selectedToolIds);
      setSelectedToolIds([]);
    }
  };

  const handleBulkToggle = (active: boolean) => {
    bulkToggleTools(selectedToolIds, active);
    setSelectedToolIds([]);
  };

  // Filtering
  const filteredTools = tools.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCatId === 'all' || t.categoryId === filterCatId;
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">SEO Tools &amp; Lifecycle Engine (Tier 3)</h3>
            <p className="text-xs text-slate-500">
              Manage interactive engine bindings, educational guides, dynamic FAQs, and 301 canonical protections.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={filterCatId}
            onChange={(e) => setFilterCatId(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 w-36"
            />
          </div>

          <button
            type="button"
            onClick={onCloseCreate}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add SEO Tool
          </button>
        </div>
      </div>

      {/* Bulk Action Bar (When selected) */}
      {selectedToolIds.length > 0 && (
        <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold bg-white/20 px-2 py-0.5 rounded-md font-mono">
              {selectedToolIds.length} tools selected
            </span>
            <button
              type="button"
              onClick={() => setSelectedToolIds([])}
              className="text-slate-400 hover:text-white underline"
            >
              Clear Selection
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Bulk Move Dropdown */}
            <select
              value={`${bulkTargetCatId}___${bulkTargetSubId}`}
              onChange={(e) => {
                const [c, s] = e.target.value.split('___');
                setBulkTargetCatId(c || '');
                setBulkTargetSubId(s || '');
              }}
              className="text-xs px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
            >
              <option value="___">Bulk Move To...</option>
              {categories.map((c) => (
                <optgroup key={c.id} label={c.name}>
                  <option value={`${c.id}___`}>{c.name} (Direct)</option>
                  {subCategories
                    .filter((s) => s.categoryId === c.id)
                    .map((s) => (
                      <option key={s.id} value={`${c.id}___${s.id}`}>
                        &nbsp;&nbsp;↳ {s.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>

            <button
              type="button"
              onClick={handleBulkMove}
              disabled={!bulkTargetCatId}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg disabled:opacity-50"
            >
              Apply Move
            </button>

            <button
              type="button"
              onClick={() => handleBulkToggle(true)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg"
            >
              Bulk Publish
            </button>

            <button
              type="button"
              onClick={() => handleBulkToggle(false)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg"
            >
              Bulk Unpublish
            </button>

            <button
              type="button"
              onClick={handleBulkDelete}
              className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg"
            >
              Bulk Delete
            </button>
          </div>
        </div>
      )}

      {/* Tools Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {tools.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No SEO tools created yet. Click "Add SEO Tool" above to initialize your first tool.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3 w-10 text-center">
                    <button
                      type="button"
                      onClick={toggleSelectAll}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      {selectedToolIds.length === filteredTools.length && filteredTools.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-slate-900" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-4">Tool Name &amp; URL</th>
                  <th className="py-3 px-4">Taxonomy Placement</th>
                  <th className="py-3 px-4">Engine Type</th>
                  <th className="py-3 px-4 text-center">Calculations</th>
                  <th className="py-3 px-4 text-center">Badge</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTools.map((tool) => {
                  const parentCat = categories.find((c) => c.id === tool.categoryId);
                  const parentSub = subCategories.find((s) => s.id === tool.subCategoryId);
                  const isSelected = selectedToolIds.includes(tool.id);

                  return (
                    <tr
                      key={tool.id}
                      className={`hover:bg-slate-50/50 transition-colors ${
                        isSelected ? 'bg-slate-50' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => toggleSelectTool(tool.id)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-slate-900" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                            <IconRenderer name={tool.icon} className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{tool.title}</span>
                            <span className="font-mono text-[11px] text-slate-400">/tool/{tool.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {parentCat ? (
                          <div className="space-y-0.5">
                            <span className="font-semibold text-slate-900 block">{parentCat.name}</span>
                            {parentSub && (
                              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                ↳ {parentSub.name}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-amber-600 font-medium">Unassigned / Draft</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                          {tool.engineType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 tabular-nums">
                        {tool.usageCount || 0}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {tool.badge !== 'None' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                            {tool.badge}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <select
                          value={tool.status}
                          onChange={(e) => setToolPublishStatus(tool.id, e.target.value as ToolStatus)}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border ${
                            tool.status === 'published' && tool.isActive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : tool.status === 'draft' || !tool.isActive
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => duplicateTool(tool.id)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                            title="Duplicate Tool"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              initEditModal(tool);
                              onCloseCreate();
                            }}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                            title="Edit Tool"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTool(tool.id)}
                            className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete Tool"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT TOOL MODAL */}
      {(isOpenCreate || editingId) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingId ? 'Edit SEO Tool' : 'Create New SEO Tool'}
                </h3>
                <p className="text-xs text-slate-500">
                  Configure tool engine binding, educational methodology, and Google Rich Snippet schemas.
                </p>
              </div>

              {/* Navigation tabs */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveModalTab('general')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeModalTab === 'general' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  General
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalTab('education')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeModalTab === 'education' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Education
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalTab('faqs')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeModalTab === 'faqs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  FAQs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalTab('seo')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeModalTab === 'seo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  SEO Suite
                </button>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              {activeModalTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Parent Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formCategoryId}
                        onChange={(e) => {
                          setFormCategoryId(e.target.value);
                          setFormSubCategoryId('');
                        }}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
                      >
                        <option value="">Unassigned (Draft)</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Sub-Category (Optional)
                      </label>
                      <select
                        value={formSubCategoryId}
                        onChange={(e) => setFormSubCategoryId(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
                      >
                        <option value="">None (Direct Category Tool)</option>
                        {subCategories
                          .filter((s) => !formCategoryId || s.categoryId === formCategoryId)
                          .map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tool Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Google SERP Pixel Width Simulator"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formSlug}
                        onChange={(e) => setFormSlug(slugify(e.target.value))}
                        placeholder="e.g. serp-pixel-simulator"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Interactive Engine Binding <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formEngine}
                        onChange={(e) => setFormEngine(e.target.value as ToolEngineType)}
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono"
                      >
                        <option value="serp-pixel-simulator">serp-pixel-simulator (Google SERP Meter)</option>
                        <option value="keyword-density-analyzer">keyword-density-analyzer (N-Gram TF-IDF)</option>
                        <option value="schema-jsonld-generator">schema-jsonld-generator (JSON-LD Builder)</option>
                        <option value="redirect-chain-inspector">redirect-chain-inspector (301 Hop Tracer)</option>
                        <option value="robots-sitemap-validator">robots-sitemap-validator (Directives Tester)</option>
                        <option value="onpage-audit-scorer">onpage-audit-scorer (Technical Health Scorer)</option>
                        <option value="cwv-cls-calculator">cwv-cls-calculator (Core Web Vitals Math)</option>
                        <option value="readability-flesch-analyzer">readability-flesch-analyzer (Flesch-Kincaid)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Summary / Elevator Pitch <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formSummary}
                      onChange={(e) => setFormSummary(e.target.value)}
                      placeholder="Brief 1-2 sentence description explaining what the tool calculates."
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Badge</label>
                      <select
                        value={formBadge}
                        onChange={(e) => setFormBadge(e.target.value as ToolBadge)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="None">None</option>
                        <option value="Popular">Popular</option>
                        <option value="New">New</option>
                        <option value="Pro">Pro</option>
                        <option value="Free">Free</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Lifecycle Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as ToolStatus)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        min={0}
                        value={formOrder}
                        onChange={(e) => setFormOrder(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Icon</label>
                    <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-xl">
                      {AVAILABLE_ICONS.map((iconName) => (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormIcon(iconName)}
                          className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 text-xs ${
                            formIcon === iconName
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <IconRenderer name={iconName} className="w-3.5 h-3.5" />
                          <span>{iconName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'education' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      How It Works (Technical Overview)
                    </label>
                    <textarea
                      rows={3}
                      value={formHowItWorks}
                      onChange={(e) => setFormHowItWorks(e.target.value)}
                      placeholder="Explain the background algorithms and mechanics..."
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Formula &amp; Mathematical Methodology
                    </label>
                    <textarea
                      rows={3}
                      value={formFormula}
                      onChange={(e) => setFormFormula(e.target.value)}
                      placeholder="Explain the mathematical equations, limits, and pixel ratios..."
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-700">Step-by-Step Execution Guide</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormGuideSteps((prev) => [
                            ...prev,
                            { id: generateId('step'), stepTitle: '', stepDescription: '' },
                          ])
                        }
                        className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 flex items-center gap-1 font-medium"
                      >
                        <Plus className="w-3 h-3" /> Add Step
                      </button>
                    </div>

                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {formGuideSteps.map((step, idx) => (
                        <div key={step.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500 font-mono">Step #{idx + 1}</span>
                            {formGuideSteps.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setFormGuideSteps((prev) => prev.filter((_, i) => i !== idx))}
                                className="text-slate-400 hover:text-red-600 text-xs"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={step.stepTitle}
                            onChange={(e) =>
                              setFormGuideSteps((prev) =>
                                prev.map((s, i) => (i === idx ? { ...s, stepTitle: e.target.value } : s))
                              )
                            }
                            placeholder="Step Title"
                            className="w-full px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg"
                          />
                          <input
                            type="text"
                            value={step.stepDescription}
                            onChange={(e) =>
                              setFormGuideSteps((prev) =>
                                prev.map((s, i) => (i === idx ? { ...s, stepDescription: e.target.value } : s))
                              )
                            }
                            placeholder="Step Description"
                            className="w-full px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'faqs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-700">Dynamic Tool FAQs</h4>
                      <p className="text-[11px] text-slate-500">Automatically injects Schema.org FAQPage structured data.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormFaqs((prev) => [
                          ...prev,
                          { id: generateId('faq'), question: '', answer: '' },
                        ])
                      }
                      className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 flex items-center gap-1 font-medium"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add FAQ
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {formFaqs.map((faq, idx) => (
                      <div key={faq.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">FAQ Question #{idx + 1}</span>
                          {formFaqs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setFormFaqs((prev) => prev.filter((_, i) => i !== idx))}
                              className="text-slate-400 hover:text-red-600 text-xs"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) =>
                            setFormFaqs((prev) =>
                              prev.map((f, i) => (i === idx ? { ...f, question: e.target.value } : f))
                            )
                          }
                          placeholder="Question for users and Googlebot"
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                        />
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) =>
                            setFormFaqs((prev) =>
                              prev.map((f, i) => (i === idx ? { ...f, answer: e.target.value } : f))
                            )
                          }
                          placeholder="Comprehensive factual answer"
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalTab === 'seo' && (
                <SeoControlSuiteForm
                  seo={formSeo}
                  onChange={setFormSeo}
                  entityName={formTitle}
                  defaultPath={`/tool/${formSlug || 'new-tool'}`}
                />
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (editingId) onCloseEdit();
                    else onCloseCreate();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs"
                >
                  {editingId ? 'Save Tool Settings' : 'Create Tool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
