"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Department,
  DepartmentStats,
  UseDepartmentsReturn,
} from "@/types/department.types";
import { INITIAL_DEPARTMENTS } from "@/constants/departments";

function calculateStats(departments: Department[]): DepartmentStats {
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter((d) => d.status === "active").length;
  const totalEmployees = departments.reduce((sum, d) => sum + d.employeeCount, 0);
  const avgEmployeesPerDept =
    totalDepartments > 0 ? Math.round(totalEmployees / totalDepartments) : 0;

  return { totalDepartments, activeDepartments, totalEmployees, avgEmployeesPerDept };
}

function filterDepartments(departments: Department[], searchTerm: string): Department[] {
  const search = searchTerm.toLowerCase();
  return departments.filter((dept) => {
    return (
      (dept.name?.toLowerCase() || "").includes(search) ||
      (dept.head?.toLowerCase() || "").includes(search) ||
      (dept.description?.toLowerCase() || "").includes(search)
    );
  });
}

export function useDepartments(): UseDepartmentsReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);

  const filteredDepartments = useMemo(
    () => filterDepartments(departments, searchTerm),
    [departments, searchTerm]
  );

  const stats = useMemo(() => calculateStats(departments), [departments]);

  const handleAddDepartment = useCallback(
    (deptData: Omit<Department, "id">) => {
      const newDepartment: Department = {
        id: Date.now().toString(),
        ...deptData,
      };
      setDepartments((prev) => [...prev, newDepartment]);
      setShowAddModal(false);
    },
    []
  );

  const handleEditDepartment = useCallback(
    (deptData: Omit<Department, "id">) => {
      if (!editingDepartment) return;
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === editingDepartment.id ? { ...deptData, id: d.id } : d
        )
      );
      setEditingDepartment(null);
      setShowAddModal(false);
    },
    [editingDepartment]
  );

  const handleDeleteDepartment = useCallback((id: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const openEditModal = useCallback((department: Department) => {
    setEditingDepartment(department);
    setShowAddModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowAddModal(false);
    setEditingDepartment(null);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    showAddModal,
    setShowAddModal,
    editingDepartment,
    filteredDepartments,
    stats,
    handleAddDepartment,
    handleEditDepartment,
    handleDeleteDepartment,
    openEditModal,
    closeModal,
  };
}
