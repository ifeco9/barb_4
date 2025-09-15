'use client'

import { useState } from 'react'
import { MapPinIcon, HomeIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface LocationSelectorProps {
  providerAddress: string
  selectedLocation: 'salon' | 'home'
  customerAddress?: string
  onLocationSelect: (location: 'salon' | 'home', address?: string) => void
}

export function LocationSelector({ 
  providerAddress, 
  selectedLocation, 
  customerAddress, 
  onLocationSelect 
}: LocationSelectorProps) {
  const [homeAddress, setHomeAddress] = useState(customerAddress || '')

  const handleLocationChange = (location: 'salon' | 'home') => {
    if (location === 'salon') {
      onLocationSelect(location)
    } else {
      onLocationSelect(location, homeAddress)
    }
  }

  const handleAddressChange = (address: string) => {
    setHomeAddress(address)
    if (selectedLocation === 'home') {
      onLocationSelect('home', address)
    }
  }

  return (
    <div className="space-y-6">
      {/* Salon Service */}
      <div
        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedLocation === 'salon'
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
        onClick={() => handleLocationChange('salon')}
      >
        {selectedLocation === 'salon' && (
          <div className="absolute top-4 right-4">
            <CheckCircleIcon className="h-6 w-6 text-primary-600" />
          </div>
        )}
        
        <div className="flex items-start space-x-4 pr-8">
          <div className={`p-3 rounded-lg ${
            selectedLocation === 'salon' ? 'bg-primary-100' : 'bg-gray-100'
          }`}>
            <MapPinIcon className={`h-6 w-6 ${
              selectedLocation === 'salon' ? 'text-primary-600' : 'text-gray-600'
            }`} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              At Salon/Studio
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              Visit the provider's location for your service
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {providerAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Home Service */}
      <div
        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedLocation === 'home'
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
        onClick={() => handleLocationChange('home')}
      >
        {selectedLocation === 'home' && (
          <div className="absolute top-4 right-4">
            <CheckCircleIcon className="h-6 w-6 text-primary-600" />
          </div>
        )}
        
        <div className="flex items-start space-x-4 pr-8">
          <div className={`p-3 rounded-lg ${
            selectedLocation === 'home' ? 'bg-primary-100' : 'bg-gray-100'
          }`}>
            <HomeIcon className={`h-6 w-6 ${
              selectedLocation === 'home' ? 'text-primary-600' : 'text-gray-600'
            }`} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Mobile Service
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Have the provider come to your location
            </p>
            
            {selectedLocation === 'home' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Address
                </label>
                <textarea
                  placeholder="Enter your full address..."
                  value={homeAddress}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Please include apartment/unit number, parking instructions, etc.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Area Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              <strong>Mobile Service:</strong> Additional travel fees may apply based on distance. 
              The provider will confirm availability and any extra charges before finalizing your booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}