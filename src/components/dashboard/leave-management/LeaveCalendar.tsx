"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { LEAVE_STATUS_BADGE_MAP, DAY_LABELS } from "@/constants/leave-management"
import type { LeaveRequest } from "@/types/leave.types"

function StatusBadge({ status }: { status: string }) {
  const c = LEAVE_STATUS_BADGE_MAP[status] ?? LEAVE_STATUS_BADGE_MAP.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-semibold border ${c.bg} ${c.text} ${c.border} ${c.dark}`}>
      <span className={`w-1 h-1 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-[34px] h-[34px] rounded-[10px] bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
      {initials}
    </div>
  )
}

interface LeaveCalendarProps {
  monthLabel: string
  prevMonth: () => void
  nextMonth: () => void
  calendarCells: (number | null)[]
  leaveDays: Set<number>
  selectedMonth: Date
  allLeaves: LeaveRequest[]
}

export default function LeaveCalendar({
  monthLabel,
  prevMonth,
  nextMonth,
  calendarCells,
  leaveDays,
  selectedMonth,
  allLeaves,
}: LeaveCalendarProps) {
  const calMonth = selectedMonth.getMonth()
  const calYear = selectedMonth.getFullYear()
  const today = new Date()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
      {/* Calendar grid */}
      <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="text-base font-bold text-foreground">{monthLabel}</div>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-[11px] font-bold text-muted-foreground py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 gap-1">
          {calendarCells.map((day, i) => {
            if (!day) return <div key={i} />
            const isToday = today.getDate() === day && today.getMonth() === calMonth && today.getFullYear() === calYear
            const hasLeave = leaveDays.has(day)
            return (
              <div
                key={i}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative cursor-default border-[1.5px] transition-colors
                  ${isToday
                    ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-bold border-transparent shadow-lg shadow-indigo-500/25"
                    : hasLeave
                      ? "bg-indigo-50 dark:bg-indigo-950/30 text-primary font-semibold border-indigo-200 dark:border-indigo-800"
                      : "text-slate-700 dark:text-slate-300 font-medium border-transparent"
                  }`}
              >
                {day}
                {hasLeave && !isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary absolute bottom-1" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-4">
        {/* Upcoming Leaves */}
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-5">
          <div className="text-sm font-bold text-foreground mb-3.5">Upcoming Leaves</div>
          <div className="flex flex-col gap-2.5">
            {allLeaves
              .filter((r) => r.status !== "rejected")
              .slice(0, 5)
              .map((r) => (
                <div key={r.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/30">
                  <Avatar initials={r.avatar} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{r.employeeName}</div>
                    <div className="text-xs text-muted-foreground">{r.type} · {r.days}d</div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-5">
          <div className="text-sm font-bold text-foreground mb-3.5">Legend</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded bg-indigo-50 dark:bg-indigo-950/30 border-[1.5px] border-primary" />
              <span className="text-sm text-muted-foreground">Leave days</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-indigo-500 to-indigo-600 border-[1.5px] border-primary" />
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
