'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarIcon,
  StarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Search:', { searchQuery, location })
  }

  return (
    <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                Beauty Expert
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              Connect with professional barbers, stylists, and beauty service providers in your area. 
              Book appointments, shop products, and discover your perfect look.
            </p>

            {/* Search form */}
            <form onSubmit={handleSearch} className="mt-8 bg-white rounded-2xl shadow-xl p-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for services, barbers, salons..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field pl-10 pr-4 py-3 w-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="input-field pl-10 pr-4 py-3 w-full"
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full mt-4">
                Find Services
              </Button>
            </form>

            {/* Quick actions */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link href="/services">
                <Button variant="outline" className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Book Now</span>
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>Shop Products</span>
                </Button>
              </Link>
              <Link href="/providers">
                <Button variant="outline" className="flex items-center space-x-2">
                  <UserGroupIcon className="h-5 w-5" />
                  <span>Find Providers</span>
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-primary-600">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-600">Verified Providers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">50K+</div>
                <div className="text-sm text-gray-600">Appointments Booked</div>
              </div>
            </div>
          </div>

          {/* Right content - Hero image/illustration */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 bg-primary-500 text-white rounded-full p-3">
                <SparklesIcon className="h-6 w-6" />
              </div>
              
              {/* Mock service provider card */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    JS
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Jane Smith</h3>
                    <p className="text-gray-600">Master Hair Stylist</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">4.9 (127 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm">Haircut & Style</h4>
                    <p className="text-primary-600 font-bold">$45</p>
                    <p className="text-xs text-gray-500">60 min</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm">Color Treatment</h4>
                    <p className="text-primary-600 font-bold">$120</p>
                    <p className="text-xs text-gray-500">120 min</p>
                  </div>
                </div>
                
                <Button className="w-full">
                  Book Appointment
                </Button>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -left-8 bg-white rounded-full p-4 shadow-lg animate-bounce">
              <CalendarIcon className="h-8 w-8 text-primary-500" />
            </div>
            <div className="absolute -bottom-4 -right-8 bg-secondary-500 text-white rounded-full p-3 shadow-lg animate-pulse">
              <StarIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}