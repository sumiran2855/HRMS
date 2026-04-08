"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"

export function AttendanceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }

  const getAttendanceData = (day: number) => {
    // Mock attendance data for demonstration
    const attendanceTypes = ['present', 'absent', 'late', 'present', 'present']
    const randomType = attendanceTypes[day % attendanceTypes.length]
    
    switch (randomType) {
      case 'present':
        return { status: 'present', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' }
      case 'absent':
        return { status: 'absent', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50' }
      case 'late':
        return { status: 'late', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
      default:
        return { status: 'present', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' }
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const days = getDaysInMonth(currentDate)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const today = new Date()
  const isToday = (day: number) => {
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-400" />
            Monthly Attendance View
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-medium text-slate-700 min-w-[150px] text-center">
              {monthYear}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center py-2 text-xs font-semibold text-slate-600">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }
            
            const attendance = getAttendanceData(day)
            const AttendanceIcon = attendance.icon
            const isSelected = selectedDate?.getDate() === day && 
                              selectedDate?.getMonth() === currentDate.getMonth() &&
                              selectedDate?.getFullYear() === currentDate.getFullYear()
            
            return (
              <button
                key={day}
                onClick={() => {
                  const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                  setSelectedDate(newDate)
                }}
                className={`
                  aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-1
                  transition-all duration-200 hover:shadow-md
                  ${isToday(day) ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}
                  ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                  ${!isToday(day) && !isSelected ? 'hover:border-slate-300' : ''}
                `}
              >
                <span className={`text-sm font-medium ${
                  isToday(day) ? 'text-blue-600' : 'text-slate-700'
                }`}>
                  {day}
                </span>
                <div className={`w-5 h-5 rounded-full ${attendance.bgColor} flex items-center justify-center`}>
                  <AttendanceIcon className={`w-3 h-3 ${attendance.color}`} />
                </div>
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-2.5 h-2.5 text-green-600" />
            </div>
            <span className="text-xs text-slate-600">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center">
              <XCircle className="w-2.5 h-2.5 text-red-600" />
            </div>
            <span className="text-xs text-slate-600">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-50 flex items-center justify-center">
              <Clock className="w-2.5 h-2.5 text-yellow-600" />
            </div>
            <span className="text-xs text-slate-600">Late</span>
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Total Employees</p>
                <p className="font-medium text-slate-900">45</p>
              </div>
              <div>
                <p className="text-slate-500">Present</p>
                <p className="font-medium text-green-600">42</p>
              </div>
              <div>
                <p className="text-slate-500">Absent/Late</p>
                <p className="font-medium text-red-600">3</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
