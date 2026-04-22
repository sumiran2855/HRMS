"use client"

import { Users, DollarSign, FileText, Calendar } from "lucide-react"
import { PayrollStats } from "@/types/payroll.types"

interface PayrollStatsCardsProps {
  stats: PayrollStats
  formatCurrency: (amount: number) => string
}

export function PayrollStatsCards({ stats, formatCurrency }: PayrollStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Employees</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalEmployees}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Payroll</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(stats.totalPayroll)}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Paid</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.paidCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{stats.pendingCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
