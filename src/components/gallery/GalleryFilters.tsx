'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface GalleryFiltersProps {
  categories: string[]
  currentCategory?: string
  currentAvailability?: string
}

const availabilityOptions = [
  { value: 'all', label: 'All' },
  { value: 'Available', label: 'Available' },
  { value: 'Sold', label: 'Sold' },
  { value: 'Commission Only', label: 'Commission Only' },
]

export function GalleryFilters({ categories, currentCategory, currentAvailability }: GalleryFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/gallery?${params.toString()}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12" data-testid="gallery-filters">
      {/* Category Filter */}
      <div>
        <p className="text-xs uppercase tracking-wider text-foreground-muted mb-3">Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('category', 'all')}
            data-testid="filter-category-all"
            className={cn(
              'px-4 py-2 text-sm rounded-full transition-base',
              (!currentCategory || currentCategory === 'all')
                ? 'bg-foreground text-background'
                : 'bg-background-soft text-foreground-secondary hover:text-foreground'
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => updateFilter('category', category)}
              data-testid={`filter-category-${category.toLowerCase()}`}
              className={cn(
                'px-4 py-2 text-sm rounded-full transition-base',
                currentCategory === category
                  ? 'bg-foreground text-background'
                  : 'bg-background-soft text-foreground-secondary hover:text-foreground'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <p className="text-xs uppercase tracking-wider text-foreground-muted mb-3">Availability</p>
        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter('availability', option.value)}
              data-testid={`filter-availability-${option.value.toLowerCase().replace(' ', '-')}`}
              className={cn(
                'px-4 py-2 text-sm rounded-full transition-base',
                (currentAvailability === option.value || (!currentAvailability && option.value === 'all'))
                  ? 'bg-foreground text-background'
                  : 'bg-background-soft text-foreground-secondary hover:text-foreground'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
