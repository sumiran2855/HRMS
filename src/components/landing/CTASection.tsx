"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ShieldCheck, Calendar, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { testimonials, trustFeatures } from "@/types/CTASection"

const SLIDE_INTERVAL = 5000

function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [slidesPerView, setSlidesPerView] = useState(3)
    const containerRef = useRef<HTMLDivElement>(null)

    const totalSlides = testimonials.length
    const maxIndex = Math.max(0, totalSlides - slidesPerView)

    // Handle responsive slides per view
    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth < 640) {
                setSlidesPerView(1)
            } else if (window.innerWidth < 1024) {
                setSlidesPerView(2)
            } else {
                setSlidesPerView(3)
            }
        }

        updateSlidesPerView()
        window.addEventListener("resize", updateSlidesPerView)
        return () => window.removeEventListener("resize", updateSlidesPerView)
    }, [])

    // Adjust currentIndex when slidesPerView changes
    useEffect(() => {
        setCurrentIndex((prev) => Math.min(prev, maxIndex))
    }, [maxIndex])

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, [maxIndex])

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    }, [maxIndex])

    const goToSlide = useCallback(
        (index: number) => {
            setCurrentIndex(Math.min(index, maxIndex))
        },
        [maxIndex],
    )

    // Auto-play with pause on hover
    useEffect(() => {
        if (isPaused) return
        const interval = setInterval(goToNext, SLIDE_INTERVAL)
        return () => clearInterval(interval)
    }, [isPaused, goToNext])

    const slideWidth = 100 / slidesPerView
    const translateX = currentIndex * slideWidth

    return (
        <div
            className="relative mt-8 sm:mt-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Arrow Controls */}
            <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Previous testimonial"
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Next testimonial"
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Carousel Container */}
            <div ref={containerRef} className="overflow-hidden mx-6 sm:mx-10">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${translateX}%)` }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={testimonial.author} className="flex-shrink-0 px-2 sm:px-3" style={{ width: `${slideWidth}%` }}>
                            <div
                                className={`h-full bg-gradient-to-br from-gray-50 to-blue-50/50 p-5 sm:p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-left group ${index >= currentIndex && index < currentIndex + slidesPerView ? "opacity-100" : "opacity-60"
                                    }`}
                            >
                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-sm" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-sm sm:text-base text-gray-700 mb-5 leading-relaxed">
                                    <span className="text-blue-400 text-lg font-serif">"</span>
                                    {testimonial.quote}
                                    <span className="text-blue-400 text-lg font-serif">"</span>
                                </blockquote>

                                {/* Author */}
                                <div className="pt-4 border-t border-gray-200/80">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                            {testimonial.author
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{testimonial.author}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6" role="tablist">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        role="tab"
                        aria-selected={i === currentIndex}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${i === currentIndex ? "w-8 bg-blue-600 shadow-md" : "w-2 bg-gray-300 hover:bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default function CTASection() {
    return (
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main CTA */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
                        Transform HR in <span className="text-blue-600">minutes</span>, not months
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
                        The most intuitive HRMS platform trusted by fast-growing companies worldwide.
                    </p>

                    <TestimonialCarousel />
                </div>

                {/* Trust Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20">
                    {trustFeatures.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className="bg-gray-50 hover:bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md`}
                                    >
                                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Trust Badges */}
                <div className="pt-8 sm:pt-12 border-t border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
                        <div className="text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <p className="font-semibold text-sm sm:text-base text-gray-900">Bank-Grade Security</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">AES-256 Encryption</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <p className="font-semibold text-sm sm:text-base text-gray-900">99.99% Uptime</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Global CDN</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <p className="font-semibold text-sm sm:text-base text-gray-900">24/7 Support</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Enterprise SLA</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
