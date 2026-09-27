import React, { useState, useMemo } from 'react';
import { useCms } from '../../lib/store';
import {
  FolderTree,
  ArrowRight,
  Sparkles,
  Layers,
  Wrench,
  Folder,
  AlertCircle,
  CheckCircle2,
  GitCommit,
  Network,
  Info,
} from 'lucide-react';

export const LinkEquityGraphVisualizer: React.FC = () => {
  const { categories, subCategories, tools } = useCms();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Compute hierarchy and internal PageRank score distributions
  const equityTree = useMemo(() => {
    return categories.map((cat) => {
      const childrenSubCats = subCategories.filter((s) => s.categoryId === cat.id);
      const categoryDirectTools = tools.filter((t) => t.categoryId === cat.id && !t.subCategoryId);

      const subCatNodes = childrenSubCats.map((sub) => {
        const subTools = tools.filter((t) => t.subCategoryId === sub.id);
        const subEquity = Math.round(100 / Math.max(1, childrenSubCats.length));
        return {
          ...sub,
          tools: subTools,
          estimatedEquity: subEquity,
          crawlDepth: 2,
        };
      });

      return {
        ...cat,
        subCategories: subCatNodes,
        directTools: categoryDirectTools,
        crawlDepth: 1,
        totalChildren: childrenSubCats.length + categoryDirectTools.length,
      };
    });
  }, [categories, subCategories, tools]);

  // Find orphaned tools (tools with no category or orphaned subcategory)
  const orphanTools = useMemo(() => {
    return tools.filter((t) => !t.categoryId && !t.subCategoryId);
  }, [tools]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Network className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Internal Link Equity &amp; PageRank Distribution Graph
            </h3>
            <p className="text-xs text-slate-500">
              Visualize PageRank juice flow from root index through 3-tier taxonomy silos to deep interactive tools.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg font-bold">
            Max Crawl Depth: 3 Hops
          </span>
        </div>
      </div>

      {/* Orphan Warning if any */}
      {orphanTools.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Orphaned Tool Nodes Detected ({orphanTools.length}):</strong>{' '}
            These tools are not receiving internal PageRank links from any category hub: {orphanTools.map((t) => t.title).join(', ')}.
          </div>
        </div>
      )}

      {/* Interactive Visual Graph Matrix */}
      <div className="space-y-6">
        {equityTree.map((catNode) => (
          <div
            key={catNode.id}
            className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4 transition-all hover:border-slate-300"
          >
            {/* Category Tier Level 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                  <Folder className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{catNode.name}</span>
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      /category/{catNode.slug}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Depth 1 · Category Hub Authority Anchor
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500">Sub-Silos: <strong className="text-slate-900">{catNode.subCategories.length}</strong></span>
                <span className="text-slate-500">Tools: <strong className="text-emerald-700 font-bold font-mono">{catNode.totalChildren}</strong></span>
              </div>
            </div>

            {/* Sub-Category Tier Level 2 */}
            <div className="pl-4 sm:pl-8 border-l-2 border-slate-200 space-y-3">
              {catNode.subCategories.length === 0 ? (
                <div className="text-xs text-slate-400 italic py-1">
                  No sub-categories assigned yet.
                </div>
              ) : (
                catNode.subCategories.map((subNode) => (
                  <div
                    key={subNode.id}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-bold text-slate-800">{subNode.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">/subcategory/{subNode.slug}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-semibold">
                        Depth 2 · {subNode.tools.length} Tools
                      </span>
                    </div>

                    {/* Tier Level 3 Tools Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1 border-t border-slate-100">
                      {subNode.tools.length === 0 ? (
                        <span className="text-[11px] text-slate-400 italic col-span-3">No tools in this sub-category</span>
                      ) : (
                        subNode.tools.map((tool) => (
                          <div
                            key={tool.id}
                            className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between gap-2 text-xs"
                          >
                            <span className="font-medium text-slate-800 truncate">{tool.title}</span>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold shrink-0">
                              D3 · {tool.usageCount || 0} Runs
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
