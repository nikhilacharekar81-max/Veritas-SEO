import React from 'react';
import type { Metadata } from 'next';
import { AppClientHome } from '../components/public/AppClientHome';

export const metadata: Metadata = {
  title: 'Veritas SEO | Technical SEO Engine & Taxonomy Architecture',
  description:
    'Automated 301 redirect protection, schema-dts structured data, SERP pixel simulation, and dynamic category silos for technical search optimization.',
  alternates: {
    canonical: 'https://veritas-seo.dev',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Veritas SEO | Technical SEO Engine & Taxonomy Architecture',
    description:
      'Automated 301 redirect protection, schema-dts structured data, and dynamic category silos.',
    url: 'https://veritas-seo.dev',
    type: 'website',
    siteName: 'Veritas SEO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veritas SEO | Technical SEO Engine',
    description: 'Precision technical SEO calculators and taxonomy management suite.',
  },
};

export default function HomePage() {
  return <AppClientHome />;
}
