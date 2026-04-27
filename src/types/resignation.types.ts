export type ResignationStatus = "pending" | "approved" | "rejected" | "withdrawn"
export type ResignationRole = "employee" | "manager" | "hr"
export type WorkflowAction = "submitted" | "approve" | "reject" | "withdraw"

export interface WorkflowEntry {
  id: string
  action: WorkflowAction
  actorRole: ResignationRole
  actorName: string
  remark?: string
  date: string
}

export interface ResignationRequest {
  id: string
  employeeId: string
  employeeName: string
  avatar: string
  department: string
  designation: string
  reportingManager: string
  appliedDate: string
  lastWorkingDate: string
  noticePeriodDays: number
  handoverProgress: number
  reason: string
  status: ResignationStatus
  exitInterviewScheduled: boolean
  workflowHistory: WorkflowEntry[]
}

export interface ResignationStats {
  total: number
  pending: number
  approved: number
  rejected: number
}

export interface UseResignationReturn {
  requests: ResignationRequest[]
  filteredRequests: ResignationRequest[]
  paginatedRequests: ResignationRequest[]
  stats: ResignationStats
  activeRole: ResignationRole
  setActiveRole: (value: ResignationRole) => void
  currentEmployeeId: string
  setCurrentEmployeeId: (value: string) => void
  currentManagerName: string
  setCurrentManagerName: (value: string) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedDepartment: string
  setSelectedDepartment: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  rowsPerPage: number
  setRowsPerPage: (value: number) => void
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  addOpen: boolean
  setAddOpen: (value: boolean) => void
  selectedRequest: ResignationRequest | null
  viewOpen: boolean
  setViewOpen: (value: boolean) => void
  actionOpen: boolean
  actionType: WorkflowAction | null
  actionRequest: ResignationRequest | null
  openActionModal: (request: ResignationRequest, action: WorkflowAction) => void
  closeActionModal: () => void
  confirmAction: (remark: string) => void
  handleView: (request: ResignationRequest) => void
  handleCloseView: () => void
  handleAddRequest: (payload: {
    employeeId: string
    employeeName: string
    department: string
    designation: string
    reportingManager: string
    appliedDate: string
    lastWorkingDate: string
    noticePeriodDays: number
    reason: string
  }) => void
  clearFilters: () => void
}
