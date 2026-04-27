export type TicketStatus = "open" | "in_progress" | "resolved" | "closed"
export type TicketPriority = "low" | "medium" | "high" | "critical"
export type TicketRole = "employee" | "manager" | "it" | "hr"
export type TicketAction = "start" | "resolve" | "close" | "reopen"

export interface TicketComment {
  id: string
  author: string
  role: TicketRole
  message: string
  createdAt: string
}

export interface TicketItem {
  id: string
  title: string
  description: string
  category: string
  requesterName: string
  requesterId: string
  department: string
  assignedTo: string
  createdAt: string
  dueDate: string
  status: TicketStatus
  priority: TicketPriority
  comments: TicketComment[]
}

export interface TicketStats {
  total: number
  open: number
  resolved: number
  overdue: number
}

export interface UseTicketReturn {
  tickets: TicketItem[]
  filteredTickets: TicketItem[]
  paginatedTickets: TicketItem[]
  stats: TicketStats
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedPriority: string
  setSelectedPriority: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  rowsPerPage: number
  setRowsPerPage: (value: number) => void
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  clearFilters: () => void
  addOpen: boolean
  setAddOpen: (value: boolean) => void
  viewOpen: boolean
  actionOpen: boolean
  selectedTicket: TicketItem | null
  actionType: TicketAction | null
  handleView: (ticket: TicketItem) => void
  handleEdit: (ticket: TicketItem) => void
  handleCloseView: () => void
  openActionModal: (ticket: TicketItem, action: TicketAction) => void
  closeActionModal: () => void
  confirmAction: (remark: string) => void
  handleSaveTicket: (payload: {
    title: string
    description: string
    category: string
    requesterName: string
    requesterId: string
    department: string
    assignedTo: string
    dueDate: string
    priority: TicketPriority
  }) => void
}
