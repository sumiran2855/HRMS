import { TicketAction, TicketItem, TicketPriority, TicketRole, TicketStatus } from "@/types/ticket.types"

export const TICKET_STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
]

export const TICKET_PRIORITY_OPTIONS = [
  { value: "all", label: "All Priority" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
]

export const TICKET_CATEGORY_OPTIONS = [
  "All Categories",
  "Hardware",
  "Software",
  "Access",
  "Payroll",
  "Network",
]

export const TICKET_DEPARTMENT_OPTIONS = [
  "Engineering",
  "Finance",
  "HR",
  "Operations",
  "Sales",
  "Support",
]

export const TICKET_PAGE_SIZE_OPTIONS = [5, 10, 15]

export const TICKET_STATUS_BADGE: Record<TicketStatus, string> = {
  open: "bg-sky-50 text-sky-700 border-sky-200",
  in_progress: "bg-amber-50 text-amber-700 border-amber-200",
  resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-700 border-slate-200",
}

export const TICKET_PRIORITY_BADGE: Record<TicketPriority, string> = {
  low: "bg-slate-100 text-slate-700 border-slate-200",
  medium: "bg-indigo-50 text-indigo-700 border-indigo-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  critical: "bg-rose-50 text-rose-700 border-rose-200",
}

export const TICKET_DATA: TicketItem[] = [
  {
    id: "TCK-2001",
    title: "Laptop battery drain issue",
    description: "Device battery drains from 100% to 20% within 2 hours.",
    category: "Hardware",
    requesterName: "Aisha Thomas",
    requesterId: "EMP-1034",
    department: "Engineering",
    assignedTo: "IT Support - Karan",
    createdAt: "2026-04-21",
    dueDate: "2026-04-29",
    status: "in_progress",
    priority: "high",
    comments: [],
  },
  {
    id: "TCK-2002",
    title: "VPN access request",
    description: "Need VPN access for remote deployment support.",
    category: "Access",
    requesterName: "Ravi Menon",
    requesterId: "EMP-1022",
    department: "Operations",
    assignedTo: "IT Security - Sana",
    createdAt: "2026-04-24",
    dueDate: "2026-04-27",
    status: "open",
    priority: "medium",
    comments: [],
  },
  {
    id: "TCK-2003",
    title: "Payroll slip mismatch",
    description: "Variable bonus amount is missing on payslip.",
    category: "Payroll",
    requesterName: "Priya Desai",
    requesterId: "EMP-1103",
    department: "Finance",
    assignedTo: "HR Ops - Neha",
    createdAt: "2026-04-18",
    dueDate: "2026-04-22",
    status: "resolved",
    priority: "high",
    comments: [],
  },
]

export function getAllowedTicketActions(status: TicketStatus, role: TicketRole): TicketAction[] {
  if (status === "open" && (role === "it" || role === "hr")) return ["start", "close"]
  if (status === "in_progress" && (role === "it" || role === "hr")) return ["resolve", "close"]
  if (status === "resolved" && (role === "manager" || role === "hr")) return ["close", "reopen"]
  if (status === "closed" && role === "hr") return ["reopen"]
  return []
}
