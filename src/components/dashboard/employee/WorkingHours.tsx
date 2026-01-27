"use client";

import { useMemo, useState } from "react";
import {
    BadgeCheck,
    Clock3,
    Sparkles,
    TimerReset,
    TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/components/utils";
import { RangeKey, periodData, StatTone } from "@/types/employee";

export default function WorkingHours({ className }: { className?: string }) {
    const [range, setRange] = useState<RangeKey>("week");
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const selected = periodData[range];

    const summary = useMemo(() => {
        const totalHours = selected.days.reduce((acc, d) => acc + d.hours, 0);
        const totalBreak = selected.days.reduce((acc, d) => acc + d.breakHours, 0);
        const avgHours = totalHours / selected.days.length;
        const bestDay = selected.days.reduce((best, cur) =>
            cur.hours > best.hours ? cur : best
        );

        return {
            totalHours,
            totalBreak,
            avgHours,
            bestDayLabel: bestDay.label,
            targetLabel: selected.target,
        };
    }, [selected]);

    const maxValue = Math.max(
        ...selected.days.map((day) => day.hours + day.breakHours)
    );

    return (
        <Card
            className={cn(
                "group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden",
                "rounded-2xl",
                className
            )}
        >
            <CardContent className="relative p-4 sm:p-5 md:p-6 space-y-5 md:h-[630px] md:max-h-[630px] md:overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                                Working Hours
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                {selected.caption}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end">
                        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] sm:text-xs font-medium text-gray-700">
                            {selected.badge}
                        </span>
                        <div className="flex rounded-full border border-gray-200 bg-gray-50 p-0.5 text-[11px] sm:text-xs font-medium text-gray-700">
                            {(["week", "month", "year"] as RangeKey[]).map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    className={cn(
                                        "px-3 py-1 rounded-full transition-all",
                                        range === key
                                            ? "bg-indigo-600 text-white shadow-sm"
                                            : "text-gray-700 hover:bg-white"
                                    )}
                                    onClick={() => setRange(key)}
                                >
                                    {key === "week" ? "Week" : key === "month" ? "Month" : "Year"}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <StatCard
                        icon={Clock3}
                        label="Total Hours"
                        value={`${summary.totalHours.toFixed(1)}h`}
                        meta={summary.targetLabel}
                        tone="primary"
                    />
                    <StatCard
                        icon={TimerReset}
                        label="Total Break"
                        value={`${summary.totalBreak.toFixed(1)}h`}
                        meta="Recorded pauses"
                        tone="green"
                    />
                    <StatCard
                        icon={Sparkles}
                        label="Average / Period"
                        value={`${summary.avgHours.toFixed(1)}h`}
                        meta="Balance target 8h"
                        tone="amber"
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100">
                                <BadgeCheck className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-800">Productivity Trend</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-600">
                                <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500 ring-2 ring-indigo-100"></span>
                                <span>Working</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-600">
                                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-100"></span>
                                <span>Breaks</span>
                            </div>
                            <span className="text-gray-400 text-xs sm:text-[11px] font-medium ml-2">
                                Target: {selected.target}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-50/50 via-white to-slate-50/30 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-end justify-between gap-2 sm:gap-3 h-48 sm:h-56 md:h-54">
                            {selected.days.map((day, index) => {
                                const total = day.hours + day.breakHours;
                                const hoursHeight = (day.hours / maxValue) * 100;
                                const breakHeight = (day.breakHours / maxValue) * 100;
                                const isActive = hoverIndex === index;

                                return (
                                    <div
                                        key={day.label}
                                        className="relative flex-1 flex flex-col items-center gap-3 group cursor-pointer"
                                        onMouseEnter={() => setHoverIndex(index)}
                                        onMouseLeave={() => setHoverIndex(null)}
                                    >
                                        {/* Tooltip */}
                                        {isActive && (
                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-900 text-white rounded-lg px-3 py-2 text-xs w-40 z-20 shadow-xl">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="font-medium flex items-center gap-1">
                                                        <Clock3 className="w-3 h-3" />
                                                        Working
                                                    </span>
                                                    <span className="font-semibold">{day.hours.toFixed(1)}h</span>
                                                </div>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="flex items-center gap-1">
                                                        <TimerReset className="w-3 h-3" />
                                                        Break
                                                    </span>
                                                    <span className="font-medium">{day.breakHours.toFixed(1)}h</span>
                                                </div>
                                                <div className="flex items-center justify-between pt-1.5 border-t border-gray-700">
                                                    <span className="font-medium">Total</span>
                                                    <span className="font-semibold">{total.toFixed(1)}h</span>
                                                </div>
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                            </div>
                                        )}

                                        {/* Bar Chart */}
                                        <div className="relative flex-1 w-full flex flex-col justify-end items-center">
                                            <div className="relative w-full max-w-[48px] sm:max-w-[56px] flex flex-col justify-end h-[150px]">
                                                <div
                                                    className={cn(
                                                        "w-full bg-gradient-to-t from-indigo-600 to-indigo-500 transition-all duration-300 rounded-t-lg shadow-md",
                                                        isActive && "ring-4 ring-indigo-200 scale-110 shadow-xl"
                                                    )}
                                                    style={{
                                                        height: `${hoursHeight}%`,
                                                        minHeight: day.hours > 0 ? '20px' : '0px'
                                                    }}
                                                >
                                                    {day.hours > 0 && (
                                                        <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                                                            {day.hours.toFixed(1)}
                                                        </div>
                                                    )}
                                                </div>

                                                <div
                                                    className={cn(
                                                        "w-full bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all duration-300 rounded-t-lg shadow-md -mt-px",
                                                        isActive && "ring-4 ring-emerald-200 scale-110 shadow-xl"
                                                    )}
                                                    style={{
                                                        height: `${breakHeight}%`,
                                                        minHeight: day.breakHours > 0 ? '40px' : '0px'
                                                    }}
                                                >
                                                    {day.breakHours > 0 && (
                                                        <div className="mt-4 inset-0 flex items-center justify-center text-white text-[9px] font-bold">
                                                            {day.breakHours.toFixed(1)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Labels */}
                                        <div className="flex flex-col items-center text-xs mt-2">
                                            <span className="font-semibold text-gray-900">
                                                {day.shortLabel}
                                            </span>
                                            <span className="text-[10px] text-gray-500">
                                                {day.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
    meta,
    tone,
}: {
    icon: typeof Clock3;
    label: string;
    value: string;
    meta: string;
    tone: StatTone;
}) {
    const palette: Record<StatTone, { bg: string; color: string; ring: string }> = {
        primary: { bg: "bg-indigo-50", color: "text-indigo-600", ring: "ring-indigo-100" },
        green: { bg: "bg-emerald-50", color: "text-emerald-600", ring: "ring-emerald-100" },
        amber: { bg: "bg-amber-50", color: "text-amber-600", ring: "ring-amber-100" },
        rose: { bg: "bg-rose-50", color: "text-rose-600", ring: "ring-rose-100" },
    };

    const toneStyles = palette[tone];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
            <div
                className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center mb-3 ring-2",
                    toneStyles.bg,
                    toneStyles.color,
                    toneStyles.ring
                )}
            >
                <Icon className="w-5 h-5" />
            </div>
            <p className="text-xs text-gray-600">{label}</p>
            <p className="text-xl font-semibold text-gray-900 leading-tight">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{meta}</p>
        </div>
    );
}

