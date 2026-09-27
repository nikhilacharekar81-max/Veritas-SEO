import React from 'react';
import '../src/index.css';

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
      <body className="h-full bg-slate-950 text-slate-100 antialiased font-sans selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
