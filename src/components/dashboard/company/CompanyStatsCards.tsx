import { Building, Globe, Users } from "lucide-react"
import { CompanyStats } from "@/types/company.types"

interface CompanyStatsCardsProps {
  stats: CompanyStats
  formatCurrency: (amount: number) => string
}

export function CompanyStatsCards({ stats, formatCurrency }: CompanyStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Companies</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalCompanies}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <Building className="w-6 h-6 text-indigo-600" />
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
            <Globe className="w-6 h-6 text-green-600" />
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
            <Users className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Employees</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{stats.totalEmployees.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
