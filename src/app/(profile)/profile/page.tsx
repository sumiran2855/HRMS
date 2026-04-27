"use client"

import { useState } from "react"
import {
  User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award,
  Linkedin, Twitter, Github, Globe, Edit2, Save, X, Plus, Trash2,
  Clock, TrendingUp, FileText, Target, Code, CheckCircle,
  ChevronDown, ChevronUp, Building
} from "lucide-react"

/* ─────────────── types ─────────────── */
type Skill = { name: string; level: number; category: string }
type Project = { id: string; name: string; role: string; status: string; contribution: number; duration: string; technologies: string[] }
type Education = { degree: string; institution: string; year: string; gpa: string }
type Certification = { name: string; issuer: string; date: string; status: string }
type Activity = { id: string; title: string; type: string; status: string; date: string; hoursSpent: number }

/* ─────────────── seed data ─────────────── */
const seed = {
  id: "EMP001", firstName: "Sumiran", lastName: "Biswas",
  email: "sumiran.b@cisinlabs.com", phone: "+1 (555) 123-4567",
  location: "San Francisco, CA", avatar: "SB",
  role: "Senior Full Stack Developer", department: "Engineering",
  employeeId: "EMP-2024-001", joinDate: "2020-03-15", status: "active",
  bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialised in React, Node.js, and cloud architecture. Strong advocate for clean code and best practices.",
  skills: [
    { name: "React", level: 95, category: "Frontend" },
    { name: "Node.js", level: 90, category: "Backend" },
    { name: "TypeScript", level: 88, category: "Frontend" },
    { name: "PostgreSQL", level: 85, category: "Database" },
    { name: "AWS", level: 82, category: "DevOps" },
    { name: "Docker", level: 78, category: "DevOps" },
  ] as Skill[],
  projects: [
    { id: "PRJ001", name: "HRMS Platform", role: "Project Lead", status: "in-progress", contribution: 35, duration: "Jan 2024 – Present", technologies: ["React", "Node.js", "PostgreSQL", "AWS"] },
    { id: "PRJ002", name: "Mobile App Revamp", role: "Senior Developer", status: "completed", contribution: 28, duration: "Sep 2023 – Jan 2024", technologies: ["React Native", "Firebase", "Redux"] },
    { id: "PRJ003", name: "Analytics Dashboard", role: "Tech Lead", status: "planning", contribution: 40, duration: "Mar 2024 – Aug 2024", technologies: ["Python", "D3.js", "PostgreSQL"] },
  ] as Project[],
  education: [
    { degree: "M.S. Computer Science", institution: "Stanford University", year: "2018 – 2020", gpa: "3.8/4.0" },
    { degree: "B.S. Software Engineering", institution: "MIT", year: "2014 – 2018", gpa: "3.9/4.0" },
  ] as Education[],
  certifications: [
    { name: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2023-06", status: "active" },
    { name: "Google Cloud Professional", issuer: "Google", date: "2022-09", status: "active" },
    { name: "Kubernetes Administrator", issuer: "CNCF", date: "2023-03", status: "active" },
  ] as Certification[],
  activities: [
    { id: "ACT001", title: "API Endpoint Development", type: "Development", status: "completed", date: "2024-02-15", hoursSpent: 40 },
    { id: "ACT008", title: "User Authentication Flow", type: "Development", status: "in-progress", date: "2024-01-22", hoursSpent: 15 },
    { id: "ACT005", title: "Cloud Infrastructure Setup", type: "DevOps", status: "in-progress", date: "2024-01-12", hoursSpent: 35 },
  ] as Activity[],
  metrics: { completedProjects: 12, activeProjects: 3, totalHours: 2840, averageRating: 4.8, teamSize: 8, skillsCount: 8 },
  socialLinks: { linkedin: "linkedin.com/in/michaelchen", twitter: "@michaelchen_dev", github: "github.com/michaelchen", portfolio: "michaelchen.dev" },
}

/* ─────────────── tiny helpers ─────────────── */
const fmtDate = (s: string) => new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
const statusStyle: Record<string, { bg: string; color: string; dot: string }> = {
  active: { bg: "#dcfce7", color: "#16a34a", dot: "#22c55e" },
  "in-progress": { bg: "#dbeafe", color: "#1d4ed8", dot: "#3b82f6" },
  completed: { bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
  planning: { bg: "#ede9fe", color: "#6d28d9", dot: "#8b5cf6" },
  inactive: { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
}
const ss = (s: string) => statusStyle[s] || statusStyle["active"]
const catColor: Record<string, string> = { Frontend: "#3b82f6", Backend: "#10b981", Database: "#f59e0b", DevOps: "#8b5cf6", Other: "#64748b" }

/* ─────────────── reusable field ─────────────── */
function Field({ label, value, editing, name, type = "text", onChange }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8" }}>{label}</label>
      {editing
        ? <input name={name} type={type} defaultValue={value} onChange={onChange}
          style={{ height: 38, borderRadius: 8, border: "1.5px solid #e2e8f0", padding: "0 12px", fontSize: 13, color: "#0f172a", outline: "none", fontFamily: "inherit", background: "#fff", transition: "border-color 0.15s" }}
          onFocus={(e) => (e.target.style.borderColor = "#334155")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")} />
        : <div style={{ fontSize: 13.5, color: "#0f172a", fontWeight: 500, padding: "6px 0" }}>{value}</div>
      }
    </div>
  )
}

/* ─────────────── section wrapper ─────────────── */
function Section({ title, icon: Icon, accent = "#0f172a", action, children }: any) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: open ? "1px solid #f1f5f9" : "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
        onClick={() => setOpen(o => !o)}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon style={{ width: 15, height: 15, color: "#fff" }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {action}
          {open ? <ChevronUp style={{ width: 15, height: 15, color: "#94a3b8" }} /> : <ChevronDown style={{ width: 15, height: 15, color: "#94a3b8" }} />}
        </div>
      </div>
      {open && <div style={{ padding: "20px" }}>{children}</div>}
    </div>
  )
}

/* ─────────────── add button ─────────────── */
function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onClick() }}
      style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 7, background: "#f1f5f9", border: "1.5px dashed #cbd5e1", color: "#475569", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#e2e8f0"; e.currentTarget.style.borderColor = "#94a3b8" }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.borderColor = "#cbd5e1" }}>
      <Plus style={{ width: 12, height: 12 }} />{label}
    </button>
  )
}

