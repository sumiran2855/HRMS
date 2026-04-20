import type {
  CrmStats,
  CrmActivity,
  MonthlyPerformance,
  TopDeal,
  CrmStatCardConfig,
  CrmTabConfig,
  SalesMetricConfig,
  PipelineFilters,
} from "@/types/crm.types"

export const CRM_STATS: CrmStats = {
  totalLeads: 245,
  activeDeals: 68,
  conversionRate: 32.5,
  revenueThisMonth: 125000,
  newCustomers: 18,
  averageDealSize: 8500,
  salesCycle: 45,
  customerSatisfaction: 4.7,
  pipelineValue: 578000,
  monthlyGrowth: 18.2,
}

export const CRM_STAT_CARDS: CrmStatCardConfig[] = [
  {
    label: "Total Leads",
    statKey: "totalLeads",
    subLabel: "New Customers",
    subStatKey: "newCustomers",
    previousValue: 210,
    trendText: "+16.7%",
    icon: "Users",
    gradient: "from-blue-50 via-blue-100 to-indigo-50",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    textColor: "text-blue-600",
  },
  {
    label: "Active Deals",
    statKey: "activeDeals",
    subLabel: "Pipeline Value",
    subStatKey: "pipelineValue",
    subSuffix: "currency",
    previousValue: 60,
    trendText: "+13.3%",
    icon: "Handshake",
    gradient: "from-green-50 via-green-100 to-emerald-50",
    borderColor: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    textColor: "text-green-600",
  },
  {
    label: "Conversion Rate",
    statKey: "conversionRate",
    subLabel: "Avg Deal Size",
    subStatKey: "averageDealSize",
    subSuffix: "currency",
    previousValue: 30.2,
    trendText: "+2.3%",
    icon: "Target",
    gradient: "from-purple-50 via-purple-100 to-violet-50",
    borderColor: "border-purple-200",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    textColor: "text-purple-600",
  },
  {
    label: "Monthly Revenue",
    statKey: "revenueThisMonth",
    subLabel: "Sales Cycle",
    subStatKey: "salesCycle",
    subSuffix: "days",
    previousValue: 105000,
    trendText: "+18.2%",
    icon: "DollarSign",
    gradient: "from-orange-50 via-orange-100 to-amber-50",
    borderColor: "border-orange-200",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    textColor: "text-orange-600",
  },
]

export const CRM_TABS: CrmTabConfig[] = [
  { id: "overview", label: "Overview", icon: "TrendingUp" },
  { id: "analytics", label: "Analytics", icon: "Target" },
  { id: "pipeline", label: "Pipeline", icon: "BarChart3" },
  { id: "customers", label: "Customers", icon: "Users" },
]

export const SALES_METRICS: SalesMetricConfig[] = [
  {
    label: "Total Revenue",
    valueKey: "totalRevenue",
    icon: "TrendingUp",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    trendText: "+18.2%",
    previousValue: 105000,
  },
  {
    label: "Conversion Rate",
    valueKey: "conversionRate",
    icon: "Target",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    trendText: "Above target",
    previousValue: 30.2,
  },
  {
    label: "Avg Deal Size",
    valueKey: "averageDealSize",
    icon: "Building",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trendText: "Growing",
    previousValue: 8000,
  },
  {
    label: "Sales Cycle",
    valueKey: "salesCycle",
    icon: "Clock",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    trendText: "Optimizing",
    previousValue: 45,
  },
]

export const STAGE_COLORS: Record<string, string> = {
  Discovery: "bg-blue-100 text-blue-700 border-blue-200",
  Qualification: "bg-purple-100 text-purple-700 border-purple-200",
  Proposal: "bg-orange-100 text-orange-700 border-orange-200",
  Negotiation: "bg-green-100 text-green-700 border-green-200",
}

