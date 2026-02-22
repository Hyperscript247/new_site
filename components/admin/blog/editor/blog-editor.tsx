'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { extensions } from './editor-extensions'
import { EditorToolbar } from './editor-toolbar'
import { useState } from 'react'
import { uploadFeaturedImage } from '@/app/actions/blog/post-actions'
import { toast } from 'sonner'

interface BlogEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function BlogEditor({ content, onChange, placeholder }: BlogEditorProps) {
  const [isUploading, setIsUploading] = useState(false)

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  })

  const handleImageUpload = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB')
        return
      }

      setIsUploading(true)
      toast.loading('Uploading image...')

      try {
        const result = await uploadFeaturedImage(file)

        if (result.success && result.imageUrl) {
          editor?.chain().focus().setImage({ src: result.imageUrl }).run()
          toast.success('Image uploaded successfully')
        } else {
          toast.error(result.error || 'Failed to upload image')
        }
      } catch (error) {
        console.error('Upload error:', error)
        toast.error('Failed to upload image')
      } finally {
        setIsUploading(false)
        toast.dismiss()
      }
    }

    input.click()
  }

  return (
    <div className="rounded-lg border bg-background">
      <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
      <EditorContent editor={editor} />
      {isUploading && (
        <div className="flex items-center justify-center border-t p-4">
          <div className="text-sm text-muted-foreground">
            Uploading image...
          </div>
        </div>
      )}
    </div>
  )
}
