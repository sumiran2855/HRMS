"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/components/utils"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Edit2,
  Trash2,
  Clock,
  Calendar as CalendarIcon
} from "lucide-react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const
const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"] as const
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
] as const

type CalendarViewMode = "month" | "week" | "day"
type EventType = "reminder" | "event" | "recurring"
type RecurringMode = "none" | "daily" | "weekly" | "monthly"

type CalendarEvent = {
  id: string
  title: string
  type: EventType
  date: string
  time: string
  endTime?: string
  description: string
  recurring: RecurringMode
}

type CalendarEventForm = {
  title: string
  type: EventType
  date: string
  time: string
  endTime: string
  description: string
  recurring: RecurringMode
}

function pad2(value: number) {
  return String(value).padStart(2, "0")
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

function parseDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function addMonths(date: Date, months: number) {
  const next = new Date(date)
  next.setMonth(next.getMonth() + months)
  return next
}

function startOfWeek(date: Date) {
  const d = startOfDay(date)
  return addDays(d, -d.getDay())
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number)
  return (h ?? 0) * 60 + (m ?? 0)
}

function minutesToTime(minutes: number) {
  const m = ((minutes % 1440) + 1440) % 1440
  const h = Math.floor(m / 60)
  const mm = m % 60
  return `${pad2(h)}:${pad2(mm)}`
}

function addMinutesToTime(time: string, minutes: number) {
  return minutesToTime(timeToMinutes(time) + minutes)
}

const EVENT_COLORS = {
  reminder: "bg-blue-500",
  event: "bg-purple-500",
  recurring: "bg-green-500"
}

