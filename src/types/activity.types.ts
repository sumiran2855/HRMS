export interface Activity {
  id: string
  title: string
  type: "Development" | "Design" | "DevOps" | "Testing" | "Documentation"
  category: "Backend" | "Frontend" | "Database" | "UI/UX" | "Infrastructure" | "Quality Assurance"
  priority: "high" | "medium" | "low"
  status: "in-progress" | "completed" | "pending" | "planning"
  createdAt: string
  deadline: string
  assignee: string
  project: string
  description: string
  tags: string[]
  estimatedHours: number
  actualHours: number
}

export interface ActivityStats {
  totalActivities: number
  inProgressCount: number
  completedCount: number
  pendingCount: number
}

export interface UseActivityReturn {
  searchTitle: string
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>
  searchId: string
  setSearchId: React.Dispatch<React.SetStateAction<string>>
  selectedType: string
  setSelectedType: React.Dispatch<React.SetStateAction<string>>
  selectedCategory: string
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedPriority: string
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>
  filteredActivities: Activity[]
  paginatedActivities: Activity[]
  currentPage: number
  totalPages: number
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  goToPage: (page: number) => void
  stats: ActivityStats
  formatDate: (dateString: string) => string
  getStatusColor: (status: string) => string
  getPriorityColor: (priority: string) => string
  clearFilters: () => void
  selectedActivity: Activity | null
  modalOpen: boolean
  viewModalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleAdd: () => void
  handleEdit: (activity: Activity) => void
  handleView: (activity: Activity) => void
  handleCloseModal: () => void
  handleCloseViewModal: () => void
}
