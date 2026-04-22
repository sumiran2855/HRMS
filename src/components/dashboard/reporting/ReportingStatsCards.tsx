"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Target } from "lucide-react"
import { ReportMetrics } from "@/types/reporting.types"

interface ReportingStatsCardsProps {
  metrics: ReportMetrics
  formatCurrency: (amount: number) => string
}

function TrendIcon({ value, previous }: { value: number; previous: number }) {
  if (value > previous) return <TrendingUp className="w-4 h-4 text-green-600" />
  if (value < previous) return <TrendingDown className="w-4 h-4 text-red-600" />
  return <Activity className="w-4 h-4 text-gray-600" />
}

export default function ReportingStatsCards({ metrics, formatCurrency }: ReportingStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(metrics.totalRevenue)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon value={metrics.totalRevenue} previous={2200000} />
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
              <p className="text-2xl font-bold text-red-900">{formatCurrency(metrics.totalExpenses)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon value={metrics.totalExpenses} previous={1750000} />
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
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(metrics.grossProfit)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon value={metrics.grossProfit} previous={480000} />
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
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(metrics.netProfit)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon value={metrics.netProfit} previous={380000} />
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
  )
}
