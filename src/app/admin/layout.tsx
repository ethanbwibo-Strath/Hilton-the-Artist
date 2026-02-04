import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background-off flex" data-testid="admin-layout">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader user={user} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
