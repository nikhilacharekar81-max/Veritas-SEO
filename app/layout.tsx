import React from 'react';
import '../src/index.css';
import { CmsProviderWrapper } from '../components/providers/CmsProviderWrapper';
import { PublicLayout } from '../components/providers/PublicLayout';

export const metadata = {
  title: 'Veritas SEO | Technical SEO Engine & Taxonomy Architecture',
  description:
    'Automated 301 redirect protection, schema-dts structured data, SERP pixel simulation, and dynamic category silos for technical search optimization.',
  openGraph: {
    title: 'Veritas SEO | Technical SEO Engine',
    description:
      'Automated 301 redirect protection, schema-dts structured data, and dynamic category silos.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[#FAFAFA] text-slate-900 antialiased font-sans selection:bg-slate-900 selection:text-white">
        <CmsProviderWrapper>
          <PublicLayout>{children}</PublicLayout>
        </CmsProviderWrapper>
      </body>
    </html>
  );
}
