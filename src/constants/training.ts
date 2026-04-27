import { Skill, Mentor, Trainee } from "@/types/training.types"

export const SKILLS_POOL: Skill[] = [
  { id: "s1", name: "React", category: "Frontend", color: "#61dafb" },
  { id: "s2", name: "Node.js", category: "Backend", color: "#68a063" },
  { id: "s3", name: "TypeScript", category: "Language", color: "#3178c6" },
  { id: "s4", name: "Communication", category: "Soft Skills", color: "#f59e0b" },
  { id: "s5", name: "SQL", category: "Database", color: "#e44d26" },
  { id: "s6", name: "Leadership", category: "Soft Skills", color: "#8b5cf6" },
  { id: "s7", name: "Python", category: "Language", color: "#3572a5" },
  { id: "s8", name: "System Design", category: "Architecture", color: "#ef4444" },
  { id: "s9", name: "Git & DevOps", category: "Tools", color: "#f97316" },
  { id: "s10", name: "Agile/Scrum", category: "Methodology", color: "#10b981" },
]

export const MENTORS: Mentor[] = [
  { id: "m1", name: "Sarah Johnson", role: "Senior Engineer", department: "Engineering", avatar: "SJ", expertise: ["React", "TypeScript", "System Design"], assignedTrainees: ["t1", "t2"] },
  { id: "m2", name: "Michael Chen", role: "Tech Lead", department: "Backend", avatar: "MC", expertise: ["Node.js", "SQL", "System Design"], assignedTrainees: ["t3", "t4"] },
  { id: "m3", name: "Emily Davis", role: "Data Scientist", department: "Data", avatar: "ED", expertise: ["Python", "SQL", "Communication"], assignedTrainees: ["t5"] },
  { id: "m4", name: "Robert Wilson", role: "Engineering Manager", department: "Engineering", avatar: "RW", expertise: ["Leadership", "Communication", "Agile/Scrum"], assignedTrainees: ["t6"] },
]

export const INITIAL_TRAINEES: Trainee[] = [
  {
    id: "t1", name: "Arjun Sharma", role: "Junior Developer", department: "Engineering",
    joinDate: "2024-01-15", mentorId: "m1", avatar: "AS",
    skills: [
      { skillId: "s1", status: "in_progress", progress: 70 },
      { skillId: "s3", status: "in_progress", progress: 45 },
      { skillId: "s9", status: "completed", progress: 100, completedDate: "2024-02-10" },
    ],
    feedback: [
      { id: "f1", mentorId: "m1", mentorName: "Sarah Johnson", date: "2024-02-01", note: "Arjun is making excellent progress with React. Needs to focus more on TypeScript generics.", rating: 4 },
    ],
  },
  {
    id: "t2", name: "Priya Patel", role: "UI Designer", department: "Design",
    joinDate: "2024-01-20", mentorId: "m1", avatar: "PP",
    skills: [
      { skillId: "s1", status: "completed", progress: 100, completedDate: "2024-02-20" },
      { skillId: "s4", status: "in_progress", progress: 60 },
    ],
    feedback: [
      { id: "f2", mentorId: "m1", mentorName: "Sarah Johnson", date: "2024-02-15", note: "Priya has completed React and is growing in communication skills.", rating: 5 },
    ],
  },
  {
    id: "t3", name: "Rahul Kumar", role: "Backend Developer", department: "Engineering",
    joinDate: "2024-02-01", mentorId: "m2", avatar: "RK",
    skills: [
      { skillId: "s2", status: "in_progress", progress: 55 },
      { skillId: "s5", status: "in_progress", progress: 40 },
      { skillId: "s8", status: "not_started", progress: 0 },
    ],
    feedback: [],
  },
  {
    id: "t4", name: "Neha Singh", role: "QA Engineer", department: "Quality",
    joinDate: "2024-02-05", mentorId: "m2", avatar: "NS",
    skills: [
      { skillId: "s5", status: "completed", progress: 100, completedDate: "2024-03-01" },
      { skillId: "s10", status: "in_progress", progress: 75 },
    ],
    feedback: [
      { id: "f3", mentorId: "m2", mentorName: "Michael Chen", date: "2024-03-05", note: "Neha is excelling in SQL. Agile mindset is developing well.", rating: 4 },
    ],
  },
  {
    id: "t5", name: "Vikram Nair", role: "Data Analyst", department: "Data",
    joinDate: "2024-02-10", mentorId: "m3", avatar: "VN",
    skills: [
      { skillId: "s7", status: "in_progress", progress: 65 },
      { skillId: "s5", status: "in_progress", progress: 80 },
      { skillId: "s4", status: "not_started", progress: 0 },
    ],
    feedback: [
      { id: "f4", mentorId: "m3", mentorName: "Emily Davis", date: "2024-03-10", note: "Vikram has strong analytical skills. Python progress is solid.", rating: 4 },
    ],
  },
  {
    id: "t6", name: "Anjali Mehra", role: "Product Manager", department: "Product",
    joinDate: "2024-01-10", mentorId: "m4", avatar: "AM",
    skills: [
      { skillId: "s6", status: "completed", progress: 100, completedDate: "2024-03-15" },
      { skillId: "s10", status: "completed", progress: 100, completedDate: "2024-03-20" },
      { skillId: "s4", status: "completed", progress: 100, completedDate: "2024-03-12" },
    ],
    feedback: [
      { id: "f5", mentorId: "m4", mentorName: "Robert Wilson", date: "2024-03-18", note: "Anjali has demonstrated outstanding leadership and communication. All modules complete.", rating: 5 },
    ],
  },
]

export const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  not_started: { label: "Not Started", color: "#9ca3af", bg: "#f3f4f6" },
  in_progress:  { label: "In Progress",  color: "#f59e0b", bg: "#fef3c7" },
  completed:    { label: "Completed",    color: "#10b981", bg: "#d1fae5" },
}

export const AVATAR_COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#06b6d4"]

export const TRAINING_TABS = [
  { id: "overview",  label: "Overview",          icon: "TrendingUp" },
  { id: "trainees",  label: "Trainees",           icon: "Users"      },
  { id: "mentors",   label: "Mentor Dashboard",   icon: "Award"      },
  { id: "my-view",   label: "Trainee View",       icon: "BookOpen"   },
]
