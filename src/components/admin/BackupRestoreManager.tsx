import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import {
  Download,
  Upload,
  Sparkles,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  FileJson,
  ShieldCheck,
} from 'lucide-react';

export const BackupRestoreManager: React.FC = () => {
  const {
    categories,
    subCategories,
    tools,
    redirects,
    exportRegistryJson,
    importRegistryJson,
    seedDemoPresets,
    clearAllData,
  } = useCms();

  const [importJsonText, setImportJsonText] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleDownload = () => {
    const jsonStr = exportRegistryJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `veritas-seo-taxonomy-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportJsonText(content);
        const res = importRegistryJson(content);
        setFeedback(res);
      }
    };
    reader.readAsText(file);
  };

  const handlePasteImport = () => {
    if (!importJsonText.trim()) return;
    const res = importRegistryJson(importJsonText);
    setFeedback(res);
  };

  const handleSeedDemo = () => {
    if (confirm('Load demo SEO suite preset (Technical SEO, On-Page SERP, Schema.org)?')) {
      seedDemoPresets();
      setFeedback({
        success: true,
        message: 'Successfully populated demo SEO tools preset!',
      });
    }
  };

  const handleReset = () => {
    if (confirm('CRITICAL: Reset state to zero categories, sub-categories, and tools?')) {
      clearAllData();
      setFeedback({
        success: true,
        message: 'Platform state reset to initial zero-data state.',
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <FileJson className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Taxonomy Backup, Export &amp; Bulk Import</h3>
            <p className="text-xs text-slate-500">
              Zod runtime schema-validated export and restore of all categories, tools, and 301 redirect rules.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Export JSON Backup
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 text-xs animate-in fade-in ${
            feedback.success
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-red-50 text-red-900 border-red-200'
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <strong>{feedback.success ? 'Operation Successful' : 'Validation Error'}:</strong>{' '}
            {feedback.message}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Restore Section */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Upload className="w-4 h-4 text-emerald-600" /> Restore / Bulk Import JSON
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Upload .json Backup File
            </label>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileUpload}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 cursor-pointer"
            />
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-[11px] uppercase font-bold">Or Paste JSON</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <textarea
            rows={6}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder="Paste raw Zod-validated CmsRegistry JSON string here..."
            className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
          />

          <button
            type="button"
            onClick={handlePasteImport}
            disabled={!importJsonText.trim()}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Validate Schema &amp; Restore Taxonomy
          </button>
        </div>

        {/* Quick Tools & Demo Presets */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Preset Demonstration Suite
            </h4>

            <p className="text-xs text-slate-500 leading-relaxed">
              Populate the platform with standard production categories (Technical SEO, On-Page SERP, Schema.org) and interactive tools.
            </p>

            <button
              type="button"
              onClick={handleSeedDemo}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" /> Seed Demo SEO Tools Suite
            </button>
          </div>

          {/* Reset All */}
          <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-xs space-y-4">
            <h4 className="text-sm font-semibold text-red-900 flex items-center gap-2 border-b border-red-100 pb-3">
              <Trash2 className="w-4 h-4 text-red-600" /> Zero Seed State Reset
            </h4>

            <p className="text-xs text-slate-500 leading-relaxed">
              Clear all categories, subcategories, tools, and redirects to test the cold start empty-state experience.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-xl border border-red-200 flex items-center justify-center gap-2 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" /> Reset to Zero Data State
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
