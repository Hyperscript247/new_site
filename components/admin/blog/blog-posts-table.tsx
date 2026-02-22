'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  deletePost,
  publishPost,
  unpublishPost,
} from '@/app/actions/blog/post-actions'
import {
  Loader2,
  Trash2,
  Edit,
  Plus,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { toast } from 'sonner'

type BlogPost = {
  id: string
  title: string
  slug: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  publishedAt: Date | null
  viewCount: number
  readingTime: number | null
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
  category: {
    id: string
    name: string
  } | null
  author: {
    id: string
    username: string
    fullName: string | null
  } | null
}

export default function BlogPostsTable({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const handlePublish = async (postId: string) => {
    setIsLoading(true)
    const result = await publishPost(postId)

    if (result.success) {
      toast.success('Post published successfully')
      router.refresh()
    } else {
      toast.error(result.error || 'Failed to publish post')
    }
    setIsLoading(false)
  }

  const handleUnpublish = async (postId: string) => {
    setIsLoading(true)
    const result = await unpublishPost(postId)

    if (result.success) {
      toast.success('Post unpublished successfully')
      router.refresh()
    } else {
      toast.error(result.error || 'Failed to unpublish post')
    }
    setIsLoading(false)
  }

  const handleDelete = (postId: string) => {
    setDeleteTarget(postId)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    setIsLoading(true)
    const result = await deletePost(deleteTarget)

    if (result.success) {
      toast.success('Post deleted successfully')
      setDeleteConfirmOpen(false)
      setDeleteTarget(null)
      router.refresh()
    } else {
      toast.error(result.error || 'Failed to delete post')
    }
    setIsLoading(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <Badge className="bg-green-500">Published</Badge>
      case 'DRAFT':
        return <Badge variant="secondary">Draft</Badge>
      case 'ARCHIVED':
        return <Badge variant="outline">Archived</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Link href="/admin/blog/posts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No posts found. Create your first post!
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{post.title}</span>
                      <span className="text-sm text-muted-foreground">
                        /{post.slug}
                      </span>
                      {post.isFeatured && (
                        <Badge variant="outline" className="mt-1 w-fit">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>
                    {post.category ? (
                      <Badge variant="secondary">{post.category.name}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Uncategorized
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {post.author?.fullName || post.author?.username || 'Unknown'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{post.viewCount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {post.publishedAt
                        ? format(new Date(post.publishedAt), 'MMM d, yyyy')
                        : '-'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {post.status === 'PUBLISHED' && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/blog/posts/${post.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      {post.status === 'PUBLISHED' ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUnpublish(post.id)}
                          disabled={isLoading}
                        >
                          <EyeOff className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePublish(post.id)}
                          disabled={isLoading}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
