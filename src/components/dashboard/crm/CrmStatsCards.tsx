"use client"

import {
  Users,
  Handshake,
  Target,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { CRM_STAT_CARDS, CRM_STATS } from "@/constants/crm-dashboard"

const ICON_MAP: Record<string, React.ElementType> = { Users, Handshake, Target, DollarSign }

function TrendIcon({ value, previous }: { value: number; previous: number }) {
  if (value > previous) return <TrendingUp className="w-4 h-4 text-green-600" />
  if (value < previous) return <TrendingDown className="w-4 h-4 text-red-600" />
  return <Activity className="w-4 h-4 text-gray-600" />
}

interface CrmStatsCardsProps {
  formatCurrency: (amount: number) => string
}

export default function CrmStatsCards({ formatCurrency }: CrmStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {CRM_STAT_CARDS.map((card) => {
        const Icon = ICON_MAP[card.icon] ?? Users
        const value = CRM_STATS[card.statKey]
        const subValue = CRM_STATS[card.subStatKey]
        const displayValue = card.statKey === "revenueThisMonth" ? formatCurrency(value) : card.statKey === "conversionRate" ? `${value}%` : value
        const displaySubValue = card.subSuffix === "currency"
          ? formatCurrency(subValue)
          : card.subSuffix === "days"
            ? `${subValue} days`
            : subValue

        return (
          <Card key={card.statKey} className={`bg-gradient-to-br ${card.gradient} ${card.borderColor} hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${card.iconColor}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs sm:text-sm font-medium ${card.textColor} truncate`}>{card.label}</p>
                    <p className="text-xl sm:text-3xl font-bold text-slate-900 truncate">{displayValue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <TrendIcon value={value} previous={card.previousValue} />
                  <span className="text-xs text-green-600 hidden sm:inline">{card.trendText}</span>
                </div>
              </div>
              <div className={`pt-3 sm:pt-4 border-t ${card.borderColor}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-xs sm:text-sm ${card.textColor} truncate`}>{card.subLabel}</span>
                  <span className={`text-sm sm:text-lg font-bold ${card.textColor} truncate`}>{displaySubValue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
