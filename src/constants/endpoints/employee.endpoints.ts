export const EMPLOYEE_ENDPOINTS = {
  CREATE_EMPLOYEE: '/api/employees',
  GET_EMPLOYEES: '/api/employees',
  GET_EMPLOYEE_BY_ID: (id: string) => `/api/employees/${id}`,
  UPDATE_EMPLOYEE: (id: string) => `/api/employees/${id}`,
  DELETE_EMPLOYEE: (id: string) => `/api/employees/${id}`,
} as const;
