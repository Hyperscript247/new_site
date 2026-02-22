'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/session'
import { revalidatePath } from 'next/cache'
import { postSchema, postFilterSchema } from '@/lib/validation/blog-schemas'
import { generateSlug } from '@/lib/content/slug'
import { calculateReadingTime } from '@/lib/content/reading-time'
import { extractExcerpt } from '@/lib/content/excerpt'
import { sanitizeHtml } from '@/lib/content/sanitize'
import { uploadImage, deleteImage } from '@/lib/cloudinary'

/**
 * Get all posts with filters and pagination (Admin only)
 */
export async function getPosts(filters?: any) {
  await requireAuth()

  try {
    const validated = filters ? postFilterSchema.parse(filters) : postFilterSchema.parse({})
    const { status, categoryId, authorId, isFeatured, tags, limit, page, sortBy, sortOrder } = validated

    const where: any = {}
    if (status) where.status = status
    if (categoryId) where.categoryId = categoryId
    if (authorId) where.authorId = authorId
    if (isFeatured !== undefined) where.isFeatured = isFeatured
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
        orderBy: { [sortBy]: sortOrder },
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
    console.error('Error fetching posts:', error)
    return { success: false, error: 'Failed to fetch posts' }
  }
}

/**
 * Get published posts (Public)
 */
export async function getPublishedPosts(filters?: any) {
  try {
    const validated = filters ? postFilterSchema.parse(filters) : postFilterSchema.parse({})
    const { categoryId, isFeatured, tags, limit, page, sortBy, sortOrder } = validated

    const where: any = { status: 'PUBLISHED' }
    if (categoryId) where.categoryId = categoryId
    if (isFeatured !== undefined) where.isFeatured = isFeatured
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
        orderBy: { [sortBy]: sortOrder },
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
    console.error('Error fetching published posts:', error)
    return { success: false, error: 'Failed to fetch posts' }
  }
}

/**
 * Get a single post by slug (Public)
 */
export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, status: 'PUBLISHED' },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatar: true,
            bio: true,
          },
        },
      },
    })

    if (!post) {
      return { success: false, error: 'Post not found' }
    }

    return { success: true, post }
  } catch (error) {
    console.error('Error fetching post:', error)
    return { success: false, error: 'Failed to fetch post' }
  }
}

/**
 * Get a single post by ID (Admin only)
 */
export async function getPostById(id: string) {
  await requireAuth()

  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
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
    })

    if (!post) {
      return { success: false, error: 'Post not found' }
    }

    return { success: true, post }
  } catch (error) {
    console.error('Error fetching post:', error)
    return { success: false, error: 'Failed to fetch post' }
  }
}

/**
 * Create a new blog post
 */
export async function createPost(data: any) {
  const session = await requireAuth()

  try {
    const validated = postSchema.parse(data)

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(validated.content)

    // Generate slug from title
    const slug = generateSlug(validated.title)

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({ where: { slug } })
    if (existingPost) {
      return { success: false, error: 'A post with this title already exists' }
    }

    // Calculate reading time
    const readingTime = calculateReadingTime(sanitizedContent)

    // Auto-generate excerpt if not provided
    const excerpt = validated.excerpt || extractExcerpt(sanitizedContent, 160)

    // Create post
    const post = await prisma.blogPost.create({
      data: {
        ...validated,
        content: sanitizedContent,
        slug,
        readingTime,
        excerpt,
        authorId: session.id,
      },
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
    })

    revalidatePath('/admin/blog/posts')
    revalidatePath('/blog')

    return { success: true, post }
  } catch (error) {
    console.error('Error creating post:', error)
    return { success: false, error: 'Failed to create post' }
  }
}

/**
 * Update a blog post
 */
