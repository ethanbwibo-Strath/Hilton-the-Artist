'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground-secondary uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-0 py-3 bg-transparent border-b border-foreground-muted/30 text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-foreground transition-colors',
            error && 'border-accent-highlight',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-accent-highlight">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
