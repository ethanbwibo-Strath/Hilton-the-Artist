'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { createClient } from '@/lib/supabase/client'
import { Upload, X } from 'lucide-react'
import type { Artwork } from '@/types'

interface ArtworkFormProps {
  artwork?: Artwork
}

const categoryOptions = [
  { value: '', label: 'Select category' },
  { value: 'Abstract', label: 'Abstract' },
  { value: 'Portrait', label: 'Portrait' },
  { value: 'Landscape', label: 'Landscape' },
  { value: 'Still Life', label: 'Still Life' },
  { value: 'Mixed Media', label: 'Mixed Media' },
]

const availabilityOptions = [
  { value: 'Available', label: 'Available' },
  { value: 'Sold', label: 'Sold' },
  { value: 'Commission Only', label: 'Commission Only' },
]

export function ArtworkForm({ artwork }: ArtworkFormProps) {
  const router = useRouter()
  const isEditing = !!artwork

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(artwork?.image_url || '')

  const [formData, setFormData] = useState({
    title: artwork?.title || '',
    description: artwork?.description || '',
    category: artwork?.category || '',
    price: artwork?.price?.toString() || '',
    availability: artwork?.availability || 'Available',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const supabase = createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `artworks/${fileName}`

    const { error } = await supabase.storage
      .from('artworks')
      .upload(filePath, file)

    if (error) {
      toast.error('Failed to upload image')
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('artworks')
      .getPublicUrl(filePath)

    setImageUrl(urlData.publicUrl)
    setUploading(false)
    toast.success('Image uploaded')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!imageUrl) {
      toast.error('Please upload an image')
      return
    }

    setIsSubmitting(true)
    const supabase = createClient()

    const artworkData = {
      title: formData.title,
      description: formData.description,
      image_url: imageUrl,
      category: formData.category,
      price: parseFloat(formData.price),
      availability: formData.availability,
    }

    if (isEditing) {
      const { error } = await supabase
        .from('artworks')
        .update(artworkData)
        .eq('id', artwork.id)

      if (error) {
        toast.error('Failed to update artwork')
        setIsSubmitting(false)
        return
      }

      toast.success('Artwork updated')
    } else {
      const { error } = await supabase
        .from('artworks')
        .insert({ id: uuidv4(), ...artworkData })

      if (error) {
        toast.error('Failed to create artwork')
        setIsSubmitting(false)
        return
      }

      toast.success('Artwork created')
    }

    router.push('/admin/artworks')
    router.refresh()
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-background p-8 rounded-sm shadow-sm space-y-8"
      data-testid="artwork-form"
    >
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground-secondary uppercase tracking-wider">
          Artwork Image
        </label>
        {imageUrl ? (
          <div className="relative aspect-video rounded-sm overflow-hidden bg-background-soft">
            <Image
              src={imageUrl}
              alt="Artwork preview"
              fill
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setImageUrl('')}
              className="absolute top-2 right-2 p-2 bg-foreground text-background rounded-full hover:bg-foreground/80 transition-colors"
              data-testid="remove-image-btn"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-foreground-muted/30 rounded-sm p-12 text-center hover:border-foreground-muted transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="artwork-upload"
              data-testid="artwork-image-input"
            />
            <label htmlFor="artwork-upload" className="cursor-pointer">
              {uploading ? (
                <p className="text-foreground-secondary">Uploading...</p>
              ) : (
                <div>
                  <Upload size={32} className="mx-auto mb-4 text-foreground-muted" />
                  <p className="text-foreground-secondary">Click to upload artwork image</p>
                  <p className="text-sm text-foreground-muted mt-1">PNG, JPG up to 10MB</p>
                </div>
              )}
            </label>
          </div>
        )}
      </div>

      <Input
        id="title"
        name="title"
        label="Title"
        placeholder="Enter artwork title"
        value={formData.title}
        onChange={handleInputChange}
        required
        data-testid="artwork-title-input"
      />

      <Textarea
        id="description"
        name="description"
        label="Description"
        placeholder="Describe the artwork..."
        value={formData.description}
        onChange={handleInputChange}
        required
        data-testid="artwork-description-input"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Select
          id="category"
          name="category"
          label="Category"
          options={categoryOptions}
          value={formData.category}
          onChange={handleInputChange}
          required
          data-testid="artwork-category-select"
        />
        <Select
          id="availability"
          name="availability"
          label="Availability"
          options={availabilityOptions}
          value={formData.availability}
          onChange={handleInputChange}
          required
          data-testid="artwork-availability-select"
        />
      </div>

      <Input
        id="price"
        name="price"
        type="number"
        label="Price (USD)"
        placeholder="1000"
        value={formData.price}
        onChange={handleInputChange}
        required
        data-testid="artwork-price-input"
      />

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          data-testid="artwork-submit-btn"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Artwork' : 'Create Artwork'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          data-testid="artwork-cancel-btn"
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  )
}
