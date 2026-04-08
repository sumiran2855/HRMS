"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { 
  Package, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Truck, 
  Settings, 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  Building,
  Wrench,
  Zap,
  Target,
  FileText,
  Calendar,
  Eye,
  Download,
  Filter
} from "lucide-react"

// Enhanced mock ERP statistics
const erpStats = {
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
  qualityScore: 96.5
}

// Enhanced recent activities with more details
const recentActivities = [
  { id: 1, type: "inventory", description: "Low stock alert for Laptop Model X", time: "10 minutes ago", priority: "high", user: "System", details: "Stock below minimum threshold" },
  { id: 2, type: "finance", description: "Invoice #1234 paid - $5,430", time: "25 minutes ago", priority: "normal", user: "John Smith", details: "Customer payment received" },
  { id: 3, type: "manufacturing", description: "Production batch #456 completed", time: "1 hour ago", priority: "normal", user: "Emma Davis", details: "Quality check passed" },
  { id: 4, type: "sales", description: "New purchase order received - 50 units", time: "2 hours ago", priority: "high", user: "Chris Wilson", details: "Priority customer order" },
  { id: 5, type: "hr", description: "Employee onboarding completed", time: "3 hours ago", priority: "normal", user: "Sarah Brown", details: "New hire orientation complete" },
  { id: 6, type: "procurement", description: "Vendor payment processed", time: "4 hours ago", priority: "normal", user: "Michael Chen", details: "Monthly vendor settlement" }
]

// Performance trends for the last 6 months
const monthlyTrends = [
  { month: "Jan", revenue: 750000, orders: 245, efficiency: 85.2 },
  { month: "Feb", revenue: 820000, orders: 267, efficiency: 87.8 },
  { month: "Mar", revenue: 890000, orders: 289, efficiency: 89.1 },
  { month: "Apr", revenue: 845000, orders: 278, efficiency: 86.5 },
  { month: "May", revenue: 920000, orders: 312, efficiency: 90.2 },
  { month: "Jun", revenue: 892000, orders: 298, efficiency: 87.5 }
]

