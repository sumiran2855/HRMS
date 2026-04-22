import { PayrollEmployee } from "@/types/payroll.types"

export const PAYROLL_DATA: PayrollEmployee[] = [
  { id: "MD-0001", name: "Ethan Mitchell",   designation: "Web Designer",        email: "ethan.mitchell@company.com",   joiningDate: "2022-03-15", salary: 75000,  status: "paid",    paymentDate: "2024-03-31" },
  { id: "EMP001",  name: "Sarah Johnson",    designation: "Senior Developer",     email: "sarah.johnson@company.com",    joiningDate: "2021-07-20", salary: 95000,  status: "paid",    paymentDate: "2024-03-31" },
  { id: "EMP002",  name: "Michael Chen",     designation: "Product Manager",      email: "michael.chen@company.com",     joiningDate: "2020-11-10", salary: 110000, status: "pending", paymentDate: null },
  { id: "EMP003",  name: "Emily Rodriguez",  designation: "UX Designer",          email: "emily.rodriguez@company.com",  joiningDate: "2022-01-05", salary: 85000,  status: "paid",    paymentDate: "2024-03-30" },
  { id: "EMP004",  name: "David Kim",        designation: "DevOps Engineer",      email: "david.kim@company.com",        joiningDate: "2021-09-12", salary: 105000, status: "pending", paymentDate: null },
  { id: "EMP005",  name: "Jessica Taylor",   designation: "HR Manager",           email: "jessica.taylor@company.com",   joiningDate: "2020-05-18", salary: 90000,  status: "paid",    paymentDate: "2024-03-29" },
  { id: "EMP006",  name: "Robert Anderson",  designation: "Backend Developer",    email: "robert.anderson@company.com",  joiningDate: "2022-08-22", salary: 92000,  status: "pending", paymentDate: null },
  { id: "EMP007",  name: "Lisa Martinez",    designation: "Frontend Developer",   email: "lisa.martinez@company.com",    joiningDate: "2021-12-01", salary: 88000,  status: "paid",    paymentDate: "2024-03-28" },
  { id: "EMP008",  name: "James Wilson",     designation: "QA Engineer",          email: "james.wilson@company.com",     joiningDate: "2023-02-14", salary: 70000,  status: "pending", paymentDate: null },
  { id: "EMP009",  name: "Emma Davis",       designation: "Senior Developer",     email: "emma.davis@company.com",       joiningDate: "2020-08-30", salary: 100000, status: "paid",    paymentDate: "2024-03-27" },
]

export const DESIGNATIONS = [
  "All Designations",
  "Web Designer",
  "Senior Developer",
  "Product Manager",
  "UX Designer",
  "DevOps Engineer",
  "HR Manager",
  "Backend Developer",
  "Frontend Developer",
  "QA Engineer",
]

export const STATUS_OPTIONS = ["All Status", "paid", "pending"]
