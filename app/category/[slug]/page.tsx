'use client';

import React from 'react';
import { useCms } from '../../../src/lib/store';
import { PublicCategoryHub } from '../../../src/components/public/PublicCategoryHub';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { categories } = useCms();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return (
      <div className="p-12 text-center text-slate-400">
        <h2 className="text-xl font-bold text-white">404 - Category Not Found</h2>
      </div>
    );
  }

  return <PublicCategoryHub category={category} onNavigateHome={() => {}} onNavigateSubCategory={() => {}} onNavigateTool={() => {}} />;
}
