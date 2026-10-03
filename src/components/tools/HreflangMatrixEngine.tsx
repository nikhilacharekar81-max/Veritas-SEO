import React, { useState } from 'react';
import type { SeoTool } from '../../lib/schemas';
import {
  Globe,
  Plus,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  FileCode,
  Layers,
  ArrowRightLeft,
  Sparkles,
  Info,
} from 'lucide-react';
import { HreflangMatrixGuide } from './HreflangMatrixGuide';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

interface HreflangEntry {
  id: string;
  langCode: string; // e.g. "en", "es", "fr", "de"
  regionCode: string; // e.g. "US", "GB", "ES", "MX"
  url: string;
  isXDefault: boolean;
}

const COMMON_PRESETS: { label: string; entries: Omit<HreflangEntry, 'id'>[] }[] = [
  {
    label: 'Global English (US / UK / Global Default)',
    entries: [
      { langCode: 'en', regionCode: 'US', url: 'https://example.com/us/', isXDefault: false },
      { langCode: 'en', regionCode: 'GB', url: 'https://example.com/uk/', isXDefault: false },
      { langCode: 'en', regionCode: '', url: 'https://example.com/', isXDefault: true },
    ],
  },
  {
    label: 'North America (US / CA English & French)',
    entries: [
      { langCode: 'en', regionCode: 'US', url: 'https://example.com/en-us/', isXDefault: false },
      { langCode: 'en', regionCode: 'CA', url: 'https://example.com/en-ca/', isXDefault: false },
      { langCode: 'fr', regionCode: 'CA', url: 'https://example.com/fr-ca/', isXDefault: false },
      { langCode: 'en', regionCode: '', url: 'https://example.com/', isXDefault: true },
    ],
  },
  {
    label: 'European Multi-Language (EN / DE / FR / ES)',
    entries: [
      { langCode: 'en', regionCode: '', url: 'https://example.com/en/', isXDefault: true },
      { langCode: 'de', regionCode: 'DE', url: 'https://example.com/de/', isXDefault: false },
      { langCode: 'fr', regionCode: 'FR', url: 'https://example.com/fr/', isXDefault: false },
      { langCode: 'es', regionCode: 'ES', url: 'https://example.com/es/', isXDefault: false },
    ],
  },
];

