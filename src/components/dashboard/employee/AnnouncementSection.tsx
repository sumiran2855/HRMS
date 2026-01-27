"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Calendar, MoreVertical } from "lucide-react"
import { cn } from "@/components/utils"
import { getTypeStyles, getTypeBadgeStyles, announcements } from "@/types/dashboard"
import { Button } from "@/components/ui/Button"

export function AnnouncementSection({ className }: { className?: string }) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <Card className={cn("bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col lg:h-[680]", className)}>
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
                        className="text-black/80 hover:text-black hover:bg-black/20 h-9 w-9 p-0 rounded-xl cursor-pointer"
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
