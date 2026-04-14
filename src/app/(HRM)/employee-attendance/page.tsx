"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Search, Plus, Calendar, Clock, User, Filter, Download, TrendingUp, UserCircle, LogOut, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react"
import { EmployeeAttendanceTabs } from "@/components/dashboard/attendance/EmployeeAttendanceTabs"
import { EmployeeAttendanceCard } from "@/components/dashboard/attendance/EmployeeAttendanceCard"
import { AttendanceCalendar } from "@/components/dashboard/attendance/AttendanceCalendar"

// Mock employee attendance data - TODO: Replace with API integration once Employee service is available
const employeeAttendanceData = [
  {
    id: 1,
    name: "Alexander Smith",
    employeeId: "EMP001",
    department: "Engineering",
    position: "Senior Developer",
    email: "alexander.smith@company.com",
    phone: "+1 234-567-8901",
    avatar: "/api/placeholder/60/60",
    joinDate: "2022-01-15",
    currentMonthStats: {
      present: 18,
      absent: 2,
      late: 3,
      halfDay: 1,
      totalWorkingDays: 24,
      attendancePercentage: 75
    },
    recentAttendance: [
      { date: "2024-03-27", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h" },
      { date: "2024-03-26", checkIn: "08:45 AM", checkOut: "07:15 PM", status: "present", overtime: "1h 15m" },
      { date: "2024-03-25", checkIn: "09:30 AM", checkOut: "06:30 PM", status: "late", overtime: "0h" },
      { date: "2024-03-24", checkIn: "-", checkOut: "-", status: "absent", overtime: "0h" },
      { date: "2024-03-23", checkIn: "08:00 AM", checkOut: "05:00 PM", status: "present", overtime: "0h" }
    ]
  },
  {
    id: 2,
    name: "Amelia Gonzalez",
    employeeId: "EMP002",
    department: "Design",
    position: "UI/UX Designer",
    email: "amelia.gonzalez@company.com",
    phone: "+1 234-567-8902",
    avatar: "/api/placeholder/60/60",
    joinDate: "2022-03-20",
    currentMonthStats: {
      present: 20,
      absent: 1,
      late: 2,
      halfDay: 1,
      totalWorkingDays: 24,
      attendancePercentage: 83
    },
    recentAttendance: [
      { date: "2024-03-27", checkIn: "08:45 AM", checkOut: "06:15 PM", status: "present", overtime: "0h" },
      { date: "2024-03-26", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h" },
      { date: "2024-03-25", checkIn: "09:15 AM", checkOut: "06:00 PM", status: "late", overtime: "0h" },
      { date: "2024-03-24", checkIn: "08:30 AM", checkOut: "02:00 PM", status: "halfday", overtime: "0h" },
      { date: "2024-03-23", checkIn: "08:00 AM", checkOut: "06:00 PM", status: "present", overtime: "0h" }
    ]
  }
]

const departments = ["All Departments", "Engineering", "HR", "Design", "Marketing", "Sales"]
const positions = ["All Positions", "Senior Developer", "UI/UX Designer", "HR Manager", "Marketing Specialist", "Sales Executive", "Backend Developer"]

export default function EmployeeAttendancePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedPosition, setSelectedPosition] = useState("All Positions")
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employeeAttendanceData[0] | null>(null)

  const filteredEmployees = employeeAttendanceData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All Departments" || employee.department === selectedDepartment
    const matchesPosition = selectedPosition === "All Positions" || employee.position === selectedPosition
    
    return matchesSearch && matchesDepartment && matchesPosition
  })

  const totalEmployees = filteredEmployees.length
  const averageAttendance = filteredEmployees.length > 0 
    ? Math.round(filteredEmployees.reduce((sum, emp) => sum + emp.currentMonthStats.attendancePercentage, 0) / filteredEmployees.length)
    : 0

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "detailed", label: "Detailed View", icon: Calendar },
    { id: "reports", label: "Reports", icon: Download }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Attendance</h1>
          <p className="text-slate-500 mt-1">Track individual employee attendance and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Export Report</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Mark Attendance</span>
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Employees</p>
                <p className="text-2xl font-bold text-blue-900">{totalEmployees}</p>
                <p className="text-xs text-blue-600 mt-1">Active this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Average Attendance</p>
                <p className="text-2xl font-bold text-green-900">{averageAttendance}%</p>
                <p className="text-xs text-green-600 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Late Arrivals</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {filteredEmployees.reduce((sum, emp) => sum + emp.currentMonthStats.late, 0)}
                </p>
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
                <p className="text-sm font-medium text-purple-600">On Leave Today</p>
                <p className="text-2xl font-bold text-purple-900">
                  {filteredEmployees.filter(emp => 
                    emp.recentAttendance[0]?.status === 'absent'
                  ).length}
                </p>
                <p className="text-xs text-purple-600 mt-1">Today</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <LogOut className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <EmployeeAttendanceTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
              >
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedDepartment("All Departments")
                setSelectedPosition("All Positions")
              }}
              className="cursor-pointer"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeAttendanceCard
                key={employee.id}
                employee={employee}
                onViewDetails={() => setSelectedEmployee(employee)}
              />
            ))}
          </div>
        )}
        
        {activeTab === "detailed" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Total Present</p>
                      <p className="text-xl font-bold text-green-900">
                        {filteredEmployees.reduce((sum, emp) => sum + emp.currentMonthStats.present, 0)}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Total Absent</p>
                      <p className="text-xl font-bold text-red-900">
                        {filteredEmployees.reduce((sum, emp) => sum + emp.currentMonthStats.absent, 0)}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Total Late</p>
                      <p className="text-xl font-bold text-yellow-900">
                        {filteredEmployees.reduce((sum, emp) => sum + emp.currentMonthStats.late, 0)}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Half Days</p>
                      <p className="text-xl font-bold text-orange-900">
                        {filteredEmployees.reduce((sum, emp) => sum + emp.currentMonthStats.halfDay, 0)}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Employee Records */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Detailed Attendance Records</CardTitle>
                  <div className="flex gap-2">
                    <select className="h-9 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                      <option value="all">All Employees</option>
                      <option value="present">Present Only</option>
                      <option value="absent">Absent Only</option>
                      <option value="late">Late Only</option>
                    </select>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Employee</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Department</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Position</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Present</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Absent</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Late</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Half Day</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Total Days</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Attendance %</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee, index) => (
                        <tr key={employee.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                <span className="text-xs font-semibold text-blue-600">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{employee.name}</p>
                                <p className="text-sm text-slate-500">{employee.employeeId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              {employee.department}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-slate-600">
                            {employee.position}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className="font-semibold text-green-600">{employee.currentMonthStats.present}</span>
                              <div className="w-2 h-2 bg-green-100 rounded-full"></div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className="font-semibold text-red-600">{employee.currentMonthStats.absent}</span>
                              <div className="w-2 h-2 bg-red-100 rounded-full"></div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className="font-semibold text-yellow-600">{employee.currentMonthStats.late}</span>
                              <div className="w-2 h-2 bg-yellow-100 rounded-full"></div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className="font-semibold text-orange-600">{employee.currentMonthStats.halfDay}</span>
                              <div className="w-2 h-2 bg-orange-100 rounded-full"></div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center font-semibold text-slate-600">
                            {employee.currentMonthStats.totalWorkingDays}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className={`font-semibold ${
                                employee.currentMonthStats.attendancePercentage >= 90 ? 'text-green-600' :
                                employee.currentMonthStats.attendancePercentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {employee.currentMonthStats.attendancePercentage}%
                              </span>
                              <div className={`w-8 h-2 rounded-full ${
                                employee.currentMonthStats.attendancePercentage >= 90 ? 'bg-green-200' :
                                employee.currentMonthStats.attendancePercentage >= 75 ? 'bg-yellow-200' : 'bg-red-200'
                              }`}>
                                <div className={`h-2 rounded-full ${
                                  employee.currentMonthStats.attendancePercentage >= 90 ? 'bg-green-500' :
                                  employee.currentMonthStats.attendancePercentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} style={{width: `${employee.currentMonthStats.attendancePercentage}%`}}></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50 cursor-pointer">
                                <Eye className="w-4 h-4 text-blue-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-50 cursor-pointer">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === "reports" && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Attendance Reports</h3>
              <p className="text-slate-500 mb-4">Generate comprehensive attendance reports with detailed analytics.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  Individual Report
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Department Report
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  Monthly Summary
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* No Results */}
      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No employees found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <Button 
              onClick={() => {
                setSearchTerm("")
                setSelectedDepartment("All Departments")
                setSelectedPosition("All Positions")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
