'use client'

import Link from 'next/link'
import { ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
}

interface ServiceCardProps {
  service: Service
  providerId: string
}

export function ServiceCard({ service, providerId }: ServiceCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
    return `${mins}m`
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {service.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {service.description}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>{formatDuration(service.duration)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span className="font-semibold text-gray-900">${service.price}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {service.category}
          </span>
          
          <Link href={`/book/${providerId}?service=${service.id}`}>
            <Button size="sm">
              Book Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}