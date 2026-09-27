import React from 'react';
import type { SeoTool } from '../../lib/schemas';
import { useCms } from '../../lib/store';
import { IconRenderer } from '../ui/IconRenderer';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  tool: SeoTool;
  onSelect: (slug: string) => void;
}

export const ToolCard: React.FC<Props> = ({ tool, onSelect }) => {
  const { publicCategories, publicSubCategories } = useCms();
  const parentCat = publicCategories.find((c) => c.id === tool.categoryId);
  const parentSub = publicSubCategories.find((s) => s.id === tool.subCategoryId);

  return (
    <article
      onClick={() => onSelect(tool.slug)}
      className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer group relative overflow-hidden"
    >
      {/* Top bar with Icon & Badge */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center text-slate-800 transition-colors shadow-xs">
            <IconRenderer name={tool.icon} className="w-5 h-5" />
          </div>

          {tool.badge !== 'None' && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${
                tool.badge === 'Popular'
                  ? 'bg-amber-100 text-amber-800'
                  : tool.badge === 'Pro'
                  ? 'bg-purple-100 text-purple-800'
                  : tool.badge === 'New'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tool.badge}
            </span>
          )}
        </div>

        {/* Taxonomy Breadcrumb context */}
        {parentCat && (
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <span>{parentCat.name}</span>
            {parentSub && <span>&gt; {parentSub.name}</span>}
          </div>
        )}

        {/* Title and Summary */}
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {tool.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {tool.shortSummary}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
        <span className="font-mono text-[11px] text-slate-400 group-hover:text-slate-600">
          Engine: {tool.engineType.split('-')[0]}
        </span>
        <span className="flex items-center gap-1">
          Open Engine <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </article>
  );
};
