"use client"

import { useState } from "react"
import { Search, Plus, Eye, Edit, Trash2, Calendar, Clock, UserCheck, FileText, Code, Palette, Database, Server, Filter, SearchX, ChevronLeft, ChevronRight } from "lucide-react"
import { ActivityModal } from "@/components/dashboard/activity/ActivityModal"
import { ViewActivityModal } from "@/components/dashboard/activity/ViewActivityModal"

// Developer-focused activity data structure
const activityData = [
  {
    id: "ACT001",
    title: "API Endpoint Development",
    type: "Development",
    category: "Backend",
    priority: "high",
    status: "in-progress",
    createdAt: "2024-01-15",
    deadline: "2024-02-28",
    assignee: "Michael Chen",
    project: "HRMS Platform Development",
    description: "Develop REST API endpoints for user authentication and authorization",
    tags: ["API", "Node.js", "Express"],
    estimatedHours: 40,
    actualHours: 28
  },
  {
    id: "ACT002",
    title: "UI Component Library",
    type: "Design",
    category: "Frontend",
    priority: "medium",
    status: "completed",
    createdAt: "2024-01-10",
    deadline: "2024-01-25",
    assignee: "David Kim",
    project: "HRMS Platform Development",
    description: "Create reusable UI components with Tailwind CSS",
    tags: ["UI/UX", "Tailwind", "Components"],
    estimatedHours: 32,
    actualHours: 30
  },
  {
    id: "ACT003",
    title: "Database Schema Design",
    type: "Development",
    category: "Database",
    priority: "high",
    status: "in-progress",
    createdAt: "2024-01-08",
    deadline: "2024-02-15",
    assignee: "Lisa Anderson",
    project: "HRMS Platform Development",
    description: "Design and implement normalized database schema for employee management",
    tags: ["Database", "PostgreSQL", "Schema"],
    estimatedHours: 24,
    actualHours: 18
  },
  {
    id: "ACT004",
    title: "Mobile App Wireframes",
    type: "Design",
    category: "UI/UX",
    priority: "medium",
    status: "completed",
    createdAt: "2024-01-05",
    deadline: "2024-01-20",
    assignee: "Mark Thompson",
    project: "Mobile App Revamp",
    description: "Create detailed wireframes for mobile application screens",
    tags: ["Wireframes", "Figma", "Mobile"],
    estimatedHours: 20,
    actualHours: 22
  },
  {
    id: "ACT005",
    title: "Cloud Infrastructure Setup",
    type: "DevOps",
    category: "Infrastructure",
    priority: "high",
    status: "in-progress",
    createdAt: "2024-01-12",
    deadline: "2024-03-01",
    assignee: "Robert Taylor",
    project: "HRMS Platform Development",
    description: "Set up AWS infrastructure with EC2, RDS, and S3",
    tags: ["AWS", "Cloud", "DevOps"],
    estimatedHours: 48,
    actualHours: 35
  },
  {
    id: "ACT006",
    title: "Unit Testing Implementation",
    type: "Testing",
    category: "Quality Assurance",
    priority: "medium",
    status: "pending",
    createdAt: "2024-01-20",
    deadline: "2024-03-15",
    assignee: "Patricia Garcia",
    project: "HRMS Platform Development",
    description: "Implement comprehensive unit tests for core business logic",
    tags: ["Testing", "Jest", "Unit Tests"],
    estimatedHours: 36,
    actualHours: 0
  },
  {
    id: "ACT007",
    title: "Performance Optimization",
    type: "Development",
    category: "Backend",
    priority: "high",
    status: "pending",
    createdAt: "2024-01-18",
    deadline: "2024-03-20",
    assignee: "James Wilson",
    project: "Mobile App Revamp",
    description: "Optimize API response times and database queries",
    tags: ["Performance", "Optimization", "API"],
    estimatedHours: 32,
    actualHours: 0
  },
  {
    id: "ACT008",
    title: "User Authentication Flow",
    type: "Development",
    category: "Frontend",
    priority: "high",
    status: "in-progress",
    createdAt: "2024-01-22",
    deadline: "2024-02-25",
    assignee: "Emily Rodriguez",
    project: "HRMS Platform Development",
    description: "Implement secure authentication flow with JWT tokens",
    tags: ["Authentication", "JWT", "Security"],
    estimatedHours: 28,
    actualHours: 15
  },
  {
    id: "ACT009",
    title: "Data Migration Script",
    type: "Development",
    category: "Database",
    priority: "medium",
    status: "pending",
    createdAt: "2024-01-25",
    deadline: "2024-04-01",
    assignee: "Christopher Moore",
    project: "Data Analytics Dashboard",
    description: "Create migration scripts for transferring legacy data",
    tags: ["Migration", "Database", "Scripts"],
    estimatedHours: 40,
    actualHours: 0
  },
  {
    id: "ACT010",
    title: "Dashboard Analytics Integration",
    type: "Development",
    category: "Frontend",
    priority: "high",
    status: "planning",
    createdAt: "2024-01-28",
    deadline: "2024-05-15",
    assignee: "Linda Jackson",
    project: "Data Analytics Dashboard",
    description: "Integrate real-time analytics dashboard with data visualization",
    tags: ["Analytics", "Charts", "Real-time"],
    estimatedHours: 56,
    actualHours: 0
  },
  {
    id: "ACT011",
    title: "CI/CD Pipeline Setup",
    type: "DevOps",
    category: "Infrastructure",
    priority: "medium",
    status: "completed",
    createdAt: "2024-01-02",
    deadline: "2024-01-30",
    assignee: "Oliver Brown",
    project: "Cloud Migration Project",
    description: "Configure automated deployment pipeline with GitHub Actions",
    tags: ["CI/CD", "GitHub Actions", "Automation"],
    estimatedHours: 24,
    actualHours: 26
  },
  {
    id: "ACT012",
    title: "Responsive Design Testing",
    type: "Testing",
    category: "Quality Assurance",
    priority: "low",
    status: "pending",
    createdAt: "2024-01-30",
    deadline: "2024-04-10",
    assignee: "Diana Martinez",
    project: "Mobile App Revamp",
    description: "Test application responsiveness across different devices and screen sizes",
    tags: ["Responsive", "Testing", "Mobile"],
    estimatedHours: 20,
    actualHours: 0
  }
]

