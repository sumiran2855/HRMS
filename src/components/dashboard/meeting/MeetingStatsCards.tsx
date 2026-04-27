import { CalendarDays, CheckCircle2, Clock3, XCircle } from "lucide-react"
import { MeetingStats } from "@/types/meeting.types"

interface MeetingStatsCardsProps {
  stats: MeetingStats
}

export function MeetingStatsCards({ stats }: MeetingStatsCardsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Total Meetings</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays className="h-4 w-4" />
          Overall scheduled meetings
        </div>
      </article>

      <article className="rounded-2xl border border-sky-200 bg-sky-50 p-5 shadow-sm">
        <p className="text-sm text-sky-700">Upcoming</p>
        <p className="text-3xl font-bold text-sky-900 mt-2">{stats.upcoming}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-sky-700">
          <Clock3 className="h-4 w-4" />
          Planned for upcoming timeline
        </div>
      </article>

      <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <p className="text-sm text-emerald-700">Completed</p>
        <p className="text-3xl font-bold text-emerald-900 mt-2">{stats.completed}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Successfully closed meetings
        </div>
      </article>

      <article className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
        <p className="text-sm text-rose-700">Cancelled</p>
        <p className="text-3xl font-bold text-rose-900 mt-2">{stats.cancelled}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-rose-700">
          <XCircle className="h-4 w-4" />
          Meetings called off
        </div>
      </article>
    </section>
  )
}
