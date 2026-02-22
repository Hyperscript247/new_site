'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/session'
import { revalidatePath } from 'next/cache'
import { categorySchema } from '@/lib/validation/blog-schemas'

/**
 * Get all blog categories (Public)
 */
export async function getBlogCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: { type: 'BLOG' },
      include: {
        _count: {
          select: { blogPosts: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    return { success: true, categories }
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return { success: false, error: 'Failed to fetch categories' }
  }
}

/**
 * Get a single category by slug (Public)
 */
export async function getCategoryBySlug(slug: string) {
  try {
    const category = await prisma.category.findFirst({
      where: { slug, type: 'BLOG' },
      include: {
        _count: {
          select: { blogPosts: true },
        },
      },
    })

    if (!category) {
      return { success: false, error: 'Category not found' }
    }

    return { success: true, category }
  } catch (error) {
    console.error('Error fetching category:', error)
    return { success: false, error: 'Failed to fetch category' }
  }
}

/**
 * Create a new blog category (Admin only)
 */
export async function createBlogCategory(data: any) {
  await requireAuth()

  try {
    const validated = categorySchema.parse({ ...data, type: 'BLOG' })

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug: validated.slug },
    })

    if (existingCategory) {
      return {
        success: false,
        error: 'A category with this slug already exists',
      }
    }

    const category = await prisma.category.create({
      data: validated,
    })

    revalidatePath('/admin/blog/categories')
    revalidatePath('/blog')

    return { success: true, category }
  } catch (error) {
    console.error('Error creating category:', error)
    return { success: false, error: 'Failed to create category' }
  }
}

/**
 * Update a blog category (Admin only)
 */
export async function updateBlogCategory(id: string, data: any) {
  await requireAuth()

  try {
    const validated = categorySchema.parse({ ...data, type: 'BLOG' })

    // Check if slug is taken by another category
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug: validated.slug,
        NOT: { id },
      },
    })

    if (existingCategory) {
      return {
        success: false,
        error: 'A category with this slug already exists',
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: validated,
    })

    revalidatePath('/admin/blog/categories')
    revalidatePath('/blog')

    return { success: true, category }
  } catch (error) {
    console.error('Error updating category:', error)
    return { success: false, error: 'Failed to update category' }
  }
}

/**
 * Delete a blog category (Admin only)
 */
export async function deleteBlogCategory(id: string) {
  await requireAuth()

  try {
    // Check if category has posts
    const postsCount = await prisma.blogPost.count({
      where: { categoryId: id },
    })

    if (postsCount > 0) {
      return {
        success: false,
        error: `Cannot delete category with ${postsCount} post(s). Please reassign or delete the posts first.`,
      }
    }

    await prisma.category.delete({ where: { id } })

    revalidatePath('/admin/blog/categories')
    revalidatePath('/blog')

    return { success: true }
  } catch (error) {
    console.error('Error deleting category:', error)
    return { success: false, error: 'Failed to delete category' }
  }
}

/**
 * Get posts by category (Public)
 */
export async function getPostsByCategory(
  categorySlug: string,
  limit: number = 12,
  page: number = 1
) {
  try {
    const category = await prisma.category.findFirst({
      where: { slug: categorySlug, type: 'BLOG' },
    })

    if (!category) {
      return { success: false, error: 'Category not found' }
    }

    const where = {
      categoryId: category.id,
      status: 'PUBLISHED' as const,
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              username: true,
              fullName: true,
              avatar: true,
            },
          },
        },
        orderBy: { publishedAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.blogPost.count({ where }),
    ])

    return {
      success: true,
      category,
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return { success: false, error: 'Failed to fetch posts' }
  }
}
