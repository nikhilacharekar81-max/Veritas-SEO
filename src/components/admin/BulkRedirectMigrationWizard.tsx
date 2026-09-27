import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import {
  GitFork,
  Upload,
  Download,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Sparkles,
  Server,
  Cloud,
} from 'lucide-react';

export const BulkRedirectMigrationWizard: React.FC = () => {
  const { addRedirect } = useCms();
  const [inputText, setInputText] = useState(
    `/old-blog/post-1 -> /blog/post-1\n/old-category/seo-tips -> /category/onpage-content\n/tools/old-density-meter -> /tool/keyword-density-analyzer\n/v1/pricing -> /pricing`
  );
  const [exportFormat, setExportFormat] = useState<'htaccess' | 'nginx' | 'cloudflare'>('htaccess');
  const [importedCount, setImportedCount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Parse lines
  const parsedPairs = inputText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, idx) => {
      const parts = line.includes('->')
        ? line.split('->')
        : line.includes(',')
        ? line.split(',')
        : line.split(/\s+/);
      const fromPath = parts[0]?.trim() || '';
      const toPath = parts[1]?.trim() || '';

      const isFromValid = fromPath.startsWith('/');
      const isToValid = toPath.startsWith('/');
      const isLoop = fromPath === toPath;

      return {
        id: idx,
        fromPath,
        toPath,
        isValid: isFromValid && isToValid && !isLoop,
        error: isLoop
          ? 'Infinite loop: source equals destination'
          : !isFromValid
          ? 'Source must start with /'
          : !isToValid
          ? 'Target must start with /'
          : null,
      };
    });

  const validCount = parsedPairs.filter((p) => p.isValid).length;

  const handleBulkImportToCms = () => {
    let count = 0;
    parsedPairs.forEach((p) => {
      if (p.isValid) {
        addRedirect({
          fromPath: p.fromPath,
          toPath: p.toPath,
          statusCode: 301,
          reason: 'Bulk Migration Wizard import',
          entityType: 'manual',
          entityId: null,
        });
        count++;
      }
    });
    setImportedCount(count);
    setTimeout(() => setImportedCount(null), 3000);
  };

  const generateExportCode = () => {
    if (exportFormat === 'htaccess') {
      const lines = parsedPairs
        .filter((p) => p.isValid)
        .map((p) => `Redirect 301 ${p.fromPath} ${p.toPath}`);
      return `# Apache .htaccess 301 Rewrite Rules\n<IfModule mod_rewrite.c>\nRewriteEngine On\n${lines.join(
        '\n'
      )}\n</IfModule>`;
    } else if (exportFormat === 'nginx') {
      const lines = parsedPairs
        .filter((p) => p.isValid)
        .map((p) => `    rewrite ^${p.fromPath}$ ${p.toPath} permanent;`);
      return `# NGINX 301 Permanent Redirect Configuration\nserver {\n${lines.join('\n')}\n}`;
    } else {
      // Cloudflare Bulk Redirect JSON
      const rules = parsedPairs
        .filter((p) => p.isValid)
        .map((p) => ({
          source_url: `https://example.com${p.fromPath}`,
          target_url: `https://example.com${p.toPath}`,
          status_code: 301,
          preserve_query_string: true,
        }));
      return JSON.stringify(rules, null, 2);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-emerald-600" /> Bulk 301 URL Redirect &amp; Migration Wizard
          </h3>
          <p className="text-xs text-slate-500">
            Paste legacy-to-new URL pairs, detect loop hazards, and export to Apache .htaccess, NGINX, or Cloudflare Bulk JSON.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBulkImportToCms}
            disabled={validCount === 0}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            {importedCount !== null
              ? `Imported ${importedCount} Rules!`
              : `Import ${validCount} Rules to CMS`}
          </button>
        </div>
      </div>

      {/* Editor & Diagnostic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span>Input URL Mapping (Format: /old-path -&gt; /new-path)</span>
            <span className="font-mono font-normal text-slate-500">{parsedPairs.length} lines</span>
          </div>
          <textarea
            rows={8}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`/old-path -> /new-path\n/legacy-slug -> /new-slug`}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none leading-relaxed"
          />
        </div>

        {/* Validation Matrix */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Real-Time Integrity Verification
          </span>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 max-h-56 overflow-y-auto">
            {parsedPairs.map((p) => (
              <div
                key={p.id}
                className={`p-2.5 rounded-xl text-xs flex items-center justify-between ${
                  p.isValid ? 'bg-white border border-slate-200 text-slate-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}
              >
                <div className="font-mono truncate pr-2">
                  <span className="font-bold">{p.fromPath}</span> → <span>{p.toPath}</span>
                </div>
                {p.isValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span title={p.error || ''} className="shrink-0">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exporter Section */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Web Server Rewrite Export
            </span>
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setExportFormat('htaccess')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  exportFormat === 'htaccess' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Apache .htaccess
              </button>
              <button
                type="button"
                onClick={() => setExportFormat('nginx')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  exportFormat === 'nginx' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                NGINX Rewrite
              </button>
              <button
                type="button"
                onClick={() => setExportFormat('cloudflare')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  exportFormat === 'cloudflare' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Cloudflare JSON
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Code'}
          </button>
        </div>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{generateExportCode()}</code>
        </pre>
      </div>
    </div>
  );
};
