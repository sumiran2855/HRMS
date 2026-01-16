"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/components/utils"
import { MoreVertical } from "lucide-react"
import { activities, getIconBackground } from "@/types/dashboard"

export function ActivitySection({ className }: { className?: string }) {
  return (
    <Card className={cn("bg-white border border-slate-200 shadow-lg overflow-hidden flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4 px-4 md:px-6 pt-6 space-y-0 border-b border-slate-200">
        <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
          Recent Activity
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-black/80 hover:text-black hover:bg-black/20 h-9 w-9 p-0 rounded-xl cursor-pointer"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="p-0 flex-1 min-h-0">
        <div className="h-full overflow-auto">
          <div className="p-4 space-y-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div
                  key={index}
                  className={cn(
                    "relative rounded-xl border p-3 transition-all duration-200 hover:shadow-lg cursor-pointer group bg-white",
                    "border-slate-100 hover:border-slate-200 shadow-sm"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md",
                      getIconBackground(activity.type)
                    )}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {activity.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {activity.time}
                        </p>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0 mt-1",
                      activity.statusColor
                    )} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