export const RECENT_ACTIVITIES: CrmActivity[] = [
  { id: 1, type: "lead", description: "New lead from website contact form", time: "2 minutes ago", priority: "high", user: "System", details: "High-value enterprise lead from pricing page" },
  { id: 2, type: "deal", description: "Deal worth $15,000 moved to negotiation stage", time: "15 minutes ago", priority: "normal", user: "John Smith", details: "Tech Corp enterprise deal - 85% probability" },
  { id: 3, type: "lead", description: "Lead converted to customer", time: "1 hour ago", priority: "high", user: "Sarah Johnson", details: "Startup Inc - Premium plan subscription" },
  { id: 4, type: "deal", description: "Deal closed successfully", time: "2 hours ago", priority: "normal", user: "Mike Wilson", details: "Global Solutions - $25,000 annual contract" },
  { id: 5, type: "lead", description: "Follow-up scheduled with high-priority lead", time: "3 hours ago", priority: "normal", user: "Emma Davis", details: "Scheduled demo for tomorrow 2 PM EST" },
  { id: 6, type: "customer", description: "Customer satisfaction survey completed", time: "4 hours ago", priority: "normal", user: "System", details: "5-star rating from Enterprise Client" },
  { id: 7, type: "deal", description: "New deal proposal sent to client", time: "5 hours ago", priority: "high", user: "Alex Turner", details: "Innovation Labs - $42,000 proposal sent" },
  { id: 8, type: "lead", description: "Lead qualification completed", time: "6 hours ago", priority: "normal", user: "Rachel Green", details: "Digital Dynamics - Ready for demo stage" },
  { id: 9, type: "customer", description: "Renewal contract signed", time: "8 hours ago", priority: "high", user: "Tom Harris", details: "Future Systems - $31,000 annual renewal" },
  { id: 10, type: "deal", description: "Deal moved to closing stage", time: "12 hours ago", priority: "normal", user: "Jennifer Lee", details: "Cloud Technologies - Final review pending" },
]

export const MONTHLY_PERFORMANCE: MonthlyPerformance[] = [
  { month: "Jan", leads: 180, deals: 45, revenue: 95000, conversion: 25.0 },
  { month: "Feb", leads: 195, deals: 52, revenue: 108000, conversion: 26.7 },
  { month: "Mar", leads: 210, deals: 58, revenue: 115000, conversion: 27.6 },
  { month: "Apr", leads: 225, deals: 62, revenue: 122000, conversion: 27.6 },
  { month: "May", leads: 238, deals: 65, revenue: 128000, conversion: 27.3 },
  { month: "Jun", leads: 245, deals: 68, revenue: 125000, conversion: 27.8 },
]

export const TOP_DEALS: TopDeal[] = [
  { id: 1, company: "Tech Corp", value: 45000, stage: "Negotiation", probability: 85, contact: "John Anderson", daysInPipeline: 12 },
  { id: 2, company: "Global Solutions", value: 25000, stage: "Proposal", probability: 70, contact: "Sarah Chen", daysInPipeline: 8 },
  { id: 3, company: "Startup Inc", value: 18000, stage: "Discovery", probability: 60, contact: "Mike Johnson", daysInPipeline: 5 },
  { id: 4, company: "Enterprise Ltd", value: 35000, stage: "Qualification", probability: 75, contact: "Emma Wilson", daysInPipeline: 15 },
  { id: 5, company: "Innovation Labs", value: 42000, stage: "Negotiation", probability: 80, contact: "David Brown", daysInPipeline: 10 },
  { id: 6, company: "Digital Dynamics", value: 28000, stage: "Proposal", probability: 65, contact: "Lisa Wang", daysInPipeline: 7 },
  { id: 7, company: "Future Systems", value: 31000, stage: "Qualification", probability: 70, contact: "Mark Davis", daysInPipeline: 12 },
  { id: 8, company: "Cloud Technologies", value: 38000, stage: "Discovery", probability: 55, contact: "Anna Martinez", daysInPipeline: 4 },
]

export const DEFAULT_PIPELINE_FILTERS: PipelineFilters = {
  search: "",
  stage: "All",
  valueRange: "All",
  company: "",
  contactPerson: "",
  dateRange: "All",
  probabilityRange: "All",
  sortBy: "Most Recent",
}
