import React from "react"
import { Users, Clock, CheckCircle, PlayCircle } from "lucide-react"
import { TrainingStats } from "@/types/training.types"
import { cardClass } from "./TrainingHelpers"

interface Props {
  stats: TrainingStats
}

const CARDS = [
  { key: "total", label: "Total Trainees", icon: Users, iconClass: "text-indigo-500", valueClass: "text-slate-900" },
  { key: "inProgress", label: "In Progress", icon: Clock, iconClass: "text-indigo-500", valueClass: "text-indigo-600" },
  { key: "completed", label: "Completed", icon: CheckCircle, iconClass: "text-green-500", valueClass: "text-green-600" },
  { key: "notStarted", label: "Not Started", icon: PlayCircle, iconClass: "text-yellow-500", valueClass: "text-yellow-600" },
] as const

export default function TrainingStatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {CARDS.map(({ key, label, icon: Icon, iconClass, valueClass }) => (
        <div key={key} className={`${cardClass} p-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">{label}</span>
            <Icon className={`w-4 h-4 ${iconClass}`} />
          </div>
          <p className={`text-2xl font-bold ${valueClass}`}>{stats[key]}</p>
        </div>
      ))}
    </div>
  )
}
