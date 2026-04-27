import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import {
  formatMeetingDate,
  formatMeetingTimeRange,
  MEETING_PRIORITY_CLASS,
  MEETING_STATUS_CLASS,
} from "@/constants/meeting"
import { Meeting } from "@/types/meeting.types"

interface ViewMeetingModalProps {
  isOpen: boolean
  onClose: () => void
  meeting: Meeting | null
}

export function ViewMeetingModal({ isOpen, onClose, meeting }: ViewMeetingModalProps) {
  if (!isOpen || !meeting) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Meeting Details"
      description="Client, project, participants, schedule, and additional meeting context."
      size="xl"
    >
      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-slate-900">{meeting.title}</h3>
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${MEETING_STATUS_CLASS[meeting.status]}`}>
              {meeting.status}
            </span>
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${MEETING_PRIORITY_CLASS[meeting.priority]}`}>
              {meeting.priority}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-3">{meeting.agenda || "No agenda provided."}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 p-4 bg-white">
            <p className="text-xs uppercase tracking-wide text-slate-500">Client</p>
            <p className="text-sm font-semibold text-slate-900 mt-1">{meeting.clientName}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-white">
            <p className="text-xs uppercase tracking-wide text-slate-500">Project</p>
            <p className="text-sm font-semibold text-slate-900 mt-1">{meeting.projectName}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-white">
            <p className="text-xs uppercase tracking-wide text-slate-500">Host</p>
            <p className="text-sm font-semibold text-slate-900 mt-1">{meeting.host}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-white">
            <p className="text-xs uppercase tracking-wide text-slate-500">Date</p>
            <p className="text-sm font-semibold text-slate-900 mt-1">{formatMeetingDate(meeting.date)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-white">
            <p className="text-xs uppercase tracking-wide text-slate-500">Time</p>
            <p className="text-sm font-semibold text-slate-900 mt-1">{formatMeetingTimeRange(meeting.startTime, meeting.endTime)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-white">
            <p className="text-xs uppercase tracking-wide text-slate-500">Type</p>
            <p className="text-sm font-semibold text-slate-900 mt-1">{meeting.meetingType}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-white sm:col-span-2 lg:col-span-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Location</p>
            <p className="text-sm font-semibold text-slate-900 mt-1 break-all">{meeting.location || "N/A"}</p>
          </div>
        </div>

        {meeting.meetingLink && (
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
            <p className="text-xs uppercase tracking-wide text-sky-700">Meeting Link</p>
            <a
              href={meeting.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-sky-700 hover:text-sky-900 underline break-all"
            >
              {meeting.meetingLink}
            </a>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 p-4 bg-white">
          <p className="text-xs uppercase tracking-wide text-slate-500">Attendee Employees</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {meeting.attendees.map((employee) => (
              <span
                key={employee}
                className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {employee}
              </span>
            ))}
          </div>
        </div>

        {meeting.expectedOutcome && (
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <p className="text-xs uppercase tracking-wide text-indigo-700">Expected Outcome</p>
            <p className="text-sm text-indigo-900 mt-1">{meeting.expectedOutcome}</p>
          </div>
        )}

        {meeting.notes && (
          <div className="rounded-xl border border-slate-200 p-4 bg-white">
            <p className="text-xs uppercase tracking-wide text-slate-500">Notes</p>
            <p className="text-sm text-slate-700 mt-1">{meeting.notes}</p>
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}
