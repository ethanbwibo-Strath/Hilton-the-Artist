import { createClient } from '@/lib/supabase/server'
import { OrdersList } from '@/components/admin/OrdersList'

export const revalidate = 0

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div data-testid="admin-orders-page">
      <div className="mb-8">
        <h1 className="heading-serif text-3xl mb-2">Orders</h1>
        <p className="text-foreground-secondary">Manage commission requests</p>
      </div>

      <OrdersList orders={orders || []} />
    </div>
  )
}
