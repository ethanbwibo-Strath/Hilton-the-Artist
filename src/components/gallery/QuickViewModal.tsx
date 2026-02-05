'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice, cn } from '@/lib/utils'
import type { Artwork } from '@/types'

interface QuickViewModalProps {
  artwork: Artwork | null
  isOpen: boolean
  onClose: () => void
}

const availabilityColors = {
  'Available': 'bg-green-100 text-green-800',
  'Sold': 'bg-red-100 text-red-800',
  'Commission Only': 'bg-amber-100 text-amber-800',
}

export function QuickViewModal({ artwork, isOpen, onClose }: QuickViewModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!artwork) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={onClose}
            data-testid="quick-view-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:w-full md:max-h-[85vh] bg-background rounded-sm shadow-2xl z-50 overflow-hidden"
            data-testid="quick-view-modal"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              aria-label="Close quick view"
              data-testid="quick-view-close"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[85vh] overflow-auto md:overflow-hidden">
              {/* Image */}
              <div className="relative aspect-square md:aspect-auto md:h-full bg-background-soft">
                <Image
                  src={artwork.image_url}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col">
                <span
                  className={cn(
                    'self-start px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full mb-4',
                    availabilityColors[artwork.availability as keyof typeof availabilityColors]
                  )}
                  data-testid="quick-view-availability"
                >
                  {artwork.availability}
                </span>

                <h2 
                  className="heading-serif text-3xl md:text-4xl mb-2"
                  data-testid="quick-view-title"
                >
                  {artwork.title}
                </h2>

                <p className="text-sm text-foreground-muted uppercase tracking-wider mb-4">
                  {artwork.category}
                </p>

                <p 
                  className="text-2xl mb-6"
                  data-testid="quick-view-price"
                >
                  {formatPrice(artwork.price)}
                </p>

                <p className="text-foreground-secondary leading-relaxed mb-8 flex-grow">
                  {artwork.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/gallery/${artwork.id}`} className="flex-1">
                    <Button className="w-full" data-testid="quick-view-details-btn">
                      View Full Details
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </Link>
                  <Link href="/commission" className="flex-1">
                    <Button variant="secondary" className="w-full" data-testid="quick-view-commission-btn">
                      Request Similar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
