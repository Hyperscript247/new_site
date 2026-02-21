"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  updateImage,
  deleteImageAction,
  bulkDeleteImages,
  setAlbumCover,
} from "@/app/actions/gallery-actions"
import { Loader2, Trash2, Edit, Star, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ImageUploader from "./image-uploader"

type Image = {
  id: string
  title: string
  description: string | null
  url: string
  thumbnailUrl: string
  width: number
  height: number
  format: string
  size: number
  sortOrder: number
  albumId: string
  createdAt: Date
}

type Album = {
  id: string
  title: string
  coverImage: string | null
  images: Image[]
}

export default function AlbumImagesManager({ album }: { album: Album }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [editingImage, setEditingImage] = useState<Image | null>(null)
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set())
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'single' | 'bulk', id?: string } | null>(null)
  const editFormRef = useRef<HTMLFormElement>(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingImage) return

    setIsLoading(true)
    setError("")

    const formData = new FormData(editFormRef.current!)
    const result = await updateImage(editingImage.id, formData)

    if (result.success) {
      setEditingImage(null)
      setSuccess("Image updated successfully")
      setTimeout(() => setSuccess(""), 3000)
      router.refresh()
    } else {
      setError(result.error || "Failed to update image")
    }
    setIsLoading(false)
  }

  const handleDelete = async (imageId: string) => {
    setDeleteTarget({ type: 'single', id: imageId })
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    setIsLoading(true)
    setDeleteConfirmOpen(false)

    if (deleteTarget.type === 'single' && deleteTarget.id) {
      const result = await deleteImageAction(deleteTarget.id)
      if (result.success) {
        setSuccess("Image deleted successfully")
        setTimeout(() => setSuccess(""), 3000)
        router.refresh()
      } else {
        setError(result.error || "Failed to delete image")
        setTimeout(() => setError(""), 3000)
      }
    } else if (deleteTarget.type === 'bulk') {
      const result = await bulkDeleteImages(Array.from(selectedImages))
      if (result.success) {
        setSuccess(`${selectedImages.size} image(s) deleted successfully`)
        setSelectedImages(new Set())
        setTimeout(() => setSuccess(""), 3000)
        router.refresh()
      } else {
        setError(result.error || "Failed to delete images")
        setTimeout(() => setError(""), 3000)
      }
    }

    setIsLoading(false)
    setDeleteTarget(null)
  }

  const handleBulkDelete = async () => {
    if (selectedImages.size === 0) return
    setDeleteTarget({ type: 'bulk' })
    setDeleteConfirmOpen(true)
  }

  const handleSetCover = async (imageId: string) => {
    setIsLoading(true)
    const result = await setAlbumCover(album.id, imageId)
    if (result.success) {
      setSuccess("Album cover updated successfully")
      setTimeout(() => setSuccess(""), 3000)
      router.refresh()
    } else {
      setError(result.error || "Failed to set album cover")
      setTimeout(() => setError(""), 3000)
    }
    setIsLoading(false)
  }

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(imageId)) {
        newSet.delete(imageId)
      } else {
        newSet.add(imageId)
      }
      return newSet
    })
  }

  const toggleSelectAll = () => {
    if (selectedImages.size === album.images.length) {
      setSelectedImages(new Set())
    } else {
      setSelectedImages(new Set(album.images.map((img) => img.id)))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      {/* Image Uploader */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upload New Images</h2>
        <ImageUploader albumId={album.id} />
      </div>

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

      {/* Existing Images */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Album Images ({album.images.length})
          </h2>
          {selectedImages.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete {selectedImages.size} Selected
            </Button>
          )}
        </div>

        {album.images.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <Checkbox
              id="select-all"
              checked={selectedImages.size === album.images.length}
              onCheckedChange={toggleSelectAll}
            />
            <Label htmlFor="select-all" className="cursor-pointer">
              Select All
            </Label>
          </div>
        )}

        {album.images.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No images in this album yet. Upload some above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {album.images.map((image) => {
              const isCover = album.coverImage === image.url
              const isSelected = selectedImages.has(image.id)

              return (
                <Card key={image.id} className={`relative group ${isSelected ? 'ring-2 ring-primary' : ''}`}>
                  <CardContent className="p-3">
                    <div className="absolute top-5 left-5 z-10">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleImageSelection(image.id)}
                        className="bg-white"
                      />
                    </div>

                    {isCover && (
                      <div className="absolute top-5 right-5 z-10">
                        <Badge className="bg-yellow-500">
                          <Star className="w-3 h-3 mr-1" />
                          Cover
                        </Badge>
                      </div>
                    )}

                    <div className="aspect-square relative rounded overflow-hidden mb-3">
                      <Image
                        src={image.thumbnailUrl}
                        alt={image.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium text-sm truncate">{image.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {image.width} x {image.height} · {image.format.toUpperCase()} · {formatFileSize(image.size)}
                      </p>
                      {image.description && (
                        <p className="text-xs text-muted-foreground truncate">
                          {image.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        {!isCover && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetCover(image.id)}
                            disabled={isLoading}
                            className="flex-1"
                          >
                            <Star className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingImage(image)}
                          disabled={isLoading}
                          className="flex-1"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(image.id)}
                          disabled={isLoading}
                          className="flex-1"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingImage} onOpenChange={(open) => !open && setEditingImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Update image information
            </DialogDescription>
          </DialogHeader>
          <form ref={editFormRef} onSubmit={handleUpdate}>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 mb-4">
                {error}
              </div>
            )}
            <div className="space-y-4 py-4">
              <div className="aspect-video relative rounded overflow-hidden">
                {editingImage && (
                  <Image
                    src={editingImage.url}
                    alt={editingImage.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  name="title"
                  defaultValue={editingImage?.title}
                  placeholder="Image title"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={editingImage?.description || ''}
                  placeholder="Image description"
                  rows={3}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-sortOrder">Sort Order</Label>
                <Input
                  id="edit-sortOrder"
                  name="sortOrder"
                  type="number"
                  defaultValue={editingImage?.sortOrder || 0}
                  min="0"
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first
                </p>
              </div>
              <input type="hidden" name="albumId" value={album.id} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingImage(null)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Image"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              {deleteTarget?.type === 'single'
                ? "Are you sure you want to delete this image? This action cannot be undone."
                : `Are you sure you want to delete ${selectedImages.size} image(s)? This action cannot be undone.`
              }
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
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
