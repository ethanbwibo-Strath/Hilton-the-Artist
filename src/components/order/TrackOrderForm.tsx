'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'
import { formatDate, cn } from '@/lib/utils'
import { Package, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import type { Order } from '@/types'

const statusConfig = {
  'Pending': { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  'In Progress': { icon: ArrowRight, color: 'text-blue-600', bg: 'bg-blue-100' },
  'Completed': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  'Cancelled': { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
}

export function TrackOrderForm() {
  const [email, setEmail] = useState('')
  const [orderId, setOrderId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setNotFound(false)
    setOrder(null)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('customer_email', email)
      .single()

    if (error || !data) {
      setNotFound(true)
      toast.error('Order not found')
    } else {
      setOrder(data as Order)
    }

    setIsLoading(false)
  }

  const StatusIcon = order ? statusConfig[order.status as keyof typeof statusConfig]?.icon || Package : Package

  return (
    <div data-testid="track-order-form">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="track-input-email"
        />
        <Input
          id="orderId"
          label="Order ID"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
          data-testid="track-input-orderid"
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isLoading}
          data-testid="track-submit-btn"
        >
          {isLoading ? 'Searching...' : 'Track Order'}
        </Button>
      </motion.form>

      {/* Not Found */}
      {notFound && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-red-50 rounded-sm text-center"
          data-testid="order-not-found"
        >
          <XCircle size={32} className="mx-auto mb-4 text-red-600" />
          <p className="text-red-800">
            No order found with this email and order ID combination.
          </p>
        </motion.div>
      )}

      {/* Order Details */}
      {order && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-background-off rounded-sm overflow-hidden"
          data-testid="order-details"
        >
          {/* Status Header */}
          <div className={cn(
            'p-6 flex items-center gap-4',
            statusConfig[order.status as keyof typeof statusConfig]?.bg || 'bg-gray-100'
          )}>
            <StatusIcon size={32} className={statusConfig[order.status as keyof typeof statusConfig]?.color || 'text-gray-600'} />
            <div>
              <p className="text-sm text-foreground-secondary">Status</p>
              <p className="text-xl font-medium" data-testid="order-status">{order.status}</p>
            </div>
          </div>

          {/* Order Info */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-foreground-muted">Order ID</p>
                <p className="font-mono text-sm break-all" data-testid="order-id">{order.id}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-foreground-muted">Created</p>
                <p className="text-sm" data-testid="order-created">{formatDate(order.created_at)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-foreground-muted">Artwork Type</p>
                <p className="text-sm" data-testid="order-type">{order.artwork_type}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-foreground-muted">Size</p>
                <p className="text-sm" data-testid="order-size">{order.size}</p>
              </div>
            </div>

            {/* Estimated Completion - Highlighted Section */}
            <div className="mt-6 pt-6 border-t border-foreground-muted/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-foreground-muted mb-1">Estimated Completion</p>
                  {order.estimated_completion ? (
                    <p className="text-lg font-medium" data-testid="order-completion">
                      {formatDate(order.estimated_completion)}
                    </p>
                  ) : (
                    <p className="text-sm text-foreground-muted" data-testid="order-completion-pending">
                      To be determined - We'll update this once your commission is reviewed
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
