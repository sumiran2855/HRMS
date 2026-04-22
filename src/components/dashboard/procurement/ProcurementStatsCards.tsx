"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Truck, DollarSign, Building, BarChart3 } from "lucide-react"
import { ProcurementStats } from "@/types/procurement.types"

interface ProcurementStatsCardsProps {
  stats: ProcurementStats
  formatCurrency: (amount: number) => string
}

export default function ProcurementStatsCards({ stats, formatCurrency }: ProcurementStatsCardsProps) {
  const avgOrderValue = stats.totalOrders > 0 ? stats.totalValue / stats.totalOrders : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">Total Orders</p>
              <p className="text-2xl font-bold text-indigo-900">{stats.totalOrders}</p>
              <p className="text-xs text-indigo-600 mt-1">{stats.pendingOrders} pending</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Total Value</p>
              <p className="text-2xl font-bold text-yellow-900">{formatCurrency(stats.totalValue)}</p>
              <p className="text-xs text-yellow-600 mt-1">This month</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active Vendors</p>
              <p className="text-2xl font-bold text-green-900">{stats.activeVendors}</p>
              <p className="text-xs text-green-600 mt-1">All categories</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Building className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(avgOrderValue)}</p>
              <p className="text-xs text-blue-600 mt-1">Per order</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
