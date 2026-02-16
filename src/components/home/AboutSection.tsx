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
              src="/hilton.jpg"
              alt="Hilton Owuor Portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
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
              Hilton Owuor
            </h2>
            <div className="space-y-6 text-foreground-secondary leading-relaxed">
              <p>
                Driven by a fascination with the stories written on the human face, 
                Hilton Owuor specializes in hyper-realistic portraiture that bridges the gap between a photograph and a feeling.
              </p>
              <p>
                With a masterly command over charcoal, graphite, and colored pencil, 
                he transforms simple surfaces into deep explorations of texture 
                from the intricate patterns of a braid to the reflective sheen of a leather jacket. 
              </p>
              <p className="accent-italic text-lg text-foreground">
                "Art is more than a likeness; it is an act of documenting the joy, pride, and quiet strength of the people who define our world."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
