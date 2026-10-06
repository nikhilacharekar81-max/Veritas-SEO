import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
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
  ContentBlock,
  BlogPost,
} from './schemas';
import { CmsRegistrySchema } from './schemas';
import { generateId } from './utils';
import {
  DEMO_PRESET_CATEGORIES,
  DEMO_PRESET_SUBCATEGORIES,
  DEMO_PRESET_TOOLS,
  DEMO_PRESET_BLOG_POSTS,
} from './demo-presets';

const STORAGE_KEYS = {
  CATEGORIES: 'veritas_seo_categories',
  SUBCATEGORIES: 'veritas_seo_subcategories',
  TOOLS: 'veritas_seo_tools',
  REDIRECTS: 'veritas_seo_redirects',
  AUDIT_LOGS: 'veritas_seo_audit_logs',
  TOOL_USAGE_EVENTS: 'veritas_seo_tool_usage_events',
  ROBOTS_CONFIG: 'veritas_seo_robots_config',
  CONTENT_BLOCKS: 'veritas_seo_content_blocks',
  BLOG_POSTS: 'veritas_seo_blog_posts',
  BLOG_CATEGORIES: 'veritas_seo_blog_categories',
  INITIALIZED: 'veritas_seo_initialized_flag',
};

const DEFAULT_BLOG_CATEGORIES = [
  'Technical SEO',
  'On-Page Optimization',
  'Schema & Structured Data',
  'Algorithm Updates',
  'Case Studies',
];

const DEFAULT_ROBOTS_CONFIG: RobotsTxtConfig = {
  userAgent: '*',
  allowPaths: ['/'],
  disallowPaths: ['/admin', '/api/internal'],
  crawlDelaySeconds: 0,
  autoIncludeSitemap: true,
  customRules: '# Veritas SEO Crawl Engine Rules\n# Optimized for Googlebot & Bingbot',
};

