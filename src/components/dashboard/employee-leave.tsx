"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/components/utils"
import { MoreVertical, User, ChevronRight } from "lucide-react"
import { leaves } from "@/types/dashboard"

export function EmployeeLeave({ className }: { className?: string }) {
  return (
    <Card className={cn("bg-white border border-slate-200 shadow-lg overflow-hidden flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4 px-4 md:px-6 pt-6 space-y-0 border-b border-slate-200">
        <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
          Absent Today
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
        <div className="hidden md:block h-full">
          <div className="h-full overflow-auto">
            <table className="min-w-[520px] w-full">
              <thead className="sticky top-0 z-10 bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Leave Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {leaves.map((leave, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-all duration-150 cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {leave.employee}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-600">{leave.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="md:hidden h-full">
          <div className="h-full overflow-auto">
            <div className="divide-y divide-slate-200">
              {leaves.map((leave, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <h3 className="text-base font-semibold text-slate-800 leading-tight pr-2">
                        {leave.employee}
                      </h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Type:</span> {leave.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
