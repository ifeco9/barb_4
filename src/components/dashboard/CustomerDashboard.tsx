'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { RootState } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CalendarIcon,
  HeartIcon,
  ShoppingBagIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon
} from '@heroicons/react/24/outline'

export function CustomerDashboard() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [favoriteProviders, setFavoriteProviders] = useState([])

  // Mock data - replace with real API calls
  const mockAppointments = [
    {
      id: '1',
      provider: 'Sarah Johnson',
      service: 'Haircut & Style',
      date: '2025-09-15',
      time: '2:00 PM',
      price: 45,
      status: 'confirmed'
    },
    {
      id: '2',
      provider: 'Mike Chen',
      service: 'Beard Trim',
      date: '2025-09-18',
      time: '10:30 AM',
      price: 25,
      status: 'pending'
    }
  ]

  const mockOrders = [
    {
      id: 'ORD-001',
      items: 2,
      total: 89.99,
      status: 'delivered',
      date: '2025-09-10'
    },
    {
      id: 'ORD-002',
      items: 1,
      total: 34.99,
      status: 'shipped',
      date: '2025-09-12'
    }
  ]

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Find and book with top providers',
      href: '/services',
      icon: CalendarIcon,
      color: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      title: 'Shop Products',
      description: 'Browse beauty products',
      href: '/products',
      icon: ShoppingBagIcon,
      color: 'bg-secondary-500 hover:bg-secondary-600'
    },
    {
      title: 'Find Providers',
      description: 'Discover new stylists',
      href: '/providers',
      icon: UserIcon,
      color: 'bg-accent-500 hover:bg-accent-600'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.user_metadata?.full_name || 'Customer'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your appointments and orders
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockAppointments.length > 0 ? (
              <div className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.service}</h4>
                        <p className="text-sm text-gray-600">with {appointment.provider}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </div>
                      <div className="font-semibold text-primary-600">
                        ${appointment.price}
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/appointments">
                  <Button variant="outline" className="w-full">
                    View All Appointments
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No upcoming appointments</p>
                <Link href="/services">
                  <Button>Book Your First Appointment</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockOrders.length > 0 ? (
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">Order {order.id}</h4>
                        <p className="text-sm text-gray-600">{order.items} items</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{order.date}</span>
                      <span className="font-semibold text-primary-600">${order.total}</span>
                    </div>
                  </div>
                ))}
                <Link href="/orders">
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingBagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No recent orders</p>
                <Link href="/products">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg mr-4">
                <CalendarIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Total Appointments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-secondary-100 rounded-lg mr-4">
                <HeartIcon className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Favorite Providers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-accent-100 rounded-lg mr-4">
                <ShoppingBagIcon className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Orders Placed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-4">
                <StarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">150</p>
                <p className="text-sm text-gray-600">Loyalty Points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}