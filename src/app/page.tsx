import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
// Lazy load heavy components for better performance
import dynamic from 'next/dynamic'

const HowItWorks = dynamic(() => import('@/components/home/HowItWorks').then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg mx-4" />
})

const FeaturedServices = dynamic(() => import('@/components/home/FeaturedServices').then(mod => ({ default: mod.FeaturedServices })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg mx-4" />
})

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Stats Section */}
      <Stats />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Featured Services Section */}
      <FeaturedServices />
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect barber or stylist on Barberng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Find Providers Now
              </Button>
            </Link>
            <Link href="/provider/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600">
                Join as Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}