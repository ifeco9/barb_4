'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { signOut } from '@/store/slices/authSlice'
import { Button } from '@/components/ui/Button'
import { 
  Bars3Icon, 
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  BellIcon,
  UserIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  
  const { isAuthenticated, user, userRole } = useSelector((state: RootState) => state.auth)
  const { itemCount } = useSelector((state: RootState) => state.cart)

  const handleSignOut = async () => {
    dispatch(signOut())
    router.push('/')
  }

  const navigation = [
    { name: 'Find Providers', href: '/search' },
    { name: 'Products', href: '/products' },
    { name: 'Providers', href: '/providers' },
    { name: 'About', href: '/about' },
  ]

  const userNavigation = [
    { name: 'Profile', href: '/profile' },
    { name: 'My Appointments', href: '/appointments' },
    { name: 'My Orders', href: '/orders' },
    { name: 'Favorites', href: '/favorites' },
    { name: 'Settings', href: '/settings' },
  ]

  const providerNavigation = [
    { name: 'Dashboard', href: '/provider/dashboard' },
    { name: 'Appointments', href: '/provider/appointments' },
    { name: 'Services', href: '/provider/services' },
    { name: 'Portfolio', href: '/provider/portfolio' },
    { name: 'Analytics', href: '/provider/analytics' },
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and main navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/icon-192x192.svg"
                alt="Barberng"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="ml-2 text-xl font-bold text-primary-600">Barberng</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="navbar-link"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center - Search bar (hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:flex-1 md:max-w-xs md:mx-8">
            <Link href="/search" className="w-full">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search providers, services..."
                  className="input-field pl-10 pr-4 py-2 w-full cursor-pointer"
                  readOnly
                />
              </div>
            </Link>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile search button */}
            <Link href="/search" className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </Link>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="p-2 rounded-md text-gray-600 hover:text-primary-600 relative">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Favorites */}
                <Link href="/favorites" className="p-2 rounded-md text-gray-600 hover:text-primary-600">
                  <HeartIcon className="h-6 w-6" />
                </Link>

                {/* Shopping cart */}
                <Link href="/cart" className="p-2 rounded-md text-gray-600 hover:text-primary-600 relative">
                  <ShoppingCartIcon className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>

                {/* User profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-primary-600"
                  >
                    {user?.user_metadata?.avatar_url ? (
                      <Image
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-6 w-6" />
                    )}
                    <span className="hidden sm:block text-sm font-medium">
                      {user?.user_metadata?.full_name || 'Account'}
                    </span>
                  </button>

                  {/* Profile dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.user_metadata?.full_name || user?.email}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                      </div>
                      
                      {(userRole === 'provider' || userRole === 'salon') && (
                        <>
                          {providerNavigation.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                          <div className="border-t border-gray-200 my-1" />
                        </>
                      )}
                      
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      
                      <div className="border-t border-gray-200 my-1" />
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {/* Mobile search */}
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-field pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="mobile-menu-item"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}