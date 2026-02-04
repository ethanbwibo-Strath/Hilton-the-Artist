'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full px-0 py-3 bg-transparent border-b border-foreground-muted/30 text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-foreground transition-colors resize-none min-h-[120px]',
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

Textarea.displayName = 'Textarea'
