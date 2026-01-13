import { ErrorCode } from '@/types/Error';
import { ERROR_CONFIG } from '@/constants/Error';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly status: number;
  public readonly details?: any;

  constructor(code: ErrorCode, details?: any) {
    const config = ERROR_CONFIG[code];
    super(config.message);
    
    this.code = code;
    this.status = config.status;
    this.details = details;
    
    // Capture stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}