export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    fullName: string;
    role?: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    fullName: string;
    role?: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: {
        message: string;
        user: User;
        accessToken: string;
        refreshToken: string;
    };
    timestamp: string;
}

export interface AuthFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterFormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    role?: string;
}
