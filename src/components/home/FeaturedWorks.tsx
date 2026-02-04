'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArtworkCard } from '@/components/gallery/ArtworkCard'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import type { Artwork } from '@/types'

interface FeaturedWorksProps {
  artworks: Artwork[]
}

export function FeaturedWorks({ artworks }: FeaturedWorksProps) {
  return (
    <section className="py-32 px-8" data-testid="featured-works-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-foreground-secondary mb-4">
              Featured
            </p>
            <h2 className="heading-serif text-4xl md:text-5xl">
              Selected Works
            </h2>
          </div>
          <Link href="/gallery">
            <Button variant="ghost" data-testid="view-all-btn">
              View All
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {artworks.map((artwork, index) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-foreground-secondary text-lg">
              No artworks available yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
