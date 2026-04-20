"use client"

import { Handshake, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { TOP_DEALS, STAGE_COLORS } from "@/constants/crm-dashboard"

interface CrmTopDealsProps {
  formatCurrency: (amount: number) => string
}

export default function CrmTopDeals({ formatCurrency }: CrmTopDealsProps) {
  return (
    <Card className="border-2 border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Handshake className="w-5 h-5 text-green-600" />
            Top Deals
          </CardTitle>
          <Button variant="outline" className="cursor-pointer">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
          <div className="space-y-4 pr-2">
            {TOP_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-200 hover:border-slate-300"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{deal.company}</p>
                      <p className="text-xs text-slate-500">Contact: {deal.contact}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{formatCurrency(deal.value)}</p>
                      <p className="text-xs text-slate-500">{deal.daysInPipeline} days in pipeline</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${STAGE_COLORS[deal.stage] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
                      {deal.stage}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-slate-600">{deal.probability}% probability</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
