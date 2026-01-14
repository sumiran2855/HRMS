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
        href: "/dashboard/employee",
        icon: "user-circle",
      },
    ],
  },
  {
    id: "hrm",
    label: "HRM",
    href: "/dashboard/hrm",
    icon: "users",
    children: [
      {
        id: "employees",
        label: "Employees",
        href: "/dashboard/employees",
        icon: "user-group",
      },
      {
        id: "designations",
        label: "Designations",
        href: "/dashboard/designations",
        icon: "badge-check",
      },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    href: "/dashboard/crm",
    icon: "building",
  },
  {
    id: "apps",
    label: "Apps",
    href: "/dashboard/apps",
    icon: "grid",
  },
  {
    id: "payroll",
    label: "Payroll",
    href: "/dashboard/payroll",
    icon: "credit-card",
  },
  {
    id: "expense",
    label: "Expense",
    href: "/dashboard/expense",
    icon: "wallet",
  },
  {
    id: "company",
    label: "Company",
    href: "/dashboard/company",
    icon: "building",
  },
  {
    id: "clients",
    label: "Clients",
    href: "/dashboard/clients",
    icon: "users",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/dashboard/projects",
    icon: "folder",
  },
  {
    id: "activities",
    label: "Activities",
    href: "/dashboard/activities",
    icon: "activity",
  },
  {
    id: "training",
    label: "Training",
    href: "/dashboard/training",
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
      expandedItems: ["dashboard"],
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
