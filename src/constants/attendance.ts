import {
  Star,
  Calendar,
  CalendarDays,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Plane,
  Users,
  TrendingUp,
  Sun,
  Moon,
  Download,
  Activity,
  Fingerprint,
  LucideIcon,
} from "lucide-react";

export interface AttendanceStatusConfig {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  dotColor: string;
  label: string;
  description: string;
}

export const ATTENDANCE_STATUS_MAP: Record<string, AttendanceStatusConfig> = {
  holiday: {
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    dotColor: "bg-purple-500",
    label: "Holiday",
    description: "Company holidays",
  },
  off: {
    icon: Calendar,
    color: "text-slate-500",
    bgColor: "bg-slate-50",
    dotColor: "bg-slate-400",
    label: "Day Off",
    description: "Weekly off days",
  },
  present: {
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    dotColor: "bg-emerald-500",
    label: "Present",
    description: "Present on time",
  },
  "half-day": {
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    dotColor: "bg-amber-500",
    label: "Half Day",
    description: "Half day attendance",
  },
  halfday: {
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    dotColor: "bg-amber-500",
    label: "Half Day",
    description: "Half day attendance",
  },
  late: {
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    dotColor: "bg-orange-500",
    label: "Late",
    description: "Late arrival",
  },
  absent: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    dotColor: "bg-red-500",
    label: "Absent",
    description: "No attendance",
  },
  leave: {
    icon: Plane,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    dotColor: "bg-blue-500",
    label: "On Leave",
    description: "Approved leave",
  },
};

export const LEGEND_KEYS = ["holiday", "off", "present", "half-day", "late", "absent", "leave"] as const;

export function getStatusConfig(status: string): AttendanceStatusConfig {
  return (
    ATTENDANCE_STATUS_MAP[status] || {
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      dotColor: "bg-emerald-500",
      label: status,
      description: "",
    }
  );
}

export interface StatCardConfig {
  key: keyof import("@/types/attendance.types").AttendanceStats;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  borderColor: string;
  textColor: string;
  iconBg: string;
}