export function CalendarWidget({ className }: { className?: string }) {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date())
  const [viewMode, setViewMode] = useState<CalendarViewMode>("month")
  const [selectedDate, setSelectedDate] = useState<Date>(() => startOfDay(new Date()))
  const [showEventModal, setShowEventModal] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const [eventForm, setEventForm] = useState<CalendarEventForm>({
    title: "",
    type: "event",
    date: dateKey(new Date()),
    time: "09:00",
    endTime: "09:30",
    description: "",
    recurring: "none"
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const setView = (mode: CalendarViewMode) => {
    setViewMode(mode)
    if (mode === "week" || mode === "day") {
      setSelectedDate(startOfDay(currentDate))
    }
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const currentWeekStart = useMemo(() => startOfWeek(currentDate), [currentDate])
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i)),
    [currentWeekStart]
  )

  const prevRange = () => {
    if (viewMode === "month") {
      setCurrentDate((d) => addMonths(d, -1))
      return
    }
    if (viewMode === "week") {
      setCurrentDate((d) => addDays(d, -7))
      setSelectedDate((d) => addDays(d, -7))
      return
    }
    setCurrentDate((d) => addDays(d, -1))
    setSelectedDate((d) => addDays(d, -1))
  }

  const nextRange = () => {
    if (viewMode === "month") {
      setCurrentDate((d) => addMonths(d, 1))
      return
    }
    if (viewMode === "week") {
      setCurrentDate((d) => addDays(d, 7))
      setSelectedDate((d) => addDays(d, 7))
      return
    }
    setCurrentDate((d) => addDays(d, 1))
    setSelectedDate((d) => addDays(d, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(startOfDay(today))
  }

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const getDaysArray = () => {
    const days: Array<{ day: number; date: Date; isCurrentMonth: boolean }> = []

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false
      })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        date: new Date(year, month, i),
        isCurrentMonth: true
      })
    }

    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      })
    }

    return days
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const eventOccursOnDate = (event: CalendarEvent, date: Date) => {
    const target = startOfDay(date)
    const start = startOfDay(parseDateKey(event.date))

    if (event.recurring === "none") {
      return start.toDateString() === target.toDateString()
    }
    if (start > target) return false
    if (event.recurring === "daily") return true
    if (event.recurring === "weekly") return start.getDay() === target.getDay()
    if (event.recurring === "monthly") return start.getDate() === target.getDate()
    return false
  }

  const getEventsForDate = (date: Date) => {
    return events
      .filter((event) => eventOccursOnDate(event, date))
      .slice()
      .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
  }

  const handleDateClick = (dateObj: { date: Date }) => {
    setSelectedDate(dateObj.date)
    setCurrentDate(dateObj.date)
    if (isMobile) {
      setShowMobileMenu(true)
    }
  }

  const handleAddEvent = () => {
    const dateStr = dateKey(selectedDate)

    setEventForm({
      title: "",
      type: "event",
      date: dateStr,
      time: "09:00",
      endTime: "09:30",
      description: "",
      recurring: "none"
    })
    setEditingEvent(null)
    setShowEventModal(true)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setEventForm({
      title: event.title,
      type: event.type,
      date: event.date,
      time: event.time,
      endTime: event.endTime ?? addMinutesToTime(event.time, 30),
      description: event.description,
      recurring: event.recurring
    })
    setEditingEvent(event)
    setShowEventModal(true)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId))
  }

  const handleSaveEvent = () => {
    if (!eventForm.title.trim()) return

    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...eventForm, id: e.id } : e))
    } else {
      setEvents([...events, { ...eventForm, id: String(Date.now()) }])
    }

    setShowEventModal(false)
    setEventForm({
      title: "",
      type: "event",
      date: dateKey(selectedDate),
      time: "09:00",
      endTime: "09:30",
      description: "",
      recurring: "none"
    })
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  const headerLabel = useMemo(() => {
    if (viewMode === "month") return `${MONTHS[month]} ${year}`
    if (viewMode === "week") {
      const start = currentWeekStart
      const end = addDays(start, 6)
      const startLabel = start.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      const endLabel = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      return `${startLabel} – ${endLabel}`
    }
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }, [currentWeekStart, month, selectedDate, viewMode, year])

  const openAddEventForSlot = (date: Date, minutes: number) => {
    const d = startOfDay(date)
    setSelectedDate(d)
    setCurrentDate(d)
    const startTime = minutesToTime(minutes)
    setEventForm({
      title: "",
      type: "event",
      date: dateKey(d),
      time: startTime,
      endTime: addMinutesToTime(startTime, 30),
      description: "",
      recurring: "none"
    })
    setEditingEvent(null)
    setShowEventModal(true)
  }

  const timeSlots = useMemo(() => {
    const start = 8 * 60
    const end = 20 * 60
    const step = 30
    return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step)
  }, [])

  return (
    <div className={cn("w-full h-full min-h-0", className)}>
      <div className="h-full min-h-0">
        <Card className="shadow-xl border-0 bg-white flex flex-col h-full min-h-0">
          <CardHeader className="border-b bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <CalendarIcon className="h-6 w-6" />
                  {headerLabel}
                </CardTitle>

                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={prevRange}
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 border-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={nextRange}
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 border-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={goToToday}
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 border-0 text-xs px-3"
                    >
                      Today
                    </Button>
                  </div>

                  <Button
                    onClick={handleAddEvent}
                    size="sm"
                    className="bg-white text-indigo-600 hover:bg-white/90 gap-1 px-3"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex w-full sm:w-auto rounded-xl bg-white/15 p-1 ring-1 ring-white/20">
                  <button
                    type="button"
                    onClick={() => setView("month")}
                    className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${viewMode === "month" ? "bg-white text-indigo-700 shadow" : "text-white/90 hover:bg-white/10"}`}
                  >
                    Month
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("week")}
                    className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${viewMode === "week" ? "bg-white text-indigo-700 shadow" : "text-white/90 hover:bg-white/10"}`}
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("day")}
                    className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${viewMode === "day" ? "bg-white text-indigo-700 shadow" : "text-white/90 hover:bg-white/10"}`}
                  >
                    Day
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-2 sm:p-4 md:p-6 flex-1 min-h-0">
            {viewMode === "month" ? (
              <div className="h-full min-h-0 flex flex-col overflow-hidden">
                <div className="grid grid-cols-7 grid-rows-[auto_repeat(6,minmax(0,1fr))] gap-1 md:gap-2 flex-1 min-h-0">
                  {(isMobile ? DAYS_SHORT : DAYS).map((day, idx) => (
                    <div
                      key={idx}
                      className="text-center py-2 text-xs md:text-sm font-semibold text-slate-600"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Calendar Days */}
                  {getDaysArray().map((dateObj, index) => {
                    const dayEvents = getEventsForDate(dateObj.date)
                    const hasEvents = dayEvents.length > 0

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateClick(dateObj)}
                        className={`
                          relative min-h-0 flex flex-col items-center justify-start p-1 md:p-2
                          rounded-lg transition-all duration-200 hover:shadow-md
                          ${dateObj.isCurrentMonth
                            ? 'bg-white hover:bg-indigo-50'
                            : 'bg-slate-50 text-slate-400'
                          }
                          ${isToday(dateObj.date)
                            ? 'ring-2 ring-indigo-500 bg-indigo-50'
                            : ''
                          }
                          ${isSelected(dateObj.date)
                            ? 'ring-2 ring-purple-500 bg-purple-50'
                            : ''
                          }
                        `}
                      >
                        <span className={`
                          text-xs md:text-sm font-medium mb-1
                          ${isToday(dateObj.date) ? 'text-indigo-600 font-bold' : ''}
                        `}>
                          {dateObj.day}
                        </span>

                        {hasEvents && (
                          <div className="flex flex-wrap gap-0.5 w-full justify-center">
                            {dayEvents.slice(0, isMobile ? 2 : 3).map((event, i) => (
                              <div
                                key={i}
                                className={`h-1 w-1 md:h-1.5 md:w-1.5 rounded-full ${EVENT_COLORS[event.type]}`}
                              />
                            ))}
                            {dayEvents.length > (isMobile ? 2 : 3) && (
                              <span className="text-[8px] md:text-[10px] text-slate-500">
                                +{dayEvents.length - (isMobile ? 2 : 3)}
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t flex flex-wrap gap-3 md:gap-4 text-xs shrink-0">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded ${EVENT_COLORS.event}`} />
                    <span className="text-slate-600">Event</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded ${EVENT_COLORS.reminder}`} />
                    <span className="text-slate-600">Reminder</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded ${EVENT_COLORS.recurring}`} />
                    <span className="text-slate-600">Recurring</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden">
                {viewMode === "week" && (
                  <div className="overflow-x-auto">
                    <div className="min-w-[900px]">
                      <div className="grid grid-cols-[72px_repeat(7,minmax(120px,1fr))] gap-px bg-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-white" />
                        {weekDays.map((day) => (
                          <button
                            key={day.toISOString()}
                            onClick={() => handleDateClick({ date: day })}
                            className={`bg-white p-2 text-left transition-colors hover:bg-indigo-50 ${isSelected(day) ? "ring-2 ring-purple-500" : ""}`}
                          >
                            <div className={`text-xs font-semibold ${isToday(day) ? "text-indigo-600" : "text-slate-700"}`}>
                              {day.toLocaleDateString("en-US", { weekday: "short" })}
                            </div>
                            <div className="text-sm font-bold text-slate-900">{day.getDate()}</div>
                          </button>
                        ))}

                        {timeSlots.map((minutes) => (
                          <div key={minutes} className="contents">
                            <div className="bg-white px-2 py-2 text-[11px] font-semibold text-slate-600 flex items-start justify-end">
                              {minutesToTime(minutes)}
                            </div>
                            {weekDays.map((day) => {
                              const slotEvents = getEventsForDate(day).filter((e) => timeToMinutes(e.time) === minutes)
                              return (
                                <button
                                  key={`${day.toISOString()}-${minutes}`}
                                  onClick={() => openAddEventForSlot(day, minutes)}
                                  className="bg-white px-1 py-1 h-12 align-top text-left hover:bg-slate-50 transition-colors"
                                >
                                  <div className="space-y-1">
                                    {slotEvents.slice(0, 2).map((event) => (
                                      <div
                                        key={event.id}
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          handleEditEvent(event)
                                        }}
                                        className={`px-2 py-1 rounded-md text-[10px] font-semibold text-white truncate ${EVENT_COLORS[event.type]}`}
                                      >
                                        {event.title}
                                      </div>
                                    ))}
                                    {slotEvents.length > 2 && (
                                      <div className="text-[10px] text-slate-500">+{slotEvents.length - 2}</div>
                                    )}
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {viewMode === "day" && (
                  <div className="overflow-x-auto">
                    <div className="min-w-[520px]">
                      <div className="grid grid-cols-[72px_minmax(260px,1fr)] gap-px bg-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-white" />
                        <div className="bg-white p-3">
                          <div className={`text-xs font-semibold ${isToday(selectedDate) ? "text-indigo-600" : "text-slate-700"}`}>
                            {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
                          </div>
                          <div className="text-sm font-bold text-slate-900">
                            {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </div>
                        </div>

                        {timeSlots.map((minutes) => {
                          const slotEvents = getEventsForDate(selectedDate).filter((e) => timeToMinutes(e.time) === minutes)
                          return (
                            <div key={minutes} className="contents">
                              <div className="bg-white px-2 py-2 text-[11px] font-semibold text-slate-600 flex items-start justify-end">
                                {minutesToTime(minutes)}
                              </div>
                              <button
                                onClick={() => openAddEventForSlot(selectedDate, minutes)}
                                className="bg-white px-2 py-1 h-12 text-left hover:bg-slate-50 transition-colors"
                              >
                                <div className="space-y-1">
                                  {slotEvents.slice(0, 2).map((event) => (
                                    <div
                                      key={event.id}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleEditEvent(event)
                                      }}
                                      className={`px-2 py-1 rounded-md text-[10px] font-semibold text-white truncate ${EVENT_COLORS[event.type]}`}
                                    >
                                      {event.title}
                                    </div>
                                  ))}
                                  {slotEvents.length > 2 && (
                                    <div className="text-[10px] text-slate-500">+{slotEvents.length - 2}</div>
                                  )}
                                </div>
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mobile Events Drawer */}
      {isMobile && showMobileMenu && selectedDate && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">
                {selectedDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </h3>
              <button onClick={() => setShowMobileMenu(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {selectedDateEvents.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p>No events</p>
                <Button
                  onClick={() => {
                    setShowMobileMenu(false)
                    handleAddEvent()
                  }}
                  size="sm"
                  className="mt-4 bg-indigo-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateEvents.map(event => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border-l-4 bg-slate-50 ${EVENT_COLORS[event.type].replace('bg-', 'border-')}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{event.title}</h4>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setShowMobileMenu(false)
                            handleEditEvent(event)
                          }}
                          className="p-1"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-1"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {event.time}
                          {event.endTime ? ` – ${event.endTime}` : ""}
                        </span>
                      </div>
                      {event.description && (
                        <p className="mt-2 text-xs text-slate-500">{event.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowEventModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">
                  {editingEvent ? 'Edit Event' : 'New Event'}
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Type
                  </label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as EventType })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="event">Event</option>
                    <option value="reminder">Reminder</option>
                    <option value="recurring">Recurring</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Start
                    </label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => {
                        const nextTime = e.target.value
                        const nextEndTime = timeToMinutes(eventForm.endTime) <= timeToMinutes(nextTime)
                          ? addMinutesToTime(nextTime, 30)
                          : eventForm.endTime
                        setEventForm({ ...eventForm, time: nextTime, endTime: nextEndTime })
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      End
                    </label>
                    <input
                      type="time"
                      value={eventForm.endTime}
                      onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Recurring
                  </label>
                  <select
                    value={eventForm.recurring}
                    onChange={(e) => setEventForm({ ...eventForm, recurring: e.target.value as RecurringMode })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="none">None</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Add details..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEvent}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  disabled={!eventForm.title.trim()}
                >
                  {editingEvent ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}