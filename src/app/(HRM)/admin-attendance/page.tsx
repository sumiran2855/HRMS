"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Search, Users, CheckCircle, Clock, Plane, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { AttendanceLegend } from "@/components/dashboard/attendance/AttendanceLegend"
import { AdminAttendanceTable } from "@/components/dashboard/attendance/AdminAttendanceTable"
import { AttendancePagination } from "@/components/dashboard/attendance/AttendancePagination"
import { employeeService } from "@/services/employee.service"
import { attendanceService } from "@/services/attendance.service"
import { Attendance, GetAttendanceByDateRangeDto } from "@/types/attendance.types"
import { Employee } from "@/types/employee.types"

// TODO: Get these from auth context
const organizationId = "org123"

export default function AdminAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [employees, setEmployees] = useState<Employee[]>([])
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const employeesResponse = await employeeService.getEmployees()
      if (employeesResponse.success && employeesResponse.data) {
        setEmployees(employeesResponse.data)
      }

      const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
      const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
      
      const query: GetAttendanceByDateRangeDto = {
        organizationId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      }

      const attendanceResponse = await attendanceService.getAttendanceByDateRange(query)
      if (attendanceResponse.success && attendanceResponse.data) {
        setAttendanceData(attendanceResponse.data)
      }
    } catch (err: any) {
      setError(err.message || "Failed to load data")
    } finally {
      setLoading(false)
    }
  }, [currentMonth])

  useEffect(() => {
    loadData()
  }, [loadData])

  const attendanceByEmployee = attendanceData.reduce((acc, record) => {
    if (!acc[record.employeeId]) {
      acc[record.employeeId] = []
    }
    acc[record.employeeId].push(record)
    return acc
  }, {} as Record<string, Attendance[]>)

  const combinedData = employees.map((employee, index) => {
    const employeeAttendance = attendanceByEmployee[employee.employeeId] || []
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    
    const attendanceArray = Array.from({ length: daysInMonth }, (_, dayIndex) => {
      const day = dayIndex + 1
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const record = employeeAttendance.find(r => r.date === dateStr)
      return record ? record.status : null
    }).map((status, idx) => {
      // Convert null to 'off' for weekends/holidays or 'absent' for unmarked days
      if (status) return status
      const day = idx + 1
      // Simple weekend check (Saturday = 6, Sunday = 0)
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dayOfWeek = date.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) return 'off'
      return 'absent'
    })

    return {
      id: index + 1,
      name: `${employee.firstName} ${employee.lastName}`,
      employeeId: employee.employeeId,
      department: employee.departmentId || 'Unassigned',
      avatar: typeof employee.employeePhoto === 'string' ? employee.employeePhoto : "/api/placeholder/40/40",
      attendance: attendanceArray
    }
  })

  // Filter data
  const filteredData = combinedData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate statistics
  const totalEmployees = filteredData.length
  const totalPresent = filteredData.reduce((sum, emp) => 
    sum + emp.attendance.filter(status => status === 'present').length, 0
  )
  const totalHalfDay = filteredData.reduce((sum, emp) => 
    sum + emp.attendance.filter(status => status === 'half-day').length, 0
  )
  const onLeaveEmployees = filteredData.filter(emp => 
    emp.attendance.includes('off')
  ).length

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading attendance data...</span>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Attendance</h1>
          <p className="text-slate-500 mt-1">Manage and track employee attendance records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
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
            onClick={() => navigateMonth('next')}
            className="cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Employee</p>
                <p className="text-2xl font-bold text-blue-900">{totalEmployees}</p>
                <p className="text-xs text-blue-600 mt-1">Active this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Present</p>
                <p className="text-2xl font-bold text-green-900">{totalPresent}</p>
                <p className="text-xs text-green-600 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Total Half Day</p>
                <p className="text-2xl font-bold text-yellow-900">{totalHalfDay}</p>
                <p className="text-xs text-yellow-600 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">On Leave Employee</p>
                <p className="text-2xl font-bold text-purple-900">{onLeaveEmployees}</p>
                <p className="text-xs text-purple-600 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Legend */}
      <AttendanceLegend />

      {/* Table Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-700">Show</label>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="h-9 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value={10}>10 entries</option>
                  <option value={25}>25 entries</option>
                  <option value={50}>50 entries</option>
                  <option value={100}>100 entries</option>
                </select>
                <label className="text-sm font-medium text-slate-700">entries</label>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <AdminAttendanceTable 
            data={paginatedData} 
            daysInMonth={daysInMonth}
          />
        </CardContent>
      </Card>

      {/* Pagination */}
      <AttendancePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredData.length}
        entriesPerPage={entriesPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
