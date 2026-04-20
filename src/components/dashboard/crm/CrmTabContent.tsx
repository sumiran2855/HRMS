"use client"

import Link from "next/link"
import {
  TrendingUp,
  Target,
  Users,
  Handshake,
  Eye,
  Download,
  BarChart3,
  Plus,
  Phone,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { PipelineView } from "@/components/dashboard/crm/PipelineView"
import type { PipelineFilters } from "@/types/crm.types"
import { TOP_DEALS } from "@/constants/crm-dashboard"

interface CrmTabContentProps {
  activeTab: string
  pipelineFilters: PipelineFilters
  setIsPipelineFilterOpen: (b: boolean) => void
  setIsAddDealModalOpen: (b: boolean) => void
  setIsAnalyticsModalOpen: (b: boolean) => void
  setIsContactCustomerModalOpen: (b: boolean) => void
  setIsAddCustomerModalOpen: (b: boolean) => void
}

export default function CrmTabContent({
  activeTab,
  pipelineFilters,
  setIsPipelineFilterOpen,
  setIsAddDealModalOpen,
  setIsAnalyticsModalOpen,
  setIsContactCustomerModalOpen,
  setIsAddCustomerModalOpen,
}: CrmTabContentProps) {
  return (
    <div className="min-h-[400px]">
      {activeTab === "overview" && (
        <Card className="border-2 border-slate-200">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">CRM Overview</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Get a comprehensive view of your sales pipeline, customer relationships, and performance metrics.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/leads"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide h-11 px-6 py-3 text-base border-2 border-slate-300 bg-white hover:bg-blue-50 hover:border-slate-400 text-slate-900 shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Leads
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide h-11 px-6 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Handshake className="w-4 h-4 mr-2" />
                View Deals
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "analytics" && (
        <Card className="border-2 border-slate-200">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Analytics Dashboard</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Detailed analytics and reporting for your CRM performance with advanced insights and trends.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" className="cursor-pointer">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button
                onClick={() => setIsAnalyticsModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white cursor-pointer shadow-lg"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Full Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "pipeline" && (
        <PipelineView
          deals={TOP_DEALS}
          onFilterClick={() => setIsPipelineFilterOpen(true)}
          onAddDeal={() => setIsAddDealModalOpen(true)}
          filters={pipelineFilters}
        />
      )}

      {activeTab === "customers" && (
        <Card className="border-2 border-slate-200">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Customer Management</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Manage customer relationships, track satisfaction, and build long-term partnerships with your clients.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setIsContactCustomerModalOpen(true)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Customers
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white cursor-pointer shadow-lg"
                onClick={() => setIsAddCustomerModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
