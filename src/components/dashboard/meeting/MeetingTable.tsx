import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  MapPin,
  Pencil,
  Users,
  Video,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  formatMeetingDate,
  formatMeetingTimeRange,
  MEETING_PRIORITY_CLASS,
  MEETING_STATUS_CLASS,
} from "@/constants/meeting"
import { Meeting } from "@/types/meeting.types"

interface MeetingTableProps {
  meetings: Meeting[]
  filteredCount: number
  onView: (meeting: Meeting) => void
  onEdit: (meeting: Meeting) => void
  clearFilters: () => void
}

export function MeetingTable({ meetings, filteredCount, onView, onEdit, clearFilters }: MeetingTableProps) {
  if (!meetings.length) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">No meetings found for current filters.</p>
        {filteredCount === 0 && (
          <Button variant="outline" className="mt-4 cursor-pointer" onClick={clearFilters}>
            Reset Filters
          </Button>
        )}
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Meeting</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Client / Project</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Schedule</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Participants</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type & Priority</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-sky-50/50 transition-colors">
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-slate-900">{meeting.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{meeting.id}</p>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm text-slate-800">{meeting.clientName}</p>
                  <p className="text-xs text-slate-500 mt-1">{meeting.projectName}</p>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm text-slate-800 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-slate-500" />
                    {formatMeetingDate(meeting.date)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-slate-400" />
                    {formatMeetingTimeRange(meeting.startTime, meeting.endTime)}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm text-slate-800">Host: {meeting.host}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    {meeting.attendees.length} attendees
                  </p>
                </td>

                <td className="px-5 py-4 space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    {meeting.meetingType === "Virtual" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                    {meeting.meetingType}
                  </span>
                  <div>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${MEETING_PRIORITY_CLASS[meeting.priority]}`}
                    >
                      {meeting.priority}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${MEETING_STATUS_CLASS[meeting.status]}`}>
                    {meeting.status === "Completed" ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : meeting.status === "Cancelled" ? (
                      <XCircle className="h-3.5 w-3.5" />
                    ) : (
                      <Clock3 className="h-3.5 w-3.5" />
                    )}
                    {meeting.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 cursor-pointer"
                      onClick={() => onView(meeting)}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 cursor-pointer"
                      onClick={() => onEdit(meeting)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
