import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FloatingNav } from '@/components/navigation/FloatingNav'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { formatPrice, cn } from '@/lib/utils'
import { ArrowLeft, Palette } from 'lucide-react'

export const revalidate = 60

interface ArtworkDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
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

  const availabilityColors = {
    'Available': 'bg-green-100 text-green-800',
    'Sold': 'bg-red-100 text-red-800',
    'Commission': 'bg-amber-100 text-amber-800',
  }

  return (
    <main className="min-h-screen" data-testid="artwork-detail-page">
      {/* Back link */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          href="/gallery"
          className="flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors glass px-4 py-2 rounded-full"
          data-testid="back-to-gallery"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Gallery</span>
        </Link>
      </div>

      {/* Content */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-2/3 lg:sticky lg:top-0 lg:h-screen bg-background-soft">
          <div className="relative h-[60vh] lg:h-full">
            <Image
              src={artwork.image_url}
              alt={artwork.title}
              fill
              className="object-contain p-8 lg:p-16"
              priority
              data-testid="artwork-image"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/3 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md">
            <span
              className={cn(
                'inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full mb-6',
                availabilityColors[artwork.availability as keyof typeof availabilityColors]
              )}
              data-testid="artwork-availability"
            >
              {artwork.availability}
            </span>

            <h1 className="heading-serif text-4xl md:text-5xl mb-4" data-testid="artwork-title">
              {artwork.title}
            </h1>

            <p className="text-2xl text-foreground-secondary mb-8" data-testid="artwork-price">
              {formatPrice(artwork.price)}
            </p>

            <div className="prose prose-lg mb-12">
              <p className="text-foreground-secondary leading-relaxed" data-testid="artwork-description">
                {artwork.description}
              </p>
            </div>

            <div className="mb-8 pb-8 border-b border-foreground-muted/20">
              <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">Category</p>
              <p className="text-foreground" data-testid="artwork-category">{artwork.category}</p>
            </div>

            <Link href="/commission">
              <Button size="lg" className="w-full" data-testid="request-similar-btn">
                <Palette size={18} className="mr-2" />
                Request Similar Artwork
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingNav />
    </main>
  )
}
