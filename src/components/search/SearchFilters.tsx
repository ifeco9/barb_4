'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface Filters {
  service: string
  priceRange: string
  rating: string
  distance: string
  availability: string
  homeService: boolean
  salonService: boolean
}

interface SearchFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onClose?: () => void
}

export function SearchFilters({ filters, onFiltersChange, onClose }: SearchFiltersProps) {
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      service: '',
      priceRange: '',
      rating: '',
      distance: '25',
      availability: '',
      homeService: false,
      salonService: false
    })
  }

  const serviceTypes = [
    'Haircut & Styling',
    'Hair Coloring',
    'Hair Treatment',
    'Beard Grooming',
    'Facials',
    'Makeup',
    'Nails',
    'Massage',
    'Eyebrows',
    'Lash Extensions'
  ]

  const priceRanges = [
    { label: '$', value: '0-25' },
    { label: '$$', value: '25-50' },
    { label: '$$$', value: '50-100' },
    { label: '$$$$', value: '100+' }
  ]

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Filters</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm text-gray-600"
          >
            Clear all
          </Button>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Service Type */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Service Type</h3>
          <div className="space-y-2">
            {serviceTypes.map((service) => (
              <label key={service} className="flex items-center">
                <input
                  type="radio"
                  name="service"
                  value={service}
                  checked={filters.service === service}
                  onChange={(e) => updateFilter('service', e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
          <div className="flex space-x-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => updateFilter('priceRange', 
                  filters.priceRange === range.value ? '' : range.value
                )}
                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  filters.priceRange === range.value
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating.toString()}
                  checked={filters.rating === rating.toString()}
                  onChange={(e) => updateFilter('rating', e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {rating}+ stars
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">
            Distance: {filters.distance} miles
          </h3>
          <input
            type="range"
            min="1"
            max="50"
            value={filters.distance}
            onChange={(e) => updateFilter('distance', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 mi</span>
            <span>50 mi</span>
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Availability</h3>
          <select
            value={filters.availability}
            onChange={(e) => updateFilter('availability', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Any time</option>
            <option value="today">Available today</option>
            <option value="tomorrow">Available tomorrow</option>
            <option value="this_week">This week</option>
            <option value="next_week">Next week</option>
          </select>
        </div>

        {/* Service Location */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Service Location</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.salonService}
                onChange={(e) => updateFilter('salonService', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">At salon/studio</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.homeService}
                onChange={(e) => updateFilter('homeService', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">At home/mobile</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}