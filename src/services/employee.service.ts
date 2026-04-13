import { employeeClient } from '@/lib/api-client';
import { 
  EmployeeFormData,
  EmployeeResponse, 
  EmployeesListResponse 
} from '@/types/employee.types';
import { handleError } from '@/utils/errorHandler';
import { EMPLOYEE_ENDPOINTS } from '@/constants/endpoints/employee.endpoints';

export class EmployeeService {
  private static instance: EmployeeService;

  static getInstance(): EmployeeService {
    if (!EmployeeService.instance) {
      EmployeeService.instance = new EmployeeService();
    }
    return EmployeeService.instance;
  }

  async createEmployee(employeeData: EmployeeFormData): Promise<EmployeeResponse> {
    try {
      const { employeePhoto, ...dataToSend } = employeeData;
      
      const response = await employeeClient.post<EmployeeResponse>(
        EMPLOYEE_ENDPOINTS.CREATE_EMPLOYEE,
        dataToSend
      );
      
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async getEmployees(): Promise<EmployeesListResponse> {
    try {
      const response = await employeeClient.get<EmployeesListResponse>(
        EMPLOYEE_ENDPOINTS.GET_EMPLOYEES
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async getEmployeeById(id: string): Promise<EmployeeResponse> {
    try {
      const response = await employeeClient.get<EmployeeResponse>(
        EMPLOYEE_ENDPOINTS.GET_EMPLOYEE_BY_ID(id)
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async updateEmployee(
    id: string, 
    employeeData: Partial<EmployeeFormData>
  ): Promise<EmployeeResponse> {
    try {
      const { employeePhoto, ...dataToSend } = employeeData;
      
      const response = await employeeClient.put<EmployeeResponse>(
        EMPLOYEE_ENDPOINTS.UPDATE_EMPLOYEE(id),
        dataToSend
      );
      
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async deleteEmployee(id: string): Promise<EmployeeResponse> {
    try {
      const response = await employeeClient.delete<EmployeeResponse>(
        EMPLOYEE_ENDPOINTS.DELETE_EMPLOYEE(id)
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }
}

export const employeeService = EmployeeService.getInstance();
