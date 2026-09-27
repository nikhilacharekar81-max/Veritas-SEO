import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './lib/store';
import { Header } from './components/public/Header';
import { HeroSection } from './components/public/HeroSection';
import { PublicCategoryHub } from './components/public/PublicCategoryHub';
import { PublicSubCategoryHub } from './components/public/PublicSubCategoryHub';
import { PublicToolDetail } from './components/public/PublicToolDetail';
import { Footer } from './components/public/Footer';
import { QuickSearchModal } from './components/public/QuickSearchModal';
import { CommandPalette } from './components/common/CommandPalette';
import { SitemapRobotsModal } from './components/public/SitemapRobotsModal';
import { AdminPanel } from './components/admin/AdminPanel';

type ViewMode = 'public' | 'admin';

interface PublicRoute {
  type: 'home' | 'category' | 'subcategory' | 'tool';
  categorySlug?: string;
  subCategorySlug?: string;
  toolSlug?: string;
}

const AppContent: React.FC = () => {
  const { checkRedirect } = useCms();

  const [viewMode, setViewMode] = useState<ViewMode>('public');
  const [route, setRoute] = useState<PublicRoute>({ type: 'home' });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sitemapRobotsModalType, setSitemapRobotsModalType] = useState<'sitemap' | 'robots' | null>(null);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handlers with automatic 301 redirect checking
  const navigateHome = () => {
    setRoute({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateCategory = (categorySlug: string) => {
    const targetPath = `/category/${categorySlug}`;
    const redirect = checkRedirect(targetPath);
    if (redirect) {
      // Check if redirect target is a tool or category
      if (redirect.toPath.startsWith('/tool/')) {
        const tSlug = redirect.toPath.replace('/tool/', '');
        navigateTool(tSlug);
        return;
      }
      if (redirect.toPath.startsWith('/category/')) {
        const cSlug = redirect.toPath.replace('/category/', '');
        setRoute({ type: 'category', categorySlug: cSlug });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setRoute({ type: 'category', categorySlug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateSubCategory = (categorySlug: string, subCategorySlug: string) => {
    const targetPath = `/subcategory/${subCategorySlug}`;
    const redirect = checkRedirect(targetPath);
    if (redirect && redirect.toPath.startsWith('/subcategory/')) {
      const sSlug = redirect.toPath.replace('/subcategory/', '');
      setRoute({ type: 'subcategory', categorySlug, subCategorySlug: sSlug });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRoute({ type: 'subcategory', categorySlug, subCategorySlug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTool = (toolSlug: string) => {
    const targetPath = `/tool/${toolSlug}`;
    const redirect = checkRedirect(targetPath);
    if (redirect && redirect.toPath.startsWith('/tool/')) {
      const newSlug = redirect.toPath.replace('/tool/', '');
      setRoute({ type: 'tool', toolSlug: newSlug });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRoute({ type: 'tool', toolSlug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'admin') {
    return <AdminPanel onBackToPublic={() => setViewMode('public')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Header */}
      <Header
        onOpenAdmin={() => setViewMode('admin')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateHome={navigateHome}
        onNavigateCategory={navigateCategory}
        onNavigateSubCategory={navigateSubCategory}
        onNavigateTool={navigateTool}
        onOpenSitemapModal={() => setSitemapRobotsModalType('sitemap')}
        onOpenRobotsModal={() => setSitemapRobotsModalType('robots')}
      />

      {/* Main Public Body */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {route.type === 'home' && (
          <HeroSection
            onSelectCategory={navigateCategory}
            onSelectSubCategory={navigateSubCategory}
            onSelectTool={navigateTool}
            onOpenAdmin={() => setViewMode('admin')}
          />
        )}

        {route.type === 'category' && route.categorySlug && (
          <PublicCategoryHub
            categorySlug={route.categorySlug}
            onNavigateHome={navigateHome}
            onNavigateSubCategory={navigateSubCategory}
            onNavigateTool={navigateTool}
          />
        )}

        {route.type === 'subcategory' && route.categorySlug && route.subCategorySlug && (
          <PublicSubCategoryHub
            categorySlug={route.categorySlug}
            subCategorySlug={route.subCategorySlug}
            onNavigateHome={navigateHome}
            onNavigateCategory={navigateCategory}
            onNavigateTool={navigateTool}
          />
        )}

        {route.type === 'tool' && route.toolSlug && (
          <PublicToolDetail
            toolSlug={route.toolSlug}
            onNavigateHome={navigateHome}
            onNavigateCategory={navigateCategory}
            onNavigateSubCategory={navigateSubCategory}
            onNavigateTool={navigateTool}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateHome={navigateHome}
        onNavigateCategory={navigateCategory}
        onNavigateTool={navigateTool}
        onOpenSitemapModal={() => setSitemapRobotsModalType('sitemap')}
        onOpenRobotsModal={() => setSitemapRobotsModalType('robots')}
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Modals & Command Palette */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateToTool={(slug) => {
          setViewMode('public');
          navigateTool(slug);
        }}
        onNavigateToCategory={(slug) => {
          setViewMode('public');
          navigateCategory(slug);
        }}
        onNavigateToAdminTab={(tab) => {
          setViewMode('admin');
        }}
      />

      <SitemapRobotsModal
        type={sitemapRobotsModalType}
        onClose={() => setSitemapRobotsModalType(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}
