"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Users, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react"

interface AttendanceStatsProps {
  stats: {
    total: number
    present: number
    absent: number
    late: number
    onTime: number
  }
}

export function AttendanceStats({ stats }: AttendanceStatsProps) {
  const presentRate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0
  const absentRate = stats.total > 0 ? Math.round((stats.absent / stats.total) * 100) : 0
  const lateRate = stats.total > 0 ? Math.round((stats.late / stats.total) * 100) : 0

  const statCards = [
    {
      title: "Total Employees",
      value: stats.total,
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Present Today",
      value: stats.present,
      subtitle: `${presentRate}%`,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      title: "Absent Today",
      value: stats.absent,
      subtitle: `${absentRate}%`,
      icon: XCircle,
      color: "from-red-500 to-rose-600",
      bgColor: "from-red-50 to-rose-50",
      borderColor: "border-red-200"
    },
    {
      title: "Late Arrivals",
      value: stats.late,
      subtitle: `${lateRate}%`,
      icon: Clock,
      color: "from-yellow-500 to-amber-600",
      bgColor: "from-yellow-50 to-amber-50",
      borderColor: "border-yellow-200"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className={`bg-gradient-to-br ${card.bgColor} border ${card.borderColor} overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">{card.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                    {card.subtitle && (
                      <p className="text-sm font-semibold text-slate-600">{card.subtitle}</p>
                    )}
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
