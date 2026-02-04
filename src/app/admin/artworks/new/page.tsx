import { ArtworkForm } from '@/components/admin/ArtworkForm'

export default function NewArtworkPage() {
  return (
    <div data-testid="new-artwork-page">
      <div className="mb-8">
        <h1 className="heading-serif text-3xl mb-2">Add Artwork</h1>
        <p className="text-foreground-secondary">Add a new piece to your collection</p>
      </div>

      <div className="max-w-2xl">
        <ArtworkForm />
      </div>
    </div>
  )
}
