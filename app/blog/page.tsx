import React from 'react';
import type { Metadata } from 'next';
import App from '../../src/App';

export const metadata: Metadata = {
  title: 'Veritas SEO Engineering Blog | Technical SEO & Content Optimization Guides',
  description:
    'Read technical SEO guides on N-Gram phrase frequency, SERP pixel width truncation, 301 redirect chain optimization, and Schema.org JSON-LD.',
  alternates: {
    canonical: 'https://veritas-seo.dev/blog',
  },
};

export default function BlogHubPage() {
  return <App initialRoute={{ type: 'blog' }} />;
}
