'use client'

import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { Card, CardContent } from '@/components/ui/Card'

interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  service: string
  images?: string[]
}

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
            <p className="text-sm text-gray-500">Service: {review.service}</p>
            <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
          </div>
          
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              star <= review.rating ? (
                <StarIconSolid key={star} className="h-5 w-5 text-yellow-400" />
              ) : (
                <StarIcon key={star} className="h-5 w-5 text-gray-300" />
              )
            ))}
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          {review.comment}
        </p>
        
        {review.images && review.images.length > 0 && (
          <div className="flex space-x-2">
            {review.images.map((image, index) => (
              <div key={index} className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder-image.jpg'
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}