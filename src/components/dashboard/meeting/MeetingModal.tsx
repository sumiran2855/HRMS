import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import {
  MEETING_CLIENT_OPTIONS,
  MEETING_EMPLOYEE_OPTIONS,
  MEETING_PROJECT_OPTIONS_BY_CLIENT,
  MEETING_PRIORITY_OPTIONS,
  MEETING_STATUS_OPTIONS,
  MEETING_TYPE_OPTIONS,
  toDateTimeValue,
} from "@/constants/meeting"
import { Meeting, MeetingFormPayload, MeetingPriority, MeetingStatus, MeetingType } from "@/types/meeting.types"

interface MeetingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: MeetingFormPayload) => void
  meeting: Meeting | null
}

type MeetingFormState = {
  title: string
  agenda: string
  date: string
  startTime: string
  endTime: string
  location: string
  host: string
  clientName: string
  projectName: string
  attendees: string[]
  status: MeetingStatus
  meetingType: MeetingType
  priority: MeetingPriority
  meetingLink: string
  expectedOutcome: string
  notes: string
}

const selectClass =
  "w-full h-12 rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition-all hover:border-slate-300 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10"

function getDefaultFormState(meeting?: Meeting | null): MeetingFormState {
  if (!meeting) {
    return {
      title: "",
      agenda: "",
      date: new Date().toISOString().slice(0, 10),
      startTime: "09:00",
      endTime: "10:00",
      location: "",
      host: "",
      clientName: "",
      projectName: "",
      attendees: [],
      status: "Scheduled",
      meetingType: "In-Person",
      priority: "Medium",
      meetingLink: "",
      expectedOutcome: "",
      notes: "",
    }
  }

  return {
    title: meeting.title,
    agenda: meeting.agenda,
    date: meeting.date,
    startTime: meeting.startTime,
    endTime: meeting.endTime,
    location: meeting.location,
    host: meeting.host,
    clientName: meeting.clientName,
    projectName: meeting.projectName,
    attendees: meeting.attendees,
    status: meeting.status,
    meetingType: meeting.meetingType,
    priority: meeting.priority,
    meetingLink: meeting.meetingLink ?? "",
    expectedOutcome: meeting.expectedOutcome ?? "",
    notes: meeting.notes ?? "",
  }
}

