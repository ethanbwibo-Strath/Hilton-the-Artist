import { FloatingNav } from '@/components/navigation/FloatingNav'
import { Footer } from '@/components/layout/Footer'
import { CommissionForm } from '@/components/commission/CommissionForm'

export default function CommissionPage() {
  return (
    <main className="min-h-screen" data-testid="commission-page">
      {/* Header */}
      <section className="pt-32 pb-16 px-8 bg-background-off">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground-secondary mb-4">
            Bespoke Artwork
          </p>
          <h1 className="heading-serif text-5xl md:text-6xl mb-6">
            Commission
          </h1>
          <p className="text-foreground-secondary max-w-xl mx-auto">
            Have a vision in mind? Let's bring it to life together. Fill out the form 
            below to start the conversation about your custom artwork.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-8">
        <div className="max-w-2xl mx-auto">
          <CommissionForm />
        </div>
      </section>

      <Footer />
      <FloatingNav />
    </main>
  )
}
