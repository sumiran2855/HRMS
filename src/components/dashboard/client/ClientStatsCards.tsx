import { Building2, Briefcase, DollarSign, UserCheck } from "lucide-react"
import { ClientStats } from "@/types/client.types"

interface ClientStatsCardsProps {
  stats: ClientStats
  formatCurrency: (amount: number) => string
}

export function ClientStatsCards({ stats, formatCurrency }: ClientStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Clients</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalClients}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Active Projects</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stats.activeProjects}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(stats.totalRevenue)}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Active</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.activeCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
