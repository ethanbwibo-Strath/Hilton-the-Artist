'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { LogOut } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface AdminHeaderProps {
  user: User
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="bg-background border-b border-foreground-muted/10 px-8 py-4" data-testid="admin-header">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground-muted">Logged in as</p>
          <p className="font-medium" data-testid="admin-user-email">{user.email}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          data-testid="logout-btn"
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  )
}
