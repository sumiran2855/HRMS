import { AppError } from '@/utils/AppError';
import { ErrorCode } from '@/types/Error';
import axios from 'axios';

export class ErrorHandler {
    static handle(error: any): AppError {
        if (axios.isAxiosError(error)) {
            return this.handleAxiosError(error);
        }
        
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            return new AppError(ErrorCode.TIMEOUT, error.message);
        }
        
        if (error.message.includes('Network Error')) {
            return new AppError(ErrorCode.NETWORK_ERROR, error.message);
        }
        
        return new AppError(ErrorCode.INTERNAL_SERVER_ERROR, error.message || 'Unknown error occurred');
    }

    private static handleAxiosError(error: any): AppError {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        
        switch (status) {
            case 401:
                return new AppError(ErrorCode.INVALID_CREDENTIALS, message);
            case 403:
                return new AppError(ErrorCode.FORBIDDEN, message);
            case 404:
                return new AppError(ErrorCode.USER_NOT_FOUND, message);
            case 409:
                return new AppError(ErrorCode.EMAIL_ALREADY_EXISTS, message);
            case 400:
                return new AppError(ErrorCode.VALIDATION_ERROR, message);
            case 500:
                return new AppError(ErrorCode.INTERNAL_SERVER_ERROR, message);
            case 503:
                return new AppError(ErrorCode.API_UNAVAILABLE, message);
            default:
                return new AppError(ErrorCode.NETWORK_ERROR, message);
        }
    }

    static handleWithAlert(error: any, showAlert: (message: string) => void): AppError {
        const appError = this.handle(error);
        showAlert(appError.message);
        return appError;
    }
}

export const handleError = ErrorHandler.handle.bind(ErrorHandler);
export const handleWithAlert = ErrorHandler.handleWithAlert.bind(ErrorHandler);
