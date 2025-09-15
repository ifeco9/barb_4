'use client'

import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'

interface DateTimeSelectorProps {
  providerId: string
  serviceDuration: number
  selectedDate: string
  selectedTime: string
  onDateTimeSelect: (date: string, time: string) => void
}

export function DateTimeSelector({ 
  providerId, 
  serviceDuration, 
  selectedDate, 
  selectedTime, 
  onDateTimeSelect 
}: DateTimeSelectorProps) {
  const [currentWeek, setCurrentWeek] = useState(0)
  const [availableSlots, setAvailableSlots] = useState<{[key: string]: string[]}>({})

  // Generate dates for the current week
  const getWeekDates = (weekOffset: number) => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() + (weekOffset * 7))
    
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates(currentWeek)

  // Mock available time slots - replace with actual API call
  const mockTimeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
  ]

  useEffect(() => {
    // Generate mock availability for each date
    const slots: {[key: string]: string[]} = {}
    weekDates.forEach(date => {
      const dateStr = date.toISOString().split('T')[0]
      // Randomly remove some slots to simulate booking
      const availableToday = mockTimeSlots.filter(() => Math.random() > 0.3)
      slots[dateStr] = availableToday
    })
    setAvailableSlots(slots)
  }, [currentWeek])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isPast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
          disabled={currentWeek === 0}
        >
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Previous
        </Button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {currentWeek === 0 ? 'This Week' : `Week of ${formatDate(weekDates[0])}`}
        </h3>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(currentWeek + 1)}
          disabled={currentWeek >= 4} // Limit to 4 weeks ahead
        >
          Next
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Date Selection */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Select Date</h4>
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date) => {
            const dateStr = date.toISOString().split('T')[0]
            const isSelected = selectedDate === dateStr
            const isDisabled = isPast(date)
            const hasSlots = availableSlots[dateStr]?.length > 0
            
            return (
              <button
                key={dateStr}
                onClick={() => {
                  if (!isDisabled && hasSlots) {
                    onDateTimeSelect(dateStr, '')
                  }
                }}
                disabled={isDisabled || !hasSlots}
                className={`p-3 text-center rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-primary-600 text-white border-primary-600'
                    : isDisabled || !hasSlots
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                <div className="text-xs font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-sm font-semibold">
                  {date.getDate()}
                </div>
                {isToday(date) && (
                  <div className="text-xs text-primary-600 mt-1">Today</div>
                )}
                {!isDisabled && !hasSlots && (
                  <div className="text-xs text-red-500 mt-1">Booked</div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && availableSlots[selectedDate] && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Select Time</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {availableSlots[selectedDate].map((time) => (
              <button
                key={time}
                onClick={() => onDateTimeSelect(selectedDate, time)}
                className={`p-2 text-sm font-medium rounded-lg border transition-all ${
                  selectedTime === time
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Appointment scheduled for {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} at {selectedTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}