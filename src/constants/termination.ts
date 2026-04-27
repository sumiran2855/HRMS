import {
  TerminationAction,
  TerminationRequest,
  TerminationRole,
  TerminationStatus,
  TerminationType,
} from "@/types/termination.types"

export const TERMINATION_STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
]

export const TERMINATION_TYPE_OPTIONS: TerminationType[] = [
  "Performance",
  "Disciplinary",
  "Redundancy",
  "Contract End",
]

export const TERMINATION_DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Finance",
  "Sales",
  "HR",
  "Operations",
]

export const TERMINATION_DEPARTMENT_OPTIONS = [
  "Engineering",
  "Finance",
  "Sales",
  "HR",
  "Operations",
]

export const TERMINATION_PAGE_SIZE_OPTIONS = [5, 10, 15]

export const TERMINATION_STATUS_BADGE: Record<TerminationStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-sky-50 text-sky-700 border-sky-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

export const TERMINATION_DATA: TerminationRequest[] = [
  {
    id: "TRM-3001",
    employeeId: "EMP-1092",
    employeeName: "Nitin Rao",
    avatar: "NR",
    department: "Operations",
    designation: "Support Executive",
    managerName: "Ravi Menon",
    terminationType: "Performance",
    reason: "Repeated failure to meet agreed performance improvement goals.",
    effectiveDate: "2026-05-05",
    initiatedDate: "2026-04-20",
    finalSettlementStatus: "pending",
    status: "pending",
    history: [],
  },
  {
    id: "TRM-3002",
    employeeId: "EMP-1041",
    employeeName: "Dev Patel",
    avatar: "DP",
    department: "Engineering",
    designation: "Frontend Developer",
    managerName: "Aisha Thomas",
    terminationType: "Contract End",
    reason: "Contract tenure completed with no extension requirement.",
    effectiveDate: "2026-04-30",
    initiatedDate: "2026-04-10",
    finalSettlementStatus: "processed",
    status: "approved",
    history: [],
  },
  {
    id: "TRM-3003",
    employeeId: "EMP-1017",
    employeeName: "Sana Khan",
    avatar: "SK",
    department: "HR",
    designation: "HR Specialist",
    managerName: "Neha Kapoor",
    terminationType: "Redundancy",
    reason: "Position dissolved as part of org-level restructuring.",
    effectiveDate: "2026-04-25",
    initiatedDate: "2026-04-01",
    finalSettlementStatus: "processed",
    status: "completed",
    history: [],
  },
]

export function getAllowedTerminationActions(
  status: TerminationStatus,
  role: TerminationRole
): TerminationAction[] {
  if (status === "pending" && (role === "hr" || role === "admin")) return ["approve", "reject"]
  if (status === "approved" && role === "hr") return ["complete"]
  return []
}
