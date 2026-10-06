'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PublicToolDetail } from '../../../src/components/public/PublicToolDetail';

export function PublicToolDetailClient({ toolSlug }: { toolSlug: string }) {
  const router = useRouter();

  return (
    <PublicToolDetail
      toolSlug={toolSlug}
      onNavigateHome={() => router.push('/')}
      onNavigateCategory={(slug) => router.push(`/category/${slug}`)}
      onNavigateSubCategory={(_catSlug, subSlug) => router.push(`/subcategory/${subSlug}`)}
      onNavigateTool={(slug) => router.push(`/tool/${slug}`)}
    />
  );
}
