import { Metadata } from 'next'
import { BlogPost, Category } from '@prisma/client'

type BlogPostWithRelations = BlogPost & {
  author?: {
    id: string
    username: string
    fullName: string | null
    avatar?: string | null
    bio?: string | null
  } | null
  category?: Category | null
}

/**
 * Generate Next.js metadata for a blog post
 * @param post - Blog post with author and category relations
 * @returns Next.js Metadata object
 */
export function generateBlogMetadata(post: BlogPostWithRelations): Metadata {
  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt || ''
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperscript.com'
  const url = `${baseUrl}/blog/${post.slug}`
  const ogImage =
    post.ogImage ||
    post.featuredImageUrl ||
    `${baseUrl}/images/og-default.png`

  return {
    title,
    description,
    keywords: post.keywords,
    authors: post.author
      ? [{ name: post.author.fullName || post.author.username }]
      : [],
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: post.author
        ? [post.author.fullName || post.author.username]
        : [],
      images: [
        {
          url: ogImage,
          alt: post.featuredImageAlt || post.title,
        },
      ],
      siteName: 'HyperScript',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

/**
 * Generate metadata for blog listing page
 * @returns Next.js Metadata object
 */
export function generateBlogListingMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperscript.com'
  const url = `${baseUrl}/blog`

  return {
    title: 'Blog | HyperScript',
    description:
      'Explore our latest articles, tutorials, and insights on technology, programming, and web development.',
    openGraph: {
      title: 'Blog | HyperScript',
      description:
        'Explore our latest articles, tutorials, and insights on technology, programming, and web development.',
      url,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/og-blog.png`,
          alt: 'HyperScript Blog',
        },
      ],
      siteName: 'HyperScript',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | HyperScript',
      description:
        'Explore our latest articles, tutorials, and insights on technology, programming, and web development.',
      images: [`${baseUrl}/images/og-blog.png`],
    },
    alternates: {
      canonical: url,
    },
  }
}

/**
 * Generate metadata for blog category page
 * @param category - Category object
 * @returns Next.js Metadata object
 */
export function generateCategoryMetadata(category: Category): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperscript.com'
  const url = `${baseUrl}/blog/category/${category.slug}`

  return {
    title: `${category.name} | Blog | HyperScript`,
    description:
      category.description ||
      `Browse all articles in the ${category.name} category.`,
    openGraph: {
      title: `${category.name} | Blog | HyperScript`,
      description:
        category.description ||
        `Browse all articles in the ${category.name} category.`,
      url,
      type: 'website',
      siteName: 'HyperScript',
    },
    twitter: {
      card: 'summary',
      title: `${category.name} | Blog | HyperScript`,
      description:
        category.description ||
        `Browse all articles in the ${category.name} category.`,
    },
    alternates: {
      canonical: url,
    },
  }
}
