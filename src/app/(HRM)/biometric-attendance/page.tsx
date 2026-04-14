"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, Users, Clock, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Filter, Download, Fingerprint, Shield, X, Wifi, Activity, Loader2 } from "lucide-react"
import BiometricAttendanceModal from "@/components/dashboard/biometric-attendance/BiometricAttendanceModal"
import AdvancedFilterModal from "@/components/dashboard/biometric-attendance/AdvancedFilterModal"
import { employeeService } from "@/services/employee.service"
import { attendanceService } from "@/services/attendance.service"
import { GetAttendanceByDateRangeDto } from "@/types/attendance.types"
import { Employee } from "@/types/employee.types"

interface BiometricAttendance {
  id: number
  employeeId: string
  name: string
  department: string
  inTime: string
  outTime: string
  date: string
  status: "present" | "absent" | "late" | "leave"
  location: string
  workHours: number
  device: string
  geofenceStatus: "inside" | "outside" | "exempt"
}

// TODO: Get these from auth context
const organizationId = "org123"

export default function BiometricAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"view" | "edit" | "delete">("view")
  const [selectedAttendance, setSelectedAttendance] = useState<BiometricAttendance | null>(null)
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [attendanceData, setAttendanceData] = useState<BiometricAttendance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [advancedFilters, setAdvancedFilters] = useState<{
    dateFrom: string
    dateTo: string
    departments: string[]
    statuses: string[]
    geofenceStatuses: string[]
    devices: string[]
    minWorkHours: number
    maxWorkHours: number
  }>({
    dateFrom: "",
    dateTo: "",
    departments: [],
    statuses: [],
    geofenceStatuses: [],
    devices: [],
    minWorkHours: 0,
    maxWorkHours: 24,
  })

  // Load data when date changes
  useEffect(() => {
    loadData()
  }, [selectedDate])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const employeesResponse = await employeeService.getEmployees()
      if (employeesResponse.success && employeesResponse.data) {
        setEmployees(employeesResponse.data)
      }

      const query: GetAttendanceByDateRangeDto = {
        organizationId,
        startDate: selectedDate,
        endDate: selectedDate,
      }

      const attendanceResponse = await attendanceService.getAttendanceByDateRange(query)
      if (attendanceResponse.success && attendanceResponse.data) {
        const transformedData = attendanceResponse.data.map((record, index) => {
          const employee = employeesResponse.data?.find(emp => emp.employeeId === record.employeeId)
          return {
            id: index + 1,
            employeeId: record.employeeId,
            name: employee ? `${employee.firstName} ${employee.lastName}` : record.employeeId,
            department: employee?.departmentId || 'Unassigned',
            inTime: record.checkInTime ? new Date(`2000-01-01T${record.checkInTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-',
            outTime: record.checkOutTime ? new Date(`2000-01-01T${record.checkOutTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-',
            date: record.date,
            status: record.status as "present" | "absent" | "late" | "leave",
            location: record.checkInTime ? "Main Gate" : '-',
            workHours: record.workHours || 0,
            device: record.checkInTime ? "Fingerprint Scanner-01" : '-',
            geofenceStatus: "inside" as const
          }
        })
        setAttendanceData(transformedData)
      }
    } catch (err: any) {
      setError(err.message || "Failed to load data")
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  // Filter data based on search, status, and advanced filters
  const filteredData = attendanceData.filter((employee) => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === "All Status" || employee.status === selectedStatus.toLowerCase()

    // Advanced filters
    const matchesDateRange = 
      (!advancedFilters.dateFrom || employee.date >= advancedFilters.dateFrom) &&
      (!advancedFilters.dateTo || employee.date <= advancedFilters.dateTo)
    
    const matchesDepartment = advancedFilters.departments.length === 0 || advancedFilters.departments.includes(employee.department)
    
    const matchesAdvancedStatus = advancedFilters.statuses.length === 0 || advancedFilters.statuses.includes(employee.status)
    
    const matchesGeofence = advancedFilters.geofenceStatuses.length === 0 || advancedFilters.geofenceStatuses.includes(employee.geofenceStatus)
    
    const matchesDevice = advancedFilters.devices.length === 0 || advancedFilters.devices.includes(employee.device)
    
    const matchesWorkHours = 
      employee.workHours >= advancedFilters.minWorkHours &&
      employee.workHours <= advancedFilters.maxWorkHours

    return matchesSearch && matchesStatus && matchesDateRange && matchesDepartment && matchesAdvancedStatus && matchesGeofence && matchesDevice && matchesWorkHours
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Calculate statistics
  const stats = {
    total: attendanceData.length,
    present: attendanceData.filter(e => e.status === 'present').length,
    absent: attendanceData.filter(e => e.status === 'absent').length,
    late: attendanceData.filter(e => e.status === 'late').length,
    leave: attendanceData.filter(e => e.status === 'leave').length
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'present':
        return { color: 'text-green-600', bgColor: 'bg-green-50', label: 'Present' }
      case 'absent':
        return { color: 'text-red-600', bgColor: 'bg-red-50', label: 'Absent' }
      case 'late':
        return { color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: 'Late' }
      case 'leave':
        return { color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'On Leave' }
      default:
        return { color: 'text-green-600', bgColor: 'bg-green-50', label: 'Present' }
    }
  }

  const handleAction = (action: string, employeeId: number) => {
    const attendance = attendanceData.find(d => d.id === employeeId)
    if (!attendance) return

    if (action === "view") {
      setModalMode("view")
      setSelectedAttendance(attendance)
      setIsModalOpen(true)
    } else if (action === "edit") {
      setModalMode("edit")
      setSelectedAttendance(attendance)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: number) => {
    const attendance = attendanceData.find(d => d.id === id)
    if (!attendance) return

    setModalMode("delete")
    setSelectedAttendance(attendance)
    setIsModalOpen(true)
  }

  const handleSaveAttendance = (updatedAttendance: BiometricAttendance) => {
    setAttendanceData(attendanceData.map(d =>
      d.id === updatedAttendance.id ? updatedAttendance : d
    ))
  }

  const handleDeleteAttendance = (id: number) => {
    setAttendanceData(attendanceData.filter(d => d.id !== id))
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAttendance(null)
  }

  const handleApplyAdvancedFilters = (filters: typeof advancedFilters) => {
    setAdvancedFilters(filters)
    setCurrentPage(1)
  }

  const handleResetAdvancedFilters = () => {
    setAdvancedFilters({
      dateFrom: "",
      dateTo: "",
      departments: [],
      statuses: [],
      geofenceStatuses: [],
      devices: [],
      minWorkHours: 0,
      maxWorkHours: 24,
    })
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading biometric attendance data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                <Fingerprint className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Biometric Attendance
              </h1>
            </div>
            <p className="text-muted-foreground ml-11">Monitor and manage employee biometric attendance with real-time tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-foreground rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 font-medium">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={() => setIsAdvancedFilterOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 font-medium"
            >
              <Filter className="h-4 w-4" />
              Advanced Filter
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-lg">Total</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Registered Today</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">Present</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.present}</div>
            <div className="text-sm text-muted-foreground">On Time</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/25">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg">Late</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.late}</div>
            <div className="text-sm text-muted-foreground">Late Arrivals</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg shadow-red-500/25">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded-lg">Absent</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.absent}</div>
            <div className="text-sm text-muted-foreground">Absent</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg shadow-violet-500/25">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2 py-1 rounded-lg">Leave</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.leave}</div>
            <div className="text-sm text-muted-foreground">On Leave</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by employee ID, name, or department..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
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
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground cursor-pointer"
              />
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value)
                  setCurrentPage(1)
                }}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground cursor-pointer"
              >
                <option value="All Status">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="leave">On Leave</option>
              </select>
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground cursor-pointer"
              >
                <option value={10}>10 entries</option>
                <option value={25}>25 entries</option>
                <option value={50}>50 entries</option>
              </select>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Check In</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Check Out</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Work Hours</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Device</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Geofence</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paginatedData.map((employee) => {
                  const config = getStatusConfig(employee.status)
                  return (
                    <tr key={employee.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Fingerprint className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-foreground">{employee.department}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{employee.inTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{employee.outTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium text-foreground">{employee.workHours > 0 ? `${employee.workHours}h` : '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          employee.status === 'present' 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
                            : employee.status === 'absent'
                            ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
                            : employee.status === 'late'
                            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
                            : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            employee.status === 'present' ? "bg-emerald-500" 
                            : employee.status === 'absent' ? "bg-red-500"
                            : employee.status === 'late' ? "bg-amber-500"
                            : "bg-blue-500"
                          }`} />
                          {config.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-muted-foreground">{employee.device}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                          employee.geofenceStatus === 'inside' 
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : employee.geofenceStatus === 'outside'
                            ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                            : "bg-slate-50 text-slate-700 dark:bg-slate-950/30 dark:text-slate-400"
                        }`}>
                          {employee.geofenceStatus === 'inside' && <Wifi className="h-3 w-3" />}
                          {employee.geofenceStatus === 'outside' && <Shield className="h-3 w-3" />}
                          {employee.geofenceStatus.charAt(0).toUpperCase() + employee.geofenceStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleAction('view', employee.id)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => handleAction('edit', employee.id)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {paginatedData.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Fingerprint className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No attendance records found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {searchTerm || selectedStatus !== "All Status" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No biometric attendance data available for the selected date"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
              {filteredData.length !== attendanceData.length && (
                <span> (filtered from {attendanceData.length} total entries)</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 text-foreground rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg transition-colors ${
                      currentPage === page 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 text-foreground rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <BiometricAttendanceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          mode={modalMode}
          attendance={selectedAttendance}
          onSave={handleSaveAttendance}
          onDelete={handleDeleteAttendance}
        />

        <AdvancedFilterModal
          isOpen={isAdvancedFilterOpen}
          onClose={() => setIsAdvancedFilterOpen(false)}
          onApply={handleApplyAdvancedFilters}
          onReset={handleResetAdvancedFilters}
        />
      </div>
    </div>
  )
}
