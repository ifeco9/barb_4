'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CalendarDaysIcon,
  ClockIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface TimeSlot {
  id: string
  start_time: string
  end_time: string
  is_available: boolean
}

interface DaySchedule {
  day: string
  is_working: boolean
  time_slots: TimeSlot[]
}

export default function AvailabilityPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>([
    {
      day: 'Monday',
      is_working: true,
      time_slots: [
        { id: '1', start_time: '09:00', end_time: '12:00', is_available: true },
        { id: '2', start_time: '13:00', end_time: '17:00', is_available: true }
      ]
    },
    {
      day: 'Tuesday',
      is_working: true,
      time_slots: [
        { id: '3', start_time: '09:00', end_time: '12:00', is_available: true },
        { id: '4', start_time: '13:00', end_time: '17:00', is_available: true }
      ]
    },
    {
      day: 'Wednesday',
      is_working: true,
      time_slots: [
        { id: '5', start_time: '09:00', end_time: '12:00', is_available: true },
        { id: '6', start_time: '13:00', end_time: '17:00', is_available: true }
      ]
    },
    {
      day: 'Thursday',
      is_working: true,
      time_slots: [
        { id: '7', start_time: '09:00', end_time: '12:00', is_available: true },
        { id: '8', start_time: '13:00', end_time: '17:00', is_available: true }
      ]
    },
    {
      day: 'Friday',
      is_working: true,
      time_slots: [
        { id: '9', start_time: '09:00', end_time: '12:00', is_available: true },
        { id: '10', start_time: '13:00', end_time: '17:00', is_available: true }
      ]
    },
    {
      day: 'Saturday',
      is_working: true,
      time_slots: [
        { id: '11', start_time: '10:00', end_time: '14:00', is_available: true }
      ]
    },
    {
      day: 'Sunday',
      is_working: false,
      time_slots: []
    }
  ])

  const [newTimeSlot, setNewTimeSlot] = useState({ start_time: '', end_time: '' })
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const addTimeSlot = (dayIndex: number) => {
    if (!newTimeSlot.start_time || !newTimeSlot.end_time) return

    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      start_time: newTimeSlot.start_time,
      end_time: newTimeSlot.end_time,
      is_available: true
    }

    setWeeklySchedule(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { ...day, time_slots: [...day.time_slots, newSlot] }
        : day
    ))

    setNewTimeSlot({ start_time: '', end_time: '' })
    setSelectedDay(null)
  }

  const removeTimeSlot = (dayIndex: number, slotId: string) => {
    setWeeklySchedule(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { ...day, time_slots: day.time_slots.filter(slot => slot.id !== slotId) }
        : day
    ))
  }

  const toggleWorkingDay = (dayIndex: number) => {
    setWeeklySchedule(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { ...day, is_working: !day.is_working, time_slots: !day.is_working ? [] : day.time_slots }
        : day
    ))
  }

  const getCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Availability Management</h1>
        <p className="text-gray-600">Set your working hours and manage your availability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Schedule */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-primary-600" />
              Weekly Schedule
            </h2>

            <div className="space-y-4">
              {weeklySchedule.map((day, dayIndex) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: dayIndex * 0.1 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">{day.day}</h3>
                      <label className="ml-4 flex items-center">
                        <input
                          type="checkbox"
                          checked={day.is_working}
                          onChange={() => toggleWorkingDay(dayIndex)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Working day</span>
                      </label>
                    </div>
                    
                    {day.is_working && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedDay(day.day)}
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Time
                      </Button>
                    )}
                  </div>

                  {day.is_working && (
                    <div className="space-y-2">
                      {day.time_slots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between bg-gray-50 rounded p-3"
                        >
                          <span className="text-sm font-medium text-gray-900">
                            {slot.start_time} - {slot.end_time}
                          </span>
                          <button
                            onClick={() => removeTimeSlot(dayIndex, slot.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      
                      {selectedDay === day.day && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center space-x-2 mt-3"
                        >
                          <input
                            type="time"
                            value={newTimeSlot.start_time}
                            onChange={(e) => setNewTimeSlot(prev => ({ ...prev, start_time: e.target.value }))}
                            className="border rounded px-3 py-1 text-sm"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={newTimeSlot.end_time}
                            onChange={(e) => setNewTimeSlot(prev => ({ ...prev, end_time: e.target.value }))}
                            className="border rounded px-3 py-1 text-sm"
                          />
                          <Button
                            size="sm"
                            onClick={() => addTimeSlot(dayIndex)}
                          >
                            Add
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedDay(null)}
                          >
                            Cancel
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <CalendarDaysIcon className="h-5 w-5 mr-2 text-primary-600" />
              Calendar View
            </h2>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getCalendarDays().map((date, index) => {
                const isCurrentMonth = date.getMonth() === selectedDate.getMonth()
                const isToday = date.toDateString() === new Date().toDateString()
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
                const daySchedule = weeklySchedule.find(d => d.day === dayName)
                const isWorkingDay = daySchedule?.is_working && daySchedule?.time_slots.length > 0

                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`
                      aspect-square flex items-center justify-center text-sm cursor-pointer rounded-lg transition-all
                      ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                      ${isToday ? 'bg-primary-600 text-white font-bold' : ''}
                      ${isWorkingDay && !isToday ? 'bg-green-100 text-green-800' : ''}
                      ${!isWorkingDay && !isToday && isCurrentMonth ? 'hover:bg-gray-100' : ''}
                    `}
                  >
                    {date.getDate()}
                    {isWorkingDay && !isToday && (
                      <div className="absolute mt-6 w-1 h-1 bg-green-500 rounded-full"></div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary-600 rounded mr-2"></div>
                Today
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 rounded mr-2"></div>
                Available
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              Copy from Previous Week
            </Button>
            <Button variant="outline">
              Set Holiday Schedule
            </Button>
            <Button variant="outline">
              Bulk Time Slot Update
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}