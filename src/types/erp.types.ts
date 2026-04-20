import type { LucideIcon } from "lucide-react"

export interface ErpStats {
  totalInventory: number
  lowStockItems: number
  purchaseOrders: number
  salesOrders: number
  totalRevenue: number
  pendingInvoices: number
  totalEmployees: number
  activeProjects: number
  manufacturingOrders: number
  qualityIssues: number
  onTimeDelivery: number
  customerSatisfaction: number
  productionEfficiency: number
  profitMargin: number
  monthlyGrowth: number
  monthlyRevenue: number
  inventoryTurnover: number
  qualityScore: number
}

export interface ErpActivity {
  id: number
  type: string
  description: string
  time: string
  priority: string
  user: string
  details: string
}

export interface ErpMonthlyTrend {
  month: string
  revenue: number
  orders: number
  efficiency: number
}

export interface ErpModule {
  id: string
  label: string
  icon: LucideIcon
  color: string
  description: string
}

export interface ErpKeyMetricConfig {
  key: string
  label: string
  value: string | number
  gradient: string
  borderColor: string
  textColor: string
  valueColor: string
  icon: string
  iconBg: string
  trendPrevious: number
  trendLabel: string
  subLabel: string
  subKey: string
  subValue: string | number
}

export interface ErpPerformanceMetricConfig {
  label: string
  value: string
  icon: string
  iconBg: string
  trendPrevious: number
  trendLabel: string
}

export interface UseErpReturn {
  activeTab: string
  setActiveTab: (tab: string) => void
  selectedPeriod: string
  setSelectedPeriod: (period: string) => void
  stats: ErpStats
  modules: ErpModule[]
  activities: ErpActivity[]
  monthlyTrends: ErpMonthlyTrend[]
  formatCurrency: (amount: number) => string
}
