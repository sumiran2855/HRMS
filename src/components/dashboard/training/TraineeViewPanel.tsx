import React, { useMemo, useState } from "react"
import { Trainee, Mentor } from "@/types/training.types"
import { SKILLS_POOL } from "@/constants/training"
import { Avatar, StatusBadge, ProgressBar, StarRating, SkillTag, cardClass, selectClass } from "./TrainingHelpers"

interface Props {
  trainees: Trainee[]
  mentors: Mentor[]
  onFeedback: (t: Trainee) => void
}

export default function TraineeViewPanel({ trainees, mentors }: Props) {
  const [selectedId, setSelectedId] = useState(trainees[0]?.id ?? "")

  const trainee = useMemo(() => trainees.find((item) => item.id === selectedId), [trainees, selectedId])
  const mentor = useMemo(() => mentors.find((item) => item.id === trainee?.mentorId), [mentors, trainee])

  if (!trainee) return null

  return (
    <div className="space-y-4">
      <div className="max-w-xs">
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className={selectClass}>
          {trainees.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className={`${cardClass} p-5`}>
        <div className="flex gap-4 items-center">
          <Avatar initials={trainee.avatar} id={trainee.id} size={56} />
          <div>
            <h3 className="text-lg font-bold text-slate-900">{trainee.name}</h3>
            <p className="text-sm text-slate-500">{trainee.role} · {trainee.department}</p>
            <p className="text-xs text-slate-400 mt-0.5">Joined: {trainee.joinDate}</p>
          </div>
        </div>

        {mentor && (
          <div className="mt-4 p-3 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center gap-3">
            <Avatar initials={mentor.avatar} id={mentor.id} size={36} />
            <div>
              <p className="text-xs font-semibold text-indigo-600">Your Mentor</p>
              <p className="text-sm font-semibold text-slate-900">{mentor.name}</p>
              <p className="text-xs text-slate-500">{mentor.role} · {mentor.department}</p>
            </div>
          </div>
        )}
      </div>

      <div className={`${cardClass} p-5`}>
        <h3 className="text-base font-semibold text-slate-900 mb-4">My Skills & Progress</h3>
        <div className="space-y-4">
          {trainee.skills.map((skillProgress) => {
            const skill = SKILLS_POOL.find((item) => item.id === skillProgress.skillId)
            if (!skill) return null

            return (
              <div key={skillProgress.skillId}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex gap-2 items-center">
                    <SkillTag name={skill.name} color={skill.color} />
                    <span className="text-xs text-slate-400">{skill.category}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-medium text-slate-900">{skillProgress.progress}%</span>
                    <StatusBadge status={skillProgress.status} />
                  </div>
                </div>
                <ProgressBar
                  value={skillProgress.progress}
                  color={skillProgress.status === "completed" ? "#10b981" : skill.color}
                />
                {skillProgress.completedDate && (
                  <p className="text-xs text-green-600 mt-1">Completed on {skillProgress.completedDate}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className={`${cardClass} p-5`}>
        <h3 className="text-base font-semibold text-slate-900 mb-4">Mentor Feedback</h3>
        {trainee.feedback.length === 0 ? (
          <div className="text-slate-400 text-sm text-center py-6">No feedback yet from your mentor.</div>
        ) : (
          <div className="space-y-2.5">
            {trainee.feedback.map((feedback) => (
              <div key={feedback.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex justify-between mb-1.5">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-medium text-slate-900">{feedback.mentorName}</span>
                    <StarRating rating={feedback.rating} />
                  </div>
                  <span className="text-xs text-slate-400">{feedback.date}</span>
                </div>
                <p className="text-sm text-slate-600 leading-6">{feedback.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
