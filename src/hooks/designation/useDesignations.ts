"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Designation,
  DesignationStats,
  UseDesignationsReturn,
} from "@/types/designation.types";
import { INITIAL_DESIGNATIONS } from "@/constants/designations";

function calculateStats(designations: Designation[]): DesignationStats {
  const totalDesignations = designations.length;
  const activeDesignations = designations.filter((d) => d.status === "active").length;
  const totalEmployees = designations.reduce((sum, d) => sum + d.employeeCount, 0);
  const avgEmployeesPerRole =
    totalDesignations > 0 ? Math.round(totalEmployees / totalDesignations) : 0;

  return { totalDesignations, activeDesignations, totalEmployees, avgEmployeesPerRole };
}

function filterDesignations(
  designations: Designation[],
  searchTerm: string,
  selectedDepartment: string,
  selectedLevel: string
): Designation[] {
  return designations.filter((designation) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (designation.title?.toLowerCase() || "").includes(searchLower) ||
      (designation.description?.toLowerCase() || "").includes(searchLower);
    const matchesDepartment =
      selectedDepartment === "All Departments" || designation.department === selectedDepartment;
    const matchesLevel =
      selectedLevel === "All Levels" || designation.level === selectedLevel;
    return matchesSearch && matchesDepartment && matchesLevel;
  });
}

export function useDesignations(): UseDesignationsReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState<Designation | null>(null);
  const [designations, setDesignations] = useState<Designation[]>(INITIAL_DESIGNATIONS);

  const filteredDesignations = useMemo(
    () => filterDesignations(designations, searchTerm, selectedDepartment, selectedLevel),
    [designations, searchTerm, selectedDepartment, selectedLevel]
  );

  const stats = useMemo(() => calculateStats(designations), [designations]);

  const handleAddDesignation = useCallback(
    (designationData: Omit<Designation, "id" | "createdAt">) => {
      const newDesignation: Designation = {
        id: Date.now(),
        ...designationData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setDesignations((prev) => [...prev, newDesignation]);
      setShowAddModal(false);
    },
    []
  );

  const handleEditDesignation = useCallback(
    (designationData: Omit<Designation, "id" | "createdAt">) => {
      if (!editingDesignation) return;
      setDesignations((prev) =>
        prev.map((d) =>
          d.id === editingDesignation.id
            ? { ...designationData, id: d.id, createdAt: d.createdAt }
            : d
        )
      );
      setEditingDesignation(null);
      setShowAddModal(false);
    },
    [editingDesignation]
  );

  const handleDeleteDesignation = useCallback((id: number) => {
    setDesignations((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const openEditModal = useCallback((designation: Designation) => {
    setEditingDesignation(designation);
    setShowAddModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowAddModal(false);
    setEditingDesignation(null);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    selectedLevel,
    setSelectedLevel,
    selectedStatus,
    setSelectedStatus,
    showAddModal,
    setShowAddModal,
    editingDesignation,
    filteredDesignations,
    stats,
    handleAddDesignation,
    handleEditDesignation,
    handleDeleteDesignation,
    openEditModal,
    closeModal,
  };
}
