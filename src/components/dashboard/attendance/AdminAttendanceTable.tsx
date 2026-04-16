"use client"

import { Calendar } from "lucide-react"
import { getStatusConfig } from "@/constants/attendance"
import { AttendanceEmployeeRow } from "@/types/attendance.types"
import { getInitials } from "@/utils/formatters"

interface AdminAttendanceTableProps {
  data: AttendanceEmployeeRow[]
  daysInMonth: number
  currentMonth?: Date
}

function getDayLabel(day: number, currentMonth?: Date): { num: string; weekday: string; isWeekend: boolean } {
  const month = currentMonth || new Date()
  const date = new Date(month.getFullYear(), month.getMonth(), day)
  const dayOfWeek = date.getDay()
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0)
  return {
    num: String(day),
    weekday,
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
  }
}

export function AdminAttendanceTable({ data, daysInMonth, currentMonth }: AdminAttendanceTableProps) {
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30">
            <th className="text-left py-4 px-5 font-semibold text-slate-700 sticky left-0 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30 z-20 min-w-[220px] border-b border-slate-200">
              Employee
            </th>
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = getDayLabel(i + 1, currentMonth)
              return (
                <th
                  key={i + 1}
                  className={`text-center py-3 px-1 min-w-[36px] border-b border-slate-200 ${
                    day.isWeekend ? "bg-slate-100/80 dark:bg-slate-700/30" : ""
                  }`}
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <span className={`text-[10px] font-medium ${day.isWeekend ? "text-red-400" : "text-slate-400"}`}>
                      {day.weekday}
                    </span>
                    <span className={`text-xs font-semibold ${day.isWeekend ? "text-red-500" : "text-slate-600"}`}>
                      {day.num}
                    </span>
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((employee, rowIdx) => (
            <tr
              key={employee.id}
              className={`group transition-colors ${
                rowIdx % 2 === 0
                  ? "bg-white dark:bg-slate-900/20"
                  : "bg-slate-50/50 dark:bg-slate-800/10"
              } hover:bg-blue-50/50 dark:hover:bg-blue-900/10`}
            >
              <td className={`py-3 px-5 sticky left-0 z-10 border-b border-slate-100 ${
                rowIdx % 2 === 0
                  ? "bg-white dark:bg-slate-900/20"
                  : "bg-slate-50/50 dark:bg-slate-800/10"
              } group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10 transition-colors`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm shadow-blue-500/20">
                    <span className="text-[11px] font-bold text-white">
                      {getInitials(employee.name)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm leading-tight">{employee.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{employee.employeeId}</p>
                  </div>
                </div>
              </td>
              {employee.attendance.map((status, index) => {
                const config = getStatusConfig(status)
                const day = getDayLabel(index + 1, currentMonth)
                return (
                  <td
                    key={index}
                    className={`text-center py-2 px-1 border-b border-slate-100 ${
                      day.isWeekend ? "bg-slate-50/60 dark:bg-slate-700/10" : ""
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg ${config.bgColor} flex items-center justify-center mx-auto transition-transform hover:scale-110 cursor-default`}
                      title={`${config.label} — Day ${index + 1}`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${config.dotColor}`} />
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No attendance records found</h3>
          <p className="text-sm text-slate-500">No attendance data available for the selected criteria.</p>
        </div>
      )}
    </div>
  )
}