/* ─────────────── icon btn ─────────────── */
function IconBtn({ icon: Icon, color = "#64748b", bg = "#f1f5f9", onClick, title }: any) {
  return (
    <button title={title} onClick={onClick}
      style={{ width: 30, height: 30, borderRadius: 7, background: bg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
      <Icon style={{ width: 13, height: 13, color }} />
    </button>
  )
}

/* ═══════════════ MAIN PAGE ═══════════════ */
export default function ProfilePage() {
  const [bio, setBio] = useState(seed.bio)
  const [editBio, setEditBio] = useState(false)
  const [personal, setPersonal] = useState({ email: seed.email, phone: seed.phone, location: seed.location })
  const [editPersonal, setEditPersonal] = useState(false)

  const [skills, setSkills] = useState<Skill[]>(seed.skills)
  const [editSkillIdx, setEditSkillIdx] = useState<number | null>(null)
  const [newSkill, setNewSkill] = useState<Skill | null>(null)

  const [projects, setProjects] = useState<Project[]>(seed.projects)
  const [editProjIdx, setEditProjIdx] = useState<number | null>(null)
  const [newProj, setNewProj] = useState<Project | null>(null)

  const [education, setEducation] = useState<Education[]>(seed.education)
  const [editEduIdx, setEditEduIdx] = useState<number | null>(null)
  const [newEdu, setNewEdu] = useState<Education | null>(null)

  const [certs, setCerts] = useState<Certification[]>(seed.certifications)
  const [editCertIdx, setEditCertIdx] = useState<number | null>(null)
  const [newCert, setNewCert] = useState<Certification | null>(null)

  /* ── inline edit form for rows ── */
  function RowEditForm({ fields, value, onChange, onSave, onCancel }: { fields: { key: string; label: string; type?: string }[]; value: any; onChange: (k: string, v: string) => void; onSave: () => void; onCancel: () => void }) {
    return (
      <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: 16, marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {fields.map(f => (
            <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8" }}>{f.label}</label>
              <input type={f.type || "text"} value={value[f.key] ?? ""} onChange={(e) => onChange(f.key, e.target.value)}
                style={{ height: 36, borderRadius: 8, border: "1.5px solid #e2e8f0", padding: "0 10px", fontSize: 13, color: "#0f172a", outline: "none", fontFamily: "inherit", background: "#fff" }}
                onFocus={(e) => (e.target.style.borderColor = "#334155")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ padding: "6px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "transparent", fontSize: 12.5, fontWeight: 600, color: "#475569", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={onSave} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#0f172a", fontSize: 12.5, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>Save</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .profile-page * { font-family: 'Sora', sans-serif; box-sizing: border-box; }
        .profile-page { background: #f4f6f9; min-height: 100vh; }

        .pp-save-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 8px; border: none;
          background: #0f172a; color: #fff; font-size: 12.5px; font-weight: 600;
          cursor: pointer; font-family: 'Sora', sans-serif; transition: all 0.15s;
        }
        .pp-save-btn:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

        .pp-skill-bar { height: 6px; border-radius: 99px; background: #e2e8f0; overflow: hidden; }
        .pp-skill-fill { height: 100%; border-radius: 99px; transition: width 0.6s cubic-bezier(.22,1,.36,1); }

        .pp-tag { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }

        .pp-tech-chip { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 5px; font-size: 11px; font-weight: 500; background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }

        .pp-card-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12; padding: 14px 0; border-bottom: 1px solid #f1f5f9; }
        .pp-card-row:last-child { border-bottom: none; padding-bottom: 0; }
        .pp-card-row:first-child { padding-top: 0; }

        .pp-contact-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
        .pp-contact-row:last-child { border-bottom: none; }

        .pp-metric { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }

        .social-icon-btn { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; text-decoration: none; }
        .social-icon-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.12); }

        @keyframes ppFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .pp-fade { animation: ppFade 0.25s ease both; }

        @media (max-width: 900px) {
          .pp-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .pp-metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pp-header-inner { flex-direction: column; text-align: center; }
          .pp-header-chips { justify-content: center !important; }
        }
      `}</style>

      <div className="profile-page">
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 16px" }}>

          {/* ── Page title ── */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>My Profile</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 3 }}>Manage your professional information and portfolio</div>
          </div>

          {/* ── Hero Banner ── */}
          <div className="pp-fade" style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1a2e4a 100%)",
            borderRadius: 16, padding: "32px 28px 28px",
            marginBottom: 24, position: "relative", overflow: "hidden",
          }}>
            {/* decorative circles */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -60, right: 80, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.025)", pointerEvents: "none" }} />

            <div className="pp-header-inner" style={{ display: "flex", alignItems: "center", gap: 24, position: "relative" }}>
              {/* avatar */}
              <div style={{
                width: 88, height: 88, borderRadius: 20, flexShrink: 0,
                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 30, fontWeight: 800, color: "#fff",
                boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
                border: "3px solid rgba(255,255,255,0.15)",
              }}>{seed.avatar}</div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  {seed.firstName} {seed.lastName}
                </div>
                <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{seed.role} &nbsp;·&nbsp; {seed.department}</div>
                <div className="pp-header-chips" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.25)", fontSize: 11, fontWeight: 600, color: "#4ade80" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} /> Active
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.07)", fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                    <FileText style={{ width: 10, height: 10 }} />{seed.employeeId}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.07)", fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                    <Calendar style={{ width: 10, height: 10 }} />Joined {fmtDate(seed.joinDate)}
                  </span>
                </div>
              </div>

              {/* metrics strip */}
              <div style={{ display: "flex", gap: 20, flexShrink: 0 }}>
                {[
                  { label: "Projects", value: seed.metrics.completedProjects },
                  { label: "Rating", value: seed.metrics.averageRating },
                  { label: "Hours", value: seed.metrics.totalHours.toLocaleString() },
                ].map(m => (
                  <div key={m.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em" }}>{m.value}</div>
                    <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em" }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Two-col layout ── */}
          <div className="pp-layout" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>

            {/* ══ LEFT SIDEBAR ══ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Contact Info */}
              <Section title="Contact Info" icon={User} accent="#1e293b"
                action={<IconBtn icon={editPersonal ? X : Edit2} onClick={(e: any) => { e.stopPropagation(); if (editPersonal) setEditPersonal(false); else setEditPersonal(true); }} title="Edit" />}>
                <div>
                  {[
                    { icon: Mail, label: "Email", key: "email", color: "#3b82f6", bg: "#eff6ff" },
                    { icon: Phone, label: "Phone", key: "phone", color: "#10b981", bg: "#f0fdf4" },
                    { icon: MapPin, label: "Location", key: "location", color: "#8b5cf6", bg: "#f5f3ff" },
                    { icon: Briefcase, label: "Department", key: null, value: seed.department, color: "#f59e0b", bg: "#fffbeb" },
                    { icon: Building, label: "Employee ID", key: null, value: seed.employeeId, color: "#64748b", bg: "#f8fafc" },
                  ].map(({ icon: Icon, label, key, value, color, bg }) => (
                    <div key={label} className="pp-contact-row">
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon style={{ width: 15, height: 15, color }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                        {editPersonal && key
                          ? <input defaultValue={(personal as any)[key]} onChange={(e) => setPersonal(p => ({ ...p, [key]: e.target.value }))}
                            style={{ width: "100%", height: 32, marginTop: 2, borderRadius: 6, border: "1.5px solid #e2e8f0", padding: "0 8px", fontSize: 12.5, color: "#0f172a", outline: "none", fontFamily: "inherit" }}
                            onFocus={(e) => (e.target.style.borderColor = "#334155")}
                            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")} />
                          : <div style={{ fontSize: 12.5, color: "#0f172a", fontWeight: 500, marginTop: 1, wordBreak: "break-word" }}>{key ? (personal as any)[key] : value}</div>
                        }
                      </div>
                    </div>
                  ))}
                  {editPersonal && (
                    <button className="pp-save-btn" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={() => setEditPersonal(false)}>
                      <Save style={{ width: 13, height: 13 }} /> Save Changes
                    </button>
                  )}
                </div>
              </Section>

              {/* Social Links */}
              <Section title="Social Links" icon={Globe} accent="#0f766e">
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { icon: Linkedin, bg: "#dbeafe", color: "#1d4ed8", href: seed.socialLinks.linkedin, label: "LinkedIn" },
                    { icon: Twitter, bg: "#e0f2fe", color: "#0284c7", href: seed.socialLinks.twitter, label: "Twitter" },
                    { icon: Github, bg: "#f1f5f9", color: "#334155", href: seed.socialLinks.github, label: "GitHub" },
                    { icon: Globe, bg: "#f5f3ff", color: "#7c3aed", href: seed.socialLinks.portfolio, label: "Portfolio" },
                  ].map(({ icon: Icon, bg, color, href, label }) => (
                    <a key={label} href={`https://${href}`} target="_blank" rel="noopener noreferrer"
                      className="social-icon-btn" style={{ background: bg, flex: "0 0 auto" }} title={label}>
                      <Icon style={{ width: 16, height: 16, color }} />
                    </a>
                  ))}
                </div>
              </Section>

              {/* Metrics */}
              <Section title="Performance" icon={TrendingUp} accent="#7c3aed">
                <div className="pp-metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                  {[
                    { label: "Done", value: seed.metrics.completedProjects, sub: "Total Projects", color: "#3b82f6" },
                    { label: "Active", value: seed.metrics.activeProjects, sub: "Working Projects", color: "#10b981" },
                    { label: "Hours", value: seed.metrics.totalHours, sub: "Hours", color: "#8b5cf6" },
                    { label: "Rating", value: seed.metrics.averageRating, sub: "Avg Score", color: "#f59e0b" },
                    { label: "Team", value: seed.metrics.teamSize, sub: "Members", color: "#0d9488" },
                    { label: "Skills", value: skills.length, sub: "Listed", color: "#e11d48" },
                  ].map(m => (
                    <div key={m.label} className="pp-metric">
                      <div style={{ fontSize: 20, fontWeight: 800, color: m.color, fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em", lineHeight: 1 }}>{m.value}</div>
                      <div style={{ fontSize: 10, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 4 }}>{m.sub}</div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* ══ RIGHT MAIN ══ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* About */}
              <Section title="About Me" icon={User} accent="#1e293b"
                action={<IconBtn icon={editBio ? X : Edit2} onClick={(e: any) => { e.stopPropagation(); setEditBio(b => !b); }} title="Edit bio" />}>
                {editBio ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4}
                      style={{ width: "100%", borderRadius: 10, border: "1.5px solid #e2e8f0", padding: "12px", fontSize: 13.5, color: "#0f172a", outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.65 }}
                      onFocus={(e) => (e.target.style.borderColor = "#334155")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")} />
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                      <button onClick={() => { setBio(seed.bio); setEditBio(false); }} style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "transparent", fontSize: 12.5, fontWeight: 600, color: "#475569", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                      <button className="pp-save-btn" onClick={() => setEditBio(false)}><Save style={{ width: 13, height: 13 }} />Save</button>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.75, margin: 0 }}>{bio}</p>
                )}
              </Section>

              {/* Skills */}
              <Section title="Skills & Expertise" icon={Code} accent="#0f766e"
                action={<AddBtn label="Add Skill" onClick={() => setNewSkill({ name: "", level: 80, category: "Frontend" })} />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {skills.map((s, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid #f1f5f9" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0f172a" }}>{s.name}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span className="pp-tag" style={{ background: (catColor[s.category] || "#64748b") + "18", color: catColor[s.category] || "#64748b", border: `1px solid ${catColor[s.category] || "#64748b"}30` }}>
                                {s.category}
                              </span>
                              <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{s.level}%</span>
                            </div>
                          </div>
                          <div className="pp-skill-bar">
                            <div className="pp-skill-fill" style={{ width: `${s.level}%`, background: catColor[s.category] || "#64748b" }} />
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                          <IconBtn icon={Edit2} onClick={() => setEditSkillIdx(i)} title="Edit" />
                          <IconBtn icon={Trash2} color="#dc2626" bg="#fef2f2" onClick={() => setSkills(sk => sk.filter((_, j) => j !== i))} title="Remove" />
                        </div>
                      </div>
                      {editSkillIdx === i && (
                        <RowEditForm
                          fields={[{ key: "name", label: "Skill Name" }, { key: "level", label: "Level (0–100)", type: "number" }, { key: "category", label: "Category" }]}
                          value={s}
                          onChange={(k, v) => setSkills(sk => sk.map((x, j) => j === i ? { ...x, [k]: k === "level" ? Number(v) : v } : x))}
                          onSave={() => setEditSkillIdx(null)}
                          onCancel={() => setEditSkillIdx(null)}
                        />
                      )}
                    </div>
                  ))}

                  {/* new skill row */}
                  {newSkill && (
                    <RowEditForm
                      fields={[{ key: "name", label: "Skill Name" }, { key: "level", label: "Level (0–100)", type: "number" }, { key: "category", label: "Category" }]}
                      value={newSkill}
                      onChange={(k, v) => setNewSkill(ns => ns ? { ...ns, [k]: k === "level" ? Number(v) : v } : ns)}
                      onSave={() => { if (newSkill.name) setSkills(sk => [...sk, newSkill]); setNewSkill(null); }}
                      onCancel={() => setNewSkill(null)}
                    />
                  )}
                </div>
              </Section>

              {/* Projects */}
              <Section title="Projects" icon={Target} accent="#ea580c"
                action={<AddBtn label="Add Project" onClick={() => setNewProj({ id: `PRJ${Date.now()}`, name: "", role: "", status: "planning", contribution: 0, duration: "", technologies: [] })} />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {projects.map((p, i) => (
                    <div key={p.id} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", background: "#fafafa" }}>
                      {editProjIdx === i ? (
                        <RowEditForm
                          fields={[{ key: "name", label: "Project Name" }, { key: "role", label: "Your Role" }, { key: "status", label: "Status" }, { key: "duration", label: "Duration" }, { key: "contribution", label: "Contribution %", type: "number" }, { key: "technologies", label: "Tech (comma sep.)" }]}
                          value={{ ...p, technologies: p.technologies.join(", ") }}
                          onChange={(k, v) => setProjects(ps => ps.map((x, j) => j === i ? { ...x, [k]: k === "technologies" ? v.split(",").map(t => t.trim()) : k === "contribution" ? Number(v) : v } : x))}
                          onSave={() => setEditProjIdx(null)}
                          onCancel={() => setEditProjIdx(null)}
                        />
                      ) : (
                        <>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{p.name}</div>
                              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{p.role}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span className="pp-tag" style={{ background: ss(p.status).bg, color: ss(p.status).color, border: "none", fontSize: 10.5 }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: ss(p.status).dot, marginRight: 4 }} />
                                {p.status === "in-progress" ? "In Progress" : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                              </span>
                              <IconBtn icon={Edit2} onClick={() => setEditProjIdx(i)} title="Edit" />
                              <IconBtn icon={Trash2} color="#dc2626" bg="#fef2f2" onClick={() => setProjects(ps => ps.filter((_, j) => j !== i))} title="Remove" />
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: "#64748b", marginBottom: 10 }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar style={{ width: 11, height: 11 }} />{p.duration}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Target style={{ width: 11, height: 11 }} />{p.contribution}% contribution</span>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {p.technologies.map(t => <span key={t} className="pp-tech-chip">{t}</span>)}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {newProj && (
                    <RowEditForm
                      fields={[{ key: "name", label: "Project Name" }, { key: "role", label: "Your Role" }, { key: "status", label: "Status" }, { key: "duration", label: "Duration" }, { key: "contribution", label: "Contribution %", type: "number" }, { key: "technologies", label: "Tech (comma sep.)" }]}
                      value={{ ...newProj, technologies: newProj.technologies.join(", ") }}
                      onChange={(k, v) => setNewProj(p => p ? { ...p, [k]: k === "technologies" ? v.split(",").map(t => t.trim()) : k === "contribution" ? Number(v) : v } : p)}
                      onSave={() => { if (newProj.name) setProjects(ps => [...ps, newProj]); setNewProj(null); }}
                      onCancel={() => setNewProj(null)}
                    />
                  )}
                </div>
              </Section>

              {/* Education */}
              <Section title="Education" icon={GraduationCap} accent="#1d4ed8"
                action={<AddBtn label="Add Education" onClick={() => setNewEdu({ degree: "", institution: "", year: "", gpa: "" })} />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {education.map((e, i) => (
                    <div key={i}>
                      <div className="pp-card-row" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "14px 0", borderBottom: "1px solid #f1f5f9" }}>
                        <div style={{ display: "flex", gap: 14, flex: 1 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <GraduationCap style={{ width: 18, height: 18, color: "#fff" }} />
                          </div>
                          <div>
                            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a" }}>{e.degree}</div>
                            <div style={{ fontSize: 12.5, color: "#475569", marginTop: 2 }}>{e.institution}</div>
                            <div style={{ display: "flex", gap: 12, fontSize: 11.5, color: "#94a3b8", marginTop: 4 }}>
                              <span>{e.year}</span><span>·</span><span>GPA: {e.gpa}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <IconBtn icon={Edit2} onClick={() => setEditEduIdx(i)} title="Edit" />
                          <IconBtn icon={Trash2} color="#dc2626" bg="#fef2f2" onClick={() => setEducation(ed => ed.filter((_, j) => j !== i))} title="Remove" />
                        </div>
                      </div>
                      {editEduIdx === i && (
                        <RowEditForm
                          fields={[{ key: "degree", label: "Degree" }, { key: "institution", label: "Institution" }, { key: "year", label: "Year" }, { key: "gpa", label: "GPA" }]}
                          value={e}
                          onChange={(k, v) => setEducation(ed => ed.map((x, j) => j === i ? { ...x, [k]: v } : x))}
                          onSave={() => setEditEduIdx(null)}
                          onCancel={() => setEditEduIdx(null)}
                        />
                      )}
                    </div>
                  ))}
                  {newEdu && (
                    <RowEditForm
                      fields={[{ key: "degree", label: "Degree" }, { key: "institution", label: "Institution" }, { key: "year", label: "Year" }, { key: "gpa", label: "GPA" }]}
                      value={newEdu}
                      onChange={(k, v) => setNewEdu(e => e ? { ...e, [k]: v } : e)}
                      onSave={() => { if (newEdu.degree) setEducation(ed => [...ed, newEdu]); setNewEdu(null); }}
                      onCancel={() => setNewEdu(null)}
                    />
                  )}
                </div>
              </Section>

              {/* Certifications */}
              <Section title="Certifications" icon={Award} accent="#16a34a"
                action={<AddBtn label="Add Certificate" onClick={() => setNewCert({ name: "", issuer: "", date: "", status: "active" })} />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {certs.map((c, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "14px 0", borderBottom: "1px solid #f1f5f9" }}>
                        <div style={{ display: "flex", gap: 14, flex: 1 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #16a34a, #22c55e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Award style={{ width: 18, height: 18, color: "#fff" }} />
                          </div>
                          <div>
                            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a" }}>{c.name}</div>
                            <div style={{ fontSize: 12.5, color: "#475569", marginTop: 2 }}>{c.issuer}</div>
                            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 5 }}>
                              <span style={{ fontSize: 11.5, color: "#94a3b8" }}>{c.date}</span>
                              <span className="pp-tag" style={{ background: ss(c.status).bg, color: ss(c.status).color, fontSize: 10.5 }}>
                                <CheckCircle style={{ width: 9, height: 9, marginRight: 3 }} />{c.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <IconBtn icon={Edit2} onClick={() => setEditCertIdx(i)} title="Edit" />
                          <IconBtn icon={Trash2} color="#dc2626" bg="#fef2f2" onClick={() => setCerts(cs => cs.filter((_, j) => j !== i))} title="Remove" />
                        </div>
                      </div>
                      {editCertIdx === i && (
                        <RowEditForm
                          fields={[{ key: "name", label: "Certificate Name" }, { key: "issuer", label: "Issuer" }, { key: "date", label: "Date (YYYY-MM)" }, { key: "status", label: "Status" }]}
                          value={c}
                          onChange={(k, v) => setCerts(cs => cs.map((x, j) => j === i ? { ...x, [k]: v } : x))}
                          onSave={() => setEditCertIdx(null)}
                          onCancel={() => setEditCertIdx(null)}
                        />
                      )}
                    </div>
                  ))}
                  {newCert && (
                    <RowEditForm
                      fields={[{ key: "name", label: "Certificate Name" }, { key: "issuer", label: "Issuer" }, { key: "date", label: "Date (YYYY-MM)" }, { key: "status", label: "Status" }]}
                      value={newCert}
                      onChange={(k, v) => setNewCert(c => c ? { ...c, [k]: v } : c)}
                      onSave={() => { if (newCert.name) setCerts(cs => [...cs, newCert]); setNewCert(null); }}
                      onCancel={() => setNewCert(null)}
                    />
                  )}
                </div>
              </Section>

              {/* Recent Activities */}
              <Section title="Recent Activities" icon={Clock} accent="#7c3aed">
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {seed.activities.map((a, i) => (
                    <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < seed.activities.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <FileText style={{ width: 15, height: 15, color: "#7c3aed" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</div>
                        <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 2 }}>{a.type} · {fmtDate(a.date)} · {a.hoursSpent}h</div>
                      </div>
                      <span className="pp-tag" style={{ background: ss(a.status).bg, color: ss(a.status).color, fontSize: 10.5, whiteSpace: "nowrap" }}>
                        {a.status === "in-progress" ? "In Progress" : a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}