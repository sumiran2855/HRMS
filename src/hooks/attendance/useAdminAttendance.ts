"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { employeeService } from "@/services/employee.service";
import { attendanceService } from "@/services/attendance.service";
import {
  Attendance,
  GetAttendanceByDateRangeDto,
  AttendanceEmployeeRow,
  AttendanceStats,
  AttendancePaginationInfo,
} from "@/types/attendance.types";
import { Employee } from "@/types/employee.types";

// TODO: Get from auth context
const ORGANIZATION_ID = "org123";

function buildAttendanceArray(
  employeeAttendance: Attendance[],
  currentMonth: Date,
  daysInMonth: number
): string[] {
  return Array.from({ length: daysInMonth }, (_, dayIndex) => {
    const day = dayIndex + 1;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const record = employeeAttendance.find((r) => r.date === dateStr);
    if (record) return record.status;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6 ? "off" : "absent";
  });
}

export function useAdminAttendance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const daysInMonth = useMemo(
    () => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate(),
    [currentMonth]
  );

  const monthYear = useMemo(
    () => currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    [currentMonth]
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const employeesResponse = await employeeService.getEmployees();
      if (employeesResponse.success && employeesResponse.data) {
        setEmployees(employeesResponse.data);
      }

      const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

      const query: GetAttendanceByDateRangeDto = {
        organizationId: ORGANIZATION_ID,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      };

      const attendanceResponse = await attendanceService.getAttendanceByDateRange(query);
      if (attendanceResponse.success && attendanceResponse.data) {
        setAttendanceData(attendanceResponse.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [currentMonth]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const combinedData: AttendanceEmployeeRow[] = useMemo(() => {
    const attendanceByEmployee = attendanceData.reduce(
      (acc, record) => {
        if (!acc[record.employeeId]) acc[record.employeeId] = [];
        acc[record.employeeId].push(record);
        return acc;
      },
      {} as Record<string, Attendance[]>
    );

    return employees.map((employee, index) => ({
      id: index + 1,
      name: `${employee.firstName} ${employee.lastName}`,
      employeeId: employee.employeeId,
      department: employee.departmentId || "Unassigned",
      avatar:
        typeof employee.employeePhoto === "string"
          ? employee.employeePhoto
          : "/api/placeholder/40/40",
      attendance: buildAttendanceArray(
        attendanceByEmployee[employee.employeeId] || [],
        currentMonth,
        daysInMonth
      ),
    }));
  }, [employees, attendanceData, currentMonth, daysInMonth]);

  const filteredData = useMemo(
    () =>
      combinedData.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [combinedData, searchTerm]
  );

  const stats: AttendanceStats = useMemo(
    () => ({
      totalEmployees: filteredData.length,
      totalPresent: filteredData.reduce(
        (sum, emp) => sum + emp.attendance.filter((s) => s === "present").length,
        0
      ),
      totalHalfDay: filteredData.reduce(
        (sum, emp) => sum + emp.attendance.filter((s) => s === "half-day").length,
        0
      ),
      onLeaveEmployees: filteredData.filter((emp) => emp.attendance.includes("off")).length,
    }),
    [filteredData]
  );

  const pagination: AttendancePaginationInfo = useMemo(() => {
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return {
      currentPage,
      totalPages,
      totalEntries: filteredData.length,
      entriesPerPage,
      startIndex,
      endIndex,
    };
  }, [filteredData.length, entriesPerPage, currentPage]);

  const paginatedData = useMemo(
    () => filteredData.slice(pagination.startIndex, pagination.endIndex),
    [filteredData, pagination.startIndex, pagination.endIndex]
  );

  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "prev" ? -1 : 1));
      return newDate;
    });
  }, []);

  const handleEntriesPerPageChange = useCallback((value: number) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  return {
    loading,
    error,
    searchTerm,
    monthYear,
    daysInMonth,
    stats,
    pagination,
    paginatedData,
    entriesPerPage,
    navigateMonth,
    setCurrentPage,
    handleSearchChange,
    handleEntriesPerPageChange,
  };
}
