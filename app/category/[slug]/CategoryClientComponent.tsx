'use client';

import React from 'react';
import { PublicCategoryHub } from '../../../src/components/public/PublicCategoryHub';
import { PublicDecoupledLayout } from '../../../components/public/PublicDecoupledLayout';

export function CategoryClientComponent({ categorySlug }: { categorySlug: string }) {
  return (
    <PublicDecoupledLayout 
      currentPath={`/category/${categorySlug}`} 
      initialRoute={{ type: 'category', categorySlug }}
    >
      <PublicCategoryHub categorySlug={categorySlug} />
    </PublicDecoupledLayout>
  );
}
