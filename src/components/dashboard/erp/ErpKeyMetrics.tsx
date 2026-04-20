import { Card, CardContent } from "@/components/ui/Card"
import { Package, DollarSign, Users, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { KEY_METRIC_CARDS } from "@/constants/erp"
import type { ErpStats } from "@/types/erp.types"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Package,
  DollarSign,
  Users,
  TrendingUp,
}

interface ErpKeyMetricsProps {
  stats: ErpStats
  formatCurrency: (amount: number) => string
}

function TrendIcon({ value, previous }: { value: number; previous: number }) {
  if (value > previous) return <TrendingUp className="w-4 h-4 text-green-600" />
  if (value < previous) return <TrendingDown className="w-4 h-4 text-red-600" />
  return <Activity className="w-4 h-4 text-gray-600" />
}

export function ErpKeyMetrics({ stats, formatCurrency }: ErpKeyMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {KEY_METRIC_CARDS.map(card => {
        const Icon = ICON_MAP[card.icon]
        const rawValue = stats[card.statKey]
        const displayValue = card.formatValue === "currency"
          ? formatCurrency(rawValue)
          : `${rawValue}${card.valueSuffix || ""}`

        const subValue = card.subFixedValue
          ?? `${card.subStatKey ? stats[card.subStatKey] : ""}${card.subSuffix || ""}`

        return (
          <Card key={card.label} className={`bg-gradient-to-br ${card.gradient} ${card.borderColor} hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    {Icon && <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${card.textColor}`} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs sm:text-sm font-medium ${card.textColor} truncate`}>{card.label}</p>
                    <p className={`text-xl sm:text-3xl font-bold ${card.valueColor} truncate`}>{displayValue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <TrendIcon value={rawValue} previous={card.trendPrevious} />
                  <span className="text-xs text-green-600 hidden sm:inline">{card.trendLabel}</span>
                </div>
              </div>
              <div className={`pt-3 sm:pt-4 border-t ${card.subBorder}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-xs sm:text-sm ${card.textColor}`}>{card.subLabel}</span>
                  <span className={`text-sm sm:text-lg font-bold ${card.textColor}`}>{subValue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
