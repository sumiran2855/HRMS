"use client";

import { CalendarClock, MapPin, Users, Clock, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/components/utils";
import { meetings, getStatusBadge } from "@/types/employee";

export default function MeetingSchedule({ className }: { className?: string }) {
    return (
        <Card className={cn(
            "group relative bg-white border-0 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col",
            "shadow-lg ring-1 ring-gray-200/50 hover:ring-gray-300/70",
            className
        )}>
            {/* Header with gradient background */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 pb-8">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                                <CalendarClock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Meeting Schedule</h3>
                                <p className="text-sm text-gray-300 mt-0.5">
                                    Your upcoming meetings and appointments
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white whitespace-nowrap">
                                {meetings.length} scheduled
                            </span>
                            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                <MoreVertical className="w-4 h-4 text-white/70" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meeting List */}
            <CardContent className="relative -mt-4 flex-1 flex flex-col min-h-0">
                <div className="bg-white rounded-t-2xl shadow-sm border border-gray-100">
                    <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {meetings.map((meeting) => {
                            const statusBadge = getStatusBadge(meeting.status);
                            return (
                                <div
                                    key={meeting.id}
                                    className="group relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="pl-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 rounded-lg bg-slate-50 border-slate-200 text-slate-600">
                                                        <CalendarClock className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <h4 className="font-semibold text-gray-900 text-sm truncate">
                                                                {meeting.title}
                                                            </h4>
                                                            <span className={cn(
                                                                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap",
                                                                statusBadge.class
                                                            )}>
                                                                {statusBadge.text}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                                                        <span>{meeting.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                        <span>{meeting.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Users className="w-3.5 h-3.5 text-gray-400" />
                                                        <span>{meeting.attendees}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                                                <MoreVertical className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

