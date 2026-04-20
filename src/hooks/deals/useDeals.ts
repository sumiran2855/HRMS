"use client"

import { useState, useMemo, useCallback } from "react"
import { DEALS_DATA } from "@/constants/deals"
import type { Deal, DealStats, UseDealsReturn } from "@/types/deals.types"

export function useDeals(): UseDealsReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [selectedStage, setSelectedStage] = useState("All Stages")
  const [selectedSource, setSelectedSource] = useState("All Sources")
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false)
  const [isEditDealModalOpen, setIsEditDealModalOpen] = useState(false)
  const [isViewDealModalOpen, setIsViewDealModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)

  const filteredData = useMemo(() => {
    return DEALS_DATA.filter(deal => {
      const q = searchTerm.toLowerCase()
      const matchSearch =
        !q ||
        deal.dealName.toLowerCase().includes(q) ||
        deal.companyName.toLowerCase().includes(q) ||
        deal.contactPerson.toLowerCase().includes(q) ||
        deal.assignedTo.toLowerCase().includes(q)
      const matchStage = selectedStage === "All Stages" || deal.stage === selectedStage
      const matchSource = selectedSource === "All Sources" || deal.source === selectedSource
      return matchSearch && matchStage && matchSource
    })
  }, [searchTerm, selectedStage, selectedSource])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / entriesPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const stats: DealStats = useMemo(() => ({
    total: DEALS_DATA.length,
    discovery: DEALS_DATA.filter(d => d.stage === "discovery").length,
    qualified: DEALS_DATA.filter(d => d.stage === "qualified").length,
    proposal: DEALS_DATA.filter(d => d.stage === "proposal").length,
    negotiation: DEALS_DATA.filter(d => d.stage === "negotiation").length,
    closedWon: DEALS_DATA.filter(d => d.stage === "closed-won").length,
    closedLost: DEALS_DATA.filter(d => d.stage === "closed-lost").length,
    totalValue: DEALS_DATA.reduce((sum, d) => sum + d.value, 0),
    weightedValue: DEALS_DATA.reduce((sum, d) => sum + (d.value * d.probability / 100), 0),
  }), [])

  const updateFilter = useCallback(
    (setter: (val: string) => void) =>
      (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setter(e.target.value)
        setCurrentPage(1)
      },
    [],
  )

  const handleAction = useCallback((action: string, dealId: number) => {
    const deal = DEALS_DATA.find(d => d.id === dealId)
    if (!deal) return
    switch (action) {
      case "view":
        setSelectedDeal(deal)
        setIsViewDealModalOpen(true)
        break
      case "edit":
        setSelectedDeal(deal)
        setIsEditDealModalOpen(true)
        break
      case "delete":
        setSelectedDeal(deal)
        setIsDeleteModalOpen(true)
        break
    }
  }, [])

  const handleUpdateDeal = useCallback((updatedDeal: any) => {
    const index = DEALS_DATA.findIndex(d => d.id === updatedDeal.id)
    if (index !== -1) {
      DEALS_DATA[index] = updatedDeal
    }
  }, [])

  const handleDeleteDeal = useCallback(() => {
    const index = DEALS_DATA.findIndex(d => d.id === selectedDeal?.id)
    if (index !== -1) {
      DEALS_DATA.splice(index, 1)
    }
  }, [selectedDeal])

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    entriesPerPage,
    setEntriesPerPage,
    selectedStage,
    setSelectedStage,
    selectedSource,
    setSelectedSource,
    isAddDealModalOpen,
    setIsAddDealModalOpen,
    isEditDealModalOpen,
    setIsEditDealModalOpen,
    isViewDealModalOpen,
    setIsViewDealModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedDeal,
    filteredData,
    paginatedData,
    totalPages,
    safePage,
    startIndex,
    endIndex,
    stats,
    updateFilter,
    handleAction,
    handleUpdateDeal,
    handleDeleteDeal,
  }
}
