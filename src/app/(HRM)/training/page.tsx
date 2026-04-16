"use client"

import React, { useState, useMemo, useCallback } from "react"
import {
  BookOpen, Users, Calendar, TrendingUp, CheckCircle, Clock,
  PlayCircle, Award, Target, Download, Search, Filter,
  MoreHorizontal, ChevronRight, Plus, X, MessageSquare,
  User, Briefcase, Star, Edit3, ChevronDown
} from "lucide-react"

/* ─── Types ─────────────────────────────────────────────────────── */
interface Skill {
  id: string
  name: string
  category: string
  color: string
}

interface TrainingProgress {
  skillId: string
  status: "not_started" | "in_progress" | "completed"
  progress: number
  startDate?: string
  completedDate?: string
}

interface Feedback {
  id: string
  mentorId: string
  mentorName: string
  date: string
  note: string
  rating: number
}

interface Trainee {
  id: string
  name: string
  role: string
  department: string
  joinDate: string
  mentorId: string
  skills: TrainingProgress[]
  feedback: Feedback[]
  avatar: string
}

interface Mentor {
  id: string
  name: string
  role: string
  department: string
  expertise: string[]
  assignedTrainees: string[]
  avatar: string
}

/* ─── Mock Data ──────────────────────────────────────────────────── */
const skillsPool: Skill[] = [
  { id: "s1", name: "React", category: "Frontend", color: "#6366f1" },
  { id: "s2", name: "Node.js", category: "Backend", color: "#10b981" },
  { id: "s3", name: "TypeScript", category: "Frontend", color: "#3b82f6" },
  { id: "s4", name: "Communication", category: "Soft Skills", color: "#f59e0b" },
  { id: "s5", name: "SQL", category: "Database", color: "#ef4444" },
  { id: "s6", name: "Leadership", category: "Management", color: "#8b5cf6" },
  { id: "s7", name: "Python", category: "Backend", color: "#06b6d4" },
  { id: "s8", name: "System Design", category: "Architecture", color: "#ec4899" },
  { id: "s9", name: "Git & DevOps", category: "DevOps", color: "#84cc16" },
  { id: "s10", name: "Agile/Scrum", category: "Management", color: "#f97316" },
]

const mentors: Mentor[] = [
  { id: "m1", name: "Sarah Johnson", role: "Team Lead", department: "Engineering", expertise: ["React", "TypeScript", "System Design"], assignedTrainees: ["t1", "t3"], avatar: "SJ" },
  { id: "m2", name: "Michael Chen", role: "Manager", department: "Engineering", expertise: ["Node.js", "Python", "SQL"], assignedTrainees: ["t2"], avatar: "MC" },
  { id: "m3", name: "Emily Davis", role: "Senior Developer", department: "Engineering", expertise: ["React", "Git & DevOps", "Agile/Scrum"], assignedTrainees: ["t4", "t5"], avatar: "ED" },
  { id: "m4", name: "Robert Wilson", role: "Team Lead", department: "Product", expertise: ["Communication", "Leadership", "Agile/Scrum"], assignedTrainees: ["t6"], avatar: "RW" },
]

