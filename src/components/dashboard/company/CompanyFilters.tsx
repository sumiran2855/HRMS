import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { INDUSTRIES, COMPANY_STATUS_OPTIONS } from "@/constants/company"

interface CompanyFiltersProps {
  searchName: string
  setSearchName: (v: string) => void
  searchId: string
  setSearchId: (v: string) => void
  selectedIndustry: string
  setSelectedIndustry: (v: string) => void
  selectedStatus: string
  setSelectedStatus: (v: string) => void
}

export function CompanyFilters({
  searchName, setSearchName,
  searchId, setSearchId,
  selectedIndustry, setSelectedIndustry,
  selectedStatus, setSelectedStatus,
}: CompanyFiltersProps) {
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
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10 appearance-none cursor-pointer"
          >
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10 appearance-none cursor-pointer"
          >
            {COMPANY_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
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
