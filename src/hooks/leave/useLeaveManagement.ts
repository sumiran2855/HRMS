"use client"

import { useState, useMemo, useCallback } from "react"
import type { LeaveRequest, LeaveFormData, LeaveStats, UseLeaveManagementReturn } from "@/types/leave.types"
import { LEAVE_REQUESTS, MY_LEAVES } from "@/constants/leave-management"

function calculateStats(requests: LeaveRequest[], myLeaves: LeaveRequest[]): LeaveStats {
  return {
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    daysUsed: myLeaves.reduce((s, r) => s + r.days, 0),
  }
}

function filterLeaves(list: LeaveRequest[], search: string, statusFilter: string): LeaveRequest[] {
  return list.filter(
    (r) =>
      (r.employeeName + r.type + r.reason).toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "all" || r.status === statusFilter)
  )
}

function buildCalendar(date: Date, allLeaves: LeaveRequest[]) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const leaveDays = new Set(
    allLeaves
      .flatMap((r) => {
        const days: string[] = []
        const d = new Date(r.startDate)
        const e = new Date(r.endDate)
        while (d <= e) {
          days.push(d.toISOString().slice(0, 10))
          d.setDate(d.getDate() + 1)
        }
        return days
      })
      .filter((d) => d.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
      .map((d) => parseInt(d.slice(8)))
  )

  return { cells, leaveDays, year, month }
}

export function useLeaveManagement(): UseLeaveManagementReturn {
  const [activeTab, setActiveTab] = useState("overview")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [formData, setFormData] = useState<LeaveFormData>({ type: "", startDate: "", endDate: "", reason: "" })
  const [submitted, setSubmitted] = useState(false)

  const monthLabel = useMemo(
    () => selectedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    [selectedMonth]
  )

  const prevMonth = useCallback(
    () => setSelectedMonth((p) => { const d = new Date(p); d.setMonth(d.getMonth() - 1); return d }),
    []
  )
  const nextMonth = useCallback(
    () => setSelectedMonth((p) => { const d = new Date(p); d.setMonth(d.getMonth() + 1); return d }),
    []
  )

  const allLeaves = useMemo(() => [...LEAVE_REQUESTS, ...MY_LEAVES], [])
  const stats = useMemo(() => calculateStats(LEAVE_REQUESTS, MY_LEAVES), [])
  const filteredMyLeaves = useMemo(() => filterLeaves(MY_LEAVES, search, statusFilter), [search, statusFilter])
  const filteredRequests = useMemo(() => filterLeaves(LEAVE_REQUESTS, search, statusFilter), [search, statusFilter])

  const { cells: calendarCells, leaveDays } = useMemo(
    () => buildCalendar(selectedMonth, allLeaves),
    [selectedMonth, allLeaves]
  )

  const handleSubmitLeave = useCallback(() => {
    if (formData.type && formData.startDate && formData.endDate && formData.reason) {
      setSubmitted(true)
    }
  }, [formData])

  const resetFilters = useCallback(() => {
    setSearch("")
    setStatusFilter("all")
  }, [])

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedMonth,
    prevMonth,
    nextMonth,
    monthLabel,
    formData,
    setFormData,
    submitted,
    setSubmitted,
    stats,
    filteredMyLeaves,
    filteredRequests,
    calendarCells,
    leaveDays,
    allLeaves,
    handleSubmitLeave,
    resetFilters,
  }
}