const initialTrainees: Trainee[] = [
  {
    id: "t1", name: "Alex Kumar", role: "Junior Developer", department: "Engineering",
    joinDate: "2024-01-15", mentorId: "m1", avatar: "AK",
    skills: [
      { skillId: "s1", status: "in_progress", progress: 65, startDate: "2024-01-16" },
      { skillId: "s3", status: "in_progress", progress: 40, startDate: "2024-01-20" },
      { skillId: "s4", status: "completed", progress: 100, startDate: "2024-01-15", completedDate: "2024-02-01" },
    ],
    feedback: [
      { id: "f1", mentorId: "m1", mentorName: "Sarah Johnson", date: "2024-02-01", note: "Alex is showing great progress in React fundamentals. Needs more practice with hooks and state management.", rating: 4 },
      { id: "f2", mentorId: "m1", mentorName: "Sarah Johnson", date: "2024-02-10", note: "Excellent improvement this week. Completed the communication module ahead of schedule.", rating: 5 },
    ]
  },
  {
    id: "t2", name: "Priya Sharma", role: "Junior Backend Dev", department: "Engineering",
    joinDate: "2024-01-20", mentorId: "m2", avatar: "PS",
    skills: [
      { skillId: "s2", status: "in_progress", progress: 80, startDate: "2024-01-21" },
      { skillId: "s5", status: "completed", progress: 100, startDate: "2024-01-21", completedDate: "2024-02-05" },
      { skillId: "s7", status: "not_started", progress: 0 },
    ],
    feedback: [
      { id: "f3", mentorId: "m2", mentorName: "Michael Chen", date: "2024-02-05", note: "Strong SQL fundamentals. Node.js is progressing well, almost ready for independent tasks.", rating: 4 },
    ]
  },
  {
    id: "t3", name: "James Lee", role: "UI Developer", department: "Engineering",
    joinDate: "2024-02-01", mentorId: "m1", avatar: "JL",
    skills: [
      { skillId: "s1", status: "in_progress", progress: 30, startDate: "2024-02-02" },
      { skillId: "s8", status: "not_started", progress: 0 },
    ],
    feedback: []
  },
  {
    id: "t4", name: "Maria Santos", role: "Full Stack Trainee", department: "Engineering",
    joinDate: "2024-01-10", mentorId: "m3", avatar: "MS",
    skills: [
      { skillId: "s1", status: "completed", progress: 100, startDate: "2024-01-11", completedDate: "2024-01-30" },
      { skillId: "s2", status: "completed", progress: 100, startDate: "2024-01-11", completedDate: "2024-02-08" },
      { skillId: "s9", status: "in_progress", progress: 55, startDate: "2024-02-01" },
    ],
    feedback: [
      { id: "f4", mentorId: "m3", mentorName: "Emily Davis", date: "2024-02-08", note: "Excellent progress — completed both React and Node.js ahead of schedule. Moving to DevOps module.", rating: 5 },
    ]
  },
  {
    id: "t5", name: "David Park", role: "DevOps Trainee", department: "Engineering",
    joinDate: "2024-01-25", mentorId: "m3", avatar: "DP",
    skills: [
      { skillId: "s9", status: "in_progress", progress: 70, startDate: "2024-01-26" },
      { skillId: "s10", status: "in_progress", progress: 50, startDate: "2024-01-26" },
    ],
    feedback: [
      { id: "f5", mentorId: "m3", mentorName: "Emily Davis", date: "2024-02-06", note: "Good understanding of Git workflows. Scrum ceremonies need more attention.", rating: 3 },
    ]
  },
  {
    id: "t6", name: "Neha Patel", role: "Product Trainee", department: "Product",
    joinDate: "2024-02-05", mentorId: "m4", avatar: "NP",
    skills: [
      { skillId: "s4", status: "in_progress", progress: 45, startDate: "2024-02-06" },
      { skillId: "s6", status: "not_started", progress: 0 },
      { skillId: "s10", status: "not_started", progress: 0 },
    ],
    feedback: []
  },
]

/* ─── Helpers ────────────────────────────────────────────────────── */
const avatarColors = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"]
const getAvatarColor = (id: string) => avatarColors[parseInt(id.replace(/\D/g, "")) % avatarColors.length]

const statusConfig = {
  not_started: { label: "Not Started", color: "#9ca3af", bg: "#f3f4f6" },
  in_progress: { label: "In Progress", color: "#6366f1", bg: "#eef2ff" },
  completed: { label: "Completed", color: "#10b981", bg: "#d1fae5" },
}

const overallStatus = (skills: TrainingProgress[]): "not_started" | "in_progress" | "completed" => {
  if (!skills.length) return "not_started"
  if (skills.every(s => s.status === "completed")) return "completed"
  if (skills.some(s => s.status === "in_progress" || s.status === "completed")) return "in_progress"
  return "not_started"
}

const overallProgress = (skills: TrainingProgress[]) =>
  skills.length ? Math.round(skills.reduce((a, s) => a + s.progress, 0) / skills.length) : 0

