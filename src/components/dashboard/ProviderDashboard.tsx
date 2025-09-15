'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { RootState } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CalendarIcon,
  ChartBarIcon,
  ScissorsIcon,
  StarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export function ProviderDashboard() {
  const { user } = useSelector((state: RootState) => state.auth)

  // Mock data - replace with real API calls
  const todayAppointments = [
    {
      id: '1',
      customer: 'John Doe',
      service: 'Haircut & Style',
      time: '10:00 AM',
      duration: '45 min',
      price: 45,
      status: 'confirmed'
    },
    {
      id: '2',
      customer: 'Jane Smith',
      service: 'Color Treatment',
      time: '2:00 PM',
      duration: '120 min',
      price: 120,
      status: 'confirmed'
    },
    {
      id: '3',
      customer: 'Mike Johnson',
      service: 'Beard Trim',
      time: '4:30 PM',
      duration: '30 min',
      price: 25,
      status: 'pending'
    }
  ]

  const recentReviews = [
    {
      id: '1',
      customer: 'Sarah Wilson',
      rating: 5,
      comment: 'Amazing haircut! Exactly what I wanted.',
      date: '2025-09-12',
      service: 'Haircut & Style'
    },
    {
      id: '2',
      customer: 'David Brown',
      rating: 5,
      comment: 'Great experience, will definitely come back.',
      date: '2025-09-11',
      service: 'Beard Trim'
    }
  ]

  const quickActions = [
    {
      title: 'Manage Bookings',
      description: 'View and manage appointments',
      href: '/provider/bookings',
      icon: CalendarIcon,
      color: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      title: 'Update Portfolio',
      description: 'Add work to showcase',
      href: '/provider/portfolio',
      icon: EyeIcon,
      color: 'bg-secondary-500 hover:bg-secondary-600'
    },
    {
      title: 'Manage Services',
      description: 'Edit services and pricing',
      href: '/provider/services',
      icon: ScissorsIcon,
      color: 'bg-accent-500 hover:bg-accent-600'
    },
    {
      title: 'Set Availability',
      description: 'Update your schedule',
      href: '/provider/availability',
      icon: ChartBarIcon,
      color: 'bg-green-500 hover:bg-green-600'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Good morning, {user?.user_metadata?.full_name || 'Provider'}! ✂️
        </h1>
        <p className="text-gray-600 mt-2">
          You have {todayAppointments.length} appointments today
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <CalendarIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Today's Appointments</p>
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
                <p className="text-2xl font-bold text-gray-900">$1,250</p>
                <p className="text-sm text-gray-600">This Week's Earnings</p>
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
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-4">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">127</p>
                <p className="text-sm text-gray-600">Total Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{appointment.customer}</h4>
                      <p className="text-sm text-gray-600">{appointment.service}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>{appointment.time}</span>
                      <span>{appointment.duration}</span>
                    </div>
                    <span className="font-semibold text-primary-600">
                      ${appointment.price}
                    </span>
                  </div>
                </div>
              ))}
                <Link href="/provider/appointments">
                  <Button variant="outline" className="w-full">
                    View All Appointments
                  </Button>
                </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <StarIcon className="h-5 w-5 mr-2" />
              Recent Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{review.customer}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">"{review.comment}"</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{review.service}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
              <Link href="/provider/reviews">
                <Button variant="outline" className="w-full">
                  View All Reviews
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Analytics chart coming soon</p>
              <p className="text-sm text-gray-500">Track your bookings, earnings, and customer satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}