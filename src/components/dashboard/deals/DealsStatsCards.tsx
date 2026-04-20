import { Card, CardContent } from "@/components/ui/Card"
import { Handshake, DollarSign, TrendingUp } from "lucide-react"
import { DEAL_STAT_CARDS, DEAL_PIPELINE_CARDS } from "@/constants/deals"
import type { DealStats } from "@/types/deals.types"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Handshake,
  DollarSign,
  TrendingUp,
}

interface DealsStatsCardsProps {
  stats: DealStats
}

function formatValue(key: string, stats: DealStats, format?: "count" | "currency") {
  const val = stats[key as keyof DealStats]
  if (format === "currency") return `$${((val as number) / 1000).toFixed(0)}K`
  return val
}

export function DealsStatsCards({ stats }: DealsStatsCardsProps) {
  return (
    <>
      {/* Top stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {DEAL_STAT_CARDS.map(card => {
          const Icon = ICON_MAP[card.icon]
          return (
            <Card key={card.key} className={`bg-gradient-to-br ${card.gradient} ${card.borderColor}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${card.textColor}`}>{card.label}</p>
                    <p className={`text-2xl font-bold ${card.valueColor}`}>
                      {formatValue(card.key, stats, card.format)}
                    </p>
                    <p className={`text-xs ${card.textColor} mt-1`}>{card.subtitle}</p>
                  </div>
                  <div className={`w-12 h-12 ${card.iconBg} rounded-full flex items-center justify-center`}>
                    {Icon && <Icon className={`w-6 h-6 ${card.textColor}`} />}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pipeline stages overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {DEAL_PIPELINE_CARDS.map(card => (
          <Card key={card.key} className={`bg-gradient-to-br ${card.gradient} ${card.borderColor}`}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className={`text-sm font-medium ${card.textColor}`}>{card.label}</p>
                <p className={`text-xl font-bold ${card.valueColor}`}>{stats[card.key]}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
