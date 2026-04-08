"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"
import {
  X, TrendingUp, TrendingDown, Users, Handshake, DollarSign,
  Calendar, BarChart3, PieChart, Activity, Download, Filter
} from "lucide-react"

interface AnalyticsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AnalyticsModal({ isOpen, onClose }: AnalyticsModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("30days")
  const [selectedMetric, setSelectedMetric] = useState("all")

  const metrics = {
    overview: {
      totalLeads: 1247,
      newLeads: 89,
      conversionRate: 23.5,
      totalDeals: 156,
      wonDeals: 42,
      totalRevenue: 2450000,
      avgDealSize: 15673,
      pipelineValue: 890000
    },
    trends: [
      { month: "Jan", leads: 98, deals: 12, revenue: 180000 },
      { month: "Feb", leads: 112, deals: 15, revenue: 220000 },
      { month: "Mar", leads: 89, deals: 18, revenue: 280000 },
      { month: "Apr", leads: 134, deals: 14, revenue: 195000 },
      { month: "May", leads: 156, deals: 22, revenue: 310000 },
      { month: "Jun", leads: 145, deals: 19, revenue: 265000 }
    ],
    leadSources: [
      { source: "Website", count: 456, percentage: 36.6, color: "#378ADD" },
      { source: "LinkedIn", count: 234, percentage: 18.8, color: "#7F77DD" },
      { source: "Referral", count: 189, percentage: 15.2, color: "#639922" },
      { source: "Cold Email", count: 167, percentage: 13.4, color: "#BA7517" },
      { source: "Conference", count: 123, percentage: 9.9, color: "#D85A30" },
      { source: "Social Media", count: 78, percentage: 6.1, color: "#888780" }
    ],
    dealStages: [
      { stage: "Discovery", count: 45, value: 675000 },
      { stage: "Qualified", count: 32, value: 480000 },
      { stage: "Proposal", count: 28, value: 420000 },
      { stage: "Negotiation", count: 18, value: 270000 },
      { stage: "Closed Won", count: 42, value: 630000 },
      { stage: "Closed Lost", count: 12, value: 180000 }
    ],
    topPerformers: [
      { name: "Alex Johnson", leads: 45, deals: 12, revenue: 285000 },
      { name: "Emma Davis", leads: 38, deals: 10, revenue: 245000 },
      { name: "Chris Wilson", leads: 42, deals: 8, revenue: 198000 },
      { name: "Sarah Brown", leads: 35, deals: 9, revenue: 187000 }
    ]
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)

  const getStagePillClass = (stage: string) => {
    const map: Record<string, string> = {
      "Discovery": "bg-slate-200 text-slate-700",
      "Qualified": "bg-blue-100 text-blue-800",
      "Proposal": "bg-violet-100 text-violet-800",
      "Negotiation": "bg-amber-100 text-amber-800",
      "Closed Won": "bg-green-100 text-green-800",
      "Closed Lost": "bg-red-100 text-red-800",
    }
    return map[stage] ?? "bg-slate-100 text-slate-600"
  }

  const getInitials = (name: string) =>
    name.split(" ").map(n => n[0]).join("")

  const maxRevenue = Math.max(...metrics.trends.map(t => t.revenue))
  const maxDeals = Math.max(...metrics.trends.map(t => t.deals))
  const maxLeads = Math.max(...metrics.trends.map(t => t.leads))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-xl border border-slate-200 my-4">

        {/* ── Header ── */}
        <div className="top-0 bg-white border-b border-slate-200 px-6 sm:px-8 py-5 rounded-t-2xl z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-[#7F77DD] rounded-xl flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-semibold text-slate-900 truncate">CRM Analytics</h2>
              <p className="text-sm text-slate-500">Comprehensive performance metrics and insights</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors flex-shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Filters ── */}
        <div className="px-6 sm:px-8 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-end gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-[11px] uppercase tracking-wide text-slate-400 font-medium">
                Time period
              </Label>
              <select
                value={selectedPeriod}
                onChange={e => setSelectedPeriod(e.target.value)}
                className="h-9 w-40 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-[11px] uppercase tracking-wide text-slate-400 font-medium">
                Metric focus
              </Label>
              <select
                value={selectedMetric}
                onChange={e => setSelectedMetric(e.target.value)}
                className="h-9 w-40 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              >
                <option value="all">All Metrics</option>
                <option value="leads">Leads Only</option>
                <option value="deals">Deals Only</option>
                <option value="revenue">Revenue Only</option>
              </select>
            </div>
          </div>
          <Button variant="outline" className="h-9 text-sm cursor-pointer border-slate-200">
            <Download className="w-4 h-4 mr-2" />
            Export report
          </Button>
        </div>

        {/* ── Content ── */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Total Leads */}
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-700" />
                  </div>
                  <span className="text-[11px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    ↑ +{metrics.overview.newLeads}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-1">Total leads</p>
                <p className="text-2xl font-semibold text-slate-900">{metrics.overview.totalLeads.toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-1">+{metrics.overview.newLeads} this period</p>
              </CardContent>
            </Card>

            {/* Total Deals */}
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Handshake className="w-4 h-4 text-green-700" />
                  </div>
                  <span className="text-[11px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    ↑ {metrics.overview.wonDeals} won
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-1">Total deals</p>
                <p className="text-2xl font-semibold text-slate-900">{metrics.overview.totalDeals}</p>
                <p className="text-xs text-slate-400 mt-1">{metrics.overview.wonDeals} closed won</p>
              </CardContent>
            </Card>

            {/* Revenue */}
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-violet-700" />
                  </div>
                  <span className="text-[11px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    ↑ +16.7%
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-1">Total revenue</p>
                <p className="text-2xl font-semibold text-slate-900">$2.45M</p>
                <p className="text-xs text-slate-400 mt-1">+16.7% growth</p>
              </CardContent>
            </Card>

            {/* Conversion */}
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-amber-700" />
                  </div>
                  <span className="text-[11px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    ↑ +2.3%
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-1">Conversion rate</p>
                <p className="text-2xl font-semibold text-slate-900">{metrics.overview.conversionRate}%</p>
                <p className="text-xs text-slate-400 mt-1">+2.3% improvement</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Bar Chart */}
            <Card className="border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-800">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  Performance trends
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {/* Legend */}
                <div className="flex gap-4 justify-center mb-4">
                  {[
                    { label: "Revenue", color: "#7F77DD" },
                    { label: "Deals", color: "#639922" },
                    { label: "Leads", color: "#378ADD" }
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                      <span className="text-xs text-slate-500">{l.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bars */}
                <div className="h-40 flex items-end gap-1.5 sm:gap-2">
                  {metrics.trends.map(t => (
                    <div key={t.month} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="flex flex-col justify-end items-center w-full gap-0.5" style={{ height: "136px" }}>
                        <div
                          className="w-full rounded-t-sm transition-opacity hover:opacity-70"
                          style={{ height: `${(t.revenue / maxRevenue) * 96}px`, background: "#7F77DD" }}
                          title={`${t.month}: ${formatCurrency(t.revenue)}`}
                        />
                        <div
                          className="w-full rounded-sm transition-opacity hover:opacity-70"
                          style={{ height: `${(t.deals / maxDeals) * 28}px`, background: "#639922" }}
                          title={`${t.month}: ${t.deals} deals`}
                        />
                        <div
                          className="w-full rounded-b-sm transition-opacity hover:opacity-70"
                          style={{ height: `${(t.leads / maxLeads) * 24}px`, background: "#378ADD" }}
                          title={`${t.month}: ${t.leads} leads`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1">{t.month}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
                  <div>
                    <p className="text-[11px] text-slate-400">Peak month</p>
                    <p className="text-sm font-medium text-slate-900">May</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">Avg leads</p>
                    <p className="text-sm font-medium text-slate-900">122</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">Growth</p>
                    <p className="text-sm font-medium text-green-600">+47.9%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Sources */}
            <Card className="border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-800">
                  <div className="w-7 h-7 bg-violet-50 rounded-lg flex items-center justify-center">
                    <PieChart className="w-3.5 h-3.5 text-violet-600" />
                  </div>
                  Lead sources distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-1.5">
                  {metrics.leadSources.map(source => (
                    <div
                      key={source.source}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: source.color }}
                      />
                      <span className="text-sm text-slate-700 w-24 flex-shrink-0">{source.source}</span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${source.percentage}%`, background: source.color }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 w-8 text-right">{source.count}</span>
                      <span className="text-xs font-medium text-slate-600 w-10 text-right">{source.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pipeline Analysis */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-800">
                <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 text-green-600" />
                </div>
                Pipeline analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {metrics.dealStages.map(stage => (
                  <div
                    key={stage.stage}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${getStagePillClass(stage.stage)}`}>
                        {stage.stage}
                      </span>
                      <span className="text-lg font-semibold text-slate-900">{stage.count}</span>
                    </div>
                    <p className="text-xs text-slate-500">{formatCurrency(stage.value)}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Avg {formatCurrency(Math.round(stage.value / stage.count))}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-800">
                <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                </div>
                Top performers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Name
                      </th>
                      <th className="text-center py-3 px-4 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Leads
                      </th>
                      <th className="text-center py-3 px-4 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Deals
                      </th>
                      <th className="text-right py-3 px-4 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.topPerformers.map((p, i) => (
                      <tr
                        key={p.name}
                        className="border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-[10px] font-semibold text-violet-700">
                              {getInitials(p.name)}
                            </div>
                            <span className="text-sm font-medium text-slate-800">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center text-slate-700">{p.leads}</td>
                        <td className="py-3 px-4 text-center text-slate-700">{p.deals}</td>
                        <td className="py-3 px-4 text-right font-medium text-green-600">
                          {formatCurrency(p.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="flex justify-end pt-2 border-t border-slate-100">
            <Button
              onClick={onClose}
              className="bg-[#534AB7] hover:bg-[#3C3489] text-white text-sm cursor-pointer"
            >
              Close analytics
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}