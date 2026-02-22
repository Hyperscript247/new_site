import { getPublishedPosts } from '@/app/actions/blog/post-actions'
import { searchPosts, getPostsByTag } from '@/app/actions/blog/search-actions'
import { BlogPostCard } from '@/components/blog/blog-post-card'
import { BlogPagination } from '@/components/blog/blog-pagination'
import { BlogSidebar } from '@/components/blog/blog-sidebar'
import { generateBlogListingMetadata } from '@/lib/seo/metadata'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export const metadata = generateBlogListingMetadata()

interface BlogPageProps {
  searchParams: {
    page?: string
    search?: string
    tag?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1')
  const searchQuery = searchParams.search || ''
  const tagFilter = searchParams.tag || ''

  let result

  if (searchQuery) {
    // Search mode
    result = await searchPosts({
      query: searchQuery,
      limit: 12,
      page,
    })
  } else if (tagFilter) {
    // Tag filter mode
    result = await getPostsByTag(tagFilter, 12, page)
  } else {
    // Regular listing
    result = await getPublishedPosts({
      limit: 12,
      page,
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    })
  }

  const posts = result.success && result.posts ? result.posts : []
  const pagination = result.success && result.pagination ? result.pagination : null

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Explore our latest articles, tutorials, and insights
        </p>
      </div>

      {/* Search Bar */}
      <div className="mx-auto mb-12 max-w-2xl">
        <form action="/blog" method="get" className="flex gap-2">
          <Input
            type="search"
            name="search"
            placeholder="Search posts..."
            defaultValue={searchQuery}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
        {searchQuery && (
          <p className="mt-2 text-sm text-muted-foreground">
            Showing results for &quot;{searchQuery}&quot;
          </p>
        )}
        {tagFilter && (
          <p className="mt-2 text-sm text-muted-foreground">
            Showing posts tagged with &quot;{tagFilter}&quot;
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Main Content */}
        <div>
          {posts.length === 0 ? (
            <div className="rounded-lg border p-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery
                  ? 'No posts found matching your search.'
                  : 'No posts published yet. Check back soon!'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12">
                  <BlogPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    basePath="/blog"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <BlogSidebar />
      </div>
    </div>
  )
}
