import { CheckCircle2, ClipboardCheck, ShieldAlert, UserX } from "lucide-react"
import { TerminationStats } from "@/types/termination.types"

interface TerminationStatsCardsProps {
  stats: TerminationStats
}

export function TerminationStatsCards({ stats }: TerminationStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between"><p className="text-sm text-slate-500">Total Cases</p><UserX className="w-4 h-4 text-indigo-500" /></div>
        <p className="text-2xl font-bold text-slate-900 mt-2">{stats.total}</p>
      </div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center justify-between"><p className="text-sm text-amber-700">Pending</p><ShieldAlert className="w-4 h-4 text-amber-600" /></div>
        <p className="text-2xl font-bold text-amber-900 mt-2">{stats.pending}</p>
      </div>
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
        <div className="flex items-center justify-between"><p className="text-sm text-sky-700">Approved</p><ClipboardCheck className="w-4 h-4 text-sky-600" /></div>
        <p className="text-2xl font-bold text-sky-900 mt-2">{stats.approved}</p>
      </div>
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center justify-between"><p className="text-sm text-emerald-700">Completed</p><CheckCircle2 className="w-4 h-4 text-emerald-600" /></div>
        <p className="text-2xl font-bold text-emerald-900 mt-2">{stats.completed}</p>
      </div>
    </div>
  )
}
