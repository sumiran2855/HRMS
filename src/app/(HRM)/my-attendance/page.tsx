"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Search, Calendar, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, User, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { AttendanceCalendar } from "@/components/dashboard/attendance/AttendanceCalendar"

// Mock current user data (in real app, this would come from auth context)
const currentUser = {
  id: 1,
  name: "Alexander Smith",
  employeeId: "EMP001",
  department: "Engineering",
  position: "Senior Developer",
  role: "employee" // or "admin"
}

// Mock attendance data for current employee
const employeeAttendanceData = [
  { date: "2024-03-27", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-26", checkIn: "08:45 AM", checkOut: "07:15 PM", status: "present", overtime: "1h 15m", notes: "Worked on project deadline" },
  { date: "2024-03-25", checkIn: "09:30 AM", checkOut: "06:30 PM", status: "late", overtime: "0h", notes: "Traffic delay" },
  { date: "2024-03-24", checkIn: "-", checkOut: "-", status: "absent", overtime: "0h", notes: "Medical leave" },
  { date: "2024-03-23", checkIn: "08:00 AM", checkOut: "05:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-22", checkIn: "08:30 AM", checkOut: "06:30 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-21", checkIn: "09:15 AM", checkOut: "06:00 PM", status: "late", overtime: "0h", notes: "Late start" },
  { date: "2024-03-20", checkIn: "08:00 AM", checkOut: "02:00 PM", status: "halfday", overtime: "0h", notes: "Personal work" },
  { date: "2024-03-19", checkIn: "-", checkOut: "-", status: "leave", overtime: "0h", notes: "Approved vacation" },
  { date: "2024-03-18", checkIn: "08:45 AM", checkOut: "06:15 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-17", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-16", checkIn: "08:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-15", checkIn: "-", checkOut: "-", status: "absent", overtime: "0h", notes: "Sick leave" },
  { date: "2024-03-14", checkIn: "08:30 AM", checkOut: "06:30 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-13", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-12", checkIn: "08:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-11", checkIn: "08:45 AM", checkOut: "06:15 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-10", checkIn: "09:30 AM", checkOut: "06:00 PM", status: "late", overtime: "0h", notes: "Traffic delay" },
  { date: "2024-03-09", checkIn: "08:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-08", checkIn: "08:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-07", checkIn: "08:30 AM", checkOut: "06:30 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-06", checkIn: "-", checkOut: "-", status: "leave", overtime: "0h", notes: "Personal leave" },
  { date: "2024-03-05", checkIn: "-", checkOut: "-", status: "holiday", overtime: "0h", notes: "Company holiday" },
  { date: "2024-03-04", checkIn: "08:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-03", checkIn: "08:45 AM", checkOut: "06:15 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-02", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h", notes: "Regular work day" },
  { date: "2024-03-01", checkIn: "08:30 AM", checkOut: "06:30 PM", status: "present", overtime: "0h", notes: "Regular work day" }
]

export default function MyAttendancePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  // Filter attendance data
  const filteredAttendance = employeeAttendanceData.filter(record => {
    const matchesSearch = record.notes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All Status" || record.status === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  // Calculate statistics
  const stats = {
    total: filteredAttendance.length,
    present: filteredAttendance.filter(r => r.status === 'present').length,
    absent: filteredAttendance.filter(r => r.status === 'absent').length,
    late: filteredAttendance.filter(r => r.status === 'late').length,
    halfDay: filteredAttendance.filter(r => r.status === 'halfday').length,
    leave: filteredAttendance.filter(r => r.status === 'leave').length,
    holiday: filteredAttendance.filter(r => r.status === 'holiday').length,
    totalOvertime: filteredAttendance.reduce((sum, r) => {
      if (r.overtime === "0h") return sum
      const parts = r.overtime.split(' ')
      let hours = 0
      let minutes = 0
      
      parts.forEach(part => {
        if (part.includes('h')) {
          hours = parseInt(part.replace('h', '')) || 0
        } else if (part.includes('m')) {
          minutes = parseInt(part.replace('m', '')) || 0
        }
      })
      
      return sum + (hours * 60 + minutes)
    }, 0)
  }

  const attendancePercentage = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "detailed", label: "Detailed Records", icon: Clock },
    { id: "reports", label: "My Reports", icon: Download }
  ]

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'present':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', label: 'Present' }
      case 'absent':
        return { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50', label: 'Absent' }
      case 'late':
        return { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: 'Late' }
      case 'halfday':
        return { icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-50', label: 'Half Day' }
      case 'leave':
        return { icon: AlertCircle, color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'On Leave' }
      case 'holiday':
        return { icon: Calendar, color: 'text-purple-600', bgColor: 'bg-purple-50', label: 'Holiday' }
      default:
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', label: 'Present' }
    }
  }

  const formatOvertime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}m`
    if (mins === 0) return `${hours}h`
    return `${hours}h ${mins}m`
  }

  const monthYear = selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {currentUser.role === 'admin' ? 'Employee Attendance' : 'My Attendance'}
          </h1>
          <p className="text-slate-500 mt-1">
            {currentUser.role === 'admin' 
              ? 'View and manage all employee attendance records'
              : `Track your monthly attendance and work patterns`
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newDate = new Date(selectedMonth)
              newDate.setMonth(selectedMonth.getMonth() - 1)
              setSelectedMonth(newDate)
            }}
            className="cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-medium text-slate-700 min-w-[150px] text-center">
            {monthYear}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newDate = new Date(selectedMonth)
              newDate.setMonth(selectedMonth.getMonth() + 1)
              setSelectedMonth(newDate)
            }}
            className="cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* User Info Card (for admin view) */}
      {currentUser.role === 'admin' && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{currentUser.name}</h3>
                <p className="text-slate-600">{currentUser.employeeId} • {currentUser.position}</p>
                <p className="text-sm text-slate-500">{currentUser.department}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{attendancePercentage}%</p>
                <p className="text-sm text-blue-600">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-green-600">Present</p>
              <p className="text-xl font-bold text-green-900">{stats.present}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-red-600">Absent</p>
              <p className="text-xl font-bold text-red-900">{stats.absent}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-yellow-600">Late</p>
              <p className="text-xl font-bold text-yellow-900">{stats.late}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-orange-600">Half Day</p>
              <p className="text-xl font-bold text-orange-900">{stats.halfDay}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">On Leave</p>
              <p className="text-xl font-bold text-blue-900">{stats.leave}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white rounded-t-xl overflow-hidden">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {isActive && (
                  <span className="ml-2 w-1 h-1 rounded-full bg-blue-500" />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
              >
                <option value="All Status">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Half Day">Half Day</option>
                <option value="Leave">On Leave</option>
                <option value="Holiday">Holiday</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Attendance */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Attendance (Last 7 Days)</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                {filteredAttendance.slice(0, 7).map((record, index) => {
                  const config = getStatusConfig(record.status)
                  const StatusIcon = config.icon
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{record.date}</p>
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <p className="font-medium text-foreground">{record.checkIn}</p>
                        </div>
                        <div className="flex items-center gap-2 justify-end mb-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">{record.checkOut}</p>
                        </div>
                        {record.overtime !== "0h" && (
                          <p className="text-xs text-blue-600 font-medium">+{record.overtime}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Attendance Summary */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800/30 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-medium text-green-900 dark:text-green-100">Present Days</span>
                  </div>
                  <span className="font-bold text-green-900 dark:text-green-100">{stats.present} days</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-800/30 rounded-lg flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="font-medium text-red-900 dark:text-red-100">Absent Days</span>
                  </div>
                  <span className="font-bold text-red-900 dark:text-red-100">{stats.absent} days</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className="font-medium text-yellow-900 dark:text-yellow-100">Late Arrivals</span>
                  </div>
                  <span className="font-bold text-yellow-900 dark:text-yellow-100">{stats.late} times</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800/30 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-blue-900 dark:text-blue-100">Leave Taken</span>
                  </div>
                  <span className="font-bold text-blue-900 dark:text-blue-100">{stats.leave} days</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="font-medium text-purple-900 dark:text-purple-100">Total Overtime</span>
                  </div>
                  <span className="font-bold text-purple-900 dark:text-purple-100">{formatOvertime(stats.totalOvertime)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "detailed" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Overtime
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAttendance.map((record, index) => {
                    const config = getStatusConfig(record.status)
                    const StatusIcon = config.icon
                    
                    return (
                      <tr key={index} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div className="font-medium text-foreground">{record.date}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{record.checkIn}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{record.checkOut}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${
                            record.status === 'present' 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : record.status === 'absent'
                              ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                              : record.status === 'late'
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                              : record.status === 'halfday'
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                              : record.status === 'leave'
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              record.status === 'present' ? "bg-green-500" 
                              : record.status === 'absent' ? "bg-red-500"
                              : record.status === 'late' ? "bg-yellow-500"
                              : record.status === 'halfday' ? "bg-orange-500"
                              : record.status === 'leave' ? "bg-blue-500"
                              : "bg-purple-500"
                            }`} />
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`font-medium ${
                            record.overtime !== "0h" ? "text-blue-600" : "text-muted-foreground"
                          }`}>
                            {record.overtime}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-foreground">{record.notes}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredAttendance.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No attendance records found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedStatus !== "All Status" 
                    ? "Try adjusting your search or filter criteria" 
                    : "No attendance data available for the selected period"}
                </p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "reports" && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">My Attendance Reports</h3>
              <p className="text-slate-500 mb-4">Download your attendance reports for different time periods.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  Monthly Report
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Quarterly Report
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  Annual Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
