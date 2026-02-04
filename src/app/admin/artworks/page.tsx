import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArtworksList } from '@/components/admin/ArtworksList'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'

export const revalidate = 0

export default async function AdminArtworksPage() {
  const supabase = await createClient()

  const { data: artworks } = await supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div data-testid="admin-artworks-page">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-serif text-3xl mb-2">Artworks</h1>
          <p className="text-foreground-secondary">Manage your artwork collection</p>
        </div>
        <Link href="/admin/artworks/new">
          <Button data-testid="add-artwork-btn">
            <Plus size={18} className="mr-2" />
            Add Artwork
          </Button>
        </Link>
      </div>

      <ArtworksList artworks={artworks || []} />
    </div>
  )
}
