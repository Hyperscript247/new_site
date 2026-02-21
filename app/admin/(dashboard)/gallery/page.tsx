import { getAlbums } from '@/app/actions/gallery-actions'
import AlbumsTable from '@/components/admin/albums-table'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const result = await getAlbums()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <p className="text-muted-foreground">Create and manage photo albums</p>
      </div>
      <AlbumsTable albums={result.albums || []} />
    </div>
  )
}
