import axios, { AxiosInstance, AxiosError } from 'axios';

const SERVICE_URLS = {
  AUTH: process.env.NEXT_PUBLIC_AUTH_API_URL || 'https://auth-service-4cwu.onrender.com',
  EMPLOYEE: process.env.NEXT_PUBLIC_EMPLOYEE_API_URL || 'http://localhost:3002/',
  ATTENDANCE: process.env.NEXT_PUBLIC_ATTENDANCE_API_URL || 'http://localhost:3003/',
} as const;

type ServiceType = keyof typeof SERVICE_URLS;

function createApiClient(service: ServiceType): AxiosInstance {
  const client = axios.create({
    baseURL: SERVICE_URLS[service],
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  });

  client.interceptors.request.use((config) => {
    let token: string | null = localStorage.getItem('auth-access-token');
    
    if (!token) {
      token = document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1] || null;
    }
    
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  client.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return client;
}

export const authClient = createApiClient('AUTH');
export const employeeClient = createApiClient('EMPLOYEE');
export const attendanceClient = createApiClient('ATTENDANCE');

const apiClient: AxiosInstance = employeeClient;

export default apiClient;

export const useApi = () => ({
  get: <T>(url: string) => apiClient.get<T>(url).then(res => res.data),
  post: <T>(url: string, data: any) => apiClient.post<T>(url, data).then(res => res.data)
});
