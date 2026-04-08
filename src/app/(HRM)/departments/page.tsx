"use client"

import { useState } from "react"
import { Plus, Search, Edit2, Trash2, Users, Building2, Mail, Phone } from "lucide-react"

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

  const departments: Department[] = [
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
  ]

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground mt-1">Manage company departments and their details</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Department
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((department) => (
          <div
            key={department.id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{department.name}</h3>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    department.status === "active" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      department.status === "active" ? "bg-green-500" : "bg-gray-500"
                    }`} />
                    {department.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingDepartment(department)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
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
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No departments found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first department"}
          </p>
        </div>
      )}

      {(showAddModal || editingDepartment) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {editingDepartment ? "Edit Department" : "Add New Department"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Department Name</label>
                <input
                  type="text"
                  defaultValue={editingDepartment?.name}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter department name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  defaultValue={editingDepartment?.description}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Enter department description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Department Head</label>
                <input
                  type="text"
                  defaultValue={editingDepartment?.head}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter department head name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={editingDepartment?.email}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter department email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue={editingDepartment?.phone}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter department phone"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingDepartment(null)
                }}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingDepartment(null)
                }}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {editingDepartment ? "Update" : "Add"} Department
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
