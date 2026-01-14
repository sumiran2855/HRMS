"use client"

import type React from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Loader2, Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { useRegister } from "@/hooks/auth/useRegister"

export function RegisterForm() {
    const { isLoading, showPassword, showConfirmPassword, formData, setFormData, handleSubmit, strength, setShowPassword, setShowConfirmPassword } = useRegister()

    return (
        <div className="space-y-7">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
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

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                        Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="h-12 pl-12 pr-12 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400"
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                            required
                            autoComplete="new-password"
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
                    {formData.password && (
                        <div className="space-y-2 mt-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-600">Password strength</span>
                                <span className={`text-xs font-semibold ${strength.strength === 100 ? 'text-green-600' :
                                    strength.strength >= 75 ? 'text-blue-600' :
                                        strength.strength >= 50 ? 'text-yellow-600' :
                                            'text-red-600'
                                    }`}>
                                    {strength.label}
                                </span>
                            </div>

                            <div className="flex gap-1">
                                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.strength >= 25 ? strength.color : 'bg-slate-200'
                                    }`} />
                                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.strength >= 50 ? strength.color : 'bg-slate-200'
                                    }`} />
                                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.strength >= 75 ? strength.color : 'bg-slate-200'
                                    }`} />
                                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.strength >= 100 ? strength.color : 'bg-slate-200'
                                    }`} />
                            </div>

                            {strength.strength < 75 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                                    <div className="flex gap-2">
                                        <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-red-800 mb-1">Weak password</p>
                                            <ul className="text-xs text-red-700 space-y-0.5">
                                                <li className="flex items-start gap-1.5">
                                                    <span className={formData.password.length >= 8 ? 'text-green-600' : 'text-red-600'}>
                                                        {formData.password.length >= 8 ? '✓' : '•'}
                                                    </span>
                                                    <span>At least 8 characters</span>
                                                </li>
                                                <li className="flex items-start gap-1.5">
                                                    <span className={/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-green-600' : 'text-red-600'}>
                                                        {/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? '✓' : '•'}
                                                    </span>
                                                    <span>Mix of uppercase & lowercase</span>
                                                </li>
                                                <li className="flex items-start gap-1.5">
                                                    <span className={/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-red-600'}>
                                                        {/[0-9]/.test(formData.password) ? '✓' : '•'}
                                                    </span>
                                                    <span>At least one number</span>
                                                </li>
                                                <li className="flex items-start gap-1.5">
                                                    <span className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-red-600'}>
                                                        {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? '✓' : '•'}
                                                    </span>
                                                    <span>Special character (!@#$%...)</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {strength.strength >= 75 && strength.strength < 100 && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 mt-2">
                                    <div className="flex gap-2 items-start">
                                        <svg className="w-4 h-4 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-xs text-blue-700">Good password! Add more characters or special symbols for better security.</p>
                                    </div>
                                </div>
                            )}

                            {strength.strength === 100 && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 mt-2">
                                    <div className="flex gap-2 items-start">
                                        <svg className="w-4 h-4 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-xs font-medium text-green-700">Excellent! Your password is strong and secure.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                        Confirm Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            className="h-12 pl-12 pr-12 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400"
                            value={formData.confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                            <CheckCircle2 className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                    </div>
                </div>

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