export const STAT_CARDS: StatCardConfig[] = [
  {
    key: "totalEmployees",
    label: "Total Employee",
    subtitle: "Active this month",
    icon: Users,
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200/60",
    textColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    key: "totalPresent",
    label: "Total Present",
    subtitle: "This month",
    icon: CheckCircle,
    gradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200/60",
    textColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    key: "totalHalfDay",
    label: "Total Half Day",
    subtitle: "This month",
    icon: Clock,
    gradient: "from-amber-50 to-yellow-50",
    borderColor: "border-amber-200/60",
    textColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    key: "onLeaveEmployees",
    label: "On Leave",
    subtitle: "This month",
    icon: Plane,
    gradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200/60",
    textColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
];

export const ENTRIES_PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;

// My Attendance Page Constants

export interface MyAttendancePrimaryStatConfig {
  key: "totalPresent" | "totalAbsent" | "totalLate" | "overtimeHours";
  label: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  borderColor: string;
  textColor: string;
  iconBg: string;
  badgeType: "percentage" | "count" | "overtime" | "static";
}

export const MY_ATTENDANCE_PRIMARY_STATS: MyAttendancePrimaryStatConfig[] = [
  {
    key: "totalPresent",
    label: "Days Present",
    subtitle: "Attendance rate",
    icon: CheckCircle,
    gradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200/60",
    textColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    badgeType: "percentage",
  },
  {
    key: "totalAbsent",
    label: "Days Absent",
    subtitle: "This month",
    icon: XCircle,
    gradient: "from-red-50 to-rose-50",
    borderColor: "border-red-200/60",
    textColor: "text-red-600",
    iconBg: "bg-red-100",
    badgeType: "percentage",
  },
  {
    key: "totalLate",
    label: "Late Arrivals",
    subtitle: "This month",
    icon: Clock,
    gradient: "from-amber-50 to-yellow-50",
    borderColor: "border-amber-200/60",
    textColor: "text-amber-600",
    iconBg: "bg-amber-100",
    badgeType: "count",
  },
  {
    key: "overtimeHours",
    label: "Total Overtime",
    subtitle: "Extra hours",
    icon: TrendingUp,
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200/60",
    textColor: "text-blue-600",
    iconBg: "bg-blue-100",
    badgeType: "static",
  },
];

export interface MyAttendanceSecondaryStatConfig {
  key: "avgWorkingHours" | "totalHalfDay" | "totalLeave";
  label: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  borderColor: string;
  textColor: string;
  iconBg: string;
  suffix?: string;
}

export const MY_ATTENDANCE_SECONDARY_STATS: MyAttendanceSecondaryStatConfig[] = [
  {
    key: "avgWorkingHours",
    label: "Average Work Hours",
    subtitle: "Per day",
    icon: Sun,
    gradient: "from-sky-50 to-cyan-50",
    borderColor: "border-sky-200/60",
    textColor: "text-sky-600",
    iconBg: "bg-sky-100",
    suffix: "h",
  },
  {
    key: "totalHalfDay",
    label: "Half Days",
    subtitle: "This month",
    icon: AlertCircle,
    gradient: "from-orange-50 to-amber-50",
    borderColor: "border-orange-200/60",
    textColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
  {
    key: "totalLeave",
    label: "Leave Taken",
    subtitle: "This month",
    icon: Moon,
    gradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200/60",
    textColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
];

export interface MyAttendanceTabConfig {
  id: "overview" | "detailed" | "reports";
  label: string;
  icon: LucideIcon;
}

export const MY_ATTENDANCE_TABS: MyAttendanceTabConfig[] = [
  { id: "overview", label: "Overview", icon: Users },
  { id: "detailed", label: "Detailed Records", icon: CalendarDays },
  { id: "reports", label: "My Reports", icon: Download },
];

export const MY_ATTENDANCE_STATUS_OPTIONS = [
  "All Status",
  "Present",
  "Absent",
  "Late",
  "Half Day",
  "On Leave",
  "Holiday",
] as const;

export interface SummaryRowConfig {
  label: string;
  key: "totalPresent" | "totalAbsent" | "totalLate" | "totalLeave" | "overtimeHours";
  color: string;
  bg: string;
  icon: LucideIcon;
  isOvertime?: boolean;
}

export const MONTHLY_SUMMARY_ROWS: SummaryRowConfig[] = [
  { label: "Present Days", key: "totalPresent", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle },
  { label: "Absent Days", key: "totalAbsent", color: "text-red-500", bg: "bg-red-50", icon: XCircle },
  { label: "Late Arrivals", key: "totalLate", color: "text-amber-500", bg: "bg-amber-50", icon: Clock },
  { label: "Leave Taken", key: "totalLeave", color: "text-blue-500", bg: "bg-blue-50", icon: AlertCircle },
  { label: "Total Overtime", key: "overtimeHours", color: "text-violet-600", bg: "bg-violet-50", icon: TrendingUp, isOvertime: true },
];

// Biometric Attendance Page Constants

export interface BiometricStatCardConfig {
  key: keyof import("@/types/attendance.types").BiometricStats;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  borderColor: string;
  textColor: string;
  iconBg: string;
  badgeLabel: string;
}

export const BIOMETRIC_STAT_CARDS: BiometricStatCardConfig[] = [
  {
    key: "total",
    label: "Total Registered",
    subtitle: "Registered today",
    icon: Users,
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200/60",
    textColor: "text-blue-600",
    iconBg: "bg-blue-100",
    badgeLabel: "Total",
  },
  {
    key: "present",
    label: "Present",
    subtitle: "On time",
    icon: CheckCircle,
    gradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200/60",
    textColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    badgeLabel: "Present",
  },
  {
    key: "late",
    label: "Late Arrivals",
    subtitle: "Late check-in",
    icon: Clock,
    gradient: "from-amber-50 to-yellow-50",
    borderColor: "border-amber-200/60",
    textColor: "text-amber-600",
    iconBg: "bg-amber-100",
    badgeLabel: "Late",
  },
  {
    key: "absent",
    label: "Absent",
    subtitle: "No attendance",
    icon: XCircle,
    gradient: "from-red-50 to-rose-50",
    borderColor: "border-red-200/60",
    textColor: "text-red-600",
    iconBg: "bg-red-100",
    badgeLabel: "Absent",
  },
  {
    key: "leave",
    label: "On Leave",
    subtitle: "Approved leave",
    icon: Activity,
    gradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200/60",
    textColor: "text-violet-600",
    iconBg: "bg-violet-100",
    badgeLabel: "Leave",
  },
];

export const BIOMETRIC_STATUS_OPTIONS = [
  { value: "All Status", label: "All Status" },
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
  { value: "leave", label: "On Leave" },
] as const;

export const BIOMETRIC_TABLE_COLUMNS = [
  "Employee",
  "Department",
  "Check In",
  "Check Out",
  "Work Hours",
  "Status",
  "Device",
  "Geofence",
  "Actions",
] as const;

export interface BiometricStatusBadgeConfig {
  bg: string;
  text: string;
  border: string;
  darkBg: string;
  darkText: string;
  darkBorder: string;
  dot: string;
  label: string;
}

export const BIOMETRIC_STATUS_BADGE_MAP: Record<string, BiometricStatusBadgeConfig> = {
  present: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    darkBg: "dark:bg-emerald-950/30",
    darkText: "dark:text-emerald-400",
    darkBorder: "dark:border-emerald-800",
    dot: "bg-emerald-500",
    label: "Present",
  },
  absent: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    darkBg: "dark:bg-red-950/30",
    darkText: "dark:text-red-400",
    darkBorder: "dark:border-red-800",
    dot: "bg-red-500",
    label: "Absent",
  },
  late: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    darkBg: "dark:bg-amber-950/30",
    darkText: "dark:text-amber-400",
    darkBorder: "dark:border-amber-800",
    dot: "bg-amber-500",
    label: "Late",
  },
  leave: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    darkBg: "dark:bg-blue-950/30",
    darkText: "dark:text-blue-400",
    darkBorder: "dark:border-blue-800",
    dot: "bg-blue-500",
    label: "On Leave",
  },
};

export const GEOFENCE_STATUS_MAP: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  inside: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    darkBg: "dark:bg-emerald-950/30",
    darkText: "dark:text-emerald-400",
  },
  outside: {
    bg: "bg-red-50",
    text: "text-red-700",
    darkBg: "dark:bg-red-950/30",
    darkText: "dark:text-red-400",
  },
  exempt: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    darkBg: "dark:bg-slate-950/30",
    darkText: "dark:text-slate-400",
  },
};

export const DEFAULT_BIOMETRIC_ADVANCED_FILTERS: import("@/types/attendance.types").BiometricAdvancedFilters = {
  dateFrom: "",
  dateTo: "",
  departments: [],
  statuses: [],
  geofenceStatuses: [],
  devices: [],
  minWorkHours: 0,
  maxWorkHours: 24,
};
