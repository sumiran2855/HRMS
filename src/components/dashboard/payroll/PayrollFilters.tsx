"use client"

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Search, Filter } from "lucide-react"
import { DESIGNATIONS, STATUS_OPTIONS } from "@/constants/payroll"

interface PayrollFiltersProps {
  searchName: string
  setSearchName: React.Dispatch<React.SetStateAction<string>>
  searchId: string
  setSearchId: React.Dispatch<React.SetStateAction<string>>
  selectedDesignation: string
  setSelectedDesignation: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
}

export function PayrollFilters({
  searchName, setSearchName,
  searchId, setSearchId,
  selectedDesignation, setSelectedDesignation,
  selectedStatus, setSelectedStatus,
}: PayrollFiltersProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="relative">
          <select
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10 appearance-none transition-all"
          >
            {DESIGNATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10 appearance-none transition-all"
          >
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
    </div>
  )
}
