'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { EnvelopeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-6">
                <EnvelopeIcon className="h-8 w-8 text-primary-600" />
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verify your email
              </h2>
              
              {/* Description */}
              <p className="text-gray-600 mb-6">
                We've sent a verification email to your inbox. Please click the link in the email to verify your account and complete your registration.
              </p>
              
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-800">
                      <strong>Didn't receive the email?</strong> Check your spam folder or wait a few minutes for it to arrive.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-4">
                <Button className="w-full" disabled>
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Resend verification email
                </Button>
                
                <Link href="/auth/signin">
                  <Button variant="outline" className="w-full">
                    Back to sign in
                  </Button>
                </Link>
              </div>
              
              {/* Help text */}
              <p className="mt-6 text-xs text-gray-500">
                Having trouble? Contact our{' '}
                <Link href="/support" className="text-primary-600 hover:text-primary-500">
                  support team
                </Link>{' '}
                for help.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}