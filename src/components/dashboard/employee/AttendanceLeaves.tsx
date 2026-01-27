"use client";
import { useState } from "react";
import { Calendar, ChevronDown, FileText, Clock, CheckCircle, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/components/utils";

export default function AttendanceLeaves({ className }: { className?: string }) {
    const [selectedYear, setSelectedYear] = useState("2025");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const years = ["2023", "2024", "2025"];

    const leaveData = {
        totalLeaves: 24,
        leavesTaken: 12,
        pendingApproval: 2,
        workingDays: 248
    };

    const stats = [
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

    return (
        <Card className={cn(
            "group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm h-auto max-h-[600px] sm:max-h-[500px] md:max-h-[450px]",
            className
        )}>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-200 to-rose-200 rounded-full mix-blend-multiply filter blur-2xl"></div>
            </div>

            <CardContent className="relative p-3 sm:p-4 md:p-6 pt-3 pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                        Attendance & Leaves
                    </h2>

                    <div className="relative w-fit">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:border-purple-300 transition-all duration-200 shadow-sm"
                        >
                            {selectedYear}
                            <ChevronDown className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                isDropdownOpen && "rotate-180"
                            )} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-24 bg-white border border-purple-200/50 rounded-lg shadow-lg overflow-hidden z-10">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => {
                                            setSelectedYear(year);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={cn(
                                            "w-full px-3 py-2 text-sm text-left hover:bg-purple-50 transition-colors",
                                            selectedYear === year && "bg-purple-100 font-semibold text-purple-700"
                                        )}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-200 hover:bg-gray-50 transition-all duration-200 group/card shadow-sm"
                            >
                                <div className={cn("w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center mb-1 sm:mb-1.5", stat.bgColor)}>
                                    <Icon className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5", stat.color)} />
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5 sm:mb-1 leading-tight">{stat.label}</p>
                                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-tight">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 sm:mt-6">
                    <button className="w-full block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 sm:py-2.5 md:py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base px-4 cursor-pointer">
                        <CheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex-shrink-0" />
                        Apply Leave
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
