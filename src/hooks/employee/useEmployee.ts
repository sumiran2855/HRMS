import { useState, useCallback } from 'react';
import { employeeService } from '@/services/employee.service';
import { 
  EmployeeFormData, 
  EmployeeResponse, 
  EmployeesListResponse 
} from '@/types/employee.types';

export function useEmployee() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEmployee = useCallback(async (employeeData: EmployeeFormData): Promise<EmployeeResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeeService.createEmployee(employeeData);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create employee';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getEmployees = useCallback(async (): Promise<EmployeesListResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeeService.getEmployees();
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch employees';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getEmployeeById = useCallback(async (id: string): Promise<EmployeeResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeeService.getEmployeeById(id);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch employee';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEmployee = useCallback(async (
    id: string, 
    employeeData: Partial<EmployeeFormData>
  ): Promise<EmployeeResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeeService.updateEmployee(id, employeeData);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update employee';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEmployee = useCallback(async (id: string): Promise<EmployeeResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeeService.deleteEmployee(id);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete employee';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    clearError,
  };
}
