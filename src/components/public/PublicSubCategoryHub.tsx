import React from 'react';
import { useCms } from '../../lib/store';
import { Breadcrumbs } from './Breadcrumbs';
import { ToolCard } from './ToolCard';
import { generateCollectionPageSchema } from '../../lib/schema-generator';
import { Layers, Wrench } from 'lucide-react';

interface Props {
  categorySlug: string;
  subCategorySlug: string;
  onNavigateHome: () => void;
  onNavigateCategory: (slug: string) => void;
  onNavigateTool: (slug: string) => void;
}

export const PublicSubCategoryHub: React.FC<Props> = ({
  categorySlug,
  subCategorySlug,
  onNavigateHome,
  onNavigateCategory,
  onNavigateTool,
}) => {
  const { publicCategories, publicSubCategories, publicTools } = useCms();

  const category = publicCategories.find((c) => c.slug === categorySlug);
  const subCategory = publicSubCategories.find(
    (s) => s.slug === subCategorySlug && (!category || s.categoryId === category.id)
  );

  if (!subCategory || !category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Sub-Category Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested sub-category does not exist or has been unpublished.
        </p>
        <button
          type="button"
          onClick={onNavigateHome}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
        >
          Return Home
        </button>
      </div>
    );
  }

  const subTools = publicTools.filter((t) => t.subCategoryId === subCategory.id);

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: category.name, url: `/category/${category.slug}` },
    { label: subCategory.name, url: `/subcategory/${subCategory.slug}` },
  ];

  const collectionSchema = generateCollectionPageSchema(
    subCategory,
    subTools,
    `https://veritas-seo.dev/subcategory/${subCategory.slug}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs
        items={breadcrumbs}
        onNavigate={(url) => {
          if (url === '/') onNavigateHome();
          else if (url.startsWith('/category/')) onNavigateCategory(category.slug);
        }}
      />

      <header className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              {category.name} &gt; Sub-Category Hub
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {subCategory.name}
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {subCategory.description}
        </p>
      </header>

      <section aria-labelledby="sub-tools-heading" className="space-y-4">
        <h2 id="sub-tools-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-emerald-600" /> Tools in {subCategory.name}
        </h2>

        {subTools.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
            No tools assigned to this sub-category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onSelect={onNavigateTool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
