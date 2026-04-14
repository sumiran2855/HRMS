"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Search, Calendar, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, User, Filter, Download, ChevronLeft, ChevronRight, Sun, Moon, CalendarDays, ArrowUpRight, ArrowDownRight, Activity, Loader2 } from "lucide-react"
import { AttendanceCalendar } from "@/components/dashboard/attendance/AttendanceCalendar"
import { attendanceService } from "@/services/attendance.service"
import { Attendance, AttendanceSummaryDto, GetAttendanceByDateRangeDto } from "@/types/attendance.types"

// TODO: Get these from auth context
const currentEmployeeId = "EMP001"
const organizationId = "org123"

export default function MyAttendancePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([])
  const [summary, setSummary] = useState<AttendanceSummaryDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load attendance data when month changes
  useEffect(() => {
    loadAttendanceData()
  }, [selectedMonth])

  const loadAttendanceData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const startDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1)
      const endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0)
      
      const query: GetAttendanceByDateRangeDto = {
        organizationId,
        employeeId: currentEmployeeId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      }

      const [attendanceResponse, summaryResponse] = await Promise.all([
        attendanceService.getAttendanceByDateRange(query),
        attendanceService.getAttendanceSummary(query)
      ])

      if (attendanceResponse.success && attendanceResponse.data) {
        setAttendanceData(attendanceResponse.data)
      }
      
      if (summaryResponse.success && summaryResponse.data) {
        setSummary(summaryResponse.data)
      }
    } catch (err: any) {
      setError(err.message || "Failed to load attendance data")
    } finally {
      setLoading(false)
    }
  }

  // Filter attendance data
  const filteredAttendance = attendanceData.filter(record => {
    const matchesSearch = record.remarks?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    const matchesStatus = selectedStatus === "All Status" || record.status === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  // Calculate statistics from API summary or fallback to local calculation
  const stats = summary || {
    totalPresent: filteredAttendance.filter(r => r.status === 'present').length,
    totalAbsent: filteredAttendance.filter(r => r.status === 'absent').length,
    totalLate: filteredAttendance.filter(r => r.status === 'late').length,
    totalHalfDay: filteredAttendance.filter(r => r.status === 'half-day').length,
    totalLeave: filteredAttendance.filter(r => r.status === 'leave').length,
    workingHours: 0,
    overtimeHours: 0,
  }

  const totalDays = filteredAttendance.length
  const attendancePercentage = totalDays > 0 ? Math.round((stats.totalPresent / totalDays) * 100) : 0
  const avgWorkingHours = stats.totalPresent > 0 ? Math.round(stats.workingHours / stats.totalPresent * 10) / 10 : 0

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "detailed", label: "Detailed Records", icon: CalendarDays },
    { id: "reports", label: "My Reports", icon: Download }
  ]

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'present':
        return { icon: CheckCircle, color: '#10b981', bg: '#dcfce7', border: '#86efac', label: 'Present' }
      case 'absent':
        return { icon: XCircle, color: '#ef4444', bg: '#fee2e2', border: '#fca5a5', label: 'Absent' }
      case 'late':
        return { icon: Clock, color: '#f59e0b', bg: '#fef3c7', border: '#fcd34d', label: 'Late' }
      case 'half-day':
        return { icon: AlertCircle, color: '#f97316', bg: '#ffedd5', border: '#fdba74', label: 'Half Day' }
      case 'leave':
        return { icon: AlertCircle, color: '#3b82f6', bg: '#dbeafe', border: '#93c5fd', label: 'On Leave' }
      case 'holiday':
        return { icon: Calendar, color: '#8b5cf6', bg: '#ede9fe', border: '#c4b5fd', label: 'Holiday' }
      default:
        return { icon: CheckCircle, color: '#10b981', bg: '#dcfce7', border: '#86efac', label: 'Present' }
    }
  }

  const formatOvertime = (hours: number) => {
    if (hours === 0) return "0h"
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    if (h === 0) return `${m}m`
    if (m === 0) return `${h}h`
    return `${h}h ${m}m`
  }

  const formatTime = (time?: string) => {
    if (!time) return "--:--"
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const monthYear = selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 16px" }}>
      <style jsx>{`
        .ma-card { transition: all 0.2s ease; }
        .ma-card:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -10px rgba(0,0,0,0.1); }
        .ma-tab { transition: all 0.15s ease; }
        .ma-tab:hover { background: #f8fafc; }
        .ma-tab.active { background: #eff6ff; color: #2563eb; border-color: #3b82f6; }
        .ma-row { transition: background 0.15s ease; }
        .ma-row:hover { background: #f8fafc; }
        @media (max-width: 768px) {
          .ma-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ma-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 6 }}>
            My Attendance
          </h1>
          <p style={{ fontSize: 14, color: "#64748b" }}>
            Track your monthly attendance patterns and work hours
          </p>
        </div>

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, background: "#f8fafc", borderRadius: 12 }}>
            <Loader2 style={{ width: 20, height: 20, color: "#3b82f6", animation: "spin 1s linear infinite" }} />
            <span style={{ fontSize: 14, color: "#64748b" }}>Loading attendance data...</span>
          </div>
        )}

        {/* Month Selector */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 12, padding: "12px 20px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CalendarDays style={{ width: 20, height: 20, color: "#fff" }} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{monthYear}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Select period to view attendance</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => {
                const newDate = new Date(selectedMonth)
                newDate.setMonth(selectedMonth.getMonth() - 1)
                setSelectedMonth(newDate)
              }}
              style={{
                width: 40, height: 40, borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                transition: "all 0.15s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
            >
              <ChevronLeft style={{ width: 18, height: 18, color: "#64748b" }} />
            </button>
            <button
              onClick={() => {
                const newDate = new Date(selectedMonth)
                newDate.setMonth(selectedMonth.getMonth() + 1)
                setSelectedMonth(newDate)
              }}
              style={{
                width: 40, height: 40, borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                transition: "all 0.15s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
            >
              <ChevronRight style={{ width: 18, height: 18, color: "#64748b" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="ma-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <div className="ma-card" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", borderRadius: 16, padding: 20, color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <CheckCircle style={{ width: 24, height: 24, opacity: 0.9 }} />
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 20 }}>
              {attendancePercentage}%
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>{stats.totalPresent}</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>Days Present</div>
        </div>

        <div className="ma-card" style={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", borderRadius: 16, padding: 20, color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <XCircle style={{ width: 24, height: 24, opacity: 0.9 }} />
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 20 }}>
              {totalDays > 0 ? Math.round((stats.totalAbsent / totalDays) * 100) : 0}%
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>{stats.totalAbsent}</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>Days Absent</div>
        </div>

        <div className="ma-card" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", borderRadius: 16, padding: 20, color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <Clock style={{ width: 24, height: 24, opacity: 0.9 }} />
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 20 }}>
              {stats.totalLate}
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>{stats.totalLate}</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>Late Arrivals</div>
        </div>

        <div className="ma-card" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", borderRadius: 16, padding: 20, color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <TrendingUp style={{ width: 24, height: 24, opacity: 0.9 }} />
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 20 }}>
              OT
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>{formatOvertime(stats.overtimeHours)}</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>Total Overtime</div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <div className="ma-card" style={{ background: "#fff", borderRadius: 14, padding: 18, border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sun style={{ width: 22, height: 22, color: "#3b82f6" }} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 2 }}>Average Work Hours</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{avgWorkingHours}h</div>
            </div>
          </div>
        </div>

        <div className="ma-card" style={{ background: "#fff", borderRadius: 14, padding: 18, border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AlertCircle style={{ width: 22, height: 22, color: "#f97316" }} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 2 }}>Half Days</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{stats.totalHalfDay}</div>
            </div>
          </div>
        </div>

        <div className="ma-card" style={{ background: "#fff", borderRadius: 14, padding: 18, border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Moon style={{ width: 22, height: 22, color: "#8b5cf6" }} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 2 }}>Leave Taken</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{stats.totalLeave}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", marginBottom: 20, overflow: "hidden" }}>
        <div style={{ display: "flex", borderBottom: "1px solid #f1f5f9" }}>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`ma-tab ${isActive ? 'active' : ''}`}
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? "#2563eb" : "#64748b",
                  borderBottom: isActive ? "2px solid #3b82f6" : "2px solid transparent",
                  fontFamily: "inherit",
                }}
              >
                <Icon style={{ width: 18, height: 18 }} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Filters */}
        <div style={{ padding: 20, borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
              <Search style={{ position: "absolute", left: 14, top: 13, width: 18, height: 18, color: "#94a3b8", pointerEvents: "none" }} />
              <input
                placeholder="Search by notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%", height: 44, borderRadius: 10, border: "1.5px solid #e2e8f0",
                  paddingLeft: 44, paddingRight: 12, fontSize: 14, color: "#0f172a", outline: "none",
                  fontFamily: "inherit", background: "#fff", transition: "border-color 0.15s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>
            <div style={{ minWidth: 160 }}>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  width: "100%", height: 44, borderRadius: 10, border: "1.5px solid #e2e8f0",
                  padding: "0 12px", fontSize: 14, color: "#0f172a", outline: "none",
                  fontFamily: "inherit", background: "#fff", cursor: "pointer",
                  appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: 16
                }}
              >
                <option value="All Status">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Half Day">Half Day</option>
                <option value="Leave">On Leave</option>
                <option value="Holiday">Holiday</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: 400 }}>
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Recent Attendance */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ padding: 20, borderBottom: "1px solid #f1f5f9" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Recent Attendance (Last 7 Days)</h3>
              </div>
              <div style={{ maxHeight: 400, overflowY: "auto" }}>
                {filteredAttendance.slice(0, 7).map((record, index) => {
                  const config = getStatusConfig(record.status)
                  const StatusIcon = config.icon
                  
                  return (
                    <div key={record._id} className="ma-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: index < 6 ? "1px solid #f1f5f9" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: config.bg, border: `1px solid ${config.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <StatusIcon style={{ width: 20, height: 20, color: config.color }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{record.date}</div>
                          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{record.remarks || "No remarks"}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{formatTime(record.checkInTime)}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{formatTime(record.checkOutTime)}</div>
                        {record.overtime && record.overtime > 0 && (
                          <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 600, marginTop: 2 }}>+{formatOvertime(record.overtime)}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Attendance Summary */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ padding: 20, borderBottom: "1px solid #f1f5f9" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Monthly Summary</h3>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Present Days", value: stats.totalPresent, color: "#10b981", bg: "#dcfce7", icon: CheckCircle },
                    { label: "Absent Days", value: stats.totalAbsent, color: "#ef4444", bg: "#fee2e2", icon: XCircle },
                    { label: "Late Arrivals", value: stats.totalLate, color: "#f59e0b", bg: "#fef3c7", icon: Clock },
                    { label: "Leave Taken", value: stats.totalLeave, color: "#3b82f6", bg: "#dbeafe", icon: AlertCircle },
                    { label: "Total Overtime", value: formatOvertime(stats.overtimeHours), color: "#8b5cf6", bg: "#ede9fe", icon: TrendingUp },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 10, background: item.bg }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon style={{ width: 18, height: 18, color: item.color }} />
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 600, color: item.color }}>{item.label}</span>
                        </div>
                        <span style={{ fontSize: 18, fontWeight: 700, color: item.color }}>{item.value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "detailed" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Date
                    </th>
                    <th style={{ padding: "16px 20px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Check In
                    </th>
                    <th style={{ padding: "16px 20px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Check Out
                    </th>
                    <th style={{ padding: "16px 20px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Status
                    </th>
                    <th style={{ padding: "16px 20px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Overtime
                    </th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((record, index) => {
                    const config = getStatusConfig(record.status)
                    const StatusIcon = config.icon
                    
                    return (
                      <tr key={record._id} className="ma-row" style={{ borderBottom: index < filteredAttendance.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Calendar style={{ width: 18, height: 18, color: "#64748b" }} />
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{record.date}</span>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "center" }}>
                          <span style={{ fontSize: 14, fontWeight: 500, color: "#0f172a" }}>{formatTime(record.checkInTime)}</span>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "center" }}>
                          <span style={{ fontSize: 14, fontWeight: 500, color: "#0f172a" }}>{formatTime(record.checkOutTime)}</span>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "center" }}>
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px",
                            borderRadius: 20, fontSize: 12, fontWeight: 600, color: config.color, background: config.bg, border: `1px solid ${config.border}`
                          }}>
                            <StatusIcon style={{ width: 14, height: 14 }} />
                            {config.label}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "center" }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: record.overtime && record.overtime > 0 ? "#3b82f6" : "#94a3b8" }}>
                            {formatOvertime(record.overtime || 0)}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ fontSize: 14, color: "#64748b" }}>{record.remarks || "-"}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredAttendance.length === 0 && (
              <div style={{ textAlign: "center", padding: 60 }}>
                <Calendar style={{ width: 48, height: 48, color: "#cbd5e1", margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>No attendance records found</h3>
                <p style={{ fontSize: 14, color: "#64748b" }}>
                  {searchTerm || selectedStatus !== "All Status" 
                    ? "Try adjusting your search or filter criteria" 
                    : "No attendance data available for the selected period"}
                </p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "reports" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: 60, textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Download style={{ width: 32, height: 32, color: "#64748b" }} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>My Attendance Reports</h3>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>Download your attendance reports for different time periods.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{
                padding: "12px 24px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff",
                fontSize: 14, fontWeight: 600, color: "#0f172a", cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.15s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.background = "#f8fafc" }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff" }}
              >
                Monthly Report
              </button>
              <button style={{
                padding: "12px 24px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff",
                fontSize: 14, fontWeight: 600, color: "#0f172a", cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.15s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.background = "#f8fafc" }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff" }}
              >
                Quarterly Report
              </button>
              <button style={{
                padding: "12px 24px", borderRadius: 10, border: "1.5px solid #3b82f6", background: "#3b82f6",
                fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.15s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#2563eb"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#3b82f6"}
              >
                Annual Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
