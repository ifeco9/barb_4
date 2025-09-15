'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UsersIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  EyeIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export function AdminDashboard() {
  const { user } = useSelector((state: RootState) => state.auth)

  const platformStats = {
    totalUsers: 1245,
    activeProviders: 89,
    totalBookings: 2340,
    monthlyRevenue: 45780,
    pendingVerifications: 12,
    reportedIssues: 3
  }

  const recentActivity = [
    {
      id: '1',
      type: 'user_registration',
      description: 'New provider registration: Sarah Johnson',
      timestamp: '5 minutes ago',
      status: 'pending'
    },
    {
      id: '2',
      type: 'booking',
      description: 'Booking dispute reported by customer',
      timestamp: '1 hour ago',
      status: 'urgent'
    },
    {
      id: '3',
      type: 'review',
      description: 'Inappropriate review flagged for moderation',
      timestamp: '2 hours ago',
      status: 'review'
    }
  ]

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage users and permissions',
      href: '/admin/users',
      icon: UsersIcon,
      color: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      title: 'Provider Verification',
      description: 'Review pending verifications',
      href: '/admin/verifications',
      icon: ShieldCheckIcon,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Content Moderation',
      description: 'Review flagged content',
      href: '/admin/moderation',
      icon: EyeIcon,
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      title: 'Platform Settings',
      description: 'Configure system settings',
      href: '/admin/settings',
      icon: Cog6ToothIcon,
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard 🛡️
        </h1>
        <p className="text-gray-600 mt-2">
          Platform overview and management tools
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action) => (
          <Card key={action.title} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`inline-flex p-3 rounded-lg ${action.color} text-white mb-4`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="p-2 bg-blue-100 rounded-lg inline-flex mb-2">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="p-2 bg-green-100 rounded-lg inline-flex mb-2">
                <BuildingStorefrontIcon className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{platformStats.activeProviders}</p>
              <p className="text-sm text-gray-600">Active Providers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="p-2 bg-purple-100 rounded-lg inline-flex mb-2">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{platformStats.totalBookings.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="p-2 bg-green-100 rounded-lg inline-flex mb-2">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${platformStats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="p-2 bg-yellow-100 rounded-lg inline-flex mb-2">
                <ShieldCheckIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{platformStats.pendingVerifications}</p>
              <p className="text-sm text-gray-600">Pending Verifications</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="p-2 bg-red-100 rounded-lg inline-flex mb-2">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{platformStats.reportedIssues}</p>
              <p className="text-sm text-gray-600">Reported Issues</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className={`p-1 rounded-full ${
                    activity.status === 'urgent' ? 'bg-red-100' :
                    activity.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'urgent' ? 'bg-red-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-green-800">API Service</span>
                </div>
                <span className="text-xs text-green-600">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-green-800">Database</span>
                </div>
                <span className="text-xs text-green-600">Healthy</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-green-800">Payment System</span>
                </div>
                <span className="text-xs text-green-600">Operational</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-yellow-800">Email Service</span>
                </div>
                <span className="text-xs text-yellow-600">Slow Response</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart Placeholder */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Platform Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Comprehensive analytics dashboard coming soon</p>
              <p className="text-sm text-gray-500">User growth, revenue trends, and platform metrics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}