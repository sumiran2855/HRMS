"use client"

import { Button } from "@/components/ui/Button"
import { Download } from "lucide-react"
import { useReporting } from "@/hooks/reporting/useReporting"
import { REPORTING_TABS, PERIODS, REPORT_METRICS } from "@/constants/reporting"
import {
  ReportingStatsCards,
  ReportingOverview,
  RecentReportsList,
  ReportingAnalytics,
  ReportingDashboards,
} from "@/components/dashboard/reporting"

export default function ReportingPage() {
  const { activeTab, setActiveTab, selectedPeriod, setSelectedPeriod, formatCurrency, getReportStatusColor } = useReporting()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reporting & Analytics</h1>
          <p className="text-slate-500 mt-1">Generate comprehensive business reports and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 appearance-none"
          >
            {PERIODS.map((period) => (
              <option key={period} value={period}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </option>
            ))}
          </select>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export All Reports
          </Button>
        </div>
      </div>

      <ReportingStatsCards metrics={REPORT_METRICS} formatCurrency={formatCurrency} />

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {REPORTING_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <ReportingOverview metrics={REPORT_METRICS} formatCurrency={formatCurrency} />
      )}

      {activeTab === "reports" && (
        <RecentReportsList getReportStatusColor={getReportStatusColor} />
      )}

      {activeTab === "analytics" && <ReportingAnalytics />}

      {activeTab === "dashboards" && <ReportingDashboards />}
    </div>
  )
}
