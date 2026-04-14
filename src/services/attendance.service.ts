import { attendanceClient } from '@/lib/api-client';
import {
  CreateAttendanceDto,
  UpdateAttendanceDto,
  BulkUpsertAttendanceDto,
  GetAttendanceByDateRangeDto,
  ApproveAttendanceDto,
  AttendanceFilterDto,
  AttendanceResponse,
  AttendanceListResponse,
  AttendanceSummaryResponse,
} from '@/types/attendance.types';
import { ATTENDANCE_ENDPOINTS } from '@/constants/endpoints/attendance.endpoints';
import { handleError } from '@/utils/errorHandler';

export class AttendanceService {
  private static instance: AttendanceService;

  static getInstance(): AttendanceService {
    if (!AttendanceService.instance) {
      AttendanceService.instance = new AttendanceService();
    }
    return AttendanceService.instance;
  }

  async createAttendance(data: CreateAttendanceDto): Promise<AttendanceResponse> {
    try {
      const response = await attendanceClient.post<AttendanceResponse>(
        ATTENDANCE_ENDPOINTS.CREATE,
        data
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async getAttendanceById(id: string): Promise<AttendanceResponse> {
    try {
      const response = await attendanceClient.get<AttendanceResponse>(
        ATTENDANCE_ENDPOINTS.GET_BY_ID(id)
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async getAttendanceByEmployeeDate(
    employeeId: string,
    date: string
  ): Promise<AttendanceResponse> {
    try {
      const response = await attendanceClient.get<AttendanceResponse>(
        ATTENDANCE_ENDPOINTS.GET_BY_EMPLOYEE_DATE,
        {
          params: { employeeId, date }
        }
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async updateAttendance(
    data: UpdateAttendanceDto
  ): Promise<AttendanceResponse> {
    try {
      const response = await attendanceClient.put<AttendanceResponse>(
        ATTENDANCE_ENDPOINTS.UPDATE(data.id),
        data
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async deleteAttendance(id: string): Promise<AttendanceResponse> {
    try {
      const response = await attendanceClient.delete<AttendanceResponse>(
        ATTENDANCE_ENDPOINTS.DELETE(id)
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async approveAttendance(data: ApproveAttendanceDto): Promise<AttendanceResponse> {
    try {
      const response = await attendanceClient.post<AttendanceResponse>(
        ATTENDANCE_ENDPOINTS.APPROVE(data.id),
        data
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async getAttendanceByDateRange(
    query: GetAttendanceByDateRangeDto
  ): Promise<AttendanceListResponse> {
    try {
      const response = await attendanceClient.get<AttendanceListResponse>(
        ATTENDANCE_ENDPOINTS.GET_BY_DATE_RANGE,
        {
          params: query
        }
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async getAttendanceSummary(
    query: GetAttendanceByDateRangeDto
  ): Promise<AttendanceSummaryResponse> {
    try {
      const response = await attendanceClient.get<AttendanceSummaryResponse>(
        ATTENDANCE_ENDPOINTS.GET_SUMMARY_STATS,
        {
          params: query
        }
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async getPendingApprovals(
    query: AttendanceFilterDto
  ): Promise<AttendanceListResponse> {
    try {
      const response = await attendanceClient.get<AttendanceListResponse>(
        ATTENDANCE_ENDPOINTS.GET_PENDING_APPROVALS,
        {
          params: query
        }
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }

  async bulkUpsertAttendance(
    data: BulkUpsertAttendanceDto
  ): Promise<AttendanceListResponse> {
    try {
      const response = await attendanceClient.post<AttendanceListResponse>(
        ATTENDANCE_ENDPOINTS.BULK_UPSERT,
        data
      );
      return response.data;
    } catch (error: any) {
      throw handleError(error);
    }
  }
}

export const attendanceService = AttendanceService.getInstance();
