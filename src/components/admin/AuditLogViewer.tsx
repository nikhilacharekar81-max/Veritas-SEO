import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import { formatTimestamp } from '../../lib/utils';
import { History, Search, Filter, Shield } from 'lucide-react';

export const AuditLogViewer: React.FC = () => {
  const { auditLogs } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Governance &amp; Taxonomy Audit Trail</h3>
            <p className="text-xs text-slate-500">
              Immutable runtime record of administrative actions, hierarchy changes, and status toggles.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
          >
            <option value="all">All Action Types</option>
            <option value="created">Created</option>
            <option value="edited">Edited</option>
            <option value="moved">Moved</option>
            <option value="toggled_status">Toggled Status</option>
            <option value="deleted">Deleted</option>
            <option value="redirect_created">Redirect Created</option>
            <option value="bulk_action">Bulk Action</option>
          </select>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit trail..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none w-44"
            />
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {auditLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No audit log entries recorded yet. Administrative events will be captured here in real-time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Timestamp (UTC)</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4">Activity Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors text-slate-800">
                    <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider ${
                          log.action === 'created'
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.action === 'deleted'
                            ? 'bg-red-100 text-red-800'
                            : log.action === 'moved'
                            ? 'bg-purple-100 text-purple-800'
                            : log.action === 'redirect_created'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-900">
                      <span className="text-xs">{log.entityName}</span>
                      <span className="text-[10px] text-slate-400 font-mono ml-2">[{log.entityType}]</span>
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-600 text-xs">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
