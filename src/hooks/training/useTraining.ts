import { useState, useMemo, useCallback } from "react"
import { Trainee, Feedback, TrainingProgress, UseTrainingReturn, AssignFormData } from "@/types/training.types"
import { INITIAL_TRAINEES, MENTORS, AVATAR_COLORS } from "@/constants/training"

export function overallStatus(skills: TrainingProgress[]): "not_started" | "in_progress" | "completed" {
  if (!skills.length) return "not_started"
  if (skills.every(s => s.status === "completed")) return "completed"
  if (skills.some(s => s.progress > 0)) return "in_progress"
  return "not_started"
}

export function overallProgress(skills: TrainingProgress[]): number {
  if (!skills.length) return 0
  return Math.round(skills.reduce((sum, s) => sum + s.progress, 0) / skills.length)
}

export function getAvatarColor(id: string): string {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

export function useTraining(): UseTrainingReturn {
  const [trainees, setTrainees] = useState<Trainee[]>(INITIAL_TRAINEES)
  const [activeTab, setActiveTab] = useState("overview")
  const [assignOpen, setAssignOpen] = useState(false)
  const [feedbackModal, setFeedbackModal] = useState<Trainee | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMentor, setFilterMentor] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSkill, setFilterSkill] = useState("all")
  const [activeMentorTab, setActiveMentorTab] = useState(MENTORS[0]?.id ?? "")

  const getMentor = useCallback((id: string) => MENTORS.find(m => m.id === id), [])

  const stats = useMemo(() => ({
    total: trainees.length,
    inProgress: trainees.filter(t => overallStatus(t.skills) === "in_progress").length,
    completed: trainees.filter(t => overallStatus(t.skills) === "completed").length,
    notStarted: trainees.filter(t => overallStatus(t.skills) === "not_started").length,
  }), [trainees])

  const filtered = useMemo(() => trainees.filter(t => {
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchMentor = filterMentor === "all" || t.mentorId === filterMentor
    const matchStatus = filterStatus === "all" || overallStatus(t.skills) === filterStatus
    const matchSkill = filterSkill === "all" || t.skills.some(s => s.skillId === filterSkill)
    return matchSearch && matchMentor && matchStatus && matchSkill
  }), [trainees, searchQuery, filterMentor, filterStatus, filterSkill])

  const handleAssign = useCallback((data: AssignFormData) => {
    const newTrainee: Trainee = {
      id: `t${Date.now()}`,
      name: data.name,
      role: data.role || "Trainee",
      department: data.dept || "General",
      joinDate: new Date().toISOString().slice(0, 10),
      mentorId: data.mentorId,
      avatar: data.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2),
      skills: data.skills.map(sid => ({ skillId: sid, status: "not_started" as const, progress: 0 })),
      feedback: [],
    }
    setTrainees(p => [...p, newTrainee])
  }, [])

  const handleAddFeedback = useCallback((tid: string, fb: Feedback) => {
    setTrainees(p => p.map(t => t.id === tid ? { ...t, feedback: [...t.feedback, fb] } : t))
  }, [])

  const handleUpdateProgress = useCallback((tid: string, sid: string, val: number) => {
    setTrainees(p => p.map(t => {
      if (t.id !== tid) return t
      return {
        ...t,
        skills: t.skills.map(s => {
          if (s.skillId !== sid) return s
          const status = val === 100 ? "completed" : val > 0 ? "in_progress" : "not_started"
          return {
            ...s, progress: val, status,
            completedDate: val === 100 ? new Date().toISOString().slice(0, 10) : s.completedDate,
          }
        }),
      }
    }))
  }, [])

  return {
    trainees, stats, filtered,
    activeTab, setActiveTab,
    assignOpen, setAssignOpen,
    feedbackModal, setFeedbackModal,
    searchQuery, setSearchQuery,
    filterMentor, setFilterMentor,
    filterStatus, setFilterStatus,
    filterSkill, setFilterSkill,
    activeMentorTab, setActiveMentorTab,
    getMentor,
    handleAssign, handleAddFeedback, handleUpdateProgress,
  }
}
