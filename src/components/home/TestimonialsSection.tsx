'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    text: "Hilton's work transformed our living space into a gallery. The depth of emotion in each brushstroke is truly remarkable.",
    author: "Sarah Mitchell",
    role: "Art Collector",
  },
  {
    id: 2,
    text: "Commissioning a piece was an incredible experience. Hilton understood my vision perfectly and exceeded all expectations.",
    author: "James Chen",
    role: "Private Commission",
  },
  {
    id: 3,
    text: "The attention to detail and the emotional resonance of Hilton's art is unmatched. A true master of contemporary expression.",
    author: "Elena Rodriguez",
    role: "Gallery Director",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-32 px-8" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-foreground-secondary mb-4">
            Testimonials
          </p>
          <h2 className="heading-serif text-4xl md:text-5xl">
            What Collectors Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-background-off p-8 rounded-sm"
              data-testid={`testimonial-${testimonial.id}`}
            >
              <Quote size={24} className="text-foreground-muted mb-6" />
              <p className="text-foreground-secondary leading-relaxed mb-8">
                {testimonial.text}
              </p>
              <div>
                <p className="font-medium text-foreground">{testimonial.author}</p>
                <p className="text-sm text-foreground-muted">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
