import type { LeaveRequest, LeaveBalance, LeaveStatCardConfig, LeaveStatusBadgeConfig, LeaveTabConfig } from "@/types/leave.types"

export const LEAVE_STAT_CARDS: LeaveStatCardConfig[] = [
  {
    key: "pending",
    label: "Pending Requests",
    badgeLabel: "Pending",
    icon: "Clock",
    gradient: "from-amber-500 to-amber-600",
    shadow: "shadow-amber-500/25",
    badgeBg: "bg-amber-50 dark:bg-amber-950/30",
    badgeText: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "approved",
    label: "Approved Requests",
    badgeLabel: "Approved",
    icon: "CheckCircle",
    gradient: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-500/25",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/30",
    badgeText: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "rejected",
    label: "Rejected Requests",
    badgeLabel: "Rejected",
    icon: "XCircle",
    gradient: "from-red-500 to-red-600",
    shadow: "shadow-red-500/25",
    badgeBg: "bg-red-50 dark:bg-red-950/30",
    badgeText: "text-red-600 dark:text-red-400",
  },
  {
    key: "daysUsed",
    label: "Days Used (Me)",
    badgeLabel: "Used",
    icon: "Calendar",
    gradient: "from-violet-500 to-violet-600",
    shadow: "shadow-violet-500/25",
    badgeBg: "bg-violet-50 dark:bg-violet-950/30",
    badgeText: "text-violet-600 dark:text-violet-400",
  },
]

export const LEAVE_STATUS_BADGE_MAP: Record<string, LeaveStatusBadgeConfig> = {
  approved: {
    label: "Approved",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dark: "dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dark: "dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
    dot: "bg-red-500",
  },
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dark: "dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    dot: "bg-amber-500",
  },
}

export const LEAVE_TABS: LeaveTabConfig[] = [
  { id: "overview", label: "Overview", icon: "TrendingUp" },
  { id: "apply", label: "Apply Leave", icon: "Plus" },
  { id: "my-leaves", label: "My Leaves", icon: "FileText" },
  { id: "approve", label: "Approvals", icon: "Check" },
  { id: "calendar", label: "Calendar", icon: "Calendar" },
]

export const LEAVE_BALANCES: LeaveBalance[] = [
  {
    type: "Annual Leave",
    icon: "Umbrella",
    color: "violet",
    total: 21,
    used: 5,
    remaining: 16,
    gradient: "from-violet-500 to-violet-600",
    iconGradient: "from-violet-500 to-indigo-600",
    shadow: "shadow-violet-500/25",
    badgeBg: "bg-violet-50 dark:bg-violet-950/30",
    badgeText: "text-violet-600 dark:text-violet-400",
  },
  {
    type: "Sick Leave",
    icon: "Heart",
    color: "rose",
    total: 10,
    used: 2,
    remaining: 8,
    gradient: "from-rose-500 to-rose-600",
    iconGradient: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-500/25",
    badgeBg: "bg-rose-50 dark:bg-rose-950/30",
    badgeText: "text-rose-600 dark:text-rose-400",
  },
  {
    type: "Personal Leave",
    icon: "User",
    color: "sky",
    total: 5,
    used: 1,
    remaining: 4,
    gradient: "from-sky-500 to-sky-600",
    iconGradient: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/25",
    badgeBg: "bg-sky-50 dark:bg-sky-950/30",
    badgeText: "text-sky-600 dark:text-sky-400",
  },
  {
    type: "Parental Leave",
    icon: "Briefcase",
    color: "emerald",
    total: 90,
    used: 0,
    remaining: 90,
    gradient: "from-emerald-500 to-emerald-600",
    iconGradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/25",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/30",
    badgeText: "text-emerald-600 dark:text-emerald-400",
  },
]

export const LEAVE_REQUESTS: LeaveRequest[] = [
  { id: "1", employeeName: "John Doe", employeeId: "EMP001", avatar: "JD", type: "Sick Leave", startDate: "2024-01-15", endDate: "2024-01-16", days: 2, reason: "Fever and flu", status: "pending", appliedDate: "2024-01-14" },
  { id: "2", employeeName: "Jane Smith", employeeId: "EMP002", avatar: "JS", type: "Annual Leave", startDate: "2024-01-20", endDate: "2024-01-25", days: 5, reason: "Family vacation", status: "approved", appliedDate: "2024-01-10" },
  { id: "3", employeeName: "Bob Johnson", employeeId: "EMP003", avatar: "BJ", type: "Personal Leave", startDate: "2024-01-22", endDate: "2024-01-22", days: 1, reason: "Personal matters", status: "rejected", appliedDate: "2024-01-18" },
  { id: "4", employeeName: "Sara Lee", employeeId: "EMP004", avatar: "SL", type: "Annual Leave", startDate: "2024-01-28", endDate: "2024-02-02", days: 4, reason: "Travel", status: "pending", appliedDate: "2024-01-20" },
]

export const MY_LEAVES: LeaveRequest[] = [
  { id: "5", employeeName: "Current User", employeeId: "EMP001", avatar: "ME", type: "Sick Leave", startDate: "2024-01-10", endDate: "2024-01-11", days: 2, reason: "Medical appointment", status: "approved", appliedDate: "2024-01-09" },
  { id: "6", employeeName: "Current User", employeeId: "EMP001", avatar: "ME", type: "Annual Leave", startDate: "2024-02-01", endDate: "2024-02-05", days: 5, reason: "Vacation", status: "pending", appliedDate: "2024-01-20" },
  { id: "7", employeeName: "Current User", employeeId: "EMP001", avatar: "ME", type: "Personal Leave", startDate: "2024-03-10", endDate: "2024-03-10", days: 1, reason: "House shifting", status: "rejected", appliedDate: "2024-03-05" },
]

export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
