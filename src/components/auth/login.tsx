"use client"

import type React from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Loader2, Mail, Lock, Eye, EyeOff, User } from "lucide-react"
import { useLogin } from "@/hooks/auth/useLogin"

export function LoginForm() {
    const { isLoading, showPassword, formData, setFormData, handleSubmit, setShowPassword } = useLogin()

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
                    <User className="w-8 h-8 text-white"/>
                </div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome Back
                </h1>
                <p className="text-base text-slate-600">
                    Sign in to continue to HRMS
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email Address
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            className="h-12 pl-12 pr-4 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400"
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                        Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 pl-12 pr-12 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400"
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked: boolean) => setFormData({ ...formData, rememberMe: checked })}
                            className="w-4 h-4 border-slate-300 cursor-pointer"
                        />
                        <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer font-normal">
                            Remember me
                        </Label>
                    </div>
                    <a href="/reset-password" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                        Forgot password?
                    </a>
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl shadow-blue-500/30 transition-all duration-200 rounded-lg font-semibold text-sm cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Signing in...</span>
                        </div>
                    ) : (
                        "Sign In"
                    )}
                </Button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-3 text-slate-500 font-medium">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <button
                        type="button"
                        className="h-11 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg transition-all flex items-center justify-center gap-2 font-medium text-slate-700 hover:border-slate-400 cursor-pointer"
                    >
                        <img
                            src="/google-icon.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="text-sm">Google</span>
                    </button>
                    <button
                        type="button"
                        className="h-11 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg transition-all flex items-center justify-center gap-2 font-medium text-slate-700 hover:border-slate-400 cursor-pointer"
                    >
                        <img
                            src="/linkedin-icon.svg"
                            alt="LinkedIn"
                            className="w-5 h-5"
                        />
                        <span className="text-sm">LinkedIn</span>
                    </button>
                    <button
                        type="button"
                        className="h-11 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg transition-all flex items-center justify-center gap-2 font-medium text-slate-700 hover:border-slate-400 cursor-pointer"
                    >
                        <img
                            src="/apple-icon.svg"
                            alt="Apple"
                            className="w-5 h-5"
                        />
                        <span className="text-sm">Apple</span>
                    </button>
                </div>

                <p className="text-xs text-center text-slate-500 pt-4">
                    By signing in, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Privacy Policy
                    </a>
                </p>

                <p className="text-xs text-center text-slate-500 pt-2">
                    Didn't have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    )
}
