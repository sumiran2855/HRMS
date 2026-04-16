"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useEmployee } from "@/hooks/employee/useEmployee";
import { Employee } from "@/types/employee.types";

export function useEmployeeProfile() {
  const params = useParams();
  const employeeId = params.id as string;
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getEmployeeById } = useEmployee();

  const fetchEmployee = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEmployeeById(employeeId);
      if (response.success && response.data) {
        setEmployeeData(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch employee");
    } finally {
      setLoading(false);
    }
  }, [employeeId, getEmployeeById]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const openModal = (modalType: string) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return {
    employeeData,
    loading,
    error,
    activeModal,
    uploadedFile,
    openModal,
    closeModal,
    handleFileUpload,
    removeFile,
    fetchEmployee,
  };
}