export const DEFAULT_CONTENT_BLOCKS: ContentBlock[] = [
  {
    id: 'blk_hero_badge',
    key: 'hero.badge',
    content: 'Enterprise Technical SEO & Precision Calculators',
  },
  {
    id: 'blk_hero_headline',
    key: 'hero.headline',
    content: 'Precision SEO Engineering & <span class="font-serif italic font-normal text-slate-700">Taxonomy Suite</span>',
  },
  {
    id: 'blk_hero_subheadline',
    key: 'hero.subheadline',
    content:
      'Simulate Google SERP pixel truncation, calculate n-gram keyword density using exact Decimal.js math, generate Schema.org JSON-LD, and manage hierarchical SEO tool taxonomies.',
  },
  {
    id: 'blk_hero_cat_heading',
    key: 'hero.categories_heading',
    content: 'Explore by Category Hub',
  },
  {
    id: 'blk_hero_cat_subheading',
    key: 'hero.categories_subheading',
    content: 'Deep dive into specialized sub-category workflows and diagnostic engines.',
  },
  {
    id: 'blk_analyzer_comp_title',
    key: 'analyzer.comparison_title',
    content: 'Keyword Contextual Analysis vs. N-Gram Keyword Frequency Matrix',
  },
  {
    id: 'blk_analyzer_ctx_title',
    key: 'analyzer.contextual_title',
    content: 'Contextual Analysis',
  },
  {
    id: 'blk_analyzer_ctx_desc',
    key: 'analyzer.contextual_desc',
    content:
      'Use this to ensure your primary keyword is distributed evenly throughout the document (check the 10-segment position map) and maintains a natural density profile.',
  },
  {
    id: 'blk_analyzer_mtx_title',
    key: 'analyzer.matrix_title',
    content: 'Frequency Matrix',
  },
  {
    id: 'blk_analyzer_mtx_desc',
    key: 'analyzer.matrix_desc',
    content:
      'Use this to identify technical red flags across unigrams, bigrams, trigrams, and quadgrams. Check for "Dense" status indicators and high frequency counts that may signal keyword stuffing.',
  },
  {
    id: 'blk_analyzer_s1_title',
    key: 'analyzer.section1_title',
    content: 'Why Modern SEO Requires N-Gram Analysis Over Simple Keyword Density',
  },
  {
    id: 'blk_analyzer_s1_intro',
    key: 'analyzer.section1_intro',
    content:
      'Simple word counters only tell half the story. If you write an article about digital marketing strategies, a basic tool counts "digital," "marketing," and "strategies" as completely separate words.',
  },
  {
    id: 'blk_analyzer_s1_ngram1',
    key: 'analyzer.section1_ngram1',
    content: 'Single words (e.g., "SEO", "content", "traffic").',
  },
  {
    id: 'blk_analyzer_s1_ngram2',
    key: 'analyzer.section1_ngram2',
    content: 'Two-word phrases (e.g., "keyword density", "search engine").',
  },
  {
    id: 'blk_analyzer_s1_ngram3',
    key: 'analyzer.section1_ngram3',
    content: 'Three-word long-tail phrases (e.g., "real-time content analysis").',
  },
  {
    id: 'blk_analyzer_s1_ngram4',
    key: 'analyzer.section1_ngram4',
    content: 'Four-word structural phrases (e.g., "free online keyword density").',
  },
  {
    id: 'blk_analyzer_s1_outro',
    key: 'analyzer.section1_outro',
    content:
      'By analyzing multi-word combinations, you can instantly identify unintended word repetition, uncover natural long-tail phrases, and align your writing with how modern search engines understand context.',
  },
  {
    id: 'blk_analyzer_s2_title',
    key: 'analyzer.section2_title',
    content: 'Key Features of Our Free Keyword & Text Analyzer',
  },
  {
    id: 'blk_analyzer_f1_title',
    key: 'analyzer.feature1_title',
    content: 'Live Visual Distribution Map',
  },
  {
    id: 'blk_analyzer_f1_desc',
    key: 'analyzer.feature1_desc',
    content:
      'Most tools only give you a raw count. Our tool splits your text into 10 document segments to show you where your keywords appear, helping you fix uneven keyword clustering across paragraphs.',
  },
  {
    id: 'blk_analyzer_f2_title',
    key: 'analyzer.feature2_title',
    content: 'Prominence & Metric Ranking',
  },
  {
    id: 'blk_analyzer_f2_desc',
    key: 'analyzer.feature2_desc',
    content:
      'Instead of sorting words strictly by count, our tool calculates a Prominence Score (Frequency × Phrase Length). This highlights meaningful, semantically rich phrases instead of generic filler words.',
  },
  {
    id: 'blk_analyzer_f3_title',
    key: 'analyzer.feature3_title',
    content: 'Color-Coded Target Diagnostics',
  },
  {
    id: 'blk_analyzer_f4_title',
    key: 'analyzer.feature4_title',
    content: 'Advanced Lexical Metrics',
  },
  {
    id: 'blk_analyzer_f4_desc',
    key: 'analyzer.feature4_desc',
    content:
      'Track Lexical Diversity (the ratio of unique words to total words), Reading Time, and overall vocabulary complexity to ensure high readability.',
  },
  {
    id: 'blk_analyzer_f5_title',
    key: 'analyzer.feature5_title',
    content: '100% Client-Side Privacy',
  },
  {
    id: 'blk_analyzer_f5_desc',
    key: 'analyzer.feature5_desc',
    content:
      'Your text is processed directly inside your web browser. Nothing is ever uploaded to a remote server, keeping your confidential drafts and articles 100% private.',
  },
  {
    id: 'blk_footer_tagline',
    key: 'footer.tagline',
    content:
      'Enterprise SEO tools platform & taxonomy CMS engineered with semantic HTML5, Decimal.js exact precision math, and automated schema-dts structured data.',
  },
  {
    id: 'blk_footer_copyright',
    key: 'footer.copyright',
    content: '© 2026 Veritas SEO Platform. All rights reserved.',
  },
];

interface CmsContextType {
  categories: MainCategory[];
  subCategories: SubCategory[];
  tools: SeoTool[];
  redirects: RedirectRule[];
  auditLogs: AuditLogEntry[];
  toolUsageEvents: ToolUsageEvent[];
  robotsConfig: RobotsTxtConfig;
  contentBlocks: ContentBlock[];
  blogPosts: BlogPost[];
  publicBlogPosts: BlogPost[];
  blogCategories: string[];
  isFrontendEditMode: boolean;
  setIsFrontendEditMode: (enabled: boolean) => void;

