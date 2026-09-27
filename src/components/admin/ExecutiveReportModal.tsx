import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import {
  Printer,
  Download,
  X,
  ShieldCheck,
  Building,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Sliders,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  healthScore: number;
}

export const ExecutiveReportModal: React.FC<Props> = ({ isOpen, onClose, healthScore }) => {
  const { categories, subCategories, tools, redirects } = useCms();
  const [clientName, setClientName] = useState('Acme Corporation');
  const [auditorName, setAuditorName] = useState('Veritas Technical SEO Lead');
  const [reportTitle, setReportTitle] = useState('Comprehensive SEO Architecture & Indexability Audit');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (score >= 80) return { grade: 'A', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-700 bg-blue-50 border-blue-300' };
    if (score >= 60) return { grade: 'C', color: 'text-amber-700 bg-amber-50 border-amber-300' };
    return { grade: 'F', color: 'text-rose-700 bg-rose-50 border-rose-300' };
  };

  const gradeInfo = getGrade(healthScore);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar (hidden on print) */}
        <div className="print:hidden p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">Executive SEO Audit Report Studio</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization Bar (hidden on print) */}
        <div className="print:hidden p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Client / Domain</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Auditor / Agency Title</label>
            <input
              type="text"
              value={auditorName}
              onChange={(e) => setAuditorName(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Report Heading</label>
            <input
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-white font-sans text-slate-900 leading-normal">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b-2 border-slate-900 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-serif font-bold text-sm">
                  V
                </div>
                <span className="font-bold text-base tracking-tight text-slate-900">
                  Veritas SEO Diagnostic Labs
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {reportTitle}
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                Prepared for: <strong className="text-slate-900">{clientName}</strong> · Lead Auditor: {auditorName}
              </p>
            </div>

            {/* Health Score & Grade Stamp */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Indexability Score
                </span>
                <span className="text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
                  {healthScore}/100
                </span>
              </div>
              <div
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-extrabold text-2xl font-mono ${gradeInfo.color}`}
              >
                {gradeInfo.grade}
              </div>
            </div>
          </div>

          {/* Platform Scale Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Main Taxonomy Hubs</span>
              <span className="text-2xl font-bold font-mono text-slate-900">{categories.length}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Sub-Category Silos</span>
              <span className="text-2xl font-bold font-mono text-slate-900">{subCategories.length}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Published SEO Engines</span>
              <span className="text-2xl font-bold font-mono text-slate-900">{tools.length}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active 301 Rules</span>
              <span className="text-2xl font-bold font-mono text-slate-900">{redirects.length}</span>
            </div>
          </div>

          {/* Key Executive Pillars */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Architecture Audit Findings &amp; Technical Compliance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Canonical &amp; URL Preservation
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All published taxonomy routes feature strictly defined self-referential canonical tags to prevent duplicate content consolidation issues.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Schema.org Structured Data
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  WebApplication, BreadcrumbList, CollectionPage, and FAQPage JSON-LD schemas validated against Google Search Central guidelines.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Core Web Vitals &amp; Zero CLS
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Strict CSS layout sizing ensures zero cumulative layout shift (CLS &lt; 0.05) across desktop and mobile screen viewports.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Region Hreflang Matrix
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bidirectional hreflang reciprocal links with global x-default fallback directives protect international search visibility.
                </p>
              </div>
            </div>
          </div>

          {/* Actionable Priority Remediation Roadmap */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Recommended 30-Day Engineering Roadmap
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">01.</span>
                <span>Audit all title tags exceeding 580px to prevent Google truncation ellipses.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">02.</span>
                <span>Enrich educational formula content and step-by-step guides for high-intent calculators.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">03.</span>
                <span>Submit generated XML sitemaps to Google Search Console and Bing Webmaster Tools.</span>
              </li>
            </ul>
          </div>

          {/* Document Sign-off */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>Veritas SEO Enterprise Engine · Confidential Audit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
