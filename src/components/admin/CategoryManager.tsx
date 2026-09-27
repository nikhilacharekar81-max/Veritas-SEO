import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import type { MainCategory, SeoMetadata } from '../../lib/schemas';
import { createDefaultSeoMetadata } from '../../lib/schemas';
import { slugify } from '../../lib/utils';
import { AVAILABLE_ICONS, IconRenderer } from '../ui/IconRenderer';
import { SeoControlSuiteForm } from './SeoControlSuiteForm';
import {
  Folder,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  Layers,
  ArrowUpDown,
  Search,
} from 'lucide-react';

interface Props {
  editingId: string | null;
  onCloseEdit: () => void;
  isOpenCreate: boolean;
  onCloseCreate: () => void;
}

export const CategoryManager: React.FC<Props> = ({
  editingId,
  onCloseEdit,
  isOpenCreate,
  onCloseCreate,
}) => {
  const {
    categories,
    subCategories,
    tools,
    createCategory,
    updateCategory,
    toggleCategoryStatus,
    deleteCategory,
    reorderCategories,
  } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<MainCategory | null>(null);
  const [orphanStrategy, setOrphanStrategy] = useState<'reassign' | 'unassign'>('unassign');
  const [reassignTargetCatId, setReassignTargetCatId] = useState<string>('');

  // Form State
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formIcon, setFormIcon] = useState('Terminal');
  const [formOrder, setFormOrder] = useState(1);
  const [formActive, setFormActive] = useState(true);
  const [formSeo, setFormSeo] = useState<SeoMetadata>(createDefaultSeoMetadata());
  const [activeModalTab, setActiveModalTab] = useState<'general' | 'seo'>('general');

  // Load for editing
  const editingCategory = categories.find((c) => c.id === editingId);

  const initEditModal = (cat: MainCategory) => {
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDesc(cat.description);
    setFormIcon(cat.icon);
    setFormOrder(cat.displayOrder);
    setFormActive(cat.isActive);
    setFormSeo(cat.seo);
    setActiveModalTab('general');
  };

  const initCreateModal = () => {
    setFormName('');
    setFormSlug('');
    setFormDesc('');
    setFormIcon('Terminal');
    setFormOrder(categories.length + 1);
    setFormActive(true);
    setFormSeo(createDefaultSeoMetadata());
    setActiveModalTab('general');
  };

  const handleNameChange = (name: string) => {
    setFormName(name);
    if (!editingId) {
      const generatedSlug = slugify(name);
      setFormSlug(generatedSlug);
      setFormSeo((prev) => ({
        ...prev,
        metaTitle: `${name} | Veritas SEO`,
        metaDescription: prev.metaDescription || `Browse tools and calculators under ${name}.`,
        canonicalUrl: `https://veritas-seo.dev/category/${generatedSlug}`,
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim()) return;

    if (editingId) {
      updateCategory(editingId, {
        name: formName,
        slug: formSlug,
        description: formDesc,
        icon: formIcon,
        displayOrder: formOrder,
        isActive: formActive,
        seo: formSeo,
      });
      onCloseEdit();
    } else {
      createCategory({
        name: formName,
        slug: formSlug,
        description: formDesc,
        icon: formIcon,
        displayOrder: formOrder,
        isActive: formActive,
        seo: formSeo,
      });
      onCloseCreate();
    }
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDelete = () => {
    if (!deleteCandidate) return;
    deleteCategory(deleteCandidate.id, orphanStrategy, reassignTargetCatId || undefined);
    setDeleteCandidate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Folder className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Main Categories (Tier 1)</h3>
            <p className="text-xs text-slate-500">
              Manage parent categories, display ordering, and live cascading visibility switches.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter categories..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 w-48"
            />
          </div>
          <button
            type="button"
            onClick={onCloseCreate}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No main categories created yet. Click "Add Category" above to initialize your taxonomy.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">Order</th>
                  <th className="py-3 px-4">Category Name &amp; Path</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-center">Child Sub-Cats</th>
                  <th className="py-3 px-4 text-center">Total Tools</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((cat) => {
                  const childSubs = subCategories.filter((s) => s.categoryId === cat.id);
                  const childTools = tools.filter((t) => t.categoryId === cat.id);

                  return (
                    <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">
                        {cat.displayOrder}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                            <IconRenderer name={cat.icon} className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{cat.name}</span>
                            <span className="font-mono text-[11px] text-slate-400">/category/{cat.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{cat.description}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 font-mono font-semibold text-slate-700">
                          {childSubs.length}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 font-mono font-semibold text-slate-700">
                          {childTools.length}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleCategoryStatus(cat.id)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg inline-flex items-center gap-1 transition-all ${
                            cat.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {cat.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {cat.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              initEditModal(cat);
                              onCloseCreate(); // ensure create modal is closed
                            }}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                            title="Edit Category"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteCandidate(cat)}
                            className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete Category"
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

      {/* CREATE / EDIT MODAL */}
      {(isOpenCreate || editingId) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingId ? 'Edit Main Category' : 'Create New Main Category'}
                </h3>
                <p className="text-xs text-slate-500">
                  Tier 1 taxonomy entity for organizing related sub-categories and SEO tools.
                </p>
              </div>

              {/* General vs SEO Tab Switcher */}
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
                  onClick={() => setActiveModalTab('seo')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeModalTab === 'seo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  SEO Suite
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              {activeModalTab === 'general' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Technical SEO & Crawlability"
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
                        placeholder="e.g. technical-seo"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Display Order Priority
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formOrder}
                        onChange={(e) => setFormOrder(Number(e.target.value))}
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Explain what tools exist under this category for users and search bots."
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Icon Representation</label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-xl">
                      {AVAILABLE_ICONS.map((iconName) => (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormIcon(iconName)}
                          className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs ${
                            formIcon === iconName
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <IconRenderer name={iconName} className="w-4 h-4" />
                          <span>{iconName}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={formActive}
                        onChange={(e) => setFormActive(e.target.checked)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
                      />
                      Active &amp; Published (Visible to public visitors &amp; search bots)
                    </label>
                  </div>
                </div>
              ) : (
                <SeoControlSuiteForm
                  seo={formSeo}
                  onChange={setFormSeo}
                  entityName={formName}
                  defaultPath={`/category/${formSlug || 'new-category'}`}
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
                  {editingId ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORPHAN PROTECTION DELETE MODAL */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-slate-900">
                Delete Category "{deleteCandidate.name}"?
              </h4>
              <p className="text-xs text-slate-500">
                This category contains{' '}
                <strong className="text-slate-900">
                  {subCategories.filter((s) => s.categoryId === deleteCandidate.id).length} sub-categories
                </strong>{' '}
                and{' '}
                <strong className="text-slate-900">
                  {tools.filter((t) => t.categoryId === deleteCandidate.id).length} tools
                </strong>
                . How should child entities be handled?
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer bg-slate-50/50">
                <input
                  type="radio"
                  name="orphanStrategy"
                  checked={orphanStrategy === 'unassign'}
                  onChange={() => setOrphanStrategy('unassign')}
                  className="mt-0.5 text-slate-900 focus:ring-slate-900"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Move to Unassigned / Draft (Safe)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Children will be preserved in draft state without being deleted.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer bg-slate-50/50">
                <input
                  type="radio"
                  name="orphanStrategy"
                  checked={orphanStrategy === 'reassign'}
                  onChange={() => setOrphanStrategy('reassign')}
                  className="mt-0.5 text-slate-900 focus:ring-slate-900"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-900 block">
                    Reassign Children to Another Category
                  </span>
                  {orphanStrategy === 'reassign' && (
                    <select
                      value={reassignTargetCatId}
                      onChange={(e) => setReassignTargetCatId(e.target.value)}
                      className="mt-2 w-full text-xs p-1.5 bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="">Select Destination Category...</option>
                      {categories
                        .filter((c) => c.id !== deleteCandidate.id)
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              </label>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
