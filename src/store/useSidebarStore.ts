import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SidebarItem = {
  id: string
  label: string
  href: string
  icon: string
  children?: SidebarItem[]
  roles?: string[]
}

export const sidebarConfig: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboards",
    href: "/dashboard",
    icon: "dashboard",
    children: [
      {
        id: "hrm-dashboard",
        label: "HRM Dashboard",
        href: "/dashboard",
        icon: "chart-bar",
      },
      {
        id: "employee-dashboard",
        label: "Employee Dashboard",
        href: "/employee-dashboard",
        icon: "user-circle",
      },
    ],
  },
  {
    id: "hrm",
    label: "HRM",
    href: "/hrm",
    icon: "users",
    children: [
      {
        id: "employees",
        label: "Employees",
        href: "/employees",
        icon: "user-group",
      },

      {
        id: "admin-attendance",
        label: "Admin Attendance",
        href: "/admin-attendance",
        icon: "calendar-check",
      },
      {
        id: "my-attendance",
        label: "My Attendance",
        href: "/my-attendance",
        icon: "calendar",
      },
      {
        id: "biometric-attendance",
        label: "Biometric Attendance",
        href: "/biometric-attendance",
        icon: "fingerprint",
      },
      {
        id: "designations",
        label: "Designations",
        href: "/designations",
        icon: "briefcase",
      },
      {
        id: "departments",
        label: "Departments",
        href: "/departments",
        icon: "building",
      },
      {
        id: "holidays",
        label: "Holidays",
        href: "/holidays",
        icon: "gift",
      },
      {
        id: "leave-management",
        label: "Leave Management",
        href: "/leave-management",
        icon: "calendar-check",
      }
    ],
  },
  {
    id: "crm",
    label: "CRM",
    href: "/crm",
    icon: "handshake",
    children: [
      {
        id: "crm-dashboard",
        label: "CRM Dashboard",
        href: "/crm-dashboard",
        icon: "target",
      },
      {
        id: "leads",
        label: "Leads",
        href: "/leads",
        icon: "users",
      },
      {
        id: "deals",
        label: "Deals",
        href: "/deals",
        icon: "handshake",
      },
    ],
  },
  {
    id: "erp",
    label: "ERP",
    href: "/erp",
    icon: "package",
    children: [
      {
        id: "erp-dashboard",
        label: "ERP Dashboard",
        href: "/erp",
        icon: "chart-bar",
      },
      {
        id: "inventory",
        label: "Inventory Management",
        href: "/inventory",
        icon: "package",
      },
      {
        id: "finance",
        label: "Finance & Accounting",
        href: "/finance",
        icon: "dollar-sign",
      },
      {
        id: "hr",
        label: "Human Resources",
        href: "/hr",
        icon: "users",
      },
      {
        id: "sales",
        label: "Sales & Distribution",
        href: "/sales",
        icon: "shopping-cart",
      },
      {
        id: "procurement",
        label: "Procurement",
        href: "/procurement",
        icon: "truck",
      },
      {
        id: "manufacturing",
        label: "Manufacturing",
        href: "/manufacturing",
        icon: "settings",
      },
      {
        id: "reporting",
        label: "Reporting & Analytics",
        href: "/reporting",
        icon: "bar-chart",
      },
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    href: "/payroll",
    icon: "credit-card",
  },
  {
    id: "company",
    label: "Company",
    href: "/company",
    icon: "building",
  },
  {
    id: "clients",
    label: "Clients",
    href: "/client",
    icon: "users",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/project",
    icon: "folder",
  },
  {
    id: "activities",
    label: "Activities",
    href: "/activity",
    icon: "activity",
  },
  {
    id: "training",
    label: "Training",
    href: "/training",
    icon: "book",
  },
  {
    id: "resignation",
    label: "Resignation",
    href: "/dashboard/resignation",
    icon: "log-out",
  },
  {
    id: "promotion",
    label: "Promotion",
    href: "/dashboard/promotion",
    icon: "trending-up",
  },
  {
    id: "award",
    label: "Award",
    href: "/dashboard/award",
    icon: "award",
  },
  {
    id: "meeting",
    label: "Meeting",
    href: "/dashboard/meeting",
    icon: "calendar",
  },
  {
    id: "tickets",
    label: "Tickets",
    href: "/dashboard/tickets",
    icon: "ticket",
  },
  {
    id: "transfer",
    label: "Transfer",
    href: "/dashboard/transfer",
    icon: "shuffle",
  },
  {
    id: "termination",
    label: "Termination",
    href: "/dashboard/termination",
    icon: "x-circle",
  },
  {
    id: "document",
    label: "Document",
    href: "/dashboard/document",
    icon: "file-text",
  },
]

interface SidebarState {
  isOpen: boolean
  expandedItems: string[]
  toggleSidebar: () => void
  setOpen: (open: boolean) => void
  toggleExpanded: (id: string) => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      isOpen: true,
      expandedItems: [],
      toggleSidebar: () => set({ isOpen: !get().isOpen }),
      setOpen: (open: boolean) => set({ isOpen: open }),
      toggleExpanded: (id: string) => {
        const current = get().expandedItems
        if (current.includes(id)) {
          set({ expandedItems: current.filter((item) => item !== id) })
        } else {
          set({ expandedItems: [...current, id] })
        }
      },
    }),
    {
      name: "sidebar-storage",
    },
  ),
)
