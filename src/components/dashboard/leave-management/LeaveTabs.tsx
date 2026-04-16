"use client"

import { TrendingUp, Plus, FileText, Check, Calendar } from "lucide-react"
import { LEAVE_TABS } from "@/constants/leave-management"

const ICON_MAP: Record<string, React.ElementType> = { TrendingUp, Plus, FileText, Check, Calendar }

interface LeaveTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function LeaveTabs({ activeTab, setActiveTab }: LeaveTabsProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none mb-6 overflow-hidden">
      <div className="flex">
        {LEAVE_TABS.map((tab) => {
          const Icon = ICON_MAP[tab.icon] ?? TrendingUp
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-5 py-4 text-sm font-medium border-b-[2.5px] transition-all duration-200 whitespace-nowrap
                ${active
                  ? "text-primary border-primary font-bold"
                  : "text-muted-foreground border-transparent hover:text-primary/80 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
