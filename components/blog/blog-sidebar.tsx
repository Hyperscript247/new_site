import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getBlogCategories } from '@/app/actions/blog/category-actions'
import { getPublishedPosts } from '@/app/actions/blog/post-actions'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'

export async function BlogSidebar() {
  const [categoriesResult, recentPostsResult] = await Promise.all([
    getBlogCategories(),
    getPublishedPosts({ limit: 5, sortBy: 'publishedAt', sortOrder: 'desc' }),
  ])

  const categories = categoriesResult.success && categoriesResult.categories ? categoriesResult.categories : []
  const recentPosts = recentPostsResult.success && recentPostsResult.posts ? recentPostsResult.posts : []

  return (
    <aside className="space-y-6">
      {/* Categories */}
      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link key={category.id} href={`/blog/category/${category.slug}`}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {category.name}
                    {category._count.blogPosts > 0 && (
                      <span className="ml-1 text-xs">
                        ({category._count.blogPosts})
                      </span>
                    )}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  )
}
