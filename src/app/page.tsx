import Link from 'next/link'
import Image from 'next/image'
import { FloatingNav } from '@/components/navigation/FloatingNav'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { AboutSection } from '@/components/home/AboutSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: artworks } = await supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <main className="min-h-screen" data-testid="home-page">
      <HeroSection />
      <FeaturedWorks artworks={artworks || []} />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
      <FloatingNav />
    </main>
  )
}
