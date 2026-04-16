export type LeaveStatus = "pending" | "approved" | "rejected"

export interface LeaveRequest {
  id: string
  employeeName: string
  employeeId: string
  avatar: string
  type: string
  startDate: string
  endDate: string
  days: number
  reason: string
  status: LeaveStatus
  appliedDate: string
}

export interface LeaveBalance {
  type: string
  icon: string
  color: string
  total: number
  used: number
  remaining: number
  gradient: string
  iconGradient: string
  shadow: string
  badgeBg: string
  badgeText: string
}

export interface LeaveStats {
  pending: number
  approved: number
  rejected: number
  daysUsed: number
}

export interface LeaveFormData {
  type: string
  startDate: string
  endDate: string
  reason: string
}

export interface LeaveStatusBadgeConfig {
  label: string
  bg: string
  text: string
  border: string
  dark: string
  dot: string
}

export interface LeaveStatCardConfig {
  key: keyof LeaveStats
  label: string
  badgeLabel: string
  icon: string
  gradient: string
  shadow: string
  badgeBg: string
  badgeText: string
}

export interface LeaveTabConfig {
  id: string
  label: string
  icon: string
}

export interface UseLeaveManagementReturn {
  activeTab: string
  setActiveTab: (tab: string) => void
  search: string
  setSearch: (s: string) => void
  statusFilter: string
  setStatusFilter: (s: string) => void
  selectedMonth: Date
  prevMonth: () => void
  nextMonth: () => void
  monthLabel: string
  formData: LeaveFormData
  setFormData: React.Dispatch<React.SetStateAction<LeaveFormData>>
  submitted: boolean
  setSubmitted: (b: boolean) => void
  stats: LeaveStats
  filteredMyLeaves: LeaveRequest[]
  filteredRequests: LeaveRequest[]
  calendarCells: (number | null)[]
  leaveDays: Set<number>
  allLeaves: LeaveRequest[]
  handleSubmitLeave: () => void
  resetFilters: () => void
}
