import { z } from 'zod';
import { SeoMetadataSchema, ToolDefaultInputConfigSchema, EducationalContentSchema, FaqItemSchema, ToolEngineTypeSchema, ToolBadgeSchema, ToolStatusSchema } from './schemas';

/**
 * Zod validation schema for Creating a Main Category
 */
export const CreateCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case (e.g. onpage-seo)'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon: z.string().min(1, 'Icon identifier is required'),
  displayOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  seo: SeoMetadataSchema,
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;

/**
 * Zod validation schema for Updating a Main Category
 */
export const UpdateCategorySchema = CreateCategorySchema.partial().extend({
  id: z.string().min(1),
});

export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;

/**
 * Zod validation schema for Creating a Sub-Category
 */
export const CreateSubCategorySchema = z.object({
  categoryId: z.string().nullable(), // Nullable when created in Unassigned bucket
  name: z.string().min(2, 'Sub-category name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case (e.g. serp-simulators)'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  displayOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  seo: SeoMetadataSchema,
});

export type CreateSubCategoryInput = z.infer<typeof CreateSubCategorySchema>;

/**
 * Zod validation schema for Updating a Sub-Category
 */
export const UpdateSubCategorySchema = CreateSubCategorySchema.partial().extend({
  id: z.string().min(1),
});

export type UpdateSubCategoryInput = z.infer<typeof UpdateSubCategorySchema>;

/**
 * Zod validation schema for Relocating a Sub-Category ("Move to Main Category")
 */
export const MoveSubCategorySchema = z.object({
  subCategoryId: z.string().min(1, 'Sub-category ID is required'),
  targetCategoryId: z.string().nullable(), // Can be null to move to Unassigned/Draft
});

export type MoveSubCategoryInput = z.infer<typeof MoveSubCategorySchema>;

/**
 * Zod validation schema for Creating an SEO Tool
 */
export const CreateToolSchema = z.object({
  title: z.string().min(2, 'Tool title must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case (e.g. serp-pixel-simulator)'),
  shortSummary: z.string().min(10, 'Short summary must be at least 10 characters'),
  icon: z.string().min(1, 'Icon identifier is required'),
  badge: ToolBadgeSchema.default('None'),
  categoryId: z.string().nullable(),
  subCategoryId: z.string().nullable(),
  status: ToolStatusSchema.default('published'),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().min(0).default(0),
  engineType: ToolEngineTypeSchema,
  defaultInputConfig: ToolDefaultInputConfigSchema,
  educationalContent: EducationalContentSchema,
  faqs: z.array(FaqItemSchema).default([]),
  seo: SeoMetadataSchema,
});

export type CreateToolInput = z.infer<typeof CreateToolSchema>;

/**
 * Zod validation schema for Updating an SEO Tool
 */
export const UpdateToolSchema = CreateToolSchema.partial().extend({
  id: z.string().min(1),
});

export type UpdateToolInput = z.infer<typeof UpdateToolSchema>;

/**
 * Zod validation schema for Relocating an SEO Tool
 * Supports moving to:
 *  - A standalone tool under a Main Category (categoryId, subCategoryId = null)
 *  - A tool under a Sub-Category (categoryId, subCategoryId)
 *  - Unassigned / Draft bucket (categoryId = null, subCategoryId = null)
 */
export const MoveToolSchema = z.object({
  toolId: z.string().min(1, 'Tool ID is required'),
  targetCategoryId: z.string().nullable(),
  targetSubCategoryId: z.string().nullable(),
});

export type MoveToolInput = z.infer<typeof MoveToolSchema>;

/**
 * Zod validation schema for Bulk Tool Operations
 */
export const BulkToolOperationSchema = z.object({
  toolIds: z.array(z.string().min(1)).min(1, 'At least one tool must be selected'),
  action: z.enum(['toggle_status', 'move', 'delete']),
  isActive: z.boolean().optional(),
  targetCategoryId: z.string().nullable().optional(),
  targetSubCategoryId: z.string().nullable().optional(),
});

export type BulkToolOperationInput = z.infer<typeof BulkToolOperationSchema>;
