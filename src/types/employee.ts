import { Briefcase, Calendar, CheckCircle2, Clock, FileText, FolderKanban, UserCheck, Users } from "lucide-react"

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

export const years = ["2023", "2024", "2025"];

const leaveData = {
    totalLeaves: 24,
    leavesTaken: 12,
    pendingApproval: 2,
    workingDays: 248
};

export const stats = [
    {
        label: "Total Leaves",
        value: leaveData.totalLeaves,
        icon: FileText,
        color: "text-blue-600",
        bgColor: "bg-blue-50"
    },
    {
        label: "Leaves Taken",
        value: leaveData.leavesTaken,
        icon: Calendar,
        color: "text-rose-600",
        bgColor: "bg-rose-50"
    },
    {
        label: "Pending Approval",
        value: leaveData.pendingApproval,
        icon: Clock,
        color: "text-amber-600",
        bgColor: "bg-amber-50"
    },
    {
        label: "Working Days",
        value: leaveData.workingDays,
        icon: Briefcase,
        color: "text-green-600",
        bgColor: "bg-green-50"
    }
];

interface ClientFeedback {
    id: string
    clientName: string
    clientAvatar: string
    projectName: string
    rating: number
    feedback: string
    date: string
    category: 'quality' | 'communication' | 'timeliness' | 'overall'
    sentiment: 'positive' | 'neutral' | 'negative'
}

export const feedbacks: ClientFeedback[] = [
    {
        id: '1',
        clientName: 'Sarah Johnson',
        clientAvatar: 'SJ',
        projectName: 'E-commerce Platform Redesign',
        rating: 5,
        feedback: 'Excellent work! The team delivered exactly what we wanted and the communication throughout the project was outstanding. Highly recommend their services.',
        date: '2024-01-18',
        category: 'overall',
        sentiment: 'positive',
    },
    {
        id: '2',
        clientName: 'Michael Chen',
        clientAvatar: 'MC',
        projectName: 'Mobile App Development',
        rating: 4,
        feedback: 'Great quality of work and timely delivery. The app performs well and meets our requirements. Minor delays in initial phases but overall satisfied.',
        date: '2024-01-15',
        category: 'quality',
        sentiment: 'positive'
    },
    {
        id: '3',
        clientName: 'Emily Rodriguez',
        clientAvatar: 'ER',
        projectName: 'API Integration Project',
        rating: 3,
        feedback: 'The technical implementation is solid, but communication could be improved. Would appreciate more regular updates on progress.',
        date: '2024-01-12',
        category: 'communication',
        sentiment: 'neutral',
    },
    {
        id: '4',
        clientName: 'David Thompson',
        clientAvatar: 'DT',
        projectName: 'Website Optimization',
        rating: 5,
        feedback: 'Outstanding performance improvements! Page load times reduced by 60%. Very professional team and excellent technical expertise.',
        date: '2024-01-10',
        category: 'quality',
        sentiment: 'positive'
    }
]

export const getAvatarGradient = (sentiment: string) => {
    switch (sentiment) {
        case 'positive': return 'from-emerald-400 to-teal-500'
        case 'negative': return 'from-red-400 to-rose-500'
        default: return 'from-amber-400 to-orange-500'
    }
}

export type AttendanceStatus = "not-marked" | "checked-in" | "checked-out";

type Meeting = {
    id: number;
    title: string;
    time: string;
    location: string;
    attendees: string;
    status?: "upcoming" | "in-progress" | "completed";
};

export const meetings: Meeting[] = [
    {
        id: 1,
        title: "Sprint Planning",
        time: "Today · 11:00 AM - 12:00 PM",
        location: "Room 3B · HQ",
        attendees: "8 attendees",
        status: "in-progress"
    },
    {
        id: 2,
        title: "Design Review",
        time: "Today · 02:30 PM - 03:15 PM",
        location: "Zoom · UX",
        attendees: "5 attendees",
        status: "upcoming"
    },
    {
        id: 3,
        title: "Client Sync",
        time: "Tomorrow · 10:00 AM - 10:45 AM",
        location: "Room 5A · HQ",
        attendees: "3 attendees",
        status: "upcoming"
    },
    {
        id: 4,
        title: "Frontend Architecture",
        time: "Tomorrow · 02:00 PM - 03:30 PM",
        location: "Teams · Dev",
        attendees: "6 attendees",
        status: "upcoming"
    },
    {
        id: 5,
        title: "Q3 Planning",
        time: "Friday · 09:00 AM - 10:30 AM",
        location: "Conference Hall A",
        attendees: "12 attendees",
        status: "upcoming"
    }
];

export const getStatusBadge = (status?: string) => {
    switch (status) {
        case "in-progress":
            return { text: "Live Now", class: "bg-emerald-100 text-emerald-700 border-emerald-200" };
        case "completed":
            return { text: "Completed", class: "bg-gray-100 text-gray-700 border-gray-200" };
        default:
            return { text: "Upcoming", class: "bg-blue-100 text-blue-700 border-blue-200" };
    }
};

interface Notification {
    id: number;
    author: string;
    date: string;
    content: string;
    avatar: string;
}

