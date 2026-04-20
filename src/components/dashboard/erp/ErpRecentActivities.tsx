import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import {
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  Truck,
  Settings,
  FileText,
  Clock,
} from "lucide-react"
import type { ErpActivity } from "@/types/erp.types"

const ACTIVITY_ICON_MAP: Record<string, React.ReactNode> = {
  inventory: <Package className="w-4 h-4 text-orange-600" />,
  finance: <DollarSign className="w-4 h-4 text-green-600" />,
  manufacturing: <Settings className="w-4 h-4 text-red-600" />,
  sales: <ShoppingCart className="w-4 h-4 text-blue-600" />,
  hr: <Users className="w-4 h-4 text-purple-600" />,
  procurement: <Truck className="w-4 h-4 text-indigo-600" />,
}

interface ErpRecentActivitiesProps {
  activities: ErpActivity[]
}

export function ErpRecentActivities({ activities }: ErpRecentActivitiesProps) {
  return (
    <Card className="border-2 border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Recent Activities
          </CardTitle>
          <Button variant="outline" className="cursor-pointer">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
          <div className="space-y-4 pr-2">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-200 hover:border-slate-300">
                <div className="flex-shrink-0 mt-1">
                  {ACTIVITY_ICON_MAP[activity.type] || <FileText className="w-4 h-4 text-gray-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{activity.description}</p>
                      <p className="text-xs text-slate-500">by {activity.user}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.priority === "high" && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border-red-200">
                          High Priority
                        </span>
                      )}
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-100 rounded-lg p-2">
                    {activity.details}
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
