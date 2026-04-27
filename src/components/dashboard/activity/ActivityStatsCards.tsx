import { ClipboardList, PlayCircle, CheckCircle2, Clock3 } from "lucide-react"
import { ActivityStats } from "@/types/activity.types"

interface ActivityStatsCardsProps {
  stats: ActivityStats
}

export function ActivityStatsCards({ stats }: ActivityStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Total Activities</span>
          <ClipboardList className="w-4 h-4 text-indigo-500" />
        </div>
        <p className="text-2xl font-bold text-slate-900">{stats.totalActivities}</p>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">In Progress</span>
          <PlayCircle className="w-4 h-4 text-indigo-500" />
        </div>
        <p className="text-2xl font-bold text-indigo-600">{stats.inProgressCount}</p>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Completed</span>
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        </div>
        <p className="text-2xl font-bold text-green-600">{stats.completedCount}</p>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Pending</span>
          <Clock3 className="w-4 h-4 text-yellow-500" />
        </div>
        <p className="text-2xl font-bold text-yellow-600">{stats.pendingCount}</p>
      </div>
    </div>
  )
}
