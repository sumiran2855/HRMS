import React from "react"
import { Trainee, Mentor } from "@/types/training.types"
import { SKILLS_POOL } from "@/constants/training"
import { Avatar, SkillTag, cardClass } from "./TrainingHelpers"
import { overallStatus } from "@/hooks/training/useTraining"
import TraineeCard from "./TraineeCard"

interface Props {
  mentors: Mentor[]
  trainees: Trainee[]
  activeMentorTab: string
  setActiveMentorTab: (id: string) => void
  onFeedback: (t: Trainee) => void
  onUpdateProgress: (tid: string, sid: string, val: number) => void
}

export default function MentorDashboard({
  mentors,
  trainees,
  activeMentorTab,
  setActiveMentorTab,
  onFeedback,
  onUpdateProgress,
}: Props) {
  return (
    <>
      <div className="flex gap-3 mb-5 flex-wrap">
        {mentors.map((mentor) => {
          const active = activeMentorTab === mentor.id
          return (
            <button
              key={mentor.id}
              onClick={() => setActiveMentorTab(mentor.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border transition-colors ${
                active
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                  : "border-slate-200 bg-white text-slate-600 hover:text-slate-900"
              }`}
            >
              <Avatar initials={mentor.avatar} id={mentor.id} size={28} />
              {mentor.name}
            </button>
          )
        })}
      </div>

      {mentors
        .filter((mentor) => mentor.id === activeMentorTab)
        .map((mentor) => {
          const assignedTrainees = trainees.filter((trainee) => trainee.mentorId === mentor.id)

          return (
            <div key={mentor.id} className="space-y-4">
              <div className={`${cardClass} p-5`}>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar initials={mentor.avatar} id={mentor.id} size={56} />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{mentor.name}</h3>
                    <p className="text-sm text-slate-500">{mentor.role} · {mentor.department}</p>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {mentor.expertise.map((expertise) => {
                        const skill = SKILLS_POOL.find((item) => item.name === expertise)
                        return skill ? <SkillTag key={expertise} name={expertise} color={skill.color} /> : null
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Assigned", value: assignedTrainees.length },
                    {
                      label: "In Progress",
                      value: assignedTrainees.filter((trainee) => overallStatus(trainee.skills) === "in_progress").length,
                    },
                    {
                      label: "Completed",
                      value: assignedTrainees.filter((trainee) => overallStatus(trainee.skills) === "completed").length,
                    },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <div className="text-2xl font-bold text-slate-900">{item.value}</div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <h4 className="text-base font-semibold text-slate-900">Assigned Trainees ({assignedTrainees.length})</h4>
              <div className="space-y-3">
                {assignedTrainees.map((trainee) => (
                  <TraineeCard
                    key={trainee.id}
                    trainee={trainee}
                    mentor={mentor}
                    onFeedback={onFeedback}
                    onUpdateProgress={onUpdateProgress}
                  />
                ))}
              </div>
            </div>
          )
        })}
    </>
  )
}
