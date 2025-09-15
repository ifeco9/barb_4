'use client'

import { ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
}

interface ServiceSelectorProps {
  services: Service[]
  selectedServiceId: string
  onServiceSelect: (serviceId: string) => void
}

export function ServiceSelector({ services, selectedServiceId, onServiceSelect }: ServiceSelectorProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
    return `${mins}m`
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div
          key={service.id}
          className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedServiceId === service.id
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
          onClick={() => onServiceSelect(service.id)}
        >
          {selectedServiceId === service.id && (
            <div className="absolute top-4 right-4">
              <CheckCircleIcon className="h-6 w-6 text-primary-600" />
            </div>
          )}
          
          <div className="pr-8">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {service.name}
              </h3>
              <span className="text-lg font-bold text-primary-600">
                ${service.price}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">
              {service.description}
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>{formatDuration(service.duration)}</span>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {service.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}