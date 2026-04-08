"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Star, Calendar, CheckCircle, AlertCircle, Clock, XCircle, Plane } from "lucide-react"

export function AttendanceLegend() {
  const legendItems = [
    {
      icon: Star,
      label: "Holiday",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Company holidays"
    },
    {
      icon: Calendar,
      label: "Day Off", 
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      description: "Weekly off days"
    },
    {
      icon: CheckCircle,
      label: "Present",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Present on time"
    },
    {
      icon: AlertCircle,
      label: "Half Day",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Half day attendance"
    },
    {
      icon: Clock,
      label: "Late",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Late arrival"
    },
    {
      icon: XCircle,
      label: "Absent",
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "No attendance"
    },
    {
      icon: Plane,
      label: "On Leave",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Approved leave"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Note</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {legendItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