export default function ERPPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const modules = [
    { id: "inventory", label: "Inventory Management", icon: Package, color: "blue", description: "Track stock levels and manage warehouse operations" },
    { id: "finance", label: "Finance & Accounting", icon: DollarSign, color: "green", description: "Manage financial transactions and accounting" },
    { id: "hr", label: "Human Resources", icon: Users, color: "purple", description: "Handle employee management and payroll" },
    { id: "sales", label: "Sales & Distribution", icon: ShoppingCart, color: "orange", description: "Manage sales orders and customer relationships" },
    { id: "procurement", label: "Procurement", icon: Truck, color: "indigo", description: "Handle purchase orders and vendor management" },
    { id: "manufacturing", label: "Manufacturing", icon: Settings, color: "red", description: "Monitor production and quality control" },
    { id: "reporting", label: "Reporting & Analytics", icon: BarChart3, color: "teal", description: "Generate comprehensive business reports" }
  ]

  const getModuleColor = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-blue-600'
      case 'green': return 'from-green-500 to-green-600'
      case 'purple': return 'from-purple-500 to-purple-600'
      case 'orange': return 'from-orange-500 to-orange-600'
      case 'indigo': return 'from-indigo-500 to-indigo-600'
      case 'red': return 'from-red-500 to-red-600'
      case 'teal': return 'from-teal-500 to-teal-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'inventory': return <Package className="w-4 h-4 text-orange-600" />
      case 'finance': return <DollarSign className="w-4 h-4 text-green-600" />
      case 'manufacturing': return <Settings className="w-4 h-4 text-red-600" />
      case 'sales': return <ShoppingCart className="w-4 h-4 text-blue-600" />
      case 'hr': return <Users className="w-4 h-4 text-purple-600" />
      case 'procurement': return <Truck className="w-4 h-4 text-indigo-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

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

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">ERP Dashboard</h1>
          <p className="text-slate-600 text-lg">Enterprise Resource Planning System</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Dashboard
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer shadow-lg">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
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
                  <Package className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-blue-600 truncate">Total Inventory</p>
                  <p className="text-xl sm:text-3xl font-bold text-blue-900 truncate">{erpStats.totalInventory}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {getTrendIcon(erpStats.totalInventory, 8500)}
                <span className="text-xs text-green-600 hidden sm:inline">+5.2%</span>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-blue-600">Low Stock Items</span>
                <span className="text-sm sm:text-lg font-bold text-blue-600">{erpStats.lowStockItems}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-green-600 truncate">Monthly Revenue</p>
                  <p className="text-xl sm:text-3xl font-bold text-green-900 truncate">{formatCurrency(erpStats.totalRevenue)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {getTrendIcon(erpStats.totalRevenue, 285000)}
                <span className="text-xs text-green-600 hidden sm:inline">+12.3%</span>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 border-t border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-green-600 truncate">Profit Margin</span>
                <span className="text-sm sm:text-lg font-bold text-green-600 truncate">{erpStats.profitMargin}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-purple-600 truncate">Active Employees</p>
                  <p className="text-xl sm:text-3xl font-bold text-purple-900 truncate">{erpStats.totalEmployees}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {getTrendIcon(erpStats.totalEmployees, 142)}
                <span className="text-xs text-green-600 hidden sm:inline">+8.5%</span>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 border-t border-purple-200">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-purple-600 truncate">New Hires</span>
                <span className="text-sm sm:text-lg font-bold text-purple-600 truncate">0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 border-orange-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-orange-600 truncate">Efficiency Rate</p>
                  <p className="text-xl sm:text-3xl font-bold text-orange-900 truncate">{erpStats.productionEfficiency}%</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {getTrendIcon(erpStats.productionEfficiency, 78)}
                <span className="text-xs text-green-600 hidden sm:inline">+3.2%</span>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 border-t border-orange-200">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-orange-600 truncate">Production Rate</span>
                <span className="text-sm sm:text-lg font-bold text-orange-600 truncate">{erpStats.manufacturingOrders}/day</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends Section */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Performance Trends</h2>
                <p className="text-xs text-slate-500">Track your operational efficiency and key metrics</p>
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
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(monthlyTrends.reduce((sum, t) => sum + t.revenue, 0))}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(erpStats.monthlyRevenue, 285000)}
                    <span className="text-xs text-green-600">+12.3%</span>
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
                  <p className="text-xs text-slate-500">Efficiency Rate</p>
                  <p className="text-lg font-bold text-slate-900">{erpStats.productionEfficiency}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(erpStats.productionEfficiency, 85.0)}
                    <span className="text-xs text-green-600">Above target</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Inventory Turnover</p>
                  <p className="text-lg font-bold text-slate-900">{erpStats.inventoryTurnover}x</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(erpStats.inventoryTurnover, 8.2)}
                    <span className="text-xs text-green-600">Optimal</span>
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
                  <p className="text-xs text-slate-500">On-Time Delivery</p>
                  <p className="text-lg font-bold text-slate-900">{erpStats.onTimeDelivery}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(erpStats.onTimeDelivery, 92.5)}
                    <span className="text-xs text-green-600">Excellent</span>
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
                {monthlyTrends.slice(-6).map((trend) => (
                  <div key={trend.month} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 w-16">{trend.month}</span>
                    <div className="flex-1 mx-3">
                      <div className="bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(trend.revenue / 920000) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-slate-900 text-right w-20">
                      {formatCurrency(trend.revenue)}
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
                  <span className="text-sm text-slate-600">Production Efficiency</span>
                  <span className="text-sm font-medium text-green-600">{erpStats.productionEfficiency}%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Customer Satisfaction</span>
                  <span className="text-sm font-medium text-blue-600">{erpStats.customerSatisfaction}/5.0</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Quality Score</span>
                  <span className="text-sm font-medium text-orange-600">{erpStats.qualityScore}%</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Delivery Performance</span>
                  <span className="text-sm font-medium text-purple-600">{erpStats.onTimeDelivery}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced ERP Modules */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">ERP Modules</h2>
          <Button variant="outline" className="cursor-pointer">
            <Filter className="w-4 h-4 mr-2" />
            Customize View
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-slate-200 transform hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getModuleColor(module.color)} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    {module.label}
                  </CardTitle>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    module.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    module.color === 'green' ? 'bg-green-100 text-green-700' :
                    module.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                    module.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    module.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
                    module.color === 'red' ? 'bg-red-100 text-red-700' :
                    'bg-teal-100 text-teal-700'
                  }`}>
                    Active
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-slate-600 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </div>
                  </div>
                  <Link href={`/${module.id}`}>
                    <Button className={`bg-gradient-to-r ${getModuleColor(module.color)} hover:opacity-90 text-white cursor-pointer group-hover:shadow-lg transition-all duration-300`}>
                      Manage Module
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

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
  )
}
