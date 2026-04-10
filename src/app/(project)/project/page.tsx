"use client"

import { useState } from "react"
import { Search, Plus, Eye, Edit, Trash2, Calendar, Users, FileText, Filter, TrendingUp, UserCheck, Clock, AlertCircle, SearchX } from "lucide-react"
import { ViewProjectModal } from "@/components/dashboard/project/ViewProjectModal"
import { EditProjectModal } from "@/components/dashboard/project/EditProjectModal"
import { DeleteProjectModal } from "@/components/dashboard/project/DeleteProjectModal"
import { ProjectModal } from "@/components/dashboard/project/ProjectModal"

// Comprehensive project data structure for HRMS
const projectData = [
  {
    id: "PRJ001",
    name: "HRMS Platform Development",
    description: "Complete overhaul of the existing HR management system with modern UI/UX and enhanced features.",
    status: "in-progress",
    priority: "high",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    progress: 65,
    employees: 8,
    projectCoordinator: "Sarah Johnson",
    projectLead: "Michael Chen",
    rating: 4.5,
    team: [
      { name: "Sarah Johnson", role: "Project Coordinator", avatar: "SJ" },
      { name: "Michael Chen", role: "Project Lead", avatar: "MC" },
      { name: "Emily Rodriguez", role: "Senior Developer", avatar: "ER" },
      { name: "David Kim", role: "UI/UX Designer", avatar: "DK" },
      { name: "Lisa Anderson", role: "Backend Developer", avatar: "LA" },
      { name: "James Wilson", role: "Frontend Developer", avatar: "JW" },
      { name: "Patricia Garcia", role: "QA Engineer", avatar: "PG" },
      { name: "Robert Taylor", role: "DevOps Engineer", avatar: "RT" }
    ],
    budget: 250000,
    client: "Global Tech Solutions",
    tags: ["Development", "HRMS", "High Priority"],
    milestones: [
      { name: "Requirements Gathering", completed: true, date: "2024-01-30" },
      { name: "Design Phase", completed: true, date: "2024-02-28" },
      { name: "Development Sprint 1", completed: true, date: "2024-03-31" },
      { name: "Development Sprint 2", completed: false, date: "2024-04-30" },
      { name: "Testing & Deployment", completed: false, date: "2024-06-15" }
    ]
  },
  {
    id: "PRJ002",
    name: "Mobile App Revamp",
    description: "Redesign and rebuild of the company mobile application with improved performance and user experience.",
    status: "completed",
    priority: "medium",
    startDate: "2023-09-01",
    endDate: "2024-01-15",
    progress: 100,
    employees: 5,
    projectCoordinator: "Jennifer Brown",
    projectLead: "Kevin White",
    rating: 4.8,
    team: [
      { name: "Jennifer Brown", role: "Project Coordinator", avatar: "JB" },
      { name: "Kevin White", role: "Project Lead", avatar: "KW" },
      { name: "Nancy Taylor", role: "Mobile Developer", avatar: "NT" },
      { name: "Mark Thompson", role: "UI Designer", avatar: "MT" },
      { name: "Diana Martinez", role: "QA Engineer", avatar: "DM" }
    ],
    budget: 180000,
    client: "Retail Dynamics Ltd",
    tags: ["Mobile", "Design", "Completed"],
    milestones: [
      { name: "Research & Planning", completed: true, date: "2023-09-30" },
      { name: "UI/UX Design", completed: true, date: "2023-10-31" },
      { name: "Development", completed: true, date: "2023-12-15" },
      { name: "Testing", completed: true, date: "2024-01-10" },
      { name: "Launch", completed: true, date: "2024-01-15" }
    ]
  },
  {
    id: "PRJ003",
    name: "Data Analytics Dashboard",
    description: "Implementation of real-time analytics dashboard for business intelligence and reporting.",
    status: "planning",
    priority: "medium",
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    progress: 15,
    employees: 6,
    projectCoordinator: "Thomas Anderson",
    projectLead: "Maria Rodriguez",
    rating: 4.2,
    team: [
      { name: "Thomas Anderson", role: "Project Coordinator", avatar: "TA" },
      { name: "Maria Rodriguez", role: "Project Lead", avatar: "MR" },
      { name: "Christopher Moore", role: "Data Engineer", avatar: "CM" },
      { name: "Linda Jackson", role: "Frontend Developer", avatar: "LJ" },
      { name: "Richard Lee", role: "Backend Developer", avatar: "RL" },
      { name: "Jessica Davis", role: "Analytics Specialist", avatar: "JD" }
    ],
    budget: 320000,
    client: "Financial Services Corp",
    tags: ["Analytics", "Dashboard", "Planning"],
    milestones: [
      { name: "Requirements Analysis", completed: true, date: "2024-03-15" },
      { name: "Architecture Design", completed: false, date: "2024-04-01" },
      { name: "Data Pipeline Setup", completed: false, date: "2024-05-15" },
      { name: "Dashboard Development", completed: false, date: "2024-07-01" },
      { name: "Testing & Deployment", completed: false, date: "2024-08-15" }
    ]
  },
  {
    id: "PRJ004",
    name: "Cloud Migration Project",
    description: "Migration of legacy systems to cloud infrastructure with zero downtime strategy.",
    status: "on-hold",
    priority: "low",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    progress: 40,
    employees: 4,
    projectCoordinator: "Daniel Wilson",
    projectLead: "Sophia Chen",
    rating: 3.9,
    team: [
      { name: "Daniel Wilson", role: "Project Coordinator", avatar: "DW" },
      { name: "Sophia Chen", role: "Project Lead", avatar: "SC" },
      { name: "Oliver Brown", role: "Cloud Architect", avatar: "OB" },
      { name: "Emma Davis", role: "DevOps Engineer", avatar: "ED" }
    ],
    budget: 150000,
    client: "Healthcare Plus Inc",
    tags: ["Cloud", "Migration", "On Hold"],
    milestones: [
      { name: "Assessment & Planning", completed: true, date: "2024-02-15" },
      { name: "Infrastructure Setup", completed: true, date: "2024-03-01" },
      { name: "Data Migration", completed: false, date: "2024-04-15" },
      { name: "Testing & Validation", completed: false, date: "2024-05-15" },
      { name: "Go Live", completed: false, date: "2024-05-31" }
    ]
  }
]

