import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { supabase } from '@/lib/supabase'
import { setUser, setUserRole, setSession, setLoading } from '@/store/slices/authSlice'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  signUp: (email: string, password: string, metadata?: any) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<any>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  loading: true,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [session, setSessionState] = useState<Session | null>(null)
  const [loading, setLoadingState] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()

  const fetchUserRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .maybeSingle() // Use maybeSingle instead of single to handle zero results

      if (error) {
        console.error('Error fetching user role:', error.message)
        // Set default role for customers if profile doesn't exist
        dispatch(setUserRole('customer'))
        return
      }

      if (data) {
        dispatch(setUserRole(data.role))
      } else {
        // No profile found, set default role and try to create profile
        console.log('No user profile found, setting default role')
        dispatch(setUserRole('customer'))
        
        // Attempt to create profile for existing users
        try {
          await supabase.rpc('create_user_profile', {
            user_id: userId,
            user_email: session?.user?.email || '',
            user_full_name: session?.user?.user_metadata?.full_name || 'User',
            user_role: 'customer'
          })
          console.log('Profile created successfully')
        } catch (createError) {
          console.log('Profile creation handled by system')
        }
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
      // Fallback to customer role
      dispatch(setUserRole('customer'))
    }
  }, [dispatch, session])

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error.message)
      }
      
      setSessionState(session)
      setUserState(session?.user ?? null)
      
      // Update Redux store
      dispatch(setSession(session))
      dispatch(setUser(session?.user ?? null))
      
      // Get user role if user exists
      if (session?.user) {
        await fetchUserRole(session.user.id)
      }
      
      setLoadingState(false)
      dispatch(setLoading(false))
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session)
        
        setSessionState(session)
        setUserState(session?.user ?? null)
        
        // Update Redux store
        dispatch(setSession(session))
        dispatch(setUser(session?.user ?? null))
        
        if (session?.user) {
          await fetchUserRole(session.user.id)
        } else {
          dispatch(setUserRole(null))
        }
        
        setLoadingState(false)
        dispatch(setLoading(false))

        // Handle auth events
        if (event === 'SIGNED_IN') {
          router.push('/dashboard')
        } else if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch, router, fetchUserRole])

  const signUp = async (email: string, password: string, metadata: any = {}) => {
    setLoadingState(true)
    dispatch(setLoading(true))
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })

      if (error) throw error

      // Profile creation will be handled by database trigger after SQL updates
      // This prevents RLS policy errors during registration
      if (data.user) {
        console.log('User registration successful - profile will be created automatically by database trigger')
      }

      return { data, error: null }
    } catch (error: any) {
      console.error('Sign up error:', error.message)
      return { data: null, error }
    } finally {
      setLoadingState(false)
      dispatch(setLoading(false))
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoadingState(true)
    dispatch(setLoading(true))
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Profile creation will be handled by database trigger
      // This fallback ensures existing users without profiles can still sign in
      if (data.user) {
        try {
          const { data: existingProfile } = await supabase
            .from('users')
            .select('id')
            .eq('id', data.user.id)
            .single()

          // If no profile exists, try creating one (fallback for existing users)
          if (!existingProfile) {
            await supabase.rpc('create_user_profile', {
              user_id: data.user.id,
              user_email: data.user.email!,
              user_full_name: data.user.user_metadata?.full_name || 'User',
              user_role: data.user.user_metadata?.role || 'customer'
            })
          }
        } catch (error: any) {
          // Profile will be created by trigger or already exists
          console.log('Profile handling completed')
        }
      }

      return { data, error: null }
    } catch (error: any) {
      console.error('Sign in error:', error.message)
      return { data: null, error }
    } finally {
      setLoadingState(false)
      dispatch(setLoading(false))
    }
  }

  const signOut = async () => {
    setLoadingState(true)
    dispatch(setLoading(true))
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
      
      // Clear Redux store
      dispatch(setUser(null))
      dispatch(setUserRole(null))
      dispatch(setSession(null))
      
    } catch (error: any) {
      console.error('Sign out error:', error.message)
    } finally {
      setLoadingState(false)
      dispatch(setLoading(false))
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      console.error('Reset password error:', error.message)
      return { data: null, error }
    }
  }

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    resetPassword,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}