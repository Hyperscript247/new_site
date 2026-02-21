import { getAlbumBySlug } from '@/app/actions/gallery-actions'
import { notFound } from 'next/navigation'
import ImageMasonry from '@/components/gallery/image-masonry'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getAlbumBySlug(slug)

  if (!result.success || !result.album) {
    return { title: 'Album Not Found' }
  }

  return {
    title: `${result.album.title} | Gallery | Hyperscript`,
    description: result.album.description || `View ${result.album.title} photo album`,
  }
}

export default async function AlbumPage({ params }: PageProps) {
  const { slug } = await params
  const result = await getAlbumBySlug(slug)

  if (!result.success || !result.album || !result.album.isPublished) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <Link href="/gallery">
            <Button variant="ghost" className="mb-4">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-2">{result.album.title}</h1>
          {result.album.description && (
            <p className="text-xl text-muted-foreground">{result.album.description}</p>
          )}
          <p className="text-sm text-muted-foreground mt-4">
            {result.album.images.length} {result.album.images.length === 1 ? 'image' : 'images'}
          </p>
        </div>

        {result.album.images.length > 0 ? (
          <ImageMasonry images={result.album.images} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">This album is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  )
}
