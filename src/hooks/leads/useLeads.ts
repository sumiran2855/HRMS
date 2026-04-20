"use client"

import { useState, useMemo, useCallback } from "react"
import { LEADS_DATA, STATUS_CONFIG } from "@/constants/leads"
import type { Lead, LeadStats, UseLeadsReturn } from "@/types/leads.types"

export function useLeads(): UseLeadsReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedSource, setSelectedSource] = useState("All Sources")
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false)
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false)
  const [isViewLeadModalOpen, setIsViewLeadModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const filteredData = useMemo(() => {
    return LEADS_DATA.filter(lead => {
      const q = searchTerm.toLowerCase()
      const matchSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.assignedTo.toLowerCase().includes(q)
      const matchStatus = selectedStatus === "All Status" || lead.status === selectedStatus
      const matchSource = selectedSource === "All Sources" || lead.source === selectedSource
      return matchSearch && matchStatus && matchSource
    })
  }, [searchTerm, selectedStatus, selectedSource])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / entriesPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const stats: LeadStats = useMemo(() => ({
    total: LEADS_DATA.length,
    new: LEADS_DATA.filter(l => l.status === "new").length,
    contacted: LEADS_DATA.filter(l => l.status === "contacted").length,
    qualified: LEADS_DATA.filter(l => l.status === "qualified").length,
    proposal: LEADS_DATA.filter(l => l.status === "proposal").length,
    negotiation: LEADS_DATA.filter(l => l.status === "negotiation").length,
    totalValue: LEADS_DATA.reduce((sum, l) => sum + l.value, 0),
  }), [])

  const updateFilter = useCallback(
    (setter: (val: string) => void) =>
      (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setter(e.target.value)
        setCurrentPage(1)
      },
    [],
  )

  const handleAction = useCallback((action: string, leadId: number) => {
    const lead = LEADS_DATA.find(l => l.id === leadId)
    if (!lead) return
    switch (action) {
      case "view":
        setSelectedLead(lead)
        setIsViewLeadModalOpen(true)
        break
      case "edit":
        setSelectedLead(lead)
        setIsEditLeadModalOpen(true)
        break
      case "delete":
        setSelectedLead(lead)
        setIsDeleteModalOpen(true)
        break
    }
  }, [])

  const handleUpdateLead = useCallback((updatedLead: any) => {
    const index = LEADS_DATA.findIndex(l => l.id === updatedLead.id)
    if (index !== -1) {
      LEADS_DATA[index] = updatedLead
    }
  }, [])

  const handleDeleteLead = useCallback(() => {
    const index = LEADS_DATA.findIndex(l => l.id === selectedLead?.id)
    if (index !== -1) {
      LEADS_DATA.splice(index, 1)
    }
  }, [selectedLead])

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    entriesPerPage,
    setEntriesPerPage,
    selectedStatus,
    setSelectedStatus,
    selectedSource,
    setSelectedSource,
    isAddLeadModalOpen,
    setIsAddLeadModalOpen,
    isEditLeadModalOpen,
    setIsEditLeadModalOpen,
    isViewLeadModalOpen,
    setIsViewLeadModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedLead,
    filteredData,
    paginatedData,
    totalPages,
    safePage,
    startIndex,
    endIndex,
    stats,
    updateFilter,
    handleAction,
    handleUpdateLead,
    handleDeleteLead,
  }
}
