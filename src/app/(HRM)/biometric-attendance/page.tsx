"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Search, Users, Clock, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Filter, Download, Fingerprint, MapPin } from "lucide-react"

// Mock biometric attendance data
const biometricAttendanceData = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Alexander Smith",
    department: "Engineering",
    inTime: "09:00 AM",
    outTime: "06:00 PM",
    date: "2024-03-27",
    status: "present",
    location: "Main Gate"
  },
  {
    id: 2,
    employeeId: "EMP002", 
    name: "Amelia Gonzalez",
    department: "Design",
    inTime: "08:45 AM",
    outTime: "06:30 PM",
    date: "2024-03-27",
    status: "present",
    location: "Main Gate"
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Ava Garcia",
    department: "HR",
    inTime: "09:15 AM",
    outTime: "-",
    date: "2024-03-27",
    status: "late",
    location: "Main Gate"
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Charlotte Hernandez",
    department: "Marketing",
    inTime: "-",
    outTime: "-",
    date: "2024-03-27",
    status: "absent",
    location: "-"
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Emily Johnson",
    department: "Sales",
    inTime: "08:30 AM",
    outTime: "05:30 PM",
    date: "2024-03-27",
    status: "present",
    location: "Side Gate"
  },
  {
    id: 6,
    employeeId: "EMP006",
    name: "Ethan Brown",
    department: "Engineering",
    inTime: "09:30 AM",
    outTime: "07:00 PM",
    date: "2024-03-27",
    status: "late",
    location: "Main Gate"
  },
  {
    id: 7,
    employeeId: "EMP007",
    name: "Isabella Lopez",
    department: "Finance",
    inTime: "08:00 AM",
    outTime: "06:00 PM",
    date: "2024-03-27",
    status: "present",
    location: "Main Gate"
  },
  {
    id: 8,
    employeeId: "EMP008",
    name: "Jacob Taylor",
    department: "Engineering",
    inTime: "-",
    outTime: "-",
    date: "2024-03-27",
    status: "leave",
    location: "-"
  },
  {
    id: 9,
    employeeId: "EMP009",
    name: "Liam Davis",
    department: "Support",
    inTime: "08:45 AM",
    outTime: "06:15 PM",
    date: "2024-03-27",
    status: "present",
    location: "Main Gate"
  },
  {
    id: 10,
    employeeId: "EMP010",
    name: "Mason Wilson",
    department: "Engineering",
    inTime: "09:00 AM",
    outTime: "-",
    date: "2024-03-27",
    status: "present",
    location: "Main Gate"
  },
  {
    id: 11,
    employeeId: "EMP011",
    name: "Olivia Martinez",
    department: "Design",
    inTime: "08:15 AM",
    outTime: "06:45 PM",
    date: "2024-03-27",
    status: "present",
    location: "Side Gate"
  },
  {
    id: 12,
    employeeId: "EMP012",
    name: "Noah Anderson",
    department: "Sales",
    inTime: "-",
    outTime: "-",
    date: "2024-03-27",
    status: "absent",
    location: "-"
  }
]

export default function BiometricAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  // Filter data based on search and status
  const filteredData = biometricAttendanceData.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === "All Status" || employee.status === selectedStatus.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Calculate statistics
  const stats = {
    total: biometricAttendanceData.length,
    present: biometricAttendanceData.filter(e => e.status === 'present').length,
    absent: biometricAttendanceData.filter(e => e.status === 'absent').length,
    late: biometricAttendanceData.filter(e => e.status === 'late').length,
    leave: biometricAttendanceData.filter(e => e.status === 'leave').length
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
    console.log(`${action} action for employee ${employeeId}`)
    // Handle different actions here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Biometric Attendance</h1>
          <p className="text-slate-500 mt-1">Monitor and manage employee biometric attendance records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Employees</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                <p className="text-xs text-blue-600 mt-1">Registered today</p>
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
                <p className="text-sm font-medium text-green-600">Present</p>
                <p className="text-2xl font-bold text-green-900">{stats.present}</p>
                <p className="text-xs text-green-600 mt-1">On time today</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Late</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.late}</p>
                <p className="text-xs text-yellow-600 mt-1">Late arrivals</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Absent</p>
                <p className="text-2xl font-bold text-red-900">{stats.absent + stats.leave}</p>
                <p className="text-xs text-red-600 mt-1">Not present</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by employee ID, name, or department..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          />
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
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
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          >
            <option value={10}>10 entries</option>
            <option value={25}>25 entries</option>
            <option value={50}>50 entries</option>
            <option value={100}>100 entries</option>
          </select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Department
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
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedData.map((employee) => {
                const config = getStatusConfig(employee.status)
                
                return (
                  <tr key={employee.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
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
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${
                        employee.status === 'present' 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : employee.status === 'absent'
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          : employee.status === 'late'
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          employee.status === 'present' ? "bg-green-500" 
                          : employee.status === 'absent' ? "bg-red-500"
                          : employee.status === 'late' ? "bg-yellow-500"
                          : "bg-blue-500"
                        }`} />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {employee.location !== "-" ? (
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {employee.location}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleAction('view', employee.id)}
                          className="p-2 hover:bg-accent rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => handleAction('edit', employee.id)}
                          className="p-2 hover:bg-accent rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
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
          <div className="text-center py-12">
            <Fingerprint className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No attendance records found</h3>
            <p className="text-muted-foreground">
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
            {filteredData.length !== biometricAttendanceData.length && (
              <span> (filtered from {biometricAttendanceData.length} total entries)</span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
