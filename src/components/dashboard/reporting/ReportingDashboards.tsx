"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { BarChart3, DollarSign, Users, Package } from "lucide-react"

const DASHBOARDS = [
  {
    title: "Executive Dashboard",
    description: "High-level business metrics and KPIs",
    icon: BarChart3,
    gradient: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    btnClass: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    title: "Financial Dashboard",
    description: "Revenue, expenses, and profit analysis",
    icon: DollarSign,
    gradient: "from-green-50 to-emerald-50",
    border: "border-green-200",
    bg: "bg-green-100",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    btnClass: "bg-green-600 hover:bg-green-700",
  },
  {
    title: "Operations Dashboard",
    description: "Production, inventory, and supply chain metrics",
    icon: Users,
    gradient: "from-purple-50 to-pink-50",
    border: "border-purple-200",
    bg: "bg-purple-100",
    iconColor: "text-purple-600",
    titleColor: "text-purple-900",
    btnClass: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Sales Dashboard",
    description: "Sales performance, customer analytics, and market insights",
    icon: Package,
    gradient: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    bg: "bg-orange-100",
    iconColor: "text-orange-600",
    titleColor: "text-orange-900",
    btnClass: "bg-orange-600 hover:bg-orange-700",
  },
]

export default function ReportingDashboards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {DASHBOARDS.map(({ title, description, icon: Icon, gradient, border, bg, iconColor, titleColor, btnClass }) => (
        <Card key={title} className={`bg-gradient-to-br ${gradient} ${border}`}>
          <CardContent className="p-6 text-center">
            <div className={`w-16 h-16 ${bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-8 h-8 ${iconColor}`} />
            </div>
            <h3 className={`text-lg font-semibold ${titleColor} mb-2`}>{title}</h3>
            <p className="text-sm text-slate-500 mb-4">{description}</p>
            <Button className={`${btnClass} text-white cursor-pointer`}>
              Open Dashboard
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
