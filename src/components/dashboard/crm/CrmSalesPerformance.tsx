"use client"

import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Building,
  Clock,
} from "lucide-react"
import { CRM_STATS, MONTHLY_PERFORMANCE, SALES_METRICS } from "@/constants/crm-dashboard"

const ICON_MAP: Record<string, React.ElementType> = { TrendingUp, Target, Building, Clock }

function TrendIcon({ value, previous }: { value: number; previous: number }) {
  if (value > previous) return <TrendingUp className="w-4 h-4 text-green-600" />
  if (value < previous) return <TrendingDown className="w-4 h-4 text-red-600" />
  return <Activity className="w-4 h-4 text-gray-600" />
}

interface CrmSalesPerformanceProps {
  selectedPeriod: string
  setSelectedPeriod: (p: string) => void
  formatCurrency: (amount: number) => string
}

export default function CrmSalesPerformance({ selectedPeriod, setSelectedPeriod, formatCurrency }: CrmSalesPerformanceProps) {
  const totalRevenue = MONTHLY_PERFORMANCE.reduce((sum, p) => sum + p.revenue, 0)

  const metricValues: Record<string, string> = {
    totalRevenue: formatCurrency(totalRevenue),
    conversionRate: `${CRM_STATS.conversionRate}%`,
    averageDealSize: formatCurrency(CRM_STATS.averageDealSize),
    salesCycle: `${CRM_STATS.salesCycle} days`,
  }

  const metricCurrentValues: Record<string, number> = {
    totalRevenue: CRM_STATS.revenueThisMonth,
    conversionRate: CRM_STATS.conversionRate,
    averageDealSize: CRM_STATS.averageDealSize,
    salesCycle: 40,
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
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
          {SALES_METRICS.map((metric) => {
            const Icon = ICON_MAP[metric.icon] ?? TrendingUp
            return (
              <div key={metric.label} className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${metric.iconBg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">{metric.label}</p>
                    <p className="text-lg font-bold text-slate-900">{metricValues[metric.valueKey]}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendIcon value={metricCurrentValues[metric.valueKey]} previous={metric.previousValue} />
                      <span className="text-xs text-green-600">{metric.trendText}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Revenue Trend</h3>
            <div className="space-y-3">
              {MONTHLY_PERFORMANCE.slice(-6).map((performance) => (
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
                <span className="text-sm font-medium text-green-600">+{CRM_STATS.monthlyGrowth}%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Customer Satisfaction</span>
                <span className="text-sm font-medium text-blue-600">{CRM_STATS.customerSatisfaction}/5.0</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Sales Cycle</span>
                <span className="text-sm font-medium text-orange-600">{CRM_STATS.salesCycle} days</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">Conversion Rate</span>
                <span className="text-sm font-medium text-purple-600">{CRM_STATS.conversionRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
