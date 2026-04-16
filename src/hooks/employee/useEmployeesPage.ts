"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useEmployee } from "@/hooks/employee/useEmployee";
import { Employee, UseEmployeesPageReturn } from "@/types/employee.types";
import { DEFAULT_DESIGNATION } from "@/constants/employees";

export function useEmployeesPage(): UseEmployeesPageReturn {
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState(DEFAULT_DESIGNATION);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const { getEmployees, loading, error } = useEmployee();

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await getEmployees();
      if (response.success && response.data) {
        setEmployees(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  }, [getEmployees]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      const matchesName = fullName.includes(searchName.toLowerCase());
      const matchesId =
        employee.employeeId?.toLowerCase().includes(searchId.toLowerCase()) ||
        employee._id?.toLowerCase().includes(searchId.toLowerCase());
      const matchesDesignation =
        selectedDesignation === DEFAULT_DESIGNATION ||
        employee.employeeDesignation === selectedDesignation;
      return matchesName && matchesId && matchesDesignation;
    });
  }, [employees, searchName, searchId, selectedDesignation]);

  const stats = useMemo(
    () => ({
      total: employees.length,
      active: employees.filter((e) => e.isActive !== false).length,
      uniqueDesignations: new Set(employees.map((e) => e.employeeDesignation)).size,
      currentMonth: new Date().getMonth() + 1,
    }),
    [employees]
  );

  return {
    employees,
    filteredEmployees,
    filters: { searchName, searchId, selectedDesignation },
    stats,
    loading,
    error,
    isModalOpen,
    setSearchName,
    setSearchId,
    setSelectedDesignation,
    setIsModalOpen,
    fetchEmployees,
  };
}
