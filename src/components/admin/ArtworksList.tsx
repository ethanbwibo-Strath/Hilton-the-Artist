'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDate, cn } from '@/lib/utils'
import { Edit, Trash2 } from 'lucide-react'
import type { Artwork } from '@/types'

interface ArtworksListProps {
  artworks: Artwork[]
}

const availabilityColors = {
  'Available': 'bg-green-100 text-green-800',
  'Sold': 'bg-red-100 text-red-800',
  'Commission Only': 'bg-amber-100 text-amber-800',
}

export function ArtworksList({ artworks }: ArtworksListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return

    setDeletingId(id)
    const supabase = createClient()
    const { error } = await supabase.from('artworks').delete().eq('id', id)

    if (error) {
      toast.error('Failed to delete artwork')
    } else {
      toast.success('Artwork deleted')
      router.refresh()
    }
    setDeletingId(null)
  }

  if (artworks.length === 0) {
    return (
      <div className="bg-background p-12 rounded-sm text-center" data-testid="no-artworks">
        <p className="text-foreground-secondary mb-4">No artworks yet</p>
        <Link href="/admin/artworks/new">
          <Button variant="secondary" size="sm">Add your first artwork</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-background rounded-sm overflow-hidden shadow-sm" data-testid="artworks-list">
      <table className="w-full">
        <thead>
          <tr className="border-b border-foreground-muted/10">
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Artwork</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Category</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Price</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Availability</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Date</th>
            <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-foreground-muted">Actions</th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((artwork) => (
            <tr
              key={artwork.id}
              className="border-b border-foreground-muted/10 hover:bg-background-off transition-colors"
              data-testid={`artwork-row-${artwork.id}`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-sm overflow-hidden bg-background-soft">
                    <Image
                      src={artwork.image_url}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{artwork.title}</p>
                    <p className="text-sm text-foreground-muted truncate max-w-xs">
                      {artwork.description?.substring(0, 50)}...
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{artwork.category}</td>
              <td className="px-6 py-4 text-sm">{formatPrice(artwork.price)}</td>
              <td className="px-6 py-4">
                <span
                  className={cn(
                    'px-3 py-1 text-xs font-medium rounded-full',
                    availabilityColors[artwork.availability as keyof typeof availabilityColors]
                  )}
                >
                  {artwork.availability}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-foreground-secondary">
                {formatDate(artwork.created_at)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/admin/artworks/${artwork.id}/edit`}>
                    <Button variant="ghost" size="sm" data-testid={`edit-artwork-${artwork.id}`}>
                      <Edit size={16} />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(artwork.id)}
                    disabled={deletingId === artwork.id}
                    data-testid={`delete-artwork-${artwork.id}`}
                  >
                    <Trash2 size={16} className="text-accent-highlight" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
