import {
  Briefcase,
  Sparkles,
  Users,
  Shield,
  LucideIcon,
} from "lucide-react";
import type { Designation, DesignationStats } from "@/types/designation.types";

// Stat card configs

export interface DesignationStatCardConfig {
  key: keyof DesignationStats;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  borderColor: string;
  textColor: string;
  iconBg: string;
  badgeLabel: string;
}

export const DESIGNATION_STAT_CARDS: DesignationStatCardConfig[] = [
  {
    key: "totalDesignations",
    label: "Total Designations",
    subtitle: "All designations",
    icon: Briefcase,
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200/60",
    textColor: "text-blue-600",
    iconBg: "bg-blue-100",
    badgeLabel: "Total",
  },
  {
    key: "activeDesignations",
    label: "Active Designations",
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
    subtitle: "Across all roles",
    icon: Users,
    gradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200/60",
    textColor: "text-violet-600",
    iconBg: "bg-violet-100",
    badgeLabel: "Employees",
  },
  {
    key: "avgEmployeesPerRole",
    label: "Avg Employees/Role",
    subtitle: "Average team size",
    icon: Shield,
    gradient: "from-amber-50 to-yellow-50",
    borderColor: "border-amber-200/60",
    textColor: "text-amber-600",
    iconBg: "bg-amber-100",
    badgeLabel: "Avg Size",
  },
];

// Filter options

export const DESIGNATION_DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Product",
  "Design",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
] as const;

export const DESIGNATION_LEVELS = [
  "All Levels",
  "Junior",
  "Mid",
  "Senior",
  "Lead",
  "Principal",
] as const;

// Status badge configs

export interface DesignationStatusBadgeConfig {
  bg: string;
  text: string;
  border: string;
  darkBg: string;
  darkText: string;
  darkBorder: string;
  dot: string;
  label: string;
}

export const DESIGNATION_STATUS_BADGE_MAP: Record<string, DesignationStatusBadgeConfig> = {
  active: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    darkBg: "dark:bg-emerald-950/30",
    darkText: "dark:text-emerald-400",
    darkBorder: "dark:border-emerald-800",
    dot: "bg-emerald-500",
    label: "Active",
  },
  inactive: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    darkBg: "dark:bg-slate-950/30",
    darkText: "dark:text-slate-400",
    darkBorder: "dark:border-slate-800",
    dot: "bg-slate-500",
    label: "Inactive",
  },
};

// Seed data

export const INITIAL_DESIGNATIONS: Designation[] = [
  {
    id: 1,
    title: "Senior Developer",
    department: "Engineering",
    level: "Senior",
    employeeCount: 12,
    description: "Experienced software developer with leadership responsibilities",
    skills: ["React", "Node.js", "TypeScript", "Leadership"],
    minSalary: 80000,
    maxSalary: 120000,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    level: "Senior",
    employeeCount: 5,
    description: "Manages product roadmap and cross-functional teams",
    skills: ["Strategy", "Analytics", "Communication", "Agile"],
    minSalary: 90000,
    maxSalary: 140000,
    status: "active",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    level: "Mid",
    employeeCount: 8,
    description: "Creates user-centered design solutions",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    minSalary: 65000,
    maxSalary: 95000,
    status: "active",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    level: "Mid",
    employeeCount: 6,
    description: "Manages infrastructure and deployment pipelines",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    minSalary: 75000,
    maxSalary: 110000,
    status: "active",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    title: "HR Manager",
    department: "Human Resources",
    level: "Senior",
    employeeCount: 3,
    description: "Manages HR operations and employee relations",
    skills: ["Recruitment", "Employee Relations", "Policy", "Analytics"],
    minSalary: 70000,
    maxSalary: 100000,
    status: "active",
    createdAt: "2024-02-15",
  },
  {
    id: 6,
    title: "Backend Developer",
    department: "Engineering",
    level: "Mid",
    employeeCount: 10,
    description: "Develops server-side applications and APIs",
    skills: ["Python", "Django", "PostgreSQL", "REST APIs"],
    minSalary: 70000,
    maxSalary: 100000,
    status: "active",
    createdAt: "2024-03-01",
  },
  {
    id: 7,
    title: "Frontend Developer",
    department: "Engineering",
    level: "Junior",
    employeeCount: 15,
    description: "Develops user interfaces and web applications",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    minSalary: 50000,
    maxSalary: 75000,
    status: "active",
    createdAt: "2024-03-05",
  },
  {
    id: 8,
    title: "QA Engineer",
    department: "Engineering",
    level: "Mid",
    employeeCount: 7,
    description: "Ensures software quality through testing",
    skills: ["Testing", "Automation", "Selenium", "Jest"],
    minSalary: 60000,
    maxSalary: 85000,
    status: "active",
    createdAt: "2024-03-10",
  },
];
