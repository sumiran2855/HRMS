"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { employeeService } from "@/services/employee.service";
import { attendanceService } from "@/services/attendance.service";
import {
  GetAttendanceByDateRangeDto,
  BiometricAttendance,
  BiometricStats,
  BiometricAdvancedFilters,
  UseBiometricAttendanceReturn,
} from "@/types/attendance.types";
import { Employee } from "@/types/employee.types";
import { DEFAULT_BIOMETRIC_ADVANCED_FILTERS } from "@/constants/attendance";

// TODO: Get from auth context
const ORGANIZATION_ID = "org123";

function transformAttendanceData(
  data: Awaited<ReturnType<typeof attendanceService.getAttendanceByDateRange>>["data"],
  employees: Employee[]
): BiometricAttendance[] {
  if (!data) return [];
  return data.map((record, index) => {
    const employee = employees.find((emp) => emp.employeeId === record.employeeId);
    return {
      id: index + 1,
      employeeId: record.employeeId,
      name: employee ? `${employee.firstName} ${employee.lastName}` : record.employeeId,
      department: employee?.departmentId || "Unassigned",
      inTime: record.checkInTime
        ? new Date(`2000-01-01T${record.checkInTime}`).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
      outTime: record.checkOutTime
        ? new Date(`2000-01-01T${record.checkOutTime}`).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
      date: record.date,
      status: record.status as BiometricAttendance["status"],
      location: record.checkInTime ? "Main Gate" : "-",
      workHours: record.workHours || 0,
      device: record.checkInTime ? "Fingerprint Scanner-01" : "-",
      geofenceStatus: "inside" as const,
    };
  });
}

function applyFilters(
  data: BiometricAttendance[],
  searchTerm: string,
  selectedStatus: string,
  advancedFilters: BiometricAdvancedFilters
): BiometricAttendance[] {
  return data.filter((employee) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      employee.name.toLowerCase().includes(search) ||
      employee.employeeId.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search);

    const matchesStatus =
      selectedStatus === "All Status" || employee.status === selectedStatus.toLowerCase();

    const matchesDateRange =
      (!advancedFilters.dateFrom || employee.date >= advancedFilters.dateFrom) &&
      (!advancedFilters.dateTo || employee.date <= advancedFilters.dateTo);

    const matchesDepartment =
      advancedFilters.departments.length === 0 ||
      advancedFilters.departments.includes(employee.department);

    const matchesAdvancedStatus =
      advancedFilters.statuses.length === 0 ||
      advancedFilters.statuses.includes(employee.status);

    const matchesGeofence =
      advancedFilters.geofenceStatuses.length === 0 ||
      advancedFilters.geofenceStatuses.includes(employee.geofenceStatus);

    const matchesDevice =
      advancedFilters.devices.length === 0 || advancedFilters.devices.includes(employee.device);

    const matchesWorkHours =
      employee.workHours >= advancedFilters.minWorkHours &&
      employee.workHours <= advancedFilters.maxWorkHours;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDateRange &&
      matchesDepartment &&
      matchesAdvancedStatus &&
      matchesGeofence &&
      matchesDevice &&
      matchesWorkHours
    );
  });
}

function calculateStats(data: BiometricAttendance[]): BiometricStats {
  return {
    total: data.length,
    present: data.filter((e) => e.status === "present").length,
    absent: data.filter((e) => e.status === "absent").length,
    late: data.filter((e) => e.status === "late").length,
    leave: data.filter((e) => e.status === "leave").length,
  };
}

export function useBiometricAttendance(): UseBiometricAttendanceReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "delete">("view");
  const [selectedAttendance, setSelectedAttendance] = useState<BiometricAttendance | null>(null);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceData, setAttendanceData] = useState<BiometricAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advancedFilters, setAdvancedFilters] = useState<BiometricAdvancedFilters>(
    DEFAULT_BIOMETRIC_ADVANCED_FILTERS
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const employeesResponse = await employeeService.getEmployees();
      let loadedEmployees: Employee[] = [];
      if (employeesResponse.success && employeesResponse.data) {
        loadedEmployees = employeesResponse.data;
        setEmployees(loadedEmployees);
      }

      const query: GetAttendanceByDateRangeDto = {
        organizationId: ORGANIZATION_ID,
        startDate: selectedDate,
        endDate: selectedDate,
      };

      const attendanceResponse = await attendanceService.getAttendanceByDateRange(query);
      if (attendanceResponse.success && attendanceResponse.data) {
        setAttendanceData(transformAttendanceData(attendanceResponse.data, loadedEmployees));
      }
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredData = useMemo(
    () => applyFilters(attendanceData, searchTerm, selectedStatus, advancedFilters),
    [attendanceData, searchTerm, selectedStatus, advancedFilters]
  );

  const stats = useMemo(() => calculateStats(attendanceData), [attendanceData]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const pagination = useMemo(
    () => ({
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      filteredCount: filteredData.length,
      totalCount: attendanceData.length,
    }),
    [currentPage, totalPages, startIndex, endIndex, filteredData.length, attendanceData.length]
  );

  const handleAction = useCallback(
    (action: string, employeeId: number) => {
      const attendance = attendanceData.find((d) => d.id === employeeId);
      if (!attendance) return;

      if (action === "view") {
        setModalMode("view");
        setSelectedAttendance(attendance);
        setIsModalOpen(true);
      } else if (action === "edit") {
        setModalMode("edit");
        setSelectedAttendance(attendance);
        setIsModalOpen(true);
      }
    },
    [attendanceData]
  );

  const handleDelete = useCallback(
    (id: number) => {
      const attendance = attendanceData.find((d) => d.id === id);
      if (!attendance) return;

      setModalMode("delete");
      setSelectedAttendance(attendance);
      setIsModalOpen(true);
    },
    [attendanceData]
  );

  const handleSaveAttendance = useCallback(
    (updatedAttendance: BiometricAttendance) => {
      setAttendanceData(
        attendanceData.map((d) => (d.id === updatedAttendance.id ? updatedAttendance : d))
      );
    },
    [attendanceData]
  );

  const handleDeleteAttendance = useCallback(
    (id: number) => {
      setAttendanceData(attendanceData.filter((d) => d.id !== id));
    },
    [attendanceData]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedAttendance(null);
  }, []);

  const handleApplyAdvancedFilters = useCallback((filters: BiometricAdvancedFilters) => {
    setAdvancedFilters(filters);
    setCurrentPage(1);
  }, []);

  const handleResetAdvancedFilters = useCallback(() => {
    setAdvancedFilters(DEFAULT_BIOMETRIC_ADVANCED_FILTERS);
    setCurrentPage(1);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    entriesPerPage,
    setEntriesPerPage,
    selectedDate,
    setSelectedDate,
    selectedStatus,
    setSelectedStatus,
    isModalOpen,
    modalMode,
    selectedAttendance,
    isAdvancedFilterOpen,
    setIsAdvancedFilterOpen,
    loading,
    error,
    paginatedData,
    stats,
    pagination,
    handleAction,
    handleDelete,
    handleSaveAttendance,
    handleDeleteAttendance,
    closeModal,
    handleApplyAdvancedFilters,
    handleResetAdvancedFilters,
  };
}