export async function updatePost(id: string, data: any) {
  await requireAuth()

  try {
    const validated = postSchema.parse(data)

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(validated.content)

    // Generate new slug if title changed
    let slug = (await prisma.blogPost.findUnique({ where: { id } }))?.slug
    if (validated.title) {
      const newSlug = generateSlug(validated.title)
      const existingPost = await prisma.blogPost.findFirst({
        where: { slug: newSlug, NOT: { id } },
      })
      if (!existingPost) {
        slug = newSlug
      }
    }

    // Calculate reading time
    const readingTime = calculateReadingTime(sanitizedContent)

    // Auto-generate excerpt if not provided
    const excerpt = validated.excerpt || extractExcerpt(sanitizedContent, 160)

    // Update post
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...validated,
        content: sanitizedContent,
        slug,
        readingTime,
        excerpt,
      },
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
    })

    revalidatePath('/admin/blog/posts')
    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)

    return { success: true, post }
  } catch (error) {
    console.error('Error updating post:', error)
    return { success: false, error: 'Failed to update post' }
  }
}

/**
 * Delete a blog post
 */
export async function deletePost(id: string) {
  await requireAuth()

  try {
    const post = await prisma.blogPost.findUnique({ where: { id } })
    if (!post) {
      return { success: false, error: 'Post not found' }
    }

    // Delete featured image from Cloudinary if exists
    if (post.featuredImagePublicId) {
      try {
        await deleteImage(post.featuredImagePublicId)
      } catch (error) {
        console.error('Error deleting featured image:', error)
      }
    }

    await prisma.blogPost.delete({ where: { id } })

    revalidatePath('/admin/blog/posts')
    revalidatePath('/blog')

    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: 'Failed to delete post' }
  }
}

/**
 * Publish a blog post
 */
export async function publishPost(id: string) {
  await requireAuth()

  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    })

    revalidatePath('/admin/blog/posts')
    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)

    return { success: true, post }
  } catch (error) {
    console.error('Error publishing post:', error)
    return { success: false, error: 'Failed to publish post' }
  }
}

/**
 * Unpublish a blog post
 */
export async function unpublishPost(id: string) {
  await requireAuth()

  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        status: 'DRAFT',
      },
    })

    revalidatePath('/admin/blog/posts')
    revalidatePath('/blog')

    return { success: true, post }
  } catch (error) {
    console.error('Error unpublishing post:', error)
    return { success: false, error: 'Failed to unpublish post' }
  }
}

/**
 * Increment view count for a post
 */
export async function incrementViewCount(id: string) {
  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        viewCount: { increment: 1 },
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return { success: false, error: 'Failed to increment view count' }
  }
}

/**
 * Upload featured image for blog post
 */
export async function uploadFeaturedImage(file: File) {
  await requireAuth()

  try {
    console.log('Uploading image:', { name: file.name, size: file.size, type: file.type })
    const result = await uploadImage(file, 'blog')
    console.log('Upload successful:', { url: result.secure_url, publicId: result.public_id })

    return {
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    console.error('Error uploading featured image:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image'
    return { success: false, error: errorMessage }
  }
}

/**
 * Get related posts (same category, exclude current post)
 */
export async function getRelatedPosts(postId: string, limit: number = 3) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { categoryId: true },
    })

    if (!post || !post.categoryId) {
      return { success: true, posts: [] }
    }

    const posts = await prisma.blogPost.findMany({
      where: {
        categoryId: post.categoryId,
        status: 'PUBLISHED',
        NOT: { id: postId },
      },
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
    })

    return { success: true, posts }
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return { success: false, error: 'Failed to fetch related posts' }
  }
}

/**
 * Get featured posts (Public)
 */
export async function getFeaturedPosts(limit: number = 3) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        isFeatured: true,
      },
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
    })

    return { success: true, posts }
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return { success: false, error: 'Failed to fetch featured posts' }
  }
}

/**
 * Get all unique tags from published posts
 */
export async function getAllTags() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      select: { tags: true },
    })

    const tagsSet = new Set<string>()
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagsSet.add(tag))
    })

    const tags = Array.from(tagsSet).sort()

    return { success: true, tags }
  } catch (error) {
    console.error('Error fetching tags:', error)
    return { success: false, error: 'Failed to fetch tags' }
  }
}
