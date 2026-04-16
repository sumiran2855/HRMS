import {
  Building2,
  Sparkles,
  Users,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import type { Department, DepartmentStats } from "@/types/department.types";

// Stat card configs

export interface DepartmentStatCardConfig {
  key: keyof DepartmentStats;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  borderColor: string;
  textColor: string;
  iconBg: string;
  badgeLabel: string;
}

export const DEPARTMENT_STAT_CARDS: DepartmentStatCardConfig[] = [
  {
    key: "totalDepartments",
    label: "Total Departments",
    subtitle: "All departments",
    icon: Building2,
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200/60",
    textColor: "text-blue-600",
    iconBg: "bg-blue-100",
    badgeLabel: "Total",
  },
  {
    key: "activeDepartments",
    label: "Active Departments",
    subtitle: "Currently active",
    icon: Sparkles,
    gradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200/60",
    textColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    badgeLabel: "Active",
  },
  {
    key: "totalEmployees",
    label: "Total Employees",
    subtitle: "Across all depts",
    icon: Users,
    gradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200/60",
    textColor: "text-violet-600",
    iconBg: "bg-violet-100",
    badgeLabel: "Employees",
  },
  {
    key: "avgEmployeesPerDept",
    label: "Avg Employees/Dept",
    subtitle: "Average team size",
    icon: TrendingUp,
    gradient: "from-amber-50 to-yellow-50",
    borderColor: "border-amber-200/60",
    textColor: "text-amber-600",
    iconBg: "bg-amber-100",
    badgeLabel: "Avg Size",
  },
];

// Status badge configs

export interface DepartmentStatusBadgeConfig {
  bg: string;
  text: string;
  border: string;
  darkBg: string;
  darkText: string;
  darkBorder: string;
  dot: string;
  label: string;
}

export const DEPARTMENT_STATUS_BADGE_MAP: Record<string, DepartmentStatusBadgeConfig> = {
  active: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    darkBg: "dark:bg-emerald-950/30",
    darkText: "dark:text-emerald-400",
    darkBorder: "dark:border-emerald-800",
    dot: "bg-emerald-500",
    label: "active",
  },
  inactive: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    darkBg: "dark:bg-slate-950/30",
    darkText: "dark:text-slate-400",
    darkBorder: "dark:border-slate-800",
    dot: "bg-slate-500",
    label: "inactive",
  },
};

// Seed data

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: "1",
    name: "Human Resources",
    description: "Managing employee relations and recruitment",
    head: "Sarah Johnson",
    employeeCount: 12,
    email: "hr@company.com",
    phone: "+1 234-567-8901",
    status: "active",
  },
  {
    id: "2",
    name: "Engineering",
    description: "Product development and technical innovation",
    head: "Michael Chen",
    employeeCount: 45,
    email: "engineering@company.com",
    phone: "+1 234-567-8902",
    status: "active",
  },
  {
    id: "3",
    name: "Sales & Marketing",
    description: "Revenue generation and brand promotion",
    head: "Emily Davis",
    employeeCount: 28,
    email: "sales@company.com",
    phone: "+1 234-567-8903",
    status: "active",
  },
  {
    id: "4",
    name: "Finance",
    description: "Financial planning and accounting",
    head: "Robert Wilson",
    employeeCount: 15,
    email: "finance@company.com",
    phone: "+1 234-567-8904",
    status: "active",
  },
];
