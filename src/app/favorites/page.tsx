'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { addToCart } from '@/store/slices/cartSlice'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
  XMarkIcon,
  EyeIcon,
  ShareIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface FavoriteItem {
  id: string
  type: 'product' | 'provider'
  name: string
  description: string
  price?: number
  sale_price?: number
  rating: number
  total_reviews: number
  image_url: string
  seller_name?: string
  specialties?: string[]
  location?: string
  added_date: string
}

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'providers'>('all')
  
  // Mock favorites data - replace with real API calls
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      type: 'product',
      name: 'Premium Hair Oil',
      description: 'Nourishing argan oil blend for healthy, shiny hair',
      price: 45.99,
      sale_price: 35.99,
      rating: 4.8,
      total_reviews: 142,
      image_url: '/products/hair-oil-1.jpg',
      seller_name: 'Beauty Essentials Store',
      added_date: '2024-01-15'
    },
    {
      id: '2',
      type: 'provider',
      name: 'Sarah Wilson',
      description: 'Expert stylist specializing in modern cuts and color treatments',
      rating: 4.9,
      total_reviews: 89,
      image_url: '/providers/sarah-wilson.jpg',
      specialties: ['Hair Cutting', 'Color Treatment', 'Styling'],
      location: 'Downtown Salon',
      added_date: '2024-01-12'
    },
    {
      id: '3',
      type: 'product',
      name: 'Moisturizing Face Cream',
      description: 'Deep hydration cream with hyaluronic acid',
      price: 28.99,
      rating: 4.6,
      total_reviews: 203,
      image_url: '/products/face-cream-1.jpg',
      seller_name: 'Skin Care Paradise',
      added_date: '2024-01-10'
    },
    {
      id: '4',
      type: 'provider',
      name: 'Michael Chen',
      description: 'Professional barber with 10+ years experience',
      rating: 4.7,
      total_reviews: 156,
      image_url: '/providers/michael-chen.jpg',
      specialties: ['Traditional Cuts', 'Beard Grooming', 'Hot Towel Shaves'],
      location: 'Classic Barbershop',
      added_date: '2024-01-08'
    },
    {
      id: '5',
      type: 'product',
      name: 'Beard Grooming Kit',
      description: 'Complete kit with oil, balm, and comb',
      price: 49.99,
      sale_price: 39.99,
      rating: 4.7,
      total_reviews: 98,
      image_url: '/products/beard-kit-1.jpg',
      seller_name: 'Gentleman\'s Choice',
      added_date: '2024-01-05'
    }
  ])

  const tabs = [
    { id: 'all', name: 'All Favorites', count: favorites.length },
    { id: 'products', name: 'Products', count: favorites.filter(f => f.type === 'product').length },
    { id: 'providers', name: 'Providers', count: favorites.filter(f => f.type === 'provider').length }
  ]

  const filteredFavorites = activeTab === 'all' 
    ? favorites 
    : favorites.filter(item => item.type === activeTab.slice(0, -1) as 'product' | 'provider')

  const removeFavorite = (itemId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId))
  }

  const handleAddToCart = (item: FavoriteItem) => {
    if (item.type === 'product') {
      dispatch(addToCart({
        id: `cart-${item.id}`,
        product_id: item.id,
        name: item.name,
        price: item.sale_price || item.price || 0,
        quantity: 1,
        image_url: item.image_url,
        seller_id: 'seller-id'
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
          <p className="text-gray-600">Keep track of products and providers you love</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'all' | 'products' | 'providers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {filteredFavorites.map((item, index) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.5
                    }
                  }
                }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  <div className="relative">
                    {/* Image */}
                    <div className="aspect-video bg-gray-200 relative overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        {item.type === 'product' ? (
                          <TagIcon className="h-16 w-16 text-primary-400" />
                        ) : (
                          <div className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                              {item.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Remove from favorites button */}
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-sm"
                      >
                        <HeartIconSolid className="h-4 w-4 text-red-500" />
                      </button>

                      {/* Sale badge for products */}
                      {item.type === 'product' && item.sale_price && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          SALE
                        </div>
                      )}

                      {/* Quick actions overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <Link href={item.type === 'product' ? `/products/${item.id}` : `/providers/${item.id}`}>
                          <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                            <EyeIcon className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="bg-white/90 text-gray-900 hover:bg-white">
                          <ShareIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Type badge */}
                      <div className="mb-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'product' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.type === 'product' ? '🛍️ Product' : '✂️ Provider'}
                        </span>
                      </div>

                      {/* Name and rating */}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center ml-2">
                          <StarIcon className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                      {/* Product specific info */}
                      {item.type === 'product' && (
                        <>
                          {/* Price */}
                          <div className="flex items-center space-x-2 mb-3">
                            {item.sale_price ? (
                              <>
                                <span className="text-lg font-bold text-primary-600">${item.sale_price}</span>
                                <span className="text-sm text-gray-500 line-through">${item.price}</span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-gray-900">${item.price}</span>
                            )}
                          </div>

                          {/* Seller */}
                          <p className="text-xs text-gray-500 mb-4">
                            Sold by: <span className="text-primary-600">{item.seller_name}</span>
                          </p>
                        </>
                      )}

                      {/* Provider specific info */}
                      {item.type === 'provider' && (
                        <>
                          {/* Specialties */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.specialties?.slice(0, 2).map(specialty => (
                              <span
                                key={specialty}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>

                          {/* Location */}
                          <p className="text-xs text-gray-500 mb-4">
                            📍 {item.location}
                          </p>
                        </>
                      )}

                      {/* Added date */}
                      <p className="text-xs text-gray-400 mb-4">
                        Added on {new Date(item.added_date).toLocaleDateString()}
                      </p>

                      {/* Action buttons */}
                      <div className="space-y-2">
                        {item.type === 'product' ? (
                          <Button
                            onClick={() => handleAddToCart(item)}
                            className="w-full"
                            size="sm"
                          >
                            <ShoppingCartIcon className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        ) : (
                          <Button className="w-full" size="sm">
                            Book Appointment
                          </Button>
                        )}
                        
                        <Button
                          onClick={() => removeFavorite(item.id)}
                          variant="outline"
                          size="sm"
                          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <XMarkIcon className="h-4 w-4 mr-2" />
                          Remove from Favorites
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <HeartIcon className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {activeTab === 'all' 
                ? 'No favorites yet' 
                : `No ${activeTab} in favorites`}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {activeTab === 'all'
                ? 'Start exploring our products and service providers to add them to your favorites!'
                : `Browse our ${activeTab} and add the ones you love to your favorites.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button>
                  Browse Products
                </Button>
              </Link>
              <Link href="/providers">
                <Button variant="outline">
                  Find Providers
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Tips */}
        {filteredFavorites.length > 0 && (
          <Card className="mt-12">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Favorites Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Stay Updated</h4>
                  <p>Get notified when your favorite products go on sale or when your preferred providers have availability.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Quick Access</h4>
                  <p>Easily find and reorder products you love or book with providers you trust.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Share & Compare</h4>
                  <p>Share your favorites with friends or compare different options side by side.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}