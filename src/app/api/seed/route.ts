import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Sample artworks data
const sampleArtworks = [
  {
    id: 'a1b2c3d4-1111-2222-3333-444444444444',
    title: 'Ethereal Whispers',
    description: 'An abstract exploration of consciousness and the ephemeral nature of thought. Bold strokes of color dance across the canvas, inviting viewers into a meditative state where boundaries dissolve and imagination takes flight.',
    image_url: 'https://images.unsplash.com/photo-1535904524899-14f70ec805bb?w=800&q=80',
    category: 'Abstract',
    price: 2500,
    availability: 'Available',
  },
  {
    id: 'a1b2c3d4-2222-3333-4444-555555555555',
    title: 'Silent Harmony',
    description: 'A study in balance and tranquility. This piece captures the delicate interplay between form and emptiness, drawing inspiration from minimalist philosophy and the beauty found in restraint.',
    image_url: 'https://images.unsplash.com/photo-1705399165614-37a91c72ed15?w=800&q=80',
    category: 'Abstract',
    price: 1800,
    availability: 'Available',
  },
  {
    id: 'a1b2c3d4-3333-4444-5555-666666666666',
    title: 'Urban Dreams',
    description: 'Inspired by the rhythm and energy of city life, this mixed media piece combines traditional painting techniques with contemporary elements to create a dynamic visual experience.',
    image_url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80',
    category: 'Mixed Media',
    price: 3200,
    availability: 'Sold',
  },
  {
    id: 'a1b2c3d4-4444-5555-6666-777777777777',
    title: 'Morning Light',
    description: 'A serene landscape capturing the golden hour in the countryside. Soft, warm tones evoke feelings of peace and new beginnings, making this piece perfect for contemplative spaces.',
    image_url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
    category: 'Landscape',
    price: 2100,
    availability: 'Available',
  },
  {
    id: 'a1b2c3d4-5555-6666-7777-888888888888',
    title: 'Introspection',
    description: 'A deeply personal portrait study exploring the complexity of human emotion. Layers of paint create depth and texture, inviting viewers to look beyond the surface.',
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    category: 'Portrait',
    price: 4500,
    availability: 'Commission Only',
  },
  {
    id: 'a1b2c3d4-6666-7777-8888-999999999999',
    title: 'Fragments of Time',
    description: 'An abstract meditation on memory and the passage of time. Geometric shapes intersect with organic forms, creating a visual dialogue between structure and chaos.',
    image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    category: 'Abstract',
    price: 2800,
    availability: 'Available',
  },
]

const sampleOrders = [
  {
    id: 'o1b2c3d4-1111-2222-3333-444444444444',
    customer_name: 'Emily Watson',
    customer_email: 'emily.watson@example.com',
    artwork_type: 'Abstract',
    size: 'Large (24x24" - 48x48")',
    reference_image: null,
    special_instructions: 'Would love blues and greens, inspired by ocean waves. Something calming for my living room.',
    estimated_price: 3000,
    status: 'In Progress',
    estimated_completion: '2026-02-15',
  },
  {
    id: 'o1b2c3d4-2222-3333-4444-555555555555',
    customer_name: 'Michael Chen',
    customer_email: 'michael.chen@example.com',
    artwork_type: 'Portrait',
    size: 'Medium (12x12" - 24x24")',
    reference_image: null,
    special_instructions: 'Family portrait - will send photos separately. Traditional style but with modern color palette.',
    estimated_price: 5000,
    status: 'Pending',
    estimated_completion: null,
  },
  {
    id: 'o1b2c3d4-3333-4444-5555-666666666666',
    customer_name: 'Sarah Johnson',
    customer_email: 'sarah.j@example.com',
    artwork_type: 'Landscape',
    size: 'Extra Large (48x48"+)',
    reference_image: null,
    special_instructions: 'Commission for corporate office lobby. Professional but warm.',
    estimated_price: 8000,
    status: 'Completed',
    estimated_completion: '2025-12-01',
  },
]

export async function POST() {
  const supabase = await createClient()

  // Insert artworks
  const { error: artworksError } = await supabase
    .from('artworks')
    .upsert(sampleArtworks, { onConflict: 'id' })

  if (artworksError) {
    return NextResponse.json(
      { error: 'Failed to seed artworks', details: artworksError.message },
      { status: 500 }
    )
  }

  // Insert orders
  const { error: ordersError } = await supabase
    .from('orders')
    .upsert(sampleOrders, { onConflict: 'id' })

  if (ordersError) {
    return NextResponse.json(
      { error: 'Failed to seed orders', details: ordersError.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, message: 'Database seeded successfully' })
}
