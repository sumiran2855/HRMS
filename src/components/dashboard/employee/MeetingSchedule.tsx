"use client";

import { CalendarClock, MapPin, Users, Clock, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/components/utils";

type Meeting = {
    id: number;
    title: string;
    time: string;
    location: string;
    attendees: string;
    status?: "upcoming" | "in-progress" | "completed";
};

const meetings: Meeting[] = [
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

export default function MeetingSchedule({ className }: { className?: string }) {
    const getStatusColor = (status?: string) => {
        switch (status) {
            case "in-progress":
                return "bg-emerald-500";
            case "completed":
                return "bg-gray-400";
            default:
                return "bg-blue-500";
        }
    };

    const getStatusBadge = (status?: string) => {
        switch (status) {
            case "in-progress":
                return { text: "Live Now", class: "bg-emerald-100 text-emerald-700 border-emerald-200" };
            case "completed":
                return { text: "Completed", class: "bg-gray-100 text-gray-700 border-gray-200" };
            default:
                return { text: "Upcoming", class: "bg-blue-100 text-blue-700 border-blue-200" };
        }
    };

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

