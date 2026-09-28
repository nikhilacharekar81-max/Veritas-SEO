import React, { useState } from 'react';
import { useCms } from '../../lib/store';
import { TaxonomyTreeVisualizer } from './TaxonomyTreeVisualizer';
import { CategoryManager } from './CategoryManager';
import { SubCategoryManager } from './SubCategoryManager';
import { ToolManager } from './ToolManager';
import { RedirectsManager } from './RedirectsManager';
import { HealthAuditor } from './HealthAuditor';
import { SiteWideAuditScanner } from './SiteWideAuditScanner';
import { LinkEquityGraphVisualizer } from './LinkEquityGraphVisualizer';
import { RobotsSitemapManager } from './RobotsSitemapManager';
import { AuditLogViewer } from './AuditLogViewer';
import { BackupRestoreManager } from './BackupRestoreManager';
import { ContentManager } from './ContentManager';
import { BlogManager } from './BlogManager';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import {
  FolderTree,
  Folder,
  Layers,
  Wrench,
  GitFork,
  ShieldCheck,
  Bot,
  History,
  Database,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Network,
  FileText,
} from 'lucide-react';

interface Props {
  onBackToPublic: () => void;
  onViewBlogPost?: (slug: string) => void;
  initialTab?: AdminTab;
  initialEditBlogPostId?: string | null;
}

export type AdminTab =
  | 'blog'
  | 'analytics'
  | 'tree'
  | 'categories'
  | 'subcategories'
  | 'tools'
  | 'redirects'
  | 'health'
  | 'link_equity'
  | 'robots_sitemap'
  | 'audit'
  | 'backup'
  | 'content';

export const AdminPanel: React.FC<Props> = ({
  onBackToPublic,
  onViewBlogPost,
  initialTab = 'blog',
  initialEditBlogPostId = null,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const { categories, subCategories, tools, redirects, toolUsageEvents, blogPosts } = useCms();

  // Controlled modal triggers across tabs
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [isOpenCreateCat, setIsOpenCreateCat] = useState(false);

  const [editingSubCategoryId, setEditingSubCategoryId] = useState<string | null>(null);
  const [isOpenCreateSubCat, setIsOpenCreateSubCat] = useState(false);
  const [initialSubCatParentId, setInitialSubCatParentId] = useState<string | undefined>(undefined);

  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const [isOpenCreateTool, setIsOpenCreateTool] = useState(false);
  const [initialToolCatId, setInitialToolCatId] = useState<string | undefined>(undefined);
  const [initialToolSubCatId, setInitialToolSubCatId] = useState<string | undefined>(undefined);

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'blog',
      label: 'Blog Posts (WP CMS)',
      icon: <FileText className="w-4 h-4" />,
      badge: blogPosts.filter((p) => p.status !== 'trash').length,
    },
    { id: 'analytics', label: 'Analytics Dashboard', icon: <TrendingUp className="w-4 h-4" />, badge: toolUsageEvents.length },
    { id: 'tree', label: 'Taxonomy Tree', icon: <FolderTree className="w-4 h-4" /> },
    { id: 'categories', label: 'Main Categories', icon: <Folder className="w-4 h-4" />, badge: categories.length },
    { id: 'subcategories', label: 'Sub-Categories', icon: <Layers className="w-4 h-4" />, badge: subCategories.length },
    { id: 'tools', label: 'SEO Tools', icon: <Wrench className="w-4 h-4" />, badge: tools.length },
    { id: 'redirects', label: '301 Redirects', icon: <GitFork className="w-4 h-4" />, badge: redirects.length },
    { id: 'health', label: 'Health Auditor', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'link_equity', label: 'Link Equity Flow', icon: <Network className="w-4 h-4" /> },
    { id: 'robots_sitemap', label: 'Robots & Sitemap', icon: <Bot className="w-4 h-4" /> },
    { id: 'content', label: 'Content Manager', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'audit', label: 'Audit Log', icon: <History className="w-4 h-4" /> },
    { id: 'backup', label: 'Backup & Restore', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBackToPublic}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Platform
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-serif">
              V
            </div>
            <span className="font-bold text-sm text-slate-900">Veritas CMS Admin Engine</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono hidden md:inline">
              Zod &amp; Decimal.js Strict
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            {categories.length} Categories · {subCategories.length} Sub-Cats · {tools.length} Tools
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-8 gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs space-y-1 sticky top-20">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Taxonomy Architecture
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded-md ${
                      activeTab === item.id ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Dynamic Content Pane */}
        <main className="flex-1 min-w-0">
          {activeTab === 'blog' && (
            <BlogManager
              onViewPostOnFrontend={onViewBlogPost}
              initialEditPostId={initialEditBlogPostId}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsDashboard />}

          {activeTab === 'tree' && (
            <TaxonomyTreeVisualizer
              onOpenCreateCategory={() => {
                setEditingCategoryId(null);
                setIsOpenCreateCat(true);
                setActiveTab('categories');
              }}
              onOpenCreateSubCategory={(catId) => {
                setEditingSubCategoryId(null);
                setInitialSubCatParentId(catId);
                setIsOpenCreateSubCat(true);
                setActiveTab('subcategories');
              }}
              onOpenCreateTool={(catId, subCatId) => {
                setEditingToolId(null);
                setInitialToolCatId(catId);
                setInitialToolSubCatId(subCatId);
                setIsOpenCreateTool(true);
                setActiveTab('tools');
              }}
              onEditCategory={(id) => {
                setEditingCategoryId(id);
                setIsOpenCreateCat(false);
                setActiveTab('categories');
              }}
              onEditSubCategory={(id) => {
                setEditingSubCategoryId(id);
                setIsOpenCreateSubCat(false);
                setActiveTab('subcategories');
              }}
              onEditTool={(id) => {
                setEditingToolId(id);
                setIsOpenCreateTool(false);
                setActiveTab('tools');
              }}
            />
          )}

          {activeTab === 'categories' && (
            <CategoryManager
              editingId={editingCategoryId}
              onCloseEdit={() => setEditingCategoryId(null)}
              isOpenCreate={isOpenCreateCat}
              onCloseCreate={() => setIsOpenCreateCat(!isOpenCreateCat)}
            />
          )}

          {activeTab === 'subcategories' && (
            <SubCategoryManager
              editingId={editingSubCategoryId}
              onCloseEdit={() => setEditingSubCategoryId(null)}
              isOpenCreate={isOpenCreateSubCat}
              onCloseCreate={() => setIsOpenCreateSubCat(!isOpenCreateSubCat)}
              initialParentCatId={initialSubCatParentId}
            />
          )}

          {activeTab === 'tools' && (
            <ToolManager
              editingId={editingToolId}
              onCloseEdit={() => setEditingToolId(null)}
              isOpenCreate={isOpenCreateTool}
              onCloseCreate={() => setIsOpenCreateTool(!isOpenCreateTool)}
              initialCatId={initialToolCatId}
              initialSubCatId={initialToolSubCatId}
            />
          )}

          {activeTab === 'redirects' && <RedirectsManager />}
          {activeTab === 'health' && <SiteWideAuditScanner />}
          {activeTab === 'link_equity' && <LinkEquityGraphVisualizer />}
          {activeTab === 'robots_sitemap' && <RobotsSitemapManager />}
          {activeTab === 'content' && <ContentManager onLaunchFrontendEditor={onBackToPublic} />}
          {activeTab === 'audit' && <AuditLogViewer />}
          {activeTab === 'backup' && <BackupRestoreManager />}
        </main>
      </div>
    </div>
  );
};
