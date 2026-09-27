import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Veritas SEO — Enterprise SEO Tools Platform & Headless CMS',
  description:
    'Production-grade SEO Tools Platform and Taxonomy CMS featuring multi-tier category architecture, schema-dts JSON-LD generation, exact decimal.js SERP metrics, and live on-page SEO health auditing.',
  openGraph: {
    title: 'Veritas SEO — Enterprise SEO Tools Platform & Headless CMS',
    description:
      'Production-grade SEO Tools Platform and Taxonomy CMS featuring multi-tier category architecture, schema-dts JSON-LD generation, exact decimal.js SERP metrics, and live on-page SEO health auditing.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAFA] text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
