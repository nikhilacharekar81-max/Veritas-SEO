import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import {
  FolderTree,
  Folder,
  Layers,
  Wrench,
  ArrowRight,
  X,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { MoveSubCategorySchema, MoveToolSchema } from '../../lib/taxonomySchemas';

interface MoveItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'subcategory' | 'tool';
  itemId: string;
  itemTitle: string;
  currentCategoryId: string | null;
  currentSubCategoryId?: string | null;
}

export const MoveItemDialog: React.FC<MoveItemDialogProps> = ({
  isOpen,
  onClose,
  itemType,
  itemId,
  itemTitle,
  currentCategoryId,
  currentSubCategoryId,
}) => {
  const { categories, subCategories, moveSubCategory, moveTool } = useCms();

  const [selectedCatId, setSelectedCatId] = useState<string | null>(currentCategoryId ?? null);
  const [selectedSubCatId, setSelectedSubCatId] = useState<string | null>(currentSubCategoryId ?? null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter available sub-categories for the selected category
  const availableSubCategories = selectedCatId
    ? subCategories.filter((s) => s.categoryId === selectedCatId)
    : [];

  const handleSaveMove = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (itemType === 'subcategory') {
        const validated = MoveSubCategorySchema.parse({
          subCategoryId: itemId,
          targetCategoryId: selectedCatId || null,
        });

        moveSubCategory(validated.subCategoryId, validated.targetCategoryId);
      } else {
        const validated = MoveToolSchema.parse({
          toolId: itemId,
          targetCategoryId: selectedCatId || null,
          targetSubCategoryId: selectedSubCatId || null,
        });

        moveTool(validated.toolId, validated.targetCategoryId, validated.targetSubCategoryId);
      }

      onClose();
    } catch (err: any) {
      if (err.errors && err.errors[0]) {
        setErrorMessage(err.errors[0].message);
      } else {
        setErrorMessage(err.message || 'Failed to move item.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              {itemType === 'subcategory' ? (
                <Layers className="w-5 h-5 text-indigo-400" />
              ) : (
                <Wrench className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Relocate {itemType === 'subcategory' ? 'Sub-Category' : 'SEO Tool'}
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-sm">
                Moving <strong className="text-slate-800 font-semibold">"{itemTitle}"</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveMove} className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Target Main Category Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Target Main Category
            </label>
            <select
              value={selectedCatId ?? ''}
              onChange={(e) => {
                const val = e.target.value ? e.target.value : null;
                setSelectedCatId(val);
                // Reset subcategory if category changes
                setSelectedSubCatId(null);
              }}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
            >
              <option value="">(None / Move to Unassigned Drafts)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  📁 {cat.name} ({cat.isActive ? 'Active' : 'Hidden'})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              {itemType === 'subcategory'
                ? 'Moving this sub-category automatically updates the parent hierarchy and preserves all SEO tools inside.'
                : 'Choose the parent Main Category.'}
            </p>
          </div>

          {/* If item is a Tool, optionally allow placing inside a Sub-Category */}
          {itemType === 'tool' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Target Sub-Category (Optional)
              </label>
              <select
                value={selectedSubCatId ?? ''}
                disabled={!selectedCatId || availableSubCategories.length === 0}
                onChange={(e) => setSelectedSubCatId(e.target.value ? e.target.value : null)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 disabled:opacity-50 disabled:bg-slate-100"
              >
                <option value="">(None - Standalone Direct Tool under Main Category)</option>
                {availableSubCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    🗂️ {sub.name} ({sub.isActive ? 'Active' : 'Hidden'})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">
                {!selectedCatId
                  ? 'Select a Main Category first to choose sub-categories.'
                  : availableSubCategories.length === 0
                  ? 'Selected Main Category has no sub-categories (tool will be placed directly under Main Category).'
                  : 'Place inside a sub-category silo, or leave as standalone tool.'}
              </p>
            </div>
          )}

          {/* Relocation Path Summary Preview */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Resulting Routing &amp; Breadcrumb Path
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-900 font-semibold flex-wrap">
              <span>Home</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span>
                {selectedCatId
                  ? categories.find((c) => c.id === selectedCatId)?.name || 'Category'
                  : '(Unassigned)'}
              </span>
              {itemType === 'tool' && selectedSubCatId && (
                <>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>
                    {subCategories.find((s) => s.id === selectedSubCatId)?.name || 'Sub-Category'}
                  </span>
                </>
              )}
              <ArrowRight className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-700 font-bold">{itemTitle}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Save Relocation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
