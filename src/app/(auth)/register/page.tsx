"use client"

import { useState, useEffect, useCallback } from "react"
import { RegisterForm } from "@/components/auth/register"
import Link from "next/link"
import { slides } from "@/types/auth"

export default function RegisterPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        </div>

        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative w-full max-w-xl flex flex-col items-center z-10">
          <div className="relative w-full mb-16">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />

            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 rounded-3xl" />

              <div className="relative p-12">
                <img
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt={slides[currentSlide].title}
                  className="w-full h-auto object-contain transition-all duration-700 drop-shadow-2xl"
                  style={{ maxHeight: '400px' }}
                />
              </div>

              <div className="absolute top-4 left-4 w-20 h-20 border-l-4 border-t-4 border-blue-500/30 rounded-tl-2xl" />
              <div className="absolute bottom-4 right-4 w-20 h-20 border-r-4 border-b-4 border-indigo-500/30 rounded-br-2xl" />
            </div>

            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-bold tracking-wider">HRMS</span>
              </div>
            </div>
          </div>

          <div className="text-center max-w-lg px-4 transition-all duration-700">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-5 tracking-tight leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-14">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full ${index === currentSlide
                  ? "w-12 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50"
                  : "w-3 h-3 bg-slate-300 hover:bg-slate-400 hover:scale-110"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-tl from-white via-blue-50/30 to-indigo-50/30" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <RegisterForm />
          </div>

          <p className="mt-8 text-center text-base text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
