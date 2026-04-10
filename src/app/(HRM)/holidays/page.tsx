"use client"

import { useState } from "react"
import { Plus, Search, Edit2, Trash2, Calendar, Gift, Clock, MapPin, Sparkles, TrendingUp, Filter, X } from "lucide-react"
import HolidayModal from "@/components/dashboard/holidays/HolidayModal"

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
  const [holidays, setHolidays] = useState<Holiday[]>([
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
  ])

  const filteredHolidays = holidays.filter((holiday) => {
    const searchLower = searchTerm.toLowerCase()
    const nameLower = holiday.name?.toLowerCase() || ""
    const descLower = holiday.description?.toLowerCase() || ""
    const typeLower = holiday.type?.toLowerCase() || ""
    return nameLower.includes(searchLower) || descLower.includes(searchLower) || typeLower.includes(searchLower)
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "public":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
      case "company":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
      case "optional":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-800"
    }
  }

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "public":
        return "from-blue-500 to-blue-600"
      case "company":
        return "from-emerald-500 to-emerald-600"
      case "optional":
        return "from-amber-500 to-amber-600"
      default:
        return "from-slate-500 to-slate-600"
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

  const handleAddHoliday = (holidayData: Omit<Holiday, "id">) => {
    const newHoliday: Holiday = {
      id: Date.now().toString(),
      ...holidayData
    }
    setHolidays([...holidays, newHoliday])
    setShowAddModal(false)
  }

  const handleEditHoliday = (holidayData: Omit<Holiday, "id">) => {
    if (!editingHoliday) return
    setHolidays(holidays.map(h =>
      h.id === editingHoliday.id ? { ...holidayData, id: h.id } : h
    ))
    setEditingHoliday(null)
    setShowAddModal(false)
  }

  const handleDeleteHoliday = (id: string) => {
    setHolidays(holidays.filter(h => h.id !== id))
  }

  const openEditModal = (holiday: Holiday) => {
    setEditingHoliday(holiday)
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingHoliday(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Holiday Management
              </h1>
            </div>
            <p className="text-muted-foreground ml-11">Organize and track company holidays, public holidays, and time-off schedules</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Holiday
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-lg">Total</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{holidays.length}</div>
            <div className="text-sm text-muted-foreground">Total Holidays</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">Public</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{holidays.filter(h => h.type === "public").length}</div>
            <div className="text-sm text-muted-foreground">Public Holidays</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg shadow-violet-500/25">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2 py-1 rounded-lg">Company</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{holidays.filter(h => h.type === "company").length}</div>
            <div className="text-sm text-muted-foreground">Company Holidays</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/25">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg">Optional</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{holidays.filter(h => h.type === "optional").length}</div>
            <div className="text-sm text-muted-foreground">Optional Holidays</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search holidays by name, type, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground/60"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground cursor-pointer"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Holidays Table */}
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-slate-800">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Holiday Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {filteredHolidays.map((holiday) => (
                      <tr key={holiday.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${getTypeGradient(holiday.type)} shadow-lg`}>
                              <Gift className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-foreground text-base">{holiday.name}</div>
                              <div className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{holiday.description}</div>
                              {holiday.recurring && (
                                <div className="flex items-center gap-1.5 mt-1.5">
                                  <Sparkles className="h-3 w-3 text-primary" />
                                  <span className="text-xs font-medium text-primary">Recurring annually</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">{formatDate(holiday.date)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getTypeColor(holiday.type)}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <span className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                              {getDurationIcon(holiday.duration)}
                            </span>
                            <span className="font-medium">{holiday.duration === "full-day" ? "Full Day" : "Half Day"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal(holiday)}
                              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </button>
                            <button
                              onClick={() => handleDeleteHoliday(holiday.id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredHolidays.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No holidays found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    {searchTerm ? "Try adjusting your search terms or filters" : "Get started by adding your first holiday"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Upcoming Holidays</h3>
              </div>
              <div className="space-y-4">
                {getUpcomingHolidays().map((holiday, index) => (
                  <div key={holiday.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${getTypeGradient(holiday.type)} shadow-md flex-shrink-0`}>
                      <Gift className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground text-sm">{holiday.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{formatDate(holiday.date)}</div>
                    </div>
                  </div>
                ))}
                {getUpcomingHolidays().length === 0 && (
                  <div className="text-center py-4 text-sm text-muted-foreground">No upcoming holidays</div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 backdrop-blur-xl rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl">
                  <span className="text-sm text-muted-foreground">Total Days Off</span>
                  <span className="font-bold text-foreground">{holidays.length * 1}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-bold text-foreground">0</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl">
                  <span className="text-sm text-muted-foreground">Next Holiday</span>
                  <span className="font-bold text-foreground">
                    {getUpcomingHolidays()[0] ? formatDate(getUpcomingHolidays()[0].date) : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HolidayModal
          isOpen={showAddModal || !!editingHoliday}
          onClose={closeModal}
          onSave={editingHoliday ? handleEditHoliday : handleAddHoliday}
          editingHoliday={editingHoliday}
        />
      </div>
    </div>
  )
}
