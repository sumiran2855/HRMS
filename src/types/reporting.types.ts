export interface ReportMetrics {
  totalRevenue: number
  totalExpenses: number
  grossProfit: number
  netProfit: number
  profitMargin: number
  totalOrders: number
  totalInventory: number
  activeEmployees: number
  productionEfficiency: number
  qualityScore: number
  customerSatisfaction: number
  onTimeDelivery: number
}

export interface RecentReport {
  id: number
  name: string
  type: string
  date: string
  generatedBy: string
  status: string
  description: string
}

export interface UseReportingReturn {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  selectedPeriod: string
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>
  formatCurrency: (amount: number) => string
  getReportStatusColor: (status: string) => string
}
