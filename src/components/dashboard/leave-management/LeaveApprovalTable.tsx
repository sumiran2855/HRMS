"use client"

import { useState, useEffect } from "react"
import { Check, X, MoreHorizontal, CheckCircle } from "lucide-react"
import { LEAVE_STATUS_BADGE_MAP } from "@/constants/leave-management"
import type { LeaveRequest } from "@/types/leave.types"

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

function StatusBadge({ status }: { status: string }) {
  const c = LEAVE_STATUS_BADGE_MAP[status] ?? LEAVE_STATUS_BADGE_MAP.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${c.bg} ${c.text} ${c.border} ${c.dark}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-9 h-9 rounded-[10px] bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800 flex items-center justify-center text-xs font-bold text-primary shrink-0 tracking-tight">
      {initials}
    </div>
  )
}

interface LeaveApprovalTableProps {
  rows: LeaveRequest[]
}

export default function LeaveApprovalTable({ rows }: LeaveApprovalTableProps) {
  const [list, setList] = useState(rows)

  useEffect(() => {
    setList(rows)
  }, [rows])

  const approve = (id: string) => setList((l) => l.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r)))
  const reject = (id: string) => setList((l) => l.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r)))

  if (!list.length) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="text-base font-semibold text-foreground">No requests found</div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-slate-800">
            {["Employee", "Type", "Duration", "Reason", "Status", "Actions"].map((h) => (
              <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {list.map((r) => (
            <tr
              key={r.id}
              className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={r.avatar} />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{r.employeeName}</div>
                    <div className="text-xs text-muted-foreground">{r.employeeId}</div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">{r.type}</td>
              <td className="px-5 py-4">
                <div className="text-sm text-muted-foreground whitespace-nowrap">{fmt(r.startDate)} – {fmt(r.endDate)}</div>
                <div className="text-xs text-slate-400">{r.days} days</div>
              </td>
              <td className="px-5 py-4 text-sm text-muted-foreground max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
                {r.reason}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={r.status} />
              </td>
              <td className="px-5 py-4">
                {r.status === "pending" ? (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => approve(r.id)}
                      title="Approve"
                      className="w-8 h-8 rounded-lg border-[1.5px] border-emerald-500 bg-white dark:bg-slate-900 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-200"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => reject(r.id)}
                      title="Reject"
                      className="w-8 h-8 rounded-lg border-[1.5px] border-red-500 bg-white dark:bg-slate-900 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-lg border-[1.5px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-muted-foreground flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-slate-300 dark:text-slate-600">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
