import { 
  UserGroupIcon,
  CalendarIcon,
  StarIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'

export function Stats() {
  const stats = [
    {
      id: 1,
      name: 'Verified Providers',
      value: '500+',
      icon: UserGroupIcon,
      description: 'Professional barbers and stylists',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      id: 2,
      name: 'Appointments Booked',
      value: '50K+',
      icon: CalendarIcon,
      description: 'Successful bookings this year',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100'
    },
    {
      id: 3,
      name: 'Customer Rating',
      value: '4.9/5',
      icon: StarIcon,
      description: 'Average customer satisfaction',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100'
    },
    {
      id: 4,
      name: 'Products Sold',
      value: '100K+',
      icon: ShoppingBagIcon,
      description: 'Beauty products delivered',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our growing community of satisfied customers and professional service providers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-full mb-4`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{stat.name}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}