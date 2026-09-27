import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type {
  MainCategory,
  SubCategory,
  SeoTool,
  RedirectRule,
  AuditLogEntry,
  RobotsTxtConfig,
  CmsRegistry,
  ToolStatus,
  ToolUsageEvent,
} from './schemas';
import { CmsRegistrySchema } from './schemas';
import { generateId } from './utils';
import { DEMO_PRESET_CATEGORIES, DEMO_PRESET_SUBCATEGORIES, DEMO_PRESET_TOOLS } from './demo-presets';

const STORAGE_KEYS = {
  CATEGORIES: 'veritas_seo_categories',
  SUBCATEGORIES: 'veritas_seo_subcategories',
  TOOLS: 'veritas_seo_tools',
  REDIRECTS: 'veritas_seo_redirects',
  AUDIT_LOGS: 'veritas_seo_audit_logs',
  TOOL_USAGE_EVENTS: 'veritas_seo_tool_usage_events',
  ROBOTS_CONFIG: 'veritas_seo_robots_config',
  INITIALIZED: 'veritas_seo_initialized_flag',
};

const DEFAULT_ROBOTS_CONFIG: RobotsTxtConfig = {
  userAgent: '*',
  allowPaths: ['/'],
  disallowPaths: ['/admin', '/api/internal'],
  crawlDelaySeconds: 0,
  autoIncludeSitemap: true,
  customRules: '# Veritas SEO Crawl Engine Rules\n# Optimized for Googlebot & Bingbot',
};

interface CmsContextType {
  categories: MainCategory[];
  subCategories: SubCategory[];
  tools: SeoTool[];
  redirects: RedirectRule[];
  auditLogs: AuditLogEntry[];
  toolUsageEvents: ToolUsageEvent[];
  robotsConfig: RobotsTxtConfig;

  // Active public views (filtered by cascading active rules)
  publicCategories: MainCategory[];
  publicSubCategories: SubCategory[];
  publicTools: SeoTool[];

  // Main Category actions
  createCategory: (cat: Omit<MainCategory, 'id' | 'createdAt' | 'updatedAt'>) => MainCategory;
  updateCategory: (id: string, cat: Partial<MainCategory>) => void;
  toggleCategoryStatus: (id: string) => void;
  deleteCategory: (id: string, orphanStrategy: 'reassign' | 'unassign', newParentId?: string) => void;
  reorderCategories: (orderedIds: string[]) => void;

  // Sub-Category actions
  createSubCategory: (sub: Omit<SubCategory, 'id' | 'createdAt' | 'updatedAt'>) => SubCategory;
  updateSubCategory: (id: string, sub: Partial<SubCategory>) => void;
  toggleSubCategoryStatus: (id: string) => void;
  moveSubCategory: (subId: string, newCategoryId: string | null) => void;
  deleteSubCategory: (id: string, orphanStrategy: 'reassign' | 'unassign', newSubId?: string) => void;
  reorderSubCategories: (orderedIds: string[]) => void;

  // SEO Tool actions
  createTool: (tool: Omit<SeoTool, 'id' | 'createdAt' | 'updatedAt'>) => SeoTool;
  updateTool: (id: string, tool: Partial<SeoTool>) => void;
  toggleToolStatus: (id: string) => void;
  setToolPublishStatus: (id: string, status: ToolStatus) => void;
  moveTool: (toolId: string, newCategoryId: string | null, newSubCategoryId: string | null) => void;
  duplicateTool: (toolId: string) => SeoTool | null;
  deleteTool: (id: string) => void;
  bulkToggleTools: (toolIds: string[], isActive: boolean) => void;
  bulkMoveTools: (toolIds: string[], targetCategoryId: string | null, targetSubCategoryId: string | null) => void;
  bulkDeleteTools: (toolIds: string[]) => void;

  // Analytics Tool Tracking action
  trackToolUsage: (
    toolId: string,
    toolTitle?: string,
    engineType?: SeoTool['engineType'],
    durationMs?: number,
    device?: 'desktop' | 'mobile' | 'tablet',
    targetKeyword?: string
  ) => void;
  incrementToolUsageCount: (toolId: string) => void;
  simulateTrafficEvents: (count?: number) => void;
  clearAnalyticsEvents: () => void;

