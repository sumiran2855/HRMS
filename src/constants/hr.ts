import { Employee, Department } from "@/types/hr.types"

export const EMPLOYEES_DATA: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 234-567-8901",
    department: "Engineering",
    position: "Senior Software Engineer",
    location: "New York Office",
    joinDate: "2022-03-15",
    status: "active",
    salary: 95000,
    manager: "Sarah Johnson",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    performance: 4.5,
  },
  {
    id: 2,
    name: "Emma Davis",
    email: "emma.davis@company.com",
    phone: "+1 234-567-8902",
    department: "Marketing",
    position: "Marketing Manager",
    location: "San Francisco Office",
    joinDate: "2021-07-20",
    status: "active",
    salary: 87000,
    manager: "Michael Chen",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    performance: 4.8,
  },
  {
    id: 3,
    name: "Chris Wilson",
    email: "chris.wilson@company.com",
    phone: "+1 234-567-8903",
    department: "Sales",
    position: "Sales Representative",
    location: "Remote",
    joinDate: "2023-01-10",
    status: "active",
    salary: 65000,
    manager: "David Brown",
    skills: ["Sales", "CRM", "Negotiation", "Communication"],
    performance: 4.2,
  },
  {
    id: 4,
    name: "Sarah Brown",
    email: "sarah.brown@company.com",
    phone: "+1 234-567-8904",
    department: "Engineering",
    position: "Product Manager",
    location: "New York Office",
    joinDate: "2020-11-05",
    status: "active",
    salary: 110000,
    manager: "CTO Office",
    skills: ["Product Management", "Agile", "Leadership", "Strategy"],
    performance: 4.7,
  },
]

export const DEPARTMENTS_DATA: Department[] = [
  { name: "Engineering", employees: 45, avgSalary: 95000 },
  { name: "Marketing", employees: 12, avgSalary: 78000 },
  { name: "Sales", employees: 28, avgSalary: 72000 },
  { name: "HR", employees: 8, avgSalary: 65000 },
  { name: "Finance", employees: 15, avgSalary: 85000 },
]

export const DEPARTMENT_OPTIONS = [
  "All Departments",
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
]

export const STATUSES = ["All Status", "active", "on-leave", "terminated"]

export const STATUS_COLOR_MAP: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  "on-leave": "bg-yellow-100 text-yellow-700",
  terminated: "bg-red-100 text-red-700",
}

export const HR_TABS = [
  { key: "employees", label: "Employees" },
  { key: "departments", label: "Departments" },
  { key: "attendance", label: "Attendance" },
  { key: "payroll", label: "Payroll" },
]

export const TABLE_HEADERS = [
  { label: "Employee", align: "text-left" },
  { label: "Department", align: "text-left" },
  { label: "Position", align: "text-left" },
  { label: "Location", align: "text-left" },
  { label: "Join Date", align: "text-center" },
  { label: "Salary", align: "text-right" },
  { label: "Performance", align: "text-center" },
  { label: "Status", align: "text-center" },
  { label: "Actions", align: "text-center" },
]
