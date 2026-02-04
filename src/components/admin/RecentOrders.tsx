import Link from 'next/link'
import { formatDate, cn } from '@/lib/utils'
import type { Order } from '@/types'

interface RecentOrdersProps {
  orders: Order[]
}

const statusColors = {
  'Pending': 'bg-amber-100 text-amber-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800',
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-background p-8 rounded-sm text-center" data-testid="no-recent-orders">
        <p className="text-foreground-secondary">No orders yet</p>
      </div>
    )
  }

  return (
    <div className="bg-background rounded-sm overflow-hidden shadow-sm" data-testid="recent-orders">
      <table className="w-full">
        <thead>
          <tr className="border-b border-foreground-muted/10">
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Customer</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Type</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Status</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-foreground-muted/10 hover:bg-background-off transition-colors"
              data-testid={`recent-order-${order.id}`}
            >
              <td className="px-6 py-4">
                <p className="font-medium">{order.customer_name}</p>
                <p className="text-sm text-foreground-muted">{order.customer_email}</p>
              </td>
              <td className="px-6 py-4 text-sm">{order.artwork_type}</td>
              <td className="px-6 py-4">
                <span
                  className={cn(
                    'px-3 py-1 text-xs font-medium rounded-full',
                    statusColors[order.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                  )}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-foreground-secondary">
                {formatDate(order.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t border-foreground-muted/10">
        <Link
          href="/admin/orders"
          className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
          data-testid="view-all-orders-link"
        >
          View all orders →
        </Link>
      </div>
    </div>
  )
}
