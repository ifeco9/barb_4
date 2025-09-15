import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Booking {
  id: string
  customer_id: string
  provider_id: string
  service_id: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  notes?: string
  price: number
  created_at: string
}

interface BookingState {
  currentBooking: Booking | null
  bookings: Booking[]
  selectedService: any
  selectedProvider: any
  selectedDate: string | null
  selectedTime: string | null
  isLoading: boolean
}

const initialState: BookingState = {
  currentBooking: null,
  bookings: [],
  selectedService: null,
  selectedProvider: null,
  selectedDate: null,
  selectedTime: null,
  isLoading: false,
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentBooking: (state, action: PayloadAction<Booking | null>) => {
      state.currentBooking = action.payload
    },
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload)
    },
    updateBooking: (state, action: PayloadAction<{ id: string; updates: Partial<Booking> }>) => {
      const index = state.bookings.findIndex(b => b.id === action.payload.id)
      if (index !== -1) {
        state.bookings[index] = { ...state.bookings[index], ...action.payload.updates }
      }
    },
    setSelectedService: (state, action: PayloadAction<any>) => {
      state.selectedService = action.payload
    },
    setSelectedProvider: (state, action: PayloadAction<any>) => {
      state.selectedProvider = action.payload
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload
    },
    setSelectedTime: (state, action: PayloadAction<string | null>) => {
      state.selectedTime = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    clearBookingSelection: (state) => {
      state.selectedService = null
      state.selectedProvider = null
      state.selectedDate = null
      state.selectedTime = null
    },
    clearBookings: (state) => {
      state.currentBooking = null
      state.bookings = []
      state.selectedService = null
      state.selectedProvider = null
      state.selectedDate = null
      state.selectedTime = null
      state.isLoading = false
    },
  },
})

export const {
  setCurrentBooking,
  setBookings,
  addBooking,
  updateBooking,
  setSelectedService,
  setSelectedProvider,
  setSelectedDate,
  setSelectedTime,
  setLoading,
  clearBookingSelection,
  clearBookings,
} = bookingSlice.actions

export default bookingSlice.reducer