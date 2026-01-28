import axios, { AxiosInstance, AxiosError } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
   return Promise.reject(error);
  }
);

export default apiClient;

export const useApi = () => ({
  get: <T>(url: string) => apiClient.get<T>(url).then(res => res.data),
  post: <T>(url: string, data: any) => apiClient.post<T>(url, data).then(res => res.data)
});
