export type TerminationStatus = "pending" | "approved" | "rejected" | "completed"
export type TerminationType = "Performance" | "Disciplinary" | "Redundancy" | "Contract End"
export type TerminationRole = "manager" | "hr" | "admin"
export type TerminationAction = "approve" | "reject" | "complete"

export interface TerminationHistoryEntry {
  id: string
  action: TerminationAction | "submitted"
  actorRole: TerminationRole
  actorName: string
  remark?: string
  date: string
}

export interface TerminationRequest {
  id: string
  employeeId: string
  employeeName: string
  avatar: string
  department: string
  designation: string
  managerName: string
  terminationType: TerminationType
  reason: string
  effectiveDate: string
  initiatedDate: string
  finalSettlementStatus: "pending" | "processed"
  status: TerminationStatus
  history: TerminationHistoryEntry[]
}

export interface TerminationStats {
  total: number
  pending: number
  approved: number
  completed: number
}

export interface UseTerminationReturn {
  requests: TerminationRequest[]
  filteredRequests: TerminationRequest[]
  paginatedRequests: TerminationRequest[]
  stats: TerminationStats
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedDepartment: string
  setSelectedDepartment: (value: string) => void
  selectedType: string
  setSelectedType: (value: string) => void
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
  selectedRequest: TerminationRequest | null
  actionType: TerminationAction | null
  handleView: (request: TerminationRequest) => void
  handleEdit: (request: TerminationRequest) => void
  handleCloseView: () => void
  openActionModal: (request: TerminationRequest, action: TerminationAction) => void
  closeActionModal: () => void
  confirmAction: (remark: string) => void
  handleSaveRequest: (payload: {
    employeeId: string
    employeeName: string
    department: string
    designation: string
    managerName: string
    terminationType: TerminationType
    reason: string
    effectiveDate: string
    initiatedDate: string
    finalSettlementStatus: "pending" | "processed"
  }) => void
}
