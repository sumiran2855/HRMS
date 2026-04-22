"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Settings, Activity, Zap, Target } from "lucide-react"
import { ManufacturingStats } from "@/types/manufacturing.types"

interface ManufacturingStatsCardsProps {
  stats: ManufacturingStats
}

export default function ManufacturingStatsCards({ stats }: ManufacturingStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Total Orders</p>
              <p className="text-2xl font-bold text-red-900">{stats.totalOrders}</p>
              <p className="text-xs text-red-600 mt-1">{stats.completedOrders} completed</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-900">{stats.inProgressOrders}</p>
              <p className="text-xs text-blue-600 mt-1">Active production</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Output</p>
              <p className="text-2xl font-bold text-green-900">{stats.totalOutput.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">Units today</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Avg Quality</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.avgQualityScore || "—"}</p>
              <p className="text-xs text-yellow-600 mt-1">Score</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
