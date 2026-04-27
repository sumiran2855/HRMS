import React from "react"
import { Trainee, Mentor } from "@/types/training.types"
import { SKILLS_POOL } from "@/constants/training"
import { Avatar, ProgressBar, SkillTag, cardClass } from "./TrainingHelpers"
import { overallStatus, overallProgress } from "@/hooks/training/useTraining"

interface Props {
  trainees: Trainee[]
  mentors: Mentor[]
  getMentor: (id: string) => Mentor | undefined
}

export default function TrainingOverview({ trainees, mentors, getMentor }: Props) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div className={`${cardClass} p-5`}>
        <h3 className="text-base font-semibold text-slate-900 mb-4">Trainee Snapshot</h3>
        <div className="space-y-3">
          {trainees.slice(0, 5).map((trainee) => {
            const mentor = getMentor(trainee.mentorId)
            const progress = overallProgress(trainee.skills)

            return (
              <div key={trainee.id} className="flex items-center gap-3">
                <Avatar initials={trainee.avatar} id={trainee.id} size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{trainee.name}</p>
                  <p className="text-xs text-slate-400">{mentor?.name ?? "—"}</p>
                  <ProgressBar value={progress} color={overallStatus(trainee.skills) === "completed" ? "#10b981" : "#6366f1"} />
                </div>
                <span className="text-xs text-slate-500 min-w-8">{progress}%</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className={`${cardClass} p-5`}>
        <h3 className="text-base font-semibold text-slate-900 mb-4">Active Mentors</h3>
        <div className="space-y-3">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <Avatar initials={mentor.avatar} id={mentor.id} size={36} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{mentor.name}</p>
                <p className="text-xs text-slate-500">{mentor.role} · {mentor.assignedTrainees.length} trainees</p>
              </div>
              <div className="flex gap-1.5 flex-wrap max-w-44 justify-end">
                {mentor.expertise.slice(0, 2).map((expertise) => {
                  const skill = SKILLS_POOL.find((item) => item.name === expertise)
                  return skill ? <SkillTag key={expertise} name={expertise} color={skill.color} /> : null
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
