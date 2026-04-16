"use client"

import { useState, useCallback, useMemo } from "react"
import type { Holiday, HolidayStats, UseHolidaysReturn } from "@/types/holiday.types"
import { INITIAL_HOLIDAYS } from "@/constants/holidays"

function calculateStats(holidays: Holiday[]): HolidayStats {
  return {
    totalHolidays: holidays.length,
    publicHolidays: holidays.filter((h) => h.type === "public").length,
    companyHolidays: holidays.filter((h) => h.type === "company").length,
    optionalHolidays: holidays.filter((h) => h.type === "optional").length,
  }
}

function filterHolidays(holidays: Holiday[], searchTerm: string): Holiday[] {
  if (!searchTerm) return holidays
  const searchLower = searchTerm.toLowerCase()
  return holidays.filter((holiday) => {
    const nameLower = holiday.name?.toLowerCase() || ""
    const descLower = holiday.description?.toLowerCase() || ""
    const typeLower = holiday.type?.toLowerCase() || ""
    return nameLower.includes(searchLower) || descLower.includes(searchLower) || typeLower.includes(searchLower)
  })
}

function getUpcoming(holidays: Holiday[], count = 3): Holiday[] {
  const today = new Date()
  return holidays
    .filter((h) => new Date(h.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, count)
}

export function useHolidays(): UseHolidaysReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null)
  const [holidays, setHolidays] = useState<Holiday[]>(INITIAL_HOLIDAYS)

  const filteredHolidays = useMemo(() => filterHolidays(holidays, searchTerm), [holidays, searchTerm])
  const stats = useMemo(() => calculateStats(holidays), [holidays])
  const upcomingHolidays = useMemo(() => getUpcoming(holidays), [holidays])

  const handleAddHoliday = useCallback(
    (data: Omit<Holiday, "id">) => {
      const newHoliday: Holiday = { id: Date.now().toString(), ...data }
      setHolidays((prev) => [...prev, newHoliday])
      setShowAddModal(false)
    },
    []
  )

  const handleEditHoliday = useCallback(
    (data: Omit<Holiday, "id">) => {
      if (!editingHoliday) return
      setHolidays((prev) =>
        prev.map((h) => (h.id === editingHoliday.id ? { ...data, id: h.id } : h))
      )
      setEditingHoliday(null)
      setShowAddModal(false)
    },
    [editingHoliday]
  )

  const handleDeleteHoliday = useCallback((id: string) => {
    setHolidays((prev) => prev.filter((h) => h.id !== id))
  }, [])

  const openEditModal = useCallback((holiday: Holiday) => {
    setEditingHoliday(holiday)
    setShowAddModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowAddModal(false)
    setEditingHoliday(null)
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    selectedYear,
    setSelectedYear,
    showAddModal,
    setShowAddModal,
    editingHoliday,
    filteredHolidays,
    stats,
    upcomingHolidays,
    handleAddHoliday,
    handleEditHoliday,
    handleDeleteHoliday,
    openEditModal,
    closeModal,
  }
}
