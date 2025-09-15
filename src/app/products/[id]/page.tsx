'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { addToCart } from '@/store/slices/cartSlice'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ShareIcon,
  MinusIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface ProductDetails {
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
  seller_name: string
  seller_id: string
  stock_quantity: number
  ingredients: string[]
  instructions: string
  tags: string[]
  variants?: Array<{
    id: string
    name: string
    value: string
    price_modifier?: number
  }>
  specifications: Record<string, string>
}

interface Review {
  id: string
  user_name: string
  user_avatar?: string
  rating: number
  title: string
  comment: string
  date: string
  verified_purchase: boolean
  helpful_count: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  // Mock product data - replace with real API call using params.id
  const product: ProductDetails = {
    id: params.id as string,
    name: 'Premium Hair Oil',
    description: 'Our signature hair oil blend combines the finest argan oil with vitamin E and essential nutrients to deeply nourish and revitalize your hair. Perfect for all hair types, this lightweight formula absorbs quickly without leaving a greasy residue.',
    brand: 'NaturalGlow',
    category: 'hair-care',
    price: 45.99,
    sale_price: 35.99,
    images: [
      '/products/hair-oil-1.jpg',
      '/products/hair-oil-2.jpg',
      '/products/hair-oil-3.jpg',
      '/products/hair-oil-4.jpg'
    ],
    rating: 4.8,
    total_reviews: 142,
    seller_name: 'Beauty Essentials Store',
    seller_id: 'seller-1',
    stock_quantity: 25,
    ingredients: [
      'Argania Spinosa Kernel Oil (Argan Oil)',
      'Tocopherol (Vitamin E)',
      'Simmondsia Chinensis (Jojoba) Seed Oil',
      'Rosmarinus Officinalis (Rosemary) Leaf Extract',
      'Lavandula Angustifolia (Lavender) Oil'
    ],
    instructions: 'Apply 2-3 drops to damp or dry hair, focusing on mid-lengths and ends. Can be used daily as a leave-in treatment or weekly as an intensive mask.',
    tags: ['organic', 'vegan', 'cruelty-free', 'sulfate-free'],
    variants: [
      { id: 'size-50ml', name: 'Size', value: '50ml', price_modifier: 0 },
      { id: 'size-100ml', name: 'Size', value: '100ml', price_modifier: 15 },
      { id: 'size-200ml', name: 'Size', value: '200ml', price_modifier: 25 }
    ],
    specifications: {
      'Volume': '50ml / 1.7 fl oz',
      'Hair Type': 'All hair types',
      'Application': 'Leave-in treatment',
      'Origin': 'Morocco',
      'Shelf Life': '24 months'
    }
  }

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: '1',
      user_name: 'Sarah M.',
      rating: 5,
      title: 'Amazing results!',
      comment: 'This hair oil has completely transformed my dry, damaged hair. It\'s so much shinier and softer now.',
      date: '2024-01-10',
      verified_purchase: true,
      helpful_count: 12
    },
    {
      id: '2',
      user_name: 'Jessica L.',
      rating: 4,
      title: 'Great product, fast delivery',
      comment: 'Love the texture and smell. My hair feels healthier after just one week of use.',
      date: '2024-01-08',
      verified_purchase: true,
      helpful_count: 8
    },
    {
      id: '3',
      user_name: 'Maria K.',
      rating: 5,
      title: 'Perfect for my curly hair',
      comment: 'Finally found a hair oil that doesn\'t weigh down my curls. Highly recommend!',
      date: '2024-01-05',
      verified_purchase: true,
      helpful_count: 15
    }
  ]

  const handleAddToCart = () => {
    const finalPrice = product.sale_price || product.price
    const variantModifier = selectedVariant ? 
      product.variants?.find(v => v.id === selectedVariant)?.price_modifier || 0 : 0
    
    dispatch(addToCart({
      id: `cart-${product.id}-${selectedVariant || 'default'}`,
      product_id: product.id,
      name: product.name,
      price: finalPrice + variantModifier,
      quantity: quantity,
      image_url: product.images[0],
      seller_id: product.seller_id,
      variant: selectedVariant ? 
        product.variants?.find(v => v.id === selectedVariant)?.value : undefined
    }))
  }

  const incrementQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const calculatePrice = () => {
    const basePrice = product.sale_price || product.price
    const variantModifier = selectedVariant ? 
      product.variants?.find(v => v.id === selectedVariant)?.price_modifier || 0 : 0
    return (basePrice + variantModifier) * quantity
  }

  const tabs = [
    { id: 'description', name: 'Description' },
    { id: 'ingredients', name: 'Ingredients' },
    { id: 'instructions', name: 'How to Use' },
    { id: 'specifications', name: 'Specifications' },
    { id: 'reviews', name: `Reviews (${product.total_reviews})` }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-primary-600 capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/products">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧴</div>
                  <p className="text-primary-600 font-medium">{product.name}</p>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-primary-500' : 'border-transparent'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <span className="text-2xl">🧴</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-primary-600 font-medium uppercase text-sm">{product.brand}</span>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isFavorite ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.total_reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              {product.sale_price ? (
                <>
                  <span className="text-3xl font-bold text-primary-600">
                    ${(product.sale_price + (selectedVariant ? 
                      product.variants?.find(v => v.id === selectedVariant)?.price_modifier || 0 : 0)).toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${(product.price + (selectedVariant ? 
                      product.variants?.find(v => v.id === selectedVariant)?.price_modifier || 0 : 0)).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    Save ${(product.price - product.sale_price).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${(product.price + (selectedVariant ? 
                    product.variants?.find(v => v.id === selectedVariant)?.price_modifier || 0 : 0)).toFixed(2)}
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedVariant === variant.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {variant.value}
                      {variant.price_modifier ? ` (+$${variant.price_modifier})` : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock_quantity}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Stock Status */}
                <div className="flex items-center">
                  {product.stock_quantity > 0 ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {product.stock_quantity} in stock
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">Out of stock</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${calculatePrice().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className="w-full"
                size="lg"
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="lg">
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="lg">
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <TruckIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Free shipping over $50</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">30-day return policy</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {product.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-500 mr-2">•</span>
                      <span className="text-gray-600">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
                <p className="text-gray-600 leading-relaxed">{product.instructions}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{review.user_name}</span>
                            {review.verified_purchase && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIconSolid
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-600 mb-3">{review.comment}</p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Helpful ({review.helpful_count})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}