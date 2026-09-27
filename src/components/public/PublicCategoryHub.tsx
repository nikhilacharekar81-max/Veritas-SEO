import React from 'react';
import { useCms } from '../../lib/store';
import { Breadcrumbs } from './Breadcrumbs';
import { ToolCard } from './ToolCard';
import { IconRenderer } from '../ui/IconRenderer';
import { generateCollectionPageSchema } from '../../lib/schema-generator';
import { Layers, Wrench, ArrowRight } from 'lucide-react';

interface Props {
  categorySlug: string;
  onNavigateHome: () => void;
  onNavigateSubCategory: (catSlug: string, subSlug: string) => void;
  onNavigateTool: (slug: string) => void;
}

export const PublicCategoryHub: React.FC<Props> = ({
  categorySlug,
  onNavigateHome,
  onNavigateSubCategory,
  onNavigateTool,
}) => {
  const { publicCategories, publicSubCategories, publicTools } = useCms();

  const category = publicCategories.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Category Not Found or Unpublished</h2>
        <p className="text-xs text-slate-500">
          The requested category does not exist or has been set to hidden status by an administrator.
        </p>
        <button
          type="button"
          onClick={onNavigateHome}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
        >
          Return to All Tools
        </button>
      </div>
    );
  }

  const childSubCategories = publicSubCategories.filter((s) => s.categoryId === category.id);
  const categoryTools = publicTools.filter((t) => t.categoryId === category.id);

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: category.name, url: `/category/${category.slug}` },
  ];

  const collectionSchema = generateCollectionPageSchema(
    category,
    categoryTools,
    `https://veritas-seo.dev/category/${category.slug}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Googlebot Schema.org CollectionPage script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Semantic Breadcrumbs */}
      <Breadcrumbs
        items={breadcrumbs}
        onNavigate={(url) => {
          if (url === '/') onNavigateHome();
        }}
      />

      {/* Category Hero Header */}
      <header className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <IconRenderer name={category.icon} className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Main Category Hub
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {category.name}
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {category.description}
        </p>

        <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500 font-mono">
          <span>{childSubCategories.length} Sub-Categories</span>
          <span>·</span>
          <span>{categoryTools.length} Published Tools</span>
        </div>
      </header>

      {/* Sub-Category Navigation Hubs */}
      {childSubCategories.length > 0 && (
        <section aria-labelledby="subcategories-heading" className="space-y-4">
          <h2 id="subcategories-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" /> Sub-Category Workflows
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {childSubCategories.map((sub) => {
              const subTools = publicTools.filter((t) => t.subCategoryId === sub.id);
              return (
                <div
                  key={sub.id}
                  onClick={() => onNavigateSubCategory(category.slug, sub.slug)}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{sub.description}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-600">
                    <span className="font-mono text-slate-400">{subTools.length} tools</span>
                    <span className="flex items-center gap-1 group-hover:text-emerald-700">
                      Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Tools Section */}
      <section aria-labelledby="category-tools-heading" className="space-y-4">
        <h2 id="category-tools-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-emerald-600" /> SEO Tools in {category.name}
        </h2>

        {categoryTools.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
            No published tools found in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onSelect={onNavigateTool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
