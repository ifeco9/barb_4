'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  StarIcon, 
  MapPinIcon, 
  ClockIcon, 
  HeartIcon,
  CheckBadgeIcon,
  ShareIcon,
  ChevronLeftIcon,
  CameraIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ServiceCard } from '@/components/provider/ServiceCard'
import { ReviewCard } from '@/components/provider/ReviewCard'
import { PortfolioGallery } from '@/components/provider/PortfolioGallery'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
}

interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  service: string
  images?: string[]
}

interface Provider {
  id: string
  name: string
  businessName: string
  avatar: string
  coverImage: string
  rating: number
  reviewCount: number
  totalBookings: number
  isVerified: boolean
  isOnline: boolean
  bio: string
  experience: number
  specialties: string[]
  languages: string[]
  address: string
  phone: string
  email: string
  website: string
  workingHours: {
    [key: string]: { open: string; close: string; isOpen: boolean }
  }
  services: Service[]
  reviews: Review[]
  portfolioImages: string[]
  certifications: string[]
}

export default function ProviderProfilePage() {
  const params = useParams()
  const [provider, setProvider] = useState<Provider | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState('services')

  // Mock data - replace with actual API call
  const mockProvider: Provider = {
    id: params.id as string,
    name: 'Sarah Johnson',
    businessName: 'Elite Hair Studio',
    avatar: '/avatars/sarah.jpg',
    coverImage: '/covers/salon1.jpg',
    rating: 4.9,
    reviewCount: 127,
    totalBookings: 1250,
    isVerified: true,
    isOnline: true,
    bio: 'Passionate hair stylist with 8+ years of experience in cutting-edge hair techniques. Specialized in balayage, color correction, and bridal styling. I believe every client deserves to feel confident and beautiful.',
    experience: 8,
    specialties: ['Balayage', 'Color Correction', 'Wedding Hair', 'Highlights', 'Hair Extensions'],
    languages: ['English', 'Spanish'],
    address: '123 Beauty Ave, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'sarah@elitehair.com',
    website: 'www.elitehairstudio.com',
    workingHours: {
      Monday: { open: '9:00 AM', close: '7:00 PM', isOpen: true },
      Tuesday: { open: '9:00 AM', close: '7:00 PM', isOpen: true },
      Wednesday: { open: '9:00 AM', close: '7:00 PM', isOpen: true },
      Thursday: { open: '9:00 AM', close: '8:00 PM', isOpen: true },
      Friday: { open: '9:00 AM', close: '8:00 PM', isOpen: true },
      Saturday: { open: '8:00 AM', close: '6:00 PM', isOpen: true },
      Sunday: { open: '', close: '', isOpen: false }
    },
    services: [
      {
        id: '1',
        name: 'Signature Haircut & Style',
        description: 'Personalized cut and styling tailored to your face shape and lifestyle',
        price: 85,
        duration: 90,
        category: 'Haircut'
      },
      {
        id: '2',
        name: 'Balayage Highlights',
        description: 'Hand-painted highlights for a natural, sun-kissed look',
        price: 180,
        duration: 180,
        category: 'Coloring'
      },
      {
        id: '3',
        name: 'Color Correction',
        description: 'Expert color fixing and restoration services',
        price: 250,
        duration: 240,
        category: 'Coloring'
      }
    ],
    reviews: [
      {
        id: '1',
        customerName: 'Emily R.',
        rating: 5,
        comment: 'Sarah is absolutely amazing! Best balayage I\'ve ever had. She really listens to what you want.',
        date: '2025-09-10',
        service: 'Balayage Highlights',
        images: ['/reviews/review1.jpg']
      },
      {
        id: '2',
        customerName: 'Jessica M.',
        rating: 5,
        comment: 'Perfect cut every time. Sarah has been my stylist for 2 years and I wouldn\'t go anywhere else!',
        date: '2025-09-08',
        service: 'Signature Haircut & Style'
      }
    ],
    portfolioImages: [
      '/portfolio/hair1.jpg',
      '/portfolio/hair2.jpg',
      '/portfolio/hair3.jpg',
      '/portfolio/hair4.jpg'
    ],
    certifications: ['Advanced Color Theory', 'Bridal Hair Specialist', 'Hair Extension Certified']
  }

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setProvider(mockProvider)
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Provider not found</h1>
          <p className="text-gray-600 mb-4">The provider you're looking for doesn't exist.</p>
          <Link href="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gray-200">
        <Image
          src={provider.coverImage}
          alt={`${provider.businessName} cover`}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/placeholder-cover.jpg'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Navigation */}
        <div className="absolute top-4 left-4">
          <Link href="/search">
            <Button variant="secondary" size="sm" className="bg-white/90 text-gray-900">
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
        
        {/* Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 text-gray-900"
          >
            <ShareIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className="bg-white/90 text-gray-900"
          >
            {isFavorited ? (
              <HeartIconSolid className="h-4 w-4 text-red-500" />
            ) : (
              <HeartIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Provider Header */}
        <div className="relative -mt-16 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-white border-4 border-white rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={provider.avatar}
                      alt={provider.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=6366f1&color=white&size=96`
                      }}
                    />
                  </div>
                  {provider.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Provider Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                          {provider.name}
                        </h1>
                        {provider.isVerified && (
                          <CheckBadgeIcon className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                      <p className="text-lg text-gray-600 font-medium">
                        {provider.businessName}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center space-x-6 mt-3">
                        <div className="flex items-center space-x-1">
                          <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">{provider.rating}</span>
                          <span className="text-gray-500">({provider.reviewCount} reviews)</span>
                        </div>
                        <div className="text-gray-500">
                          {provider.totalBookings}+ bookings
                        </div>
                        <div className="text-gray-500">
                          {provider.experience} years experience
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline">
                        Message
                      </Button>
                      <Link href={`/book/${provider.id}`}>
                        <Button>
                          Book Appointment
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'services', label: 'Services' },
              { id: 'about', label: 'About' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'reviews', label: 'Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="pb-12">
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {provider.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  providerId={provider.id}
                />
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {provider.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{provider.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-2 bg-primary-50 text-primary-700 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{provider.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Open today 9:00 AM - 7:00 PM</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Working Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(provider.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center">
                          <span className="text-gray-700">{day}</span>
                          <span className="text-gray-600">
                            {hours.isOpen ? `${hours.open} - ${hours.close}` : 'Closed'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <PortfolioGallery images={provider.portfolioImages} />
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {provider.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}