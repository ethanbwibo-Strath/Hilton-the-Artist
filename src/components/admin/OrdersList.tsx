'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDate, cn } from '@/lib/utils'
import { Eye, ChevronDown } from 'lucide-react'
import { Fragment } from 'react'
import type { Order } from '@/types'

interface OrdersListProps {
  orders: Order[]
}

const statusColors = {
  'Pending': 'bg-amber-100 text-amber-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800',
}

const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled']

export function OrdersList({ orders }: OrdersListProps) {
  const router = useRouter()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [editingCompletion, setEditingCompletion] = useState<string | null>(null)
  const [completionDate, setCompletionDate] = useState<string>('')

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId)
    const supabase = createClient()

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)

    if (error) {
      toast.error('Failed to update status')
    } else {
      toast.success('Status updated')
      router.refresh()
    }
    setUpdatingId(null)
  }

  const handleEditCompletion = (order: Order) => {
    setEditingCompletion(order.id)
    setCompletionDate(order.estimated_completion || '')
  }

  const handleSaveCompletion = async (orderId: string) => {
    setUpdatingId(orderId)
    const supabase = createClient()

    const { error } = await supabase
      .from('orders')
      .update({ estimated_completion: completionDate || null })
      .eq('id', orderId)

    if (error) {
      toast.error('Failed to update completion date')
    } else {
      toast.success('Completion date updated')
      router.refresh()
    }
    setEditingCompletion(null)
    setUpdatingId(null)
  }

  if (orders.length === 0) {
    return (
      <div className="bg-background p-12 rounded-sm text-center" data-testid="no-orders">
        <p className="text-foreground-secondary">No orders yet</p>
      </div>
    )
  }

  return (
    <div className="bg-background rounded-sm overflow-hidden shadow-sm" data-testid="orders-list">
      <table className="w-full">
        <thead>
          <tr className="border-b border-foreground-muted/10">
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Customer</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Type</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Budget</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Status</th>
            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground-muted">Date</th>
            <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-foreground-muted">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Fragment key={order.id}>
              <tr
                className="border-b border-foreground-muted/10 hover:bg-background-off transition-colors"
                data-testid={`order-row-${order.id}`}
              >
                <td className="px-6 py-4">
                  <p className="font-medium">{order.customer_name}</p>
                  <p className="text-sm text-foreground-muted">{order.customer_email}</p>
                </td>
                <td className="px-6 py-4 text-sm">{order.artwork_type}</td>
                <td className="px-6 py-4 text-sm">
                  {order.estimated_price ? formatPrice(order.estimated_price) : '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="relative inline-block">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={updatingId === order.id}
                      className={cn(
                        'appearance-none px-3 py-1 pr-8 text-xs font-medium rounded-full cursor-pointer focus:outline-none',
                        statusColors[order.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                      )}
                      data-testid={`order-status-select-${order.id}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={12}
                      className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground-secondary">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    data-testid={`view-order-${order.id}`}
                  >
                    <Eye size={16} />
                  </Button>
                </td>
              </tr>
              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <tr data-testid={`order-details-${order.id}`}>
                  <td colSpan={6} className="px-6 py-6 bg-background-off">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-foreground-muted mb-1">Size</p>
                        <p className="text-sm">{order.size}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-foreground-muted mb-1">Order ID</p>
                        <p className="text-sm font-mono break-all">{order.id}</p>
                      </div>
                      
                      {/* Estimated Completion - Editable */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-foreground-muted mb-1">Est. Completion</p>
                        {editingCompletion === order.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="date"
                              value={completionDate}
                              onChange={(e) => setCompletionDate(e.target.value)}
                              className="px-2 py-1 text-sm border border-foreground-muted/30 rounded-sm focus:outline-none focus:border-foreground"
                              data-testid={`completion-date-input-${order.id}`}
                            />
                            <button
                              onClick={() => handleSaveCompletion(order.id)}
                              disabled={updatingId === order.id}
                              className="p-1 text-green-600 hover:bg-green-50 rounded-sm transition-colors"
                              data-testid={`save-completion-btn-${order.id}`}
                            >
                              <Save size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="text-sm">
                              {order.estimated_completion ? formatDate(order.estimated_completion) : 'Not set'}
                            </p>
                            <button
                              onClick={() => handleEditCompletion(order)}
                              className="p-1 text-foreground-muted hover:text-foreground hover:bg-background rounded-sm transition-colors"
                              data-testid={`edit-completion-btn-${order.id}`}
                            >
                              <Calendar size={14} />
                            </button>
                          </div>
                        )}
                      </div>

                      {order.special_instructions && (
                        <div className="md:col-span-3">
                          <p className="text-xs uppercase tracking-wider text-foreground-muted mb-1">Special Instructions</p>
                          <p className="text-sm">{order.special_instructions}</p>
                        </div>
                      )}
                      {order.reference_image && (
                        <div className="md:col-span-3">
                          <p className="text-xs uppercase tracking-wider text-foreground-muted mb-1">Reference Image</p>
                          <a
                            href={order.reference_image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-accent-highlight hover:underline"
                          >
                            View Image
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
