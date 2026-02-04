'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section className="py-32 bg-background-off" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] rounded-sm overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1608146145692-0583f7d6bfdb?w=800&q=80"
              alt="Artist in studio"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:py-8"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-foreground-secondary mb-6">
              About the Artist
            </p>
            <h2 className="heading-serif text-4xl md:text-5xl mb-8">
              Hilton
            </h2>
            <div className="space-y-6 text-foreground-secondary leading-relaxed">
              <p>
                With over two decades of artistic exploration, I've dedicated my life to 
                capturing the intangible—emotions, moments, and the spaces between thoughts.
              </p>
              <p>
                My work draws from the rich traditions of abstract expressionism while 
                incorporating contemporary techniques and perspectives. Each piece is a 
                dialogue between intention and spontaneity.
              </p>
              <p className="accent-italic text-lg text-foreground">
                "Art is not what you see, but what you make others see."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
