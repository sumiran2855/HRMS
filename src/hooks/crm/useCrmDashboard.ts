"use client"

import { useState, useCallback } from "react"
import type { PipelineFilters, UseCrmDashboardReturn } from "@/types/crm.types"
import { DEFAULT_PIPELINE_FILTERS } from "@/constants/crm-dashboard"

export function useCrmDashboard(): UseCrmDashboardReturn {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false)
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false)
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false)
  const [isContactCustomerModalOpen, setIsContactCustomerModalOpen] = useState(false)
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false)
  const [isPipelineFilterOpen, setIsPipelineFilterOpen] = useState(false)
  const [pipelineFilters, setPipelineFilters] = useState<PipelineFilters>(DEFAULT_PIPELINE_FILTERS)

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }, [])

  return {
    activeTab,
    setActiveTab,
    selectedPeriod,
    setSelectedPeriod,
    isAddLeadModalOpen,
    setIsAddLeadModalOpen,
    isAddDealModalOpen,
    setIsAddDealModalOpen,
    isAddCustomerModalOpen,
    setIsAddCustomerModalOpen,
    isContactCustomerModalOpen,
    setIsContactCustomerModalOpen,
    isAnalyticsModalOpen,
    setIsAnalyticsModalOpen,
    isPipelineFilterOpen,
    setIsPipelineFilterOpen,
    pipelineFilters,
    setPipelineFilters,
    formatCurrency,
  }
}
