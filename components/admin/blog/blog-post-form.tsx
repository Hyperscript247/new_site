'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, type PostFormData } from '@/lib/validation/blog-schemas'
import { BlogEditor } from './editor/blog-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { X, Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { uploadFeaturedImage } from '@/app/actions/blog/post-actions'
import { getBlogCategories } from '@/app/actions/blog/category-actions'
import type { Category } from '@prisma/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface BlogPostFormProps {
  initialData?: Partial<PostFormData> & { id?: string }
  onSubmit: (data: PostFormData) => Promise<void>
  isLoading?: boolean
}

export function BlogPostForm({
  initialData,
  onSubmit,
  isLoading,
}: BlogPostFormProps) {
  const [content, setContent] = useState(initialData?.content || '')
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || [])
  const [keywordInput, setKeywordInput] = useState('')
  const [featuredImage, setFeaturedImage] = useState<string | null>(
    initialData?.featuredImageUrl || null
  )
  const [featuredImagePublicId, setFeaturedImagePublicId] = useState<string | null>(
    initialData?.featuredImagePublicId || null
  )
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
      categoryId: initialData?.categoryId || undefined,
      status: initialData?.status || 'DRAFT',
      metaTitle: initialData?.metaTitle || '',
      metaDescription: initialData?.metaDescription || '',
      keywords: initialData?.keywords || [],
      tags: initialData?.tags || [],
      featuredImageUrl: initialData?.featuredImageUrl || '',
      featuredImagePublicId: initialData?.featuredImagePublicId || '',
      featuredImageAlt: initialData?.featuredImageAlt || '',
      ogImage: initialData?.ogImage || '',
      isFeatured: initialData?.isFeatured || false,
      allowComments: initialData?.allowComments || false,
    },
  })

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      const result = await getBlogCategories()
      if (result.success && result.categories) {
        setCategories(result.categories)
      }
    }
    loadCategories()
  }, [])

  // Update featured image states when initialData changes
  useEffect(() => {
    if (initialData?.featuredImageUrl) {
      setFeaturedImage(initialData.featuredImageUrl)
      setValue('featuredImageUrl', initialData.featuredImageUrl)
    }
    if (initialData?.featuredImagePublicId) {
      setFeaturedImagePublicId(initialData.featuredImagePublicId)
      setValue('featuredImagePublicId', initialData.featuredImagePublicId)
    }
  }, [initialData?.featuredImageUrl, initialData?.featuredImagePublicId, setValue])

  // Update content in form
  useEffect(() => {
    setValue('content', content)
  }, [content, setValue])

  // Update tags in form
  useEffect(() => {
    setValue('tags', tags)
  }, [tags, setValue])

  // Update keywords in form
  useEffect(() => {
    setValue('keywords', keywords)
  }, [keywords, setValue])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setIsUploadingImage(true)
    try {
      const result = await uploadFeaturedImage(file)
      if (result.success && result.imageUrl && result.publicId) {
        setFeaturedImage(result.imageUrl)
        setFeaturedImagePublicId(result.publicId)
        setValue('featuredImageUrl', result.imageUrl)
        setValue('featuredImagePublicId', result.publicId)
        toast.success('Featured image uploaded')
      } else {
        toast.error(result.error || 'Failed to upload image')
      }
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput('')
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove))
  }

  const handleFormSubmit = async (data: PostFormData) => {
    // Convert empty strings to null for optional URL fields
    const cleanedData = {
      ...data,
      featuredImageUrl: data.featuredImageUrl || null,
      featuredImagePublicId: data.featuredImagePublicId || null,
      featuredImageAlt: data.featuredImageAlt || null,
      ogImage: data.ogImage || null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      excerpt: data.excerpt || null,
      categoryId: data.categoryId || null,
    }
    await onSubmit(cleanedData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter post title"
              className="mt-1"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              {...register('excerpt')}
              placeholder="Short summary of the post (optional)"
              rows={3}
              className="mt-1"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
            )}
          </div>

          {/* Editor */}
          <div>
            <Label>Content *</Label>
            <div className="mt-1">
              <BlogEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your blog post..."
              />
            </div>
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          {/* Featured Image */}
          <div>
            <Label>Featured Image</Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Recommended: 1200x630px (16:9 aspect ratio) for optimal display. Max 5MB.
            </p>
            <div className="mt-2">
              {featuredImage ? (
                <div className="relative inline-block">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="h-48 w-auto rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => {
                      setFeaturedImage(null)
                      setFeaturedImagePublicId(null)
                      setValue('featuredImageUrl', '')
                      setValue('featuredImagePublicId', '')
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    id="featured-image"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('featured-image')?.click()}
                    disabled={isUploadingImage}
                  >
                    {isUploadingImage ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    Upload Image
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image Alt Text */}
          {featuredImage && (
            <div>
              <Label htmlFor="featuredImageAlt">Image Alt Text</Label>
              <Input
                id="featuredImageAlt"
                {...register('featuredImageAlt')}
                placeholder="Describe the image for accessibility"
                className="mt-1"
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          {/* Meta Title */}
          <div>
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              {...register('metaTitle')}
              placeholder="SEO title (default: post title)"
              className="mt-1"
              maxLength={60}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {watch('metaTitle')?.length || 0}/60 characters
            </p>
          </div>

          {/* Meta Description */}
          <div>
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              {...register('metaDescription')}
              placeholder="SEO description (default: excerpt)"
              rows={3}
              className="mt-1"
              maxLength={160}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {watch('metaDescription')?.length || 0}/160 characters
            </p>
          </div>

          {/* Keywords */}
          <div>
            <Label>SEO Keywords</Label>
            <div className="mt-1 flex gap-2">
              <Input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addKeyword()
                  }
                }}
                placeholder="Add keyword and press Enter"
              />
              <Button type="button" onClick={addKeyword}>
                Add
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary">
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Open Graph Image */}
          <div>
            <Label htmlFor="ogImage">Open Graph Image URL</Label>
            <Input
              id="ogImage"
              {...register('ogImage')}
              placeholder="Custom OG image URL (optional)"
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Leave empty to use featured image
            </p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Category */}
          <div>
            <Label htmlFor="categoryId">Category</Label>
            <Select
              value={watch('categoryId') || undefined}
              onValueChange={(value) => setValue('categoryId', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="mt-1 flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder="Add tag and press Enter"
              />
              <Button type="button" onClick={addTag}>
                Add
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={watch('status')}
              onValueChange={(value: any) => setValue('status', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured Post */}
          <div className="flex items-center justify-between">
            <Label htmlFor="isFeatured">Featured Post</Label>
            <Switch
              id="isFeatured"
              checked={watch('isFeatured')}
              onCheckedChange={(checked) => setValue('isFeatured', checked)}
            />
          </div>

          {/* Allow Comments */}
          <div className="flex items-center justify-between">
            <Label htmlFor="allowComments">Allow Comments</Label>
            <Switch
              id="allowComments"
              checked={watch('allowComments')}
              onCheckedChange={(checked) => setValue('allowComments', checked)}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Submit Button */}
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Post'
          )}
        </Button>
      </div>
    </form>
  )
}
