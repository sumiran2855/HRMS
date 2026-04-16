"use client"

import { LEGEND_KEYS, ATTENDANCE_STATUS_MAP } from "@/constants/attendance"

export function AttendanceLegend() {
  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Legend</h3>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {LEGEND_KEYS.map((key) => {
          const item = ATTENDANCE_STATUS_MAP[key]
          return (
            <div key={key} className="flex items-center gap-2.5 group">
              <div className={`w-3 h-3 rounded-full ${item.dotColor} ring-2 ring-offset-1 ring-transparent group-hover:ring-current ${item.color} transition-all`} />
              <div>
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                <span className="text-xs text-slate-400 ml-1.5 hidden sm:inline">— {item.description}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
