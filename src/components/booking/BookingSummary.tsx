'use client'

import Image from 'next/image'
import { CalendarIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
}

interface Provider {
  id: string
  name: string
  businessName: string
  avatar: string
  rating: number
  address: string
}

interface BookingData {
  serviceId: string
  date: string
  time: string
  location: 'salon' | 'home'
  customerAddress?: string
  notes?: string
  paymentMethod?: string
}

interface BookingSummaryProps {
  provider: Provider
  bookingData: BookingData
  selectedService?: Service
}

export function BookingSummary({ provider, bookingData, selectedService }: BookingSummaryProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not selected'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
    return `${mins}m`
  }

  const calculateTotal = () => {
    let total = selectedService?.price || 0
    
    // Add travel fee for home service (mock calculation)
    if (bookingData.location === 'home') {
      total += 15 // $15 travel fee
    }
    
    return total
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Provider Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={provider.avatar}
              alt={provider.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=6366f1&color=white&size=48`
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
            <p className="text-sm text-gray-600">{provider.businessName}</p>
          </div>
        </div>

        {/* Service */}
        {selectedService && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Service</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-gray-900">{selectedService.name}</h5>
                <span className="font-semibold text-gray-900">${selectedService.price}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{formatDuration(selectedService.duration)}</span>
                </div>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                  {selectedService.category}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Date & Time */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Date & Time</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatDate(bookingData.date)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ClockIcon className="h-4 w-4" />
              <span>{bookingData.time || 'Not selected'}</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Location</h4>
          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <MapPinIcon className="h-4 w-4 mt-0.5" />
            <div>
              {bookingData.location === 'salon' ? (
                <div>
                  <p className="font-medium">At Salon</p>
                  <p>{provider.address}</p>
                </div>
              ) : bookingData.location === 'home' ? (
                <div>
                  <p className="font-medium">Mobile Service</p>
                  <p>{bookingData.customerAddress || 'Address not provided'}</p>
                </div>
              ) : (
                <p>Not selected</p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        {selectedService && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Pricing</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{selectedService.name}</span>
                <span className="text-gray-900">${selectedService.price}</span>
              </div>
              
              {bookingData.location === 'home' && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Travel fee</span>
                  <span className="text-gray-900">$15</span>
                </div>
              )}
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> You'll receive a confirmation email with all booking details. 
            Cancellations must be made at least 24 hours in advance.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}