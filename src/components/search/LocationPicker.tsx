'use client'

import { useState } from 'react'
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface LocationPickerProps {
  onLocationSelect: (location: string, coordinates?: { lat: number; lng: number }) => void
  placeholder?: string
}

export function LocationPicker({ onLocationSelect, placeholder = "Enter location..." }: LocationPickerProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // Reverse geocoding would go here
          onLocationSelect('Current Location', { lat: latitude, lng: longitude })
          setIsLoading(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          setIsLoading(false)
        }
      )
    }
  }

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)
    
    if (searchQuery.length < 3) {
      setSuggestions([])
      return
    }

    // Mock suggestions - replace with actual geocoding API
    const mockSuggestions = [
      { id: 1, name: `${searchQuery} - New York, NY`, address: 'New York, NY, USA' },
      { id: 2, name: `${searchQuery} - Brooklyn, NY`, address: 'Brooklyn, NY, USA' },
      { id: 3, name: `${searchQuery} - Manhattan, NY`, address: 'Manhattan, NY, USA' }
    ]
    
    setSuggestions(mockSuggestions)
  }

  const selectSuggestion = (suggestion: any) => {
    setQuery(suggestion.name)
    setSuggestions([])
    onLocationSelect(suggestion.name, { lat: 40.7128, lng: -74.0060 }) // Mock coordinates
  }

  return (
    <div className="relative">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-primary-600 transition-colors"
          title="Use current location"
        >
          <MapPinIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => selectSuggestion(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {suggestion.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {suggestion.address}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}