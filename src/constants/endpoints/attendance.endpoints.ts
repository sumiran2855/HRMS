export const ATTENDANCE_ENDPOINTS = {
  CREATE: '/api/attendance',
  GET_BY_ID: (id: string) => `/api/attendance/${id}`,
  GET_BY_EMPLOYEE_DATE: '/api/attendance/employee/date',
  UPDATE: (id: string) => `/api/attendance/${id}`,
  DELETE: (id: string) => `/api/attendance/${id}`,
  APPROVE: (id: string) => `/api/attendance/${id}/approve`,
  GET_BY_DATE_RANGE: '/api/attendance/range/query',
  GET_SUMMARY_STATS: '/api/attendance/summary/stats',
  GET_PENDING_APPROVALS: '/api/attendance/pending/approvals',
  BULK_UPSERT: '/api/attendance/bulk/upsert',
} as const;
