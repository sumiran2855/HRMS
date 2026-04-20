"use client"

import { Button } from "@/components/ui/Button"
import { BarChart3, Download } from "lucide-react"
import { useErp } from "@/hooks/erp/useErp"
import { ErpKeyMetrics, ErpPerformanceTrends, ErpModules, ErpRecentActivities } from "@/components/dashboard/erp"

export default function ERPPage() {
  const {
    selectedPeriod, setSelectedPeriod,
    stats, modules, activities, monthlyTrends,
    formatCurrency,
  } = useErp()

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

      <ErpKeyMetrics stats={stats} formatCurrency={formatCurrency} />

      <ErpPerformanceTrends
        stats={stats}
        monthlyTrends={monthlyTrends}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        formatCurrency={formatCurrency}
      />

      <ErpModules modules={modules} />

      <ErpRecentActivities activities={activities} />
    </div>
  )
}
