"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Search } from "lucide-react"
import { STATUSES, PRIORITIES } from "@/constants/procurement"

interface ProcurementFiltersProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedPriority: string
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>
}

export default function ProcurementFilters({
  searchTerm, setSearchTerm,
  selectedStatus, setSelectedStatus,
  selectedPriority, setSelectedPriority,
}: ProcurementFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by order number or vendor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 appearance-none"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 appearance-none"
            >
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
