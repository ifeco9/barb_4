export interface User {
  id: string
  role: 'customer' | 'provider' | 'salon' | 'seller' | 'admin'
  email: string
  full_name?: string
  phone?: string
  avatar_url?: string
  date_of_birth?: string
  gender?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  bio?: string
  website?: string
  social_links?: Record<string, any>
  preferences?: Record<string, any>
  is_verified: boolean
  is_active: boolean
  last_login_at?: string
  created_at: string
  updated_at: string
}

export interface ServiceProvider {
  id: string
  user_id: string
  user?: User
  business_name?: string
  business_type?: string
  license_number?: string
  certifications?: string[]
  experience_years?: number
  specialties?: string[]
  languages?: string[]
  portfolio_images?: string[]
  portfolio_videos?: string[]
  working_hours?: Record<string, any>
  service_area?: Record<string, any>
  travel_radius?: number
  home_service?: boolean
  salon_service?: boolean
  rating?: number
  total_reviews?: number
  total_bookings?: number
  is_featured?: boolean
  created_at: string
  updated_at: string
  services?: Service[]
}

export interface Service {
  id: string
  provider_id: string
  provider?: ServiceProvider
  name: string
  description?: string
  type: 'haircut' | 'styling' | 'coloring' | 'treatment' | 'makeup' | 'nails' | 'facial' | 'massage'
  category?: string
  price: number
  duration: number
  preparation_time?: number
  cleanup_time?: number
  images?: string[]
  requirements?: string[]
  included_items?: string[]
  add_ons?: Record<string, any>
  is_active?: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  seller_id: string
  seller?: User
  name: string
  description?: string
  brand?: string
  category: string
  subcategory?: string
  price: number
  sale_price?: number
  cost_price?: number
  sku?: string
  barcode?: string
  weight?: number
  dimensions?: Record<string, any>
  images?: string[]
  variants?: Record<string, any>[]
  ingredients?: string[]
  instructions?: string
  stock_quantity?: number
  low_stock_threshold?: number
  is_digital?: boolean
  is_featured?: boolean
  is_active?: boolean
  seo_title?: string
  seo_description?: string
  tags?: string[]
  rating?: number
  total_reviews?: number
  total_sales?: number
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  customer_id: string
  customer?: User
  provider_id: string
  provider?: ServiceProvider
  service_id: string
  service?: Service
  appointment_date: string
  start_time: string
  end_time: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  location_type?: string
  customer_address?: string
  customer_coordinates?: any
  notes?: string
  internal_notes?: string
  cancellation_reason?: string
  price: number
  deposit_amount?: number
  discount_amount?: number
  total_amount: number
  payment_status?: string
  payment_method?: string
  stripe_payment_intent_id?: string
  reminder_sent_at?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  reviewer_id: string
  reviewer?: User
  target_type: 'provider' | 'product'
  target_id: string
  appointment_id?: string
  appointment?: Appointment
  rating: number
  title?: string
  comment?: string
  images?: string[]
  is_verified?: boolean
  is_featured?: boolean
  helpful_count?: number
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'booking' | 'payment' | 'review' | 'promotion' | 'system'
  title: string
  message: string
  data?: Record<string, any>
  is_read?: boolean
  is_push?: boolean
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  product?: Product
  quantity: number
  variant_data?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_id: string
  customer?: User
  order_number: string
  status: string
  subtotal: number
  tax_amount?: number
  shipping_amount?: number
  discount_amount?: number
  total_amount: number
  currency?: string
  payment_status?: string
  payment_method?: string
  stripe_payment_intent_id?: string
  shipping_address?: Record<string, any>
  billing_address?: Record<string, any>
  notes?: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product?: Product
  seller_id: string
  seller?: User
  quantity: number
  price: number
  variant_data?: Record<string, any>
  created_at: string
}

export interface LoyaltyPoint {
  id: string
  user_id: string
  points: number
  transaction_type: 'earned' | 'redeemed'
  description?: string
  related_id?: string
  expires_at?: string
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  related_id?: string
  type: 'booking' | 'product_purchase' | 'payout' | 'refund'
  amount: number
  currency?: string
  status?: string
  payment_method?: string
  stripe_payment_intent_id?: string
  stripe_charge_id?: string
  description?: string
  metadata?: Record<string, any>
  created_at: string
}