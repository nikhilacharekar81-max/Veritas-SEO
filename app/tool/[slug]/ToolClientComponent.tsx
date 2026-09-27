'use client';

import React from 'react';
import { PublicToolDetail } from '../../../src/components/public/PublicToolDetail';

export function PublicToolDetailClient({ toolSlug }: { toolSlug: string }) {
  return (
    <PublicToolDetail
      toolSlug={toolSlug}
      onNavigateHome={() => {
        if (typeof window !== 'undefined') window.location.href = '/';
      }}
      onNavigateCategory={(slug) => {
        if (typeof window !== 'undefined') window.location.href = `/category/${slug}`;
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
