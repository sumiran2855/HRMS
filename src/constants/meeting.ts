import { Meeting, MeetingPriority, MeetingStatus, MeetingType } from "@/types/meeting.types"

export const MEETING_STATUS_OPTIONS: Array<"All" | MeetingStatus> = [
  "All",
  "Scheduled",
  "Ongoing",
  "Completed",
  "Cancelled",
]

export const MEETING_TYPE_OPTIONS: Array<"All" | MeetingType> = ["All", "In-Person", "Virtual", "Hybrid"]

export const MEETING_PRIORITY_OPTIONS: MeetingPriority[] = ["Low", "Medium", "High"]

export const MEETING_PAGE_SIZE_OPTIONS = [5, 10, 15]

export const MEETING_CLIENT_OPTIONS = [
  "Apex Retail Group",
  "Global FinServ",
  "Northwind Logistics",
  "Internal",
]

export const MEETING_PROJECT_OPTIONS_BY_CLIENT: Record<string, string[]> = {
  "Apex Retail Group": [
    "Workforce Optimization Suite",
    "Retail HR Automation",
  ],
  "Global FinServ": [
    "HRMS Compliance Automation",
    "Payroll Audit Revamp",
  ],
  "Northwind Logistics": [
    "Field Attendance Sync",
    "Driver Shift Planning",
  ],
  Internal: [
    "Attendance Modernization",
    "Talent Acquisition Sprint",
  ],
}

export const MEETING_EMPLOYEE_OPTIONS = [
  "Aisha Thomas",
  "Ravi Menon",
  "Priya Desai",
  "Arjun Singh",
  "Fatima Noor",
  "Dev Patel",
  "Nitin Rao",
  "Sana Khan",
  "Karan Malik",
  "Neha Kapoor",
]

export const MEETING_DATA: Meeting[] = [
  {
    id: "MTG-1001",
    title: "Quarterly Delivery Planning",
    agenda: "Align delivery milestones and resource allocation for Q2.",
    date: "2026-04-29",
    startTime: "10:00",
    endTime: "11:00",
    location: "Conference Room Atlas",
    host: "Neha Kapoor",
    clientName: "Apex Retail Group",
    projectName: "Workforce Optimization Suite",
    attendees: ["Aisha Thomas", "Ravi Menon", "Priya Desai", "Arjun Singh"],
    status: "Scheduled",
    meetingType: "In-Person",
    priority: "High",
    expectedOutcome: "Approve final sprint staffing for rollout phase.",
    notes: "Bring updated hiring funnel and payroll impact summary.",
  },
  {
    id: "MTG-1002",
    title: "Client Progress Check-in",
    agenda: "Review project blockers and sign off on feature priorities.",
    date: "2026-04-28",
    startTime: "15:00",
    endTime: "16:00",
    location: "Online Meeting",
    host: "Ravi Menon",
    clientName: "Global FinServ",
    projectName: "HRMS Compliance Automation",
    attendees: ["Ravi Menon", "Karan Malik", "Fatima Noor"],
    status: "Scheduled",
    meetingType: "Virtual",
    priority: "Medium",
    meetingLink: "https://meet.example.com/finserv-checkin",
    expectedOutcome: "Finalize compliance module scope for next release.",
  },
  {
    id: "MTG-1003",
    title: "Internal Retrospective",
    agenda: "Discuss lessons learned from biometric attendance deployment.",
    date: "2026-04-25",
    startTime: "09:30",
    endTime: "10:30",
    location: "Townhall 2",
    host: "Aisha Thomas",
    clientName: "Internal",
    projectName: "Attendance Modernization",
    attendees: ["Aisha Thomas", "Dev Patel", "Nitin Rao", "Sana Khan"],
    status: "Completed",
    meetingType: "Hybrid",
    priority: "Low",
    meetingLink: "https://meet.example.com/attendance-retro",
    notes: "Create follow-up plan for mobile app clock-in issues.",
  },
]

export const MEETING_STATUS_CLASS: Record<MeetingStatus, string> = {
  Scheduled: "bg-sky-100 text-sky-800 border-sky-200",
  Ongoing: "bg-amber-100 text-amber-800 border-amber-200",
  Completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Cancelled: "bg-rose-100 text-rose-800 border-rose-200",
}

export const MEETING_PRIORITY_CLASS: Record<MeetingPriority, string> = {
  Low: "bg-slate-100 text-slate-700 border-slate-200",
  Medium: "bg-indigo-100 text-indigo-700 border-indigo-200",
  High: "bg-rose-100 text-rose-700 border-rose-200",
}

export function toDateTimeValue(date: string, time: string) {
  return new Date(`${date}T${time}:00`).getTime()
}

export function formatMeetingDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatMeetingTimeRange(startTime: string, endTime: string) {
  const to12Hour = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hour12 = hours % 12 || 12
    return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`
  }

  return `${to12Hour(startTime)} - ${to12Hour(endTime)}`
}
