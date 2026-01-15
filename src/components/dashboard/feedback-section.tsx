"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { MessageSquare, User, Calendar, ThumbsUp, ThumbsDown, Star, MoreVertical } from "lucide-react"
import { cn } from "@/components/utils"
import { Button } from "../ui/Button"

const feedbacks = [
    {
        id: 1,
        client: "TechCorp Solutions",
        employee: "Sarah Johnson",
        feedback: "Excellent work on the project delivery! Sarah was professional, responsive, and delivered high-quality results ahead of schedule. Would definitely work with her again.",
        date: "June 10, 2024",
        project: "Website Redesign",
        sentiment: "positive",
        rating: 5
    },
    {
        id: 2,
        client: "Global Marketing Inc",
        employee: "Michael Chen",
        feedback: "Good overall performance. Michael showed great technical skills and communication. Minor delays in initial milestones but recovered well.",
        date: "June 8, 2024",
        project: "Mobile App Development",
        sentiment: "positive",
        rating: 4
    },
    {
        id: 3,
        client: "StartUp Ventures",
        employee: "Emily Davis",
        feedback: "Outstanding contribution to our startup! Emily went above and beyond, providing valuable insights and creative solutions that exceeded our expectations.",
        date: "June 5, 2024",
        project: "Brand Strategy",
        sentiment: "positive",
        rating: 5
    },
    {
        id: 4,
        client: "Enterprise Systems Ltd",
        employee: "Robert Wilson",
        feedback: "Robert completed the work as required but there were some communication challenges. Project was delivered on time though.",
        date: "June 3, 2024",
        project: "Database Migration",
        sentiment: "neutral",
        rating: 3
    },
    {
        id: 5,
        client: "Digital Agency Pro",
        employee: "Lisa Anderson",
        feedback: "Absolutely fantastic! Lisa brought fresh ideas and exceptional execution to our campaign. Results exceeded all KPIs.",
        date: "June 1, 2024",
        project: "Digital Marketing Campaign",
        sentiment: "positive",
        rating: 5
    }
]

const getSentimentStyles = (sentiment: string) => {
    switch (sentiment) {
        case "positive":
            return "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/60"
        case "negative":
            return "bg-gradient-to-br from-red-50 to-rose-50 border-red-200/60"
        case "neutral":
            return "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60"
        default:
            return "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200/60"
    }
}

const getSentimentBadgeStyles = (sentiment: string) => {
    switch (sentiment) {
        case "positive":
            return "bg-emerald-500/10 text-emerald-700 border-emerald-200/50"
        case "negative":
            return "bg-red-500/10 text-red-700 border-red-200/50"
        case "neutral":
            return "bg-amber-500/10 text-amber-700 border-amber-200/50"
        default:
            return "bg-slate-500/10 text-slate-700 border-slate-200/50"
    }
}

const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
        case "positive":
            return ThumbsUp
        case "negative":
            return ThumbsDown
        default:
            return MessageSquare
    }
}

export function FeedbackSection({ className }: { className?: string }) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <Card className={cn("bg-white border border-slate-200 shadow-lg overflow-hidden flex flex-col", className)}>
            <CardHeader className="flex flex-row items-center justify-between pb-4 px-4 md:px-6 pt-6 space-y-0 border-b border-slate-200">
                <div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                        Client Feedback
                    </CardTitle>
                    <p className="text-sm text-slate-500 font-medium">
                        Recent client reviews and testimonials
                    </p>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 h-9 w-9 p-0 rounded-xl"
                >
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </CardHeader>

            <CardContent className="p-0 flex-1 min-h-0">
                <div className="h-full overflow-auto">
                    <div className="p-4 space-y-3">
                        {feedbacks.map((feedback) => {
                            const SentimentIcon = getSentimentIcon(feedback.sentiment)
                            return (
                                <div
                                    key={feedback.id}
                                    onMouseEnter={() => setHoveredId(feedback.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={`relative bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${hoveredId === feedback.id
                                        ? 'shadow-lg shadow-slate-200/50 border-slate-300 scale-[1.01]'
                                        : 'shadow-sm border-slate-200/60'
                                        } ${getSentimentStyles(feedback.sentiment)}`}
                                >
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="relative">
                                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 p-[2px] shadow-lg shadow-violet-500/30">
                                                        <div className="h-full w-full rounded-[8px] bg-white flex items-center justify-center">
                                                            <MessageSquare className="h-4 w-4 text-violet-600" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                        <Star className="h-2.5 w-2.5 text-amber-500 fill-amber-500" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-slate-800 mb-0.5">
                                                        {feedback.project}
                                                    </h3>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3 w-3 ${i < feedback.rating
                                                                    ? 'text-amber-400 fill-amber-400'
                                                                    : 'text-slate-300 fill-slate-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                        <span className="text-xs text-slate-600 ml-1 font-medium">
                                                            {feedback.rating}.0
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-white shadow-sm border border-slate-200/60 flex items-center justify-center">
                                                    <SentimentIcon className={`h-4 w-4 ${feedback.sentiment === 'positive' ? 'text-emerald-600' :
                                                        feedback.sentiment === 'negative' ? 'text-red-600' :
                                                            'text-amber-600'
                                                        }`} />
                                                </div>
                                                <div className={`px-2 py-1 rounded-lg text-xs font-semibold border capitalize ${getSentimentBadgeStyles(feedback.sentiment)}`}>
                                                    {feedback.sentiment}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                                            <div className="flex items-center gap-2 text-sm bg-white/60 backdrop-blur-sm rounded-lg px-2 py-2 border border-slate-100">
                                                <div className="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm">
                                                    <User className="h-3 w-3 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500 font-medium">Client</div>
                                                    <div className="font-semibold text-slate-700 text-xs">{feedback.client}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm bg-white/60 backdrop-blur-sm rounded-lg px-2 py-2 border border-slate-100">
                                                <div className="h-6 w-6 rounded-md bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center shadow-sm">
                                                    <User className="h-3 w-3 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500 font-medium">Employee</div>
                                                    <div className="font-semibold text-slate-700 text-xs">{feedback.employee}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm bg-white/60 backdrop-blur-sm rounded-lg px-2 py-2 border border-slate-100">
                                                <div className="h-6 w-6 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
                                                    <Calendar className="h-3 w-3 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500 font-medium">Date</div>
                                                    <div className="font-semibold text-slate-700 text-xs">{feedback.date}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-slate-100">
                                            <div className="absolute top-2 left-2 text-2xl text-slate-200/50 font-serif leading-none">"</div>
                                            <p className="text-xs text-slate-700 leading-relaxed pl-4 relative z-10 line-clamp-2">
                                                {feedback.feedback}
                                            </p>
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