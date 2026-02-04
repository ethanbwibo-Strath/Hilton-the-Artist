import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background-off p-8" data-testid="login-page">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="heading-serif text-4xl mb-2">Hilton Art</h1>
          <p className="text-foreground-secondary">Admin Dashboard</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
