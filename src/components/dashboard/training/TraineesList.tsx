import React from "react"
import { SearchX } from "lucide-react"
import { Trainee, Mentor } from "@/types/training.types"
import TraineeCard from "./TraineeCard"

interface Props {
  filtered: Trainee[]
  getMentor: (id: string) => Mentor | undefined
  onFeedback: (t: Trainee) => void
  onUpdateProgress: (tid: string, sid: string, val: number) => void
}

export default function TraineesList({ filtered, getMentor, onFeedback, onUpdateProgress }: Props) {
  if (filtered.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <SearchX className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No trainees found</h3>
            <p className="text-slate-500 text-sm">Try changing filters to find matching trainees.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filtered.map((trainee) => (
        <TraineeCard
          key={trainee.id}
          trainee={trainee}
          mentor={getMentor(trainee.mentorId)}
          onFeedback={onFeedback}
          onUpdateProgress={onUpdateProgress}
        />
      ))}
    </div>
  )
}
