"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { uploadImages } from "@/app/actions/gallery-actions"
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ImageUploaderProps {
  albumId: string
}

interface PreviewFile {
  file: File
  preview: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export default function ImageUploader({ albumId }: ImageUploaderProps) {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `${file.name}: Invalid file type. Only images are allowed.`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: File too large. Maximum size is 10MB.`
    }
    return null
  }

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const errors: string[] = []
    const validFiles: PreviewFile[] = []

    Array.from(files).forEach((file) => {
      const error = validateFile(file)
      if (error) {
        errors.push(error)
      } else {
        validFiles.push({
          file,
          preview: URL.createObjectURL(file),
        })
      }
    })

    if (errors.length > 0) {
      setError(errors.join('\n'))
    } else {
      setError("")
    }

    setPreviewFiles((prev) => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setPreviewFiles((prev) => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const handleUpload = async () => {
    if (previewFiles.length === 0) {
      setError("Please select at least one image")
      return
    }

    setIsUploading(true)
    setError("")
    setSuccess("")
    setUploadProgress({ current: 0, total: previewFiles.length })

    try {
      let successCount = 0
      const failedUploads: string[] = []

      // Upload images one at a time to avoid body size limit issues
      for (let i = 0; i < previewFiles.length; i++) {
        const { file, preview } = previewFiles[i]

        setUploadProgress({ current: i + 1, total: previewFiles.length })

        try {
          const formData = new FormData()
          formData.append('images', file)

          const result = await uploadImages(albumId, formData)

          if (result.success) {
            successCount++
            URL.revokeObjectURL(preview)
          } else {
            failedUploads.push(file.name)
          }
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error)
          failedUploads.push(file.name)
        }
      }

      // Clear all previews
      setPreviewFiles([])

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      // Refresh the page to show new images
      router.refresh()

      // Show results
      if (successCount > 0) {
        setSuccess(`Successfully uploaded ${successCount} image(s)`)
      }

      if (failedUploads.length > 0) {
        setError(`Failed to upload: ${failedUploads.join(', ')}`)
      }

      if (successCount > 0) {
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(""), 5000)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError("An unexpected error occurred during upload")
    } finally {
      setIsUploading(false)
      setUploadProgress({ current: 0, total: 0 })
    }
  }

  return (
    <div className="space-y-4">
      {/* Drag and Drop Zone */}
      <Card>
        <CardContent className="pt-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
              transition-colors duration-200
              ${isDragging
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
              }
            `}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              {isDragging ? 'Drop images here' : 'Upload Images'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop images here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPEG, PNG, WebP, GIF · Maximum size: 10MB per image
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="whitespace-pre-line">{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Display */}
      {success && (
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <AlertDescription className="text-green-700 dark:text-green-300">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {/* Preview Grid */}
      {previewFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Selected Images ({previewFiles.length})
            </h3>
            <Button
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading {uploadProgress.current}/{uploadProgress.total}...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {previewFiles.length} Image{previewFiles.length !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewFiles.map((previewFile, index) => (
              <Card key={index} className="relative group">
                <CardContent className="p-2">
                  <div className="aspect-square relative rounded overflow-hidden">
                    <Image
                      src={previewFile.preview}
                      alt={previewFile.file.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-2">
                    {previewFile.file.name}
                  </p>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                    disabled={isUploading}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {previewFiles.length === 0 && !error && !success && (
        <div className="text-center py-8 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No images selected</p>
        </div>
      )}
    </div>
  )
}
