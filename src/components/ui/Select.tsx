'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, ...props }, ref) => {
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
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              'w-full px-0 py-3 bg-transparent border-b border-foreground-muted/30 text-foreground focus:outline-none focus:border-foreground transition-colors appearance-none cursor-pointer pr-8',
              error && 'border-accent-highlight',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none"
          />
        </div>
        {error && (
          <p className="text-sm text-accent-highlight">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
