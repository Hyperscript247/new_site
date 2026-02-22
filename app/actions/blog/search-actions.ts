'use server'

import { prisma } from '@/lib/prisma'
import { searchSchema } from '@/lib/validation/blog-schemas'

/**
 * Search blog posts using full-text search
 * @param searchParams - Search parameters (query, categoryId, tags, limit, page)
 * @returns Search results with pagination
 */
export async function searchPosts(searchParams: any) {
  try {
    const validated = searchSchema.parse(searchParams)
    const { query, categoryId, tags, limit, page } = validated

    const where: any = {
      status: 'PUBLISHED',
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          excerpt: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    }

    // Add category filter if provided
    if (categoryId) {
      where.categoryId = categoryId
    }

    // Add tags filter if provided
    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags }
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
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error('Search error:', error)
    return { success: false, error: 'Search failed' }
  }
}

/**
 * Get search suggestions based on partial query
 * @param query - Partial search query
 * @param limit - Maximum number of suggestions (default: 5)
 * @returns Array of post titles matching the query
 */
export async function getSearchSuggestions(query: string, limit: number = 5) {
  try {
    if (!query || query.length < 2) {
      return { success: true, suggestions: [] }
    }

    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
      orderBy: { viewCount: 'desc' },
      take: limit,
    })

    return { success: true, suggestions: posts }
  } catch (error) {
    console.error('Error fetching search suggestions:', error)
    return { success: false, error: 'Failed to fetch suggestions' }
  }
}

/**
 * Get posts by tag
 * @param tag - Tag to filter by
 * @param limit - Maximum number of posts (default: 12)
 * @param page - Page number (default: 1)
 * @returns Posts with the specified tag
 */
export async function getPostsByTag(tag: string, limit: number = 12, page: number = 1) {
  try {
    const where = {
      status: 'PUBLISHED' as const,
      tags: { has: tag },
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
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error('Error fetching posts by tag:', error)
    return { success: false, error: 'Failed to fetch posts' }
  }
}
