"use client"

import { Card, CardContent } from "@/components/ui/Card"
import {
  TrendingUp, TrendingDown, Activity, Target, Users, Package, Truck, CheckCircle,
} from "lucide-react"
import { ReportMetrics } from "@/types/reporting.types"

interface ReportingOverviewProps {
  metrics: ReportMetrics
  formatCurrency: (amount: number) => string
}

function TrendIcon({ value, previous }: { value: number; previous: number }) {
  if (value > previous) return <TrendingUp className="w-4 h-4 text-green-600" />
  if (value < previous) return <TrendingDown className="w-4 h-4 text-red-600" />
  return <Activity className="w-4 h-4 text-gray-600" />
}

export default function ReportingOverview({ metrics, formatCurrency: _formatCurrency }: ReportingOverviewProps) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Profit Margin</p>
                <p className="text-2xl font-bold text-orange-900">{metrics.profitMargin}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendIcon value={metrics.profitMargin} previous={16.5} />
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
                <p className="text-2xl font-bold text-teal-900">{metrics.productionEfficiency}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendIcon value={metrics.productionEfficiency} previous={85.0} />
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
                <p className="text-2xl font-bold text-indigo-900">{metrics.qualityScore}/5.0</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendIcon value={metrics.qualityScore} previous={4.5} />
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

      {/* Performance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Customer Satisfaction</p>
                <p className="text-2xl font-bold text-slate-900">{metrics.customerSatisfaction}/5.0</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendIcon value={metrics.customerSatisfaction} previous={4.1} />
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
                <p className="text-2xl font-bold text-green-900">{metrics.onTimeDelivery}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendIcon value={metrics.onTimeDelivery} previous={92.4} />
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
            <p className="text-lg font-semibold text-blue-900">{metrics.totalInventory.toLocaleString()}</p>
            <p className="text-sm text-blue-600">Total Inventory Items</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-lg font-semibold text-purple-900">{metrics.activeEmployees}</p>
            <p className="text-sm text-purple-600">Active Employees</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-lg font-semibold text-orange-900">{metrics.totalOrders}</p>
            <p className="text-sm text-orange-600">Total Orders</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
