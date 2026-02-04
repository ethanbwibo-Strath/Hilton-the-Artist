'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import type { Artwork } from '@/types'

interface FeaturedBannerProps {
  artworks: Artwork[]
}

export function FeaturedBanner({ artworks }: FeaturedBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || artworks.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % artworks.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, artworks.length])

  if (artworks.length === 0) return null

  const currentArtwork = artworks[currentIndex]

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % artworks.length)
  }

  return (
    <section 
      className="relative bg-foreground text-background overflow-hidden"
      data-testid="featured-banner"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Image Side */}
          <div className="relative h-[300px] lg:h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentArtwork.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentArtwork.image_url}
                  alt={currentArtwork.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-foreground/80 lg:block hidden" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content Side */}
          <div className="relative flex flex-col justify-center p-8 lg:p-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles size={16} className="text-amber-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-background/60">
                Featured Collection
              </span>
            </motion.div>

            {/* Artwork Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentArtwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 
                  className="heading-serif text-4xl lg:text-5xl mb-4"
                  data-testid="featured-title"
                >
                  {currentArtwork.title}
                </h2>
                <p className="text-background/70 leading-relaxed mb-6 line-clamp-3">
                  {currentArtwork.description}
                </p>
                <p className="text-2xl font-light mb-8" data-testid="featured-price">
                  {formatPrice(currentArtwork.price)}
                </p>

                <Link href={`/gallery/${currentArtwork.id}`}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="border-background text-background hover:bg-background hover:text-foreground"
                    data-testid="featured-view-btn"
                  >
                    View Artwork
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {artworks.length > 1 && (
              <div className="flex items-center gap-4 mt-12">
                <button
                  onClick={goToPrevious}
                  className="p-2 border border-background/30 rounded-full hover:bg-background/10 transition-colors"
                  aria-label="Previous artwork"
                  data-testid="featured-prev-btn"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {artworks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false)
                        setCurrentIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-background w-6'
                          : 'bg-background/30 hover:bg-background/50'
                      }`}
                      aria-label={`Go to artwork ${index + 1}`}
                      data-testid={`featured-dot-${index}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="p-2 border border-background/30 rounded-full hover:bg-background/10 transition-colors"
                  aria-label="Next artwork"
                  data-testid="featured-next-btn"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Counter */}
                <span className="text-sm text-background/50 ml-auto">
                  {currentIndex + 1} / {artworks.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
