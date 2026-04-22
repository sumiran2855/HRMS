"use client"

import { useState, useCallback } from "react"
import { UseReportingReturn } from "@/types/reporting.types"
import { REPORT_STATUS_COLOR_MAP } from "@/constants/reporting"

export function useReporting(): UseReportingReturn {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }, [])

  const getReportStatusColor = useCallback(
    (status: string) => REPORT_STATUS_COLOR_MAP[status] || "bg-gray-100 text-gray-700",
    []
  )

  return {
    activeTab, setActiveTab,
    selectedPeriod, setSelectedPeriod,
    formatCurrency,
    getReportStatusColor,
  }
}
