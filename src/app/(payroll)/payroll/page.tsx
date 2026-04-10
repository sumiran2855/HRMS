"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Search, Plus, Eye, Edit, Trash2, Calendar, DollarSign, Users, FileText, Filter, SearchX } from "lucide-react"
import { ViewSalarySlipModal } from "@/components/dashboard/payroll/ViewSalarySlipModal"
import { EditEmployeeModal } from "@/components/dashboard/payroll/EditEmployeeModal"
import { DeleteConfirmModal } from "@/components/dashboard/payroll/DeleteConfirmModal"
import { PayrollModal } from "@/components/dashboard/payroll/PayrollModal"

// Hardcoded payroll data
const payrollData = [
  {
    id: "MD-0001",
    name: "Ethan Mitchell",
    designation: "Web Designer",
    email: "ethan.mitchell@company.com",
    joiningDate: "2022-03-15",
    salary: 75000,
    status: "paid",
    paymentDate: "2024-03-31"
  },
  {
    id: "EMP001",
    name: "Sarah Johnson",
    designation: "Senior Developer",
    email: "sarah.johnson@company.com",
    joiningDate: "2021-07-20",
    salary: 95000,
    status: "paid",
    paymentDate: "2024-03-31"
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    designation: "Product Manager",
    email: "michael.chen@company.com",
    joiningDate: "2020-11-10",
    salary: 110000,
    status: "pending",
    paymentDate: null
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    designation: "UX Designer",
    email: "emily.rodriguez@company.com",
    joiningDate: "2022-01-05",
    salary: 85000,
    status: "paid",
    paymentDate: "2024-03-30"
  },
  {
    id: "EMP004",
    name: "David Kim",
    designation: "DevOps Engineer",
    email: "david.kim@company.com",
    joiningDate: "2021-09-12",
    salary: 105000,
    status: "pending",
    paymentDate: null
  },
  {
    id: "EMP005",
    name: "Jessica Taylor",
    designation: "HR Manager",
    email: "jessica.taylor@company.com",
    joiningDate: "2020-05-18",
    salary: 90000,
    status: "paid",
    paymentDate: "2024-03-29"
  },
  {
    id: "EMP006",
    name: "Robert Anderson",
    designation: "Backend Developer",
    email: "robert.anderson@company.com",
    joiningDate: "2022-08-22",
    salary: 92000,
    status: "pending",
    paymentDate: null
  },
  {
    id: "EMP007",
    name: "Lisa Martinez",
    designation: "Frontend Developer",
    email: "lisa.martinez@company.com",
    joiningDate: "2021-12-01",
    salary: 88000,
    status: "paid",
    paymentDate: "2024-03-28"
  },
  {
    id: "EMP008",
    name: "James Wilson",
    designation: "QA Engineer",
    email: "james.wilson@company.com",
    joiningDate: "2023-02-14",
    salary: 70000,
    status: "pending",
    paymentDate: null
  },
  {
    id: "EMP009",
    name: "Emma Davis",
    designation: "Senior Developer",
    email: "emma.davis@company.com",
    joiningDate: "2020-08-30",
    salary: 100000,
    status: "paid",
    paymentDate: "2024-03-27"
  }
]

const designations = ["All Designations", "Web Designer", "Senior Developer", "Product Manager", "UX Designer", "DevOps Engineer", "HR Manager", "Backend Developer", "Frontend Developer", "QA Engineer"]
const statusOptions = ["All Status", "paid", "pending"]

export default function PayrollPage() {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedDesignation, setSelectedDesignation] = useState("All Designations")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [payrollModalOpen, setPayrollModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  const filteredEmployees = payrollData.filter(employee => {
    const matchesName = employee.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesId = employee.id.toLowerCase().includes(searchId.toLowerCase())
    const matchesDesignation = selectedDesignation === "All Designations" || employee.designation === selectedDesignation
    const matchesStatus = selectedStatus === "All Status" || employee.status === selectedStatus
    return matchesName && matchesId && matchesDesignation && matchesStatus
  })

  const handleView = (employee: any) => {
    setSelectedEmployee(employee)
    setViewModalOpen(true)
  }

  const handleEdit = (employee: any) => {
    setSelectedEmployee(employee)
    setEditModalOpen(true)
  }

  const handleDelete = (employee: any) => {
    setSelectedEmployee(employee)
    setDeleteModalOpen(true)
  }

  const handlePayroll = () => {
    setPayrollModalOpen(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payroll Management</h1>
          <p className="text-slate-500 mt-1">Manage employee salaries and payment status</p>
        </div>
        <Button onClick={handlePayroll} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
          <Plus className="w-4 h-4" />
          Payroll
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Employees</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{payrollData.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Payroll</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(payrollData.reduce((sum, emp) => sum + emp.salary, 0))}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Paid</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {payrollData.filter(emp => emp.status === 'paid').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {payrollData.filter(emp => emp.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
            >
              {designations.map(designation => (
                <option key={designation} value={designation}>{designation}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Employee ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joining Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{formatDate(employee.joiningDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{formatCurrency(employee.salary)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {employee.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(employee)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Salary Slip"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(employee)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Employee"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* No Data Found Message */}
        {filteredEmployees.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <SearchX className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No employees found</h3>
                <p className="text-slate-500 text-sm max-w-md">
                  Try adjusting your search filters or check spelling to find employees you're looking for.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchName("")
                  setSearchId("")
                  setSelectedDesignation("All Designations")
                  setSelectedStatus("All Status")
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedEmployee && (
        <>
          <ViewSalarySlipModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            employee={selectedEmployee}
          />
          
          <EditEmployeeModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            employee={selectedEmployee}
          />
          
          <DeleteConfirmModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            employee={selectedEmployee}
          />
        </>
      )}
      
      <PayrollModal
        isOpen={payrollModalOpen}
        onClose={() => setPayrollModalOpen(false)}
      />
    </div>
  )
}
