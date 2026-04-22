import { ReportMetrics, RecentReport } from "@/types/reporting.types"

export const REPORT_METRICS: ReportMetrics = {
  totalRevenue: 2450000,
  totalExpenses: 1890000,
  grossProfit: 560000,
  netProfit: 420000,
  profitMargin: 17.1,
  totalOrders: 1247,
  totalInventory: 15678,
  activeEmployees: 124,
  productionEfficiency: 87.5,
  qualityScore: 4.6,
  customerSatisfaction: 4.3,
  onTimeDelivery: 94.2,
}

export const RECENT_REPORTS: RecentReport[] = [
  {
    id: 1,
    name: "Monthly Financial Report",
    type: "financial",
    date: "2024-03-15",
    generatedBy: "System",
    status: "completed",
    description: "Comprehensive monthly financial analysis including revenue, expenses, and profit margins",
  },
  {
    id: 2,
    name: "Inventory Analysis Report",
    type: "inventory",
    date: "2024-03-14",
    generatedBy: "Sarah Brown",
    status: "completed",
    description: "Detailed inventory valuation, stock levels, and turnover analysis",
  },
  {
    id: 3,
    name: "Sales Performance Report",
    type: "sales",
    date: "2024-03-13",
    generatedBy: "John Smith",
    status: "completed",
    description: "Sales team performance metrics, conversion rates, and revenue analysis",
  },
  {
    id: 4,
    name: "Manufacturing Efficiency Report",
    type: "manufacturing",
    date: "2024-03-12",
    generatedBy: "Emma Davis",
    status: "completed",
    description: "Production line efficiency, quality control metrics, and capacity utilization",
  },
]

export const REPORTING_TABS = [
  { key: "overview", label: "Overview" },
  { key: "reports", label: "Reports" },
  { key: "analytics", label: "Analytics" },
  { key: "dashboards", label: "Dashboards" },
]

export const PERIODS = ["daily", "weekly", "monthly", "quarterly", "yearly"]

export const REPORT_STATUS_COLOR_MAP: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  "in-progress": "bg-blue-100 text-blue-700",
  scheduled: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
}
