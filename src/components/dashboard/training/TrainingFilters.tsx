import React from "react"
import { Search, Filter } from "lucide-react"
import { Mentor, Skill } from "@/types/training.types"
import { Button } from "@/components/ui/Button"
import { cardClass, inputWithIconClass, selectClass } from "./TrainingHelpers"

interface Props {
  searchQuery: string
  setSearchQuery: (v: string) => void
  filterMentor: string
  setFilterMentor: (v: string) => void
  filterStatus: string
  setFilterStatus: (v: string) => void
  filterSkill: string
  setFilterSkill: (v: string) => void
  mentors: Mentor[]
  skills: Skill[]
}

export default function TrainingFilters({
  searchQuery,
  setSearchQuery,
  filterMentor,
  setFilterMentor,
  filterStatus,
  setFilterStatus,
  filterSkill,
  setFilterSkill,
  mentors,
  skills,
}: Props) {
  return (
    <div className={`${cardClass} p-4`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, department..."
            className={inputWithIconClass}
          />
        </div>

        <select value={filterMentor} onChange={(e) => setFilterMentor(e.target.value)} className={selectClass}>
          <option value="all">All mentors</option>
          {mentors.map((mentor) => (
            <option key={mentor.id} value={mentor.id}>
              {mentor.name}
            </option>
          ))}
        </select>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={selectClass}>
          <option value="all">All statuses</option>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex items-center gap-2">
          <select value={filterSkill} onChange={(e) => setFilterSkill(e.target.value)} className={selectClass}>
            <option value="all">All skills</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
          <Button className="h-10 px-3 bg-indigo-600 hover:bg-indigo-700 text-white" aria-label="Filter trainees">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
