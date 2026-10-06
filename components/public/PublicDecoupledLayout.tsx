'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Header } from '../../src/components/public/Header';
import { Footer } from '../../src/components/public/Footer';
import type { PublicRoute } from '../../src/App';

// Break circular dependency by lazy-loading the heavy App dispatcher
const App = dynamic(() => import('../../src/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-mono text-slate-500">Initializing Veritas Suite...</p>
      </div>
    </div>
  ),
});

interface Props {
  children: React.ReactNode;
  currentPath: string;
  initialRoute: PublicRoute;
}

export type LegacyAction = 'admin' | 'search' | 'sitemap' | 'robots' | null;

export const PublicDecoupledLayout: React.FC<Props> = ({ children, currentPath, initialRoute }) => {
  const router = useRouter();
  const [legacyAction, setLegacyAction] = useState<LegacyAction>(null);

  if (legacyAction) {
    return (
      <App 
        initialRoute={initialRoute} 
        initialAction={legacyAction} 
      />
    );
  }

  const navHandlers = {
    onNavigateHome: () => router.push('/'),
    onNavigateCategory: (slug: string) => router.push(`/category/${slug}`),
    onNavigateSubCategory: (_catSlug: string, subSlug: string) => router.push(`/subcategory/${subSlug}`),
    onNavigateTool: (slug: string) => router.push(`/tool/${slug}`),
    onNavigateBlog: () => router.push('/blog'),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header 
        currentPath={currentPath}
        {...navHandlers}
        onOpenAdmin={() => setLegacyAction('admin')}
        onOpenSearch={() => setLegacyAction('search')}
        onOpenSitemapModal={() => setLegacyAction('sitemap')}
        onOpenRobotsModal={() => setLegacyAction('robots')}
      />
      
      <main className="flex-grow">
        {children}
      </main>

      <Footer 
        {...navHandlers}
        onOpenSitemapModal={() => setLegacyAction('sitemap')}
        onOpenRobotsModal={() => setLegacyAction('robots')}
        onOpenAdmin={() => setLegacyAction('admin')}
      />
    </div>
  );
};
