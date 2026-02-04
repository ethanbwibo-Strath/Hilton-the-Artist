export interface Artwork {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  price: number
  availability: 'Available' | 'Sold' | 'Commission Only'
  created_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  artwork_type: string
  size: string
  reference_image: string | null
  special_instructions: string | null
  estimated_price: number | null
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
  estimated_completion: string | null
  created_at: string
}

export type ArtworkFormData = Omit<Artwork, 'id' | 'created_at'>
export type OrderFormData = Omit<Order, 'id' | 'created_at' | 'status' | 'estimated_completion'>
