'use client';

import React from 'react';
import { useCms } from '../../../src/lib/store';
import { PublicToolDetail } from '../../../src/components/public/PublicToolDetail';

export default function ToolPage({ params }: { params: { slug: string } }) {
  const { tools } = useCms();
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return (
      <div className="p-12 text-center text-slate-400">
        <h2 className="text-xl font-bold text-white">404 - Tool Not Found</h2>
      </div>
    );
  }

  return (
    <PublicToolDetail
      tool={tool}
      onNavigateHome={() => {}}
      onNavigateCategory={() => {}}
      onNavigateSubCategory={() => {}}
      onNavigateTool={() => {}}
    />
  );
}
