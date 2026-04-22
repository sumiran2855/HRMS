"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { BarChart3 } from "lucide-react"

export default function ProcurementAnalytics() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Procurement Analytics</h3>
        <p className="text-slate-500 mb-4">Generate comprehensive procurement reports and analytics.</p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" className="cursor-pointer">Spend Analysis</Button>
          <Button variant="outline" className="cursor-pointer">Vendor Performance</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">Cost Savings Report</Button>
        </div>
      </CardContent>
    </Card>
  )
}
