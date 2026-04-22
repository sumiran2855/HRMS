export interface ProjectTeamMember {
  name: string
  role: string
  avatar: string
}

export interface ProjectMilestone {
  name: string
  completed: boolean
  date: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: "in-progress" | "completed" | "planning" | "on-hold"
  priority: "high" | "medium" | "low"
  startDate: string
  endDate: string
  progress: number
  employees: number
  projectCoordinator: string
  projectLead: string
  rating: number
  team: ProjectTeamMember[]
  budget: number
  client: string
  tags: string[]
  milestones: ProjectMilestone[]
}

export interface ProjectStats {
  totalProjects: number
  inProgressCount: number
  completedCount: number
  totalTeamMembers: number
}

export interface UseProjectReturn {
  searchName: string
  setSearchName: React.Dispatch<React.SetStateAction<string>>
  searchId: string
  setSearchId: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedPriority: string
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>
  selectedClient: string
  setSelectedClient: React.Dispatch<React.SetStateAction<string>>
  filteredProjects: Project[]
  paginatedProjects: Project[]
  currentPage: number
  totalPages: number
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  goToPage: (page: number) => void
  stats: ProjectStats
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string) => string
  getStatusColor: (status: string) => { bg: string; color: string; border: string }
  getPriorityColor: (priority: string) => string
  getProgressColor: (progress: number) => string
  clearFilters: () => void
  // Modal state
  selectedProject: Project | null
  viewModalOpen: boolean
  editModalOpen: boolean
  deleteModalOpen: boolean
  projectModalOpen: boolean
  setProjectModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleView: (project: Project) => void
  handleEdit: (project: Project) => void
  handleDelete: (project: Project) => void
  handleCloseView: () => void
  handleCloseEdit: () => void
  handleCloseDelete: () => void
}
