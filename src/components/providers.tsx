'use client'

import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { Suspense } from 'react'

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Barberng...</p>
      </div>
    </div>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </Suspense>
    </Provider>
  )
}