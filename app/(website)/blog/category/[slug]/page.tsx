import { notFound } from 'next/navigation'
import {
  getCategoryBySlug,
  getPostsByCategory,
} from '@/app/actions/blog/category-actions'
import { generateCategoryMetadata } from '@/lib/seo/metadata'
import { BlogPostCard } from '@/components/blog/blog-post-card'
import { BlogPagination } from '@/components/blog/blog-pagination'
import { BlogSidebar } from '@/components/blog/blog-sidebar'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const result = await getCategoryBySlug(slug)

  if (!result.success || !result.category) {
    return {
      title: 'Category Not Found',
    }
  }

  return generateCategoryMetadata(result.category)
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')

  const result = await getPostsByCategory(slug, 12, page)

  if (!result.success || !result.category || !result.posts || !result.pagination) {
    notFound()
  }

  const { category, posts, pagination } = result

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">{category.description}</p>
        )}
        <p className="mt-4 text-sm text-muted-foreground">
          {pagination.total} {pagination.total === 1 ? 'post' : 'posts'}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Main Content */}
        <div>
          {posts.length === 0 ? (
            <div className="rounded-lg border p-12 text-center">
              <p className="text-muted-foreground">
                No posts in this category yet. Check back soon!
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
              {pagination.totalPages > 1 && (
                <div className="mt-12">
                  <BlogPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    basePath={`/blog/category/${slug}`}
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
