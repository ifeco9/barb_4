'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { MagnifyingGlassIcon, MapPinIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ProviderCard } from '@/components/search/ProviderCard'
import { SearchFilters } from '@/components/search/SearchFilters'
import { LocationPicker } from '@/components/search/LocationPicker'

interface Provider {
  id: string
  name: string
  businessName: string
  avatar: string
  rating: number
  reviewCount: number
  distance: number
  services: string[]
  priceRange: string
  nextAvailable: string
  specialties: string[]
  isOnline: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    service: searchParams.get('service') || '',
    priceRange: '',
    rating: '',
    distance: '25',
    availability: '',
    homeService: false,
    salonService: false
  })

  // Mock data - replace with actual API calls
  const mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      businessName: 'Elite Hair Studio',
      avatar: '/avatars/sarah.jpg',
      rating: 4.9,
      reviewCount: 127,
      distance: 2.3,
      services: ['Haircut', 'Styling', 'Coloring'],
      priceRange: '$40-$120',
      nextAvailable: 'Today 3:00 PM',
      specialties: ['Balayage', 'Wedding Hair', 'Color Correction'],
      isOnline: true
    },
    {
      id: '2',
      name: 'Michael Davis',
      businessName: 'Classic Cuts Barbershop',
      avatar: '/avatars/michael.jpg',
      rating: 4.8,
      reviewCount: 89,
      distance: 1.8,
      services: ['Haircut', 'Beard Trim', 'Hot Towel Shave'],
      priceRange: '$25-$60',
      nextAvailable: 'Tomorrow 10:00 AM',
      specialties: ['Classic Cuts', 'Beard Styling', 'Straight Razor'],
      isOnline: false
    },
    {
      id: '3',
      name: 'Emily Chen',
      businessName: 'Glow Beauty Salon',
      avatar: '/avatars/emily.jpg',
      rating: 5.0,
      reviewCount: 203,
      distance: 3.7,
      services: ['Facials', 'Microblading', 'Lash Extensions'],
      priceRange: '$60-$200',
      nextAvailable: 'Today 5:30 PM',
      specialties: ['Hydrafacial', 'Permanent Makeup', 'Skincare'],
      isOnline: true
    }
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setProviders(mockProviders)
      setLoading(false)
    }, 1000)
  }, [searchQuery, location, filters])

  const handleSearch = () => {
    setLoading(true)
    // Implement search logic here
    setTimeout(() => {
      setProviders(mockProviders)
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services, specialists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex-1 relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location, address, or zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <Button onClick={handleSearch} className="px-8">
                Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {['Haircut', 'Styling', 'Coloring', 'Facials', 'Nails', 'Massage'].map((service) => (
                  <button
                    key={service}
                    onClick={() => setFilters({ ...filters, service })}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      filters.service === service
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <FunnelIcon className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Beauty & Wellness Providers
                </h1>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Searching...' : `${providers.length} providers found`}
                  {location && ` near ${location}`}
                </p>
              </div>
              
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                <option>Sort by Distance</option>
                <option>Sort by Rating</option>
                <option>Sort by Price</option>
                <option>Sort by Availability</option>
              </select>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Provider Results */}
            {!loading && (
              <div className="space-y-4">
                {providers.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                  />
                ))}
                
                {providers.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No providers found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search criteria or location
                      </p>
                      <Button variant="outline">
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}