export const HreflangMatrixEngine: React.FC<Props> = ({ onPerformCalculation }) => {
  const [entries, setEntries] = useState<HreflangEntry[]>([
    { id: 'h1', langCode: 'en', regionCode: 'US', url: 'https://example.com/us/', isXDefault: false },
    { id: 'h2', langCode: 'en', regionCode: 'GB', url: 'https://example.com/uk/', isXDefault: false },
    { id: 'h3', langCode: 'fr', regionCode: 'FR', url: 'https://example.com/fr/', isXDefault: false },
    { id: 'h4', langCode: 'de', regionCode: 'DE', url: 'https://example.com/de/', isXDefault: false },
    { id: 'h5', langCode: 'en', regionCode: '', url: 'https://example.com/', isXDefault: true },
  ]);

  const [outputFormat, setOutputFormat] = useState<'html' | 'xml'>('html');
  const [copied, setCopied] = useState(false);

  const addEntry = () => {
    const newEntry: HreflangEntry = {
      id: `h_${Date.now()}`,
      langCode: 'es',
      regionCode: 'ES',
      url: 'https://example.com/es/',
      isXDefault: false,
    };
    setEntries((prev) => [...prev, newEntry]);
    onPerformCalculation?.();
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    onPerformCalculation?.();
  };

  const updateEntry = (id: string, updates: Partial<HreflangEntry>) => {
    setEntries((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          return { ...e, ...updates };
        }
        // If setting x-default on one, others should uncheck
        if (updates.isXDefault) {
          return { ...e, isXDefault: false };
        }
        return e;
      })
    );
    onPerformCalculation?.();
  };

  const applyPreset = (presetIndex: number) => {
    const preset = COMMON_PRESETS[presetIndex];
    if (preset) {
      setEntries(
        preset.entries.map((item, idx) => ({
          ...item,
          id: `h_${Date.now()}_${idx}`,
        }))
      );
      onPerformCalculation?.();
    }
  };

  // Diagnostics & Audit Checks
  const issues: { type: 'error' | 'warning' | 'success'; message: string }[] = [];
  const hasXDefault = entries.some((e) => e.isXDefault);
  const duplicates = new Set<string>();
  const seenTags = new Set<string>();

  entries.forEach((e) => {
    const tag = e.isXDefault ? 'x-default' : e.regionCode ? `${e.langCode}-${e.regionCode}` : e.langCode;
    if (seenTags.has(tag)) {
      duplicates.add(tag);
    }
    seenTags.add(tag);
  });

  if (!hasXDefault) {
    issues.push({
      type: 'warning',
      message: 'Missing "x-default" fallback directive for unmatched international locales.',
    });
  } else {
    issues.push({
      type: 'success',
      message: 'Global fallback (x-default) is correctly configured.',
    });
  }

  if (duplicates.size > 0) {
    issues.push({
      type: 'error',
      message: `Duplicate hreflang tags detected: ${Array.from(duplicates).join(', ')}.`,
    });
  }

  if (entries.length < 2) {
    issues.push({
      type: 'warning',
      message: 'Hreflang requires at least 2 language/regional alternate variations.',
    });
  }

  // Generated Code Output
  const generateOutput = () => {
    if (outputFormat === 'html') {
      return entries
        .map((e) => {
          const hreflangValue = e.isXDefault
            ? 'x-default'
            : e.regionCode
            ? `${e.langCode.toLowerCase()}-${e.regionCode.toUpperCase()}`
            : e.langCode.toLowerCase();
          return `<link rel="alternate" hreflang="${hreflangValue}" href="${e.url}" />`;
        })
        .join('\n');
    } else {
      // XML Sitemap format
      const links = entries
        .map((e) => {
          const hreflangValue = e.isXDefault
            ? 'x-default'
            : e.regionCode
            ? `${e.langCode.toLowerCase()}-${e.regionCode.toUpperCase()}`
            : e.langCode.toLowerCase();
          return `    <xhtml:link rel="alternate" hreflang="${hreflangValue}" href="${e.url}"/>`;
        })
        .join('\n');

      return `<!-- XML Sitemap Multi-Language Block -->
<url>
  <loc>${entries[0]?.url || 'https://example.com/'}</loc>
${links}
</url>`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Title & Presets Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600" /> Hreflang Tag Matrix &amp; Multi-Region Validator
          </h3>
          <p className="text-xs text-slate-500">
            Generate bidirectional ISO 639-1 / ISO 3166-1 alternate tags with x-default fallbacks and self-referential canonical safety.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Presets:
          </span>
          <select
            onChange={(e) => applyPreset(Number(e.target.value))}
            className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
          >
            <option value="">Select Architecture Preset...</option>
            {COMMON_PRESETS.map((p, idx) => (
              <option key={idx} value={idx}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Matrix Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Alternate Language / Regional Targets ({entries.length})
          </h4>
          <button
            type="button"
            onClick={addEntry}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Language / Region Target
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Language Code (ISO 639-1)</th>
                <th className="py-2.5 px-4">Region Code (ISO 3166-1)</th>
                <th className="py-2.5 px-4">x-Default Fallback</th>
                <th className="py-2.5 px-4">Full Target URL</th>
                <th className="py-2.5 px-4 text-center">Computed Hreflang</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {entries.map((entry) => {
                const computedTag = entry.isXDefault
                  ? 'x-default'
                  : entry.regionCode
                  ? `${entry.langCode.toLowerCase()}-${entry.regionCode.toUpperCase()}`
                  : entry.langCode.toLowerCase();

                return (
                  <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 px-4">
                      <input
                        type="text"
                        value={entry.langCode}
                        disabled={entry.isXDefault}
                        onChange={(e) => updateEntry(entry.id, { langCode: e.target.value })}
                        placeholder="en"
                        className="w-16 px-2.5 py-1 text-xs border border-slate-200 rounded-lg font-mono text-center disabled:bg-slate-100"
                        maxLength={3}
                      />
                    </td>
                    <td className="py-2.5 px-4">
                      <input
                        type="text"
                        value={entry.regionCode}
                        disabled={entry.isXDefault}
                        onChange={(e) => updateEntry(entry.id, { regionCode: e.target.value })}
                        placeholder="US (optional)"
                        className="w-24 px-2.5 py-1 text-xs border border-slate-200 rounded-lg font-mono text-center disabled:bg-slate-100 uppercase"
                        maxLength={3}
                      />
                    </td>
                    <td className="py-2.5 px-4">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={entry.isXDefault}
                          onChange={(e) => updateEntry(entry.id, { isXDefault: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                        />
                        <span className="text-[11px] font-mono text-slate-700">x-default</span>
                      </label>
                    </td>
                    <td className="py-2.5 px-4">
                      <input
                        type="url"
                        value={entry.url}
                        onChange={(e) => updateEntry(entry.id, { url: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg font-mono"
                      />
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-emerald-100 text-emerald-800">
                        {computedTag}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete target"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Matrix & Diagnostic Status */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <ArrowRightLeft className="w-4 h-4 text-emerald-600" /> Bidirectional Matrix Validation Status
        </h4>
        <div className="space-y-1.5">
          {issues.map((iss, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl text-xs flex items-center gap-2.5 ${
                iss.type === 'error'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                  : iss.type === 'warning'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {iss.type === 'error' && <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />}
              {iss.type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />}
              {iss.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />}
              <span>{iss.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Exportable Code Generation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Generated Implementation Code
            </span>
            <div className="inline-flex p-0.5 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setOutputFormat('html')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  outputFormat === 'html' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                HTML &lt;head&gt;
              </button>
              <button
                type="button"
                onClick={() => setOutputFormat('xml')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  outputFormat === 'xml' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                XML Sitemap Block
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard' : 'Copy Code'}
          </button>
        </div>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{generateOutput()}</code>
        </pre>
      </div>

      {/* COMPREHENSIVE HREFLANG MATRIX & INTERNATIONAL SEO GUIDE */}
      <div className="w-full h-auto pt-8 border-t border-slate-200/80">
        <HreflangMatrixGuide />
      </div>
    </div>
  );
};
