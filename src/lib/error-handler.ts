import { AppError } from '@/utils/AppError';
import { ErrorCode, ErrorResponse } from '@/types/Error';
import { ERROR_CONFIG } from '@/constants/Error';

export class ErrorHandler {

  /**
   * Main entry point to normalize any error into a standard response
   */
  public static handle(err: unknown, context?: string): ErrorResponse {
    this.logError(err, context);

    // 1. If it's already our known AppError, return it
    if (err instanceof AppError) {
      return this.formatError(err.code, err.status, err.message, err.details);
    }

    // 2. Handle Axios/HTTP Library Errors (Duck Typing)
    if (this.isAxiosError(err)) {
      return this.handleAxiosError(err);
    }

    // 3. Handle Standard JS Errors
    if (err instanceof SyntaxError) {
      return this.formatFromCode(ErrorCode.VALIDATION_ERROR, 'Invalid JSON format');
    }

    // 4. Fallback for unhandled/unknown errors
    return this.formatFromCode(ErrorCode.INTERNAL_SERVER_ERROR);
  }

  /**
   * Factory method to create an error response object
   */
  private static formatError(code: string, status: number, message: string, details?: any): ErrorResponse {
    return {
      status,
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Helper to create error from just a code (looks up config)
   */
  private static formatFromCode(code: ErrorCode, overrideDetails?: string): ErrorResponse {
    const config = ERROR_CONFIG[code];
    return this.formatError(code, config.status, config.message, overrideDetails);
  }

  /**
   * Axios specific handling logic
   */
  private static handleAxiosError(err: any): ErrorResponse {
    if (err.code === 'ECONNABORTED') return this.formatFromCode(ErrorCode.TIMEOUT);
    if (err.message.includes('Network')) return this.formatFromCode(ErrorCode.NETWORK_ERROR);

    const status = err.response?.status;

    // Map HTTP status codes to our internal ErrorCodes
    switch (status) {
      case 401: return this.formatFromCode(ErrorCode.UNAUTHORIZED);
      case 403: return this.formatFromCode(ErrorCode.FORBIDDEN);
      case 404: return this.formatFromCode(ErrorCode.NOT_FOUND);
      case 413: return this.formatFromCode(ErrorCode.FILE_TOO_LARGE);
      case 503: return this.formatFromCode(ErrorCode.API_UNAVAILABLE);
      default: return this.formatFromCode(ErrorCode.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  // Type Guard for Axios-like errors
  private static isAxiosError(err: any): boolean {
    return (typeof err === 'object' && err !== null && ('isAxiosError' in err || 'response' in err));
  }

  private static logError(err: unknown, context: string = 'General'): void {
    // In production, integrate with Sentry/Datadog here
    console.error(`[${context}] Error:`, err);
  }

  /**
   * Wrapper for Async functions (Controllers/Services)
   */
  static async tryCatch<T>(
    fn: () => Promise<T>,
    context: string = 'Operation'
  ): Promise<[T | null, ErrorResponse | null]> {
    try {
      const result = await fn();
      return [result, null];
    } catch (error) {
      return [null, this.handle(error, context)];
    }
  }
}