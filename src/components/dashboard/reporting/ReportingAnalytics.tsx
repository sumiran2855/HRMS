"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { BarChart3, PieChart, TrendingUp } from "lucide-react"

export default function ReportingAnalytics() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Advanced Analytics</h3>
        <p className="text-slate-500 mb-4">Comprehensive business intelligence and data visualization.</p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" className="cursor-pointer">
            <PieChart className="w-4 h-4 mr-2" />
            Revenue Analysis
          </Button>
          <Button variant="outline" className="cursor-pointer">
            <TrendingUp className="w-4 h-4 mr-2" />
            Growth Metrics
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            <BarChart3 className="w-4 h-4 mr-2" />
            Full Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
