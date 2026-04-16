// Status types matching backend constants
export type AttendanceStatus = 'present' | 'absent' | 'leave' | 'half-day' | 'late';

// Leave type matching backend constants
export type LeaveType = 'sick' | 'casual' | 'earned' | 'unpaid' | 'maternity' | 'other';

export interface Attendance {
  _id: string
  employeeId: string
  organizationId: string
  date: string
  checkInTime?: string
  checkOutTime?: string
  status: AttendanceStatus
  leaveType?: LeaveType
  remarks?: string
  isApproved: boolean
  approvedBy?: string
  approvedAt?: string
  workHours?: number
  overtime?: number
  createdAt: string
  updatedAt: string
  createdBy?: string
}

export interface CreateAttendanceDto {
  employeeId: string
  organizationId: string
  date: string
  checkInTime?: string
  checkOutTime?: string
  status?: AttendanceStatus
  leaveType?: LeaveType
  remarks?: string
  createdBy?: string
}

export interface UpdateAttendanceDto {
  id: string
  organizationId: string
  checkInTime?: string
  checkOutTime?: string
  status?: AttendanceStatus
  leaveType?: LeaveType
  remarks?: string
  workHours?: number
  overtime?: number
}

export interface AttendanceFilterDto {
  organizationId: string
  employeeId?: string
  status?: string
  isApproved?: boolean
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}

export interface AttendanceSummaryDto {
  totalPresent: number
  totalAbsent: number
  totalLeave: number
  totalLate: number
  totalHalfDay: number
  workingHours: number
  overtimeHours: number
}

export interface GetAttendanceByDateRangeDto {
  organizationId: string
  employeeId?: string
  startDate: string
  endDate: string
  page?: number
  limit?: number
}

export interface ApproveAttendanceDto {
  id: string
  organizationId: string
  approvedBy: string
}

export interface BulkUpsertAttendanceDto {
  attendances: CreateAttendanceDto[]
  organizationId: string
}

// API Response types
export interface AttendanceResponse {
  success: boolean
  data?: Attendance
  message?: string
  statusCode?: number
}

export interface AttendanceListResponse {
  success: boolean
  data?: Attendance[]
  message?: string
  total?: number
  page?: number
  limit?: number
  statusCode?: number
}

export interface AttendanceSummaryResponse {
  success: boolean
  data?: AttendanceSummaryDto
  message?: string
  statusCode?: number
}

// Admin Attendance Page Types
export interface AttendanceEmployeeRow {
  id: number
  name: string
  employeeId: string
  department: string
  avatar: string
  attendance: string[]
}

export interface AttendanceStats {
  totalEmployees: number
  totalPresent: number
  totalHalfDay: number
  onLeaveEmployees: number
}

export interface AttendanceFilters {
  searchTerm: string
  currentPage: number
  entriesPerPage: number
}

export interface AttendancePaginationInfo {
  currentPage: number
  totalPages: number
  totalEntries: number
  entriesPerPage: number
  startIndex: number
  endIndex: number
}

// My Attendance Page Types
export type MyAttendanceTab = "overview" | "detailed" | "reports"

export interface MyAttendanceStats {
  totalPresent: number
  totalAbsent: number
  totalLate: number
  totalHalfDay: number
  totalLeave: number
  workingHours: number
  overtimeHours: number
}

export interface MyAttendanceFilters {
  searchTerm: string
  selectedStatus: string
}

export interface MyAttendanceComputedStats {
  stats: MyAttendanceStats
  totalDays: number
  attendancePercentage: number
  avgWorkingHours: number
}

export interface UseMyAttendanceReturn {
  activeTab: MyAttendanceTab
  setActiveTab: (tab: MyAttendanceTab) => void
  selectedMonth: Date
  setSelectedMonth: (date: Date) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  attendanceData: Attendance[]
  filteredAttendance: Attendance[]
  loading: boolean
  error: string | null
  computed: MyAttendanceComputedStats
  monthYear: string
  goToPreviousMonth: () => void
  goToNextMonth: () => void
}

// Biometric Attendance Page Types
export type BiometricStatus = "present" | "absent" | "late" | "leave"
export type GeofenceStatus = "inside" | "outside" | "exempt"

export interface BiometricAttendance {
  id: number
  employeeId: string
  name: string
  department: string
  inTime: string
  outTime: string
  date: string
  status: BiometricStatus
  location: string
  workHours: number
  device: string
  geofenceStatus: GeofenceStatus
}

export interface BiometricStats {
  total: number
  present: number
  absent: number
  late: number
  leave: number
}

export interface BiometricAdvancedFilters {
  dateFrom: string
  dateTo: string
  departments: string[]
  statuses: string[]
  geofenceStatuses: string[]
  devices: string[]
  minWorkHours: number
  maxWorkHours: number
}

export interface BiometricPaginationInfo {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  filteredCount: number
  totalCount: number
}

export interface UseBiometricAttendanceReturn {
  searchTerm: string
  setSearchTerm: (term: string) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  entriesPerPage: number
  setEntriesPerPage: (entries: number) => void
  selectedDate: string
  setSelectedDate: (date: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  isModalOpen: boolean
  modalMode: "view" | "edit" | "delete"
  selectedAttendance: BiometricAttendance | null
  isAdvancedFilterOpen: boolean
  setIsAdvancedFilterOpen: (open: boolean) => void
  loading: boolean
  error: string | null
  paginatedData: BiometricAttendance[]
  stats: BiometricStats
  pagination: BiometricPaginationInfo
  handleAction: (action: string, employeeId: number) => void
  handleDelete: (id: number) => void
  handleSaveAttendance: (updated: BiometricAttendance) => void
  handleDeleteAttendance: (id: number) => void
  closeModal: () => void
  handleApplyAdvancedFilters: (filters: BiometricAdvancedFilters) => void
  handleResetAdvancedFilters: () => void
}
