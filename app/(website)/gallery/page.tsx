import { getPublishedAlbums } from '@/app/actions/gallery-actions'
import GalleryGrid from '@/components/gallery/gallery-grid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery | Hyperscript',
  description: 'Browse our photo gallery showcasing our work, events, and community',
}

export default async function GalleryPage() {
  const result = await getPublishedAlbums()

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of projects, events, and memorable moments from the Hyperscript community
          </p>
        </div>

        {result.success && result.albums && result.albums.length > 0 ? (
          <GalleryGrid albums={result.albums} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No albums available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
