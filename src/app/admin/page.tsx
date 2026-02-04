import { createClient } from '@/lib/supabase/server'
import { DashboardStats } from '@/components/admin/DashboardStats'
import { RecentOrders } from '@/components/admin/RecentOrders'

export const revalidate = 0

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Get stats
  const { count: totalArtworks } = await supabase
    .from('artworks')
    .select('*', { count: 'exact', head: true })

  const { count: totalOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })

  const { count: pendingOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Pending')

  // Get recent orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div data-testid="admin-dashboard">
      <div className="mb-8">
        <h1 className="heading-serif text-3xl mb-2">Dashboard</h1>
        <p className="text-foreground-secondary">Overview of your portfolio</p>
      </div>

      <DashboardStats
        totalArtworks={totalArtworks || 0}
        totalOrders={totalOrders || 0}
        pendingOrders={pendingOrders || 0}
      />

      <div className="mt-12">
        <h2 className="text-xl font-medium mb-6">Recent Orders</h2>
        <RecentOrders orders={recentOrders || []} />
      </div>
    </div>
  )
}
