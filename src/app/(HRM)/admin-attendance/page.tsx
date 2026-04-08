"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Search, Users, CheckCircle, Clock, Plane, ChevronLeft, ChevronRight } from "lucide-react"
import { AttendanceLegend } from "@/components/dashboard/attendance/AttendanceLegend"
import { AdminAttendanceTable } from "@/components/dashboard/attendance/AdminAttendanceTable"
import { AttendancePagination } from "@/components/dashboard/attendance/AttendancePagination"

// Mock attendance data
const adminAttendanceData = [
  {
    id: 1,
    name: "Alexander Smith",
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP001",
    department: "Engineering",
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      // Mock attendance patterns
      if ([5, 12, 19, 26].includes(day)) return "holiday" as const
      if ([6, 13, 20, 27].includes(day)) return "off" as const
      if ([2, 8, 15, 22, 29].includes(day)) return "late" as const
      if ([3, 17].includes(day)) return "halfday" as const
      if ([4, 11, 18, 25].includes(day)) return "absent" as const
      return "present" as const
    })
  },
  {
    id: 2,
    name: "Amelia Gonzalez", 
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP002",
    department: "Design",
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      if ([5, 12, 19, 26].includes(day)) return "holiday"
      if ([6, 13, 20, 27].includes(day)) return "off"
      if ([1, 7, 14, 21, 28].includes(day)) return "late"
      if ([9, 16, 23].includes(day)) return "halfday"
      if ([10, 24].includes(day)) return "absent"
      return "present"
    })
  },
  {
    id: 3,
    name: "Ava Garcia",
    avatar: "/api/placeholder/40/40", 
    employeeId: "EMP003",
    department: "HR",
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      if ([5, 12, 19, 26].includes(day)) return "holiday"
      if ([6, 13, 20, 27].includes(day)) return "off"
      if ([3, 10, 17, 24].includes(day)) return "off" as const
      if ([4, 11, 18].includes(day)) return "halfday"
      if ([2, 9, 16, 23, 30].includes(day)) return "late"
      return "present"
    })
  },
  {
    id: 4,
    name: "Charlotte Hernandez",
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP004", 
    department: "Marketing",
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      if ([5, 12, 19, 26].includes(day)) return "holiday"
      if ([6, 13, 20, 27].includes(day)) return "off"
      if ([1, 8, 15, 22, 29].includes(day)) return "present"
      if ([2, 9, 16, 23, 30].includes(day)) return "present"
      if ([3, 10, 17, 24].includes(day)) return "present"
      if ([4, 11, 18, 25].includes(day)) return "present"
      if ([7, 14, 21, 28].includes(day)) return "late"
      return "present"
    })
  },
  {
    id: 5,
    name: "Emily Johnson",
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP005",
    department: "Sales", 
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      if ([5, 12, 19, 26].includes(day)) return "holiday"
      if ([6, 13, 20, 27].includes(day)) return "off"
      if ([1, 2, 3, 4].includes(day)) return "off" as const
      if ([8, 15, 22].includes(day)) return "halfday"
      if ([9, 16, 23, 30].includes(day)) return "late"
      return "present"
    })
  },
  {
    id: 6,
    name: "Ethan Brown",
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP006",
    department: "Engineering",
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      if ([5, 12, 19, 26].includes(day)) return "holiday"
      if ([6, 13, 20, 27].includes(day)) return "off"
      if ([1, 7, 14, 21, 28].includes(day)) return "present"
      if ([2, 8, 15, 22, 29].includes(day)) return "present"
      if ([3, 10, 17, 24].includes(day)) return "present"
      if ([4, 11, 18, 25].includes(day)) return "present"
      if ([9, 16, 23, 30].includes(day)) return "late"
      return "present"
    })
  },
  {
    id: 7,
    name: "Isabella Lopez",
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP007",
    department: "Finance",
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      if ([5, 12, 19, 26].includes(day)) return "holiday"
      if ([6, 13, 20, 27].includes(day)) return "off"
      if ([1, 2, 3].includes(day)) return "off" as const
      if ([4, 11, 18].includes(day)) return "absent"
      if ([8, 15, 22, 29].includes(day)) return "halfday"
      return "present"
    })
  },
  {
    id: 8,
    name: "Jacob Taylor",
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP008",
    department: "Engineering",
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      if ([5, 12, 19, 26].includes(day)) return "holiday"
      if ([6, 13, 20, 27].includes(day)) return "off"
      if ([1, 7, 14, 21, 28].includes(day)) return "present"
      if ([2, 8, 15, 22, 29].includes(day)) return "present"
      if ([3, 10, 17, 24].includes(day)) return "present"
      if ([4, 11, 18, 25].includes(day)) return "present"
      if ([9, 16, 23, 30].includes(day)) return "late"
      return "present"
    })
  },
  {
    id: 9,
    name: "Liam Davis",
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP009",
    department: "Support",
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      if ([5, 12, 19, 26].includes(day)) return "holiday"
      if ([6, 13, 20, 27].includes(day)) return "off"
      if ([1, 2].includes(day)) return "off" as const
      if ([3, 10, 17].includes(day)) return "halfday"
      if ([4, 11, 18].includes(day)) return "absent"
      return "present"
    })
  },
  {
    id: 10,
    name: "Mason Wilson",
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP010",
    department: "Engineering",
    attendance: Array(31).fill(null).map((_, index) => {
      const day = index + 1
      if ([5, 12, 19, 26].includes(day)) return "holiday"
      if ([6, 13, 20, 27].includes(day)) return "off"
      if ([1, 7, 14, 21, 28].includes(day)) return "present"
      if ([2, 8, 15, 22, 29].includes(day)) return "present"
      if ([3, 10, 17, 24].includes(day)) return "present"
      if ([4, 11, 18, 25].includes(day)) return "present"
      if ([9, 16, 23, 30].includes(day)) return "late"
      return "present"
    })
  }
]

export default function AdminAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Calculate statistics
  const totalEmployees = adminAttendanceData.length
  const totalPresent = adminAttendanceData.reduce((sum, emp) => 
    sum + emp.attendance.filter(status => status === 'present').length, 0
  )
  const totalHalfDay = adminAttendanceData.reduce((sum, emp) => 
    sum + emp.attendance.filter(status => status === 'halfday').length, 0
  )
  const onLeaveEmployees = adminAttendanceData.filter(emp => 
    emp.attendance.includes('off')
  ).length

  // Filter data
  const filteredData = adminAttendanceData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                <p className="text-xs text-blue-600 mt-1">↑+5.15% Than Last Month</p>
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
                <p className="text-xs text-green-600 mt-1">↓+5.5% Than Last Month</p>
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
                <p className="text-xs text-yellow-600 mt-1">↑+10% Than Last Year</p>
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
                <p className="text-xs text-purple-600 mt-1">↑+2.15% Than Last Month</p>
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
