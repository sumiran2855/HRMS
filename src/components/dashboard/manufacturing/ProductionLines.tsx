"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Activity, Wrench } from "lucide-react"
import { ProductionLine } from "@/types/manufacturing.types"

interface ProductionLinesProps {
  productionLines: ProductionLine[]
  getLineStatusColor: (status: string) => string
}

export default function ProductionLines({ productionLines, getLineStatusColor }: ProductionLinesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Production Lines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productionLines.map((line) => (
            <div key={line.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{line.name}</h3>
                  <p className="text-sm text-slate-500">Supervisor: {line.supervisor}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getLineStatusColor(line.status)}`}>
                  {line.status === "active"
                    ? <Activity className="w-5 h-5" />
                    : <Wrench className="w-5 h-5" />
                  }
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Current Product", value: line.currentProduct ?? "Idle" },
                  { label: "Capacity", value: `${line.capacity} units/day` },
                  { label: "Efficiency", value: `${line.efficiency}%` },
                  { label: "Output Today", value: `${line.outputToday} units` },
                  { label: "Downtime", value: `${line.downtime} min today` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-sm text-slate-600">{label}:</span>
                    <span className="text-sm text-slate-900">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Quality Score:</span>
                  <span className="text-sm font-medium text-slate-900">
                    {line.qualityScore > 0 ? `${line.qualityScore} / 5.0` : "—"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