export function MeetingModal({ isOpen, onClose, onSubmit, meeting }: MeetingModalProps) {
  const [formData, setFormData] = useState<MeetingFormState>(getDefaultFormState(meeting))
  const [error, setError] = useState("")

  const isEdit = Boolean(meeting)

  const updateField = <K extends keyof MeetingFormState>(key: K, value: MeetingFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const availableProjects =
    MEETING_PROJECT_OPTIONS_BY_CLIENT[formData.clientName] ??
    Object.values(MEETING_PROJECT_OPTIONS_BY_CLIENT).flat()

  const handleClientChange = (value: string) => {
    const clientProjects = MEETING_PROJECT_OPTIONS_BY_CLIENT[value] ?? []

    setFormData((prev) => ({
      ...prev,
      clientName: value,
      projectName: clientProjects.includes(prev.projectName) ? prev.projectName : clientProjects[0] ?? "",
    }))
  }

  const handleEmployeeSelection = (value: string) => {
    setFormData((prev) => {
      if (prev.attendees.includes(value)) {
        return { ...prev, attendees: prev.attendees.filter((item) => item !== value) }
      }

      return { ...prev, attendees: [...prev.attendees, value] }
    })
  }

  const handleSubmit = () => {
    if (
      !formData.title.trim() ||
      !formData.clientName.trim() ||
      !formData.projectName.trim() ||
      !formData.host.trim() ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      formData.attendees.length === 0
    ) {
      setError("Please fill title, client, project, host, date/time and attendees.")
      return
    }

    if (toDateTimeValue(formData.date, formData.endTime) <= toDateTimeValue(formData.date, formData.startTime)) {
      setError("End time must be later than start time.")
      return
    }

    if ((formData.meetingType === "Virtual" || formData.meetingType === "Hybrid") && !formData.meetingLink.trim()) {
      setError("Meeting link is required for virtual or hybrid meetings.")
      return
    }

    const payload: MeetingFormPayload = {
      title: formData.title.trim(),
      agenda: formData.agenda.trim(),
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location.trim(),
      host: formData.host.trim(),
      clientName: formData.clientName.trim(),
      projectName: formData.projectName.trim(),
      attendees: formData.attendees,
      status: formData.status,
      meetingType: formData.meetingType,
      priority: formData.priority,
      meetingLink: formData.meetingLink.trim(),
      expectedOutcome: formData.expectedOutcome.trim(),
      notes: formData.notes.trim(),
    }

    onSubmit(payload)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Meeting" : "Add Meeting"}
      description="Capture complete meeting details including client, project, and attendee employees."
      size="xl"
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Title</label>
            <Input value={formData.title} onChange={(e) => updateField("title", e.target.value)} placeholder="e.g. Sprint Planning" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Host</label>
            <Input value={formData.host} onChange={(e) => updateField("host", e.target.value)} placeholder="Meeting owner" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Client</label>
            <select
              value={formData.clientName}
              onChange={(e) => handleClientChange(e.target.value)}
              className={selectClass}
            >
              <option value="">Select client</option>
              {MEETING_CLIENT_OPTIONS.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Project</label>
            <select
              value={formData.projectName}
              onChange={(e) => updateField("projectName", e.target.value)}
              className={selectClass}
              disabled={!availableProjects.length}
            >
              <option value="">Select project</option>
              {availableProjects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Agenda</label>
          <textarea
            rows={3}
            value={formData.agenda}
            onChange={(e) => updateField("agenda", e.target.value)}
            placeholder="What will be discussed in this meeting?"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all hover:border-slate-300 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
            <Input type="date" value={formData.date} onChange={(e) => updateField("date", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Start Time</label>
            <Input type="time" value={formData.startTime} onChange={(e) => updateField("startTime", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">End Time</label>
            <Input type="time" value={formData.endTime} onChange={(e) => updateField("endTime", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => updateField("priority", e.target.value as MeetingPriority)}
              className={selectClass}
            >
              {MEETING_PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Type</label>
            <select
              value={formData.meetingType}
              onChange={(e) => updateField("meetingType", e.target.value as MeetingType)}
              className={selectClass}
            >
              {MEETING_TYPE_OPTIONS.filter((item) => item !== "All").map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value as MeetingStatus)}
              className={selectClass}
            >
              {MEETING_STATUS_OPTIONS.filter((item) => item !== "All").map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Location / Room</label>
            <Input
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Conference room / venue"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Link</label>
            <Input
              value={formData.meetingLink}
              onChange={(e) => updateField("meetingLink", e.target.value)}
              placeholder="https://meet.example.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Expected Outcome</label>
            <Input
              value={formData.expectedOutcome}
              onChange={(e) => updateField("expectedOutcome", e.target.value)}
              placeholder="Expected decision or result"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Attendee Employees (multi-select)</label>
          <div className="rounded-xl border-2 border-slate-200 p-3 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {MEETING_EMPLOYEE_OPTIONS.map((employee) => {
                const checked = formData.attendees.includes(employee)

                return (
                  <label
                    key={employee}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleEmployeeSelection(employee)}
                      className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span>{employee}</span>
                  </label>
                )
              })}
            </div>

            <p className="text-xs text-slate-500">
              Selected: {formData.attendees.length ? formData.attendees.join(", ") : "No employees selected"}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Any additional details"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all hover:border-slate-300 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10"
          />
        </div>

        {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-sky-600 hover:bg-sky-700 text-white cursor-pointer">
            {isEdit ? "Update Meeting" : "Create Meeting"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
