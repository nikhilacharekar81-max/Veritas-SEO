'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCms } from './lib/store';
import { Header } from './components/public/Header';
import { HeroSection } from './components/public/HeroSection';
import { PublicCategoryHub } from './components/public/PublicCategoryHub';
import { PublicSubCategoryHub } from './components/public/PublicSubCategoryHub';
import { Footer } from './components/public/Footer';
import type { AdminTab } from './components/admin/AdminPanel';

// ... (rest of dynamic imports)

// Code-split heavy views so initial homepage bundle is super fast & lightweight
const AdminPanel = dynamic(
  () => import('./components/admin/AdminPanel').then((mod) => mod.AdminPanel),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-500">Loading Veritas Admin Suite...</p>
        </div>
      </div>
    ),
  }
);

const PublicToolDetail = dynamic(
  () => import('./components/public/PublicToolDetail').then((mod) => mod.PublicToolDetail),
  {
    ssr: false,
    loading: () => (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-slate-500">Initializing SEO Calculation Engine...</p>
      </div>
    ),
  }
);

const PublicBlogHub = dynamic(
  () => import('./components/public/PublicBlogHub').then((mod) => mod.PublicBlogHub),
  { ssr: false }
);

const PublicBlogPostDetail = dynamic(
  () => import('./components/public/PublicBlogPostDetail').then((mod) => mod.PublicBlogPostDetail),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import('./components/common/CommandPalette').then((mod) => mod.CommandPalette),
  { ssr: false }
);

const SitemapRobotsModal = dynamic(
  () => import('./components/public/SitemapRobotsModal').then((mod) => mod.SitemapRobotsModal),
  { ssr: false }
);

export type ViewMode = 'public' | 'admin';

export interface PublicRoute {
  type: 'home' | 'category' | 'subcategory' | 'tool' | 'blog' | 'blog_post';
  categorySlug?: string;
  subCategorySlug?: string;
  toolSlug?: string;
  postSlug?: string;
}

interface AppProps {
  initialRoute?: PublicRoute;
  initialViewMode?: ViewMode;
}

