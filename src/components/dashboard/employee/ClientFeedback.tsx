'use client'

import { MessageSquare, MoreVertical } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { getAvatarGradient, feedbacks } from '@/types/employee'

export default function ClientFeedback() {

    return (
        <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 border-2 border-slate-200 shadow-xl relative overflow-hidden md:h-[720px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <CardContent className="p-0 h-full flex flex-col">
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 border-b-2 border-slate-200 bg-gradient-to-r from-slate-100 to-slate-50 relative">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 flex items-center gap-3 relative z-10">
                        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        Client Feedback
                    </h2>
                    <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:shadow-md relative z-10">
                        <MoreVertical className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent cursor-pointer">
                    <div className="space-y-6">
                        {feedbacks.map((feedback, index) => (
                            <div
                                key={feedback.id}
                                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
                            >
                                <div className="relative flex flex-col sm:flex-row gap-5">
                                    <div className="flex-shrink-0">
                                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAvatarGradient(feedback.sentiment)} p-0.5 shadow-lg`}>
                                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-2 border-transparent">
                                                <span className={`font-bold text-lg bg-gradient-to-br ${getAvatarGradient(feedback.sentiment)} bg-clip-text text-transparent`}>
                                                    {feedback.clientAvatar}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 z-10">
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                                                    {feedback.clientName}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                    <span>{feedback.projectName}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-xs text-slate-400 font-medium">{feedback.date}</span>
                                            </div>
                                        </div>

                                        <div className="mb-4 relative">
                                            <p className="text-slate-600 leading-relaxed italic relative z-10">
                                                "{feedback.feedback}"
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`absolute top-6 bottom-6 left-0 w-1 rounded-r-full ${feedback.sentiment === 'positive' ? 'bg-emerald-500' : feedback.sentiment === 'negative' ? 'bg-red-500' : 'bg-amber-500'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}