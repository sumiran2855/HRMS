import { Calendar, Sparkles, TrendingUp, Gift, type LucideIcon } from "lucide-react"
import type { HolidayStats } from "@/types/holiday.types"
import { HOLIDAY_STAT_CARDS } from "@/constants/holidays"

const ICON_MAP: Record<string, LucideIcon> = {
  Calendar,
  Sparkles,
  TrendingUp,
  Gift,
}

interface HolidayStatsCardsProps {
  stats: HolidayStats
}

export function HolidayStatsCards({ stats }: HolidayStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {HOLIDAY_STAT_CARDS.map((card) => {
        const Icon = ICON_MAP[card.icon]
        return (
          <div
            key={card.key}
            className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg ${card.shadow}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className={`text-xs font-semibold ${card.badgeText} ${card.badgeBg} px-2 py-1 rounded-lg`}>
                {card.badgeLabel}
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats[card.key]}</div>
            <div className="text-sm text-muted-foreground">{card.label}</div>
          </div>
        )
      })}
    </div>
  )
}
