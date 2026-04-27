import { ResignationRequest, ResignationRole, ResignationStatus } from "@/types/resignation.types"

export const RESIGNATION_STATUS_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
]

export const RESIGNATION_DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Design",
  "Finance",
  "HR",
  "Marketing",
  "Operations",
]

export const RESIGNATION_PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export const RESIGNATION_STATUS_BADGE: Record<ResignationStatus, string> = {
  pending: "text-yellow-700 bg-yellow-100 border-yellow-200",
  approved: "text-green-700 bg-green-100 border-green-200",
  rejected: "text-red-700 bg-red-100 border-red-200",
  withdrawn: "text-slate-700 bg-slate-100 border-slate-200",
}

export function getAllowedActions(status: ResignationStatus, role: ResignationRole) {
  if (role === "employee") {
    return status === "pending" ? ["withdraw"] as const : []
  }

  if (role === "manager") {
    return status === "pending" ? ["approve", "reject"] as const : []
  }

  if (status === "pending") {
    return ["approve", "reject", "withdraw"] as const
  }

  return []
}

export const RESIGNATION_DATA: ResignationRequest[] = [
  {
    id: "RES-1001",
    employeeId: "EMP-2401",
    employeeName: "Aarav Sharma",
    avatar: "AS",
    department: "Engineering",
    designation: "Senior Frontend Developer",
    reportingManager: "Nisha Verma",
    appliedDate: "2026-03-12",
    lastWorkingDate: "2026-04-25",
    noticePeriodDays: 45,
    handoverProgress: 70,
    reason: "Moving to a product-focused role with broader ownership.",
    status: "pending",
    exitInterviewScheduled: false,
    workflowHistory: [],
  },
  {
    id: "RES-1002",
    employeeId: "EMP-1883",
    employeeName: "Priya Menon",
    avatar: "PM",
    department: "Finance",
    designation: "Financial Analyst",
    reportingManager: "Karan Arora",
    appliedDate: "2026-02-20",
    lastWorkingDate: "2026-03-31",
    noticePeriodDays: 40,
    handoverProgress: 100,
    reason: "Relocating to another city for personal reasons.",
    status: "approved",
    exitInterviewScheduled: true,
    workflowHistory: [
      {
        id: "wf-1",
        action: "approve",
        actorRole: "manager",
        actorName: "Karan Arora",
        remark: "Handover plan is complete.",
        date: "2026-02-25",
      },
    ],
  },
  {
    id: "RES-1003",
    employeeId: "EMP-1752",
    employeeName: "Rohan Dutta",
    avatar: "RD",
    department: "Design",
    designation: "UI/UX Designer",
    reportingManager: "Sonal Khanna",
    appliedDate: "2026-03-04",
    lastWorkingDate: "2026-04-10",
    noticePeriodDays: 37,
    handoverProgress: 45,
    reason: "Pursuing higher studies in Human Centered Design.",
    status: "pending",
    exitInterviewScheduled: false,
    workflowHistory: [],
  },
  {
    id: "RES-1004",
    employeeId: "EMP-1690",
    employeeName: "Neha Gupta",
    avatar: "NG",
    department: "HR",
    designation: "HR Business Partner",
    reportingManager: "Aditya Rao",
    appliedDate: "2026-01-15",
    lastWorkingDate: "2026-02-28",
    noticePeriodDays: 44,
    handoverProgress: 100,
    reason: "Transitioning to a remote consulting opportunity.",
    status: "approved",
    exitInterviewScheduled: true,
    workflowHistory: [
      {
        id: "wf-2",
        action: "approve",
        actorRole: "hr",
        actorName: "HR Admin",
        remark: "Exit checklist shared with employee.",
        date: "2026-01-20",
      },
    ],
  },
  {
    id: "RES-1005",
    employeeId: "EMP-2514",
    employeeName: "Tanvi Sethi",
    avatar: "TS",
    department: "Marketing",
    designation: "Content Strategist",
    reportingManager: "Ritika Jain",
    appliedDate: "2026-03-22",
    lastWorkingDate: "2026-05-01",
    noticePeriodDays: 40,
    handoverProgress: 20,
    reason: "Switching to a role in brand communications.",
    status: "rejected",
    exitInterviewScheduled: false,
    workflowHistory: [
      {
        id: "wf-3",
        action: "reject",
        actorRole: "manager",
        actorName: "Ritika Jain",
        remark: "Critical release period, request deferred.",
        date: "2026-03-24",
      },
    ],
  },
  {
    id: "RES-1006",
    employeeId: "EMP-1339",
    employeeName: "Vikram Nair",
    avatar: "VN",
    department: "Operations",
    designation: "Operations Associate",
    reportingManager: "Deepa Iyer",
    appliedDate: "2026-02-10",
    lastWorkingDate: "2026-03-20",
    noticePeriodDays: 38,
    handoverProgress: 85,
    reason: "Accepted an internal transfer and withdrew resignation.",
    status: "withdrawn",
    exitInterviewScheduled: false,
    workflowHistory: [
      {
        id: "wf-4",
        action: "withdraw",
        actorRole: "employee",
        actorName: "Vikram Nair",
        remark: "Staying due to internal transfer confirmation.",
        date: "2026-02-18",
      },
    ],
  },
]
