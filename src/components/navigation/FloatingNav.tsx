'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Image, Palette, Search, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/gallery', icon: Image, label: 'Gallery' },
  { href: '/commission', icon: Palette, label: 'Commission' },
  { href: '/track-order', icon: Search, label: 'Track' },
]

// export function FloatingNav() {
//   const pathname = usePathname()

//   // Don't show on admin pages
//   if (pathname.startsWith('/admin') || pathname === '/login') {
//     return null
//   }

//   return (
//     <motion.nav
//       initial={{ y: 100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ delay: 0.5, duration: 0.5 }}
//       className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
//       data-testid="floating-nav"
//     >
//       <div className="glass border border-foreground-muted/20 rounded-full px-2 py-2 shadow-lg">
//         <ul className="flex items-center gap-1">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href
//             return (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   data-testid={`nav-${item.label.toLowerCase()}`}
//                   className={cn(
//                     'flex items-center gap-2 px-4 py-2 rounded-full transition-base',
//                     isActive
//                       ? 'bg-foreground text-background'
//                       : 'hover:bg-background-soft text-foreground-secondary hover:text-foreground'
//                   )}
//                 >
//                   <item.icon size={18} strokeWidth={1.5} />
//                   <span className="text-sm font-medium hidden sm:inline">
//                     {item.label}
//                   </span>
//                 </Link>
//               </li>
//             )
//           })}
//           <li className="ml-2 border-l border-foreground-muted/30 pl-2">
//             <Link
//               href="/login"
//               data-testid="nav-admin"
//               className="flex items-center gap-2 px-4 py-2 rounded-full text-foreground-muted hover:text-foreground transition-base hover:bg-background-soft"
//             >
//               <User size={18} strokeWidth={1.5} />
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </motion.nav>
//   )
// }

export function FloatingNav() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin') || pathname === '/login') {
    return null
  }

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Updated with glass-border and more padding for a pill shape */}
      <div className="glass glass-border rounded-full px-3 py-2 shadow-2xl">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    'relative z-10 flex items-center gap-2 px-4 py-2 rounded-full transition-base',
                    isActive ? 'text-background' : 'text-foreground-secondary hover:text-foreground'
                  )}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                  <span className="text-sm font-medium hidden sm:inline">
                    {item.label}
                  </span>

                  {/* The "Liquid" Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-foreground rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
          {/* Admin separator and login icon */}
          <li className="ml-2 border-l border-foreground-muted/20 pl-2">
            <Link href="/login" className="p-2 text-foreground-muted hover:text-foreground">
              <User size={18} />
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  )
}