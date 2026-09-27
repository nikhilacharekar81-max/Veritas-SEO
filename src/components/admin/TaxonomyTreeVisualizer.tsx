import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import { IconRenderer } from '../ui/IconRenderer';
import { MoveItemDialog } from './MoveItemDialog';
import {
  FolderTree,
  Folder,
  Layers,
  Wrench,
  Eye,
  EyeOff,
  MoveRight,
  ChevronDown,
  ChevronRight,
  ArrowUpDown,
  Plus,
  Trash2,
  Copy,
  Edit,
  ArrowRightLeft,
  AlertTriangle,
  GripVertical,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  onOpenCreateCategory: () => void;
  onOpenCreateSubCategory: (categoryId?: string) => void;
  onOpenCreateTool: (categoryId?: string, subCategoryId?: string) => void;
  onEditCategory: (id: string) => void;
  onEditSubCategory: (id: string) => void;
  onEditTool: (id: string) => void;
}

export const TaxonomyTreeVisualizer: React.FC<Props> = ({
  onOpenCreateCategory,
  onOpenCreateSubCategory,
  onOpenCreateTool,
  onEditCategory,
  onEditSubCategory,
  onEditTool,
}) => {
  const {
    categories,
    subCategories,
    tools,
    toggleCategoryStatus,
    toggleSubCategoryStatus,
    toggleToolStatus,
    moveSubCategory,
    moveTool,
    duplicateTool,
    deleteTool,
    deleteCategory,
    deleteSubCategory,
  } = useCms();

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedSubCategories, setExpandedSubCategories] = useState<Record<string, boolean>>({});

  // Move Modal State
  const [moveModalState, setMoveModalState] = useState<{
    isOpen: boolean;
    itemType: 'subcategory' | 'tool';
    itemId: string;
    itemTitle: string;
    currentCategoryId: string | null;
    currentSubCategoryId?: string | null;
  }>({
    isOpen: false,
    itemType: 'tool',
    itemId: '',
    itemTitle: '',
    currentCategoryId: null,
  });

  // Safe Delete Prompt Modal State for Category/Subcategory
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    type: 'category' | 'subcategory';
    id: string;
    name: string;
    childSubCount: number;
    childToolCount: number;
  }>({
    isOpen: false,
    type: 'category',
    id: '',
    name: '',
    childSubCount: 0,
    childToolCount: 0,
  });

  const [orphanStrategy, setOrphanStrategy] = useState<'unassign' | 'reassign'>('reassign');
  const [reassignParentId, setReassignParentId] = useState<string>('');

  const toggleExpandCat = (id: string) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };

  const toggleExpandSub = (id: string) => {
    setExpandedSubCategories((prev) => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };

  const openMoveModalForSub = (subId: string, subName: string, catId: string | null) => {
    setMoveModalState({
      isOpen: true,
      itemType: 'subcategory',
      itemId: subId,
      itemTitle: subName,
      currentCategoryId: catId,
    });
  };

  const openMoveModalForTool = (toolId: string, toolTitle: string, catId: string | null, subId: string | null) => {
    setMoveModalState({
      isOpen: true,
      itemType: 'tool',
      itemId: toolId,
      itemTitle: toolTitle,
      currentCategoryId: catId,
      currentSubCategoryId: subId,
    });
  };

  const promptDeleteCategory = (catId: string, catName: string) => {
    const childSubs = subCategories.filter((s) => s.categoryId === catId);
    const childTools = tools.filter((t) => t.categoryId === catId);

    const otherCats = categories.filter((c) => c.id !== catId);
    setReassignParentId(otherCats[0]?.id || '');

    setDeleteModalState({
      isOpen: true,
      type: 'category',
      id: catId,
      name: catName,
      childSubCount: childSubs.length,
      childToolCount: childTools.length,
    });
  };

  const promptDeleteSubCategory = (subId: string, subName: string) => {
    const childTools = tools.filter((t) => t.subCategoryId === subId);
    const otherSubs = subCategories.filter((s) => s.id !== subId);
    setReassignParentId(otherSubs[0]?.id || '');

    setDeleteModalState({
      isOpen: true,
      type: 'subcategory',
      id: subId,
      name: subName,
      childSubCount: 0,
      childToolCount: childTools.length,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModalState.type === 'category') {
      deleteCategory(deleteModalState.id, orphanStrategy, reassignParentId || undefined);
    } else {
      deleteSubCategory(deleteModalState.id, orphanStrategy, reassignParentId || undefined);
    }
    setDeleteModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Unassigned items (orphaned via deletion without reassignment)
  const unassignedSubCategories = subCategories.filter(
    (s) => s.categoryId === null || !categories.some((c) => c.id === s.categoryId)
  );

  const unassignedTools = tools.filter(
    (t) =>
      t.categoryId === null ||
      !categories.some((c) => c.id === t.categoryId) ||
      (t.subCategoryId && !subCategories.some((s) => s.id === t.subCategoryId))
  );

  if (categories.length === 0 && unassignedSubCategories.length === 0 && unassignedTools.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-slate-200/80 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
          <FolderTree className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">Taxonomy Tree is Empty</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Get started by creating your first Main Category or seeding demo presets.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenCreateCategory}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" /> Create Main Category
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visualizer header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <FolderTree className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              3-Tier Dynamic Taxonomy &amp; Relocation Visualizer
            </h3>
            <p className="text-xs text-slate-500">
              Main Category ➔ Sub-Category ➔ SEO Tool. Re-parent and relocate items across silos with zero 404 hazards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCreateCategory}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> New Main Category
          </button>
        </div>
      </div>

      {/* Main Hierarchy Tree */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const isExpanded = expandedCategories[cat.id] !== false; // default expanded
          const childSubs = subCategories.filter((s) => s.categoryId === cat.id);
          const directTools = tools.filter((t) => t.categoryId === cat.id && !t.subCategoryId);

          return (
            <div
              key={cat.id}
              className={`bg-white rounded-2xl border transition-all ${
                cat.isActive ? 'border-slate-200 shadow-xs' : 'border-slate-200/60 bg-slate-50/40 opacity-75'
              }`}
            >
              {/* TIER 1: Main Category Bar */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleExpandCat(cat.id)}
                    className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <IconRenderer name={cat.icon} className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{cat.name}</span>
                      <span className="text-[11px] font-mono text-slate-400">/category/{cat.slug}</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        Tier 1 Hub
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{cat.description}</p>
                  </div>
                </div>

                {/* Tier 1 Actions */}
                <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => toggleCategoryStatus(cat.id)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                      cat.isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {cat.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {cat.isActive ? 'Active' : 'Hidden'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenCreateSubCategory(cat.id)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Sub-Cat
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenCreateTool(cat.id, undefined)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Tool
                  </button>

                  <button
                    type="button"
                    onClick={() => onEditCategory(cat.id)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => promptDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* TIER 2 & 3: Children Tree View */}
              {isExpanded && (
                <div className="p-4 sm:p-5 space-y-4 bg-slate-50/50 rounded-b-2xl">
                  {childSubs.length === 0 && directTools.length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-xs">
                      No sub-categories or SEO tools assigned to this category yet.
                    </div>
                  )}

                  {/* Sub-Categories */}
                  {childSubs.map((sub) => {
                    const isSubExpanded = expandedSubCategories[sub.id] !== false;
                    const subTools = tools.filter((t) => t.subCategoryId === sub.id);

                    return (
                      <div
                        key={sub.id}
                        className={`ml-2 sm:ml-6 bg-white rounded-xl border p-3 sm:p-4 space-y-3 ${
                          sub.isActive && cat.isActive
                            ? 'border-slate-200'
                            : 'border-slate-200/70 bg-slate-50/70 opacity-75'
                        }`}
                      >
                        {/* Sub-Category Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => toggleExpandSub(sub.id)}
                              className="p-1 hover:bg-slate-100 rounded text-slate-500"
                            >
                              {isSubExpanded ? (
                                <ChevronDown className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <Layers className="w-4 h-4 text-indigo-600" />

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">{sub.name}</span>
                                <span className="text-[10px] font-mono text-slate-400">/subcategory/{sub.slug}</span>
                                {!cat.isActive && (
                                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                                    Cascaded Hidden
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
                            <button
                              type="button"
                              onClick={() => toggleSubCategoryStatus(sub.id)}
                              className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ${
                                sub.isActive
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {sub.isActive ? 'Active' : 'Hidden'}
                            </button>

                            {/* Re-Parent / Move Sub-Category Button */}
                            <button
                              type="button"
                              onClick={() => openMoveModalForSub(sub.id, sub.name, sub.categoryId)}
                              className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md border border-indigo-200 flex items-center gap-1 transition-colors"
                            >
                              <ArrowRightLeft className="w-3 h-3" /> Move To...
                            </button>

                            <button
                              type="button"
                              onClick={() => onOpenCreateTool(cat.id, sub.id)}
                              className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Tool
                            </button>

                            <button
                              type="button"
                              onClick={() => onEditSubCategory(sub.id)}
                              className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => promptDeleteSubCategory(sub.id, sub.name)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                              title="Delete Sub-Category"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* TIER 3: Tools inside this Sub-Category */}
                        {isSubExpanded && subTools.length > 0 && (
                          <div className="ml-4 sm:ml-6 space-y-2 pt-2 border-t border-slate-100">
                            {subTools.map((t) => (
                              <div
                                key={t.id}
                                className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <Wrench className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                                  <span className="font-semibold text-slate-900">{t.title}</span>
                                  <span className="text-[10px] font-mono text-slate-400">/tool/{t.slug}</span>
                                  {t.badge !== 'None' && (
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 font-medium">
                                      {t.badge}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
                                  <button
                                    type="button"
                                    onClick={() => toggleToolStatus(t.id)}
                                    className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                                      t.isActive && t.status === 'published'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-slate-200 text-slate-700'
                                    }`}
                                  >
                                    {t.isActive ? 'Published' : 'Draft'}
                                  </button>

                                  {/* Move Tool Modal Trigger */}
                                  <button
                                    type="button"
                                    onClick={() => openMoveModalForTool(t.id, t.title, t.categoryId, t.subCategoryId)}
                                    className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded border border-emerald-200 flex items-center gap-1"
                                  >
                                    <ArrowRightLeft className="w-2.5 h-2.5" /> Move
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => duplicateTool(t.id)}
                                    className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                                    title="Duplicate Tool"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => onEditTool(t.id)}
                                    className="px-2 py-0.5 text-[10px] font-medium bg-white hover:bg-slate-100 rounded border border-slate-200"
                                  >
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => deleteTool(t.id)}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                                    title="Delete Tool"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Direct Tools under category without a sub-category */}
                  {directTools.length > 0 && (
                    <div className="ml-2 sm:ml-6 space-y-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        Direct Category Tools (Standalone under Hub)
                      </span>
                      {directTools.map((t) => (
                        <div
                          key={t.id}
                          className="p-2.5 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Wrench className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                            <span className="font-semibold text-slate-900">{t.title}</span>
                            <span className="text-[10px] font-mono text-slate-400">/tool/{t.slug}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
                            <button
                              type="button"
                              onClick={() => toggleToolStatus(t.id)}
                              className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                                t.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {t.isActive ? 'Published' : 'Draft'}
                            </button>

                            <button
                              type="button"
                              onClick={() => openMoveModalForTool(t.id, t.title, t.categoryId, null)}
                              className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded border border-emerald-200 flex items-center gap-1"
                            >
                              <ArrowRightLeft className="w-2.5 h-2.5" /> Move
                            </button>

                            <button
                              type="button"
                              onClick={() => duplicateTool(t.id)}
                              className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                              title="Duplicate Tool"
                            >
                              <Copy className="w-3 h-3" />
                            </button>

                            <button
                              type="button"
                              onClick={() => onEditTool(t.id)}
                              className="px-2 py-0.5 text-[10px] font-medium bg-slate-50 hover:bg-slate-100 rounded border border-slate-200"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteTool(t.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                              title="Delete Tool"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Unassigned / Orphaned Section (if any) */}
        {(unassignedSubCategories.length > 0 || unassignedTools.length > 0) && (
          <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 space-y-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Unassigned / Orphaned Items (Draft State)</span>
            </div>
            <p className="text-xs text-amber-800">
              These items were detached when parent categories were deleted. You can reassign them to any active category.
            </p>

            {unassignedSubCategories.map((sub) => (
              <div
                key={sub.id}
                className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between text-xs"
              >
                <div className="font-medium text-slate-900">
                  Sub-Category: {sub.name} <span className="text-slate-400 font-mono">({sub.slug})</span>
                </div>
                <button
                  type="button"
                  onClick={() => openMoveModalForSub(sub.id, sub.name, null)}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold"
                >
                  Assign to Category
                </button>
              </div>
            ))}

            {unassignedTools.map((t) => (
              <div
                key={t.id}
                className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between text-xs"
              >
                <div className="font-medium text-slate-900">
                  Tool: {t.title} <span className="text-slate-400 font-mono">({t.slug})</span>
                </div>
                <button
                  type="button"
                  onClick={() => openMoveModalForTool(t.id, t.title, null, null)}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold"
                >
                  Assign to Category
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Relocation Modal */}
      <MoveItemDialog
        isOpen={moveModalState.isOpen}
        onClose={() => setMoveModalState((prev) => ({ ...prev, isOpen: false }))}
        itemType={moveModalState.itemType}
        itemId={moveModalState.itemId}
        itemTitle={moveModalState.itemTitle}
        currentCategoryId={moveModalState.currentCategoryId}
        currentSubCategoryId={moveModalState.currentSubCategoryId}
      />

      {/* Safe Deletion Prompt Modal */}
      {deleteModalState.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Delete {deleteModalState.type === 'category' ? 'Main Category' : 'Sub-Category'}
                </h3>
                <p className="text-xs text-slate-500">"{deleteModalState.name}"</p>
              </div>
            </div>

            {(deleteModalState.childSubCount > 0 || deleteModalState.childToolCount > 0) && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
                <strong>Orphan Prevention:</strong> This item contains{' '}
                {deleteModalState.childSubCount > 0 && `${deleteModalState.childSubCount} sub-categories and `}
                {deleteModalState.childToolCount} SEO tools.
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="orphanStrategy"
                      checked={orphanStrategy === 'reassign'}
                      onChange={() => setOrphanStrategy('reassign')}
                      className="text-slate-900"
                    />
                    <span>Reassign children to another parent</span>
                  </label>

                  {orphanStrategy === 'reassign' && (
                    <select
                      value={reassignParentId}
                      onChange={(e) => setReassignParentId(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    >
                      {categories
                        .filter((c) => c.id !== deleteModalState.id)
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  )}

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="orphanStrategy"
                      checked={orphanStrategy === 'unassign'}
                      onChange={() => setOrphanStrategy('unassign')}
                      className="text-slate-900"
                    />
                    <span>Move children to Unassigned / Draft bucket</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalState((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl"
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
