import { Users, UserCheck, FolderKanban, CheckCircle2, UsersRound, DollarSign, Briefcase, Ticket, LucideIcon, TreePine, Cake, PartyPopper, Calendar, ShoppingBag, UserPlus, Activity, CreditCard, AlertCircle, Star } from "lucide-react"

export const statsRow1 = [
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

export const statsRow2 = [
    {
        title: "Total Client",
        value: "151",
        change: "-2.15%",
        changeLabel: "Than Last Month",
        icon: UsersRound,
        iconBgColor: "bg-indigo-500/10",
        iconColor: "text-indigo-500",
        isPositive: false,
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
        isPositive: false,
    },
]

export interface StatCardProps {
    title: string
    value: string
    change: string
    changeLabel: string
    icon: LucideIcon
    iconBgColor: string
    iconColor: string
    isPositive?: boolean
}

export const meetings = [
    { title: "Project Kickoff", date: "June 1, 2024", time: "10:00 AM" },
    { title: "Weekly Team Sync", date: "June 5, 2024", time: "02:00 PM" },
    { title: "Client Presentation", date: "June 10, 2024", time: "11:00 AM" },
    { title: "Monthly Review", date: "June 15, 2024", time: "03:00 PM" },
    { title: "Weekly Review", date: "June 20, 2024", time: "11:00 AM" },
    { title: "Yearly Meeting", date: "June 22, 2024", time: "09:00 AM" },
    { title: "Strategy Planning", date: "June 28, 2024", time: "02:00 PM" },
    { title: "Project Review", date: "July 5, 2024", time: "10:00 AM" },
    { title: "Team Building", date: "July 10, 2024", time: "02:00 PM" },
]

export const feedbacks = [
    {
        id: 1,
        client: "TechCorp Solutions",
        employee: "Sarah Johnson",
        feedback: "Excellent work on the project delivery! Sarah was professional, responsive, and delivered high-quality results ahead of schedule. Would definitely work with her again.",
        date: "June 10, 2024",
        project: "Website Redesign",
        sentiment: "positive",
        rating: 5
    },
    {
        id: 2,
        client: "Global Marketing Inc",
        employee: "Michael Chen",
        feedback: "Good overall performance. Michael showed great technical skills and communication. Minor delays in initial milestones but recovered well.",
        date: "June 8, 2024",
        project: "Mobile App Development",
        sentiment: "positive",
        rating: 4
    },
    {
        id: 3,
        client: "StartUp Ventures",
        employee: "Emily Davis",
        feedback: "Outstanding contribution to our startup! Emily went above and beyond, providing valuable insights and creative solutions that exceeded our expectations.",
        date: "June 5, 2024",
        project: "Brand Strategy",
        sentiment: "positive",
        rating: 5
    },
    {
        id: 4,
        client: "Enterprise Systems Ltd",
        employee: "Robert Wilson",
        feedback: "Robert completed the work as required but there were some communication challenges. Project was delivered on time though.",
        date: "June 3, 2024",
        project: "Database Migration",
        sentiment: "neutral",
        rating: 3
    },
    {
        id: 5,
        client: "Digital Agency Pro",
        employee: "Lisa Anderson",
        feedback: "Absolutely fantastic! Lisa brought fresh ideas and exceptional execution to our campaign. Results exceeded all KPIs.",
        date: "June 1, 2024",
        project: "Digital Marketing Campaign",
        sentiment: "positive",
        rating: 5
    }
]

export const getSentimentStyles = (sentiment: string) => {
    switch (sentiment) {
        case "positive":
            return "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/60"
        case "negative":
            return "bg-gradient-to-br from-red-50 to-rose-50 border-red-200/60"
        case "neutral":
            return "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60"
        default:
            return "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200/60"
    }
}

export const getSentimentBadgeStyles = (sentiment: string) => {
    switch (sentiment) {
        case "positive":
            return "bg-emerald-500/10 text-emerald-700 border-emerald-200/50"
        case "negative":
            return "bg-red-500/10 text-red-700 border-red-200/50"
        case "neutral":
            return "bg-amber-500/10 text-amber-700 border-amber-200/50"
        default:
            return "bg-slate-500/10 text-slate-700 border-slate-200/50"
    }
}

export const getColorsBysentiment = (sentiment: string) => {
    switch (sentiment) {
        case "positive":
            return {
                border: "border-orange-400",
                bg: "bg-orange-400",
                avatar: "bg-orange-400"
            }
        case "negative":
            return {
                border: "border-red-400",
                bg: "bg-red-400",
                avatar: "bg-red-400"
            }
        case "neutral":
            return {
                border: "border-amber-400",
                bg: "bg-amber-400",
                avatar: "bg-amber-400"
            }
        default:
            return {
                border: "border-slate-400",
                bg: "bg-slate-400",
                avatar: "bg-slate-400"
            }
    }
}

export const leaves = [
    { employee: "Sarah Johnson", type: "Sick Leave", startDate: "June 3, 2024", endDate: "June 4, 2024", days: 2 },
    { employee: "Michael Chen", type: "Personal Leave", startDate: "June 10, 2024", endDate: "June 10, 2024", days: 1 },
    { employee: "Emily Davis", type: "Annual Leave", startDate: "June 15, 2024", endDate: "June 25, 2024", days: 8 },
    { employee: "Robert Wilson", type: "Maternity Leave", startDate: "June 20, 2024", endDate: "August 20, 2024", days: 60 },
    { employee: "Lisa Anderson", type: "Annual Leave", startDate: "June 28, 2024", endDate: "June 30, 2024", days: 3 },
    { employee: "David Brown", type: "Sick Leave", startDate: "July 5, 2024", endDate: "July 6, 2024", days: 2 },
]

export type CalendarViewMode = "month" | "week" | "day"
export type EventType = "reminder" | "event" | "recurring"
export type RecurringMode = "none" | "daily" | "weekly" | "monthly"

export type CalendarEvent = {
    id: string
    title: string
    type: EventType
    date: string
    time: string
    endTime?: string
    description: string
    recurring: RecurringMode
}

export type CalendarEventForm = {
    title: string
    type: EventType
    date: string
    time: string
    endTime: string
    description: string
    recurring: RecurringMode
}

export const announcements = [
    {
        id: 1,
        type: "holiday",
        title: "Independence Day Holiday",
        message: "Office will remain closed on August 15th in celebration of Independence Day. Regular operations will resume on August 16th.",
        date: "August 10, 2024",
        icon: TreePine
    },
    {
        id: 2,
        type: "birthday",
        title: "Team Birthday Celebration",
        message: "Join us in celebrating Sarah Johnson's birthday this Friday! Cake and refreshments will be available in the break room at 3:00 PM.",
        date: "August 12, 2024",
        icon: Cake
    },
    {
        id: 3,
        type: "event",
        title: "Team Building Event",
        message: "Annual team building retreat scheduled for next month. Please confirm your attendance by the end of this week.",
        date: "August 8, 2024",
        icon: Users
    },
    {
        id: 4,
        type: "celebration",
        title: "Project Milestone Achievement",
        message: "Congratulations to the development team for successfully launching the new client portal! Great job everyone!",
        date: "August 5, 2024",
        icon: PartyPopper
    },
    {
        id: 5,
        type: "holiday",
        title: "Labor Day Holiday",
        message: "Office will be closed on September 2nd for Labor Day. Enjoy the long weekend!",
        date: "August 1, 2024",
        icon: Calendar
    }
]

export const getTypeStyles = (type: string) => {
    switch (type) {
        case "holiday":
            return "bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 border-l-4 border-l-blue-400/60 hover:border-l-blue-500/80"
        case "birthday":
            return "bg-gradient-to-br from-pink-50 via-white to-rose-50/30 border-l-4 border-l-pink-400/60 hover:border-l-pink-500/80"
        case "event":
            return "bg-gradient-to-br from-purple-50 via-white to-violet-50/30 border-l-4 border-l-purple-400/60 hover:border-l-purple-500/80"
        case "celebration":
            return "bg-gradient-to-br from-amber-50 via-white to-orange-50/30 border-l-4 border-l-amber-400/60 hover:border-l-amber-500/80"
        default:
            return "bg-gradient-to-br from-slate-50 via-white to-gray-50/30 border-l-4 border-l-slate-400/60 hover:border-l-slate-500/80"
    }
}

export const getTypeBadgeStyles = (type: string) => {
    switch (type) {
        case "holiday":
            return "bg-blue-100 text-blue-800 border-blue-200"
        case "birthday":
            return "bg-pink-100 text-pink-800 border-pink-200"
        case "event":
            return "bg-purple-100 text-purple-800 border-purple-200"
        case "celebration":
            return "bg-amber-100 text-amber-800 border-amber-200"
        default:
            return "bg-slate-100 text-slate-800 border-slate-200"
    }
}

export const activities = [
  { 
    title: "New Sale",
    description: "Premium Package purchased by Sarah Johnson from New York, USA",
    time: "6 Minutes Ago",
    type: "success",
    icon: ShoppingBag,
    flag: "🇺🇸",
    statusColor: "bg-emerald-500"
  },
  { 
    title: "New Account Activity",
    description: "Michael Chen from Beijing, China updated profile information",
    time: "1 Hour Ago",
    type: "info",
    icon: UserPlus,
    flag: "🇨🇳",
    statusColor: "bg-blue-500"
  },
  { 
    title: "New Activity",
    description: "Emma Wilson from London, UK completed training module",
    time: "2 Hours Ago",
    type: "info",
    icon: Activity,
    flag: "🇬🇧",
    statusColor: "bg-blue-500"
  },
  { 
    title: "Sale",
    description: "Basic Package purchased by Alex Johnson from Toronto, Canada",
    time: "3 Hours Ago",
    type: "success",
    icon: CreditCard,
    flag: "🇨🇦",
    statusColor: "bg-emerald-500"
  },
  { 
    title: "Activity",
    description: "Maria Garcia from Madrid, Spain raised support ticket",
    time: "Yesterday",
    type: "warning",
    icon: AlertCircle,
    flag: "🇪🇸",
    statusColor: "bg-amber-500"
  },
  { 
    title: "Account Activity",
    description: "James Brown from Sydney, Australia achieved sales target",
    time: "Yesterday",
    type: "success",
    icon: Star,
    flag: "🇦🇺",
    statusColor: "bg-emerald-500"
  },
]

export const getIconBackground = (type: string) => {
  switch (type) {
    case "success":
      return "bg-emerald-500"
    case "warning":
      return "bg-amber-500"
    case "info":
      return "bg-blue-500"
    default:
      return "bg-slate-500"
  }
}