/* ─── Sub-Components ─────────────────────────────────────────────── */
function Avatar({ initials, id, size = 40 }: { initials: string; id: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: getAvatarColor(id),
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: size * 0.32, fontWeight: 600, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

function StatusBadge({ status }: { status: "not_started" | "in_progress" | "completed" }) {
  const cfg = statusConfig[status]
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      color: cfg.color, background: cfg.bg, whiteSpace: "nowrap",
    }}>
      {cfg.label}
    </span>
  )
}

function ProgressBar({ value, color = "#6366f1" }: { value: number; color?: string }) {
  return (
    <div style={{ width: "100%", height: 6, background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.3s" }} />
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={12} fill={i <= rating ? "#f59e0b" : "none"} color={i <= rating ? "#f59e0b" : "#d1d5db"} />
      ))}
    </div>
  )
}

function SkillTag({ name, color }: { name: string; color: string }) {
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500,
      background: `${color}18`, color,
    }}>
      {name}
    </span>
  )
}

/* ─── Modal ──────────────────────────────────────────────────────── */
function Modal({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode
}) {
  if (!open) return null
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: 28, width: "100%", maxWidth: 540,
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxHeight: "90vh", overflowY: "auto",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>{title}</div>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 4 }}>
            <X size={20} color="#9ca3af" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ─── Assign Modal ───────────────────────────────────────────────── */
