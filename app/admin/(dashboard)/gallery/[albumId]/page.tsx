import { getAlbumBySlug, getAlbums } from '@/app/actions/gallery-actions'
import { notFound } from 'next/navigation'
import AlbumImagesManager from '@/components/admin/album-images-manager'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{
    albumId: string
  }>
}

export default async function AlbumImagesPage({ params }: PageProps) {
  const { albumId } = await params

  // First get all albums to find the one with matching ID
  const albumsResult = await getAlbums()

  if (!albumsResult.success || !albumsResult.albums) {
    notFound()
  }

  const album = albumsResult.albums.find(a => a.id === albumId)

  if (!album) {
    notFound()
  }

  // Now get the full album details with images
  const albumResult = await getAlbumBySlug(album.slug)

  if (!albumResult.success || !albumResult.album) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery">
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{albumResult.album.title}</h1>
          <p className="text-muted-foreground">
            {albumResult.album.description || 'Manage images in this album'}
          </p>
        </div>
      </div>

      <AlbumImagesManager album={albumResult.album} />
    </div>
  )
}
