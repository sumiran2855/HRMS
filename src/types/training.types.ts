export interface Skill {
  id: string
  name: string
  category: string
  color: string
}

export interface TrainingProgress {
  skillId: string
  status: "not_started" | "in_progress" | "completed"
  progress: number
  completedDate?: string
}

export interface Feedback {
  id: string
  mentorId: string
  mentorName: string
  date: string
  note: string
  rating: number
}

export interface Trainee {
  id: string
  name: string
  role: string
  department: string
  joinDate: string
  mentorId: string
  avatar: string
  skills: TrainingProgress[]
  feedback: Feedback[]
}

export interface Mentor {
  id: string
  name: string
  role: string
  department: string
  avatar: string
  expertise: string[]
  assignedTrainees: string[]
}

export interface TrainingStats {
  total: number
  inProgress: number
  completed: number
  notStarted: number
}

export interface UseTrainingReturn {
  trainees: Trainee[]
  stats: TrainingStats
  filtered: Trainee[]
  activeTab: string
  setActiveTab: (tab: string) => void
  assignOpen: boolean
  setAssignOpen: (v: boolean) => void
  feedbackModal: Trainee | null
  setFeedbackModal: (t: Trainee | null) => void
  searchQuery: string
  setSearchQuery: (v: string) => void
  filterMentor: string
  setFilterMentor: (v: string) => void
  filterStatus: string
  setFilterStatus: (v: string) => void
  filterSkill: string
  setFilterSkill: (v: string) => void
  activeMentorTab: string
  setActiveMentorTab: (v: string) => void
  getMentor: (id: string) => Mentor | undefined
  handleAssign: (data: AssignFormData) => void
  handleAddFeedback: (tid: string, fb: Feedback) => void
  handleUpdateProgress: (tid: string, sid: string, val: number) => void
}

export interface AssignFormData {
  name: string
  role: string
  dept: string
  mentorId: string
  skills: string[]
}
