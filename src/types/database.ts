export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          role: 'customer' | 'provider' | 'salon' | 'seller' | 'admin'
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          date_of_birth: string | null
          gender: string | null
          address: string | null
          city: string | null
          state: string | null
          country: string | null
          postal_code: string | null
          bio: string | null
          website: string | null
          social_links: Record<string, any>
          preferences: Record<string, any>
          is_verified: boolean
          is_active: boolean
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'customer' | 'provider' | 'salon' | 'seller' | 'admin'
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          bio?: string | null
          website?: string | null
          social_links?: Record<string, any>
          preferences?: Record<string, any>
          is_verified?: boolean
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'customer' | 'provider' | 'salon' | 'seller' | 'admin'
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          bio?: string | null
          website?: string | null
          social_links?: Record<string, any>
          preferences?: Record<string, any>
          is_verified?: boolean
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      service_providers: {
        Row: {
          id: string
          user_id: string | null
          business_name: string | null
          business_type: string | null
          license_number: string | null
          certifications: string[] | null
          experience_years: number | null
          specialties: string[] | null
          languages: string[] | null
          portfolio_images: string[] | null
          portfolio_videos: string[] | null
          working_hours: Record<string, any>
          service_area: Record<string, any>
          travel_radius: number | null
          home_service: boolean | null
          salon_service: boolean | null
          rating: number | null
          total_reviews: number | null
          total_bookings: number | null
          is_featured: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          business_name?: string | null
          business_type?: string | null
          license_number?: string | null
          certifications?: string[] | null
          experience_years?: number | null
          specialties?: string[] | null
          languages?: string[] | null
          portfolio_images?: string[] | null
          portfolio_videos?: string[] | null
          working_hours?: Record<string, any>
          service_area?: Record<string, any>
          travel_radius?: number | null
          home_service?: boolean | null
          salon_service?: boolean | null
          rating?: number | null
          total_reviews?: number | null
          total_bookings?: number | null
          is_featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          business_name?: string | null
          business_type?: string | null
          license_number?: string | null
          certifications?: string[] | null
          experience_years?: number | null
          specialties?: string[] | null
          languages?: string[] | null
          portfolio_images?: string[] | null
          portfolio_videos?: string[] | null
          working_hours?: Record<string, any>
          service_area?: Record<string, any>
          travel_radius?: number | null
          home_service?: boolean | null
          salon_service?: boolean | null
          rating?: number | null
          total_reviews?: number | null
          total_bookings?: number | null
          is_featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          provider_id: string | null
          name: string
          description: string | null
          type: 'haircut' | 'styling' | 'coloring' | 'treatment' | 'makeup' | 'nails' | 'facial' | 'massage'
          category: string | null
          price: number
          duration: number
          preparation_time: number | null
          cleanup_time: number | null
          images: string[] | null
          requirements: string[] | null
          included_items: string[] | null
          add_ons: Record<string, any>
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id?: string | null
          name: string
          description?: string | null
          type: 'haircut' | 'styling' | 'coloring' | 'treatment' | 'makeup' | 'nails' | 'facial' | 'massage'
          category?: string | null
          price: number
          duration: number
          preparation_time?: number | null
          cleanup_time?: number | null
          images?: string[] | null
          requirements?: string[] | null
          included_items?: string[] | null
          add_ons?: Record<string, any>
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          provider_id?: string | null
          name?: string
          description?: string | null
          type?: 'haircut' | 'styling' | 'coloring' | 'treatment' | 'makeup' | 'nails' | 'facial' | 'massage'
          category?: string | null
          price?: number
          duration?: number
          preparation_time?: number | null
          cleanup_time?: number | null
          images?: string[] | null
          requirements?: string[] | null
          included_items?: string[] | null
          add_ons?: Record<string, any>
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table types as needed...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'customer' | 'provider' | 'salon' | 'seller' | 'admin'
      appointment_status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
      transaction_type: 'booking' | 'product_purchase' | 'payout' | 'refund'
      notification_type: 'booking' | 'payment' | 'review' | 'promotion' | 'system'
      service_type: 'haircut' | 'styling' | 'coloring' | 'treatment' | 'makeup' | 'nails' | 'facial' | 'massage'
    }
  }
}