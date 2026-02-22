import { z } from 'zod'

/**
 * Validation schema for creating/updating blog posts
 */
export const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  excerpt: z
    .string()
    .max(500, 'Excerpt must be less than 500 characters')
    .optional()
    .nullable(),
  content: z.string().min(1, 'Content is required'),
  categoryId: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  metaTitle: z
    .string()
    .max(60, 'Meta title must be less than 60 characters')
    .optional()
    .nullable(),
  metaDescription: z
    .string()
    .max(160, 'Meta description must be less than 160 characters')
    .optional()
    .nullable(),
  keywords: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  featuredImageUrl: z.string().url().or(z.literal('')).optional().nullable(),
  featuredImagePublicId: z.string().optional().nullable(),
  featuredImageAlt: z
    .string()
    .max(200, 'Image alt text must be less than 200 characters')
    .optional()
    .nullable(),
  ogImage: z.string().url().or(z.literal('')).optional().nullable(),
  scheduledAt: z.string().datetime().optional().nullable(),
  isFeatured: z.boolean().default(false),
  allowComments: z.boolean().default(false),
})

/**
 * Validation schema for blog categories
 */
export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be less than 100 characters'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100, 'Slug must be less than 100 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must contain only lowercase letters, numbers, and hyphens'
    ),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .nullable(),
  type: z.enum(['COURSE', 'BLOG']).default('BLOG'),
})

/**
 * Validation schema for search queries
 */
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(200),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().int().min(1).max(100).default(20),
  page: z.number().int().min(1).default(1),
})

/**
 * Validation schema for post filters
 */
export const postFilterSchema = z.object({
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  categoryId: z.string().optional(),
  authorId: z.string().optional(),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().int().min(1).max(100).default(12),
  page: z.number().int().min(1).default(1),
  sortBy: z.enum(['publishedAt', 'updatedAt', 'viewCount']).default('publishedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

/**
 * Type exports for TypeScript
 */
export type PostFormData = z.infer<typeof postSchema>
export type CategoryFormData = z.infer<typeof categorySchema>
export type SearchQuery = z.infer<typeof searchSchema>
export type PostFilter = z.infer<typeof postFilterSchema>
