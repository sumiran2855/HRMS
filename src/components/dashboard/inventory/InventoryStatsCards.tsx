import { Card, CardContent } from "@/components/ui/Card"
import { Package, AlertTriangle, Truck, BarChart3 } from "lucide-react"
import { STAT_CARDS } from "@/constants/inventory"
import type { InventoryStats } from "@/types/inventory.types"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Package,
  AlertTriangle,
  Truck,
  BarChart3,
}

interface InventoryStatsCardsProps {
  stats: InventoryStats
  formatCurrency: (amount: number) => string
}

export function InventoryStatsCards({ stats, formatCurrency }: InventoryStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_CARDS.map((card) => {
        const Icon = ICON_MAP[card.icon]
        const value = stats[card.statKey]
        const displayValue = card.statKey === "totalQuantity" ? value.toLocaleString() : value

        return (
          <Card
            key={card.label}
            className={`bg-gradient-to-br ${card.gradient} ${card.border} hover:shadow-lg transition-all duration-300`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${card.textColor}`}>{card.label}</p>
                  <p className={`text-2xl font-bold ${card.valueColor} mt-1`}>{displayValue}</p>
                  <p className={`text-xs ${card.textColor} mt-2`}>
                    {card.subType === "currency" && card.subStatKey
                      ? `${card.subLabel}: ${formatCurrency(stats[card.subStatKey])}`
                      : card.subLabel}
                  </p>
                </div>
                <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                  {Icon && <Icon className={`w-6 h-6 ${card.textColor}`} />}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
