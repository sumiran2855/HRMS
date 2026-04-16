"use client"

import {
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react"
import { LEAVE_STAT_CARDS } from "@/constants/leave-management"
import type { LeaveStats } from "@/types/leave.types"

const ICON_MAP: Record<string, React.ElementType> = { Clock, CheckCircle, XCircle, Calendar }

interface LeaveStatsCardsProps {
  stats: LeaveStats
}

export default function LeaveStatsCards({ stats }: LeaveStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {LEAVE_STAT_CARDS.map((card) => {
        const Icon = ICON_MAP[card.icon] ?? Clock
        return (
          <div
            key={card.key}
            className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300"
          >
            {/* Decorative circle */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-slate-100 to-transparent dark:from-slate-800/50 rounded-full opacity-50" />

            <div className="relative flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg ${card.shadow}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-semibold ${card.badgeText} ${card.badgeBg} px-2 py-1 rounded-lg`}>
                {card.badgeLabel}
              </span>
            </div>

            <div className="relative">
              <div className="text-3xl font-bold text-foreground">{stats[card.key]}</div>
              <div className="text-sm text-muted-foreground mt-1">{card.label}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
