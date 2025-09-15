'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { RootState } from '@/store'
import { addToCart } from '@/store/slices/cartSlice'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
  AdjustmentsHorizontalIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface Product {
  id: string
  name: string
  description: string
  brand: string
  category: string
  price: number
  sale_price?: number
  images: string[]
  rating: number
  total_reviews: number
  is_featured: boolean
  seller_name: string
  seller_id: string
  stock_quantity: number
  tags: string[]
}

export default function ProductsPage() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  // Mock product data - replace with real API calls
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Hair Oil',
      description: 'Nourishing argan oil blend for healthy, shiny hair',
      brand: 'NaturalGlow',
      category: 'hair-care',
      price: 45.99,
      sale_price: 35.99,
      images: ['/products/hair-oil-1.jpg', '/products/hair-oil-2.jpg'],
      rating: 4.8,
      total_reviews: 142,
      is_featured: true,
      seller_name: 'Beauty Essentials Store',
      seller_id: 'seller-1',
      stock_quantity: 25,
      tags: ['organic', 'vegan', 'cruelty-free']
    },
    {
      id: '2',
      name: 'Professional Hair Clippers',
      description: 'High-quality clippers for professional barbering',
      brand: 'ProCut',
      category: 'tools',
      price: 129.99,
      images: ['/products/clippers-1.jpg'],
      rating: 4.9,
      total_reviews: 89,
      is_featured: true,
      seller_name: 'Barber Supply Co',
      seller_id: 'seller-2',
      stock_quantity: 12,
      tags: ['professional', 'cordless']
    },
    {
      id: '3',
      name: 'Moisturizing Face Cream',
      description: 'Deep hydration cream with hyaluronic acid',
      brand: 'SkinLux',
      category: 'skincare',
      price: 28.99,
      images: ['/products/face-cream-1.jpg'],
      rating: 4.6,
      total_reviews: 203,
      is_featured: false,
      seller_name: 'Skin Care Paradise',
      seller_id: 'seller-3',
      stock_quantity: 45,
      tags: ['hyaluronic-acid', 'sensitive-skin']
    },
    {
      id: '4',
      name: 'Styling Pomade',
      description: 'Strong hold pomade for versatile styling',
      brand: 'StyleMaster',
      category: 'styling',
      price: 22.99,
      images: ['/products/pomade-1.jpg'],
      rating: 4.4,
      total_reviews: 156,
      is_featured: false,
      seller_name: 'Hair Style Hub',
      seller_id: 'seller-4',
      stock_quantity: 33,
      tags: ['strong-hold', 'matte-finish']
    },
    {
      id: '5',
      name: 'Beard Grooming Kit',
      description: 'Complete kit with oil, balm, and comb',
      brand: 'BeardCraft',
      category: 'beard-care',
      price: 49.99,
      sale_price: 39.99,
      images: ['/products/beard-kit-1.jpg'],
      rating: 4.7,
      total_reviews: 98,
      is_featured: true,
      seller_name: 'Gentleman\'s Choice',
      seller_id: 'seller-5',
      stock_quantity: 18,
      tags: ['complete-kit', 'natural-ingredients']
    },
    {
      id: '6',
      name: 'Nail Polish Set',
      description: 'Vibrant collection of 12 premium nail polishes',
      brand: 'ColorPop',
      category: 'nail-care',
      price: 34.99,
      images: ['/products/nail-polish-1.jpg'],
      rating: 4.5,
      total_reviews: 78,
      is_featured: false,
      seller_name: 'Nail Art Studio',
      seller_id: 'seller-6',
      stock_quantity: 22,
      tags: ['long-lasting', 'quick-dry']
    }
  ])

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'hair-care', name: 'Hair Care', count: products.filter(p => p.category === 'hair-care').length },
    { id: 'skincare', name: 'Skin Care', count: products.filter(p => p.category === 'skincare').length },
    { id: 'styling', name: 'Styling', count: products.filter(p => p.category === 'styling').length },
    { id: 'tools', name: 'Tools', count: products.filter(p => p.category === 'tools').length },
    { id: 'beard-care', name: 'Beard Care', count: products.filter(p => p.category === 'beard-care').length },
    { id: 'nail-care', name: 'Nail Care', count: products.filter(p => p.category === 'nail-care').length }
  ]

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest' }
  ]

  const filteredAndSortedProducts = products
    .filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) return false
      const price = product.sale_price || product.price
      if (price < priceRange[0] || price > priceRange[1]) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.sale_price || a.price) - (b.sale_price || b.price)
        case 'price-high':
          return (b.sale_price || b.price) - (a.sale_price || a.price)
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return b.id.localeCompare(a.id)
        case 'featured':
        default:
          return b.is_featured ? 1 : -1
      }
    })

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      id: `cart-${product.id}`,
      product_id: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      quantity: 1,
      image_url: product.images[0],
      seller_id: product.seller_id
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Beauty Products</h1>
          <p className="text-gray-600">Professional beauty products for all your needs</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, brands, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>

            <p className="text-sm text-gray-600">
              {filteredAndSortedProducts.length} products found
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Additional filters can be added here */}
              </div>
            </motion.div>
          )}
        </div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
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
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-200 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <TagIcon className="h-16 w-16 text-primary-400" />
                    </div>
                    
                    {/* Sale Badge */}
                    {product.sale_price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        SALE
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                      {favorites.includes(product.id) ? (
                        <HeartIconSolid className="h-4 w-4 text-red-500" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link href={`/products/${product.id}`}>
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                          Quick View
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    {/* Brand & Rating */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 uppercase font-medium">{product.brand}</span>
                      <div className="flex items-center">
                        <StarIcon className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-3">
                      {product.sale_price ? (
                        <>
                          <span className="text-lg font-bold text-primary-600">${product.sale_price}</span>
                          <span className="text-sm text-gray-500 line-through">${product.price}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stock Status */}
                    <div className="mb-3">
                      {product.stock_quantity > 0 ? (
                        <span className="text-xs text-green-600">✓ In Stock ({product.stock_quantity})</span>
                      ) : (
                        <span className="text-xs text-red-600">✗ Out of Stock</span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                      className="w-full"
                      size="sm"
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <TagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse different categories
            </p>
            <Button onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setPriceRange([0, 500])
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}