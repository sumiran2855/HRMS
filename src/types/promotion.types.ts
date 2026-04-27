export type PromotionStatus = "draft" | "pending_approval" | "approved" | "rejected"
export type PromotionRole = "employee" | "manager" | "hr" | "higher_authority"
export type PromotionAction = "submit" | "approve" | "reject"
export type ApprovalStepStatus = "pending" | "approved" | "rejected" | "not_required"

export interface EmployeeDetails {
  id: string
  name: string
  avatar: string
  department: string
  joiningDate: string
}

export interface CurrentRoleInfo {
  designation: string
  responsibilities: string[]
  salary: number
  reportingManager: string
}

export interface ProposedPromotionDetails {
  designation: string
  department: string
  reportingManager: string
  effectiveDate: string
  promotionType: "vertical" | "lateral" | "temporary"
}

export interface SalaryRevision {
  oldSalary: number
  newSalary: number
  oldBonus: number
  newBonus: number
  allowanceChanges: Array<{ label: string; oldValue: number; newValue: number }>
  benefitChanges: Array<{ label: string; oldValue: string; newValue: string }>
}

export interface PerformanceSummary {
  rating: number
  kpis: string[]
  achievements: string[]
  appraisalHistory: string
}

export interface PromotionTimeline {
  promotionStartDate: string
  probationMonths: number
}

export interface ApprovalStep {
  status: ApprovalStepStatus
  approverName?: string
  actedAt?: string
  remark?: string
}

export interface ApprovalWorkflow {
  manager: ApprovalStep
  hr: ApprovalStep
  higherAuthority: ApprovalStep
}

export interface PromotionAttachment {
  id: string
  name: string
  fileType: string
  uploadedBy: string
  uploadedAt: string
}

export interface AuditEntry {
  id: string
  action: string
  actorRole: PromotionRole
  actorName: string
  date: string
  remark?: string
}

export interface NotificationEntry {
  id: string
  target: "employee" | "manager" | "hr" | "higher_authority"
  message: string
  sentAt: string
}

export interface PromotionComment {
  id: string
  authorRole: PromotionRole
  authorName: string
  text: string
  createdAt: string
}

export interface PromotionRequest {
  id: string
  status: PromotionStatus
  employee: EmployeeDetails
  currentRole: CurrentRoleInfo
  proposedPromotion: ProposedPromotionDetails
  salaryRevision: SalaryRevision
  reasonForPromotion: string
  performanceSummary: PerformanceSummary
  approvalWorkflow: ApprovalWorkflow
  requiresHigherAuthority: boolean
  timeline: PromotionTimeline
  attachments: PromotionAttachment[]
  auditTrail: AuditEntry[]
  notifications: NotificationEntry[]
  comments: PromotionComment[]
}

export interface PromotionStats {
  total: number
  pending: number
  approved: number
  rejected: number
}

export interface UsePromotionReturn {
  requests: PromotionRequest[]
  filteredRequests: PromotionRequest[]
  paginatedRequests: PromotionRequest[]
  stats: PromotionStats
  activeRole: PromotionRole
  setActiveRole: (value: PromotionRole) => void
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
  selectedRequest: PromotionRequest | null
  viewOpen: boolean
  setViewOpen: (value: boolean) => void
  actionOpen: boolean
  actionType: PromotionAction | null
  actionRequest: PromotionRequest | null
  openActionModal: (request: PromotionRequest, action: PromotionAction) => void
  closeActionModal: () => void
  confirmAction: (remark: string) => void
  addComment: (requestId: string, text: string) => void
  handleView: (request: PromotionRequest) => void
  handleCloseView: () => void
  handleAddRequest: (payload: {
    employeeId: string
    employeeName: string
    joiningDate: string
    department: string
    currentDesignation: string
    currentResponsibilities: string[]
    proposedDesignation: string
    proposedDepartment: string
    reportingManager: string
    proposedReportingManager: string
    requestedDate: string
    effectiveDate: string
    currentSalary: number
    proposedSalary: number
    oldBonus: number
    newBonus: number
    allowanceChanges: Array<{ label: string; oldValue: number; newValue: number }>
    benefitChanges: Array<{ label: string; oldValue: string; newValue: string }>
    performanceRating: number
    kpis: string[]
    achievements: string[]
    appraisalHistory: string
    justification: string
    promotionType: "vertical" | "lateral" | "temporary"
    probationMonths: number
    requiresHigherAuthority: boolean
    attachmentNames: string[]
  }) => void
  clearFilters: () => void
}
