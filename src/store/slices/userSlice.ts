import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  phone?: string
  address?: string
  bio?: string
  preferences?: Record<string, any>
  created_at: string
  updated_at: string
}

interface UserState {
  profile: UserProfile | null
  favorites: string[]
  notifications: any[]
  loyaltyPoints: number
  isLoading: boolean
}

const initialState: UserState = {
  profile: null,
  favorites: [],
  notifications: [],
  loyaltyPoints: 0,
  isLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
      }
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload)
    },
    setNotifications: (state, action: PayloadAction<any[]>) => {
      state.notifications = action.payload
    },
    addNotification: (state, action: PayloadAction<any>) => {
      state.notifications.unshift(action.payload)
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    setLoyaltyPoints: (state, action: PayloadAction<number>) => {
      state.loyaltyPoints = action.payload
    },
    addLoyaltyPoints: (state, action: PayloadAction<number>) => {
      state.loyaltyPoints += action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    clearUser: (state) => {
      state.profile = null
      state.favorites = []
      state.notifications = []
      state.loyaltyPoints = 0
      state.isLoading = false
    },
  },
})

export const {
  setProfile,
  updateProfile,
  setFavorites,
  addFavorite,
  removeFavorite,
  setNotifications,
  addNotification,
  markNotificationRead,
  setLoyaltyPoints,
  addLoyaltyPoints,
  setLoading,
  clearUser,
} = userSlice.actions

export default userSlice.reducer