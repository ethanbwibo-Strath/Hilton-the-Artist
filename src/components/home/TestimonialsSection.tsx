'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    text: "We wanted something special to commemorate my daughter’s graduation. Hilton didn’t just draw her likeness; they captured the pride of the moment. It’s now the centerpiece of our living room.",
    author: "Samueli Matandiko",
    role: "Academic Portrait Commission",
  },
  {
    id: 2,
    text: "I commissioned a portrait as a gift, and the level of detail was breathtaking. From the texture of the clothing to the light in the eyes, it looked more 'alive' than the original photograph. Truly a master of the craft.",
    author: "Anonymous",
    role: "Verified Client",
  },
  {
    id: 3,
    text: "There is a warmth in Hilton’s work that you don't find often. He has a gift for capturing the bond between people. The portrait of my children is something our family will treasure forever.",
    author: "Gloria Muli",
    role: "Family Portrait Client",
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
