import React, { useState } from "react"
import { Mentor, Skill, AssignFormData } from "@/types/training.types"
import { Modal, inputClass, selectClass } from "./TrainingHelpers"

interface Props {
  open: boolean
  onClose: () => void
  onAssign: (data: AssignFormData) => void
  mentors: Mentor[]
  skills: Skill[]
}

export default function AssignModal({ open, onClose, onAssign, mentors, skills }: Props) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [dept, setDept] = useState("")
  const [mentorId, setMentorId] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const toggleSkill = (id: string) =>
    setSelectedSkills((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))

  const handleSubmit = () => {
    if (!name.trim() || !mentorId || !selectedSkills.length) return

    onAssign({ name, role, dept, mentorId, skills: selectedSkills })
    setName("")
    setRole("")
    setDept("")
    setMentorId("")
    setSelectedSkills([])
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Assign New Trainee">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Riya Mehta" className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Junior Developer" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
            <input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="e.g. Engineering" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Assign mentor</label>
          <select value={mentorId} onChange={(e) => setMentorId(e.target.value)} className={selectClass}>
            <option value="">Select a mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.name} — {mentor.role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Skill sets to train</label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const selected = selectedSkills.includes(skill.id)
              return (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                  style={{
                    borderColor: selected ? skill.color : "#e2e8f0",
                    backgroundColor: selected ? `${skill.color}15` : "white",
                    color: selected ? skill.color : "#64748b",
                  }}
                >
                  {skill.name}
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Assign Trainee
        </button>
      </div>
    </Modal>
  )
}
