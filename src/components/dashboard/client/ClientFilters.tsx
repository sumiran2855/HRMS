import { Search, Globe, UserCheck, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { CLIENT_INDUSTRIES, CLIENT_STATUS_OPTIONS, CONTRACT_TYPES } from "@/constants/client"

interface ClientFiltersProps {
  searchName: string
  setSearchName: (v: string) => void
  searchContact: string
  setSearchContact: (v: string) => void
  selectedIndustry: string
  setSelectedIndustry: (v: string) => void
  selectedStatus: string
  setSelectedStatus: (v: string) => void
  selectedContractType: string
  setSelectedContractType: (v: string) => void
}

const selectClass =
  "w-full px-3 py-2 pl-10 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 appearance-none bg-white text-sm cursor-pointer"

const inputClass =
  "w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"

export function ClientFilters({
  searchName, setSearchName,
  searchContact, setSearchContact,
  selectedIndustry, setSelectedIndustry,
  selectedStatus, setSelectedStatus,
  selectedContractType, setSelectedContractType,
}: ClientFiltersProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by company..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="relative">
          <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search contact..."
            value={searchContact}
            onChange={(e) => setSearchContact(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className={selectClass}>
            {CLIENT_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div className="relative">
          <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={selectClass}>
            {CLIENT_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s === "active" ? "Active" : s === "completed" ? "Completed" : s === "pending" ? "Pending" : s === "inactive" ? "Inactive" : s}</option>)}
          </select>
        </div>

        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <select value={selectedContractType} onChange={(e) => setSelectedContractType(e.target.value)} className={selectClass}>
            {CONTRACT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
    </div>
  )
}
