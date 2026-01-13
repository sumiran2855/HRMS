"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Loader2 } from "lucide-react"

export function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
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
                    Create Your Account
                </h1>
                <p className="text-sm text-slate-600">
                    Join HRMS to manage your team efficiently
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-bold text-slate-800 tracking-wide">
                        Full Name
                    </Label>
                    <div className="relative group">
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-slate-200 bg-white rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-base group-hover:border-slate-300"
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                            required
                            autoComplete="name"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

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
                            placeholder="Create a password"
                            className="h-14 border-2 border-slate-200 bg-white rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-base group-hover:border-slate-300"
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                            required
                            autoComplete="new-password"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-sm font-bold text-slate-800 tracking-wide">
                        Confirm Password
                    </Label>
                    <div className="relative group">
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="h-14 border-2 border-slate-200 bg-white rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-base group-hover:border-slate-300"
                            value={formData.confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                            autoComplete="new-password"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked: boolean) => setFormData({ ...formData, agreeToTerms: checked })}
                        className="w-5 h-5 border-2 cursor-pointer"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm font-semibold text-slate-700 cursor-pointer hover:text-slate-900 transition-colors whitespace-nowrap">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline underline-offset-2 transition-colors">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline underline-offset-2 transition-colors">
                            Privacy Policy
                        </a>
                    </Label>
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
                            <span className="font-bold">Creating account...</span>
                        </>
                    ) : (
                        <>
                            <span className="font-bold">Create Account</span>
                            <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"></span>
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}
