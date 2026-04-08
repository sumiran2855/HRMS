"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import {
  Users,
  Handshake,
  TrendingUp,
  TrendingDown,
  Target,
  Plus,
  ArrowRight,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  Check,
  AlertCircle,
  Star,
  Phone,
  Mail,
  Calendar,
  Filter,
  Download,
  Eye,
  DollarSign,
  BarChart3,
  Zap,
  Building,
  UserCheck
} from "lucide-react"
import { AddLeadModal } from "@/components/dashboard/crm/AddLeadModal"
import { AddDealModal } from "@/components/dashboard/crm/AddDealModal"
import { CustomerModal } from "@/components/dashboard/crm/CustomerModal"
import { PipelineFilter } from "@/components/dashboard/crm/PipelineFilter"
import { PipelineView } from "@/components/dashboard/crm/PipelineView"
import { AnalyticsModal } from "@/components/dashboard/crm/AnalyticsModal"

// Enhanced mock CRM statistics
const crmStats = {
  totalLeads: 245,
  activeDeals: 68,
  conversionRate: 32.5,
  revenueThisMonth: 125000,
  newCustomers: 18,
  averageDealSize: 8500,
  salesCycle: 45,
  customerSatisfaction: 4.7,
  pipelineValue: 578000,
  monthlyGrowth: 18.2
}

// Enhanced recent activities with more details
const recentActivities = [
  { id: 1, type: "lead", description: "New lead from website contact form", time: "2 minutes ago", priority: "high", user: "System", details: "High-value enterprise lead from pricing page" },
  { id: 2, type: "deal", description: "Deal worth $15,000 moved to negotiation stage", time: "15 minutes ago", priority: "normal", user: "John Smith", details: "Tech Corp enterprise deal - 85% probability" },
  { id: 3, type: "lead", description: "Lead converted to customer", time: "1 hour ago", priority: "high", user: "Sarah Johnson", details: "Startup Inc - Premium plan subscription" },
  { id: 4, type: "deal", description: "Deal closed successfully", time: "2 hours ago", priority: "normal", user: "Mike Wilson", details: "Global Solutions - $25,000 annual contract" },
  { id: 5, type: "lead", description: "Follow-up scheduled with high-priority lead", time: "3 hours ago", priority: "normal", user: "Emma Davis", details: "Scheduled demo for tomorrow 2 PM EST" },
  { id: 6, type: "customer", description: "Customer satisfaction survey completed", time: "4 hours ago", priority: "normal", user: "System", details: "5-star rating from Enterprise Client" },
  { id: 7, type: "deal", description: "New deal proposal sent to client", time: "5 hours ago", priority: "high", user: "Alex Turner", details: "Innovation Labs - $42,000 proposal sent" },
  { id: 8, type: "lead", description: "Lead qualification completed", time: "6 hours ago", priority: "normal", user: "Rachel Green", details: "Digital Dynamics - Ready for demo stage" },
  { id: 9, type: "customer", description: "Renewal contract signed", time: "8 hours ago", priority: "high", user: "Tom Harris", details: "Future Systems - $31,000 annual renewal" },
  { id: 10, type: "deal", description: "Deal moved to closing stage", time: "12 hours ago", priority: "normal", user: "Jennifer Lee", details: "Cloud Technologies - Final review pending" }
]

// Sales performance data for the last 6 months
const monthlyPerformance = [
  { month: "Jan", leads: 180, deals: 45, revenue: 95000, conversion: 25.0 },
  { month: "Feb", leads: 195, deals: 52, revenue: 108000, conversion: 26.7 },
  { month: "Mar", leads: 210, deals: 58, revenue: 115000, conversion: 27.6 },
  { month: "Apr", leads: 225, deals: 62, revenue: 122000, conversion: 27.6 },
  { month: "May", leads: 238, deals: 65, revenue: 128000, conversion: 27.3 },
  { month: "Jun", leads: 245, deals: 68, revenue: 125000, conversion: 27.8 }
]

