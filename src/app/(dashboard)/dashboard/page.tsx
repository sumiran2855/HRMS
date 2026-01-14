import { StatCard } from "@/components/dashboard/state-cards"
import { MeetingSchedule } from "@/components/dashboard/meeting-schedules"
import { CalendarWidget } from "@/components/dashboard/calender-widegt"
import { Users, UserCheck, FolderKanban, CheckCircle2, UsersRound, DollarSign, Briefcase, Ticket } from "lucide-react"

const statsRow1 = [
  {
    title: "Total Employee",
    value: "313",
    change: "+10%",
    changeLabel: "Than Last Year",
    icon: Users,
    iconBgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
    isPositive: true,
  },
  {
    title: "On Leave Employee",
    value: "55",
    change: "+2.15%",
    changeLabel: "Than Last Month",
    icon: UserCheck,
    iconBgColor: "bg-green-500/10",
    iconColor: "text-green-500",
    isPositive: true,
  },
  {
    title: "Total Project",
    value: "313",
    change: "+5.15%",
    changeLabel: "Than Last Month",
    icon: FolderKanban,
    iconBgColor: "bg-violet-500/10",
    iconColor: "text-violet-500",
    isPositive: true,
  },
  {
    title: "Complete Project",
    value: "150",
    change: "+5.5%",
    changeLabel: "Than Last Month",
    icon: CheckCircle2,
    iconBgColor: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
    isPositive: true,
  },
]

const statsRow2 = [
  {
    title: "Total Client",
    value: "151",
    change: "+2.15%",
    changeLabel: "Than Last Month",
    icon: UsersRound,
    iconBgColor: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    isPositive: true,
  },
  {
    title: "Total Revenue",
    value: "$55",
    change: "+2.15%",
    changeLabel: "Than Last Month",
    icon: DollarSign,
    iconBgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    isPositive: true,
  },
  {
    title: "Total Jobs",
    value: "55",
    change: "+2.15%",
    changeLabel: "Than Last Month",
    icon: Briefcase,
    iconBgColor: "bg-amber-500/10",
    iconColor: "text-amber-500",
    isPositive: true,
  },
  {
    title: "Total Ticket",
    value: "55",
    change: "+2.15%",
    changeLabel: "Than Last Month",
    icon: Ticket,
    iconBgColor: "bg-pink-500/10",
    iconColor: "text-pink-500",
    isPositive: true,
  },
]

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
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <MeetingSchedule />
        <CalendarWidget />
      </div>
    </div>
  )
}
