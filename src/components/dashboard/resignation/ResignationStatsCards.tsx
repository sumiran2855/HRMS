import { FileText, Clock3, CheckCircle2, XCircle } from "lucide-react"
import { ResignationStats } from "@/types/resignation.types"

interface ResignationStatsCardsProps {
  stats: ResignationStats
}

export function ResignationStatsCards({ stats }: ResignationStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Total Requests</span>
          <FileText className="w-4 h-4 text-indigo-500" />
        </div>
        <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Pending</span>
          <Clock3 className="w-4 h-4 text-yellow-500" />
        </div>
        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Approved</span>
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        </div>
        <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Rejected</span>
          <XCircle className="w-4 h-4 text-red-500" />
        </div>
        <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
      </div>
    </div>
  )
}