// Top performing deals
const topDeals = [
  { id: 1, company: "Tech Corp", value: 45000, stage: "Negotiation", probability: 85, contact: "John Anderson", daysInPipeline: 12 },
  { id: 2, company: "Global Solutions", value: 25000, stage: "Proposal", probability: 70, contact: "Sarah Chen", daysInPipeline: 8 },
  { id: 3, company: "Startup Inc", value: 18000, stage: "Discovery", probability: 60, contact: "Mike Johnson", daysInPipeline: 5 },
  { id: 4, company: "Enterprise Ltd", value: 35000, stage: "Qualification", probability: 75, contact: "Emma Wilson", daysInPipeline: 15 },
  { id: 5, company: "Innovation Labs", value: 42000, stage: "Negotiation", probability: 80, contact: "David Brown", daysInPipeline: 10 },
  { id: 6, company: "Digital Dynamics", value: 28000, stage: "Proposal", probability: 65, contact: "Lisa Wang", daysInPipeline: 7 },
  { id: 7, company: "Future Systems", value: 31000, stage: "Qualification", probability: 70, contact: "Mark Davis", daysInPipeline: 12 },
  { id: 8, company: "Cloud Technologies", value: 38000, stage: "Discovery", probability: 55, contact: "Anna Martinez", daysInPipeline: 4 }
]

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false)
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false)
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false)
  const [isContactCustomerModalOpen, setIsContactCustomerModalOpen] = useState(false)
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false)
  const [isPipelineFilterOpen, setIsPipelineFilterOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [pipelineFilters, setPipelineFilters] = useState({
    search: "",
    stage: "All",
    valueRange: "All",
    company: "",
    contactPerson: "",
    dateRange: "All",
    probabilityRange: "All",
    sortBy: "Most Recent"
  })

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: Target },
    { id: "pipeline", label: "Pipeline", icon: BarChart3 },
    { id: "customers", label: "Customers", icon: Users }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getTrendIcon = (value: number, previous: number) => {
    if (value > previous) {
      return <TrendingUp className="w-4 h-4 text-green-600" />
    } else if (value < previous) {
      return <TrendingDown className="w-4 h-4 text-red-600" />
    } else {
      return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead': return <Users className="w-4 h-4 text-blue-600" />
      case 'deal': return <Handshake className="w-4 h-4 text-green-600" />
      case 'customer': return <Star className="w-4 h-4 text-yellow-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Discovery': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Qualification': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'Proposal': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Negotiation': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">CRM Dashboard</h1>
          <p className="text-slate-600 text-lg">Manage your leads, deals, and customer relationships</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Lead
          </Button>
          <Button
            onClick={() => setIsAddDealModalOpen(true)}
            variant="outline"
            className="cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-blue-600 truncate">Total Leads</p>
                  <p className="text-xl sm:text-3xl font-bold text-blue-900 truncate">{crmStats.totalLeads}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {getTrendIcon(crmStats.totalLeads, 210)}
                <span className="text-xs text-green-600 hidden sm:inline">+16.7%</span>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-blue-600">New Customers</span>
                <span className="text-sm sm:text-lg font-bold text-green-600">{crmStats.newCustomers}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Handshake className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-green-600 truncate">Active Deals</p>
                  <p className="text-xl sm:text-3xl font-bold text-green-900 truncate">{crmStats.activeDeals}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {getTrendIcon(crmStats.activeDeals, 60)}
                <span className="text-xs text-green-600 hidden sm:inline">+13.3%</span>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 border-t border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-green-600 truncate">Pipeline Value</span>
                <span className="text-sm sm:text-lg font-bold text-green-600 truncate">{formatCurrency(crmStats.pipelineValue)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-purple-600 truncate">Conversion Rate</p>
                  <p className="text-xl sm:text-3xl font-bold text-purple-900 truncate">{crmStats.conversionRate}%</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {getTrendIcon(crmStats.conversionRate, 30.2)}
                <span className="text-xs text-green-600 hidden sm:inline">+2.3%</span>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 border-t border-purple-200">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-purple-600 truncate">Avg Deal Size</span>
                <span className="text-sm sm:text-lg font-bold text-purple-600 truncate">{formatCurrency(crmStats.averageDealSize)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 border-orange-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-orange-600 truncate">Monthly Revenue</p>
                  <p className="text-xl sm:text-3xl font-bold text-orange-900 truncate">{formatCurrency(crmStats.revenueThisMonth)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {getTrendIcon(crmStats.revenueThisMonth, 105000)}
                <span className="text-xs text-green-600 hidden sm:inline">+{crmStats.monthlyGrowth}%</span>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 border-t border-orange-200">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-orange-600 truncate">Sales Cycle</span>
                <span className="text-sm sm:text-lg font-bold text-orange-600">{crmStats.salesCycle} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Performance Section */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Sales Performance</h2>
                <p className="text-xs text-slate-500">Track your revenue and conversion metrics</p>
              </div>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 appearance-none"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Total Revenue</p>
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(monthlyPerformance.reduce((sum, p) => sum + p.revenue, 0))}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(crmStats.revenueThisMonth, 105000)}
                    <span className="text-xs text-green-600">+{crmStats.monthlyGrowth}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Conversion Rate</p>
                  <p className="text-lg font-bold text-slate-900">{crmStats.conversionRate}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(crmStats.conversionRate, 30.2)}
                    <span className="text-xs text-green-600">Above target</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Avg Deal Size</p>
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(crmStats.averageDealSize)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(crmStats.averageDealSize, 8000)}
                    <span className="text-xs text-green-600">Growing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Sales Cycle</p>
                  <p className="text-lg font-bold text-slate-900">{crmStats.salesCycle} days</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(40, crmStats.salesCycle)}
                    <span className="text-xs text-orange-600">Optimizing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend Chart */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-900 mb-4">Revenue Trend</h3>
              <div className="space-y-3">
                {monthlyPerformance.slice(-6).map((performance) => (
                  <div key={performance.month} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 w-16">{performance.month}</span>
                    <div className="flex-1 mx-3">
                      <div className="bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(performance.revenue / 128000) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-slate-900 text-right w-20">
                      {formatCurrency(performance.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-900 mb-4">Performance Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Revenue Growth</span>
                  <span className="text-sm font-medium text-green-600">+{crmStats.monthlyGrowth}%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Customer Satisfaction</span>
                  <span className="text-sm font-medium text-blue-600">{crmStats.customerSatisfaction}/5.0</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Sales Cycle</span>
                  <span className="text-sm font-medium text-orange-600">{crmStats.salesCycle} days</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Conversion Rate</span>
                  <span className="text-sm font-medium text-purple-600">{crmStats.conversionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Deals */}
        <Card className="border-2 border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Handshake className="w-5 h-5 text-green-600" />
                Top Deals
              </CardTitle>
              <Button variant="outline" className="cursor-pointer">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
              <div className="space-y-4 pr-2">
                {topDeals.map((deal) => (
                  <div key={deal.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-200 hover:border-slate-300">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{deal.company}</p>
                          <p className="text-xs text-slate-500">Contact: {deal.contact}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{formatCurrency(deal.value)}</p>
                          <p className="text-xs text-slate-500">{deal.daysInPipeline} days in pipeline</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStageColor(deal.stage)}`}>
                          {deal.stage}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-slate-600">{deal.probability}% probability</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recent Activities */}
        <Card className="border-2 border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Recent Activities
              </CardTitle>
              <Button variant="outline" className="cursor-pointer">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
              <div className="space-y-4 pr-2">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-200 hover:border-slate-300">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{activity.description}</p>
                          <p className="text-xs text-slate-500">by {activity.user}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {activity.priority === 'high' && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border-red-200">
                              High Priority
                            </span>
                          )}
                          <span className="text-xs text-slate-500">{activity.time}</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 bg-slate-100 rounded-lg p-2">
                        {activity.details}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="border-b border-slate-200 bg-white rounded-t-xl overflow-hidden">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {isActive && (
                  <span className="ml-2 w-1 h-1 rounded-full bg-blue-500" />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Enhanced Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "overview" && (
          <Card className="border-2 border-slate-200">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">CRM Overview</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">Get a comprehensive view of your sales pipeline, customer relationships, and performance metrics.</p>
              <div className="flex gap-4 justify-center">
                <Link href="/leads">
                  <Button variant="outline" className="cursor-pointer hover:bg-blue-50">
                    <Eye className="w-4 h-4 mr-2" />
                    View Leads
                  </Button>
                </Link>
                <Link href="/deals">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer shadow-lg">
                    <Handshake className="w-4 h-4 mr-2" />
                    View Deals
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "analytics" && (
          <Card className="border-2 border-slate-200">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Analytics Dashboard</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">Detailed analytics and reporting for your CRM performance with advanced insights and trends.</p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button
                  onClick={() => setIsAnalyticsModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white cursor-pointer shadow-lg"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Full Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "pipeline" && (
          <PipelineView
            deals={topDeals}
            onFilterClick={() => setIsPipelineFilterOpen(true)}
            onAddDeal={() => setIsAddDealModalOpen(true)}
            filters={pipelineFilters}
          />
        )}

        {activeTab === "customers" && (
          <Card className="border-2 border-slate-200">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Customer Management</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">Manage customer relationships, track satisfaction, and build long-term partnerships with your clients.</p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={() => setIsContactCustomerModalOpen(true)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Customers
                </Button>
                <Button 
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white cursor-pointer shadow-lg"
                  onClick={() => setIsAddCustomerModalOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
      />
      <AddDealModal
        isOpen={isAddDealModalOpen}
        onClose={() => setIsAddDealModalOpen(false)}
      />
      <CustomerModal
        isOpen={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        mode="add"
      />
      <CustomerModal
        isOpen={isContactCustomerModalOpen}
        onClose={() => setIsContactCustomerModalOpen(false)}
        mode="contact"
      />
      <PipelineFilter
        isOpen={isPipelineFilterOpen}
        onClose={() => setIsPipelineFilterOpen(false)}
        onFilter={setPipelineFilters}
        currentFilters={pipelineFilters}
      />
      <AnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
      />
    </div>
  )
}
