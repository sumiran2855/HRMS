"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/components/utils"
import { MoreVertical, Calendar, Clock, User, ChevronRight } from "lucide-react"

const leaves = [
  { employee: "Sarah Johnson", type: "Sick Leave", startDate: "June 3, 2024", endDate: "June 4, 2024", days: 2 },
  { employee: "Michael Chen", type: "Personal Leave", startDate: "June 10, 2024", endDate: "June 10, 2024", days: 1 },
  { employee: "Emily Davis", type: "Annual Leave", startDate: "June 15, 2024", endDate: "June 25, 2024", days: 8 },
  { employee: "Robert Wilson", type: "Maternity Leave", startDate: "June 20, 2024", endDate: "August 20, 2024", days: 60 },
  { employee: "Lisa Anderson", type: "Annual Leave", startDate: "June 28, 2024", endDate: "June 30, 2024", days: 3 },
  { employee: "David Brown", type: "Sick Leave", startDate: "July 5, 2024", endDate: "July 6, 2024", days: 2 },
]

export function EmployeeLeave({ className }: { className?: string }) {
  return (
    <Card className={cn("bg-white border border-slate-200 shadow-lg overflow-hidden flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4 px-4 md:px-6 pt-6 space-y-0 border-b border-slate-200">
        <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
          Employee Leave
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 h-8 w-8 p-0 rounded-full"
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
