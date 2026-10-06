'use client';

import React, { use } from 'react';
import { PublicBlogPostDetail } from '../../../src/components/public/PublicBlogPostDetail';
import { useCms } from '../../../src/lib/store';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);
  const { setViewMode } = useCms();

  return (
    <PublicBlogPostDetail 
      postSlug={slug}
      onEditInBlogAdmin={() => setViewMode('admin')}
    />
  );
}
