"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Calendar, Gift, Cake, Users, MoreVertical, Bell, PartyPopper, TreePine } from "lucide-react"
import { cn } from "@/components/utils"
import { Button } from "../ui/Button"

const announcements = [
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

const getTypeStyles = (type: string) => {
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

const getTypeBadgeStyles = (type: string) => {
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

export function AnnouncementSection({ className }: { className?: string }) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <Card className={cn("bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col", className)}>
            <CardHeader className="text-black pb-4 px-6 pt-6 space-y-0">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                            Announcements
                        </CardTitle>
                        <p className="text-sm text-slate-500 font-medium">
                            Stay updated with latest news and events
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/80 hover:text-white hover:bg-white/20 h-9 w-9 p-0 rounded-xl"
                    >
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="p-0 flex-1 min-h-0">
                <div className="h-full overflow-auto">
                    <div className="p-6 space-y-4">
                        {announcements.map((announcement) => {
                            const TypeIcon = announcement.icon
                            return (
                                <div
                                    key={announcement.id}
                                    onMouseEnter={() => setHoveredId(announcement.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={`relative rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden ${hoveredId === announcement.id
                                        ? 'shadow-md shadow-slate-200/40 scale-[1.005]'
                                        : 'shadow-sm'
                                        } ${getTypeStyles(announcement.type)}`}
                                >
                                    <div className="p-5">
                                        <div className="flex items-start gap-4">
                                            {/* Icon Section */}
                                            <div className="flex-shrink-0">
                                                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${announcement.type === 'holiday' ? 'from-blue-500 to-indigo-600' :
                                                    announcement.type === 'birthday' ? 'from-pink-500 to-rose-600' :
                                                        announcement.type === 'event' ? 'from-purple-500 to-violet-600' :
                                                            'from-amber-500 to-orange-600'
                                                    } p-0.5 shadow-lg`}>
                                                    <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center">
                                                        <TypeIcon className="h-6 w-6 text-slate-700" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">
                                                            {announcement.title}
                                                        </h3>

                                                        <div className="flex items-center gap-2 mb-3">
                                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getTypeBadgeStyles(announcement.type)}`}>
                                                                {announcement.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-2">
                                                    {announcement.message}
                                                </p>

                                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        <span>{announcement.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
