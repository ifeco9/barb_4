'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  StarIcon, 
  MapPinIcon, 
  ClockIcon, 
  HeartIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

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

interface ProviderCardProps {
  provider: Provider
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorited(!isFavorited)
    // TODO: Update favorites in database
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={provider.avatar}
                alt={provider.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=6366f1&color=white&size=80`
                }}
              />
            </div>
            {provider.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>

          {/* Provider Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {provider.name}
                  </h3>
                  <CheckBadgeIcon className="h-5 w-5 text-blue-500" title="Verified Provider" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {provider.businessName}
                </p>
              </div>
              
              <button
                onClick={handleFavorite}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isFavorited ? (
                  <HeartIconSolid className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">
                  {provider.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({provider.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <MapPinIcon className="h-4 w-4" />
                <span>{provider.distance} mi away</span>
              </div>
            </div>

            {/* Services */}
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {provider.services.slice(0, 3).map((service) => (
                  <span
                    key={service}
                    className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                  >
                    {service}
                  </span>
                ))}
                {provider.services.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{provider.services.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Specialties */}
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Specialties:</span>{' '}
                {provider.specialties.slice(0, 2).join(', ')}
                {provider.specialties.length > 2 && '...'}
              </p>
            </div>

            {/* Availability and Pricing */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4" />
                  <span>Next: {provider.nextAvailable}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {provider.priceRange}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link href={`/provider/${provider.id}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
                <Link href={`/book/${provider.id}`}>
                  <Button size="sm">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}