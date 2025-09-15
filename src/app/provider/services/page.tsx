'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  PlusIcon,
  ScissorsIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

const serviceSchema = z.object({
  name: z.string().min(2, 'Service name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['haircut', 'styling', 'coloring', 'treatment', 'beard', 'nails', 'facial', 'makeup']),
  price: z.number().min(1, 'Price must be greater than 0'),
  duration: z.number().min(15, 'Duration must be at least 15 minutes'),
  preparationTime: z.number().min(0, 'Preparation time cannot be negative').optional(),
  cleanupTime: z.number().min(0, 'Cleanup time cannot be negative').optional(),
  requirements: z.array(z.string()).optional(),
  includedItems: z.array(z.string()).optional(),
})

type ServiceForm = z.infer<typeof serviceSchema>

export default function ProviderServicesPage() {
  const [isAddingService, setIsAddingService] = useState(false)
  const [editingService, setEditingService] = useState<string | null>(null)

  // Mock services data - replace with real data from Supabase
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Classic Haircut',
      description: 'Professional haircut with styling and wash',
      category: 'haircut',
      price: 45,
      duration: 60,
      preparationTime: 5,
      cleanupTime: 10,
      requirements: ['Clean hair preferred'],
      includedItems: ['Shampoo', 'Cut', 'Style', 'Finish'],
      isActive: true,
      bookings: 127
    },
    {
      id: '2',
      name: 'Beard Trim & Shape',
      description: 'Professional beard trimming and shaping service',
      category: 'beard',
      price: 25,
      duration: 30,
      preparationTime: 5,
      cleanupTime: 5,
      requirements: ['Minimum 2 weeks beard growth'],
      includedItems: ['Trim', 'Shape', 'Oil application'],
      isActive: true,
      bookings: 89
    },
    {
      id: '3',
      name: 'Hair Coloring',
      description: 'Full hair coloring service with consultation',
      category: 'coloring',
      price: 120,
      duration: 180,
      preparationTime: 15,
      cleanupTime: 20,
      requirements: ['Consultation required', 'Patch test 48h before'],
      includedItems: ['Consultation', 'Color application', 'Wash', 'Style'],
      isActive: true,
      bookings: 45
    }
  ])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
  })

  const categories = [
    { value: 'haircut', label: 'Haircut', icon: ScissorsIcon },
    { value: 'styling', label: 'Styling', icon: ScissorsIcon },
    { value: 'coloring', label: 'Coloring', icon: ScissorsIcon },
    { value: 'treatment', label: 'Treatment', icon: ScissorsIcon },
    { value: 'beard', label: 'Beard Care', icon: ScissorsIcon },
    { value: 'nails', label: 'Nails', icon: ScissorsIcon },
    { value: 'facial', label: 'Facial', icon: ScissorsIcon },
    { value: 'makeup', label: 'Makeup', icon: ScissorsIcon }
  ]

  const onSubmit = async (data: ServiceForm) => {
    try {
      // In a real app, this would call the Supabase API
      const newService = {
        id: Date.now().toString(),
        ...data,
        isActive: true,
        bookings: 0
      }
      
      setServices([...services, newService])
      toast.success('Service added successfully!')
      setIsAddingService(false)
      reset()
    } catch (error) {
      toast.error('Failed to add service')
    }
  }

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId))
    toast.success('Service deleted successfully')
  }

  const toggleServiceStatus = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive }
        : service
    ))
  }

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category)
    return categoryData?.icon || ScissorsIcon
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      haircut: 'bg-blue-100 text-blue-800',
      styling: 'bg-purple-100 text-purple-800',
      coloring: 'bg-pink-100 text-pink-800',
      treatment: 'bg-green-100 text-green-800',
      beard: 'bg-orange-100 text-orange-800',
      nails: 'bg-red-100 text-red-800',
      facial: 'bg-indigo-100 text-indigo-800',
      makeup: 'bg-yellow-100 text-yellow-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Services</h1>
              <p className="text-gray-600">Manage your service offerings and pricing</p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                onClick={() => setIsAddingService(true)}
                className="mt-4 sm:mt-0"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Service
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-lg mr-4">
                  <ScissorsIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                  <p className="text-sm text-gray-600">Total Services</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-4">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    ${services.reduce((sum, service) => sum + service.price, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Service Value</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <ClockIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(services.reduce((sum, service) => sum + service.duration, 0) / services.length)}min
                  </p>
                  <p className="text-sm text-gray-600">Avg Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-4">
                  <EyeIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {services.reduce((sum, service) => sum + service.bookings, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnimatePresence>
            {services.map((service) => {
              const IconComponent = getCategoryIcon(service.category)
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-primary-100 rounded-lg mr-4">
                            <IconComponent className="h-6 w-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                              {service.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingService(service.id)}
                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{service.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                          <span className="font-semibold text-primary-600">${service.price}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          <span>{service.duration} min</span>
                        </div>
                      </div>

                      {service.includedItems && service.includedItems.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Included:</h4>
                          <div className="flex flex-wrap gap-1">
                            {service.includedItems.map((item, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{service.bookings} bookings</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            service.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {service.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleServiceStatus(service.id)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            service.isActive
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {service.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Add Service Modal */}
        <AnimatePresence>
          {isAddingService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Service</h2>
                    <button
                      onClick={() => {
                        setIsAddingService(false)
                        reset()
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service Name
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          className="input-field"
                          placeholder="e.g., Classic Haircut"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          {...register('category')}
                          className="input-field"
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        {...register('description')}
                        rows={3}
                        className="input-field"
                        placeholder="Describe your service in detail..."
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                      )}
                    </div>

                    {/* Pricing and Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          {...register('price', { valueAsNumber: true })}
                          type="number"
                          min="1"
                          step="0.01"
                          className="input-field"
                          placeholder="45.00"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration (minutes)
                        </label>
                        <input
                          {...register('duration', { valueAsNumber: true })}
                          type="number"
                          min="15"
                          step="5"
                          className="input-field"
                          placeholder="60"
                        />
                        {errors.duration && (
                          <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preparation Time (minutes)
                        </label>
                        <input
                          {...register('preparationTime', { valueAsNumber: true })}
                          type="number"
                          min="0"
                          step="5"
                          className="input-field"
                          placeholder="5"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsAddingService(false)
                          reset()
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Add Service
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}