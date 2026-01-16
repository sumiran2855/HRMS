"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { User, Calendar, MoreVertical } from "lucide-react"
import { cn } from "@/components/utils"
import { Button } from "../ui/Button"
import { feedbacks, getSentimentStyles, getSentimentBadgeStyles, getColorsBysentiment } from "@/types/dashboard"

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
                    variant="ghost"
                    size="sm"
                    className="text-black/80 hover:text-black hover:bg-black/20 h-9 w-9 p-0 rounded-xl cursor-pointer"
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