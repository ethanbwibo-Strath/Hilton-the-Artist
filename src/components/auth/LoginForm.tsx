'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'
import { Lock } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
      setIsLoading(false)
      return
    }

    toast.success('Welcome back!')
    router.push('/admin')
    router.refresh()
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-background p-8 rounded-sm shadow-lg space-y-6"
      data-testid="login-form"
    >
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-background-soft flex items-center justify-center">
          <Lock size={24} className="text-foreground-secondary" />
        </div>
      </div>

      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="admin@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        data-testid="login-email"
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        data-testid="login-password"
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading}
        data-testid="login-submit-btn"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </motion.form>
  )
}
