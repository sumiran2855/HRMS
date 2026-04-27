import React from "react"
import { TrendingUp, Users, Award, BookOpen } from "lucide-react"
import { cardClass } from "./TrainingHelpers"

const TABS = [
  { id: "overview", label: "Overview", Icon: TrendingUp },
  { id: "trainees", label: "Trainees", Icon: Users },
  { id: "mentors", label: "Mentor Dashboard", Icon: Award },
  { id: "my-view", label: "Trainee View", Icon: BookOpen },
]

interface Props {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TrainingTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className={`${cardClass} overflow-hidden`}>
      <div className="flex overflow-x-auto">
        {TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 min-w-fit px-5 py-3.5 inline-flex items-center justify-center gap-2 text-sm transition-colors border-b-2 ${
                active
                  ? "font-semibold text-indigo-600 border-indigo-600 bg-indigo-50/40"
                  : "font-medium text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
