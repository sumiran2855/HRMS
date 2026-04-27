import React, { useState } from "react"
import { ChevronDown, MessageSquare } from "lucide-react"
import { Trainee, Mentor } from "@/types/training.types"
import { SKILLS_POOL } from "@/constants/training"
import { Avatar, StatusBadge, ProgressBar, StarRating, SkillTag } from "./TrainingHelpers"
import { overallStatus, overallProgress } from "@/hooks/training/useTraining"

interface Props {
  trainee: Trainee
  mentor?: Mentor
  onFeedback: (t: Trainee) => void
  onUpdateProgress: (tid: string, sid: string, val: number) => void
}

export default function TraineeCard({ trainee, mentor, onFeedback, onUpdateProgress }: Props) {
  const [expanded, setExpanded] = useState(false)
  const status = overallStatus(trainee.skills)
  const prog = overallProgress(trainee.skills)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 flex items-center gap-3 cursor-pointer" onClick={() => setExpanded((prev) => !prev)}>
        <Avatar initials={trainee.avatar} id={trainee.id} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-900">{trainee.name}</span>
            <StatusBadge status={status} />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {trainee.role} · {trainee.department}
            {mentor && (
              <>
                {" "}· Mentor: <span className="text-indigo-600 font-medium">{mentor.name}</span>
              </>
            )}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <ProgressBar value={prog} color={status === "completed" ? "#10b981" : "#6366f1"} />
            <span className="text-xs text-slate-500 min-w-8">{prog}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFeedback(trainee)
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-600 border border-slate-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Feedback
          </button>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-100">
          <div className="mt-4 mb-4">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 mb-2.5">Skill Progress</div>
            <div className="space-y-2.5">
              {trainee.skills.map((skillProgress) => {
                const skill = SKILLS_POOL.find((item) => item.id === skillProgress.skillId)
                if (!skill) return null

                return (
                  <div key={skillProgress.skillId} className="flex items-center gap-3">
                    <SkillTag name={skill.name} color={skill.color} />
                    <div className="flex-1">
                      <ProgressBar
                        value={skillProgress.progress}
                        color={skillProgress.status === "completed" ? "#10b981" : skill.color}
                      />
                    </div>
                    <span className="text-xs text-slate-500 min-w-8">{skillProgress.progress}%</span>
                    <StatusBadge status={skillProgress.status} />
                    {skillProgress.status !== "completed" && (
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={skillProgress.progress}
                        onChange={(e) => onUpdateProgress(trainee.id, skillProgress.skillId, Number(e.target.value))}
                        className="w-20 accent-indigo-600"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {trainee.feedback.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 mb-2.5">Mentor Feedback</div>
              <div className="space-y-2">
                {trainee.feedback.map((feedback) => (
                  <div key={feedback.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-slate-900">{feedback.mentorName}</span>
                      <div className="flex items-center gap-2">
                        <StarRating rating={feedback.rating} />
                        <span className="text-[11px] text-slate-400">{feedback.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-5">{feedback.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
