"use client"

import { useState } from "react"
import { Plus, Search, Edit2, Trash2, Users, Building2, Mail, Phone, X, Sparkles, TrendingUp, Filter } from "lucide-react"
import DepartmentModal from "@/components/dashboard/departments/DepartmentModal"

interface Department {
  id: string
  name: string
  description: string
  head: string
  employeeCount: number
  email: string
  phone: string
  status: "active" | "inactive"
}

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Human Resources",
      description: "Managing employee relations and recruitment",
      head: "Sarah Johnson",
      employeeCount: 12,
      email: "hr@company.com",
      phone: "+1 234-567-8901",
      status: "active"
    },
    {
      id: "2",
      name: "Engineering",
      description: "Product development and technical innovation",
      head: "Michael Chen",
      employeeCount: 45,
      email: "engineering@company.com",
      phone: "+1 234-567-8902",
      status: "active"
    },
    {
      id: "3",
      name: "Sales & Marketing",
      description: "Revenue generation and brand promotion",
      head: "Emily Davis",
      employeeCount: 28,
      email: "sales@company.com",
      phone: "+1 234-567-8903",
      status: "active"
    },
    {
      id: "4",
      name: "Finance",
      description: "Financial planning and accounting",
      head: "Robert Wilson",
      employeeCount: 15,
      email: "finance@company.com",
      phone: "+1 234-567-8904",
      status: "active"
    }
  ])

  const filteredDepartments = departments.filter((dept) => {
    const searchLower = searchTerm.toLowerCase()
    const nameLower = dept.name?.toLowerCase() || ""
    const headLower = dept.head?.toLowerCase() || ""
    const descLower = dept.description?.toLowerCase() || ""
    return nameLower.includes(searchLower) || headLower.includes(searchLower) || descLower.includes(searchLower)
  })

  const handleAddDepartment = (deptData: Omit<Department, "id">) => {
    const newDepartment: Department = {
      id: Date.now().toString(),
      ...deptData
    }
    setDepartments([...departments, newDepartment])
    setShowAddModal(false)
  }

  const handleEditDepartment = (deptData: Omit<Department, "id">) => {
    if (!editingDepartment) return
    setDepartments(departments.map(d =>
      d.id === editingDepartment.id ? { ...deptData, id: d.id } : d
    ))
    setEditingDepartment(null)
    setShowAddModal(false)
  }

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id))
  }

  const openEditModal = (department: Department) => {
    setEditingDepartment(department)
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingDepartment(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Department Management
              </h1>
            </div>
            <p className="text-muted-foreground ml-11">Organize and manage company departments and their teams</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Department
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-lg">Total</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{departments.length}</div>
            <div className="text-sm text-muted-foreground">Total Departments</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">Active</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{departments.filter(d => d.status === "active").length}</div>
            <div className="text-sm text-muted-foreground">Active Departments</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg shadow-violet-500/25">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2 py-1 rounded-lg">Employees</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{departments.reduce((sum, d) => sum + d.employeeCount, 0)}</div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/25">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg">Avg Size</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{departments.length > 0 ? Math.round(departments.reduce((sum, d) => sum + d.employeeCount, 0) / departments.length) : 0}</div>
            <div className="text-sm text-muted-foreground">Avg Employees/Dept</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search departments by name, head, or description..."
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
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDepartments.map((department) => (
            <div
              key={department.id}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${
                    department.status === "active" ? "from-emerald-500 to-emerald-600" : "from-slate-500 to-slate-600"
                  } shadow-lg`}>
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base">{department.name}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold border ${
                      department.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
                        : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-800"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        department.status === "active" ? "bg-emerald-500" : "bg-slate-500"
                      }`} />
                      {department.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(department)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group/btn"
                  >
                    <Edit2 className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group/btn"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground group-hover/btn:text-destructive transition-colors" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{department.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{department.employeeCount}</span>
                  <span className="text-muted-foreground">Employees</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Head:</span>
                    <span className="text-foreground font-medium">{department.head}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{department.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{department.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No departments found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first department"}
            </p>
          </div>
        )}

        <DepartmentModal
          isOpen={showAddModal || !!editingDepartment}
          onClose={closeModal}
          onSave={editingDepartment ? handleEditDepartment : handleAddDepartment}
          editingDepartment={editingDepartment}
        />
      </div>
    </div>
  )
}
