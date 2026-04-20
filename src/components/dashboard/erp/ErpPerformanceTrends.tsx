import {
  Activity,
  TrendingUp,
  TrendingDown,
  Target,
  Package,
  Clock,
  ArrowUpRight,
  BarChart3,
  Zap,
  ChevronDown,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { PERFORMANCE_METRICS, PERFORMANCE_INSIGHTS } from "@/constants/erp"
import type { ErpStats, ErpMonthlyTrend } from "@/types/erp.types"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Target,
  Package,
  Clock,
}

interface ErpPerformanceTrendsProps {
  stats: ErpStats
  monthlyTrends: ErpMonthlyTrend[]
  selectedPeriod: string
  setSelectedPeriod: (period: string) => void
  formatCurrency: (amount: number) => string
}

function TrendBadge({ value, previous }: { value: number; previous: number }) {
  const isUp = value >= previous
  return (
    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
      isUp ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-red-50 text-red-700 ring-1 ring-red-200"
    }`}>
      {isUp ? <ArrowUpRight className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {isUp ? "Up" : "Down"}
    </span>
  )
}

function getMetricValue(type: string, stats: ErpStats, monthlyTrends: ErpMonthlyTrend[], formatCurrency: (n: number) => string) {
  switch (type) {
    case "totalRevenue":
      return formatCurrency(monthlyTrends.reduce((sum, t) => sum + t.revenue, 0))
    case "efficiency":
      return `${stats.productionEfficiency}%`
    case "inventoryTurnover":
      return `${stats.inventoryTurnover}x`
    case "onTimeDelivery":
      return `${stats.onTimeDelivery}%`
    default:
      return ""
  }
}

function getMetricTrendValue(type: string, stats: ErpStats) {
  switch (type) {
    case "totalRevenue": return stats.monthlyRevenue
    case "efficiency": return stats.productionEfficiency
    case "inventoryTurnover": return stats.inventoryTurnover
    case "onTimeDelivery": return stats.onTimeDelivery
    default: return 0
  }
}

const INSIGHT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  productionEfficiency: Zap,
  customerSatisfaction: Target,
  qualityScore: BarChart3,
  onTimeDelivery: Clock,
}

export function ErpPerformanceTrends({
  stats,
  monthlyTrends,
  selectedPeriod,
  setSelectedPeriod,
  formatCurrency,
}: ErpPerformanceTrendsProps) {
  const maxRevenue = Math.max(...monthlyTrends.map(t => t.revenue))

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Performance Trends</h2>
            <p className="text-sm text-slate-500">Operational efficiency & key business metrics</p>
          </div>
        </div>
        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white pl-4 pr-9 text-sm font-medium text-slate-700 shadow-sm transition-all outline-none hover:border-indigo-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 appearance-none cursor-pointer"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PERFORMANCE_METRICS.map(metric => {
          const Icon = ICON_MAP[metric.icon]
          const value = getMetricValue(metric.type, stats, monthlyTrends, formatCurrency)
          const trendValue = getMetricTrendValue(metric.type, stats)

          return (
            <Card key={metric.label} className="group relative overflow-hidden border border-slate-200/80 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${metric.iconBg} rounded-xl flex items-center justify-center ring-1 ring-black/5`}>
                    {Icon && <Icon className={`w-5 h-5 ${metric.iconColor}`} />}
                  </div>
                  <TrendBadge value={trendValue} previous={metric.trendPrevious} />
                </div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight mb-0.5">{value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{metric.label}</p>
                  <span className="text-[11px] text-emerald-600 font-medium">{metric.trendLabel}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend — spans 2 cols */}
        <Card className="lg:col-span-2 border border-slate-200/80">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Revenue Trend</h3>
                <p className="text-xs text-slate-500 mt-0.5">Monthly revenue over the selected period</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                <span className="text-xs text-slate-500 font-medium">Revenue</span>
              </div>
            </div>

            {/* Vertical bar chart */}
            <div className="flex items-end gap-3 h-48 mb-4">
              {monthlyTrends.slice(-6).map((trend) => {
                const height = (trend.revenue / maxRevenue) * 100
                return (
                  <div key={trend.month} className="flex-1 flex flex-col items-center gap-2 group/bar">
                    <span className="text-[11px] font-semibold text-slate-700 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                      {formatCurrency(trend.revenue)}
                    </span>
                    <div className="w-full relative">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-500 to-violet-400 rounded-lg hover:from-indigo-600 hover:to-violet-500 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:shadow-indigo-100"
                        style={{ height: `${height * 1.8}px`, minHeight: "24px" }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{trend.month}</span>
                  </div>
                )
              })}
            </div>

            {/* Summary row */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-600">
                  Avg. monthly: <span className="font-semibold text-slate-900">{formatCurrency(monthlyTrends.reduce((s, t) => s + t.revenue, 0) / monthlyTrends.length)}</span>
                </span>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full ring-1 ring-emerald-200">+{stats.monthlyGrowth}% growth</span>
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights — 1 col */}
        <Card className="border border-slate-200/80">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-slate-900">Quick Insights</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-4">
              {PERFORMANCE_INSIGHTS.map((insight) => {
                const InsightIcon = INSIGHT_ICON_MAP[insight.statKey] || Activity
                const rawValue = stats[insight.statKey]
                const numericValue = typeof rawValue === "number" ? rawValue : 0
                const percentage = insight.suffix === "/5.0" ? (numericValue / 5) * 100 : numericValue

                return (
                  <div key={insight.label} className="group/insight">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <InsightIcon className={`w-3.5 h-3.5 ${insight.color}`} />
                        <span className="text-sm text-slate-600 font-medium">{insight.label}</span>
                      </div>
                      <span className={`text-sm font-bold tabular-nums ${insight.color}`}>
                        {String(rawValue)}{insight.suffix}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          insight.color.includes("green") ? "bg-gradient-to-r from-emerald-400 to-emerald-500" :
                          insight.color.includes("blue") ? "bg-gradient-to-r from-blue-400 to-blue-500" :
                          insight.color.includes("orange") ? "bg-gradient-to-r from-amber-400 to-orange-500" :
                          "bg-gradient-to-r from-violet-400 to-purple-500"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Overall score */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Overall Health</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold text-emerald-600">Excellent</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
