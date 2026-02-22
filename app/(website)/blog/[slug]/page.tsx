import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getPostBySlug, getRelatedPosts, incrementViewCount } from '@/app/actions/blog/post-actions'
import { generateBlogMetadata } from '@/lib/seo/metadata'
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/structured-data'
import { BlogPostCard } from '@/components/blog/blog-post-card'
import { BlogSidebar } from '@/components/blog/blog-sidebar'
import { SocialShare } from '@/components/blog/social-share'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const result = await getPostBySlug(slug)

  if (!result.success || !result.post) {
    return {
      title: 'Post Not Found',
    }
  }

  return generateBlogMetadata(result.post)
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const result = await getPostBySlug(slug)

  if (!result.success || !result.post) {
    notFound()
  }

  const post = result.post

  // Increment view count (non-blocking)
  incrementViewCount(post.id)

  // Get related posts
  const relatedPostsResult = await getRelatedPosts(post.id, 3)
  const relatedPosts = relatedPostsResult.success && relatedPostsResult.posts ? relatedPostsResult.posts : []

  // Generate structured data
  const blogPostingSchema = generateBlogPostingSchema(post)
  const breadcrumbSchema = generateBreadcrumbSchema(post)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <article className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div>
            {/* Back Button */}
            <Link href="/blog" className="mb-6 inline-block">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {/* Header */}
            <header className="mb-8">
              {/* Category */}
              {post.category && (
                <Link href={`/blog/category/${post.category.slug}`}>
                  <Badge variant="secondary" className="mb-4">
                    {post.category.name}
                  </Badge>
                </Link>
              )}

              {/* Title */}
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mb-6 text-xl text-muted-foreground">{post.excerpt}</p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {/* Author */}
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author.fullName || post.author.username}</span>
                  </div>
                )}

                {/* Published Date */}
                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishedAt.toISOString()}>
                      {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                    </time>
                  </div>
                )}

                {/* Reading Time */}
                {post.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImageUrl && (
              <div className="mb-8 overflow-hidden rounded-lg">
                <img
                  src={post.featuredImageUrl}
                  alt={post.featuredImageAlt || post.title}
                  className="h-auto w-full max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Buttons */}
            <div className="my-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Enjoyed this article?</p>
              <SocialShare
                title={post.title}
                url={`/blog/${post.slug}`}
                description={post.excerpt || undefined}
              />
            </div>

            <Separator className="my-8" />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author && post.author.bio && (
              <div className="mb-8 rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">About the Author</h3>
                <div className="flex items-start gap-4">
                  {post.author.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.fullName || post.author.username}
                      className="h-16 w-16 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">
                      {post.author.fullName || post.author.username}
                    </p>
                    <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="mb-6 text-2xl font-bold">Related Posts</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <BlogPostCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar />
        </div>
      </article>
    </>
  )
}
