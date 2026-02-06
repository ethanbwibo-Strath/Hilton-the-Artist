'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import type { Artwork } from '@/types'

interface ArtworkCardProps {
  artwork: Artwork
  index?: number
  onQuickView?: (artwork: Artwork) => void
}

export function ArtworkCard({ artwork, index = 0, onQuickView }: ArtworkCardProps) {
  const availabilityColors = {
    'Available': 'bg-green-100 text-green-800',
    'Sold': 'bg-red-100 text-red-800',
    'Commission Only': 'bg-amber-100 text-amber-800',
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(artwork)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        href={`/gallery/${artwork.id}`}
        data-testid={`artwork-card-${artwork.id}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-sm bg-background-soft">
          <div className="aspect-[4/5] relative">
            <Image
              src={artwork.image_url}
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          
          {/* Availability Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={cn(
                'px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full',
                availabilityColors[artwork.availability]
              )}
              data-testid={`availability-badge-${artwork.id}`}
            >
              {artwork.availability}
            </span>
          </div>

          {/* Quick View Button */}
          {onQuickView && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleQuickView}
                className="px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full flex items-center gap-2 text-sm font-medium hover:bg-background transition-colors shadow-lg"
                data-testid={`quick-view-btn-${artwork.id}`}
              >
                <Eye size={16} />
                Quick View
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="heading-serif text-lg group-hover:text-accent-highlight transition-colors">
            {artwork.title}
          </h3>
          <p className="text-foreground-secondary text-sm">
            {formatPrice(artwork.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
