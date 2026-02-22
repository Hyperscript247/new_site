'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPostForm } from '@/components/admin/blog/blog-post-form'
import { getPostById, updatePost } from '@/app/actions/blog/post-actions'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const result = await getPostById(id)
      if (result.success && result.post) {
        setPost(result.post)
      } else {
        toast.error('Post not found')
        router.push('/admin/blog/posts')
      }
      setIsFetching(false)
    }
    fetchPost()
  }, [id, router])

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const result = await updatePost(id, data)

    if (result.success) {
      toast.success('Post updated successfully! Redirecting...')
      // Add a small delay so user can see the success message
      setTimeout(() => {
        router.push('/admin/blog/posts')
        router.refresh()
      }, 800)
    } else {
      toast.error(result.error || 'Failed to update post')
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/blog/posts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Edit Post</h1>
      </div>

      <div className="mx-auto max-w-4xl">
        <BlogPostForm
          initialData={{
            ...post,
            categoryId: post.categoryId || undefined,
            featuredImageUrl: post.featuredImageUrl || undefined,
            featuredImagePublicId: post.featuredImagePublicId || undefined,
            featuredImageAlt: post.featuredImageAlt || undefined,
          }}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
