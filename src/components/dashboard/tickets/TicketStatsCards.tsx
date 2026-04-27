import { AlertTriangle, CheckCircle2, FolderKanban, Ticket } from "lucide-react"
import { TicketStats } from "@/types/ticket.types"

interface TicketStatsCardsProps {
  stats: TicketStats
}

export function TicketStatsCards({ stats }: TicketStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Total Tickets</p>
          <Ticket className="w-4 h-4 text-indigo-500" />
        </div>
        <p className="text-2xl font-bold text-slate-900 mt-2">{stats.total}</p>
      </div>

      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-sky-700">Open</p>
          <FolderKanban className="w-4 h-4 text-sky-600" />
        </div>
        <p className="text-2xl font-bold text-sky-900 mt-2">{stats.open}</p>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-emerald-700">Resolved</p>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
        <p className="text-2xl font-bold text-emerald-900 mt-2">{stats.resolved}</p>
      </div>

      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-rose-700">Overdue</p>
          <AlertTriangle className="w-4 h-4 text-rose-600" />
        </div>
        <p className="text-2xl font-bold text-rose-900 mt-2">{stats.overdue}</p>
      </div>
    </div>
  )
}
