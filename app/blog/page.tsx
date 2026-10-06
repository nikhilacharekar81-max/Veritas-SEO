'use client';

import React from 'react';
import { PublicBlogHub } from '../../src/components/public/PublicBlogHub';
import { useCms } from '../../src/lib/store';

export default function BlogHubPage() {
  const { setViewMode } = useCms();

  return (
    <PublicBlogHub 
      onOpenBlogAdmin={() => setViewMode('admin')}
    />
  );
}
