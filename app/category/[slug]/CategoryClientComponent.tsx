'use client';

import React from 'react';
import { useCms } from '../../../src/lib/store';
import { PublicCategoryHub } from '../../../src/components/public/PublicCategoryHub';

export function CategoryClientComponent({ categorySlug }: { categorySlug: string }) {
  const { categories } = useCms();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) return null;

  return (
    <PublicCategoryHub
      category={category}
      onNavigateHome={() => {
        if (typeof window !== 'undefined') window.location.href = '/';
      }}
      onNavigateSubCategory={(_catSlug, subSlug) => {
        if (typeof window !== 'undefined') window.location.href = `/subcategory/${subSlug}`;
      }}
      onNavigateTool={(slug) => {
        if (typeof window !== 'undefined') window.location.href = `/tool/${slug}`;
      }}
    />
  );
}
