'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-base disabled:opacity-50 disabled:pointer-events-none',
          // Variants
          variant === 'primary' && 'bg-foreground text-background border border-foreground hover:bg-foreground/90',
          variant === 'secondary' && 'bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background',
          variant === 'ghost' && 'bg-transparent text-foreground hover:bg-background-soft',
          // Sizes
          size === 'sm' && 'px-4 py-2 text-sm rounded-sm',
          size === 'md' && 'px-6 py-3 text-sm rounded-sm',
          size === 'lg' && 'px-8 py-4 text-base rounded-sm',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
