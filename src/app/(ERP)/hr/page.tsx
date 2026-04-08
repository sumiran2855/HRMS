"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  TrendingUp, 
  Calendar,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Award,
  Clock,
  Filter,
  Download,
  UserPlus,
  Building,
  GraduationCap,
  DollarSign
} from "lucide-react"

// Mock HR data
const employeesData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 234-567-8901",
    department: "Engineering",
    position: "Senior Software Engineer",
    location: "New York Office",
    joinDate: "2022-03-15",
    status: "active",
    salary: 95000,
    manager: "Sarah Johnson",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    performance: 4.5
  },
  {
    id: 2,
    name: "Emma Davis",
    email: "emma.davis@company.com",
    phone: "+1 234-567-8902",
    department: "Marketing",
    position: "Marketing Manager",
    location: "San Francisco Office",
    joinDate: "2021-07-20",
    status: "active",
    salary: 87000,
    manager: "Michael Chen",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    performance: 4.8
  },
  {
    id: 3,
    name: "Chris Wilson",
    email: "chris.wilson@company.com",
    phone: "+1 234-567-8903",
    department: "Sales",
    position: "Sales Representative",
    location: "Remote",
    joinDate: "2023-01-10",
    status: "active",
    salary: 65000,
    manager: "David Brown",
    skills: ["Sales", "CRM", "Negotiation", "Communication"],
    performance: 4.2
  },
  {
    id: 4,
    name: "Sarah Brown",
    email: "sarah.brown@company.com",
    phone: "+1 234-567-8904",
    department: "Engineering",
    position: "Product Manager",
    location: "New York Office",
    joinDate: "2020-11-05",
    status: "active",
    salary: 110000,
    manager: "CTO Office",
    skills: ["Product Management", "Agile", "Leadership", "Strategy"],
    performance: 4.7
  }
]

const departments = [
  { name: "Engineering", employees: 45, avgSalary: 95000 },
  { name: "Marketing", employees: 12, avgSalary: 78000 },
  { name: "Sales", employees: 28, avgSalary: 72000 },
  { name: "HR", employees: 8, avgSalary: 65000 },
  { name: "Finance", employees: 15, avgSalary: 85000 }
]

export default function HRPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [activeTab, setActiveTab] = useState("employees")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const departmentOptions = ["All Departments", "Engineering", "Marketing", "Sales", "HR", "Finance"]
  const statuses = ["All Status", "active", "on-leave", "terminated"]

  // Filter data
  const filteredData = employeesData.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = selectedDepartment === "All Departments" || employee.department === selectedDepartment
    const matchesStatus = selectedStatus === "All Status" || employee.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'on-leave': return 'bg-yellow-100 text-yellow-700'
      case 'terminated': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-blue-600'
    if (rating >= 3.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const totalEmployees = employeesData.length
  const activeEmployees = employeesData.filter(e => e.status === 'active').length
  const avgSalary = Math.round(employeesData.reduce((sum, e) => sum + e.salary, 0) / employeesData.length)
  const newHiresThisMonth = 2

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Human Resources</h1>
          <p className="text-slate-500 mt-1">Manage employees and HR operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* HR Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Employees</p>
                <p className="text-2xl font-bold text-purple-900">{totalEmployees}</p>
                <p className="text-xs text-purple-600 mt-1">{newHiresThisMonth} new this month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Employees</p>
                <p className="text-2xl font-bold text-green-900">{activeEmployees}</p>
                <p className="text-xs text-green-600 mt-1">{Math.round((activeEmployees / totalEmployees) * 100)}% workforce</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Avg Salary</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(avgSalary)}</p>
                <p className="text-xs text-blue-600 mt-1">Across all departments</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Departments</p>
                <p className="text-2xl font-bold text-orange-900">{departments.length}</p>
                <p className="text-xs text-orange-600 mt-1">Active teams</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("employees")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "employees"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Employees
          </button>
          <button
            onClick={() => setActiveTab("departments")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "departments"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Departments
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "attendance"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => setActiveTab("payroll")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "payroll"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Payroll
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "employees" && (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  {/* <Label htmlFor="search" className="text-sm font-medium text-slate-700">Search</Label> */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by name, email, or position..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    {/* <Label htmlFor="department" className="text-sm font-medium text-slate-700">Department</Label> */}
                    <select
                      id="department"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500/20 appearance-none"
                    >
                      {departmentOptions.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {/* <Label htmlFor="status" className="text-sm font-medium text-slate-700">Status</Label> */}
                    <select
                      id="status"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500/20 appearance-none"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employees Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold">Employees</CardTitle>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">Show</label>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500/20 appearance-none"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span className="text-sm text-slate-600">entries</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Department</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Position</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Location</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Join Date</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Salary</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Performance</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Status</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((employee) => (
                      <tr key={employee.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                              <span className="text-xs font-semibold text-purple-600">
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{employee.name}</p>
                              <p className="text-xs text-slate-500">{employee.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700">{employee.department}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700">{employee.position}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700">{employee.location}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700">{employee.joinDate}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm font-medium text-slate-900">{formatCurrency(employee.salary)}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`text-sm font-bold ${getPerformanceColor(employee.performance)}`}>
                              {employee.performance}
                            </span>
                            <span className="text-xs text-slate-500">/5.0</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="View Details">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Employee">
                              <Edit className="w-4 h-4" />
                            </button>
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

      {activeTab === "departments" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Departments Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept, index) => (
                  <div key={dept.name} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">{dept.name}</h3>
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Employees:</span>
                        <span className="text-lg font-bold text-slate-900">{dept.employees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Avg Salary:</span>
                        <span className="text-lg font-bold text-green-600">{formatCurrency(dept.avgSalary)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Head:</span>
                        <span className="text-sm text-slate-900">Department Manager</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Attendance Management</h3>
              <p className="text-slate-500 mb-4">Track employee attendance, leave requests, and time sheets.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  View Attendance
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Leave Requests
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                  Time Sheets
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "payroll" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Payroll Management</h3>
              <p className="text-slate-500 mb-4">Process payroll, manage compensation, and handle tax compliance.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  Process Payroll
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Tax Reports
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                  Salary History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
