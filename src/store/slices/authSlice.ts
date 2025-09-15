import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  userRole: 'customer' | 'provider' | 'salon' | 'seller' | 'admin' | null
  isLoading: boolean
  isAuthenticated: boolean
  session: any
}

const initialState: AuthState = {
  user: null,
  userRole: null,
  isLoading: true,
  isAuthenticated: false,
  session: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
      state.isLoading = false
    },
    setUserRole: (state, action: PayloadAction<'customer' | 'provider' | 'salon' | 'seller' | 'admin' | null>) => {
      state.userRole = action.payload
    },
    setSession: (state, action: PayloadAction<any>) => {
      state.session = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    signOut: (state) => {
      state.user = null
      state.userRole = null
      state.isAuthenticated = false
      state.session = null
      state.isLoading = false
    },
  },
})

export const { setUser, setUserRole, setSession, setLoading, signOut } = authSlice.actions
export default authSlice.reducer