const statuses = ["All Status", "in-progress", "completed", "planning", "on-hold"]
const priorities = ["All Priority", "high", "medium", "low"]
const clients = ["All Clients", "Global Tech Solutions", "Retail Dynamics Ltd", "Financial Services Corp", "Healthcare Plus Inc"]

export default function ProjectPage() {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPriority, setSelectedPriority] = useState("All Priority")
  const [selectedClient, setSelectedClient] = useState("All Clients")
  
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const filteredProjects = projectData.filter(project => {
    const matchesName = project.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesId = project.id.toLowerCase().includes(searchId.toLowerCase())
    const matchesStatus = selectedStatus === "All Status" || project.status === selectedStatus
    const matchesPriority = selectedPriority === "All Priority" || project.priority === selectedPriority
    const matchesClient = selectedClient === "All Clients" || project.client === selectedClient
    return matchesName && matchesId && matchesStatus && matchesPriority && matchesClient
  })

  const handleView = (project: any) => {
    setSelectedProject(project)
    setViewModalOpen(true)
  }

  const handleEdit = (project: any) => {
    setSelectedProject(project)
    setEditModalOpen(true)
  }

  const handleDelete = (project: any) => {
    setSelectedProject(project)
    setDeleteModalOpen(true)
  }

  const handleProject = () => {
    setProjectModalOpen(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return { bg: 'bg-blue-100', color: 'text-blue-800', border: 'border-blue-200' }
      case 'completed': return { bg: 'bg-green-100', color: 'text-green-800', border: 'border-green-200' }
      case 'planning': return { bg: 'bg-yellow-100', color: 'text-yellow-800', border: 'border-yellow-200' }
      case 'on-hold': return { bg: 'bg-red-100', color: 'text-red-800', border: 'border-red-200' }
      default: return { bg: 'bg-gray-100', color: 'text-gray-800', border: 'border-gray-200' }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Project Management</h1>
          <p className="text-slate-500 mt-1">Manage projects, teams, and track progress</p>
        </div>
        <button
          onClick={handleProject}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Projects</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{projectData.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">In Progress</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {projectData.filter(proj => proj.status === 'in-progress').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {projectData.filter(proj => proj.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Team Members</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {projectData.reduce((sum, proj) => sum + proj.employees, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by project name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 pl-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status === 'in-progress' ? 'In Progress' : status === 'on-hold' ? 'On Hold' : status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 pl-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority === 'All Priority' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-3 py-2 pl-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {clients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const statusColors = getStatusColor(project.status)
          const priorityColor = getPriorityColor(project.priority)
          const progressColor = getProgressColor(project.progress)
          
          return (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Card Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors.bg} ${statusColors.color} ${statusColors.border}`}>
                      {project.status === 'in-progress' ? 'In Progress' : project.status === 'on-hold' ? 'On Hold' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${priorityColor}`} title={`Priority: ${project.priority}`} />
                  </div>
                </div>
                
                {/* Project Meta Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Project ID:</span>
                    <span className="font-medium text-slate-900 ml-1">{project.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Client:</span>
                    <span className="font-medium text-slate-900 ml-1">{project.client}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Budget:</span>
                    <span className="font-medium text-slate-900 ml-1">{formatCurrency(project.budget)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Team Size:</span>
                    <span className="font-medium text-slate-900 ml-1">{project.employees} members</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Rating:</span>
                    <span className="font-medium text-slate-900 ml-1">{project.rating}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Priority:</span>
                    <span className="font-medium text-slate-900 ml-1">{project.priority}</span>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="px-6 py-4 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Progress</span>
                  <span className="text-sm font-semibold text-slate-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="px-6 py-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Start:</span>
                    <span className="font-medium text-slate-900">{formatDate(project.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">End:</span>
                    <span className="font-medium text-slate-900">{formatDate(project.endDate)}</span>
                  </div>
                </div>
              </div>

              {/* Team Section */}
              <div className="px-6 py-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Team Leadership</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-500" />
                    <div>
                      <span className="text-slate-500">Coordinator:</span>
                      <span className="font-medium text-slate-900 ml-1">{project.projectCoordinator}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-green-500" />
                    <div>
                      <span className="text-slate-500">Lead:</span>
                      <span className="font-medium text-slate-900 ml-1">{project.projectLead}</span>
                    </div>
                  </div>
                </div>
                
                {/* Team Members Preview */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Team Members ({project.team.length})</span>
                    {/* <span className="text-xs text-slate-500">View all →</span> */}
                  </div>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 6).map((member, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium border-2 border-white shadow-sm"
                        title={`${member.name} - ${member.role}`}
                      >
                        {member.avatar}
                      </div>
                    ))}
                    {project.team.length > 6 && (
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-medium border-2 border-white shadow-sm">
                        +{project.team.length - 6}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="px-6 py-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Last updated: {formatDate(project.endDate)}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(project)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Project Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* No Data Found Message */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <SearchX className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects found</h3>
              <p className="text-slate-500 text-sm max-w-md">
                Try adjusting your search filters or check spelling to find projects you're looking for.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchName("")
                setSearchId("")
                setSelectedStatus("All Status")
                setSelectedPriority("All Priority")
                setSelectedClient("All Clients")
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ProjectModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
      <ViewProjectModal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} project={selectedProject} />
      <EditProjectModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} project={selectedProject} />
      <DeleteProjectModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} project={selectedProject} />
    </div>
  )
}
