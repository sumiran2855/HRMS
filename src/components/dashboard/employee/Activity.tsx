'use client'

import { useState, useMemo } from 'react'
import { Calendar, Clock, TrendingUp, Users, FileText, CheckCircle, MoreVertical, Circle } from 'lucide-react'
import { parse, isYesterday, isToday, format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/Card'
import { activities } from '@/types/employee'
import type { Activity } from '@/types/employee'

export default function Activity({ className }: { className?: string }) {
    const groupedActivities = useMemo(() => {
        const groups: Record<string, Activity[]> = {}

        activities.forEach(activity => {
            const activityDate = parse(activity.date, 'yyyy-MM-dd', new Date())
            let key = ''

            if (isToday(activityDate)) {
                key = 'Today'
            } else if (isYesterday(activityDate)) {
                key = 'Yesterday'
            } else {
                key = format(activityDate, 'MMMM d, yyyy')
            }

            if (!groups[key]) {
                groups[key] = []
            }
            groups[key].push(activity)
        })

        return groups
    }, [activities])

    const getActivityIcon = (type: Activity['type']) => {
        switch (type) {
            case 'meeting': return <Users className="w-4 h-4" />
            case 'task': return <CheckCircle className="w-4 h-4" />
            case 'report': return <FileText className="w-4 h-4" />
            case 'email': return <Calendar className="w-4 h-4" />
            default: return <Clock className="w-4 h-4" />
        }
    }

    const getActivityStyles = (type: Activity['type']) => {
        switch (type) {
            case 'meeting':
                return { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' }
            case 'task':
                return { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' }
            case 'report':
                return { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' }
            case 'email':
                return { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' }
            default:
                return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' }
        }
    }

    return (
        <Card className={`group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm md:h-[720px] ${className}`}>
            <CardContent className="p-0 h-full flex flex-col">
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 border-b-2 border-slate-200 bg-gradient-to-r from-slate-100 to-slate-50 relative">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 flex items-center gap-3 relative z-10">
                        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        Recent Activity
                    </h2>
                    <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:shadow-md relative z-10">
                        <MoreVertical className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent cursor-pointer">
                    {Object.entries(groupedActivities).map(([dateLabel, groupItems], groupIndex) => (
                        <div key={dateLabel} className="relative mb-8 last:mb-0">

                            <div className="top-0 z-10 -ml-2 mb-6 bg-white/95 backdrop-blur py-2 w-max pr-4 rounded-r-full">
                                <span className="text-sm font-bold tracking-wider text-slate-500 uppercase bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                                    {dateLabel}
                                </span>
                            </div>

                            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-100 ml-3 space-y-8">
                                {groupItems.map((activity, index) => {
                                    const styles = getActivityStyles(activity.type)

                                    return (
                                        <div key={activity.id} className="relative group/item">
                                            <div className={`absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full border-[3px] border-white shadow-sm z-10 ${styles.bg} ${styles.border}`}></div>

                                            <div className="absolute -left-[24px] top-6 w-6 h-[2px] bg-slate-200 group-hover/item:bg-slate-200 transition-colors"></div>

                                            <div className="relative bg-white rounded-xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group-hover/item:translate-x-1">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${styles.bg} ${styles.text} ${styles.border} bg-opacity-50`}>
                                                                {activity.type}
                                                            </span>
                                                            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                                                                <Clock className="w-3 h-3" />
                                                                {activity.time}
                                                            </span>
                                                        </div>
                                                        <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-1">
                                                            {activity.title}
                                                        </h3>
                                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                                                            {activity.description}
                                                        </p>
                                                    </div>

                                                    <div className={`p-2 rounded-lg ${styles.bg} ${styles.text} opacity-80 group-hover/item:opacity-100 transition-opacity`}>
                                                        {getActivityIcon(activity.type)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}