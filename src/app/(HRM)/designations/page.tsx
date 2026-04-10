"use client"

import { useState } from "react"
import { Search, Plus, Edit2, Trash2, Users, Briefcase, TrendingUp, Shield, X, Filter, Sparkles } from "lucide-react"
import DesignationModal from "@/components/dashboard/designations/DesignationModal"

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
  status: "active" | "inactive"
  createdAt: string
}

export default function DesignationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingDesignation, setEditingDesignation] = useState<Designation | null>(null)
  const [designations, setDesignations] = useState<Designation[]>([
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
  ])

  const departments = ["All Departments", "Engineering", "Product", "Design", "Human Resources", "Marketing", "Sales", "Finance"]
  const levels = ["All Levels", "Junior", "Mid", "Senior", "Lead", "Principal"]

  const filteredDesignations = designations.filter((designation) => {
    const searchLower = searchTerm.toLowerCase()
    const titleLower = designation.title?.toLowerCase() || ""
    const descLower = designation.description?.toLowerCase() || ""
    const matchesSearch = titleLower.includes(searchLower) || descLower.includes(searchLower)
    const matchesDepartment = selectedDepartment === "All Departments" || designation.department === selectedDepartment
    const matchesLevel = selectedLevel === "All Levels" || designation.level === selectedLevel
    return matchesSearch && matchesDepartment && matchesLevel
  })

  const handleAddDesignation = (designationData: Omit<Designation, "id" | "createdAt">) => {
    const newDesignation: Designation = {
      id: Date.now(),
      ...designationData,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setDesignations([...designations, newDesignation])
    setShowAddModal(false)
  }

  const handleEditDesignation = (designationData: Omit<Designation, "id" | "createdAt">) => {
    if (!editingDesignation) return
    setDesignations(designations.map(d =>
      d.id === editingDesignation.id ? { ...designationData, id: d.id, createdAt: d.createdAt } : d
    ))
    setEditingDesignation(null)
    setShowAddModal(false)
  }

  const handleDeleteDesignation = (id: number) => {
    setDesignations(designations.filter(d => d.id !== id))
  }

  const openEditModal = (designation: Designation) => {
    setEditingDesignation(designation)
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingDesignation(null)
  }

  const totalDesignations = designations.length
  const activeDesignations = designations.filter(d => d.status === "active").length
  const totalEmployees = designations.reduce((sum, d) => sum + d.employeeCount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Designation Management
              </h1>
            </div>
            <p className="text-muted-foreground ml-11">Organize and manage job titles and roles across departments</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Designation
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-lg">Total</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{totalDesignations}</div>
            <div className="text-sm text-muted-foreground">Total Designations</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">Active</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{activeDesignations}</div>
            <div className="text-sm text-muted-foreground">Active Designations</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg shadow-violet-500/25">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2 py-1 rounded-lg">Employees</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{totalEmployees}</div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/25">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg">Avg Size</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{totalDesignations > 0 ? Math.round(totalEmployees / totalDesignations) : 0}</div>
            <div className="text-sm text-muted-foreground">Avg Employees/Role</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search designations by title or description..."
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
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground cursor-pointer"
              >
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground cursor-pointer"
              >
                {levels.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Designations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDesignations.map((designation) => (
            <div
              key={designation.id}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${
                    designation.status === "active" ? "from-emerald-500 to-emerald-600" : "from-slate-500 to-slate-600"
                  } shadow-lg`}>
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base">{designation.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                        {designation.department}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-violet-50 text-violet-700">
                        {designation.level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(designation)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group/btn"
                  >
                    <Edit2 className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                  </button>
                  <button
                    onClick={() => handleDeleteDesignation(designation.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group/btn"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground group-hover/btn:text-destructive transition-colors" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{designation.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{designation.employeeCount}</span>
                  <span className="text-muted-foreground">Employees</span>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Key skills</p>
                  <div className="flex flex-wrap gap-1">
                    {designation.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                    {designation.skills.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                        +{designation.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Salary range</p>
                    <p className="text-sm font-medium text-foreground">
                      ${designation.minSalary.toLocaleString()} – ${designation.maxSalary.toLocaleString()}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    designation.status === 'active'
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
                      : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-800"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      designation.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500'
                    }`} />
                    {designation.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDesignations.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No designations found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {searchTerm || selectedDepartment !== "All Departments" || selectedLevel !== "All Levels"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first designation"}
            </p>
          </div>
        )}

        <DesignationModal
          isOpen={showAddModal || !!editingDesignation}
          onClose={closeModal}
          onSave={editingDesignation ? handleEditDesignation : handleAddDesignation}
          editingDesignation={editingDesignation}
        />
      </div>
    </div>
  )
}
