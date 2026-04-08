import { statsRow1 } from "@/types/employee"
import { StatCard } from "@/components/dashboard/state-cards"
import WelcomeBanner from "@/components/dashboard/employee/WelcomeBanner"
import AttendanceLeaves from "@/components/dashboard/employee/AttendanceLeaves"
import MarkAttendance from "@/components/dashboard/employee/MarkAttendance"
import WorkingHours from "@/components/dashboard/employee/WorkingHours"
import MeetingSchedule from "@/components/dashboard/employee/MeetingSchedule"
import Notification from "@/components/dashboard/employee/Notifications"
import Activity from "@/components/dashboard/employee/Activity"
import ClientFeedback from "@/components/dashboard/employee/ClientFeedback"
import { AnnouncementSection } from "@/components/dashboard/employee/AnnouncementSection"

export default function EmployeeDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                {statsRow1.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Main 3-column responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Column 1: Welcome + Mark Attendance + Meeting Schedule */}
                <div className="flex flex-col grid gap-6">
                    <WelcomeBanner />
                    <MarkAttendance />
                    <MeetingSchedule />
                </div>

                {/* Column 2: Attendance & Leaves + Working Hours */}
                <div className="flex flex-col grid-cols-2 gap-6">
                    <AttendanceLeaves />
                    <WorkingHours />
                </div>

                {/* Column 3: Notifications spanning full height */}
                <div className="md:col-span-2 lg:col-span-1">
                    <Notification className="h-full" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6"><Activity /></div>
                <div className="flex flex-col gap-6"><ClientFeedback /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                <AnnouncementSection className="h-full"/>
            </div>
        </div>
    )
}