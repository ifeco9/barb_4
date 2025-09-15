'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ChevronLeftIcon, 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  CreditCardIcon 
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ServiceSelector } from '@/components/booking/ServiceSelector'
import { DateTimeSelector } from '@/components/booking/DateTimeSelector'
import { LocationSelector } from '@/components/booking/LocationSelector'
import { BookingSummary } from '@/components/booking/BookingSummary'
import { PaymentMethod } from '@/components/booking/PaymentMethod'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
}

interface Provider {
  id: string
  name: string
  businessName: string
  avatar: string
  rating: number
  address: string
  services: Service[]
}

interface BookingData {
  serviceId: string
  date: string
  time: string
  location: 'salon' | 'home'
  customerAddress?: string
  notes?: string
  paymentMethod?: string
}

export default function BookingPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [provider, setProvider] = useState<Provider | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceId: searchParams.get('service') || '',
    date: '',
    time: '',
    location: 'salon',
    notes: ''
  })

  // Mock provider data
  const mockProvider: Provider = {
    id: params.id as string,
    name: 'Sarah Johnson',
    businessName: 'Elite Hair Studio',
    avatar: '/avatars/sarah.jpg',
    rating: 4.9,
    address: '123 Beauty Ave, New York, NY 10001',
    services: [
      {
        id: '1',
        name: 'Signature Haircut & Style',
        description: 'Personalized cut and styling tailored to your face shape',
        price: 85,
        duration: 90,
        category: 'Haircut'
      },
      {
        id: '2',
        name: 'Balayage Highlights',
        description: 'Hand-painted highlights for a natural, sun-kissed look',
        price: 180,
        duration: 180,
        category: 'Coloring'
      },
      {
        id: '3',
        name: 'Color Correction',
        description: 'Expert color fixing and restoration services',
        price: 250,
        duration: 240,
        category: 'Coloring'
      }
    ]
  }

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setProvider(mockProvider)
      setLoading(false)
    }, 500)
  }, [params.id])

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return bookingData.serviceId !== ''
      case 2:
        return bookingData.date !== '' && bookingData.time !== ''
      case 3:
        return bookingData.location !== '' && (
          bookingData.location === 'salon' || 
          (bookingData.location === 'home' && bookingData.customerAddress)
        )
      case 4:
        return bookingData.paymentMethod !== ''
      default:
        return false
    }
  }

  const steps = [
    { number: 1, title: 'Select Service', icon: CalendarIcon },
    { number: 2, title: 'Choose Date & Time', icon: ClockIcon },
    { number: 3, title: 'Location', icon: MapPinIcon },
    { number: 4, title: 'Payment', icon: CreditCardIcon }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Provider not found</h1>
          <Link href="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    )
  }

  const selectedService = provider.services.find(s => s.id === bookingData.serviceId)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/provider/${provider.id}`}>
            <Button variant="ghost" className="mb-4">
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Back to {provider.name}
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book with {provider.name}
          </h1>
          <p className="text-gray-600">{provider.businessName}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-sm ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && 'Select a Service'}
                  {currentStep === 2 && 'Choose Date & Time'}
                  {currentStep === 3 && 'Select Location'}
                  {currentStep === 4 && 'Payment Method'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <ServiceSelector
                    services={provider.services}
                    selectedServiceId={bookingData.serviceId}
                    onServiceSelect={(serviceId) => updateBookingData({ serviceId })}
                  />
                )}
                
                {currentStep === 2 && selectedService && (
                  <DateTimeSelector
                    providerId={provider.id}
                    serviceDuration={selectedService.duration}
                    selectedDate={bookingData.date}
                    selectedTime={bookingData.time}
                    onDateTimeSelect={(date, time) => updateBookingData({ date, time })}
                  />
                )}
                
                {currentStep === 3 && (
                  <LocationSelector
                    providerAddress={provider.address}
                    selectedLocation={bookingData.location}
                    customerAddress={bookingData.customerAddress}
                    onLocationSelect={(location, address) => 
                      updateBookingData({ location, customerAddress: address })
                    }
                  />
                )}
                
                {currentStep === 4 && (
                  <PaymentMethod
                    selectedMethod={bookingData.paymentMethod}
                    onMethodSelect={(method) => updateBookingData({ paymentMethod: method })}
                  />
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                >
                  Next
                </Button>
              ) : (
                <Button disabled={!canProceed()}>
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <BookingSummary
              provider={provider}
              bookingData={bookingData}
              selectedService={selectedService}
            />
          </div>
        </div>
      </div>
    </div>
  )
}