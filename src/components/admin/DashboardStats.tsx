'use client'

import { motion } from 'framer-motion'
import { Image, ClipboardList, Clock } from 'lucide-react'

interface DashboardStatsProps {
  totalArtworks: number
  totalOrders: number
  pendingOrders: number
}

export function DashboardStats({ totalArtworks, totalOrders, pendingOrders }: DashboardStatsProps) {
  const stats = [
    {
      label: 'Total Artworks',
      value: totalArtworks,
      icon: Image,
      testId: 'stat-artworks',
    },
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: ClipboardList,
      testId: 'stat-orders',
    },
    {
      label: 'Pending Orders',
      value: pendingOrders,
      icon: Clock,
      testId: 'stat-pending',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="dashboard-stats">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-background p-6 rounded-sm shadow-sm"
          data-testid={stat.testId}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-foreground-muted uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className="text-4xl font-light">{stat.value}</p>
            </div>
            <div className="p-3 bg-background-soft rounded-sm">
              <stat.icon size={24} className="text-foreground-secondary" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
