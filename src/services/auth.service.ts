import apiClient from '@/lib/api-client';
import { LoginRequest, RegisterRequest, LoginResponse } from '@/types/auth.types';
import { handleError } from '@/utils/errorHandler';
import { AUTH_ENDPOINTS } from '@/constants/endpoints/auth.endpoints';

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
            const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
            return response.data;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    async register(userData: RegisterRequest): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.REGISTER, userData);
            return response.data;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    async validateToken(token: string): Promise<{ valid: boolean; payload: any }> {
        try {
            const response = await apiClient.post(AUTH_ENDPOINTS.VALIDATE_TOKEN, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    async getCurrentUser(): Promise<any> {
        try {
            const response = await apiClient.post(AUTH_ENDPOINTS.CURRENT_USER);
            return response.data;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    async logout(): Promise<void> {
        try {
            await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
        } catch (error: any) {
            console.log('Logout API call failed:', error);
        } finally {
            this.removeToken();
        }
    }

    async refreshToken(refreshToken: string): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
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
