import {
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  Truck,
  Settings,
  BarChart3,
} from "lucide-react"
import type { ErpStats, ErpActivity, ErpMonthlyTrend, ErpModule } from "@/types/erp.types"

export const ERP_STATS: ErpStats = {
  totalInventory: 15678,
  lowStockItems: 23,
  purchaseOrders: 145,
  salesOrders: 289,
  totalRevenue: 892000,
  pendingInvoices: 34,
  totalEmployees: 124,
  activeProjects: 18,
  manufacturingOrders: 67,
  qualityIssues: 8,
  onTimeDelivery: 94.2,
  customerSatisfaction: 4.6,
  productionEfficiency: 87.5,
  profitMargin: 17.1,
  monthlyGrowth: 12.3,
  monthlyRevenue: 320000,
  inventoryTurnover: 8.2,
  qualityScore: 96.5,
}

export const RECENT_ACTIVITIES: ErpActivity[] = [
  { id: 1, type: "inventory", description: "Low stock alert for Laptop Model X", time: "10 minutes ago", priority: "high", user: "System", details: "Stock below minimum threshold" },
  { id: 2, type: "finance", description: "Invoice #1234 paid - $5,430", time: "25 minutes ago", priority: "normal", user: "John Smith", details: "Customer payment received" },
  { id: 3, type: "manufacturing", description: "Production batch #456 completed", time: "1 hour ago", priority: "normal", user: "Emma Davis", details: "Quality check passed" },
  { id: 4, type: "sales", description: "New purchase order received - 50 units", time: "2 hours ago", priority: "high", user: "Chris Wilson", details: "Priority customer order" },
  { id: 5, type: "hr", description: "Employee onboarding completed", time: "3 hours ago", priority: "normal", user: "Sarah Brown", details: "New hire orientation complete" },
  { id: 6, type: "procurement", description: "Vendor payment processed", time: "4 hours ago", priority: "normal", user: "Michael Chen", details: "Monthly vendor settlement" },
]

export const MONTHLY_TRENDS: ErpMonthlyTrend[] = [
  { month: "Jan", revenue: 750000, orders: 245, efficiency: 85.2 },
  { month: "Feb", revenue: 820000, orders: 267, efficiency: 87.8 },
  { month: "Mar", revenue: 890000, orders: 289, efficiency: 89.1 },
  { month: "Apr", revenue: 845000, orders: 278, efficiency: 86.5 },
  { month: "May", revenue: 920000, orders: 312, efficiency: 90.2 },
  { month: "Jun", revenue: 892000, orders: 298, efficiency: 87.5 },
]

export const ERP_MODULES: ErpModule[] = [
  { id: "inventory", label: "Inventory Management", icon: Package, color: "blue", description: "Track stock levels and manage warehouse operations" },
  { id: "finance", label: "Finance & Accounting", icon: DollarSign, color: "green", description: "Manage financial transactions and accounting" },
  { id: "hr", label: "Human Resources", icon: Users, color: "purple", description: "Handle employee management and payroll" },
  { id: "sales", label: "Sales & Distribution", icon: ShoppingCart, color: "orange", description: "Manage sales orders and customer relationships" },
  { id: "procurement", label: "Procurement", icon: Truck, color: "indigo", description: "Handle purchase orders and vendor management" },
  { id: "manufacturing", label: "Manufacturing", icon: Settings, color: "red", description: "Monitor production and quality control" },
  { id: "reporting", label: "Reporting & Analytics", icon: BarChart3, color: "teal", description: "Generate comprehensive business reports" },
]

export const MODULE_COLOR_MAP: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  indigo: "from-indigo-500 to-indigo-600",
  red: "from-red-500 to-red-600",
  teal: "from-teal-500 to-teal-600",
}

export const MODULE_BADGE_MAP: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  indigo: "bg-indigo-100 text-indigo-700",
  red: "bg-red-100 text-red-700",
  teal: "bg-teal-100 text-teal-700",
}

export const KEY_METRIC_CARDS = [
  {
    label: "Total Inventory",
    statKey: "totalInventory" as keyof ErpStats,
    gradient: "from-blue-50 via-blue-100 to-indigo-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    valueColor: "text-blue-900",
    icon: "Package",
    iconBg: "bg-blue-100",
    trendPrevious: 8500,
    trendLabel: "+5.2%",
    subLabel: "Low Stock Items",
    subStatKey: "lowStockItems" as keyof ErpStats,
    subBorder: "border-blue-200",
  },
  {
    label: "Monthly Revenue",
    statKey: "totalRevenue" as keyof ErpStats,
    gradient: "from-green-50 via-green-100 to-emerald-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    valueColor: "text-green-900",
    icon: "DollarSign",
    iconBg: "bg-green-100",
    trendPrevious: 285000,
    trendLabel: "+12.3%",
    subLabel: "Profit Margin",
    subStatKey: "profitMargin" as keyof ErpStats,
    subBorder: "border-green-200",
    formatValue: "currency" as const,
    subSuffix: "%",
  },
  {
    label: "Active Employees",
    statKey: "totalEmployees" as keyof ErpStats,
    gradient: "from-purple-50 via-purple-100 to-violet-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    valueColor: "text-purple-900",
    icon: "Users",
    iconBg: "bg-purple-100",
    trendPrevious: 142,
    trendLabel: "+8.5%",
    subLabel: "New Hires",
    subStatKey: null,
    subBorder: "border-purple-200",
    subFixedValue: "0",
  },
  {
    label: "Efficiency Rate",
    statKey: "productionEfficiency" as keyof ErpStats,
    gradient: "from-orange-50 via-orange-100 to-amber-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    valueColor: "text-orange-900",
    icon: "TrendingUp",
    iconBg: "bg-orange-100",
    trendPrevious: 78,
    trendLabel: "+3.2%",
    subLabel: "Production Rate",
    subStatKey: "manufacturingOrders" as keyof ErpStats,
    subBorder: "border-orange-200",
    subSuffix: "/day",
    valueSuffix: "%",
  },
]

export const PERFORMANCE_METRICS = [
  { label: "Total Revenue", icon: "TrendingUp", iconBg: "bg-green-100", iconColor: "text-green-600", trendPrevious: 285000, trendLabel: "+12.3%", type: "totalRevenue" as const },
  { label: "Efficiency Rate", icon: "Target", iconBg: "bg-purple-100", iconColor: "text-purple-600", trendPrevious: 85.0, trendLabel: "Above target", type: "efficiency" as const },
  { label: "Inventory Turnover", icon: "Package", iconBg: "bg-blue-100", iconColor: "text-blue-600", trendPrevious: 8.2, trendLabel: "Optimal", type: "inventoryTurnover" as const },
  { label: "On-Time Delivery", icon: "Clock", iconBg: "bg-orange-100", iconColor: "text-orange-600", trendPrevious: 92.5, trendLabel: "Excellent", type: "onTimeDelivery" as const },
]

export const PERFORMANCE_INSIGHTS = [
  { label: "Production Efficiency", statKey: "productionEfficiency" as keyof ErpStats, color: "text-green-600", suffix: "%" },
  { label: "Customer Satisfaction", statKey: "customerSatisfaction" as keyof ErpStats, color: "text-blue-600", suffix: "/5.0" },
  { label: "Quality Score", statKey: "qualityScore" as keyof ErpStats, color: "text-orange-600", suffix: "%" },
  { label: "Delivery Performance", statKey: "onTimeDelivery" as keyof ErpStats, color: "text-purple-600", suffix: "%" },
]
