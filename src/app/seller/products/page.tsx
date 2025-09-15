'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  StarIcon,
  ArchiveBoxIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  category: string
  price: number
  sale_price?: number
  stock_quantity: number
  total_sales: number
  rating: number
  total_reviews: number
  is_active: boolean
  created_at: string
  image_url: string
}

export default function SellerProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showFilters, setShowFilters] = useState(false)

  // Mock products data - replace with real API calls
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Hair Oil',
      category: 'hair-care',
      price: 45.99,
      sale_price: 35.99,
      stock_quantity: 25,
      total_sales: 142,
      rating: 4.8,
      total_reviews: 89,
      is_active: true,
      created_at: '2024-01-15',
      image_url: '/products/hair-oil-1.jpg'
    },
    {
      id: '2',
      name: 'Moisturizing Face Cream',
      category: 'skincare',
      price: 28.99,
      stock_quantity: 45,
      total_sales: 203,
      rating: 4.6,
      total_reviews: 156,
      is_active: true,
      created_at: '2024-01-10',
      image_url: '/products/face-cream-1.jpg'
    },
    {
      id: '3',
      name: 'Styling Pomade',
      category: 'styling',
      price: 22.99,
      stock_quantity: 33,
      total_sales: 98,
      rating: 4.4,
      total_reviews: 67,
      is_active: true,
      created_at: '2024-01-08',
      image_url: '/products/pomade-1.jpg'
    },
    {
      id: '4',
      name: 'Beard Grooming Kit',
      category: 'beard-care',
      price: 49.99,
      sale_price: 39.99,
      stock_quantity: 18,
      total_sales: 78,
      rating: 4.7,
      total_reviews: 45,
      is_active: false,
      created_at: '2024-01-05',
      image_url: '/products/beard-kit-1.jpg'
    },
    {
      id: '5',
      name: 'Nail Polish Set',
      category: 'nail-care',
      price: 34.99,
      stock_quantity: 0,
      total_sales: 156,
      rating: 4.5,
      total_reviews: 89,
      is_active: true,
      created_at: '2024-01-02',
      image_url: '/products/nail-polish-1.jpg'
    }
  ])

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'hair-care', name: 'Hair Care' },
    { id: 'skincare', name: 'Skin Care' },
    { id: 'styling', name: 'Styling' },
    { id: 'beard-care', name: 'Beard Care' },
    { id: 'nail-care', name: 'Nail Care' }
  ]

  const sortOptions = [
    { id: 'created_at', name: 'Date Created' },
    { id: 'name', name: 'Product Name' },
    { id: 'price', name: 'Price' },
    { id: 'stock_quantity', name: 'Stock' },
    { id: 'total_sales', name: 'Sales' },
    { id: 'rating', name: 'Rating' }
  ]

  const filteredAndSortedProducts = products
    .filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Product]
      const bValue = b[sortBy as keyof Product]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })

  // Calculate stats
  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.is_active).length,
    outOfStock: products.filter(p => p.stock_quantity === 0).length,
    totalRevenue: products.reduce((sum, p) => sum + (p.total_sales * (p.sale_price || p.price)), 0),
    averageRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length
  }

  const toggleProductStatus = (productId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggling status for product ${productId}`)
  }

  const deleteProduct = (productId: string) => {
    // In a real app, this would make an API call
    console.log(`Deleting product ${productId}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
            <p className="text-gray-600">Manage your product inventory and sales</p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/seller/products/new">
              <Button className="mt-4 sm:mt-0">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Product
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
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
        <motion.div
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-lg mr-4">
                  <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  <p className="text-sm text-gray-600">Total Products</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-4">
                  <EyeIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
                  <p className="text-sm text-gray-600">Active Products</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg mr-4">
                  <ArchiveBoxIcon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-4">
                  <StarIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Filters and Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>

              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>

                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {sortOrder === 'asc' ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Sales</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">📦</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
                        {product.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        {product.sale_price ? (
                          <>
                            <span className="font-semibold text-primary-600">${product.sale_price}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                          </>
                        ) : (
                          <span className="font-semibold text-gray-900">${product.price}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${
                        product.stock_quantity === 0 
                          ? 'text-red-600' 
                          : product.stock_quantity < 10 
                            ? 'text-yellow-600' 
                            : 'text-green-600'
                      }`}>
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{product.total_sales}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({product.total_reviews})</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={product.is_active}
                          onChange={() => toggleProductStatus(product.id)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Link href={`/products/${product.id}`}>
                          <Button size="sm" variant="outline">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/seller/products/${product.id}/edit`}>
                          <Button size="sm" variant="outline">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || selectedCategory !== 'all' 
                    ? 'Try adjusting your search criteria' 
                    : 'Start by adding your first product'}
                </p>
                <Link href="/seller/products/new">
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}