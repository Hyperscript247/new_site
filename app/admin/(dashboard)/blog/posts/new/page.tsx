'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPostForm } from '@/components/admin/blog/blog-post-form'
import { createPost } from '@/app/actions/blog/post-actions'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const result = await createPost(data)

    if (result.success) {
      toast.success('Post created successfully! Redirecting...')
      // Add a small delay so user can see the success message
      setTimeout(() => {
        router.push('/admin/blog/posts')
        router.refresh()
      }, 800)
    } else {
      toast.error(result.error || 'Failed to create post')
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/blog/posts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create New Post</h1>
      </div>

      <div className="mx-auto max-w-4xl">
        <BlogPostForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}
