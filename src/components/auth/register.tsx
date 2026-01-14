"use client"

import type React from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Loader2, Mail, User, UserPlus } from "lucide-react"
import { PasswordInput } from "@/components/auth/shared"
import { useRegister } from "@/hooks/auth/useRegister"

export function RegisterForm() {
    const { isLoading, showPassword, showConfirmPassword, formData, setFormData, handleSubmit, strength, setShowPassword, setShowConfirmPassword } = useRegister()

    return (
        <div className="space-y-7">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
                    <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Create Account
                </h1>
                <p className="text-base text-slate-600">
                    Get started with HRMS today
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                        Full Name
                    </Label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="h-12 pl-12 pr-4 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400"
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                            required
                            autoComplete="name"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email Address
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="John@company.com"
                            className="h-12 pl-12 pr-4 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400"
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <PasswordInput
                    id="password"
                    label="Password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(value) => setFormData({ ...formData, password: value })}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    strength={strength}
                    showStrengthIndicator={true}
                />

                <PasswordInput
                    id="confirmPassword"
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
                    showPassword={showConfirmPassword}
                    onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    confirmPassword={formData.password}
                    showConfirmCheck={true}
                />

                <div className="flex items-start gap-2 pt-1">
                    <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked: boolean) => setFormData({ ...formData, agreeToTerms: checked })}
                        className="w-4 h-4 border-slate-300 mt-0.5 cursor-pointer"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-slate-600 cursor-pointer leading-relaxed font-normal">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                            Privacy Policy
                        </a>
                    </Label>
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl shadow-blue-500/30 transition-all duration-200 rounded-lg font-semibold text-sm cursor-pointer"
                    disabled={isLoading || !formData.agreeToTerms}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Creating account...</span>
                        </div>
                    ) : (
                        "Create Account"
                    )}
                </Button>

                <div className="relative my-3 mt-[-2]">
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

                <p className="text-xs text-center text-slate-500 pt-2">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer">
                        Sign in
                    </a>
                </p>
            </form>
        </div>
    )
}