export const notifications: Notification[] = [
    {
        id: 1,
        author: "Jane D. Smith",
        date: "Jul 13, 2024",
        content: "Our latest HRM update focuses on enhancing employee engagement through new interactive platforms and personalized feedback systems.",
        avatar: "JD"
    },
    {
        id: 2,
        author: "Jane D. Smith",
        date: "Jul 13, 2024",
        content: "Discover how our HRM solutions are driving productivity with innovative time management and collaboration tools.",
        avatar: "JD"
    },
    {
        id: 3,
        author: "Michael B. Jordan",
        date: "Jul 13, 2024",
        content: "Our CRM system now includes advanced analytics to better understand customer behavior and improve service delivery.",
        avatar: "MJ"
    },
    {
        id: 4,
        author: "Michael B. Jordan",
        date: "Jul 13, 2024",
        content: "Our CRM system now includes advanced analytics to better understand customer behavior and improve service delivery.",
        avatar: "MJ"
    }
];

export type RangeKey = "week" | "month" | "year";
export type StatTone = "primary" | "green" | "amber" | "rose";


type DayRecord = {
    label: string;
    shortLabel: string;
    hours: number;
    breakHours: number;
};

export type RangeData = {
    caption: string;
    target: string;
    badge: string;
    days: DayRecord[];
};

export const periodData: Record<RangeKey, RangeData> = {
    week: {
        caption: "This week overview",
        target: "40h target",
        badge: "5 working days",
        days: [
            { label: "Mon 6 Jan", shortLabel: "Mon", hours: 7.5, breakHours: 0.75 },
            { label: "Tue 7 Jan", shortLabel: "Tue", hours: 8, breakHours: 0.65 },
            { label: "Wed 8 Jan", shortLabel: "Wed", hours: 7, breakHours: 0.8 },
            { label: "Thu 9 Jan", shortLabel: "Thu", hours: 8.5, breakHours: 0.7 },
            { label: "Fri 10 Jan", shortLabel: "Fri", hours: 7.5, breakHours: 0.6 },
        ],
    },
    month: {
        caption: "January trend by week",
        target: "160h target",
        badge: "4 weeks",
        days: [
            { label: "Week 1", shortLabel: "W1", hours: 38, breakHours: 4.1 },
            { label: "Week 2", shortLabel: "W2", hours: 40, breakHours: 4.3 },
            { label: "Week 3", shortLabel: "W3", hours: 36.5, breakHours: 3.8 },
            { label: "Week 4", shortLabel: "W4", hours: 42, breakHours: 4.5 },
        ],
    },
    year: {
        caption: "Year-to-date monthly load",
        target: "1920h target",
        badge: "12 months",
        days: [
            { label: "Jan", shortLabel: "Jan", hours: 158, breakHours: 17 },
            { label: "Feb", shortLabel: "Feb", hours: 149, breakHours: 15 },
            { label: "Mar", shortLabel: "Mar", hours: 165, breakHours: 16 },
            { label: "Apr", shortLabel: "Apr", hours: 172, breakHours: 18 },
            { label: "May", shortLabel: "May", hours: 168, breakHours: 17 },
            { label: "Jun", shortLabel: "Jun", hours: 160, breakHours: 16 },
            { label: "Jul", shortLabel: "Jul", hours: 170, breakHours: 18 },
            { label: "Aug", shortLabel: "Aug", hours: 175, breakHours: 18.5 },
            { label: "Sep", shortLabel: "Sep", hours: 162, breakHours: 16 },
            { label: "Oct", shortLabel: "Oct", hours: 166, breakHours: 16.5 },
            { label: "Nov", shortLabel: "Nov", hours: 158, breakHours: 15.5 },
            { label: "Dec", shortLabel: "Dec", hours: 150, breakHours: 14.8 },
        ],
    },
};

export interface Activity {
    id: string
    type: 'meeting' | 'task' | 'report' | 'email'
    title: string
    description: string
    date: string
    time: string
}

export const activities: Activity[] = [
    {
        id: '1',
        type: 'meeting',
        title: 'Team Standup Meeting',
        description: 'Daily sync with the development team',
        date: '2026-01-19',
        time: '09:00 AM'
    },
    {
        id: '2',
        type: 'task',
        title: 'Complete Project Documentation',
        description: 'Update technical documentation for the new API endpoints',
        date: '2026-01-19',
        time: '10:30 AM'
    },
    {
        id: '3',
        type: 'report',
        title: 'Weekly Performance Report',
        description: 'Generate and submit weekly performance metrics',
        date: '2026-01-19',
        time: '02:00 PM'
    },
    {
        id: '4',
        type: 'email',
        title: 'Client Follow-up',
        description: 'Send project update to client stakeholders',
        date: '2026-01-19',
        time: '03:30 PM'
    },
    {
        id: '5',
        type: 'meeting',
        title: 'Team Standup Meeting',
        description: 'Daily sync with the development team',
        date: '2026-01-18',
        time: '09:00 AM'
    },
    {
        id: '5.5',
        type: 'email',
        title: 'Client Follow-up',
        description: 'Send project update to client stakeholders',
        date: '2026-01-18',
        time: '11:00 AM'
    },
    {
        id: '6',
        type: 'task',
        title: 'Complete Project Documentation',
        description: 'Update technical documentation for the new API endpoints',
        date: '2026-01-18',
        time: '10:30 AM'
    },
    {
        id: '7',
        type: 'report',
        title: 'Monthly Performance Report',
        description: 'Generate and submit monthly performance metrics',
        date: '2026-01-17',
        time: '02:00 PM'
    }
]