"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Phone, Eye, User, Building2, MapPin, Mail, Users, Briefcase, Sparkles, TrendingUp, X } from "lucide-react"
import { AddEmployeeModal } from "@/components/dashboard/employees/AddEmployeeModal"
import { useEmployee } from "@/hooks/employee/useEmployee"
import { Employee } from "@/types/employee.types"
import Link from "next/link"

const designations = ["Employee Designation", "Senior Developer", "Product Manager", "UX Designer", "DevOps Engineer", "HR Manager", "Backend Developer", "Frontend Developer", "QA Engineer"]

export default function EmployeesPage() {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedDesignation, setSelectedDesignation] = useState("Employee Designation")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  
  const { getEmployees, loading, error } = useEmployee()

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees()
      if (response.success && response.data) {
        setEmployees(response.data)
      }
    } catch (err) {
      console.error("Failed to fetch employees:", err)
    }
  }

  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase()
    const matchesName = fullName.includes(searchName.toLowerCase())
    const matchesId = employee.employeeId?.toLowerCase().includes(searchId.toLowerCase()) || employee._id?.toLowerCase().includes(searchId.toLowerCase())
    const matchesDesignation = selectedDesignation === "Employee Designation" || employee.employeeDesignation === selectedDesignation
    return matchesName && matchesId && matchesDesignation
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Employee Management
              </h1>
            </div>
            <p className="text-slate-500 ml-11">Manage and view all company employees</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Employee
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-lg">Total</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{employees.length}</div>
            <div className="text-sm text-slate-500">Total Employees</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">Active</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{employees.filter(e => e.isActive !== false).length}</div>
            <div className="text-sm text-slate-500">Active Employees</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg shadow-violet-500/25">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2 py-1 rounded-lg">Designations</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{new Set(employees.map(e => e.employeeDesignation)).size}</div>
            <div className="text-sm text-slate-500">Unique Designations</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/25">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg">Joined</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{new Date().getMonth() + 1}</div>
            <div className="text-sm text-slate-500">This Month</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search employees by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
              />
              {searchName && (
                <button
                  onClick={() => setSearchName("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              )}
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by employee ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
              />
              {searchId && (
                <button
                  onClick={() => setSearchId("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              )}
            </div>
            <div className="relative sm:w-64">
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-900 appearance-none cursor-pointer"
              >
                {designations.map(designation => (
                  <option key={designation} value={designation}>{designation}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employee Cards Grid */}
        {loading ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Loading employees...</h3>
            <p className="text-slate-500">Please wait while we fetch the data</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <X className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Error loading employees</h3>
            <p className="text-slate-500 max-w-sm mx-auto">{error}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee._id}
                className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300 group"
              >
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-blue-600">
                      {`${employee.firstName} ${employee.lastName}`.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base text-center">{`${employee.firstName} ${employee.lastName}`}</h3>
                  <p className="text-sm text-slate-500 text-center mb-3">{employee.employeeDesignation || '-'}</p>
                  {employee.isActive !== false && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  )}
                </div>

                {/* Employee Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-900 font-medium">{employee.employeeId || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-900 truncate">{employee.email || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-900">{employee.contactNumber || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-900 truncate">{employee.address || '-'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                  <a
                    href={`tel:${employee.contactNumber}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                  <Link href={`/employees/${employee._id}`} className="flex-1">
                    <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-sm transition-all duration-200">
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && !error && filteredEmployees.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No employees found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              {searchName || searchId || selectedDesignation !== "Employee Designation" ? "Try adjusting your search filters" : "Get started by adding your first employee"}
            </p>
          </div>
        )}

        {/* Add Employee Modal */}
        <AddEmployeeModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchEmployees}
        />
      </div>
    </div>
  )
}
