'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Image, ClipboardList, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/artworks', icon: Image, label: 'Artworks' },
  { href: '/admin/orders', icon: ClipboardList, label: 'Orders' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-foreground text-background min-h-screen p-6" data-testid="admin-sidebar">
      <Link href="/" className="flex items-center gap-2 mb-12">
        <span className="heading-serif text-xl">Hilton Art</span>
      </Link>

      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-testid={`admin-nav-${item.label.toLowerCase()}`}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-sm transition-colors',
                    isActive
                      ? 'bg-background/10 text-background'
                      : 'text-background/60 hover:bg-background/5 hover:text-background'
                  )}
                >
                  <item.icon size={20} strokeWidth={1.5} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-12">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-background/60 hover:text-background transition-colors text-sm"
          data-testid="admin-nav-home"
        >
          <Home size={20} strokeWidth={1.5} />
          View Website
        </Link>
      </div>
    </aside>
  )
}
