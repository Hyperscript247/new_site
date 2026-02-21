import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload an image to Cloudinary
 * @param file - The file to upload
 * @param folder - The folder to upload to (default: 'gallery')
 * @returns Cloudinary upload response
 */
export async function uploadImage(
  file: File,
  folder: string = 'gallery'
): Promise<UploadApiResponse> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `hyperscript/${folder}`,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else if (result) {
            resolve(result)
          } else {
            reject(new Error('Upload failed: No result returned'))
          }
        }
      )
      .end(buffer)
  })
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The Cloudinary public_id of the image
 * @returns Deletion result
 */
export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw error
  }
}

/**
 * Get an optimized image URL from Cloudinary
 * @param publicId - The Cloudinary public_id
 * @param width - Optional width (default: 1200)
 * @returns Optimized image URL
 */
export function getOptimizedUrl(publicId: string, width?: number): string {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    width: width || 1200,
  })
}

/**
 * Get a thumbnail URL from Cloudinary
 * @param publicId - The Cloudinary public_id
 * @returns Thumbnail image URL (400x300)
 */
export function getThumbnailUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    width: 400,
    height: 300,
    crop: 'fill',
  })
}

/**
 * Get multiple image sizes for responsive images
 * @param publicId - The Cloudinary public_id
 * @returns Object with different image sizes
 */
export function getResponsiveUrls(publicId: string) {
  return {
    thumbnail: getThumbnailUrl(publicId),
    small: getOptimizedUrl(publicId, 600),
    medium: getOptimizedUrl(publicId, 1200),
    large: getOptimizedUrl(publicId, 1920),
    original: cloudinary.url(publicId),
  }
}
