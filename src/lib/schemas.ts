import { z } from 'zod';

/**
 * Robots Directives Schema
 */
export const RobotsDirectivesSchema = z.object({
  index: z.boolean(),
  follow: z.boolean(),
  noarchive: z.boolean(),
  maxSnippet: z.number().int().min(-1).max(320),
  maxImagePreview: z.enum(['none', 'standard', 'large']),
});

export type RobotsDirectives = z.infer<typeof RobotsDirectivesSchema>;

/**
 * Dedicated Enterprise SEO Control Suite Schema
 * Embedded in every Main Category, Sub-Category, and SEO Tool
 */
export const SeoMetadataSchema = z.object({
  metaTitle: z.string().min(1, 'Meta title is required'),
  metaDescription: z.string(),
  canonicalUrl: z.string(),
  focusKeyword: z.string(),
  ogTitle: z.string(),
  ogDescription: z.string(),
  ogImage: z.string(),
  ogType: z.enum(['website', 'article']),
  twitterCard: z.enum(['summary', 'summary_large_image']),
  twitterTitle: z.string(),
  twitterDescription: z.string(),
  twitterImage: z.string(),
  robots: RobotsDirectivesSchema,
  schemaApplicationCategory: z.string(),
});

export type SeoMetadata = z.infer<typeof SeoMetadataSchema>;

/**
 * Tier 1: Main Category Schema
 */
export const MainCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  icon: z.string().min(1),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
  seo: SeoMetadataSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MainCategory = z.infer<typeof MainCategorySchema>;

/**
 * Tier 2: Sub-Category Schema
 */
