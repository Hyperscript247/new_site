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
 * Generate JSON-LD BlogPosting schema for a blog post
 * @param post - Blog post with author and category relations
 * @returns JSON-LD schema object
 */
export function generateBlogPostingSchema(post: BlogPostWithRelations) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperscript.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    image: post.featuredImageUrl || '',
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author?.fullName || post.author?.username || 'HyperScript Team',
      ...(post.author?.bio && { description: post.author.bio }),
      ...(post.author?.avatar && { image: post.author.avatar }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'HyperScript',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    ...(post.category && { articleSection: post.category.name }),
    keywords: post.keywords.join(', '),
    wordCount: post.content.split(/\s+/).length,
    ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` }),
  }
}

/**
 * Generate JSON-LD BreadcrumbList schema for blog post
 * @param post - Blog post with category relation
 * @returns JSON-LD schema object
 */
export function generateBreadcrumbSchema(post: BlogPostWithRelations) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperscript.com'

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${baseUrl}/blog`,
    },
  ]

  if (post.category) {
    itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: post.category.name,
      item: `${baseUrl}/blog/category/${post.category.slug}`,
    })

    itemListElement.push({
      '@type': 'ListItem',
      position: 4,
      name: post.title,
      item: `${baseUrl}/blog/${post.slug}`,
    })
  } else {
    itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: post.title,
      item: `${baseUrl}/blog/${post.slug}`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

/**
 * Generate JSON-LD WebSite schema
 * @returns JSON-LD schema object
 */
export function generateWebSiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperscript.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HyperScript',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate JSON-LD Organization schema
 * @returns JSON-LD schema object
 */
export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyperscript.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HyperScript',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      // Add social media links here
    ],
  }
}
