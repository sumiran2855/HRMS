"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"
import { cn } from "@/components/utils"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)) // May 2024
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const days = []

  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
    })
  }

  // Current month days
  const today = new Date()
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year,
    })
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
    })
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Calendar</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        {/* Calendar Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={prevMonth} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={nextMonth} className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday} className="text-xs bg-transparent">
              today
            </Button>
          </div>
          <span className="text-sm font-medium text-foreground">
            {MONTHS[month]} {year}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === "month" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
              className="text-xs"
            >
              month
            </Button>
            <Button
              variant={viewMode === "week" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("week")}
              className="text-xs"
            >
              week
            </Button>
            <Button
              variant={viewMode === "day" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("day")}
              className="text-xs"
            >
              day
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {DAYS.map((day) => (
            <div key={day} className="text-center py-2 text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((item, index) => (
            <button
              key={index}
              className={cn(
                "aspect-square flex items-center justify-center text-sm rounded-md transition-colors",
                item.isCurrentMonth ? "text-foreground hover:bg-secondary" : "text-muted-foreground/50",
                item.isToday && "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              {item.day}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
