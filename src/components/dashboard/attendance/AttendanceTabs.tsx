"use client"

import { cn } from "@/components/utils"

interface Tab {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface AttendanceTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function AttendanceTabs({ tabs, activeTab, onTabChange }: AttendanceTabsProps) {
  return (
    <div className="border-b border-slate-200 bg-white rounded-t-xl overflow-hidden">
      <nav className="flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap",
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isActive && (
                <span className="ml-2 w-1 h-1 rounded-full bg-blue-500" />
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
