import { ErrorCode } from '@/types/Error';

interface ErrorConfig {
  message: string;
  status: number;
}

export const ERROR_CONFIG: Record<ErrorCode, ErrorConfig> = {
  [ErrorCode.UNAUTHORIZED]: { message: 'User not authenticated', status: 401 },
  [ErrorCode.FORBIDDEN]: { message: 'Insufficient permissions', status: 403 },
  [ErrorCode.INVALID_TOKEN]: { message: 'Invalid or expired token', status: 401 },
  [ErrorCode.INVALID_CREDENTIALS]: { message: 'Invalid email or password', status: 401 },
  [ErrorCode.USER_NOT_FOUND]: { message: 'User account not found', status: 404 },
  [ErrorCode.EMAIL_ALREADY_EXISTS]: { message: 'Email address already registered', status: 409 },
  [ErrorCode.LOGIN_FAILED]: { message: 'Login failed. Please check your credentials', status: 401 },
  [ErrorCode.REGISTER_FAILED]: { message: 'Registration failed. Please try again', status: 400 },

  [ErrorCode.NETWORK_ERROR]: { message: 'Network connection failed', status: 503 },
  [ErrorCode.TIMEOUT]: { message: 'Request timeout', status: 408 },
  [ErrorCode.API_UNAVAILABLE]: { message: 'Backend API unavailable', status: 503 },
  [ErrorCode.INTERNAL_SERVER_ERROR]: { message: 'Internal server error', status: 500 },

  [ErrorCode.VALIDATION_ERROR]: { message: 'Invalid input data', status: 400 },
  [ErrorCode.NOT_FOUND]: { message: 'Resource not found', status: 404 },
  [ErrorCode.DUPLICATE_RECORD]: { message: 'Record already exists', status: 409 },

  [ErrorCode.EMPLOYEE_NOT_FOUND]: { message: 'Employee record not found', status: 404 },
  [ErrorCode.INVALID_EMPLOYEE_ID]: { message: 'Invalid employee ID format', status: 400 },
  [ErrorCode.FILE_TOO_LARGE]: { message: 'File size exceeds limit', status: 413 },
};