import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ArtworkForm } from '@/components/admin/ArtworkForm'

interface EditArtworkPageProps {
  params: Promise<{ id: string }>
}

export default async function EditArtworkPage({ params }: EditArtworkPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: artwork } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', id)
    .single()

  if (!artwork) {
    notFound()
  }

  return (
    <div data-testid="edit-artwork-page">
      <div className="mb-8">
        <h1 className="heading-serif text-3xl mb-2">Edit Artwork</h1>
        <p className="text-foreground-secondary">Update artwork details</p>
      </div>

      <div className="max-w-2xl">
        <ArtworkForm artwork={artwork} />
      </div>
    </div>
  )
}
