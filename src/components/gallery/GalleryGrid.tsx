'use client'

import { motion } from 'framer-motion'
import { ArtworkCard } from './ArtworkCard'
import type { Artwork } from '@/types'

interface GalleryGridProps {
  artworks: Artwork[]
}

export function GalleryGrid({ artworks }: GalleryGridProps) {
  if (artworks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
        data-testid="gallery-empty"
      >
        <p className="text-foreground-secondary text-lg mb-2">
          No artworks found
        </p>
        <p className="text-foreground-muted text-sm">
          Try adjusting your filters
        </p>
      </motion.div>
    )
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
      data-testid="gallery-grid"
    >
      {artworks.map((artwork, index) => (
        <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
      ))}
    </div>
  )
}
