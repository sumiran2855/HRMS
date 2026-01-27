import { StatCard } from "@/components/dashboard/state-cards"
import { MeetingSchedule } from "@/components/dashboard/meeting-schedules"
import { EmployeeLeave } from "@/components/dashboard/employee-leave"
import { ActivitySection } from "@/components/dashboard/activity-section"
import { FeedbackSection } from "@/components/dashboard/feedback-section"
import { AnnouncementSection } from "@/components/dashboard/announcement-section"
import { CalendarWidget } from "@/components/dashboard/calender-widegt"
import { statsRow1 , statsRow2} from "@/types/dashboard"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Row 1 */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {statsRow1.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Stats Row 2 */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {statsRow2.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Meeting Schedule & Calendar */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        style={{ ["--dashboard-panel-h" as any]: "clamp(680px, calc(100vh - 260px), 960px)" }}
      >
        <div className="lg:col-span-6 lg:h-[var(--dashboard-panel-h)] min-h-0 flex flex-col gap-6">
          <div className="flex-1 min-h-0">
            <MeetingSchedule className="h-full" />
          </div>
        </div>

        <div className="lg:col-span-6 lg:h-[var(--dashboard-panel-h)] min-h-0">
          <CalendarWidget className="h-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:h-[500px] min-h-0">
          <EmployeeLeave className="h-full" />
        </div>
        <div className="lg:h-[500px] min-h-0">
          <ActivitySection className="h-full" />
        </div>
      </div>

      <div className="lg:h-[400] min-h-0">
        <FeedbackSection className="h-full" />
      </div>

      <div className="lg:h-[680] min-h-0">
        <AnnouncementSection className="h-full" />
      </div>
    </div>
  )
}
