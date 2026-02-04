import { Suspense } from 'react'
import { FloatingNav } from '@/components/navigation/FloatingNav'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { GalleryFilters } from '@/components/gallery/GalleryFilters'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

interface GalleryPageProps {
  searchParams: Promise<{
    category?: string
    availability?: string
  }>
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })

  if (params.category && params.category !== 'all') {
    query = query.eq('category', params.category)
  }

  if (params.availability && params.availability !== 'all') {
    query = query.eq('availability', params.availability)
  }

  const { data: artworks } = await query

  // Get unique categories for filter
  const { data: allArtworks } = await supabase
    .from('artworks')
    .select('category')

  const categories = [...new Set(allArtworks?.map(a => a.category) || [])]

  return (
    <main className="min-h-screen" data-testid="gallery-page">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 bg-background-off">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground-secondary mb-4">
            Collection
          </p>
          <h1 className="heading-serif text-5xl md:text-6xl mb-6">
            Gallery
          </h1>
          <p className="text-foreground-secondary max-w-xl">
            Explore the complete collection of original artworks. Each piece is 
            created with passion and tells its own unique story.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-8 border-b border-foreground-muted/10">
        <div className="max-w-7xl mx-auto">
          <GalleryFilters 
            categories={categories} 
            currentCategory={params.category} 
            currentAvailability={params.availability} 
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <GalleryGrid artworks={artworks || []} />
        </div>
      </section>

      <Footer />
      <FloatingNav />
    </main>
  )
}
