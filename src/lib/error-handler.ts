export interface ErrorResponse {
  message: string;
  code: string;
  status: number;
  details?: string;
}

export const ERROR_CODES = {
  // Authentication Errors
  UNAUTHORIZED: { message: 'User not authenticated', code: 'UNAUTHORIZED', status: 401 },
  FORBIDDEN: { message: 'Insufficient permissions', code: 'FORBIDDEN', status: 403 },
  INVALID_TOKEN: { message: 'Invalid or expired token', code: 'INVALID_TOKEN', status: 401 },
  
  // API/Network Errors
  NETWORK_ERROR: { message: 'Network connection failed', code: 'NETWORK_ERROR', status: 503 },
  TIMEOUT: { message: 'Request timeout', code: 'TIMEOUT', status: 408 },
  API_UNAVAILABLE: { message: 'Backend API unavailable', code: 'API_UNAVAILABLE', status: 503 },
  
  // Data/Validation Errors
  VALIDATION_ERROR: { message: 'Invalid input data', code: 'VALIDATION_ERROR', status: 400 },
  NOT_FOUND: { message: 'Resource not found', code: 'NOT_FOUND', status: 404 },
  DUPLICATE_RECORD: { message: 'Record already exists', code: 'DUPLICATE_RECORD', status: 409 },
  
  // HRMS Business Logic Errors
  EMPLOYEE_NOT_FOUND: { message: 'Employee record not found', code: 'EMPLOYEE_NOT_FOUND', status: 404 },
  INVALID_EMPLOYEE_ID: { message: 'Invalid employee ID format', code: 'INVALID_EMPLOYEE_ID', status: 400 },
  DEPARTMENT_NOT_FOUND: { message: 'Department not found', code: 'DEPARTMENT_NOT_FOUND', status: 404 },
  
  // Development/Generic Errors
  INTERNAL_SERVER_ERROR: { message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR', status: 500 },
  INVALID_JSON: { message: 'Invalid JSON format', code: 'INVALID_JSON', status: 400 },
  DATABASE_ERROR: { message: 'Database operation failed', code: 'DATABASE_ERROR', status: 500 },
  
  // File Upload Errors (common in HRMS)
  FILE_TOO_LARGE: { message: 'File size exceeds limit', code: 'FILE_TOO_LARGE', status: 413 },
  INVALID_FILE_TYPE: { message: 'Unsupported file type', code: 'INVALID_FILE_TYPE', status: 400 },
} as const;

export class ErrorHandler {
  static handle(error: unknown, context: string = ''): ErrorResponse {
    const err = error as Error;
    console.error(`[${context}] Error:`, err);

    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as any;
      const status = axiosError.response?.status;
      
      if (status === 401) return ERROR_CODES.UNAUTHORIZED;
      if (status === 403) return ERROR_CODES.FORBIDDEN;
      if (status === 404) return ERROR_CODES.NOT_FOUND;
      if (status === 413) return ERROR_CODES.FILE_TOO_LARGE;
    }

    if (err instanceof SyntaxError) {
      return ERROR_CODES.INVALID_JSON;
    }

    if (err.message.includes('ECONNABORTED')) {
      return ERROR_CODES.TIMEOUT;
    }

    if (err.message.includes('ENOTFOUND') || err.message.includes('Network')) {
      return ERROR_CODES.NETWORK_ERROR;
    }

    return ERROR_CODES.INTERNAL_SERVER_ERROR;
  }

  static create(code: keyof typeof ERROR_CODES, details?: string): ErrorResponse {
    const error = ERROR_CODES[code];
    return { ...error, details };
  }

  static async safeAsync<T>(fn: () => Promise<T>, context: string): Promise<T | ErrorResponse> {
    try {
      return await fn();
    } catch (error) {
      return this.handle(error, context);
    }
  }
}