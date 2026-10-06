'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCms } from '../../src/lib/store';
import { Header } from '../../src/components/public/Header';
import { Footer } from '../../src/components/public/Footer';
import dynamic from 'next/dynamic';

const CommandPalette = dynamic(
  () => import('../../src/components/common/CommandPalette').then((mod) => mod.CommandPalette),
  { ssr: false }
);

const SitemapRobotsModal = dynamic(
  () => import('../../src/components/public/SitemapRobotsModal').then((mod) => mod.SitemapRobotsModal),
  { ssr: false }
);

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isSearchOpen,
    setIsSearchOpen,
    sitemapRobotsModalType,
    setSitemapRobotsModalType,
    viewMode,
    setViewMode,
  } = useCms();

  const isAdmin = pathname?.startsWith('/admin') || viewMode === 'admin';

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-slate-900 selection:text-white">
      <Header
        currentPath={pathname || '/'}
        onNavigateByPath={(path) => router.push(path)}
        onNavigateHome={() => router.push('/')}
        onNavigateCategory={(slug) => router.push(`/category/${slug}`)}
        onNavigateSubCategory={(_catSlug, subSlug) => router.push(`/subcategory/${subSlug}`)}
        onNavigateTool={(slug) => router.push(`/tool/${slug}`)}
        onNavigateBlog={() => router.push('/blog')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSitemapModal={() => setSitemapRobotsModalType('sitemap')}
        onOpenRobotsModal={() => setSitemapRobotsModalType('robots')}
        onOpenAdmin={() => {
          setViewMode('admin');
          router.push('/admin');
        }}
      />
      
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      <Footer
        onNavigateHome={() => router.push('/')}
        onNavigateCategory={(slug) => router.push(`/category/${slug}`)}
        onNavigateTool={(slug) => router.push(`/tool/${slug}`)}
        onOpenSitemapModal={() => setSitemapRobotsModalType('sitemap')}
        onOpenRobotsModal={() => setSitemapRobotsModalType('robots')}
        onOpenAdmin={() => {
          setViewMode('admin');
          router.push('/admin');
        }}
      />

      {isSearchOpen && (
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigateToTool={(slug) => router.push(`/tool/${slug}`)}
          onNavigateToCategory={(slug) => router.push(`/category/${slug}`)}
          onNavigateToAdminTab={(tab) => {
            setViewMode('admin');
            router.push('/admin');
          }}
        />
      )}

      {sitemapRobotsModalType && (
        <SitemapRobotsModal
          type={sitemapRobotsModalType}
          onClose={() => setSitemapRobotsModalType(null)}
        />
      )}
    </div>
  );
};
