'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { CustomerDashboard } from '@/components/dashboard/CustomerDashboard'
import { ProviderDashboard } from '@/components/dashboard/ProviderDashboard'
import { SalonDashboard } from '@/components/dashboard/SalonDashboard'
import { SellerDashboard } from '@/components/dashboard/SellerDashboard'
import { AdminDashboard } from '@/components/dashboard/AdminDashboard'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const { isAuthenticated, userRole } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    redirect('/auth/signin')
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'customer':
        return <CustomerDashboard />
      case 'provider':
        return <ProviderDashboard />
      case 'salon':
        return <SalonDashboard />
      case 'seller':
        return <SellerDashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return <CustomerDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderDashboard()}
    </div>
  )
}