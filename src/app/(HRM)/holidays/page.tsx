"use client"

import { useState } from "react"
import { Plus, Search, Edit2, Trash2, Calendar, Gift, Clock, MapPin } from "lucide-react"

interface Holiday {
  id: string
  name: string
  date: string
  type: "public" | "company" | "optional"
  duration: "full-day" | "half-day"
  location?: string
  description: string
  recurring: boolean
}

export default function HolidaysPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())

  const holidays: Holiday[] = [
    {
      id: "1",
      name: "New Year's Day",
      date: "2024-01-01",
      type: "public",
      duration: "full-day",
      description: "Celebration of the New Year",
      recurring: true
    },
    {
      id: "2",
      name: "Company Foundation Day",
      date: "2024-02-15",
      type: "company",
      duration: "full-day",
      description: "Anniversary of company establishment",
      recurring: true
    },
    {
      id: "3",
      name: "Good Friday",
      date: "2024-03-29",
      type: "public",
      duration: "full-day",
      description: "Christian religious holiday",
      recurring: true
    },
    {
      id: "4",
      name: "Team Building Event",
      date: "2024-04-20",
      type: "company",
      duration: "half-day",
      location: "Office & Recreation Center",
      description: "Quarterly team building activities",
      recurring: false
    },
    {
      id: "5",
      name: "Labor Day",
      date: "2024-05-01",
      type: "public",
      duration: "full-day",
      description: "International Workers' Day",
      recurring: true
    },
    {
      id: "6",
      name: "Independence Day",
      date: "2024-07-04",
      type: "public",
      duration: "full-day",
      description: "National Independence Day",
      recurring: true
    },
    {
      id: "7",
      name: "Summer Break",
      date: "2024-08-15",
      type: "company",
      duration: "full-day",
      description: "Company-wide summer holiday",
      recurring: true
    },
    {
      id: "8",
      name: "Thanksgiving Day",
      date: "2024-11-28",
      type: "public",
      duration: "full-day",
      description: "National day of gratitude",
      recurring: true
    },
    {
      id: "9",
      name: "Christmas Day",
      date: "2024-12-25",
      type: "public",
      duration: "full-day",
      description: "Christian religious celebration",
      recurring: true
    }
  ]

  const filteredHolidays = holidays.filter(holiday =>
    holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holiday.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "public":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "company":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "optional":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getDurationIcon = (duration: string) => {
    return duration === "full-day" ? <Calendar className="h-4 w-4" /> : <Clock className="h-4 w-4" />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { 
      weekday: "short", 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    })
  }

  const getUpcomingHolidays = () => {
    const today = new Date()
    return holidays
      .filter(holiday => new Date(holiday.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Holidays</h1>
          <p className="text-muted-foreground mt-1">Manage company holidays and time off</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Holiday
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search holidays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Holiday
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredHolidays.map((holiday) => (
                    <tr key={holiday.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Gift className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{holiday.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">{holiday.description}</div>
                            {holiday.recurring && (
                              <div className="text-xs text-muted-foreground mt-1">Recurring annually</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-foreground">{formatDate(holiday.date)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(holiday.type)}`}>
                          {holiday.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          {getDurationIcon(holiday.duration)}
                          {holiday.duration === "full-day" ? "Full Day" : "Half Day"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {holiday.location ? (
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {holiday.location}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingHoliday(holiday)}
                            className="p-2 hover:bg-accent rounded-lg transition-colors"
                          >
                            <Edit2 className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredHolidays.length === 0 && (
              <div className="text-center py-12">
                <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No holidays found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first holiday"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Holidays</h3>
            <div className="space-y-3">
              {getUpcomingHolidays().map((holiday) => (
                <div key={holiday.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Gift className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm">{holiday.name}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(holiday.date)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Holiday Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Holidays</span>
                <span className="font-semibold text-foreground">{holidays.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Public Holidays</span>
                <span className="font-semibold text-foreground">
                  {holidays.filter(h => h.type === "public").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Company Holidays</span>
                <span className="font-semibold text-foreground">
                  {holidays.filter(h => h.type === "company").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Optional Holidays</span>
                <span className="font-semibold text-foreground">
                  {holidays.filter(h => h.type === "optional").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(showAddModal || editingHoliday) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {editingHoliday ? "Edit Holiday" : "Add New Holiday"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Holiday Name</label>
                <input
                  type="text"
                  defaultValue={editingHoliday?.name}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter holiday name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                <input
                  type="date"
                  defaultValue={editingHoliday?.date}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                <select
                  defaultValue={editingHoliday?.type || "public"}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                >
                  <option value="public">Public Holiday</option>
                  <option value="company">Company Holiday</option>
                  <option value="optional">Optional Holiday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Duration</label>
                <select
                  defaultValue={editingHoliday?.duration || "full-day"}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                >
                  <option value="full-day">Full Day</option>
                  <option value="half-day">Half Day</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Location (Optional)</label>
                <input
                  type="text"
                  defaultValue={editingHoliday?.location}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter location if applicable"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  defaultValue={editingHoliday?.description}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Enter holiday description"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recurring"
                  defaultChecked={editingHoliday?.recurring}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="recurring" className="text-sm text-foreground">
                  Recurring annually
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingHoliday(null)
                }}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingHoliday(null)
                }}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {editingHoliday ? "Update" : "Add"} Holiday
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
