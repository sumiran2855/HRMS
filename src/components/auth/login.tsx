"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Loader2 } from "lucide-react"

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)
    }

    return (
        <div className="space-y-6">
            <div className="text-center pb-6 border-b border-slate-200">
                <h1 className="text-xl font-semibold text-slate-900 mb-2">
                    Welcome to HRMS
                </h1>
                <p className="text-sm text-slate-600">
                    Sign in to manage your team and operations
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-bold text-slate-800 tracking-wide">
                        Email Address
                    </Label>
                    <div className="relative group">
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-14 border-2 border-slate-200 bg-white rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-base group-hover:border-slate-300"
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                            required
                            autoComplete="email"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-bold text-slate-800 tracking-wide">
                        Password
                    </Label>
                    <div className="relative group">
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="h-14 border-2 border-slate-200 bg-white rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-base group-hover:border-slate-300"
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                            required
                            autoComplete="current-password"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="remember"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked: boolean) => setFormData({ ...formData, rememberMe: checked })}
                            className="w-5 h-5 border-2 cursor-pointer"
                        />
                        <Label htmlFor="remember" className="text-sm font-semibold text-slate-700 cursor-pointer hover:text-slate-900 transition-colors">
                            Remember me
                        </Label>
                    </div>
                    <a href="#" className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 relative group/link">
                        Forgot Password?
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover/link:w-full transition-all duration-300" />
                    </a>
                </div>

                <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 rounded-xl font-bold text-base tracking-wide mt-4 relative overflow-hidden group/btn cursor-pointer"
                    disabled={isLoading}
                >
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {isLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.5} />
                            <span className="font-bold">Signing in...</span>
                        </>
                    ) : (
                        <>
                            <span className="font-bold">Login</span>
                            <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"></span>
                        </>
                    )}
                </Button>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-4 text-slate-500 font-semibold tracking-wider">OR CONTINUE WITH</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        className="h-12 border-2 border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-slate-700 hover:border-slate-300 hover:shadow-lg group/social cursor-pointer"
                    >
                        <img
                            src="/google-icon.svg"
                            alt="Google"
                            className="w-5 h-5 transition-transform duration-300 group-hover/social:scale-110"
                        />
                        <span className="hidden sm:inline">Google</span>
                    </button>
                    <button
                        type="button"
                        className="h-12 border-2 border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-slate-700 hover:border-slate-300 hover:shadow-lg group/social cursor-pointer"
                    >
                        <img
                            src="/github-icon.svg"
                            alt="GitHub"
                            className="w-5 h-5 transition-transform duration-300 group-hover/social:scale-110"
                        />
                        <span className="hidden sm:inline">GitHub</span>
                    </button>
                </div>

                <p className="text-xs text-center text-slate-500 leading-relaxed pt-3">
                    By signing in, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline underline-offset-2 transition-colors">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline underline-offset-2 transition-colors">
                        Privacy Policy
                    </a>
                </p>
            </form>
        </div>
    )
}
