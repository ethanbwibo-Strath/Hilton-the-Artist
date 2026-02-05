'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { createClient } from '@/lib/supabase/client'
import { Upload, Check } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

const artworkTypes = [
  { value: '', label: 'Select artwork type' },
  { value: 'Abstract', label: 'Abstract' },
  { value: 'Portrait', label: 'Portrait' },
  { value: 'Landscape', label: 'Landscape' },
  { value: 'Still Life', label: 'Still Life' },
  { value: 'Mixed Media', label: 'Mixed Media' },
  { value: 'Other', label: 'Other' },
]

const sizeOptions = [
  { value: '', label: 'Select size' },
  { value: 'Small (up to 12x12")', label: 'Small (up to 12x12")' },
  { value: 'Medium (12x12" - 24x24")', label: 'Medium (12x12" - 24x24")' },
  { value: 'Large (24x24" - 48x48")', label: 'Large (24x24" - 48x48")' },
  { value: 'Extra Large (48x48"+)', label: 'Extra Large (48x48"+)' },
  { value: 'Custom', label: 'Custom Size' },
]

export function CommissionForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [referenceImage, setReferenceImage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    artwork_type: '',
    size: '',
    special_instructions: '',
    estimated_price: '',
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
    const filePath = `references/${fileName}`

    const { error, data } = await supabase.storage
      .from('commissions')
      .upload(filePath, file)

    if (error) {
      toast.error('Failed to upload image')
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('commissions')
      .getPublicUrl(filePath)

    setReferenceImage(urlData.publicUrl)
    setUploading(false)
    toast.success('Image uploaded successfully')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()
    const newOrderId = uuidv4()

    const { error } = await supabase.from('orders').insert({
      id: newOrderId,
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      artwork_type: formData.artwork_type,
      size: formData.size,
      reference_image: referenceImage,
      special_instructions: formData.special_instructions || null,
      estimated_price: formData.estimated_price ? parseFloat(formData.estimated_price) : null,
      status: 'Pending',
    })

    if (error) {
      toast.error('Failed to submit commission request')
      setIsSubmitting(false)
      return
    }

    setOrderId(newOrderId)
    setIsSuccess(true)
    toast.success('Commission request submitted!')
    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
        data-testid="commission-success"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="heading-serif text-3xl mb-4">Request Submitted!</h2>
        <p className="text-foreground-secondary mb-6">
          Thank you for your commission request. We'll be in touch soon.
        </p>
        <div className="bg-background-off p-6 rounded-sm inline-block mb-8">
          <p className="text-sm text-foreground-muted mb-1">Your Order ID</p>
          <p className="font-mono text-lg" data-testid="order-id-display">{orderId}</p>
        </div>
        <div>
          <Button onClick={() => router.push('/track-order')} variant="secondary">
            Track Your Order
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-8"
      data-testid="commission-form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          id="customer_name"
          name="customer_name"
          label="Your Name"
          placeholder="John Doe"
          value={formData.customer_name}
          onChange={handleInputChange}
          required
          data-testid="input-name"
        />
        <Input
          id="customer_email"
          name="customer_email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          value={formData.customer_email}
          onChange={handleInputChange}
          required
          data-testid="input-email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Select
          id="artwork_type"
          name="artwork_type"
          label="Artwork Type"
          options={artworkTypes}
          value={formData.artwork_type}
          onChange={handleInputChange}
          required
          data-testid="select-artwork-type"
        />
        <Select
          id="size"
          name="size"
          label="Size"
          options={sizeOptions}
          value={formData.size}
          onChange={handleInputChange}
          required
          data-testid="select-size"
        />
      </div>

      <Input
        id="estimated_price"
        name="estimated_price"
        type="number"
        label="Your Budget (KES) - Optional"
        placeholder="1000"
        value={formData.estimated_price}
        onChange={handleInputChange}
        data-testid="input-budget"
      />

      {/* File Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground-secondary uppercase tracking-wider">
          Reference Image (Optional)
        </label>
        <div className="border-2 border-dashed border-foreground-muted/30 rounded-sm p-8 text-center hover:border-foreground-muted transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="reference-upload"
            data-testid="input-reference-image"
          />
          <label htmlFor="reference-upload" className="cursor-pointer">
            {uploading ? (
              <p className="text-foreground-secondary">Uploading...</p>
            ) : referenceImage ? (
              <div>
                <Check size={24} className="mx-auto mb-2 text-green-600" />
                <p className="text-foreground-secondary text-sm">Image uploaded</p>
              </div>
            ) : (
              <div>
                <Upload size={24} className="mx-auto mb-2 text-foreground-muted" />
                <p className="text-foreground-secondary text-sm">Click to upload a reference image</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <Textarea
        id="special_instructions"
        name="special_instructions"
        label="Special Instructions"
        placeholder="Describe your vision, preferred colors, style, or any other details..."
        value={formData.special_instructions}
        onChange={handleInputChange}
        data-testid="input-instructions"
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
        data-testid="submit-commission-btn"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Commission Request'}
      </Button>
    </motion.form>
  )
}