function AssignModal({
  open, onClose, onAssign, mentors, skills,
}: {
  open: boolean; onClose: () => void; onAssign: (data: any) => void;
  mentors: Mentor[]; skills: Skill[];
}) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [dept, setDept] = useState("")
  const [mentorId, setMentorId] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const toggleSkill = (id: string) =>
    setSelectedSkills(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const handleSubmit = () => {
    if (!name.trim() || !mentorId || !selectedSkills.length) return
    onAssign({ name, role, dept, mentorId, skills: selectedSkills })
    setName(""); setRole(""); setDept(""); setMentorId(""); setSelectedSkills([])
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Assign New Trainee">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Full name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Riya Mehta" style={inputStyle} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={labelStyle}>Role</label>
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Junior Developer" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Department</label>
            <input value={dept} onChange={e => setDept(e.target.value)} placeholder="e.g. Engineering" style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Assign mentor</label>
          <select value={mentorId} onChange={e => setMentorId(e.target.value)} style={inputStyle}>
            <option value="">Select a mentor</option>
            {mentors.map(m => <option key={m.id} value={m.id}>{m.name} — {m.role}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Skill sets to train</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {skills.map(sk => (
              <button key={sk.id} onClick={() => toggleSkill(sk.id)} style={{
                padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                border: `1.5px solid ${selectedSkills.includes(sk.id) ? sk.color : "#e5e7eb"}`,
                background: selectedSkills.includes(sk.id) ? `${sk.color}15` : "#fff",
                color: selectedSkills.includes(sk.id) ? sk.color : "#6b7280",
                cursor: "pointer", fontFamily: "inherit", transition: "all .15s",
              }}>
                {sk.name}
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleSubmit} style={{
          marginTop: 8, padding: "12px", borderRadius: 10, background: "#6366f1",
          color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
        }}>
          Assign Trainee
        </button>
      </div>
    </Modal>
  )
}

/* ─── Feedback Modal ─────────────────────────────────────────────── */
function FeedbackModal({
  open, onClose, trainee, onAdd,
}: {
  open: boolean; onClose: () => void; trainee: Trainee | null; onAdd: (tid: string, fb: Feedback) => void
}) {
  const [note, setNote] = useState("")
  const [rating, setRating] = useState(3)
  if (!trainee) return null

  const handleSubmit = () => {
    if (!note.trim()) return
    onAdd(trainee.id, {
      id: `f${Date.now()}`,
      mentorId: trainee.mentorId,
      mentorName: "You (Mentor)",
      date: new Date().toISOString().slice(0, 10),
      note, rating,
    })
    setNote(""); setRating(3); onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={`Add feedback — ${trainee.name}`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Rating</label>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {[1, 2, 3, 4, 5].map(r => (
              <button key={r} onClick={() => setRating(r)} style={{
                width: 36, height: 36, borderRadius: 8, border: `1.5px solid ${r <= rating ? "#f59e0b" : "#e5e7eb"}`,
                background: r <= rating ? "#fef3c7" : "#fff",
                cursor: "pointer", fontSize: 16, fontFamily: "inherit",
              }}>
                {r <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Feedback & notes</label>
          <textarea value={note} onChange={e => setNote(e.target.value)}
            placeholder="Write your evaluation, suggestions, or comments..."
            style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} />
        </div>
        <button onClick={handleSubmit} style={{
          padding: "12px", borderRadius: 10, background: "#6366f1",
          color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
        }}>
          Submit Feedback
        </button>
      </div>
    </Modal>
  )
}

const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6 }
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb",
  fontSize: 13, color: "#111827", outline: "none", fontFamily: "inherit", background: "#fff",
}

/* ─── Trainee Card ───────────────────────────────────────────────── */
function TraineeCard({
  trainee, mentor, onFeedback, onUpdateProgress,
}: {
  trainee: Trainee; mentor?: Mentor;
  onFeedback: (t: Trainee) => void;
  onUpdateProgress: (tid: string, sid: string, val: number) => void;
}) {
  const [expanded, setExpanded] = useState(false)
  const status = overallStatus(trainee.skills)
  const prog = overallProgress(trainee.skills)

  return (
    <div style={{
      borderRadius: 14, border: "1.5px solid #edf0f7", background: "#fff",
      marginBottom: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        padding: "16px 20px", display: "flex", alignItems: "center", gap: 14,
        cursor: "pointer",
      }} onClick={() => setExpanded(e => !e)}>
        <Avatar initials={trainee.avatar} id={trainee.id} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{trainee.name}</span>
            <StatusBadge status={status} />
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
            {trainee.role} · {trainee.department}
            {mentor && <> · Mentor: <span style={{ color: "#6366f1" }}>{mentor.name}</span></>}
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <ProgressBar value={prog} color={status === "completed" ? "#10b981" : "#6366f1"} />
            <span style={{ fontSize: 11, color: "#6b7280", whiteSpace: "nowrap", minWidth: 32 }}>{prog}%</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={e => { e.stopPropagation(); onFeedback(trainee) }} style={{
            padding: "6px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb",
            background: "#fff", cursor: "pointer", fontSize: 12, color: "#6366f1",
            display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit",
          }}>
            <MessageSquare size={13} /> Feedback
          </button>
          <ChevronDown size={18} color="#9ca3af" style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
        </div>
      </div>

      {expanded && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f3f4f6" }}>
          {/* Skills */}
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Skill Progress
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {trainee.skills.map(sp => {
                const skill = skillsPool.find(s => s.id === sp.skillId)
                if (!skill) return null
                return (
                  <div key={sp.skillId} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <SkillTag name={skill.name} color={skill.color} />
                    <div style={{ flex: 1 }}>
                      <ProgressBar value={sp.progress} color={sp.status === "completed" ? "#10b981" : skill.color} />
                    </div>
                    <span style={{ fontSize: 11, color: "#6b7280", minWidth: 28 }}>{sp.progress}%</span>
                    <StatusBadge status={sp.status} />
                    {sp.status !== "completed" && (
                      <input type="range" min={0} max={100} value={sp.progress}
                        onChange={e => onUpdateProgress(trainee.id, sp.skillId, Number(e.target.value))}
                        style={{ width: 80 }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Feedback */}
          {trainee.feedback.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Mentor Feedback
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {trainee.feedback.map(fb => (
                  <div key={fb.id} style={{
                    padding: "12px 14px", borderRadius: 10, background: "#f8f9fc",
                    border: "1px solid #edf0f7",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{fb.mentorName}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <StarRating rating={fb.rating} />
                        <span style={{ fontSize: 11, color: "#9ca3af" }}>{fb.date}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{fb.note}</p>
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

/* ─── Main Component ─────────────────────────────────────────────── */
export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [trainees, setTrainees] = useState<Trainee[]>(initialTrainees)
  const [assignOpen, setAssignOpen] = useState(false)
  const [feedbackModal, setFeedbackModal] = useState<Trainee | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMentor, setFilterMentor] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSkill, setFilterSkill] = useState("all")
  const [activeMentorTab, setActiveMentorTab] = useState(mentors[0]?.id ?? "")

  const getMentor = useCallback((id: string) => mentors.find(m => m.id === id), [])

  /* Stats */
  const stats = useMemo(() => ({
    total: trainees.length,
    inProgress: trainees.filter(t => overallStatus(t.skills) === "in_progress").length,
    completed: trainees.filter(t => overallStatus(t.skills) === "completed").length,
    notStarted: trainees.filter(t => overallStatus(t.skills) === "not_started").length,
  }), [trainees])

  /* Filtered list */
  const filtered = useMemo(() => trainees.filter(t => {
    const mentor = getMentor(t.mentorId)
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchMentor = filterMentor === "all" || t.mentorId === filterMentor
    const matchStatus = filterStatus === "all" || overallStatus(t.skills) === filterStatus
    const matchSkill = filterSkill === "all" || t.skills.some(s => s.skillId === filterSkill)
    return matchSearch && matchMentor && matchStatus && matchSkill
  }), [trainees, searchQuery, filterMentor, filterStatus, filterSkill, getMentor])

  /* Assign */
  const handleAssign = useCallback((data: any) => {
    const newTrainee: Trainee = {
      id: `t${Date.now()}`,
      name: data.name,
      role: data.role || "Trainee",
      department: data.dept || "General",
      joinDate: new Date().toISOString().slice(0, 10),
      mentorId: data.mentorId,
      avatar: data.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2),
      skills: data.skills.map((sid: string) => ({
        skillId: sid, status: "not_started" as const, progress: 0,
      })),
      feedback: [],
    }
    setTrainees(p => [...p, newTrainee])
  }, [])

  /* Feedback */
  const handleAddFeedback = useCallback((tid: string, fb: Feedback) => {
    setTrainees(p => p.map(t => t.id === tid ? { ...t, feedback: [...t.feedback, fb] } : t))
  }, [])

  /* Progress update */
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

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "trainees", label: "Trainees", icon: Users },
    { id: "mentors", label: "Mentor Dashboard", icon: Award },
    { id: "my-view", label: "Trainee View", icon: BookOpen },
  ]

  const sCard: React.CSSProperties = {
    background: "#fff", borderRadius: 16, border: "1px solid #edf0f7",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  }

  return (
    <div style={{ background: "#f8f9fc", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "24px 20px 60px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.03em" }}>
              Training & Development
            </h1>
            <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>
              Onboard trainees, assign mentors, and track skill development
            </p>
          </div>
          <button onClick={() => setAssignOpen(true)} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
            borderRadius: 10, background: "#6366f1", color: "#fff", border: "none",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>
            <Plus size={18} /> Assign Trainee
          </button>
        </div>

        {/* Tabs */}
        <div style={{ ...sCard, marginBottom: 24, overflow: "hidden" }}>
          <div style={{ display: "flex" }}>
            {tabs.map(tab => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  flex: "1 1 auto", padding: "15px 20px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                  border: "none", background: "transparent", cursor: "pointer",
                  fontSize: 13, fontWeight: active ? 700 : 500,
                  color: active ? "#6366f1" : "#6b7280",
                  borderBottom: active ? "2.5px solid #6366f1" : "2.5px solid transparent",
                  whiteSpace: "nowrap", transition: "all .15s", fontFamily: "inherit",
                }}>
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Overview ── */}
        {activeTab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Total Trainees", value: stats.total, icon: Users, color: "#6366f1" },
                { label: "In Progress", value: stats.inProgress, icon: Clock, color: "#f59e0b" },
                { label: "Completed", value: stats.completed, icon: CheckCircle, color: "#10b981" },
                { label: "Not Started", value: stats.notStarted, icon: PlayCircle, color: "#9ca3af" },
              ].map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} style={{ ...sCard, padding: 20, display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={26} color={s.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 30, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{s.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* Trainee snapshot */}
              <div style={{ ...sCard, padding: 22 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Trainee Snapshot</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {trainees.slice(0, 5).map(t => {
                    const mentor = getMentor(t.mentorId)
                    const prog = overallProgress(t.skills)
                    return (
                      <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Avatar initials={t.avatar} id={t.id} size={36} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{t.name}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af" }}>{mentor?.name ?? "—"}</div>
                          <ProgressBar value={prog} color={overallStatus(t.skills) === "completed" ? "#10b981" : "#6366f1"} />
                        </div>
                        <span style={{ fontSize: 12, color: "#6b7280", minWidth: 28 }}>{prog}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mentors */}
              <div style={{ ...sCard, padding: 22 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Active Mentors</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {mentors.map(m => (
                    <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: "#f8f9fc", border: "1px solid #edf0f7" }}>
                      <Avatar initials={m.avatar} id={m.id} size={36} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: "#6b7280" }}>{m.role} · {m.assignedTrainees.length} trainees</div>
                      </div>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", maxWidth: 180, justifyContent: "flex-end" }}>
                        {m.expertise.slice(0, 2).map(e => {
                          const sk = skillsPool.find(s => s.name === e)
                          return sk ? <SkillTag key={e} name={e} color={sk.color} /> : null
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Trainees ── */}
        {activeTab === "trainees" && (
          <>
            {/* Filters */}
            <div style={{ ...sCard, padding: 16, marginBottom: 20, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 2, minWidth: 200, position: "relative" }}>
                <Search size={15} color="#9ca3af" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, role, department..."
                  style={{ ...inputStyle, paddingLeft: 32 }} />
              </div>
              <select value={filterMentor} onChange={e => setFilterMentor(e.target.value)} style={{ ...inputStyle, width: "auto", flex: 1, minWidth: 160 }}>
                <option value="all">All mentors</option>
                {mentors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...inputStyle, width: "auto", flex: 1, minWidth: 140 }}>
                <option value="all">All statuses</option>
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select value={filterSkill} onChange={e => setFilterSkill(e.target.value)} style={{ ...inputStyle, width: "auto", flex: 1, minWidth: 140 }}>
                <option value="all">All skills</option>
                {skillsPool.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: 60, color: "#9ca3af", fontSize: 14 }}>No trainees match your filters.</div>
            ) : filtered.map(t => (
              <TraineeCard
                key={t.id} trainee={t}
                mentor={getMentor(t.mentorId)}
                onFeedback={setFeedbackModal}
                onUpdateProgress={handleUpdateProgress}
              />
            ))}
          </>
        )}

        {/* ── Mentor Dashboard ── */}
        {activeTab === "mentors" && (
          <>
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              {mentors.map(m => (
                <button key={m.id} onClick={() => setActiveMentorTab(m.id)} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "10px 16px",
                  borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 13,
                  border: activeMentorTab === m.id ? "1.5px solid #6366f1" : "1.5px solid #e5e7eb",
                  background: activeMentorTab === m.id ? "#eef2ff" : "#fff",
                  color: activeMentorTab === m.id ? "#6366f1" : "#6b7280", fontWeight: activeMentorTab === m.id ? 600 : 400,
                }}>
                  <Avatar initials={m.avatar} id={m.id} size={28} />
                  {m.name}
                </button>
              ))}
            </div>

            {mentors.filter(m => m.id === activeMentorTab).map(mentor => {
              const myTrainees = trainees.filter(t => t.mentorId === mentor.id)
              return (
                <div key={mentor.id}>
                  <div style={{ ...sCard, padding: 22, marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                      <Avatar initials={mentor.avatar} id={mentor.id} size={56} />
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>{mentor.name}</div>
                        <div style={{ fontSize: 13, color: "#6b7280" }}>{mentor.role} · {mentor.department}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                          {mentor.expertise.map(e => {
                            const sk = skillsPool.find(s => s.name === e)
                            return sk ? <SkillTag key={e} name={e} color={sk.color} /> : null
                          })}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                      {[
                        { label: "Assigned", value: myTrainees.length },
                        { label: "In Progress", value: myTrainees.filter(t => overallStatus(t.skills) === "in_progress").length },
                        { label: "Completed", value: myTrainees.filter(t => overallStatus(t.skills) === "completed").length },
                      ].map((s) => (
                        <div key={s.label} style={{ padding: 14, borderRadius: 10, background: "#f8f9fc", border: "1px solid #edf0f7", textAlign: "center" }}>
                          <div style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>{s.value}</div>
                          <div style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 14 }}>
                    Assigned Trainees ({myTrainees.length})
                  </div>
                  {myTrainees.map(t => (
                    <TraineeCard
                      key={t.id} trainee={t}
                      mentor={mentor}
                      onFeedback={setFeedbackModal}
                      onUpdateProgress={handleUpdateProgress}
                    />
                  ))}
                </div>
              )
            })}
          </>
        )}

        {/* ── Trainee View ── */}
        {activeTab === "my-view" && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>View as trainee</label>
            </div>
            <TraineeViewPanel
              trainees={trainees} mentors={mentors}
              onFeedback={setFeedbackModal}
            />
          </>
        )}

      </div>

      {/* Modals */}
      <AssignModal open={assignOpen} onClose={() => setAssignOpen(false)} onAssign={handleAssign} mentors={mentors} skills={skillsPool} />
      <FeedbackModal open={!!feedbackModal} onClose={() => setFeedbackModal(null)} trainee={feedbackModal} onAdd={handleAddFeedback} />
    </div>
  )
}

/* ─── Trainee View Panel ─────────────────────────────────────────── */
function TraineeViewPanel({ trainees, mentors, onFeedback }: {
  trainees: Trainee[]; mentors: Mentor[]; onFeedback: (t: Trainee) => void
}) {
  const [selectedId, setSelectedId] = useState(trainees[0]?.id ?? "")
  const trainee = trainees.find(t => t.id === selectedId)
  const mentor = mentors.find(m => m.id === trainee?.mentorId)

  if (!trainee) return null

  const sCard: React.CSSProperties = {
    background: "#fff", borderRadius: 16, border: "1px solid #edf0f7",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)", padding: 22, marginBottom: 16,
  }

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)}
          style={{ ...inputStyle, maxWidth: 280 }}>
          {trainees.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {/* Profile card */}
      <div style={sCard}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Avatar initials={trainee.avatar} id={trainee.id} size={60} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>{trainee.name}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{trainee.role} · {trainee.department}</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Joined: {trainee.joinDate}</div>
          </div>
        </div>
        {mentor && (
          <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "#eef2ff", border: "1px solid #c7d2fe", display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initials={mentor.avatar} id={mentor.id} size={36} />
            <div>
              <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 600 }}>Your Mentor</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{mentor.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{mentor.role} · {mentor.department}</div>
            </div>
          </div>
        )}
      </div>

      {/* Skills */}
      <div style={sCard}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 16 }}>My Skills & Progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {trainee.skills.map(sp => {
            const skill = skillsPool.find(s => s.id === sp.skillId)
            if (!skill) return null
            return (
              <div key={sp.skillId}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <SkillTag name={skill.name} color={skill.color} />
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{skill.category}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{sp.progress}%</span>
                    <StatusBadge status={sp.status} />
                  </div>
                </div>
                <ProgressBar value={sp.progress} color={sp.status === "completed" ? "#10b981" : skill.color} />
                {sp.completedDate && (
                  <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>Completed on {sp.completedDate}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Feedback */}
      <div style={sCard}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Mentor Feedback</div>
        {trainee.feedback.length === 0 ? (
          <div style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No feedback yet from your mentor.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {trainee.feedback.map(fb => (
              <div key={fb.id} style={{ padding: "14px 16px", borderRadius: 10, background: "#f8f9fc", border: "1px solid #edf0f7" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{fb.mentorName}</span>
                    <StarRating rating={fb.rating} />
                  </div>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{fb.date}</span>
                </div>
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{fb.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}