export const SubCategorySchema = z.object({
  id: z.string().min(1),
  categoryId: z.string().nullable(), // null when moved to Unassigned / Draft via orphan protection
  name: z.string().min(2, 'Sub-category name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
  seo: SeoMetadataSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SubCategory = z.infer<typeof SubCategorySchema>;

/**
 * Dynamic FAQ Item Schema
 */
export const FaqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(5, 'Question must be at least 5 characters'),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
});

export type FaqItem = z.infer<typeof FaqItemSchema>;

/**
 * Step-by-Step Guide Item Schema
 */
export const GuideStepSchema = z.object({
  id: z.string().min(1),
  stepTitle: z.string().min(2, 'Step title is required'),
  stepDescription: z.string().min(5, 'Step description is required'),
});

export type GuideStep = z.infer<typeof GuideStepSchema>;

/**
 * Educational Content Block Schema
 */
export const EducationalContentSchema = z.object({
  howItWorks: z.string(),
  formulaMethodology: z.string(),
  stepByStepGuide: z.array(GuideStepSchema),
});

export type EducationalContent = z.infer<typeof EducationalContentSchema>;

/**
 * Interactive SEO Tool Engine Types
 */
export const ToolEngineTypeSchema = z.enum([
  'serp-pixel-simulator',
  'keyword-density-analyzer',
  'schema-jsonld-generator',
  'onpage-audit-scorer',
  'robots-sitemap-validator',
  'redirect-chain-inspector',
  'cwv-cls-calculator',
  'readability-flesch-analyzer',
  'hreflang-tag-matrix',
  'serp-rank-calculator',
  'bot-header-inspector',
  'social-card-studio',
]);

export type ToolEngineType = z.infer<typeof ToolEngineTypeSchema>;

export const ToolBadgeSchema = z.enum(['None', 'Popular', 'New', 'Pro', 'Free']);
export type ToolBadge = z.infer<typeof ToolBadgeSchema>;

export const ToolStatusSchema = z.enum(['published', 'draft', 'maintenance']);
export type ToolStatus = z.infer<typeof ToolStatusSchema>;

/**
 * Default Input Configuration for SEO Tool Engines (Zod-validated at runtime)
 */
export const ToolDefaultInputConfigSchema = z.object({
  sampleUrl: z.string(),
  sampleTitle: z.string(),
  sampleDescription: z.string(),
  sampleTargetKeyword: z.string(),
  sampleBodyText: z.string(),
  maxTitlePixels: z.number().min(200).max(800),
  maxDescPixels: z.number().min(400).max(1400),
  targetDensityMin: z.number().min(0.1).max(10),
  targetDensityMax: z.number().min(0.5).max(15),
});

export type ToolDefaultInputConfig = z.infer<typeof ToolDefaultInputConfigSchema>;

/**
 * Tier 3: SEO Tool Record Schema
 */
export const SeoToolSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2, 'Tool title must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  shortSummary: z.string().min(10, 'Short summary must be at least 10 characters'),
  icon: z.string().min(1),
  badge: ToolBadgeSchema,
  categoryId: z.string().nullable(),
  subCategoryId: z.string().nullable(),
  status: ToolStatusSchema,
  isActive: z.boolean(),
  displayOrder: z.number().int().min(0),
  usageCount: z.number().int().min(0).default(0),
  engineType: ToolEngineTypeSchema,
  defaultInputConfig: ToolDefaultInputConfigSchema,
  educationalContent: EducationalContentSchema,
  faqs: z.array(FaqItemSchema),
  seo: SeoMetadataSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SeoTool = z.infer<typeof SeoToolSchema>;

/**
 * URL & SEO Equity Protection: 301 Redirect Registry Entry
 */
export const RedirectRuleSchema = z.object({
  id: z.string().min(1),
  fromPath: z.string().startsWith('/', 'Path must start with /'),
  toPath: z.string().startsWith('/', 'Path must start with /'),
  statusCode: z.union([z.literal(301), z.literal(302)]),
  reason: z.string(),
  entityType: z.enum(['category', 'subcategory', 'tool', 'manual']),
  entityId: z.string().nullable(),
  hits: z.number().int().min(0),
  createdAt: z.string(),
});

export type RedirectRule = z.infer<typeof RedirectRuleSchema>;

/**
 * Governance Audit Log Entry Schema
 */
export const AuditLogEntrySchema = z.object({
  id: z.string().min(1),
  timestamp: z.string(),
  action: z.enum([
    'created',
    'edited',
    'moved',
    'toggled_status',
    'deleted',
    'redirect_created',
    'bulk_action',
    'imported',
    'reordered',
  ]),
  entityType: z.enum(['category', 'subcategory', 'tool', 'redirect', 'blog', 'system']),
  entityId: z.string(),
  entityName: z.string(),
  details: z.string(),
});

export type AuditLogEntry = z.infer<typeof AuditLogEntrySchema>;

/**
 * WordPress-Style Blog Post Schema
 */
export const BlogPostStatusSchema = z.enum(['published', 'draft', 'trash']);
export type BlogPostStatus = z.infer<typeof BlogPostStatusSchema>;

export const BlogPostSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2, 'Post title is required'),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  excerpt: z.string(),
  content: z.string(),
  category: z.string().min(1).default('Technical SEO'),
  tags: z.array(z.string()).default([]),
  author: z.string().default('Editorial Team'),
  featuredImage: z.string().default(''),
  status: BlogPostStatusSchema.default('published'),
  readingTimeMinutes: z.number().int().min(1).default(4),
  seoTitle: z.string().default(''),
  seoDescription: z.string().default(''),
  focusKeyword: z.string().default(''),
  publishedAt: z.string(),
  updatedAt: z.string(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

/**
 * Tool Usage & Engagement Event Schema
 */
export const ToolUsageEventSchema = z.object({
  id: z.string().min(1),
  toolId: z.string().min(1),
  toolTitle: z.string().min(1),
  engineType: ToolEngineTypeSchema,
  timestamp: z.string(),
  executionDurationMs: z.number().int().min(0),
  deviceType: z.enum(['desktop', 'mobile', 'tablet']),
  targetKeyword: z.string().optional(),
});

export type ToolUsageEvent = z.infer<typeof ToolUsageEventSchema>;

/**
 * Dynamic robots.txt Configuration Schema
 */
export const RobotsTxtConfigSchema = z.object({
  userAgent: z.string().min(1),
  allowPaths: z.array(z.string()),
  disallowPaths: z.array(z.string()),
  crawlDelaySeconds: z.number().int().min(0).max(120),
  autoIncludeSitemap: z.boolean(),
  customRules: z.string(),
});

export type RobotsTxtConfig = z.infer<typeof RobotsTxtConfigSchema>;

/**
 * Content Block Schema for editable text areas
 */
export const ContentBlockSchema = z.object({
  id: z.string().min(1),
  key: z.string().min(1),
  content: z.string(),
});

export type ContentBlock = z.infer<typeof ContentBlockSchema>;

/**
 * Complete CMS Registry Schema (Used for Zod-validated Export & Bulk Import)
 */
export const CmsRegistrySchema = z.object({
  version: z.string(),
  exportedAt: z.string(),
  siteBaseUrl: z.string().url(),
  categories: z.array(MainCategorySchema),
  subCategories: z.array(SubCategorySchema),
  tools: z.array(SeoToolSchema),
  redirects: z.array(RedirectRuleSchema),
  auditLogs: z.array(AuditLogEntrySchema),
  robotsConfig: RobotsTxtConfigSchema,
  contentBlocks: z.array(ContentBlockSchema).default([]),
  blogPosts: z.array(BlogPostSchema).default([]),
});

export type CmsRegistry = z.infer<typeof CmsRegistrySchema>;

/**
 * Helper to create default SEO metadata for a new entity
 */
export function createDefaultSeoMetadata(title = '', description = '', canonicalPath = ''): SeoMetadata {
  return {
    metaTitle: title,
    metaDescription: description,
    canonicalUrl: canonicalPath,
    focusKeyword: '',
    ogTitle: title,
    ogDescription: description,
    ogImage: '',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: '',
    robots: {
      index: true,
      follow: true,
      noarchive: false,
      maxSnippet: -1,
      maxImagePreview: 'large',
    },
    schemaApplicationCategory: 'BusinessApplication',
  };
}

export function createDefaultToolInputConfig(): ToolDefaultInputConfig {
  return {
    sampleUrl: 'https://example.com/enterprise-seo-guide',
    sampleTitle: 'Enterprise Technical SEO Guide: Architecture & Core Web Vitals',
    sampleDescription:
      'Learn how to architect zero-CLS semantic HTML5 pages, configure Schema.org JSON-LD, and optimize crawl equity for enterprise search visibility.',
    sampleTargetKeyword: 'enterprise technical seo',
    sampleBodyText:
      'Enterprise technical SEO requires a strict execution pipeline combining semantic HTML5 landmarks, clean canonical URL structures, and validated Schema.org JSON-LD structured data. When search engine crawlers evaluate enterprise technical SEO architecture, they prioritize fast server response times, zero cumulative layout shift, and unambiguous internal linking hierarchies.',
    maxTitlePixels: 580,
    maxDescPixels: 920,
    targetDensityMin: 1.0,
    targetDensityMax: 2.5,
  };
}