  // 301 Redirect Registry actions
  addRedirect: (rule: Omit<RedirectRule, 'id' | 'hits' | 'createdAt'>) => RedirectRule;
  deleteRedirect: (id: string) => void;
  checkRedirect: (currentPath: string) => RedirectRule | null;

  // Robots.txt action
  updateRobotsConfig: (config: RobotsTxtConfig) => void;

  // Backup, Import & Presets
  exportRegistryJson: () => string;
  importRegistryJson: (jsonString: string) => { success: boolean; message: string; errorCount?: number };
  seedDemoPresets: () => void;
  clearAllData: () => void;
}

const CmsContext = createContext<CmsContextType | null>(null);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // CRITICAL MANDATE: Start with deterministic state on both SSR and Client initial render
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [tools, setTools] = useState<SeoTool[]>([]);
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [toolUsageEvents, setToolUsageEvents] = useState<ToolUsageEvent[]>([]);
  const [robotsConfig, setRobotsConfig] = useState<RobotsTxtConfig>(DEFAULT_ROBOTS_CONFIG);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage AFTER initial client mount to guarantee 100% hydration matching
  useEffect(() => {
    try {
      const savedCat = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (savedCat) setCategories(JSON.parse(savedCat));

      const savedSub = localStorage.getItem(STORAGE_KEYS.SUBCATEGORIES);
      if (savedSub) setSubCategories(JSON.parse(savedSub));

      const savedTools = localStorage.getItem(STORAGE_KEYS.TOOLS);
      if (savedTools) setTools(JSON.parse(savedTools));

      const savedRedir = localStorage.getItem(STORAGE_KEYS.REDIRECTS);
      if (savedRedir) setRedirects(JSON.parse(savedRedir));

      const savedLogs = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));

      const savedEvents = localStorage.getItem(STORAGE_KEYS.TOOL_USAGE_EVENTS);
      if (savedEvents) setToolUsageEvents(JSON.parse(savedEvents));

      const savedRobots = localStorage.getItem(STORAGE_KEYS.ROBOTS_CONFIG);
      if (savedRobots) setRobotsConfig(JSON.parse(savedRobots));
    } catch (e) {
      console.error('Failed to parse CMS storage during hydration', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage ONLY after hydration completes
  useEffect(() => {
    if (isHydrated) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories, isHydrated]);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(STORAGE_KEYS.SUBCATEGORIES, JSON.stringify(subCategories));
  }, [subCategories, isHydrated]);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
  }, [tools, isHydrated]);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(STORAGE_KEYS.REDIRECTS, JSON.stringify(redirects));
  }, [redirects, isHydrated]);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs, isHydrated]);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(STORAGE_KEYS.TOOL_USAGE_EVENTS, JSON.stringify(toolUsageEvents));
  }, [toolUsageEvents, isHydrated]);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(STORAGE_KEYS.ROBOTS_CONFIG, JSON.stringify(robotsConfig));
  }, [robotsConfig, isHydrated]);

  // Helper to log audit entries
  const addAuditLog = (
    action: AuditLogEntry['action'],
    entityType: AuditLogEntry['entityType'],
    entityId: string,
    entityName: string,
    details: string
  ) => {
    const entry: AuditLogEntry = {
      id: generateId('log'),
      timestamp: new Date().toISOString(),
      action,
      entityType,
      entityId,
      entityName,
      details,
    };
    setAuditLogs((prev) => [entry, ...prev.slice(0, 199)]);
  };

  /**
   * Cascading Visibility Computation:
   * 1. Public Category: isActive === true
   * 2. Public SubCategory: isActive === true AND its parent Category isActive === true
   * 3. Public Tool: isActive === true AND status === 'published' AND (tool has no category OR its category & subcat are active)
   */
  const activeCategoryIds = useMemo(() => {
    return new Set(categories.filter((c) => c.isActive).map((c) => c.id));
  }, [categories]);

  const activeSubCategoryIds = useMemo(() => {
    return new Set(
      subCategories
        .filter((sc) => sc.isActive && (sc.categoryId === null || activeCategoryIds.has(sc.categoryId)))
        .map((sc) => sc.id)
    );
  }, [subCategories, activeCategoryIds]);

  const publicCategories = useMemo(() => {
    return categories
      .filter((c) => c.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [categories]);

  const publicSubCategories = useMemo(() => {
    return subCategories
      .filter((sc) => sc.isActive && (sc.categoryId === null || activeCategoryIds.has(sc.categoryId)))
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [subCategories, activeCategoryIds]);

  const publicTools = useMemo(() => {
    return tools
      .filter((t) => {
        if (!t.isActive || t.status !== 'published') return false;
        if (t.categoryId && !activeCategoryIds.has(t.categoryId)) return false;
        if (t.subCategoryId && !activeSubCategoryIds.has(t.subCategoryId)) return false;
        return true;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [tools, activeCategoryIds, activeSubCategoryIds]);

  // ---------------------------------------------------------------------------
  // MAIN CATEGORY HANDLERS
  // ---------------------------------------------------------------------------
  const createCategory = (catData: Omit<MainCategory, 'id' | 'createdAt' | 'updatedAt'>): MainCategory => {
    const newCat: MainCategory = {
      ...catData,
      id: generateId('cat'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCategories((prev) => [...prev, newCat]);
    addAuditLog('created', 'category', newCat.id, newCat.name, `Created category "${newCat.name}" with slug /${newCat.slug}`);
    return newCat;
  };

  const updateCategory = (id: string, partial: Partial<MainCategory>) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === id) {
          // Check if slug changed to create automatic 301 redirect
          if (partial.slug && partial.slug !== cat.slug) {
            const oldPath = `/category/${cat.slug}`;
            const newPath = `/category/${partial.slug}`;
            const redirect: RedirectRule = {
              id: generateId('redir'),
              fromPath: oldPath,
              toPath: newPath,
              statusCode: 301,
              reason: `Automatic redirect from Category slug change: ${cat.slug} -> ${partial.slug}`,
              entityType: 'category',
              entityId: cat.id,
              hits: 0,
              createdAt: new Date().toISOString(),
            };
            setRedirects((r) => [redirect, ...r]);
            addAuditLog('redirect_created', 'redirect', redirect.id, `${oldPath} -> ${newPath}`, 'Automatic 301 redirect registered for category slug change');
          }

          const updated = {
            ...cat,
            ...partial,
            updatedAt: new Date().toISOString(),
          };
          addAuditLog('edited', 'category', cat.id, updated.name, `Updated category details for "${updated.name}"`);
          return updated;
        }
        return cat;
      })
    );
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === id) {
          const nextActive = !cat.isActive;
          addAuditLog(
            'toggled_status',
            'category',
            cat.id,
            cat.name,
            `Toggled category "${cat.name}" status to ${nextActive ? 'Active (Published)' : 'Hidden (Draft)'}`
          );
          return { ...cat, isActive: nextActive, updatedAt: new Date().toISOString() };
        }
        return cat;
      })
    );
  };

  const deleteCategory = (id: string, orphanStrategy: 'reassign' | 'unassign', newParentId?: string) => {
    const catToDelete = categories.find((c) => c.id === id);
    if (!catToDelete) return;

    // Orphan protection for Sub-Categories
    setSubCategories((prev) =>
      prev.map((sub) => {
        if (sub.categoryId === id) {
          return {
            ...sub,
            categoryId: orphanStrategy === 'reassign' && newParentId ? newParentId : null,
            isActive: orphanStrategy === 'reassign' ? sub.isActive : false,
            updatedAt: new Date().toISOString(),
          };
        }
        return sub;
      })
    );

    // Orphan protection for Tools
    setTools((prev) =>
      prev.map((tool) => {
        if (tool.categoryId === id) {
          return {
            ...tool,
            categoryId: orphanStrategy === 'reassign' && newParentId ? newParentId : null,
            status: orphanStrategy === 'reassign' ? tool.status : 'draft',
            isActive: orphanStrategy === 'reassign' ? tool.isActive : false,
            updatedAt: new Date().toISOString(),
          };
        }
        return tool;
      })
    );

    setCategories((prev) => prev.filter((c) => c.id !== id));
    addAuditLog(
      'deleted',
      'category',
      id,
      catToDelete.name,
      `Deleted category "${catToDelete.name}". Orphan strategy: ${orphanStrategy} (${orphanStrategy === 'reassign' ? `Reassigned to ${newParentId}` : 'Moved to Unassigned / Draft'})`
    );
  };

  const reorderCategories = (orderedIds: string[]) => {
    setCategories((prev) => {
      const map = new Map(prev.map((c) => [c.id, c]));
      const nextList: MainCategory[] = [];
      orderedIds.forEach((id, index) => {
        const item = map.get(id);
        if (item) {
          nextList.push({ ...item, displayOrder: index + 1 });
        }
      });
      return nextList;
    });
    addAuditLog('reordered', 'category', 'taxonomy', 'Taxonomy Tree', 'Reordered main category hierarchy');
  };

  // ---------------------------------------------------------------------------
  // SUB-CATEGORY HANDLERS
  // ---------------------------------------------------------------------------
  const createSubCategory = (subData: Omit<SubCategory, 'id' | 'createdAt' | 'updatedAt'>): SubCategory => {
    const newSub: SubCategory = {
      ...subData,
      id: generateId('subcat'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSubCategories((prev) => [...prev, newSub]);
    addAuditLog('created', 'subcategory', newSub.id, newSub.name, `Created sub-category "${newSub.name}"`);
    return newSub;
  };

  const updateSubCategory = (id: string, partial: Partial<SubCategory>) => {
    setSubCategories((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          if (partial.slug && partial.slug !== sub.slug) {
            const oldPath = `/subcategory/${sub.slug}`;
            const newPath = `/subcategory/${partial.slug}`;
            const redirect: RedirectRule = {
              id: generateId('redir'),
              fromPath: oldPath,
              toPath: newPath,
              statusCode: 301,
              reason: `Automatic redirect from SubCategory slug change: ${sub.slug} -> ${partial.slug}`,
              entityType: 'subcategory',
              entityId: sub.id,
              hits: 0,
              createdAt: new Date().toISOString(),
            };
            setRedirects((r) => [redirect, ...r]);
            addAuditLog('redirect_created', 'redirect', redirect.id, `${oldPath} -> ${newPath}`, 'Automatic 301 redirect registered for subcategory slug change');
          }

          const updated = {
            ...sub,
            ...partial,
            updatedAt: new Date().toISOString(),
          };
          addAuditLog('edited', 'subcategory', sub.id, updated.name, `Updated sub-category "${updated.name}"`);
          return updated;
        }
        return sub;
      })
    );
  };

  const toggleSubCategoryStatus = (id: string) => {
    setSubCategories((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const nextActive = !sub.isActive;
          addAuditLog(
            'toggled_status',
            'subcategory',
            sub.id,
            sub.name,
            `Toggled sub-category "${sub.name}" status to ${nextActive ? 'Active' : 'Hidden'}`
          );
          return { ...sub, isActive: nextActive, updatedAt: new Date().toISOString() };
        }
        return sub;
      })
    );
  };

  const moveSubCategory = (subId: string, newCategoryId: string | null) => {
    const sub = subCategories.find((s) => s.id === subId);
    const targetCat = categories.find((c) => c.id === newCategoryId);
    if (!sub) return;

    setSubCategories((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, categoryId: newCategoryId, updatedAt: new Date().toISOString() } : s))
    );

    // Cascading update: update tools belonging to this sub-category
    setTools((prev) =>
      prev.map((t) => {
        if (t.subCategoryId === subId) {
          return {
            ...t,
            categoryId: newCategoryId,
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );

    addAuditLog(
      'moved',
      'subcategory',
      subId,
      sub.name,
      `Moved sub-category "${sub.name}" to category "${targetCat ? targetCat.name : 'Unassigned'}". Cascaded to all child SEO tools.`
    );
  };

  const deleteSubCategory = (id: string, orphanStrategy: 'reassign' | 'unassign', newSubId?: string) => {
    const subToDelete = subCategories.find((s) => s.id === id);
    if (!subToDelete) return;

    // Orphan protection for SEO Tools inside this sub-category
    setTools((prev) =>
      prev.map((t) => {
        if (t.subCategoryId === id) {
          return {
            ...t,
            subCategoryId: orphanStrategy === 'reassign' && newSubId ? newSubId : null,
            status: orphanStrategy === 'reassign' ? t.status : 'draft',
            isActive: orphanStrategy === 'reassign' ? t.isActive : false,
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );

    setSubCategories((prev) => prev.filter((s) => s.id !== id));
    addAuditLog(
      'deleted',
      'subcategory',
      id,
      subToDelete.name,
      `Deleted sub-category "${subToDelete.name}". Orphan tools ${orphanStrategy === 'reassign' ? `reassigned to ${newSubId}` : 'moved to Unassigned / Draft'}.`
    );
  };

  const reorderSubCategories = (orderedIds: string[]) => {
    setSubCategories((prev) => {
      const map = new Map(prev.map((s) => [s.id, s]));
      const nextList: SubCategory[] = [];
      orderedIds.forEach((id, index) => {
        const item = map.get(id);
        if (item) {
          nextList.push({ ...item, displayOrder: index + 1 });
        }
      });
      return nextList;
    });
    addAuditLog('reordered', 'subcategory', 'taxonomy', 'Sub-Category Hierarchy', 'Reordered sub-category display order');
  };

  // ---------------------------------------------------------------------------
  // SEO TOOL HANDLERS
  // ---------------------------------------------------------------------------
  const createTool = (toolData: Omit<SeoTool, 'id' | 'createdAt' | 'updatedAt'>): SeoTool => {
    const newTool: SeoTool = {
      ...toolData,
      usageCount: toolData.usageCount || 0,
      id: generateId('tool'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTools((prev) => [...prev, newTool]);
    addAuditLog('created', 'tool', newTool.id, newTool.title, `Created SEO tool "${newTool.title}" with engine "${newTool.engineType}"`);
    return newTool;
  };

  const updateTool = (id: string, partial: Partial<SeoTool>) => {
    setTools((prev) =>
      prev.map((tool) => {
        if (tool.id === id) {
          if (partial.slug && partial.slug !== tool.slug) {
            const oldPath = `/tool/${tool.slug}`;
            const newPath = `/tool/${partial.slug}`;
            const redirect: RedirectRule = {
              id: generateId('redir'),
              fromPath: oldPath,
              toPath: newPath,
              statusCode: 301,
              reason: `Automatic redirect from Tool slug update: ${tool.slug} -> ${partial.slug}`,
              entityType: 'tool',
              entityId: tool.id,
              hits: 0,
              createdAt: new Date().toISOString(),
            };
            setRedirects((r) => [redirect, ...r]);
            addAuditLog('redirect_created', 'redirect', redirect.id, `${oldPath} -> ${newPath}`, 'Automatic 301 redirect registered for SEO tool slug change');
          }

          const updated = {
            ...tool,
            ...partial,
            updatedAt: new Date().toISOString(),
          };
          addAuditLog('edited', 'tool', tool.id, updated.title, `Updated tool configuration for "${updated.title}"`);
          return updated;
        }
        return tool;
      })
    );
  };

  const toggleToolStatus = (id: string) => {
    setTools((prev) =>
      prev.map((tool) => {
        if (tool.id === id) {
          const nextActive = !tool.isActive;
          addAuditLog('toggled_status', 'tool', tool.id, tool.title, `Toggled tool "${tool.title}" active status to ${nextActive}`);
          return { ...tool, isActive: nextActive, updatedAt: new Date().toISOString() };
        }
        return tool;
      })
    );
  };

  const setToolPublishStatus = (id: string, status: ToolStatus) => {
    setTools((prev) =>
      prev.map((tool) => {
        if (tool.id === id) {
          addAuditLog('toggled_status', 'tool', tool.id, tool.title, `Changed tool lifecycle status to "${status}"`);
          return { ...tool, status, updatedAt: new Date().toISOString() };
        }
        return tool;
      })
    );
  };

  const moveTool = (toolId: string, newCategoryId: string | null, newSubCategoryId: string | null) => {
    setTools((prev) =>
      prev.map((tool) => {
        if (tool.id === toolId) {
          const cat = categories.find((c) => c.id === newCategoryId);
          const sub = subCategories.find((s) => s.id === newSubCategoryId);
          addAuditLog(
            'moved',
            'tool',
            tool.id,
            tool.title,
            `Moved tool "${tool.title}" to Category: ${cat?.name || 'None'} / SubCategory: ${sub?.name || 'None'}`
          );
          return {
            ...tool,
            categoryId: newCategoryId,
            subCategoryId: newSubCategoryId,
            updatedAt: new Date().toISOString(),
          };
        }
        return tool;
      })
    );
  };

  const duplicateTool = (toolId: string): SeoTool | null => {
    const existing = tools.find((t) => t.id === toolId);
    if (!existing) return null;

    const dupSlug = `${existing.slug}-copy-${Math.floor(Math.random() * 1000)}`;
    const duplicated: SeoTool = {
      ...existing,
      id: generateId('tool'),
      title: `${existing.title} (Copy)`,
      slug: dupSlug,
      status: 'draft',
      isActive: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTools((prev) => [...prev, duplicated]);
    addAuditLog('created', 'tool', duplicated.id, duplicated.title, `Duplicated tool from "${existing.title}"`);
    return duplicated;
  };

  const deleteTool = (id: string) => {
    const tool = tools.find((t) => t.id === id);
    if (!tool) return;
    setTools((prev) => prev.filter((t) => t.id !== id));
    addAuditLog('deleted', 'tool', id, tool.title, `Deleted tool "${tool.title}"`);
  };

  const bulkToggleTools = (toolIds: string[], isActive: boolean) => {
    const idSet = new Set(toolIds);
    setTools((prev) =>
      prev.map((t) => (idSet.has(t.id) ? { ...t, isActive, updatedAt: new Date().toISOString() } : t))
    );
    addAuditLog('bulk_action', 'tool', 'bulk', 'Multiple Tools', `Bulk toggled ${toolIds.length} tools to active = ${isActive}`);
  };

  const bulkMoveTools = (toolIds: string[], targetCategoryId: string | null, targetSubCategoryId: string | null) => {
    const idSet = new Set(toolIds);
    setTools((prev) =>
      prev.map((t) =>
        idSet.has(t.id)
          ? { ...t, categoryId: targetCategoryId, subCategoryId: targetSubCategoryId, updatedAt: new Date().toISOString() }
          : t
      )
    );
    addAuditLog('bulk_action', 'tool', 'bulk', 'Multiple Tools', `Bulk moved ${toolIds.length} tools to new taxonomy location`);
  };

  const bulkDeleteTools = (toolIds: string[]) => {
    const idSet = new Set(toolIds);
    setTools((prev) => prev.filter((t) => !idSet.has(t.id)));
    addAuditLog('bulk_action', 'tool', 'bulk', 'Multiple Tools', `Bulk deleted ${toolIds.length} tools`);
  };

  // ---------------------------------------------------------------------------
  // TOOL USAGE ANALYTICS HANDLERS
  // ---------------------------------------------------------------------------
  const incrementToolUsageCount = (toolId: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, usageCount: (t.usageCount || 0) + 1 } : t))
    );
  };

  const trackToolUsage = (
    toolId: string,
    toolTitle?: string,
    engineType?: SeoTool['engineType'],
    durationMs = 380,
    device: 'desktop' | 'mobile' | 'tablet' = 'desktop',
    targetKeyword?: string
  ) => {
    // Resolve tool metadata if not explicitly provided
    const targetTool = tools.find((t) => t.id === toolId);
    const resolvedTitle = toolTitle || targetTool?.title || 'SEO Tool';
    const resolvedEngine = engineType || targetTool?.engineType || 'serp-pixel-simulator';
    const resolvedKeyword = targetKeyword || targetTool?.seo.focusKeyword || undefined;

    const event: ToolUsageEvent = {
      id: generateId('evt'),
      toolId,
      toolTitle: resolvedTitle,
      engineType: resolvedEngine,
      timestamp: new Date().toISOString(),
      executionDurationMs: durationMs,
      deviceType: device,
      targetKeyword: resolvedKeyword,
    };
    setToolUsageEvents((prev) => [event, ...prev.slice(0, 999)]);

    // Increment persistent usageCount on the tool model
    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, usageCount: (t.usageCount || 0) + 1 } : t))
    );
  };

  const simulateTrafficEvents = (count = 40) => {
    if (tools.length === 0) return;
    const now = Date.now();
    const newEvents: ToolUsageEvent[] = [];
    const devices: ('desktop' | 'mobile' | 'tablet')[] = ['desktop', 'desktop', 'mobile', 'tablet'];
    const toolRunCounts = new Map<string, number>();

    for (let i = 0; i < count; i++) {
      const tool = tools[Math.floor(Math.random() * tools.length)];
      const hoursAgo = Math.floor(Math.random() * 24 * 7); // over the past 7 days
      const eventTime = new Date(now - hoursAgo * 3600 * 1000).toISOString();
      const device = devices[Math.floor(Math.random() * devices.length)];
      const duration = Math.floor(180 + Math.random() * 1200);

      newEvents.push({
        id: generateId('evt_sim'),
        toolId: tool.id,
        toolTitle: tool.title,
        engineType: tool.engineType,
        timestamp: eventTime,
        executionDurationMs: duration,
        deviceType: device,
        targetKeyword: 'technical seo audit',
      });

      toolRunCounts.set(tool.id, (toolRunCounts.get(tool.id) || 0) + 1);
    }

    setToolUsageEvents((prev) => [...newEvents, ...prev].slice(0, 1500));

    // Increment corresponding usageCount properties across tools
    setTools((prev) =>
      prev.map((t) => {
        const added = toolRunCounts.get(t.id) || 0;
        return added > 0 ? { ...t, usageCount: (t.usageCount || 0) + added } : t;
      })
    );

    addAuditLog('bulk_action', 'system', 'traffic_sim', 'Analytics Engine', `Simulated ${count} real-time user tool execution events`);
  };

  const clearAnalyticsEvents = () => {
    setToolUsageEvents([]);
    addAuditLog('deleted', 'system', 'analytics_reset', 'Analytics Engine', 'Cleared historical tool engagement logs');
  };

  // ---------------------------------------------------------------------------
  // 301 REDIRECT REGISTRY HANDLERS
  // ---------------------------------------------------------------------------
  const addRedirect = (ruleData: Omit<RedirectRule, 'id' | 'hits' | 'createdAt'>): RedirectRule => {
    const newRule: RedirectRule = {
      ...ruleData,
      id: generateId('redir'),
      hits: 0,
      createdAt: new Date().toISOString(),
    };
    setRedirects((prev) => [newRule, ...prev]);
    addAuditLog('redirect_created', 'redirect', newRule.id, `${newRule.fromPath} -> ${newRule.toPath}`, `Added ${newRule.statusCode} redirect: ${newRule.reason}`);
    return newRule;
  };

  const deleteRedirect = (id: string) => {
    setRedirects((prev) => prev.filter((r) => r.id !== id));
    addAuditLog('deleted', 'redirect', id, 'Redirect Rule', 'Removed redirect mapping from 301 registry');
  };

  const checkRedirect = (currentPath: string): RedirectRule | null => {
    const normalized = currentPath.toLowerCase().trim();
    const match = redirects.find((r) => r.fromPath.toLowerCase().trim() === normalized);
    if (match) {
      // Increment hit counter
      setRedirects((prev) =>
        prev.map((r) => (r.id === match.id ? { ...r, hits: r.hits + 1 } : r))
      );
      return match;
    }
    return null;
  };

  const updateRobotsConfig = (config: RobotsTxtConfig) => {
    setRobotsConfig(config);
    addAuditLog('edited', 'system', 'robots_txt', 'robots.txt Configuration', 'Updated global crawl rules and sitemap directives');
  };

  // ---------------------------------------------------------------------------
  // BACKUP, IMPORT & DEMO PRESET HANDLERS
  // ---------------------------------------------------------------------------
  const exportRegistryJson = (): string => {
    const registry: CmsRegistry = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      siteBaseUrl: 'https://veritas-seo.dev',
      categories,
      subCategories,
      tools,
      redirects,
      auditLogs,
      robotsConfig,
    };
    return JSON.stringify(registry, null, 2);
  };

  const importRegistryJson = (jsonString: string): { success: boolean; message: string; errorCount?: number } => {
    try {
      const rawData = JSON.parse(jsonString);
      const validation = CmsRegistrySchema.safeParse(rawData);

      if (!validation.success) {
        return {
          success: false,
          message: `Validation Error: ${validation.error.issues[0]?.message || 'Invalid CMS registry format'} at ${validation.error.issues[0]?.path.join('.')}`,
          errorCount: validation.error.issues.length,
        };
      }

      const validData = validation.data;
      setCategories(validData.categories);
      setSubCategories(validData.subCategories);
      setTools(validData.tools);
      setRedirects(validData.redirects);
      setAuditLogs(validData.auditLogs);
      setRobotsConfig(validData.robotsConfig);

      addAuditLog(
        'imported',
        'system',
        'backup_import',
        'Full CMS Registry',
        `Successfully restored ${validData.categories.length} categories, ${validData.subCategories.length} sub-categories, ${validData.tools.length} tools.`
      );

      return {
        success: true,
        message: `Successfully imported ${validData.categories.length} categories, ${validData.subCategories.length} sub-categories, and ${validData.tools.length} tools.`,
      };
    } catch (err: unknown) {
      return {
        success: false,
        message: `JSON Syntax Error: ${err instanceof Error ? err.message : 'Failed to parse JSON file'}`,
      };
    }
  };

  const seedDemoPresets = () => {
    setCategories(DEMO_PRESET_CATEGORIES);
    setSubCategories(DEMO_PRESET_SUBCATEGORIES);
    setTools(DEMO_PRESET_TOOLS);

    // Seed realistic engagement events over the past 7 days
    const now = Date.now();
    const demoEvents: ToolUsageEvent[] = [];
    const devices: ('desktop' | 'mobile' | 'tablet')[] = ['desktop', 'desktop', 'mobile', 'tablet'];

    DEMO_PRESET_TOOLS.forEach((tool) => {
      // 15-25 events per demo tool spread over 7 days
      const count = 15 + Math.floor(Math.random() * 12);
      for (let i = 0; i < count; i++) {
        const hoursAgo = Math.floor(Math.random() * (24 * 7));
        demoEvents.push({
          id: generateId('evt_seed'),
          toolId: tool.id,
          toolTitle: tool.title,
          engineType: tool.engineType,
          timestamp: new Date(now - hoursAgo * 3600 * 1000).toISOString(),
          executionDurationMs: Math.floor(220 + Math.random() * 800),
          deviceType: devices[Math.floor(Math.random() * devices.length)],
          targetKeyword: tool.seo?.focusKeyword || 'technical seo',
        });
      }
    });

    setToolUsageEvents(demoEvents);

    addAuditLog(
      'imported',
      'system',
      'preset_seed',
      'Demo SEO Suite Preset',
      'Admin initialized instant demo preset with Technical SEO, On-Page SERP, and Schema.org categories & tools with analytics telemetry.'
    );
  };

  const clearAllData = () => {
    setCategories([]);
    setSubCategories([]);
    setTools([]);
    setRedirects([]);
    setToolUsageEvents([]);
    addAuditLog('deleted', 'system', 'reset_all', 'Zero Seed State', 'Admin cleared all categories, subcategories, and SEO tools.');
  };

  return (
    <CmsContext.Provider
      value={{
        categories,
        subCategories,
        tools,
        redirects,
        auditLogs,
        toolUsageEvents,
        robotsConfig,
        publicCategories,
        publicSubCategories,
        publicTools,
        createCategory,
        updateCategory,
        toggleCategoryStatus,
        deleteCategory,
        reorderCategories,
        createSubCategory,
        updateSubCategory,
        toggleSubCategoryStatus,
        moveSubCategory,
        deleteSubCategory,
        reorderSubCategories,
        createTool,
        updateTool,
        toggleToolStatus,
        setToolPublishStatus,
        moveTool,
        duplicateTool,
        deleteTool,
        bulkToggleTools,
        bulkMoveTools,
        bulkDeleteTools,
        trackToolUsage,
        incrementToolUsageCount,
        simulateTrafficEvents,
        clearAnalyticsEvents,
        addRedirect,
        deleteRedirect,
        checkRedirect,
        updateRobotsConfig,
        exportRegistryJson,
        importRegistryJson,
        seedDemoPresets,
        clearAllData,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export function useCms(): CmsContextType {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
