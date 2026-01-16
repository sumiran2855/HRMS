"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/components/utils"
import { MoreVertical, Calendar, Clock, ChevronRight } from "lucide-react"

const meetings = [
  { title: "Project Kickoff", date: "June 1, 2024", time: "10:00 AM" },
  { title: "Weekly Team Sync", date: "June 5, 2024", time: "02:00 PM" },
  { title: "Client Presentation", date: "June 10, 2024", time: "11:00 AM" },
  { title: "Monthly Review", date: "June 15, 2024", time: "03:00 PM" },
  { title: "Weekly Review", date: "June 20, 2024", time: "11:00 AM" },
  { title: "Yearly Meeting", date: "June 22, 2024", time: "09:00 AM" },
  { title: "Strategy Planning", date: "June 28, 2024", time: "02:00 PM" },
  { title: "Project Review", date: "July 5, 2024", time: "10:00 AM" },
  { title: "Team Building", date: "July 10, 2024", time: "02:00 PM" },
]

export function MeetingSchedule({ className }: { className?: string }) {
  return (
    <Card className={cn("bg-white border border-slate-200 shadow-lg overflow-hidden flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4 px-4 md:px-6 pt-6 space-y-0 border-b border-slate-200">
        <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
          Meeting Schedule
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
            <table className="min-w-[640px] w-full">
              <thead className="sticky top-0 z-10 bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Meeting Title
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {meetings.map((meeting, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-all duration-150 cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{meeting.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{meeting.time}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {meeting.title}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 transition-all" />
                      </div>
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
              {meetings.map((meeting, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-semibold text-slate-800 leading-tight pr-2">
                      {meeting.title}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{meeting.time}</span>
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
