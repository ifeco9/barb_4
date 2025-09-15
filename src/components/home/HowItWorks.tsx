import { 
  MagnifyingGlassIcon,
  CalendarIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Search & Discover',
      description: 'Find the perfect barber, stylist, or beauty service provider in your area using our advanced search filters.',
      icon: MagnifyingGlassIcon,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      id: 2,
      title: 'Book Appointment',
      description: 'Choose your preferred date and time, select services, and book instantly with our easy-to-use booking system.',
      icon: CalendarIcon,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100'
    },
    {
      id: 3,
      title: 'Get Service',
      description: 'Enjoy professional beauty services at the salon or at your home. Pay securely through the app.',
      icon: CheckCircleIcon,
      color: 'text-accent-600',
      bgColor: 'bg-accent-100'
    },
    {
      id: 4,
      title: 'Rate & Review',
      description: 'Share your experience and help others discover great service providers in the community.',
      icon: StarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How Barberng Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting your perfect look is just four simple steps away
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-300 z-0 transform translate-x-4"></div>
              )}
              
              <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.id}
                </div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${step.bgColor} rounded-full mb-6 mt-4`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/auth/signup"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  )
}