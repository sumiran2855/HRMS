"use client"

import { Calendar } from "lucide-react"
import { LEAVE_STATUS_BADGE_MAP } from "@/constants/leave-management"
import type { LeaveRequest } from "@/types/leave.types"

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

interface LeaveTableProps {
  rows: LeaveRequest[]
}

function StatusBadge({ status }: { status: string }) {
  const c = LEAVE_STATUS_BADGE_MAP[status] ?? LEAVE_STATUS_BADGE_MAP.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${c.bg} ${c.text} ${c.border} ${c.dark}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}

export default function LeaveTable({ rows }: LeaveTableProps) {
  if (!rows.length) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Calendar className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="text-base font-semibold text-foreground">No leave requests found</div>
        <div className="text-sm text-muted-foreground mt-1">Try adjusting filters or apply a new leave.</div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-slate-800">
            {["Type", "Duration", "Days", "Reason", "Status", "Applied"].map((h) => (
              <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {rows.map((r) => (
            <tr
              key={r.id}
              className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/25">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{r.type}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
                {fmt(r.startDate)} – {fmt(r.endDate)}
              </td>
              <td className="px-5 py-4">
                <span className="text-sm font-bold text-foreground">{r.days}d</span>
              </td>
              <td className="px-5 py-4 text-sm text-muted-foreground max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                {r.reason}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={r.status} />
              </td>
              <td className="px-5 py-4 text-sm text-slate-400 whitespace-nowrap">
                {fmt(r.appliedDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