const AppContent: React.FC<AppProps> = ({
  initialRoute = { type: 'home' },
  initialViewMode = 'public',
}) => {
  const router = useRouter();
  const { checkRedirect, publicCategories, publicSubCategories } = useCms();

  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTab>('blog');
  const [adminEditBlogPostId, setAdminEditBlogPostId] = useState<string | null>(null);
  const [route, setRoute] = useState<PublicRoute>(initialRoute);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sitemapRobotsModalType, setSitemapRobotsModalType] = useState<'sitemap' | 'robots' | null>(null);

  // Compute current canonical path string
  const currentPath =
    viewMode === 'admin'
      ? '/admin'
      : route.type === 'tool' && route.toolSlug
      ? `/tool/${route.toolSlug}`
      : route.type === 'category' && route.categorySlug
      ? `/category/${route.categorySlug}`
      : route.type === 'subcategory' && route.subCategorySlug
      ? `/subcategory/${route.subCategorySlug}`
      : route.type === 'blog'
      ? '/blog'
      : route.type === 'blog_post' && route.postSlug
      ? `/blog/${route.postSlug}`
      : '/';

  // Parse a URL pathname and update route state without full page reload
  const syncRouteFromPathname = useCallback(
    (pathname: string) => {
      const cleanPath = pathname.split('?')[0].replace(/\/+$/, '') || '/';

      if (cleanPath === '/admin') {
        setViewMode('admin');
        return;
      }

      setViewMode('public');

      if (cleanPath === '/blog') {
        setRoute({ type: 'blog' });
        return;
      }

      if (cleanPath.startsWith('/blog/')) {
        const slug = cleanPath.replace('/blog/', '');
        const redirect = checkRedirect(cleanPath);
        if (redirect && redirect.toPath.startsWith('/blog/')) {
          const redirectedSlug = redirect.toPath.replace('/blog/', '');
          setRoute({ type: 'blog_post', postSlug: redirectedSlug });
          if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', redirect.toPath);
          }
          return;
        }
        setRoute({ type: 'blog_post', postSlug: slug });
        return;
      }

      if (cleanPath.startsWith('/tool/')) {
        const slug = cleanPath.replace('/tool/', '');
        const redirect = checkRedirect(cleanPath);
        if (redirect && redirect.toPath.startsWith('/tool/')) {
          const redirectedSlug = redirect.toPath.replace('/tool/', '');
          setRoute({ type: 'tool', toolSlug: redirectedSlug });
          if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', redirect.toPath);
          }
          return;
        }
        setRoute({ type: 'tool', toolSlug: slug });
        return;
      }

      if (cleanPath.startsWith('/category/')) {
        const slug = cleanPath.replace('/category/', '');
        setRoute({ type: 'category', categorySlug: slug });
        return;
      }

      if (cleanPath.startsWith('/subcategory/')) {
        const subSlug = cleanPath.replace('/subcategory/', '');
        const subObj = publicSubCategories.find((s) => s.slug === subSlug);
        const parentCat = subObj
          ? publicCategories.find((c) => c.id === subObj.categoryId)
          : publicCategories[0];
        setRoute({
          type: 'subcategory',
          categorySlug: parentCat?.slug || 'on-page-serp',
          subCategorySlug: subSlug,
        });
        return;
      }

      setRoute({ type: 'home' });
    },
    [checkRedirect, publicCategories, publicSubCategories]
  );

  // Sync with browser URL on mount & browser Back/Forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname && window.location.pathname !== '/') {
      syncRouteFromPathname(window.location.pathname);
    }

    const handlePopState = () => {
      syncRouteFromPathname(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncRouteFromPathname]);

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

  const pushUrl = (path: string) => {
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      router.push(path);
    }
  };

  // Navigation handlers with real URL pushState + automatic 301 redirect checking
  const navigateHome = () => {
    setViewMode('public');
    setRoute({ type: 'home' });
    pushUrl('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateCategory = (categorySlug: string) => {
    setViewMode('public');
    const targetPath = `/category/${categorySlug}`;
    const redirect = checkRedirect(targetPath);
    if (redirect) {
      if (redirect.toPath.startsWith('/tool/')) {
        const tSlug = redirect.toPath.replace('/tool/', '');
        navigateTool(tSlug);
        return;
      }
      if (redirect.toPath.startsWith('/category/')) {
        const cSlug = redirect.toPath.replace('/category/', '');
        setRoute({ type: 'category', categorySlug: cSlug });
        pushUrl(`/category/${cSlug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setRoute({ type: 'category', categorySlug });
    pushUrl(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateSubCategory = (categorySlug: string, subCategorySlug: string) => {
    setViewMode('public');
    const targetPath = `/subcategory/${subCategorySlug}`;
    const redirect = checkRedirect(targetPath);
    if (redirect && redirect.toPath.startsWith('/subcategory/')) {
      const sSlug = redirect.toPath.replace('/subcategory/', '');
      setRoute({ type: 'subcategory', categorySlug, subCategorySlug: sSlug });
      pushUrl(`/subcategory/${sSlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRoute({ type: 'subcategory', categorySlug, subCategorySlug });
    pushUrl(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTool = (toolSlug: string) => {
    setViewMode('public');
    const targetPath = `/tool/${toolSlug}`;
    const redirect = checkRedirect(targetPath);
    if (redirect && redirect.toPath.startsWith('/tool/')) {
      const newSlug = redirect.toPath.replace('/tool/', '');
      setRoute({ type: 'tool', toolSlug: newSlug });
      pushUrl(`/tool/${newSlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRoute({ type: 'tool', toolSlug });
    pushUrl(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBlogHub = () => {
    setViewMode('public');
    setRoute({ type: 'blog' });
    pushUrl('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBlogPost = (postSlug: string) => {
    setViewMode('public');
    const targetPath = `/blog/${postSlug}`;
    const redirect = checkRedirect(targetPath);
    if (redirect && redirect.toPath.startsWith('/blog/')) {
      const newSlug = redirect.toPath.replace('/blog/', '');
      setRoute({ type: 'blog_post', postSlug: newSlug });
      pushUrl(`/blog/${newSlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRoute({ type: 'blog_post', postSlug });
    pushUrl(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAdmin = (tab: AdminTab = 'blog', editPostId: string | null = null) => {
    setAdminInitialTab(tab);
    setAdminEditBlogPostId(editPostId);
    setViewMode('admin');
    pushUrl('/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateByPath = (path: string) => {
    pushUrl(path);
    syncRouteFromPathname(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'admin') {
    return (
      <AdminPanel
        initialTab={adminInitialTab}
        initialEditBlogPostId={adminEditBlogPostId}
        onViewBlogPost={(slug) => navigateBlogPost(slug)}
        onBackToPublic={() => {
          setViewMode('public');
          const fallbackPath =
            route.type === 'tool' && route.toolSlug
              ? `/tool/${route.toolSlug}`
              : route.type === 'category' && route.categorySlug
              ? `/category/${route.categorySlug}`
              : route.type === 'subcategory' && route.subCategorySlug
              ? `/subcategory/${route.subCategorySlug}`
              : route.type === 'blog'
              ? '/blog'
              : route.type === 'blog_post' && route.postSlug
              ? `/blog/${route.postSlug}`
              : '/';
          pushUrl(fallbackPath);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Header with Live Webpage URL Bar */}
      <Header
        currentPath={currentPath}
        onNavigateByPath={navigateByPath}
        onOpenAdmin={() => openAdmin('blog', null)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateHome={navigateHome}
        onNavigateCategory={navigateCategory}
        onNavigateSubCategory={navigateSubCategory}
        onNavigateTool={navigateTool}
        onNavigateBlog={navigateBlogHub}
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
            onOpenAdmin={() => openAdmin('blog', null)}
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

        {route.type === 'blog' && (
          <PublicBlogHub
            onNavigateHome={navigateHome}
            onSelectPost={navigateBlogPost}
            onOpenBlogAdmin={() => openAdmin('blog', null)}
          />
        )}

        {route.type === 'blog_post' && route.postSlug && (
          <PublicBlogPostDetail
            postSlug={route.postSlug}
            onNavigateHome={navigateHome}
            onNavigateBlogHub={navigateBlogHub}
            onSelectPost={navigateBlogPost}
            onEditInBlogAdmin={(postId) => openAdmin('blog', postId)}
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
        onOpenAdmin={() => openAdmin('blog', null)}
      />

      {/* Modals & Command Palette (Loaded on demand) */}
      {isSearchOpen && (
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigateToTool={(slug) => {
            navigateTool(slug);
          }}
          onNavigateToCategory={(slug) => {
            navigateCategory(slug);
          }}
          onNavigateToAdminTab={() => {
            openAdmin('blog', null);
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

export default function App(props: AppProps = {}) {
  return <AppContent {...props} />;
}