  // Global UI State
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  sitemapRobotsModalType: 'sitemap' | 'robots' | null;
  setSitemapRobotsModalType: (type: 'sitemap' | 'robots' | null) => void;
  viewMode: 'public' | 'admin';
  setViewMode: (mode: 'public' | 'admin') => void;

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
  // Content Actions
  setContentBlock: (key: string, content: string) => void;
  getContentBlock: (key: string) => string;
  deleteContentBlock: (key: string) => void;
  resetContentBlocks: () => void;

  // Blog CMS Actions (WordPress Style)
  createBlogPost: (post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>) => BlogPost;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string, permanent?: boolean) => void;
  addBlogCategory: (name: string) => void;
  deleteBlogCategory: (name: string) => void;

  // Backup, Import & Presets
  exportRegistryJson: () => string;
  importRegistryJson: (jsonString: string) => { success: boolean; message: string; errorCount?: number };
  seedDemoPresets: () => void;
  clearAllData: () => void;
}

const CmsContext = createContext<CmsContextType | null>(null);

const containsRogueText = (val: unknown): boolean => {
  if (!val) return false;
  let str = '';
  if (typeof val === 'string') {
    str = val;
  } else if (typeof val === 'object') {
    try {
      str = JSON.stringify(val);
    } catch {
      return false;
    }
  }
  const s = str.toLowerCase();
  return (
    s.includes('recommended direction') ||
    s.includes('youtube → 20 random tools') ||
    s.includes('instagram → 20 random tools') ||
    s.includes('tiktok → 20 random tools') ||
    s.includes('branding issue to think about') ||
    s.includes('veritas starts sounding narrower') ||
    s.includes('suggested creator tools taxonomy') ||
    s.includes('build creator tools around actual creator decisions')
  );
};

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // CRITICAL MANDATE: Start with deterministic state on both SSR and Client initial render
  const [categories, setCategories] = useState<MainCategory[]>(DEMO_PRESET_CATEGORIES);
  const [subCategories, setSubCategories] = useState<SubCategory[]>(DEMO_PRESET_SUBCATEGORIES);
  const [tools, setTools] = useState<SeoTool[]>(DEMO_PRESET_TOOLS);
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [toolUsageEvents, setToolUsageEvents] = useState<ToolUsageEvent[]>([]);
  const [robotsConfig, setRobotsConfig] = useState<RobotsTxtConfig>(DEFAULT_ROBOTS_CONFIG);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(DEFAULT_CONTENT_BLOCKS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(DEMO_PRESET_BLOG_POSTS);
  const [blogCategories, setBlogCategories] = useState<string[]>(DEFAULT_BLOG_CATEGORIES);
  const [isFrontendEditMode, setIsFrontendEditMode] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sitemapRobotsModalType, setSitemapRobotsModalType] = useState<'sitemap' | 'robots' | null>(null);
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [isHydrated, setIsHydrated] = useState(false);
  const isInitialMount = useRef(true);

  // Load from localStorage AFTER initial client mount to guarantee 100% hydration matching
  useEffect(() => {
    try {
      // 0. Auto-scrub any rogue/corrupted localStorage entries from earlier sessions
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            const val = localStorage.getItem(key);
            if (val && containsRogueText(val) && !Object.values(STORAGE_KEYS).includes(key)) {
              keysToRemove.push(key);
            }
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        console.warn('LocalStorage key scan warning:', e);
      }

      const savedCat = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (savedCat) {
        let parsedCat: MainCategory[] = JSON.parse(savedCat);
        if (Array.isArray(parsedCat) && parsedCat.length > 0) {
          parsedCat = parsedCat.filter(
            (c) => !containsRogueText(c.name) && !containsRogueText(c.description) && !containsRogueText(c.slug)
          );
          const existingCatIds = new Set(parsedCat.map((c) => c.id));
          const missingCats = DEMO_PRESET_CATEGORIES.filter((c) => !existingCatIds.has(c.id));
          const finalCats = [...parsedCat, ...missingCats];
          setCategories(finalCats);
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(finalCats));
        } else {
          setCategories(DEMO_PRESET_CATEGORIES);
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEMO_PRESET_CATEGORIES));
        }
      }

      const savedSub = localStorage.getItem(STORAGE_KEYS.SUBCATEGORIES);
      if (savedSub) {
        let parsedSub: SubCategory[] = JSON.parse(savedSub);
        if (Array.isArray(parsedSub) && parsedSub.length > 0) {
          parsedSub = parsedSub.filter(
            (s) => !containsRogueText(s.name) && !containsRogueText(s.description) && !containsRogueText(s.slug)
          );
          const existingSubIds = new Set(parsedSub.map((s) => s.id));
          const missingSubs = DEMO_PRESET_SUBCATEGORIES.filter((s) => !existingSubIds.has(s.id));
          const finalSubs = [...parsedSub, ...missingSubs];
          setSubCategories(finalSubs);
          localStorage.setItem(STORAGE_KEYS.SUBCATEGORIES, JSON.stringify(finalSubs));
        } else {
          setSubCategories(DEMO_PRESET_SUBCATEGORIES);
          localStorage.setItem(STORAGE_KEYS.SUBCATEGORIES, JSON.stringify(DEMO_PRESET_SUBCATEGORIES));
        }
      }

      const savedTools = localStorage.getItem(STORAGE_KEYS.TOOLS);
      const blueprintMigrated = localStorage.getItem('veritas_seo_kw_blueprint_v2');
      if (savedTools) {
        let parsedTools: SeoTool[] = JSON.parse(savedTools);
        if (Array.isArray(parsedTools) && parsedTools.length > 0) {
          parsedTools = parsedTools
            .filter((t) => {
              if (DEMO_PRESET_TOOLS.some((p) => p.id === t.id || p.slug === t.slug)) {
                return true;
              }
              return !containsRogueText(t.title) && !containsRogueText(t.slug) && !containsRogueText(t.shortSummary);
            })
            .map((t) => {
              const preset = DEMO_PRESET_TOOLS.find((p) => p.id === t.id || p.slug === t.slug);
              if (preset && (containsRogueText(t.shortSummary) || containsRogueText(t.educationalContent) || containsRogueText(t.title))) {
                return preset;
              }
              return t;
            });

          const existingToolIds = new Set(parsedTools.map((t) => t.id));
          const existingToolSlugs = new Set(parsedTools.map((t) => t.slug));
          const missingPresetTools = DEMO_PRESET_TOOLS.filter(
            (pt) => !existingToolIds.has(pt.id) && !existingToolSlugs.has(pt.slug)
          );

          const keywordPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_keyword_density');
          const serpPixelPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_serp_pixel');
          const schemaPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_schema_jsonld');
          const redirectPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_redirect_inspector');
          const botHeadersPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_bot_headers');
          const hreflangPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_hreflang_matrix');
          const ctrForecasterPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_ctr_forecaster');
          const socialCardsPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_social_cards');
          const robotsPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_robots_validator');
          const onpagePreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_onpage_scorer');
          const cwvPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_cwv_cls');
          const fleschPreset = DEMO_PRESET_TOOLS.find((t) => t.id === 'tool_readability_flesch');
          const serpMigrated = localStorage.getItem('veritas_seo_serp_pixel_v6');
          const schemaGuideMigrated = localStorage.getItem('veritas_seo_schema_guide_v5');
          const redirectCleanMigrated = localStorage.getItem('veritas_seo_redirect_clean_v1');
          const botHeadersCleanMigrated = localStorage.getItem('veritas_seo_bot_headers_meta_v2');
          const hreflangCleanMigrated = localStorage.getItem('veritas_seo_hreflang_clean_v1');
          const ctrForecasterCleanMigrated = localStorage.getItem('veritas_seo_ctr_meta_v2');
          const socialMetaMigrated = localStorage.getItem('veritas_seo_social_meta_v3');
          const robotsCleanMigrated = localStorage.getItem('veritas_seo_robots_clean_v1');
          const onpageCleanMigrated = localStorage.getItem('veritas_seo_onpage_clean_v1');
          const cwvCleanMigrated = localStorage.getItem('veritas_seo_cwv_content_v2');
          const fleschGuideMigrated = localStorage.getItem('veritas_seo_flesch_guide_v2');
          const mergedTools = [...parsedTools, ...missingPresetTools].map((t) => {
            const fixedSubCat =
              t.subCategoryId === 'subcat_serp_simulators' ? 'subcat_serp_preview' : t.subCategoryId;
            if (!fleschGuideMigrated && (t.id === 'tool_readability_flesch' || t.slug === 'readability-flesch-analyzer' || t.engineType === 'readability-flesch-analyzer') && fleschPreset) {
              return {
                ...t,
                sections: fleschPreset.sections,
                shortSummary: fleschPreset.shortSummary,
                educationalContent: fleschPreset.educationalContent,
                faqs: [],
              };
            }
            if (!cwvCleanMigrated && (t.id === 'tool_cwv_cls' || t.slug === 'cwv-cls-calculator' || t.engineType === 'cwv-cls-calculator') && cwvPreset) {
              return {
                ...t,
                sections: cwvPreset.sections,
                educationalContent: cwvPreset.educationalContent,
                faqs: [],
              };
            }
            if (!onpageCleanMigrated && (t.id === 'tool_onpage_scorer' || t.slug === 'onpage-audit-scorer' || t.engineType === 'onpage-audit-scorer') && onpagePreset) {
              return {
                ...t,
                sections: onpagePreset.sections,
                educationalContent: { howItWorks: '', formulaMethodology: '', stepByStepGuide: [] },
                faqs: [],
              };
            }
            if (!robotsCleanMigrated && (t.id === 'tool_robots_validator' || t.slug === 'robots-sitemap-validator' || t.engineType === 'robots-sitemap-validator') && robotsPreset) {
              return {
                ...t,
                sections: robotsPreset.sections,
                educationalContent: { howItWorks: '', formulaMethodology: '', stepByStepGuide: [] },
                faqs: [],
              };
            }
            if (!socialMetaMigrated && (t.id === 'tool_social_cards' || t.slug === 'social-card-studio' || t.engineType === 'social-card-studio') && socialCardsPreset) {
              return {
                ...t,
                sections: socialCardsPreset.sections,
                educationalContent: { howItWorks: '', formulaMethodology: '', stepByStepGuide: [] },
                faqs: [],
                seo: socialCardsPreset.seo,
              };
            }
            if (!ctrForecasterCleanMigrated && (t.id === 'tool_ctr_forecaster' || t.slug === 'serp-ctr-forecaster' || t.engineType === 'serp-rank-calculator') && ctrForecasterPreset) {
              return {
                ...t,
                sections: ctrForecasterPreset.sections,
                educationalContent: { howItWorks: '', formulaMethodology: '', stepByStepGuide: [] },
                faqs: [],
                seo: ctrForecasterPreset.seo,
              };
            }
            if (!hreflangCleanMigrated && (t.id === 'tool_hreflang_matrix' || t.slug === 'hreflang-tag-matrix' || t.engineType === 'hreflang-tag-matrix') && hreflangPreset) {
              return {
                ...t,
                sections: hreflangPreset.sections,
                educationalContent: { howItWorks: '', formulaMethodology: '', stepByStepGuide: [] },
                faqs: [],
              };
            }
            if (!botHeadersCleanMigrated && (t.id === 'tool_bot_headers' || t.slug === 'bot-header-inspector' || t.engineType === 'bot-header-inspector') && botHeadersPreset) {
              return {
                ...t,
                sections: botHeadersPreset.sections,
                educationalContent: { howItWorks: '', formulaMethodology: '', stepByStepGuide: [] },
                faqs: [],
                seo: botHeadersPreset.seo,
              };
            }
            if (!redirectCleanMigrated && (t.id === 'tool_redirect_inspector' || t.slug === 'redirect-chain-inspector' || t.engineType === 'redirect-chain-inspector') && redirectPreset) {
              return {
                ...t,
                sections: redirectPreset.sections,
                educationalContent: { howItWorks: '', formulaMethodology: '', stepByStepGuide: [] },
                faqs: redirectPreset.faqs,
              };
            }
            if (!schemaGuideMigrated && (t.id === 'tool_schema_jsonld' || t.slug === 'schema-jsonld-generator' || t.engineType === 'schema-jsonld-generator') && schemaPreset) {
              return {
                ...t,
                sections: schemaPreset.sections,
                educationalContent: schemaPreset.educationalContent,
                faqs: schemaPreset.faqs,
                seo: schemaPreset.seo,
              };
            }
            if (!serpMigrated && t.id === 'tool_serp_pixel' && serpPixelPreset) {
              return {
                ...t,
                subCategoryId: fixedSubCat,
                educationalContent: serpPixelPreset.educationalContent,
                faqs: serpPixelPreset.faqs,
                seo: serpPixelPreset.seo,
              };
            }
            if (!blueprintMigrated && t.id === 'tool_keyword_density' && keywordPreset) {
              return {
                ...t,
                subCategoryId: fixedSubCat,
                title: keywordPreset.title,
                shortSummary: keywordPreset.shortSummary,
                educationalContent: keywordPreset.educationalContent,
                faqs: keywordPreset.faqs,
                seo: keywordPreset.seo,
              };
            }
            return {
              ...t,
              subCategoryId: fixedSubCat,
            };
          });

          setTools(mergedTools);
          localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(mergedTools));
          localStorage.setItem('veritas_seo_kw_blueprint_v2', 'true');
          localStorage.setItem('veritas_seo_serp_pixel_v6', 'true');
          localStorage.setItem('veritas_seo_schema_guide_v5', 'true');
          localStorage.setItem('veritas_seo_redirect_clean_v1', 'true');
          localStorage.setItem('veritas_seo_bot_headers_meta_v2', 'true');
          localStorage.setItem('veritas_seo_hreflang_clean_v1', 'true');
          localStorage.setItem('veritas_seo_ctr_meta_v2', 'true');
          localStorage.setItem('veritas_seo_social_meta_v3', 'true');
          localStorage.setItem('veritas_seo_robots_clean_v1', 'true');
          localStorage.setItem('veritas_seo_onpage_clean_v1', 'true');
          localStorage.setItem('veritas_seo_cwv_content_v2', 'true');
          localStorage.setItem('veritas_seo_flesch_guide_v2', 'true');
        }
      } else {
        localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(DEMO_PRESET_TOOLS));
        localStorage.setItem('veritas_seo_kw_blueprint_v2', 'true');
        localStorage.setItem('veritas_seo_schema_guide_v5', 'true');
        localStorage.setItem('veritas_seo_redirect_clean_v1', 'true');
        localStorage.setItem('veritas_seo_bot_headers_meta_v2', 'true');
        localStorage.setItem('veritas_seo_hreflang_clean_v1', 'true');
        localStorage.setItem('veritas_seo_ctr_meta_v2', 'true');
        localStorage.setItem('veritas_seo_social_meta_v3', 'true');
        localStorage.setItem('veritas_seo_robots_clean_v1', 'true');
        localStorage.setItem('veritas_seo_onpage_clean_v1', 'true');
        localStorage.setItem('veritas_seo_cwv_content_v2', 'true');
        localStorage.setItem('veritas_seo_flesch_guide_v2', 'true');
      }

      const savedRedir = localStorage.getItem(STORAGE_KEYS.REDIRECTS);
      if (savedRedir) setRedirects(JSON.parse(savedRedir));

      const savedLogs = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));

      const savedEvents = localStorage.getItem(STORAGE_KEYS.TOOL_USAGE_EVENTS);
      if (savedEvents) setToolUsageEvents(JSON.parse(savedEvents));

      const savedRobots = localStorage.getItem(STORAGE_KEYS.ROBOTS_CONFIG);
      if (savedRobots) setRobotsConfig(JSON.parse(savedRobots));
      
      const savedBlocks = localStorage.getItem(STORAGE_KEYS.CONTENT_BLOCKS);
      if (savedBlocks) {
        const parsedBlocks: ContentBlock[] = JSON.parse(savedBlocks);
        if (Array.isArray(parsedBlocks)) {
          const blockMap = new Map(
            parsedBlocks
              .filter((b) => !containsRogueText(b.key) && !containsRogueText(b.content))
              .map((b) => [b.key, b])
          );
          const merged: ContentBlock[] = DEFAULT_CONTENT_BLOCKS.map((def) =>
            blockMap.has(def.key) ? blockMap.get(def.key)! : def
          );
          parsedBlocks.forEach((b) => {
            if (!DEFAULT_CONTENT_BLOCKS.some((def) => def.key === b.key) && !containsRogueText(b.content) && !containsRogueText(b.key)) {
              merged.push(b);
            }
          });
          setContentBlocks(merged);
          localStorage.setItem(STORAGE_KEYS.CONTENT_BLOCKS, JSON.stringify(merged));
        }
      } else {
        localStorage.setItem(STORAGE_KEYS.CONTENT_BLOCKS, JSON.stringify(DEFAULT_CONTENT_BLOCKS));
      }

      const savedBlog = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
      if (savedBlog) {
        let parsedBlog: BlogPost[] = JSON.parse(savedBlog);
        if (Array.isArray(parsedBlog) && parsedBlog.length > 0) {
          parsedBlog = parsedBlog.filter(
            (p) => !containsRogueText(p.title) && !containsRogueText(p.content) && !containsRogueText(p.excerpt)
          );
          const existingIds = new Set(parsedBlog.map((p) => p.id));
          const missingPresets = DEMO_PRESET_BLOG_POSTS.filter((p) => !existingIds.has(p.id));
          const finalBlogs = [...parsedBlog, ...missingPresets];
          setBlogPosts(finalBlogs);
          localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(finalBlogs));
        } else {
          setBlogPosts(DEMO_PRESET_BLOG_POSTS);
          localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(DEMO_PRESET_BLOG_POSTS));
        }
      }

      const savedBlogCats = localStorage.getItem(STORAGE_KEYS.BLOG_CATEGORIES);
      if (savedBlogCats) {
        const parsedBlogCats: string[] = JSON.parse(savedBlogCats);
        if (Array.isArray(parsedBlogCats) && parsedBlogCats.length > 0) {
          setBlogCategories(parsedBlogCats.filter((c) => !containsRogueText(c)));
        }
      }
    } catch (e) {
      console.error('Failed to parse CMS storage during hydration', e);
    } finally {
      setIsHydrated(true);
      setTimeout(() => {
        isInitialMount.current = false;
      }, 200);
    }
  }, []);

  // Save to localStorage ONLY on state mutation after initial load
  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    }
  }, [categories, isHydrated]);

  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.SUBCATEGORIES, JSON.stringify(subCategories));
    }
  }, [subCategories, isHydrated]);

  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
    }
  }, [tools, isHydrated]);

  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.REDIRECTS, JSON.stringify(redirects));
    }
  }, [redirects, isHydrated]);

  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
    }
  }, [auditLogs, isHydrated]);

  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.TOOL_USAGE_EVENTS, JSON.stringify(toolUsageEvents));
    }
  }, [toolUsageEvents, isHydrated]);

  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.ROBOTS_CONFIG, JSON.stringify(robotsConfig));
    }
  }, [robotsConfig, isHydrated]);

  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.CONTENT_BLOCKS, JSON.stringify(contentBlocks));
    }
  }, [contentBlocks, isHydrated]);

  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(blogPosts));
    }
  }, [blogPosts, isHydrated]);

  useEffect(() => {
    if (isHydrated && !isInitialMount.current) {
      localStorage.setItem(STORAGE_KEYS.BLOG_CATEGORIES, JSON.stringify(blogCategories));
    }
  }, [blogCategories, isHydrated]);

  const publicBlogPosts = useMemo(() => {
    return blogPosts
      .filter((p) => p.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [blogPosts]);

  const createBlogPost = (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>): BlogPost => {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...postData,
      id: generateId('post'),
      publishedAt: now,
      updatedAt: now,
    };
    setBlogPosts((prev) => [newPost, ...prev]);
    addAuditLog('created', 'blog', newPost.id, newPost.title, `Created blog post "/blog/${newPost.slug}" (${newPost.status})`);
    return newPost;
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) return post;
        // Auto-create 301 redirect if slug changed on a published post
        if (updates.slug && updates.slug !== post.slug) {
          const oldPath = `/blog/${post.slug}`;
          const newPath = `/blog/${updates.slug}`;
          setRedirects((rPrev) => [
            {
              id: generateId('redir'),
              fromPath: oldPath,
              toPath: newPath,
              statusCode: 301,
              reason: `Blog post slug changed from ${oldPath} to ${newPath}`,
              entityType: 'manual',
              entityId: post.id,
              hits: 0,
              createdAt: new Date().toISOString(),
            },
            ...rPrev.filter((r) => r.fromPath !== oldPath),
          ]);
        }
        return {
          ...post,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      })
    );
    addAuditLog('edited', 'blog', id, updates.title || id, 'Updated blog post');
  };

  const deleteBlogPost = (id: string, permanent = false) => {
    const target = blogPosts.find((p) => p.id === id);
    if (!target) return;
    if (permanent || target.status === 'trash') {
      setBlogPosts((prev) => prev.filter((p) => p.id !== id));
      addAuditLog('deleted', 'blog', id, target.title, 'Permanently deleted blog post');
    } else {
      setBlogPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'trash', updatedAt: new Date().toISOString() } : p))
      );
      addAuditLog('toggled_status', 'blog', id, target.title, 'Moved blog post to Trash');
    }
  };

  const addBlogCategory = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || blogCategories.includes(trimmed)) return;
    setBlogCategories((prev) => [...prev, trimmed]);
  };

  const deleteBlogCategory = (name: string) => {
    setBlogCategories((prev) => prev.filter((c) => c !== name));
  };

  const setContentBlock = (key: string, content: string) => {
    setContentBlocks((prev) => {
      const index = prev.findIndex((b) => b.key === key);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], content };
        return updated;
      }
      return [...prev, { id: generateId('block'), key, content }];
    });
    addAuditLog('edited', 'system', key, `Content Block: ${key}`, `Updated content block "${key}"`);
  };

  const getContentBlock = (key: string) => {
    return contentBlocks.find((b) => b.key === key)?.content || '';
  };

  const deleteContentBlock = (key: string) => {
    setContentBlocks((prev) => prev.filter((b) => b.key !== key));
    addAuditLog('deleted', 'system', key, `Content Block: ${key}`, `Deleted content block "${key}"`);
  };

  const resetContentBlocks = () => {
    setContentBlocks(DEFAULT_CONTENT_BLOCKS);
    addAuditLog('imported', 'system', 'content_reset', 'Content Blocks', 'Reset all content blocks to default values');
  };

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

  const allSubCategoryIds = useMemo(() => {
    return new Set(subCategories.map((sc) => sc.id));
  }, [subCategories]);

  const publicTools = useMemo(() => {
    return tools
      .filter((t) => {
        if (!t.isActive || t.status !== 'published') return false;
        if (t.categoryId && !activeCategoryIds.has(t.categoryId)) return false;
        if (
          t.subCategoryId &&
          allSubCategoryIds.has(t.subCategoryId) &&
          !activeSubCategoryIds.has(t.subCategoryId)
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [tools, activeCategoryIds, allSubCategoryIds, activeSubCategoryIds]);

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
      contentBlocks,
      blogPosts,
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
        contentBlocks,
        blogPosts,
        publicBlogPosts,
        blogCategories,
        isFrontendEditMode,
        setIsFrontendEditMode,
        isSearchOpen,
        setIsSearchOpen,
        sitemapRobotsModalType,
        setSitemapRobotsModalType,
        viewMode,
        setViewMode,
        setContentBlock,
        getContentBlock,
        deleteContentBlock,
        resetContentBlocks,
        createBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addBlogCategory,
        deleteBlogCategory,
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
