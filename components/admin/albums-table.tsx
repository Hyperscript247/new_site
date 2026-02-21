"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  togglePublish
} from "@/app/actions/gallery-actions"
import { Loader2, Trash2, Edit, Plus, Images, Eye, EyeOff, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import Link from "next/link"

type Album = {
  id: string
  title: string
  slug: string
  description: string | null
  coverImage: string | null
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  _count: {
    images: number
  }
}

export default function AlbumsTable({ albums }: { albums: Album[] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ albumId: string, imagesCount: number } | null>(null)
  const createFormRef = useRef<HTMLFormElement>(null)
  const editFormRef = useRef<HTMLFormElement>(null)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(createFormRef.current!)
    const result = await createAlbum(formData)

    if (result.success) {
      setIsCreateOpen(false)
      createFormRef.current?.reset()
      router.refresh()
    } else {
      setError(result.error || "Failed to create album")
    }
    setIsLoading(false)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingAlbum) return

    setIsLoading(true)
    setError("")

    const formData = new FormData(editFormRef.current!)
    const result = await updateAlbum(editingAlbum.id, formData)

    if (result.success) {
      setEditingAlbum(null)
      editFormRef.current?.reset()
      router.refresh()
    } else {
      setError(result.error || "Failed to update album")
    }
    setIsLoading(false)
  }

  const handleDelete = (albumId: string, imagesCount: number) => {
    setDeleteTarget({ albumId, imagesCount })
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    setIsLoading(true)
    setDeleteConfirmOpen(false)

    const result = await deleteAlbum(deleteTarget.albumId)
    if (result.success) {
      setSuccess("Album deleted successfully")
      setTimeout(() => setSuccess(""), 3000)
      router.refresh()
    } else {
      setError(result.error || "Failed to delete album")
      setTimeout(() => setError(""), 3000)
    }

    setIsLoading(false)
    setDeleteTarget(null)
  }

  const handleTogglePublish = async (albumId: string) => {
    setIsLoading(true)
    const result = await togglePublish(albumId)
    if (result.success) {
      router.refresh()
    } else {
      setError(result.error || "Failed to toggle publish status")
      setTimeout(() => setError(""), 3000)
    }
    setIsLoading(false)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  return (
    <div className="space-y-4">
      {/* Messages */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <AlertDescription className="text-green-700 dark:text-green-300">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {/* Create Button */}
      <div className="flex justify-end">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Album
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Album</DialogTitle>
              <DialogDescription>
                Add a new photo album
              </DialogDescription>
            </DialogHeader>
            <form ref={createFormRef} onSubmit={handleCreate}>
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="create-title">Title</Label>
                  <Input
                    id="create-title"
                    name="title"
                    placeholder="e.g., Summer Events 2024"
                    required
                    disabled={isLoading}
                    onChange={(e) => {
                      const slugInput = document.getElementById('create-slug') as HTMLInputElement
                      if (slugInput) {
                        slugInput.value = generateSlug(e.target.value)
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-slug">Slug</Label>
                  <Input
                    id="create-slug"
                    name="slug"
                    placeholder="e.g., summer-events-2024"
                    required
                    disabled={isLoading}
                    pattern="[a-z0-9-]+"
                    title="Lowercase letters, numbers, and hyphens only"
                  />
                  <p className="text-xs text-muted-foreground">
                    Auto-generated from title. Used in URL.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-description">Description (Optional)</Label>
                  <Textarea
                    id="create-description"
                    name="description"
                    placeholder="Brief description of this album"
                    rows={3}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Album"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingAlbum} onOpenChange={(open) => !open && setEditingAlbum(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Album</DialogTitle>
            <DialogDescription>
              Update album information
            </DialogDescription>
          </DialogHeader>
          <form ref={editFormRef} onSubmit={handleUpdate}>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  name="title"
                  defaultValue={editingAlbum?.title}
                  placeholder="Album title"
                  required
                  disabled={isLoading}
                  onChange={(e) => {
                    const slugInput = document.getElementById('edit-slug') as HTMLInputElement
                    if (slugInput) {
                      slugInput.value = generateSlug(e.target.value)
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  name="slug"
                  defaultValue={editingAlbum?.slug}
                  placeholder="album-slug"
                  required
                  disabled={isLoading}
                  pattern="[a-z0-9-]+"
                  title="Lowercase letters, numbers, and hyphens only"
                />
                <p className="text-xs text-muted-foreground">
                  Auto-generated from title. Used in URL.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={editingAlbum?.description || ''}
                  placeholder="Brief description of this album"
                  rows={3}
                  disabled={isLoading}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingAlbum(null)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Album"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Albums Table */}
      {albums.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No albums yet. Create your first album!</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Cover
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Images
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {albums.map((album) => (
                    <tr key={album.id} className="hover:bg-muted/30">
                      <td className="px-6 py-4">
                        {album.coverImage ? (
                          <div className="w-16 h-16 relative rounded overflow-hidden">
                            <Image
                              src={album.coverImage}
                              alt={album.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                            <Images className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{album.title}</div>
                          {album.description && (
                            <div className="text-sm text-muted-foreground truncate max-w-md">
                              {album.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {album.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {album._count.images}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublish(album.id)}
                          disabled={isLoading}
                        >
                          {album.isPublished ? (
                            <Badge className="bg-green-500">
                              <Eye className="w-3 h-3 mr-1" />
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <EyeOff className="w-3 h-3 mr-1" />
                              Draft
                            </Badge>
                          )}
                        </Button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {format(new Date(album.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/gallery/${album.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <Images className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingAlbum(album)}
                            disabled={isLoading}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(album.id, album._count.images)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 text-red-600" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Confirm Album Deletion
            </DialogTitle>
            <DialogDescription>
              {deleteTarget && deleteTarget.imagesCount > 0 ? (
                <>
                  <p className="font-semibold text-red-600 mb-2">
                    Warning: This album contains {deleteTarget.imagesCount} image(s).
                  </p>
                  <p>
                    All images in this album will be permanently deleted from the database and Cloudinary.
                    This action cannot be undone. Are you sure you want to continue?
                  </p>
                </>
              ) : (
                "Are you sure you want to delete this album? This action cannot be undone."
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteConfirmOpen(false)
                setDeleteTarget(null)
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Album
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
