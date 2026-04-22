import { Card, CardContent } from "@/components/ui/Card"
import { Users, Briefcase, DollarSign, Building } from "lucide-react"
import { HRStats } from "@/types/hr.types"

interface HRStatsCardsProps {
  stats: HRStats
  formatCurrency: (amount: number) => string
}

export default function HRStatsCards({ stats, formatCurrency }: HRStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Employees</p>
              <p className="text-2xl font-bold text-purple-900">{stats.totalEmployees}</p>
              <p className="text-xs text-purple-600 mt-1">{stats.newHiresThisMonth} new this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active Employees</p>
              <p className="text-2xl font-bold text-green-900">{stats.activeEmployees}</p>
              <p className="text-xs text-green-600 mt-1">{stats.activePercentage}% workforce</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Avg Salary</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(stats.avgSalary)}</p>
              <p className="text-xs text-blue-600 mt-1">Across all departments</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Departments</p>
              <p className="text-2xl font-bold text-orange-900">{stats.departmentCount}</p>
              <p className="text-xs text-orange-600 mt-1">Active teams</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Building className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
