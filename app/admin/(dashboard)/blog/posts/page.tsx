import { getPosts } from '@/app/actions/blog/post-actions'
import BlogPostsTable from '@/components/admin/blog/blog-posts-table'
import { redirect } from 'next/navigation'

export default async function BlogPostsPage() {
  const result = await getPosts()

  if (!result.success || !result.posts) {
    redirect('/admin')
  }

  return (
    <div className="container mx-auto py-8">
      <BlogPostsTable posts={result.posts} />
    </div>
  )
}
