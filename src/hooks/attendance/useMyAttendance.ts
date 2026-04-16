import { useState, useEffect, useMemo, useCallback } from "react";
import { attendanceService } from "@/services/attendance.service";
import type {
  Attendance,
  AttendanceSummaryDto,
  GetAttendanceByDateRangeDto,
  MyAttendanceTab,
  UseMyAttendanceReturn,
} from "@/types/attendance.types";

// TODO: Get these from auth context
const CURRENT_EMPLOYEE_ID = "EMP001";
const ORGANIZATION_ID = "org123";

export function useMyAttendance(): UseMyAttendanceReturn {
  const [activeTab, setActiveTab] = useState<MyAttendanceTab>("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [summary, setSummary] = useState<AttendanceSummaryDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAttendanceData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const startDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
      const endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

      const query: GetAttendanceByDateRangeDto = {
        organizationId: ORGANIZATION_ID,
        employeeId: CURRENT_EMPLOYEE_ID,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      };

      const [attendanceResponse, summaryResponse] = await Promise.all([
        attendanceService.getAttendanceByDateRange(query),
        attendanceService.getAttendanceSummary(query),
      ]);

      if (attendanceResponse.success && attendanceResponse.data) {
        setAttendanceData(attendanceResponse.data);
      }

      if (summaryResponse.success && summaryResponse.data) {
        setSummary(summaryResponse.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    loadAttendanceData();
  }, [loadAttendanceData]);

  const filteredAttendance = useMemo(() => {
    return attendanceData.filter((record) => {
      const matchesSearch =
        record.remarks?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const matchesStatus =
        selectedStatus === "All Status" || record.status === selectedStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [attendanceData, searchTerm, selectedStatus]);

  const computed = useMemo(() => {
    const stats = summary || {
      totalPresent: filteredAttendance.filter((r) => r.status === "present").length,
      totalAbsent: filteredAttendance.filter((r) => r.status === "absent").length,
      totalLate: filteredAttendance.filter((r) => r.status === "late").length,
      totalHalfDay: filteredAttendance.filter((r) => r.status === "half-day").length,
      totalLeave: filteredAttendance.filter((r) => r.status === "leave").length,
      workingHours: 0,
      overtimeHours: 0,
    };

    const totalDays = filteredAttendance.length;
    const attendancePercentage =
      totalDays > 0 ? Math.round((stats.totalPresent / totalDays) * 100) : 0;
    const avgWorkingHours =
      stats.totalPresent > 0
        ? Math.round((stats.workingHours / stats.totalPresent) * 10) / 10
        : 0;

    return { stats, totalDays, attendancePercentage, avgWorkingHours };
  }, [summary, filteredAttendance]);

  const monthYear = selectedMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goToPreviousMonth = useCallback(() => {
    setSelectedMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(prev.getMonth() - 1);
      return d;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setSelectedMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(prev.getMonth() + 1);
      return d;
    });
  }, []);

  return {
    activeTab,
    setActiveTab,
    selectedMonth,
    setSelectedMonth,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    attendanceData,
    filteredAttendance,
    loading,
    error,
    computed,
    monthYear,
    goToPreviousMonth,
    goToNextMonth,
  };
}
