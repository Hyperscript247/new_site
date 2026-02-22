import Link from 'next/link'
import { format } from 'date-fns'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { BlogPost, Category, Admin } from '@prisma/client'

type BlogPostCardProps = {
  post: BlogPost & {
    category?: Category | null
    author?: Pick<Admin, 'id' | 'username' | 'fullName' | 'avatar'> | null
  }
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {/* Featured Image */}
      {post.featuredImageUrl && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Link href={`/blog/${post.slug}`}>
            <img
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt || post.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </Link>
          {post.isFeatured && (
            <div className="absolute left-4 top-4">
              <Badge className="bg-yellow-500 hover:bg-yellow-600">
                Featured
              </Badge>
            </div>
          )}
        </div>
      )}

      <CardHeader>
        {/* Category Badge */}
        {post.category && (
          <Link href={`/blog/category/${post.category.slug}`}>
            <Badge variant="secondary" className="mb-2 w-fit">
              {post.category.name}
            </Badge>
          </Link>
        )}

        {/* Title */}
        <Link
          href={`/blog/${post.slug}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
        </Link>
      </CardHeader>

      <CardContent>
        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="text-xs">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              </Link>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
            <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
          </div>
        )}

        {/* Reading Time */}
        {post.readingTime && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
