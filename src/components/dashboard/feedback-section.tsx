"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { User, Calendar, MoreVertical } from "lucide-react"
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

const getColorsBysentiment = (sentiment: string) => {
    switch (sentiment) {
        case "positive":
            return {
                border: "border-orange-400",
                bg: "bg-orange-400",
                avatar: "bg-orange-400"
            }
        case "negative":
            return {
                border: "border-red-400",
                bg: "bg-red-400",
                avatar: "bg-red-400"
            }
        case "neutral":
            return {
                border: "border-amber-400",
                bg: "bg-amber-400",
                avatar: "bg-amber-400"
            }
        default:
            return {
                border: "border-slate-400",
                bg: "bg-slate-400",
                avatar: "bg-slate-400"
            }
    }
}

export function FeedbackSection({ className }: { className?: string }) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [direction, setDirection] = useState<'left' | 'right'>('right')
    const [isDragging, setIsDragging] = useState(false)
    const [dragStartX, setDragStartX] = useState(0)
    const [dragStartPosition, setDragStartPosition] = useState(0)

    useEffect(() => {
        if (!isPlaying || isDragging) return

        const interval = setInterval(() => {
            setScrollPosition(prev => {
                if (direction === 'right') {
                    if (prev >= feedbacks.length * 360) return 0
                    return prev + 1
                } else {
                    if (prev <= 0) return feedbacks.length * 360
                    return prev - 1
                }
            })
        }, 30)

        return () => clearInterval(interval)
    }, [isPlaying, direction, isDragging])

    const handleMouseEnter = () => {
        setIsPlaying(false)
    }

    const handleMouseLeave = () => {
        setIsPlaying(true)
        setIsDragging(false)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setDragStartX(e.clientX)
        setDragStartPosition(scrollPosition)
        e.preventDefault()
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        
        const deltaX = e.clientX - dragStartX
        const newPosition = dragStartPosition - deltaX
        
        const maxPosition = feedbacks.length * 360
        const constrainedPosition = Math.max(0, Math.min(maxPosition, newPosition))
        
        setScrollPosition(constrainedPosition)
        
        if (deltaX > 0) {
            setDirection('left')
        } else if (deltaX < 0) {
            setDirection('right')
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

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
                    className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 h-9 w-9 p-0 rounded-xl transition-colors"
                >
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </CardHeader>

            <CardContent className="p-0 flex-1 min-h-0 mt-2">
                <div
                    className={cn(
                        "h-full overflow-hidden relative",
                        isDragging ? "cursor-grabbing" : "cursor-grab"
                    )}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <div
                        className="flex gap-6 p-4 transition-none"
                        style={{ transform: `translateX(-${scrollPosition}px)` }}
                    >
                        {[...feedbacks, ...feedbacks].map((feedback, index) => {
                            const colors = getColorsBysentiment(feedback.sentiment)
                            return (
                                <div
                                    key={`${feedback.id}-${index}`}
                                    onMouseEnter={() => setHoveredId(feedback.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={`flex-shrink-0 w-[380px] sm:w-[420px] h-[240px] ${getSentimentStyles(feedback.sentiment)} rounded-3xl border-[3px] transition-all duration-300 cursor-pointer overflow-hidden relative ${hoveredId === feedback.id
                                        ? 'shadow-2xl scale-[1.03]'
                                        : 'shadow-lg'
                                        }`}
                                >

                                    <div className={`absolute -bottom-[2px] -right-[2px] w-12 h-12 ${colors.bg} rounded-tl-[20px] rounded-r-[20px] flex items-center justify-center z-10 rotate-180`}>
                                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                        </svg>
                                    </div>

                                    <div className="p-6 h-full flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-start gap-4">
                                                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${colors.avatar} flex items-center justify-center border-4 border-white shadow-md`}>
                                                    <User className="w-8 h-8 text-white" strokeWidth={2.5} />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-slate-900 text-base mb-1 truncate">
                                                        {feedback.employee}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 truncate">
                                                        {feedback.client}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={`flex items-center gap-1 text-xs ${getSentimentBadgeStyles(feedback.sentiment)} px-3 py-1 rounded-full border capitalize mt-2`}>
                                                <Calendar className="h-3 w-3" />
                                                <span>{feedback.date}</span>
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-slate-700 text-sm leading-relaxed line-clamp-4">
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