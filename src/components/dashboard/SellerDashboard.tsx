'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { RootState } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ShoppingBagIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  PackageIcon,
  TruckIcon,
  StarIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export function SellerDashboard() {
  const { user } = useSelector((state: RootState) => state.auth)

  // Mock data
  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Alice Johnson',
      product: 'Premium Shampoo Set',
      quantity: 2,
      total: 89.99,
      status: 'shipped',
      date: '2025-09-13'
    },
    {
      id: 'ORD-002',
      customer: 'Bob Smith',
      product: 'Hair Styling Cream',
      quantity: 1,
      total: 24.99,
      status: 'processing',
      date: '2025-09-13'
    }
  ]

  const topProducts = [
    {
      id: '1',
      name: 'Premium Shampoo Set',
      sales: 45,
      revenue: 899.99,
      stock: 12
    },
    {
      id: '2',
      name: 'Hair Styling Cream',
      sales: 32,
      revenue: 799.68,
      stock: 8
    }
  ]

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'List a new product for sale',
      href: '/seller/products/new',
      icon: PlusIcon,
      color: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      title: 'Manage Products',
      description: 'View and edit your inventory',
      href: '/seller/products',
      icon: PackageIcon,
      color: 'bg-secondary-500 hover:bg-secondary-600'
    },
    {
      title: 'View Analytics',
      description: 'Track sales performance',
      href: '/seller/analytics',
      icon: ChartBarIcon,
      color: 'bg-accent-500 hover:bg-accent-600'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.user_metadata?.full_name || 'Seller'}! 🛍️
        </h1>
        <p className="text-gray-600 mt-2">
          You have {recentOrders.length} new orders to process
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${action.color} text-white mr-4`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg mr-4">
                <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Products Listed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">$2,150</p>
                <p className="text-sm text-gray-600">This Month's Sales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-4">
                <TruckIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Orders Fulfilled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg mr-4">
                <StarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-600">Product Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{order.id}</h4>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'shipped' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{order.product} × {order.quantity}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{order.date}</span>
                    <span className="font-semibold text-primary-600">${order.total}</span>
                  </div>
                </div>
              ))}
              <Link href="/seller/orders">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PackageIcon className="h-5 w-5 mr-2" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.stock > 10 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Sales: </span>
                      <span className="font-semibold">{product.sales}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Revenue: </span>
                      <span className="font-semibold text-primary-600">${product.revenue}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/seller/products">
                <Button variant="outline" className="w-full">
                  Manage Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart Placeholder */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Sales Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Sales analytics coming soon</p>
              <p className="text-sm text-gray-500">Track your product performance and revenue trends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}