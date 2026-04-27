export type AwardStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "pending_manager"
  | "pending_hr"
  | "pending_finance"
  | "approved"
  | "published"
  | "fulfilled"
  | "rejected"
  | "returned"
  | "cancelled"

export type AwardRole = "employee" | "manager" | "hr" | "finance"
export type AwardAction = "submit" | "approve" | "reject" | "return" | "publish" | "fulfill" | "cancel"
export type NominationSource = "manager" | "peer" | "self" | "hr" | "system_triggered"
export type AwardVisibility = "private" | "manager_only" | "team" | "company_wide"
export type RewardKind = "cash" | "voucher" | "points" | "gift" | "certificate"
export type AwardApprovalStatus = "pending" | "approved" | "rejected" | "not_required"

export interface AwardEmployeeSnapshot {
  employeeId: string
  employeeCode: string
  employeeName: string
  avatar: string
  department: string
  designation: string
  manager: string
  location: string
  joiningDate: string
}

export interface AwardSummary {
  awardType: string
  category: string
  awardTitle: string
  citation: string
  achievementDate: string
  awardPeriod: string
  visibility: AwardVisibility
  publishDate: string
}

export interface AwardNominationDetails {
  nominationSource: NominationSource
  nominatorName: string
  nominatorRole: AwardRole
  businessJustification: string
  linkedValues: string[]
  competencies: string[]
  projectReference?: string
}

export interface AwardRewardDetails {
  rewardKind: RewardKind
  currency: string
  rewardValue: number
  oldBonusEquivalent: number
  newBonusEquivalent: number
  taxable: boolean
  financeSettlementRequired: boolean
  fulfillmentStatus: "not_started" | "in_progress" | "completed"
  allowancesImpact: Array<{ label: string; oldValue: number; newValue: number }>
  benefitsImpact: Array<{ label: string; oldValue: string; newValue: string }>
}

export interface AwardPerformanceEvidence {
  rating: number
  kpis: string[]
  achievements: string[]
  appraisalSummary: string
}

export interface AwardApprovalStep {
  status: AwardApprovalStatus
  approverName?: string
  actedAt?: string
  remark?: string
}

export interface AwardApprovalWorkflow {
  manager: AwardApprovalStep
  hr: AwardApprovalStep
  finance: AwardApprovalStep
}

export interface AwardAttachment {
  id: string
  name: string
  fileType: string
  uploadedBy: string
  uploadedAt: string
}

export interface AwardComment {
  id: string
  authorRole: AwardRole
  authorName: string
  text: string
  internal: boolean
  createdAt: string
}

export interface AwardAuditEntry {
  id: string
  action: string
  actorRole: AwardRole
  actorName: string
  date: string
  remark?: string
}

export interface AwardNotification {
  id: string
  target: "employee" | "manager" | "hr" | "finance"
  message: string
  sentAt: string
}

export interface AwardRequest {
  id: string
  status: AwardStatus
  employee: AwardEmployeeSnapshot
  summary: AwardSummary
  nomination: AwardNominationDetails
  reward: AwardRewardDetails
  performance: AwardPerformanceEvidence
  workflow: AwardApprovalWorkflow
  attachments: AwardAttachment[]
  comments: AwardComment[]
  auditTrail: AwardAuditEntry[]
  notifications: AwardNotification[]
}

export interface AwardStats {
  total: number
  pending: number
  approved: number
  published: number
  budgetUsed: number
}

export interface UseAwardReturn {
  requests: AwardRequest[]
  filteredRequests: AwardRequest[]
  paginatedRequests: AwardRequest[]
  stats: AwardStats
  activeRole: AwardRole
  setActiveRole: (value: AwardRole) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedDepartment: string
  setSelectedDepartment: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedType: string
  setSelectedType: (value: string) => void
  rowsPerPage: number
  setRowsPerPage: (value: number) => void
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  addOpen: boolean
  setAddOpen: (value: boolean) => void
  editOpen: boolean
  setEditOpen: (value: boolean) => void
  editingRequest: AwardRequest | null
  viewOpen: boolean
  setViewOpen: (value: boolean) => void
  selectedRequest: AwardRequest | null
  actionOpen: boolean
  actionType: AwardAction | null
  actionRequest: AwardRequest | null
  openActionModal: (request: AwardRequest, action: AwardAction) => void
  closeActionModal: () => void
  confirmAction: (remark: string) => void
  handleView: (request: AwardRequest) => void
  handleCloseView: () => void
  openEditModal: (request: AwardRequest) => void
  closeEditModal: () => void
  handleAddRequest: (payload: AwardCreatePayload) => void
  handleUpdateRequest: (payload: AwardCreatePayload) => void
  addComment: (requestId: string, text: string, internal: boolean) => void
  clearFilters: () => void
}

export interface AwardCreatePayload {
  employeeCode: string
  employeeName: string
  department: string
  designation: string
  manager: string
  location: string
  joiningDate: string
  awardType: string
  category: string
  awardTitle: string
  citation: string
  nominationSource: NominationSource
  nominatorName: string
  achievementDate: string
  awardPeriod: string
  businessJustification: string
  linkedValues: string[]
  competencies: string[]
  rewardKind: RewardKind
  rewardValue: number
  currency: string
  taxable: boolean
  financeSettlementRequired: boolean
  visibility: AwardVisibility
  publishDate: string
  rating: number
  kpis: string[]
  achievements: string[]
  appraisalSummary: string
  attachmentNames: string[]
}
