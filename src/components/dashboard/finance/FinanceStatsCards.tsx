import { Card, CardContent } from "@/components/ui/Card"
import { ArrowUpRight, ArrowDownRight, Clock, Calculator } from "lucide-react"
import type { FinanceStats } from "@/types/finance.types"

interface FinanceStatsCardsProps {
  stats: FinanceStats
  formatCurrency: (amount: number) => string
}

export function FinanceStatsCards({ stats, formatCurrency }: FinanceStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-xs text-green-600 mt-1">↑+15% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-900">{formatCurrency(stats.totalExpenses)}</p>
              <p className="text-xs text-red-600 mt-1">↑+8% from last month</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending Invoices</p>
              <p className="text-2xl font-bold text-yellow-900">{formatCurrency(stats.pendingInvoices)}</p>
              <p className="text-xs text-yellow-600 mt-1">{stats.pendingInvoiceCount} invoices</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Balance</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(stats.totalBalance)}</p>
              <p className="text-xs text-blue-600 mt-1">Across all accounts</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
