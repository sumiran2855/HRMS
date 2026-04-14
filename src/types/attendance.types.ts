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