const activityTypes = ["All Types", "Development", "Design", "DevOps", "Testing", "Documentation"]
const categories = ["All Categories", "Backend", "Frontend", "Database", "UI/UX", "Infrastructure", "Quality Assurance"]
const statuses = ["All Status", "in-progress", "completed", "pending", "planning"]
const priorities = ["All Priority", "high", "medium", "low"]

export default function ActivityPage() {
  const [searchTitle, setSearchTitle] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPriority, setSelectedPriority] = useState("All Priority")
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const [modalOpen, setModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)

  // Filter activities
  const filteredActivities = activityData.filter(activity => {
    const matchesTitle = activity.title.toLowerCase().includes(searchTitle.toLowerCase())
    const matchesId = activity.id.toLowerCase().includes(searchId.toLowerCase())
    const matchesType = selectedType === "All Types" || activity.type === selectedType
    const matchesCategory = selectedCategory === "All Categories" || activity.category === selectedCategory
    const matchesStatus = selectedStatus === "All Status" || activity.status === selectedStatus
    const matchesPriority = selectedPriority === "All Priority" || activity.priority === selectedPriority
    
    return matchesTitle && matchesId && matchesType && matchesCategory && matchesStatus && matchesPriority
  })

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentActivities = filteredActivities.slice(startIndex, endIndex)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'planning': return 'bg-purple-100 text-purple-700 border-purple-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Development': return <Code className="w-4 h-4" />
      case 'Design': return <Palette className="w-4 h-4" />
      case 'DevOps': return <Server className="w-4 h-4" />
      case 'Testing': return <FileText className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleClearFilters = () => {
    setSearchTitle("")
    setSearchId("")
    setSelectedType("All Types")
    setSelectedCategory("All Categories")
    setSelectedStatus("All Status")
    setSelectedPriority("All Priority")
    setCurrentPage(1)
  }

  const handleAddActivity = () => {
    setSelectedActivity(null)
    setModalOpen(true)
  }

  const handleEditActivity = (activity: any) => {
    setSelectedActivity(activity)
    setModalOpen(true)
  }

  const handleViewActivity = (activity: any) => {
    setSelectedActivity(activity)
    setViewModalOpen(true)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Activity Management</h1>
        <p className="text-slate-500 mt-1">Track and manage development activities across all projects</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Search by Title</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Search by ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Activity ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {activityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            Clear Filters
          </button>
          <button onClick={handleAddActivity} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Activity
          </button>
        </div>
      </div>

      {/* Activities Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {currentActivities.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Assignee</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currentActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{activity.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(activity.type)}
                          <span className="text-sm text-slate-700">{activity.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700">{activity.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(activity.status)}`}>
                          {activity.status === 'in-progress' ? 'In Progress' : activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(activity.priority)}`}>
                          {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {formatDate(activity.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Clock className="w-4 h-4 text-slate-400" />
                          {formatDate(activity.deadline)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                            {activity.assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm text-slate-700">{activity.assignee}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleViewActivity(activity)} className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleEditActivity(activity)} className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredActivities.length)} of {filteredActivities.length} activities
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <SearchX className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No activities found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <ActivityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        activity={selectedActivity}
      />

      <ViewActivityModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        activity={selectedActivity}
      />
    </div>
  )
}
