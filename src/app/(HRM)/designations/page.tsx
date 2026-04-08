"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Search, Plus, Edit2, Trash2, Users, Briefcase, TrendingUp, Shield, ChevronDown } from "lucide-react"
import { AddDesignationModal } from "@/components/dashboard/designations/AddDesignationModal"
import { EditDesignationModal } from "@/components/dashboard/designations/EditDesignationModal"
import { ConfirmModal } from "@/components/ui/ConfirmModal"
import { ToastContainer, useToast } from "@/components/ui/Toast"

interface Designation {
  id: number
  title: string
  department: string
  level: string
  employeeCount: number
  description: string
  skills: string[]
  minSalary: number
  maxSalary: number
  status: string
  createdAt: string
}

// Hardcoded designation data
const designationsData = [
  {
    id: 1,
    title: "Senior Developer",
    department: "Engineering",
    level: "Senior",
    employeeCount: 12,
    description: "Experienced software developer with leadership responsibilities",
    skills: ["React", "Node.js", "TypeScript", "Leadership"],
    minSalary: 80000,
    maxSalary: 120000,
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    level: "Senior",
    employeeCount: 5,
    description: "Manages product roadmap and cross-functional teams",
    skills: ["Strategy", "Analytics", "Communication", "Agile"],
    minSalary: 90000,
    maxSalary: 140000,
    status: "active",
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    level: "Mid",
    employeeCount: 8,
    description: "Creates user-centered design solutions",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    minSalary: 65000,
    maxSalary: 95000,
    status: "active",
    createdAt: "2024-02-01"
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    level: "Mid",
    employeeCount: 6,
    description: "Manages infrastructure and deployment pipelines",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    minSalary: 75000,
    maxSalary: 110000,
    status: "active",
    createdAt: "2024-02-10"
  },
  {
    id: 5,
    title: "HR Manager",
    department: "Human Resources",
    level: "Senior",
    employeeCount: 3,
    description: "Manages HR operations and employee relations",
    skills: ["Recruitment", "Employee Relations", "Policy", "Analytics"],
    minSalary: 70000,
    maxSalary: 100000,
    status: "active",
    createdAt: "2024-02-15"
  },
  {
    id: 6,
    title: "Backend Developer",
    department: "Engineering",
    level: "Mid",
    employeeCount: 10,
    description: "Develops server-side applications and APIs",
    skills: ["Python", "Django", "PostgreSQL", "REST APIs"],
    minSalary: 70000,
    maxSalary: 100000,
    status: "active",
    createdAt: "2024-03-01"
  },
  {
    id: 7,
    title: "Frontend Developer",
    department: "Engineering",
    level: "Junior",
    employeeCount: 15,
    description: "Develops user interfaces and web applications",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    minSalary: 50000,
    maxSalary: 75000,
    status: "active",
    createdAt: "2024-03-05"
  },
  {
    id: 8,
    title: "QA Engineer",
    department: "Engineering",
    level: "Mid",
    employeeCount: 7,
    description: "Ensures software quality through testing",
    skills: ["Testing", "Automation", "Selenium", "Jest"],
    minSalary: 60000,
    maxSalary: 85000,
    status: "active",
    createdAt: "2024-03-10"
  }
]

const departments = ["All Departments", "Engineering", "Product", "Design", "Human Resources", "Marketing", "Sales", "Finance"]
const levels = ["All Levels", "Junior", "Mid", "Senior"]
const statuses = ["All Status", "Active", "Inactive"]

