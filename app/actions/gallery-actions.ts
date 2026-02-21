'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/session'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { uploadImage, deleteImage, getThumbnailUrl, getOptimizedUrl } from '@/lib/cloudinary'

// Validation Schemas
const albumSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  description: z.string().optional(),
})

const imageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  albumId: z.string().min(1, 'Album is required'),
  sortOrder: z.number().int().min(0).default(0),
})

// ==================== ALBUM ACTIONS ====================

/**
 * Get all albums with image count (Admin only)
 */
export async function getAlbums() {
  await requireAuth()

  try {
    const albums = await prisma.album.findMany({
      include: {
        _count: {
          select: { images: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, albums }
  } catch (error) {
    console.error('Error fetching albums:', error)
    return { success: false, error: 'Failed to fetch albums' }
  }
}

/**
 * Get published albums only (Public)
 */
export async function getPublishedAlbums() {
  try {
    const albums = await prisma.album.findMany({
      where: { isPublished: true },
      include: {
        _count: {
          select: { images: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, albums }
  } catch (error) {
    console.error('Error fetching published albums:', error)
    return { success: false, error: 'Failed to fetch albums' }
  }
}

/**
 * Get single album by slug with images
 */
export async function getAlbumBySlug(slug: string) {
  try {
    const album = await prisma.album.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    })

    if (!album) {
      return { success: false, error: 'Album not found' }
    }

    return { success: true, album }
  } catch (error) {
    console.error('Error fetching album:', error)
    return { success: false, error: 'Failed to fetch album' }
  }
}

/**
 * Create a new album
 */
export async function createAlbum(data: FormData) {
  await requireAuth()

  try {
    const rawData = {
      title: data.get('title') as string,
      slug: data.get('slug') as string,
      description: data.get('description') as string || undefined,
    }

    const validatedData = albumSchema.parse(rawData)

    const album = await prisma.album.create({
      data: validatedData,
    })

    revalidatePath('/admin/gallery')
    return { success: true, album }
  } catch (error) {
    console.error('Error creating album:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      }
    }
    return { success: false, error: 'Failed to create album' }
  }
}

/**
 * Update an album
 */
export async function updateAlbum(albumId: string, data: FormData) {
  await requireAuth()

  try {
    const rawData = {
      title: data.get('title') as string,
      slug: data.get('slug') as string,
      description: data.get('description') as string || undefined,
    }

    const validatedData = albumSchema.parse(rawData)

    const album = await prisma.album.update({
      where: { id: albumId },
      data: validatedData,
    })

    revalidatePath('/admin/gallery')
    revalidatePath(`/gallery/${album.slug}`)
    return { success: true, album }
  } catch (error) {
    console.error('Error updating album:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      }
    }
    return { success: false, error: 'Failed to update album' }
  }
}

/**
 * Delete an album (CASCADE deletes images from DB, Cloudinary cleanup handled separately)
 */
export async function deleteAlbum(albumId: string) {
  await requireAuth()

  try {
    // Get all images to delete from Cloudinary
    const album = await prisma.album.findUnique({
      where: { id: albumId },
      include: { images: true },
    })

    if (!album) {
      return { success: false, error: 'Album not found' }
    }

    // Delete images from Cloudinary
    for (const image of album.images) {
      try {
        await deleteImage(image.cloudinaryId)
      } catch (error) {
        console.error(`Failed to delete image ${image.cloudinaryId} from Cloudinary:`, error)
        // Continue with other images even if one fails
      }
    }

    // Delete album (CASCADE will delete images from DB)
    await prisma.album.delete({
      where: { id: albumId },
    })

    revalidatePath('/admin/gallery')
    revalidatePath('/gallery')
    return { success: true }
  } catch (error) {
    console.error('Error deleting album:', error)
    return { success: false, error: 'Failed to delete album' }
  }
}

/**
 * Toggle album publish status
 */
export async function togglePublish(albumId: string) {
  await requireAuth()

  try {
    const album = await prisma.album.findUnique({
      where: { id: albumId },
    })

    if (!album) {
      return { success: false, error: 'Album not found' }
    }

    const updatedAlbum = await prisma.album.update({
      where: { id: albumId },
      data: { isPublished: !album.isPublished },
    })

    revalidatePath('/admin/gallery')
    revalidatePath('/gallery')
    return { success: true, album: updatedAlbum }
  } catch (error) {
    console.error('Error toggling publish status:', error)
    return { success: false, error: 'Failed to toggle publish status' }
  }
}

// ==================== IMAGE ACTIONS ====================

/**
 * Upload multiple images to an album
 */
export async function uploadImages(albumId: string, formData: FormData) {
  await requireAuth()

  try {
    const files = formData.getAll('images') as File[]

    if (files.length === 0) {
      return { success: false, error: 'No images provided' }
    }

    // Get the current max sort order for this album
    const maxSortOrder = await prisma.image.findFirst({
      where: { albumId },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    })

    let currentSortOrder = maxSortOrder ? maxSortOrder.sortOrder + 1 : 0

    const uploadedImages = []
    const failedUploads = []

    for (const file of files) {
      try {
        // Upload to Cloudinary
        const result = await uploadImage(file, 'gallery')

        // Create database record
        const image = await prisma.image.create({
          data: {
            title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
            cloudinaryId: result.public_id,
            url: result.secure_url,
            thumbnailUrl: getThumbnailUrl(result.public_id),
            width: result.width,
            height: result.height,
            format: result.format,
            size: result.bytes,
            sortOrder: currentSortOrder++,
            albumId,
          },
        })

        uploadedImages.push(image)
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error)
        failedUploads.push(file.name)
      }
    }

    revalidatePath('/admin/gallery')
    revalidatePath(`/admin/gallery/${albumId}`)

    if (failedUploads.length > 0) {
      return {
        success: true,
        images: uploadedImages,
        warning: `Failed to upload: ${failedUploads.join(', ')}`,
      }
    }

    return { success: true, images: uploadedImages }
  } catch (error) {
    console.error('Error uploading images:', error)
    return { success: false, error: 'Failed to upload images' }
  }
}

/**
 * Update image metadata
 */
export async function updateImage(imageId: string, data: FormData) {
  await requireAuth()

  try {
    const rawData = {
      title: data.get('title') as string,
      description: data.get('description') as string || undefined,
      albumId: data.get('albumId') as string,
      sortOrder: parseInt(data.get('sortOrder') as string) || 0,
    }

    const validatedData = imageSchema.parse(rawData)

    const image = await prisma.image.update({
      where: { id: imageId },
      data: validatedData,
    })

    revalidatePath('/admin/gallery')
    return { success: true, image }
  } catch (error) {
    console.error('Error updating image:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      }
    }
    return { success: false, error: 'Failed to update image' }
  }
}

/**
 * Delete a single image
 */
export async function deleteImageAction(imageId: string) {
  await requireAuth()

  try {
    const image = await prisma.image.findUnique({
      where: { id: imageId },
      include: { album: true },
    })

    if (!image) {
      return { success: false, error: 'Image not found' }
    }

    // Delete from Cloudinary
    try {
      await deleteImage(image.cloudinaryId)
    } catch (error) {
      console.error('Failed to delete from Cloudinary:', error)
      // Continue with DB deletion even if Cloudinary fails
    }

    // Delete from database
    await prisma.image.delete({
      where: { id: imageId },
    })

    // If this was the album cover, clear it
    if (image.album.coverImage === image.url) {
      await prisma.album.update({
        where: { id: image.albumId },
        data: { coverImage: null },
      })
    }

    revalidatePath('/admin/gallery')
    revalidatePath(`/admin/gallery/${image.albumId}`)
    return { success: true }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { success: false, error: 'Failed to delete image' }
  }
}

/**
 * Bulk delete images
 */
export async function bulkDeleteImages(imageIds: string[]) {
  await requireAuth()

  try {
    // Get all images with their cloudinary IDs
    const images = await prisma.image.findMany({
      where: { id: { in: imageIds } },
    })

    // Delete from Cloudinary
    for (const image of images) {
      try {
        await deleteImage(image.cloudinaryId)
      } catch (error) {
        console.error(`Failed to delete image ${image.cloudinaryId} from Cloudinary:`, error)
        // Continue with other images
      }
    }

    // Delete from database
    await prisma.image.deleteMany({
      where: { id: { in: imageIds } },
    })

    revalidatePath('/admin/gallery')
    return { success: true }
  } catch (error) {
    console.error('Error bulk deleting images:', error)
    return { success: false, error: 'Failed to delete images' }
  }
}

/**
 * Set album cover image
 */
export async function setAlbumCover(albumId: string, imageId: string) {
  await requireAuth()

  try {
    const image = await prisma.image.findUnique({
      where: { id: imageId },
    })

    if (!image || image.albumId !== albumId) {
      return { success: false, error: 'Image not found or does not belong to this album' }
    }

    const album = await prisma.album.update({
      where: { id: albumId },
      data: { coverImage: image.url },
    })

    revalidatePath('/admin/gallery')
    revalidatePath('/gallery')
    return { success: true, album }
  } catch (error) {
    console.error('Error setting album cover:', error)
    return { success: false, error: 'Failed to set album cover' }
  }
}

/**
 * Reorder images in an album
 */
export async function reorderImages(
  albumId: string,
  imageOrders: Array<{ id: string; sortOrder: number }>
) {
  await requireAuth()

  try {
    // Update sort order for each image
    for (const { id, sortOrder } of imageOrders) {
      await prisma.image.update({
        where: { id, albumId }, // Ensure image belongs to album
        data: { sortOrder },
      })
    }

    revalidatePath('/admin/gallery')
    revalidatePath(`/admin/gallery/${albumId}`)
    return { success: true }
  } catch (error) {
    console.error('Error reordering images:', error)
    return { success: false, error: 'Failed to reorder images' }
  }
}
