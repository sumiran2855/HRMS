"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, LogOut, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/components/utils";
import { AttendanceStatus } from "@/types/employee";

export default function MarkAttendance({ className }: { className?: string }) {
    const [status, setStatus] = useState<AttendanceStatus>("not-marked");
    const [checkInTime, setCheckInTime] = useState<Date | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);

    const today = useMemo(() => new Date(), []);

    const formattedDate = useMemo(() => {
        return today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }, [today]);

    const formatTime = (time: Date | null) =>
        time
            ? time.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            })
            : "--:--";

    const handleCheckIn = () => {
        const now = new Date();
        setStatus("checked-in");
        setCheckInTime(now);
        setCheckOutTime(null);
    };

    const handleCheckOut = () => {
        if (status !== "checked-in") return;
        const now = new Date();
        setStatus("checked-out");
        setCheckOutTime(now);
    };

    const statusCopy = {
        "not-marked": { label: "Not Marked", tone: "bg-gray-100 text-gray-700" },
        "checked-in": { label: "Checked In", tone: "bg-emerald-100 text-emerald-700" },
        "checked-out": { label: "Checked Out", tone: "bg-blue-100 text-blue-700" },
    }[status];

    return (
        <Card className={cn(
            "group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm",
            className
        )}>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-br from-amber-200 to-rose-200 rounded-full mix-blend-multiply filter blur-2xl"></div>
            </div>

            <CardContent className="relative p-4 md:p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-50 border border-purple-100 text-purple-600">
                            <CalendarDays className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800">Mark Attendance</h3>
                            <p className="text-sm text-gray-600">{formattedDate}</p>
                        </div>
                    </div>
                    <span className={cn("px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap", statusCopy.tone)}>
                        {statusCopy.label}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InfoItem
                        icon={Clock}
                        label="Check-in"
                        value={formatTime(checkInTime)}
                        highlight={status === "checked-in"}
                    />
                    <InfoItem
                        icon={LogOut}
                        label="Check-out"
                        value={formatTime(checkOutTime)}
                        highlight={status === "checked-out"}
                    />
                </div>

                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-3 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Today&apos;s Shift</p>
                        <p className="text-xs text-gray-600">09:00 AM — 06:00 PM · 1h break</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        Live
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={handleCheckIn}
                        disabled={status === "checked-in"}
                        className={cn(
                            "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm",
                            "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md",
                            status === "checked-in" && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={status !== "checked-in"}
                        className={cn(
                            "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border",
                            "bg-white text-gray-800 border-gray-200 hover:border-gray-300 hover:shadow-sm",
                            status !== "checked-in" && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        <LogOut className="w-4 h-4" />
                        Check Out
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}

function InfoItem({
    icon: Icon,
    label,
    value,
    highlight = false,
}: {
    icon: typeof Clock;
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className={cn(
            "flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm",
            highlight && "border-emerald-200 bg-emerald-50/50"
        )}>
            <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 text-gray-600",
                highlight && "bg-emerald-100 text-emerald-700"
            )}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs text-gray-600">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
        </div>
    );
}

