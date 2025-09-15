import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ScissorsIcon,
  SparklesIcon,
  PaintBrushIcon,
  HandThumbUpIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export function FeaturedServices() {
  const services = [
    {
      id: 1,
      category: 'Hair Cutting',
      title: 'Professional Haircuts',
      description: 'Expert haircuts from certified barbers and stylists',
      icon: ScissorsIcon,
      providers: 120,
      avgPrice: '$25-60',
      rating: 4.8,
      image: '/services/haircut.jpg'
    },
    {
      id: 2,
      category: 'Hair Styling',
      title: 'Special Occasion Styling',
      description: 'Wedding, party, and event hair styling services',
      icon: SparklesIcon,
      providers: 85,
      avgPrice: '$40-100',
      rating: 4.9,
      image: '/services/styling.jpg'
    },
    {
      id: 3,
      category: 'Hair Coloring',
      title: 'Hair Color & Highlights',
      description: 'Professional hair coloring and highlight services',
      icon: PaintBrushIcon,
      providers: 95,
      avgPrice: '$60-150',
      rating: 4.7,
      image: '/services/coloring.jpg'
    },
    {
      id: 4,
      category: 'Beauty Treatment',
      title: 'Facial & Skincare',
      description: 'Relaxing facial treatments and skincare services',
      icon: HandThumbUpIcon,
      providers: 75,
      avgPrice: '$30-80',
      rating: 4.8,
      image: '/services/facial.jpg'
    }
  ]

  const topProviders = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Hair Stylist',
      rating: 4.9,
      reviews: 156,
      location: 'Downtown',
      image: '/providers/sarah.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      specialty: 'Barber',
      rating: 4.8,
      reviews: 203,
      location: 'Midtown',
      image: '/providers/mike.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      specialty: 'Color Specialist',
      rating: 4.9,
      reviews: 89,
      location: 'Uptown',
      image: '/providers/elena.jpg',
      verified: true
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most popular beauty services in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <service.icon className="h-16 w-16 text-primary-600" />
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs font-semibold text-primary-600">
                  {service.providers} providers
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary-600">{service.category}</span>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">{service.avgPrice}</span>
                  <Button size="sm" variant="outline">
                    View Providers
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Top Providers Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Top Rated Providers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our highest-rated service providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topProviders.map((provider) => (
            <Card key={provider.id} className="text-center hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {provider.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <CheckCircleIcon className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">{provider.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{provider.specialty}</p>
                
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{provider.rating}</span>
                    <span className="text-sm text-gray-500">({provider.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{provider.location}</span>
                  </div>
                </div>
                
                <Button className="w-full">
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/services">
            <Button size="lg" variant="outline" className="mr-4">
              Browse All Services
            </Button>
          </Link>
          <Link href="/providers">
            <Button size="lg">
              Find Providers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}