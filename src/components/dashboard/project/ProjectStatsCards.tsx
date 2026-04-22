import { FileText, TrendingUp, UserCheck, Users } from "lucide-react"
import { ProjectStats } from "@/types/project.types"

interface ProjectStatsCardsProps {
  stats: ProjectStats
}

export function ProjectStatsCards({ stats }: ProjectStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Projects</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalProjects}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">In Progress</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">{stats.inProgressCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Completed</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.completedCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Team Members</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{stats.totalTeamMembers}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
