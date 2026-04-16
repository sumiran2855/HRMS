"use client"

import { Umbrella, Heart, User, Briefcase, ArrowUpRight } from "lucide-react"
import { LEAVE_BALANCES } from "@/constants/leave-management"

const ICON_MAP: Record<string, React.ElementType> = { Umbrella, Heart, User, Briefcase }

function pct(used: number, total: number) {
  return total > 0 ? Math.round((used / total) * 100) : 0
}

export default function LeaveBalanceCards() {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-base font-bold text-foreground">Your Leave Balances</div>
          <div className="text-xs text-muted-foreground mt-0.5">Remaining days per category</div>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
          View all <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LEAVE_BALANCES.map((b) => {
          const Icon = ICON_MAP[b.icon] ?? Umbrella
          const p = pct(b.used, b.total)
          return (
            <div
              key={b.type}
              className="group rounded-2xl border border-slate-200/50 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={`h-1.5 bg-gradient-to-r ${b.gradient}`} />
              <div className="p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`p-2 bg-gradient-to-br ${b.iconGradient} rounded-xl shadow-lg ${b.shadow}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{b.type}</span>
                </div>

                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="text-3xl font-extrabold text-foreground leading-none">{b.remaining}</div>
                    <div className="text-xs text-muted-foreground mt-1">days left</div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div>{b.used} used</div>
                    <div className="text-slate-400">of {b.total}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className={`h-1.5 rounded-full bg-${b.color}-100 dark:bg-${b.color}-950/30 overflow-hidden`}>
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${b.gradient} transition-all duration-500`}
                    style={{ width: `${p}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">{p}% used</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
