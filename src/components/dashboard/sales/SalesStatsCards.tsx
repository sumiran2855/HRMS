import { Card, CardContent } from "@/components/ui/Card"
import { DollarSign, ShoppingCart, Clock, Users } from "lucide-react"
import { SalesStats } from "@/types/sales.types"

interface SalesStatsCardsProps {
  stats: SalesStats
  formatCurrency: (amount: number) => string
}

export default function SalesStatsCards({ stats, formatCurrency }: SalesStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Total Revenue</p>
              <p className="text-2xl font-bold text-orange-900">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-xs text-orange-600 mt-1">↑+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalOrders}</p>
              <p className="text-xs text-blue-600 mt-1">{stats.deliveredOrders} delivered</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pendingOrders}</p>
              <p className="text-xs text-yellow-600 mt-1">Need attention</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Customers</p>
              <p className="text-2xl font-bold text-green-900">{stats.totalCustomers}</p>
              <p className="text-xs text-green-600 mt-1">Active accounts</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
