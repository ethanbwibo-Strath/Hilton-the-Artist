import { FloatingNav } from '@/components/navigation/FloatingNav'
import { Footer } from '@/components/layout/Footer'
import { TrackOrderForm } from '@/components/order/TrackOrderForm'

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen" data-testid="track-order-page">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 bg-background-off">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground-secondary mb-4">
            Order Status
          </p>
          <h1 className="heading-serif text-5xl md:text-6xl mb-6">
            Track Your Order
          </h1>
          <p className="text-foreground-secondary max-w-xl mx-auto">
            Enter your email and order ID to check the status of your commission.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-8">
        <div className="max-w-lg mx-auto">
          <TrackOrderForm />
        </div>
      </section>

      <Footer />
      <FloatingNav />
    </main>
  )
}
