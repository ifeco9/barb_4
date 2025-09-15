'use client'

import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface PaymentMethodProps {
  selectedMethod?: string
  onMethodSelect: (method: string) => void
}

export function PaymentMethod({ selectedMethod, onMethodSelect }: PaymentMethodProps) {
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay securely with your card',
      icon: CreditCardIcon,
      popular: true
    },
    {
      id: 'cash',
      name: 'Pay at Appointment',
      description: 'Cash or card payment at the time of service',
      icon: BanknotesIcon,
      popular: false
    }
  ]

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selectedMethod === method.id
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
          onClick={() => onMethodSelect(method.id)}
        >
          {selectedMethod === method.id && (
            <div className="absolute top-4 right-4">
              <CheckCircleIcon className="h-6 w-6 text-primary-600" />
            </div>
          )}
          
          <div className="flex items-start space-x-4 pr-8">
            <div className={`p-3 rounded-lg ${
              selectedMethod === method.id ? 'bg-primary-100' : 'bg-gray-100'
            }`}>
              <method.icon className={`h-6 w-6 ${
                selectedMethod === method.id ? 'text-primary-600' : 'text-gray-600'
              }`} />
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {method.name}
                </h3>
                {method.popular && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Most Popular
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">
                {method.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Card Payment Form */}
      {selectedMethod === 'card' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">Card Information</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  Your payment information is secure and encrypted. You will be charged when your appointment is confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pay at Appointment Notice */}
      {selectedMethod === 'cash' && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Please bring exact payment or a card to your appointment. 
                Some providers may require a deposit to secure your booking.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}