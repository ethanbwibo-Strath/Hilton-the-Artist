import { FloatingNav } from '@/components/navigation/FloatingNav'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedBanner } from '@/components/home/FeaturedBanner'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { AboutSection } from '@/components/home/AboutSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()
  
  // Fetch all artworks for different sections
  const { data: artworks } = await supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  // Featured artworks for the banner (Available ones prioritized)
  const { data: featuredArtworks } = await supabase
    .from('artworks')
    .select('*')
    .eq('availability', 'Available')
    .order('created_at', { ascending: false })
    .limit(4)

  return (
    <main className="min-h-screen" data-testid="home-page">
      <HeroSection />
      <FeaturedBanner artworks={featuredArtworks || []} />
      <FeaturedWorks artworks={artworks || []} />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
      <FloatingNav />
    </main>
  )
}
