'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { RootState } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProviderLayout } from '@/components/layout/ProviderLayout'
import { 
  PlusIcon,
  PhotoIcon,
  ScissorsIcon,
  StarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function ProviderPortfolioPage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock portfolio data - replace with real data from Supabase
  const portfolioItems = [
    {
      id: '1',
      image: '/portfolio/haircut-1.jpg',
      title: 'Modern Fade Cut',
      category: 'haircut',
      description: 'Clean modern fade with textured top',
      likes: 24,
      date: '2025-09-10'
    },
    {
      id: '2',
      image: '/portfolio/color-1.jpg',
      title: 'Balayage Highlights',
      category: 'coloring',
      description: 'Natural-looking balayage with honey tones',
      likes: 18,
      date: '2025-09-08'
    },
    {
      id: '3',
      image: '/portfolio/styling-1.jpg',
      title: 'Wedding Updo',
      category: 'styling',
      description: 'Elegant bridal hairstyle with floral accents',
      likes: 31,
      date: '2025-09-05'
    },
    {
      id: '4',
      image: '/portfolio/beard-1.jpg',
      title: 'Classic Beard Trim',
      category: 'beard',
      description: 'Traditional beard shaping and grooming',
      likes: 15,
      date: '2025-09-03'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Work', count: portfolioItems.length },
    { id: 'haircut', name: 'Haircuts', count: portfolioItems.filter(item => item.category === 'haircut').length },
    { id: 'coloring', name: 'Coloring', count: portfolioItems.filter(item => item.category === 'coloring').length },
    { id: 'styling', name: 'Styling', count: portfolioItems.filter(item => item.category === 'styling').length },
    { id: 'beard', name: 'Beard Care', count: portfolioItems.filter(item => item.category === 'beard').length }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <ProviderLayout>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio</h1>
              <p className="text-gray-600">Showcase your best work to attract new clients</p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button className="mt-4 sm:mt-0">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Work
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-100 rounded-lg mr-4">
                    <PhotoIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{portfolioItems.length}</p>
                    <p className="text-sm text-gray-600">Total Photos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-secondary-100 rounded-lg mr-4">
                    <EyeIcon className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-sm text-gray-600">Total Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-accent-100 rounded-lg mr-4">
                    <StarIcon className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">88</p>
                    <p className="text-sm text-gray-600">Total Likes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-4">
                    <ScissorsIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                    <p className="text-sm text-gray-600">Bookings from Portfolio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory} // Re-animate when category changes
        >
          {filteredItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  {/* Placeholder image - replace with actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <PhotoIcon className="h-16 w-16 text-primary-400" />
                  </div>
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white rounded-full text-gray-700 hover:text-primary-600 transition-colors">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 bg-white rounded-full text-gray-700 hover:text-primary-600 transition-colors">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 transition-colors">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white bg-opacity-90 rounded-full text-xs font-medium text-gray-700 capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <StarIcon className="h-4 w-4 mr-1" />
                      {item.likes} likes
                    </div>
                    <span className="text-gray-500">{item.date}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No work in this category</h3>
            <p className="text-gray-600 mb-6">Start building your portfolio by adding photos of your best work.</p>
            <Button>
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Your First Photo
            </Button>
          </motion.div>
        )}

        {/* Upload Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PhotoIcon className="h-5 w-5 mr-2" />
              Portfolio Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Photo Quality</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use high-resolution images (at least 1080px)</li>
                  <li>• Ensure good lighting and clear focus</li>
                  <li>• Show before and after results when possible</li>
                  <li>• Include different angles and close-ups</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Practices</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Add detailed descriptions of techniques used</li>
                  <li>• Include the time spent on each service</li>
                  <li>• Tag relevant skills and specialties</li>
                  <li>• Update your portfolio regularly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </ProviderLayout>
  )
}