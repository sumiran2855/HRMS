"use client"

import { Button } from "@/components/ui/Button"
import { X, Calendar, Clock, Repeat, AlignLeft, Tag } from "lucide-react"
import { CalendarEventForm, CalendarEvent, EventType, RecurringMode } from "@/types/dashboard"

interface CalendarEventModalProps {
  showEventModal: boolean
  setShowEventModal: (show: boolean) => void
  eventForm: CalendarEventForm
  setEventForm: (form: CalendarEventForm) => void
  editingEvent: CalendarEvent | null
  handleSaveEvent: () => void
}

export function CalendarEventModal({
  showEventModal,
  setShowEventModal,
  eventForm,
  setEventForm,
  editingEvent,
  handleSaveEvent
}: CalendarEventModalProps) {
  const addMinutesToTime = (time: string, minutes: number) => {
    const timeToMinutes = (time: string) => {
      const [h, m] = time.split(":").map(Number)
      return (h ?? 0) * 60 + (m ?? 0)
    }
    const minutesToTime = (minutes: number) => {
      const m = ((minutes % 1440) + 1440) % 1440
      const h = Math.floor(m / 60)
      const mm = m % 60
      return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`
    }
    return minutesToTime(timeToMinutes(time) + minutes)
  }

  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number)
    return (h ?? 0) * 60 + (m ?? 0)
  }

  if (!showEventModal) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={() => setShowEventModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </h3>
          </div>
          <button
            onClick={() => setShowEventModal(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Tag className="h-4 w-4 text-indigo-600" />
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
                placeholder="Enter event title"
              />
            </div>

            {/* Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Tag className="h-4 w-4 text-indigo-600" />
                Event Type
              </label>
              <div className="relative">
                <select
                  value={eventForm.type}
                  onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as EventType })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none bg-white text-slate-900 cursor-pointer"
                >
                  <option value="event">Event</option>
                  <option value="reminder">Reminder</option>
                  <option value="recurring">Recurring</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date and Time Grid */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Clock className="h-4 w-4 text-indigo-600" />
                    Start Time
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Clock className="h-4 w-4 text-indigo-600" />
                    End Time
                  </label>
                  <input
                    type="time"
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Recurring */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Repeat className="h-4 w-4 text-indigo-600" />
                Recurring Pattern
              </label>
              <div className="relative">
                <select
                  value={eventForm.recurring}
                  onChange={(e) => setEventForm({ ...eventForm, recurring: e.target.value as RecurringMode })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none bg-white text-slate-900 cursor-pointer"
                >
                  <option value="none">Does not repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <AlignLeft className="h-4 w-4 text-indigo-600" />
                Description
              </label>
              <textarea
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none text-slate-900 placeholder:text-slate-400"
                placeholder="Add event description, notes, or location details..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => setShowEventModal(false)}
            className="flex-1 px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 rounded-xl font-semibold transition-all duration-200 shadow-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveEvent}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            disabled={!eventForm.title.trim()}
          >
            {editingEvent ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </div>
    </div>
  )
}