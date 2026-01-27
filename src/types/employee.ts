import { CheckCircle2, FolderKanban, UserCheck, Users } from "lucide-react"

export const statsRow1 = [
    {
        title: "New Tickets",
        value: "313",
        change: "+10%",
        changeLabel: "Than Last Year",
        icon: Users,
        iconBgColor: "bg-blue-500/10",
        iconColor: "text-blue-500",
        isPositive: false,
    },
    {
        title: "Ticket Resolved",
        value: "55",
        change: "+2.15%",
        changeLabel: "Than Last Month",
        icon: UserCheck,
        iconBgColor: "bg-green-500/10",
        iconColor: "text-green-500",
        isPositive: true,
    },
    {
        title: "Project Assigned",
        value: "313",
        change: "+5.15%",
        changeLabel: "Than Last Month",
        icon: FolderKanban,
        iconBgColor: "bg-violet-500/10",
        iconColor: "text-violet-500",
        isPositive: false,
    },
    {
        title: "Available Leaves",
        value: "150",
        change: "+5.5%",
        changeLabel: "Than Last Month",
        icon: CheckCircle2,
        iconBgColor: "bg-cyan-500/10",
        iconColor: "text-cyan-500",
        isPositive: true,
    },
]