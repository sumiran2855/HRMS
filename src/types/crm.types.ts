export interface CrmStats {
  totalLeads: number
  activeDeals: number
  conversionRate: number
  revenueThisMonth: number
  newCustomers: number
  averageDealSize: number
  salesCycle: number
  customerSatisfaction: number
  pipelineValue: number
  monthlyGrowth: number
}

export interface CrmActivity {
  id: number
  type: "lead" | "deal" | "customer"
  description: string
  time: string
  priority: "high" | "normal"
  user: string
  details: string
}

export interface MonthlyPerformance {
  month: string
  leads: number
  deals: number
  revenue: number
  conversion: number
}

export interface TopDeal {
  id: number
  company: string
  value: number
  stage: string
  probability: number
  contact: string
  daysInPipeline: number
}

export interface CrmStatCardConfig {
  label: string
  statKey: keyof CrmStats
  subLabel: string
  subStatKey: keyof CrmStats
  subSuffix?: string
  previousValue: number
  trendText: string
  icon: string
  gradient: string
  borderColor: string
  iconBg: string
  iconColor: string
  textColor: string
}

export interface CrmTabConfig {
  id: string
  label: string
  icon: string
}

export interface SalesMetricConfig {
  label: string
  valueKey: string
  icon: string
  iconBg: string
  iconColor: string
  trendText: string
  previousValue: number
}

export interface PipelineFilters {
  search: string
  stage: string
  valueRange: string
  company: string
  contactPerson: string
  dateRange: string
  probabilityRange: string
  sortBy: string
}

export interface UseCrmDashboardReturn {
  activeTab: string
  setActiveTab: (tab: string) => void
  selectedPeriod: string
  setSelectedPeriod: (p: string) => void
  isAddLeadModalOpen: boolean
  setIsAddLeadModalOpen: (b: boolean) => void
  isAddDealModalOpen: boolean
  setIsAddDealModalOpen: (b: boolean) => void
  isAddCustomerModalOpen: boolean
  setIsAddCustomerModalOpen: (b: boolean) => void
  isContactCustomerModalOpen: boolean
  setIsContactCustomerModalOpen: (b: boolean) => void
  isAnalyticsModalOpen: boolean
  setIsAnalyticsModalOpen: (b: boolean) => void
  isPipelineFilterOpen: boolean
  setIsPipelineFilterOpen: (b: boolean) => void
  pipelineFilters: PipelineFilters
  setPipelineFilters: React.Dispatch<React.SetStateAction<PipelineFilters>>
  formatCurrency: (amount: number) => string
}
