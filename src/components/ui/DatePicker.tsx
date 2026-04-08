"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}

export function DatePicker({ value, onChange, placeholder = "Select date", required = false }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value))
    }
  }, [value])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
    const formattedDate = newDate.toISOString().split('T')[0]
    onChange(formattedDate)
    setIsOpen(false)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleTodayClick = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
    const formattedDate = today.toISOString().split('T')[0]
    onChange(formattedDate)
    setIsOpen(false)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const daysArray = []

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }

    return daysArray
  }

  const formatDateDisplay = (date: Date | null) => {
    if (!date) return placeholder
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="relative">
      <div 
        className="relative group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-blue-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 pr-12 flex items-center justify-between">
          <span className={selectedDate ? "text-slate-900" : "text-slate-400"}>
            {formatDateDisplay(selectedDate)}
          </span>
        </div>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none bg-blue-50 rounded-lg p-2 group-hover:bg-blue-100 transition-colors duration-200">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          {createPortal(
            <div className="absolute top-full left-0 mt-2 z-[99999] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden w-full">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <h3 className="font-semibold text-lg">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h3>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleTodayClick}
                  className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
                >
                  Today
                </button>
              </div>

              {/* Calendar Days */}
              <div className="p-4">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {days.map((day, index) => (
                    <div key={index} className="text-center text-xs font-semibold text-slate-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar dates */}
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendar().map((day, index) => (
                    <div key={index} className="aspect-square">
                      {day && (
                        <button
                          type="button"
                          onClick={() => handleDateSelect(day)}
                          className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200
                            ${selectedDate?.getDate() === day && 
                              selectedDate?.getMonth() === currentDate.getMonth() && 
                              selectedDate?.getFullYear() === currentDate.getFullYear()
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'hover:bg-slate-100 text-slate-900'
                            }
                            ${day === new Date().getDate() && 
                              new Date().getMonth() === currentDate.getMonth() && 
                              new Date().getFullYear() === currentDate.getFullYear() &&
                              !(selectedDate?.getDate() === day && 
                                selectedDate?.getMonth() === currentDate.getMonth() && 
                                selectedDate?.getFullYear() === currentDate.getFullYear())
                              ? 'bg-blue-50 text-blue-600 font-semibold'
                              : ''
                            }
                          `}
                        >
                          {day}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )}
        </>
      )}
    </div>
  )
}
