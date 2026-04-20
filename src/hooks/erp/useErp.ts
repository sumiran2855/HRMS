"use client"

import { useState, useCallback } from "react"
import { ERP_STATS, RECENT_ACTIVITIES, MONTHLY_TRENDS, ERP_MODULES } from "@/constants/erp"
import type { UseErpReturn } from "@/types/erp.types"

export function useErp(): UseErpReturn {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

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
    stats: ERP_STATS,
    modules: ERP_MODULES,
    activities: RECENT_ACTIVITIES,
    monthlyTrends: MONTHLY_TRENDS,
    formatCurrency,
  }
}
