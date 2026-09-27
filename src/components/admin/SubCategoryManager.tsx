import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import type { SubCategory, SeoMetadata } from '../../lib/schemas';
import { createDefaultSeoMetadata } from '../../lib/schemas';
import { slugify } from '../../lib/utils';
import { SeoControlSuiteForm } from './SeoControlSuiteForm';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MoveRight,
  AlertTriangle,
  Search,
} from 'lucide-react';

interface Props {
  editingId: string | null;
  onCloseEdit: () => void;
  isOpenCreate: boolean;
  onCloseCreate: () => void;
  initialParentCatId?: string;
}

export const SubCategoryManager: React.FC<Props> = ({
  editingId,
  onCloseEdit,
  isOpenCreate,
  onCloseCreate,
  initialParentCatId,
}) => {
  const {
    categories,
    subCategories,
    tools,
    createSubCategory,
    updateSubCategory,
    toggleSubCategoryStatus,
    moveSubCategory,
    deleteSubCategory,
  } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCatId, setFilterCatId] = useState<string>('all');
  const [deleteCandidate, setDeleteCandidate] = useState<SubCategory | null>(null);
  const [orphanStrategy, setOrphanStrategy] = useState<'reassign' | 'unassign'>('unassign');
  const [reassignTargetSubId, setReassignTargetSubId] = useState<string>('');

  // Form State
  const [formCategoryId, setFormCategoryId] = useState<string>(initialParentCatId || categories[0]?.id || '');
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formOrder, setFormOrder] = useState(1);
  const [formActive, setFormActive] = useState(true);
  const [formSeo, setFormSeo] = useState<SeoMetadata>(createDefaultSeoMetadata());
  const [activeModalTab, setActiveModalTab] = useState<'general' | 'seo'>('general');

  const editingSubCategory = subCategories.find((s) => s.id === editingId);

  const initEditModal = (sub: SubCategory) => {
    setFormCategoryId(sub.categoryId || '');
    setFormName(sub.name);
    setFormSlug(sub.slug);
    setFormDesc(sub.description);
    setFormOrder(sub.displayOrder);
    setFormActive(sub.isActive);
    setFormSeo(sub.seo);
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
        metaDescription: prev.metaDescription || `Explore ${name} tools and diagnostic calculators.`,
        canonicalUrl: `https://veritas-seo.dev/subcategory/${generatedSlug}`,
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim()) return;

    if (editingId) {
      updateSubCategory(editingId, {
        categoryId: formCategoryId || null,
        name: formName,
        slug: formSlug,
        description: formDesc,
        displayOrder: formOrder,
        isActive: formActive,
        seo: formSeo,
      });
      onCloseEdit();
    } else {
      createSubCategory({
        categoryId: formCategoryId || null,
        name: formName,
        slug: formSlug,
        description: formDesc,
        displayOrder: formOrder,
        isActive: formActive,
        seo: formSeo,
      });
      onCloseCreate();
    }
  };

  const confirmDelete = () => {
    if (!deleteCandidate) return;
    deleteSubCategory(deleteCandidate.id, orphanStrategy, reassignTargetSubId || undefined);
    setDeleteCandidate(null);
  };

  const filteredSubCategories = subCategories.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCatId === 'all' || sub.categoryId === filterCatId;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Sub-Categories (Tier 2)</h3>
            <p className="text-xs text-slate-500">
              Middle hierarchy tier grouping specialized SEO tools. Reassignable to any Main Category.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <select
            value={filterCatId}
            onChange={(e) => setFilterCatId(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="all">All Main Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 w-36"
            />
          </div>

          <button
            type="button"
            onClick={onCloseCreate}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add Sub-Cat
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {subCategories.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No sub-categories found. Create your first sub-category to organize SEO tools.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">Order</th>
                  <th className="py-3 px-4">Sub-Category Name &amp; Slug</th>
                  <th className="py-3 px-4">Parent Category (Move)</th>
                  <th className="py-3 px-4 text-center">SEO Tools</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubCategories.map((sub) => {
                  const parentCat = categories.find((c) => c.id === sub.categoryId);
                  const childTools = tools.filter((t) => t.subCategoryId === sub.id);

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">
                        {sub.displayOrder}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        <div>
                          <span className="font-bold text-slate-900 block">{sub.name}</span>
                          <span className="font-mono text-[11px] text-slate-400">/{sub.slug}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {/* Seamless Sub-Category Reassignment Dropdown */}
                        <select
                          value={sub.categoryId || ''}
                          onChange={(e) => moveSubCategory(sub.id, e.target.value || null)}
                          className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium max-w-[200px]"
                        >
                          <option value="">(Unassigned / Draft)</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 font-mono font-semibold text-slate-700">
                          {childTools.length}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleSubCategoryStatus(sub.id)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg inline-flex items-center gap-1 transition-all ${
                            sub.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {sub.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {sub.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              initEditModal(sub);
                              onCloseCreate();
                            }}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                            title="Edit Sub-Category"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteCandidate(sub)}
                            className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete Sub-Category"
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
                  {editingId ? 'Edit Sub-Category' : 'Create New Sub-Category'}
                </h3>
                <p className="text-xs text-slate-500">
                  Tier 2 taxonomy item grouped under a Main Category.
                </p>
              </div>

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
                      Parent Main Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formCategoryId}
                      onChange={(e) => setFormCategoryId(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
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
                      Sub-Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. SERP & Meta Snippets"
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
                        placeholder="e.g. serp-snippets"
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
                      Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Summary of tools contained in this sub-category."
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={formActive}
                        onChange={(e) => setFormActive(e.target.checked)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
                      />
                      Active &amp; Published
                    </label>
                  </div>
                </div>
              ) : (
                <SeoControlSuiteForm
                  seo={formSeo}
                  onChange={setFormSeo}
                  entityName={formName}
                  defaultPath={`/subcategory/${formSlug || 'new-subcat'}`}
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
                  {editingId ? 'Save Changes' : 'Create Sub-Category'}
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
                Delete Sub-Category "{deleteCandidate.name}"?
              </h4>
              <p className="text-xs text-slate-500">
                This sub-category contains{' '}
                <strong className="text-slate-900">
                  {tools.filter((t) => t.subCategoryId === deleteCandidate.id).length} SEO tools
                </strong>
                . Protect child tools from accidental deletion:
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
                    Move child tools to Unassigned / Draft
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Tools will be preserved safely without being deleted.
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
                    Reassign tools to another Sub-Category
                  </span>
                  {orphanStrategy === 'reassign' && (
                    <select
                      value={reassignTargetSubId}
                      onChange={(e) => setReassignTargetSubId(e.target.value)}
                      className="mt-2 w-full text-xs p-1.5 bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="">Select Destination Sub-Category...</option>
                      {subCategories
                        .filter((s) => s.id !== deleteCandidate.id)
                        .map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
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
