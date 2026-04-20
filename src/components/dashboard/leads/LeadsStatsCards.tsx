import { Card, CardContent } from "@/components/ui/Card"
import { Users } from "lucide-react"
import { LEAD_STAT_CARDS } from "@/constants/leads"
import type { LeadStats } from "@/types/leads.types"

interface LeadsStatsCardsProps {
  stats: LeadStats
}

export function LeadsStatsCards({ stats }: LeadsStatsCardsProps) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {LEAD_STAT_CARDS.map(card => (
          <Card key={card.key} className={`bg-gradient-to-br ${card.gradient} ${card.borderColor}`}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className={`text-sm font-medium ${card.textColor}`}>{card.label}</p>
                <p className={`text-xl font-bold ${card.valueColor}`}>
                  {stats[card.key as keyof LeadStats]}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Value Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-green-600">Total Pipeline Value</p>
              <p className="text-3xl font-bold text-green-900">
                ${stats.totalValue.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">Across all leads</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
