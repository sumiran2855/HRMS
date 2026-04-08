"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download,
  FileText,
  DollarSign,
  Users,
  Package,
  Target,
  Calendar,
  Activity,
  PieChart,
  Truck,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Edit
} from "lucide-react"

// Mock reporting data
const reportMetrics = {
  totalRevenue: 2450000.00,
  totalExpenses: 1890000.00,
  grossProfit: 560000.00,
  netProfit: 420000.00,
  profitMargin: 17.1,
  totalOrders: 1247,
  totalInventory: 15678,
  activeEmployees: 124,
  productionEfficiency: 87.5,
  qualityScore: 4.6,
  customerSatisfaction: 4.3,
  onTimeDelivery: 94.2
}

const recentReports = [
  {
    id: 1,
    name: "Monthly Financial Report",
    type: "financial",
    date: "2024-03-15",
    generatedBy: "System",
    status: "completed",
    description: "Comprehensive monthly financial analysis including revenue, expenses, and profit margins"
  },
  {
    id: 2,
    name: "Inventory Analysis Report",
    type: "inventory",
    date: "2024-03-14",
    generatedBy: "Sarah Brown",
    status: "completed",
    description: "Detailed inventory valuation, stock levels, and turnover analysis"
  },
  {
    id: 3,
    name: "Sales Performance Report",
    type: "sales",
    date: "2024-03-13",
    generatedBy: "John Smith",
    status: "completed",
    description: "Sales team performance metrics, conversion rates, and revenue analysis"
  },
  {
    id: 4,
    name: "Manufacturing Efficiency Report",
    type: "manufacturing",
    date: "2024-03-12",
    generatedBy: "Emma Davis",
    status: "completed",
    description: "Production line efficiency, quality control metrics, and capacity utilization"
  }
]

export default function ReportingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const periods = ["daily", "weekly", "monthly", "quarterly", "yearly"]

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

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'financial': return <DollarSign className="w-5 h-5 text-green-600" />
      case 'inventory': return <Package className="w-5 h-5 text-blue-600" />
      case 'sales': return <Users className="w-5 h-5 text-orange-600" />
      case 'manufacturing': return <Settings className="w-5 h-5 text-red-600" />
      default: return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'scheduled': return 'bg-yellow-100 text-yellow-700'
      case 'failed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reporting & Analytics</h1>
          <p className="text-slate-500 mt-1">Generate comprehensive business reports and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 appearance-none"
            >
              {periods.map(period => (
                <option key={period} value={period}>
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export All Reports
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(reportMetrics.totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-2">
                  {getTrendIcon(reportMetrics.totalRevenue, 2200000)}
                  <span className="text-xs text-green-600">+11.4% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(reportMetrics.totalExpenses)}</p>
                <div className="flex items-center gap-1 mt-2">
                  {getTrendIcon(reportMetrics.totalExpenses, 1750000)}
                  <span className="text-xs text-red-600">+8.0% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Gross Profit</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(reportMetrics.grossProfit)}</p>
                <div className="flex items-center gap-1 mt-2">
                  {getTrendIcon(reportMetrics.grossProfit, 480000)}
                  <span className="text-xs text-blue-600">+16.7% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Net Profit</p>
                <p className="text-2xl font-bold text-purple-900">{formatCurrency(reportMetrics.netProfit)}</p>
                <div className="flex items-center gap-1 mt-2">
                  {getTrendIcon(reportMetrics.netProfit, 380000)}
                  <span className="text-xs text-purple-600">+10.5% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "overview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "reports"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "analytics"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("dashboards")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "dashboards"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Dashboards
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* KPI Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Profit Margin</p>
                    <p className="text-2xl font-bold text-orange-900">{reportMetrics.profitMargin}%</p>
                    <div className="flex items-center gap-1 mt-2">
                      {getTrendIcon(reportMetrics.profitMargin, 16.5)}
                      <span className="text-xs text-orange-600">+0.5% from last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-teal-600">Production Efficiency</p>
                    <p className="text-2xl font-bold text-teal-900">{reportMetrics.productionEfficiency}%</p>
                    <div className="flex items-center gap-1 mt-2">
                      {getTrendIcon(reportMetrics.productionEfficiency, 85.0)}
                      <span className="text-xs text-teal-600">+2.3% from last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-teal-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">Quality Score</p>
                    <p className="text-2xl font-bold text-indigo-900">{reportMetrics.qualityScore}/5.0</p>
                    <div className="flex items-center gap-1 mt-2">
                      {getTrendIcon(reportMetrics.qualityScore, 4.5)}
                      <span className="text-xs text-indigo-600">+0.1 from last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Customer Satisfaction</p>
                    <p className="text-2xl font-bold text-slate-900">{reportMetrics.customerSatisfaction}/5.0</p>
                    <div className="flex items-center gap-1 mt-2">
                      {getTrendIcon(reportMetrics.customerSatisfaction, 4.3)}
                      <span className="text-xs text-slate-600">+0.2 from last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-slate-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">On-Time Delivery</p>
                    <p className="text-2xl font-bold text-green-900">{reportMetrics.onTimeDelivery}%</p>
                    <div className="flex items-center gap-1 mt-2">
                      {getTrendIcon(reportMetrics.onTimeDelivery, 94.2)}
                      <span className="text-xs text-green-600">+1.8% from last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-lg font-semibold text-blue-900">{reportMetrics.totalInventory.toLocaleString()}</p>
                <p className="text-sm text-blue-600">Total Inventory Items</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-lg font-semibold text-purple-900">{reportMetrics.activeEmployees}</p>
                <p className="text-sm text-purple-600">Active Employees</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-lg font-semibold text-orange-900">{reportMetrics.totalOrders}</p>
                <p className="text-sm text-orange-600">Total Orders</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getReportTypeIcon(report.type)}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{report.name}</h3>
                          <p className="text-sm text-slate-500">{report.type.charAt(0).toUpperCase() + report.type.slice(1)}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getReportStatusColor(report.status)}`}>
                        {report.status}
                      </div>
                    </div>
                    <div className="text-sm text-slate-700">{report.description}</div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-700">{report.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">Generated by:</span>
                        <span className="text-sm text-slate-900">{report.generatedBy}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="cursor-pointer">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Advanced Analytics</h3>
              <p className="text-slate-500 mb-4">Comprehensive business intelligence and data visualization.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  <PieChart className="w-4 h-4 mr-2" />
                  Revenue Analysis
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Growth Metrics
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Full Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "dashboards" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Executive Dashboard</h3>
                <p className="text-sm text-slate-500 mb-4">High-level business metrics and KPIs</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  Open Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">Financial Dashboard</h3>
                <p className="text-sm text-slate-500 mb-4">Revenue, expenses, and profit analysis</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                  Open Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Operations Dashboard</h3>
                <p className="text-sm text-slate-500 mb-4">Production, inventory, and supply chain metrics</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                  Open Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Sales Dashboard</h3>
                <p className="text-sm text-slate-500 mb-4">Sales performance, customer analytics, and market insights</p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer">
                  Open Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
