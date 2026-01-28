import apiClient from '@/lib/api-client';
import { LoginRequest, RegisterRequest, LoginResponse } from '@/types/auth.types';
import { handleError } from '@/utils/errorHandler';

export class AuthService {
    private static instance: AuthService;

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
            return response.data;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    async register(userData: RegisterRequest): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>('/auth/register', userData);
            return response.data;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    async validateToken(token: string): Promise<{ valid: boolean; payload: any }> {
        try {
            const response = await apiClient.post('/auth/validate-token', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    async getCurrentUser(): Promise<any> {
        try {
            const response = await apiClient.post('/auth/current-user');
            return response.data;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    async logout(): Promise<void> {
        try {
            await apiClient.post('/auth/logout');
        } catch (error: any) {
            throw handleError(error);
        }
    }

    async refreshToken(refreshToken: string): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>('/auth/refresh-token', { refreshToken });
            return response.data;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    getToken(): string | null {
        return localStorage.getItem('auth-access-token')
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('auth-refresh-token')
    }

    removeToken(): void {
        localStorage.removeItem('auth-access-token')
        localStorage.removeItem('auth-refresh-token')
    }

}

export const authService = AuthService.getInstance();
