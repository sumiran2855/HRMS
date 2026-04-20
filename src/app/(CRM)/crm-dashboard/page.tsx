"use client"

import { Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useCrmDashboard } from "@/hooks/crm/useCrmDashboard"
import CrmStatsCards from "@/components/dashboard/crm/CrmStatsCards"
import CrmSalesPerformance from "@/components/dashboard/crm/CrmSalesPerformance"
import CrmTopDeals from "@/components/dashboard/crm/CrmTopDeals"
import CrmRecentActivities from "@/components/dashboard/crm/CrmRecentActivities"
import CrmTabs from "@/components/dashboard/crm/CrmTabs"
import CrmTabContent from "@/components/dashboard/crm/CrmTabContent"
import { AddLeadModal } from "@/components/dashboard/crm/AddLeadModal"
import { AddDealModal } from "@/components/dashboard/crm/AddDealModal"
import { CustomerModal } from "@/components/dashboard/crm/CustomerModal"
import { PipelineFilter } from "@/components/dashboard/crm/PipelineFilter"
import { AnalyticsModal } from "@/components/dashboard/crm/AnalyticsModal"

export default function CRMPage() {
  const {
    activeTab, setActiveTab,
    selectedPeriod, setSelectedPeriod,
    isAddLeadModalOpen, setIsAddLeadModalOpen,
    isAddDealModalOpen, setIsAddDealModalOpen,
    isAddCustomerModalOpen, setIsAddCustomerModalOpen,
    isContactCustomerModalOpen, setIsContactCustomerModalOpen,
    isAnalyticsModalOpen, setIsAnalyticsModalOpen,
    isPipelineFilterOpen, setIsPipelineFilterOpen,
    pipelineFilters, setPipelineFilters,
    formatCurrency,
  } = useCrmDashboard()

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">CRM Dashboard</h1>
          <p className="text-slate-600 text-lg">Manage your leads, deals, and customer relationships</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Lead
          </Button>
          <Button
            onClick={() => setIsAddDealModalOpen(true)}
            variant="outline"
            className="cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      <CrmStatsCards formatCurrency={formatCurrency} />

      <CrmSalesPerformance
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        formatCurrency={formatCurrency}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CrmTopDeals formatCurrency={formatCurrency} />
        <CrmRecentActivities />
      </div>

      <CrmTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <CrmTabContent
        activeTab={activeTab}
        pipelineFilters={pipelineFilters}
        setIsPipelineFilterOpen={setIsPipelineFilterOpen}
        setIsAddDealModalOpen={setIsAddDealModalOpen}
        setIsAnalyticsModalOpen={setIsAnalyticsModalOpen}
        setIsContactCustomerModalOpen={setIsContactCustomerModalOpen}
        setIsAddCustomerModalOpen={setIsAddCustomerModalOpen}
      />

      {/* Modals */}
      <AddLeadModal isOpen={isAddLeadModalOpen} onClose={() => setIsAddLeadModalOpen(false)} />
      <AddDealModal isOpen={isAddDealModalOpen} onClose={() => setIsAddDealModalOpen(false)} />
      <CustomerModal isOpen={isAddCustomerModalOpen} onClose={() => setIsAddCustomerModalOpen(false)} mode="add" />
      <CustomerModal isOpen={isContactCustomerModalOpen} onClose={() => setIsContactCustomerModalOpen(false)} mode="contact" />
      <PipelineFilter isOpen={isPipelineFilterOpen} onClose={() => setIsPipelineFilterOpen(false)} onFilter={setPipelineFilters} currentFilters={pipelineFilters} />
      <AnalyticsModal isOpen={isAnalyticsModalOpen} onClose={() => setIsAnalyticsModalOpen(false)} />
    </div>
  )
}