export default function DesignationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedDesignation, setSelectedDesignation] = useState<Designation | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [designationToDelete, setDesignationToDelete] = useState<Designation | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const { toasts, removeToast, success, error } = useToast()

  const filteredDesignations = designationsData.filter(designation => {
    const matchesSearch = designation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         designation.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All Departments" || designation.department === selectedDepartment
    const matchesLevel = selectedLevel === "All Levels" || designation.level === selectedLevel
    const matchesStatus = selectedStatus === "All Status" || designation.status === selectedStatus.toLowerCase()
    
    return matchesSearch && matchesDepartment && matchesLevel && matchesStatus
  })

  const handleEdit = (designation: Designation) => {
    setSelectedDesignation(designation)
    setIsEditModalOpen(true)
  }

  const handleDelete = (designation: Designation) => {
    setDesignationToDelete(designation)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!designationToDelete) return
    
    setIsDeleting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Remove from local data (in real app, this would be an API call)
      const index = designationsData.findIndex(d => d.id === designationToDelete.id)
      if (index > -1) {
        designationsData.splice(index, 1)
      }
      
      success(
        "Designation Deleted Successfully",
        `${designationToDelete.title} has been removed from the system.`
      )
      
      // Close modal
      setIsDeleteModalOpen(false)
      setDesignationToDelete(null)
    } catch (err) {
      error(
        "Delete Failed",
        "Failed to delete designation. Please try again."
      )
    } finally {
      setIsDeleting(false)
    }
  }

  const totalDesignations = designationsData.length
  const activeDesignations = designationsData.filter(d => d.status === "active").length
  const totalEmployees = designationsData.reduce((sum, d) => sum + d.employeeCount, 0)

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Designations</p>
                <p className="text-2xl font-bold text-blue-900">{totalDesignations}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Designations</p>
                <p className="text-2xl font-bold text-green-900">{activeDesignations}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Employees</p>
                <p className="text-2xl font-bold text-purple-900">{totalEmployees}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Avg. Team Size</p>
                <p className="text-2xl font-bold text-orange-900">{Math.round(totalEmployees / totalDesignations)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Designations Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search designations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
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
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white w-full cursor-pointer"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Designation</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Designations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
  {filteredDesignations.map((designation) => (
    <div
      key={designation.id}
      className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors duration-200 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-slate-100">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-medium text-slate-900 truncate mb-2">
              {designation.title}
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-800">
                {designation.department}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-800">
                {designation.level}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-violet-50 text-violet-800">
                {designation.employeeCount} employees
              </span>
            </div>
          </div>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => handleEdit(designation)}
              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDelete(designation)}
              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3.5 flex-1 flex flex-col gap-3">
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {designation.description}
        </p>

        <div>
          <p className="text-[11px] font-medium text-slate-400 mb-1.5">Key skills</p>
          <div className="flex flex-wrap gap-1">
            {designation.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-600"
              >
                {skill}
              </span>
            ))}
            {designation.skills.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-blue-50 text-blue-600">
                +{designation.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-slate-400 mb-0.5">Salary range</p>
          <p className="text-[13px] font-medium text-slate-900">
            ${designation.minSalary.toLocaleString()} – ${designation.maxSalary.toLocaleString()}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
          designation.status === 'active'
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            designation.status === 'active' ? 'bg-green-600' : 'bg-red-500'
          }`} />
          {designation.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  ))}
</div>

      {/* No Results Message */}
      {filteredDesignations.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No designations found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <Button 
              onClick={() => {
                setSearchTerm("")
                setSelectedDepartment("All Departments")
                setSelectedLevel("All Levels")
                setSelectedStatus("All Status")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Designation Modal */}
      <AddDesignationModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {/* Edit Designation Modal */}
      {selectedDesignation && (
        <EditDesignationModal 
          isOpen={isEditModalOpen} 
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedDesignation(null)
          }}
          designation={selectedDesignation}
        />
      )}

      {/* Delete Confirmation Modal */}
      {designationToDelete && (
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setDesignationToDelete(null)
          }}
          onConfirm={confirmDelete}
          title="Delete Designation"
          message={`Are you sure you want to delete "${designationToDelete.title}"? This action cannot be undone and will remove all associated data.`}
          type="delete"
          confirmText="Delete"
          isLoading={isDeleting}
        />
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
