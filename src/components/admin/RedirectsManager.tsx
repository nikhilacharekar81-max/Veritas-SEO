import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import type { RedirectRule } from '../../lib/schemas';
import { BulkRedirectMigrationWizard } from './BulkRedirectMigrationWizard';
import {
  GitFork,
  Plus,
  Trash2,
  Search,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles,
  FileCode,
} from 'lucide-react';

export const RedirectsManager: React.FC = () => {
  const { redirects, addRedirect, deleteRedirect } = useCms();
  const [activeTab, setActiveTab] = useState<'rules' | 'wizard'>('rules');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [fromPath, setFromPath] = useState('');
  const [toPath, setToPath] = useState('');
  const [statusCode, setStatusCode] = useState<301 | 302>(301);
  const [reason, setReason] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromPath.trim() || !toPath.trim()) return;

    addRedirect({
      fromPath: fromPath.startsWith('/') ? fromPath : `/${fromPath}`,
      toPath: toPath.startsWith('/') ? toPath : `/${toPath}`,
      statusCode,
      reason: reason || 'Manual redirect rule created by administrator',
      entityType: 'manual',
      entityId: null,
    });

    setFromPath('');
    setToPath('');
    setReason('');
    setIsOpenCreate(false);
  };

  const filteredRedirects = redirects.filter(
    (r) =>
      r.fromPath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.toPath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">301/302 Redirect &amp; SEO Equity Registry</h3>
            <p className="text-xs text-slate-500">
              Automatic and manual 301 rewrite mappings protecting Google backlinks, PageRank, and indexed URLs.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'rules' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Active 301 Rules ({redirects.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('wizard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'wizard' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> Bulk Migration &amp; Exporter
            </button>
          </div>

          {activeTab === 'rules' && (
            <>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search redirects..."
                  className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 w-44"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsOpenCreate(true)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Redirect
              </button>
            </>
          )}
        </div>
      </div>

      {activeTab === 'wizard' ? (
        <BulkRedirectMigrationWizard />
      ) : (
        /* Table */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {redirects.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No redirect mappings registered. Whenever a category or tool slug changes, an automatic 301 rule is created here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Source Path (From)</th>
                  <th className="py-3 px-4">Destination Target (To)</th>
                  <th className="py-3 px-4">Trigger / Reason</th>
                  <th className="py-3 px-4 text-center">Hits</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRedirects.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-md font-mono font-bold text-[11px] ${
                          r.statusCode === 301
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {r.statusCode}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-900">{r.fromPath}</td>
                    <td className="py-3 px-4 font-mono text-emerald-700 font-semibold">{r.toPath}</td>
                    <td className="py-3 px-4 text-slate-500 max-w-xs truncate">{r.reason}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">
                      {r.hits}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => deleteRedirect(r.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Redirect"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      )}

      {/* CREATE MODAL */}
      {isOpenCreate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900">Add 301/302 Redirect Rule</h3>
            <p className="text-xs text-slate-500">
              Create an explicit server routing mapping to prevent 404 dead ends.
            </p>

            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Source Path (From)
                </label>
                <input
                  type="text"
                  required
                  value={fromPath}
                  onChange={(e) => setFromPath(e.target.value)}
                  placeholder="/old-landing-page"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination Target (To)
                </label>
                <input
                  type="text"
                  required
                  value={toPath}
                  onChange={(e) => setToPath(e.target.value)}
                  placeholder="/category/new-hub"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">HTTP Status</label>
                  <select
                    value={statusCode}
                    onChange={(e) => setStatusCode(Number(e.target.value) as 301 | 302)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value={301}>301 (Permanent)</option>
                    <option value={302}>302 (Temporary)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reason / Note</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Legacy migration"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpenCreate(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs"
                >
                  Add Redirect Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
