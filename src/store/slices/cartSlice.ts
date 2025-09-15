import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: string
  product_id: string
  name: string
  price: number
  quantity: number
  image_url?: string
  seller_id: string
  variant?: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
  appliedCoupon?: {
    code: string
    discount: number
    type: 'percentage' | 'fixed'
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.product_id === action.payload.product_id && 
                item.variant === action.payload.variant
      )
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id)
        } else {
          item.quantity = action.payload.quantity
        }
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
      state.appliedCoupon = undefined
    },
    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number; type: 'percentage' | 'fixed' }>) => {
      state.appliedCoupon = action.payload
      cartSlice.caseReducers.calculateTotals(state)
    },
    removeCoupon: (state) => {
      state.appliedCoupon = undefined
      cartSlice.caseReducers.calculateTotals(state)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    calculateTotals: (state) => {
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      
      let discount = 0
      if (state.appliedCoupon) {
        if (state.appliedCoupon.type === 'percentage') {
          discount = subtotal * (state.appliedCoupon.discount / 100)
        } else {
          discount = state.appliedCoupon.discount
        }
      }
      
      state.total = Math.max(0, subtotal - discount)
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  setLoading,
  calculateTotals,
} = cartSlice.actions

export default cartSlice.reducer