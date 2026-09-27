import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import { evaluateOnPageSeoHealth } from '../../lib/seo-math';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight,
} from 'lucide-react';

interface Props {
  onEditCategory: (id: string) => void;
  onEditSubCategory: (id: string) => void;
  onEditTool: (id: string) => void;
}

export const HealthAuditor: React.FC<Props> = ({
  onEditCategory,
  onEditSubCategory,
  onEditTool,
}) => {
  const { categories, subCategories, tools } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'category' | 'subcategory' | 'tool'>('all');
  const [filterGrade, setFilterGrade] = useState<'all' | 'critical' | 'pass'>('all');

  // Compute live health scores for every entity
  const auditedItems = [
    ...categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      type: 'category' as const,
      path: `/category/${c.slug}`,
      audit: evaluateOnPageSeoHealth({
        title: c.name,
        metaTitle: c.seo.metaTitle,
        metaDescription: c.seo.metaDescription,
        focusKeyword: c.seo.focusKeyword,
        canonicalUrl: c.seo.canonicalUrl,
        description: c.description,
        ogImage: c.seo.ogImage,
      }),
    })),
    ...subCategories.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      type: 'subcategory' as const,
      path: `/subcategory/${s.slug}`,
      audit: evaluateOnPageSeoHealth({
        title: s.name,
        metaTitle: s.seo.metaTitle,
        metaDescription: s.seo.metaDescription,
        focusKeyword: s.seo.focusKeyword,
        canonicalUrl: s.seo.canonicalUrl,
        description: s.description,
        ogImage: s.seo.ogImage,
      }),
    })),
    ...tools.map((t) => ({
      id: t.id,
      name: t.title,
      slug: t.slug,
      type: 'tool' as const,
      path: `/tool/${t.slug}`,
      audit: evaluateOnPageSeoHealth({
        title: t.title,
        metaTitle: t.seo.metaTitle,
        metaDescription: t.seo.metaDescription,
        focusKeyword: t.seo.focusKeyword,
        canonicalUrl: t.seo.canonicalUrl,
        shortSummary: t.shortSummary,
        faqsCount: t.faqs?.length || 0,
        howItWorks: t.educationalContent?.howItWorks,
        formulaMethodology: t.educationalContent?.formulaMethodology,
        ogImage: t.seo.ogImage,
      }),
    })),
  ];

  const filteredItems = auditedItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesGrade =
      filterGrade === 'all' ||
      (filterGrade === 'critical' && item.audit.score < 70) ||
      (filterGrade === 'pass' && item.audit.score >= 70);
    return matchesSearch && matchesType && matchesGrade;
  });

  const averageScore =
    auditedItems.length > 0
      ? Math.round(
          auditedItems.reduce((acc, curr) => acc + curr.audit.score, 0) / auditedItems.length
        )
      : 0;

  const totalCriticalIssues = auditedItems.reduce(
    (acc, curr) => acc + curr.audit.issues.filter((i) => i.type === 'critical').length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold font-mono text-white ${
              averageScore >= 80 ? 'bg-emerald-600' : averageScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
            }`}
          >
            <span className="text-xl leading-none">{averageScore}</span>
            <span className="text-[10px] uppercase tracking-wider">Avg</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Global Platform SEO Score</span>
            <span className="text-sm font-bold text-slate-900">
              Across {auditedItems.length} indexed URLs
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Critical Optimization Gaps</span>
            <span className="text-2xl font-bold font-mono text-slate-900">{totalCriticalIssues}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Algorithmic Readiness</span>
            <span className="text-sm font-bold text-slate-900">Google Core 2026 Compatible</span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
          >
            <option value="all">All Entity Types</option>
            <option value="category">Main Categories</option>
            <option value="subcategory">Sub-Categories</option>
            <option value="tool">SEO Tools</option>
          </select>

          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
          >
            <option value="all">All Health Grades</option>
            <option value="critical">Needs Attention (&lt; 70 pts)</option>
            <option value="pass">Passing (&gt;= 70 pts)</option>
          </select>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audited URLs..."
            className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none w-48"
          />
        </div>
      </div>

      {/* Audit List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No entities to audit. Create categories or SEO tools to run on-page technical diagnostics.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-5 hover:bg-slate-50/50 transition-colors space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl font-mono font-bold text-xs flex items-center justify-center text-white shrink-0 ${
                        item.audit.score >= 85
                          ? 'bg-emerald-600'
                          : item.audit.score >= 70
                          ? 'bg-blue-600'
                          : item.audit.score >= 50
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {item.audit.score}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {item.type}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-slate-400">{item.path}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        if (item.type === 'category') onEditCategory(item.id);
                        else if (item.type === 'subcategory') onEditSubCategory(item.id);
                        else onEditTool(item.id);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center gap-1 transition-all shadow-xs"
                    >
                      Edit SEO Suite <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Checklist issues chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.audit.issues.map((issue, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                        issue.type === 'pass'
                          ? 'bg-emerald-50/50 text-emerald-800 border-emerald-200/60'
                          : issue.type === 'warning'
                          ? 'bg-amber-50/60 text-amber-800 border-amber-200/70'
                          : 'bg-red-50/60 text-red-800 border-red-200/70'
                      }`}
                    >
                      {issue.type === 'pass' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle
                          className={`w-3 h-3 shrink-0 ${
                            issue.type === 'critical' ? 'text-red-600' : 'text-amber-600'
                          }`}
                        />
                      )}
                      <span>{issue.message}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
