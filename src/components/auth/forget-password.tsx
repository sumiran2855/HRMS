"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Loader2, Mail, Lock, Eye, EyeOff, Check, CheckCircle2 } from "lucide-react"
import { useForgetPassword } from "@/hooks/auth/useForgetPassword"

export function ForgetPassword() {
    const {
        isLoading,
        isCodeSent,
        formData,
        setFormData,
        showNewPassword,
        showConfirmPassword,
        handleSendCode,
        handleResetPassword,
        toggleNewPasswordVisibility,
        toggleConfirmPasswordVisibility,
        strength,
    } = useForgetPassword()

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-slate-900">
                    {isCodeSent ? "Reset Password" : "Forgot Password"}
                </h1>
                <p className="text-base text-slate-600">
                    {isCodeSent
                        ? "Enter the verification code sent to your email and set a new password"
                        : "Enter your email address and we'll send you a verification code"
                    }
                </p>
            </div>

            {!isCodeSent ? (
                <form onSubmit={handleSendCode} className="space-y-5">
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
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl shadow-blue-500/30 transition-all duration-200 rounded-lg font-semibold text-sm cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Sending code...
                            </>
                        ) : (
                            "Send Verification Code"
                        )}
                    </Button>

                    <div className="text-center">
                        <a href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            Back to Sign In
                        </a>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleResetPassword} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="verificationCode" className="text-sm font-semibold text-slate-700">
                            Verification Code
                        </Label>
                        <div className="relative">
                            <Check className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                id="verificationCode"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="Enter 6-digit code"
                                className="h-12 pl-12 pr-4 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400 font-mono tracking-wider text-lg"
                                value={formData.verificationCode}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
                                    setFormData({ ...formData, verificationCode: value })
                                }}
                                required
                                maxLength={6}
                                autoComplete="one-time-code"
                            />
                            {formData.verificationCode.length === 6 && (
                                <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                        </div>
                        {formData.verificationCode.length > 0 && formData.verificationCode.length !== 6 && (
                            <p className="text-xs text-red-600">Enter 6-digit code</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-semibold text-slate-700">
                            New Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                className="h-12 pl-12 pr-12 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                required
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={toggleNewPasswordVisibility}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                aria-label={showNewPassword ? "Hide password" : "Show password"}
                            >
                                {showNewPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {formData.newPassword && (
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
                                                        <span className={formData.newPassword.length >= 8 ? 'text-green-600' : 'text-red-600'}>
                                                            {formData.newPassword.length >= 8 ? '✓' : '•'}
                                                        </span>
                                                        <span>At least 8 characters</span>
                                                    </li>
                                                    <li className="flex items-start gap-1.5">
                                                        <span className={/[A-Z]/.test(formData.newPassword) && /[a-z]/.test(formData.newPassword) ? 'text-green-600' : 'text-red-600'}>
                                                            {/[A-Z]/.test(formData.newPassword) && /[a-z]/.test(formData.newPassword) ? '✓' : '•'}
                                                        </span>
                                                        <span>Mix of uppercase & lowercase</span>
                                                    </li>
                                                    <li className="flex items-start gap-1.5">
                                                        <span className={/[0-9]/.test(formData.newPassword) ? 'text-green-600' : 'text-red-600'}>
                                                            {/[0-9]/.test(formData.newPassword) ? '✓' : '•'}
                                                        </span>
                                                        <span>At least one number</span>
                                                    </li>
                                                    <li className="flex items-start gap-1.5">
                                                        <span className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? 'text-green-600' : 'text-red-600'}>
                                                            {/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? '✓' : '•'}
                                                        </span>
                                                        <span>Special character (!@#$%^...)</span>
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
                            Confirm New Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                className="h-12 pl-12 pr-12 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                            {formData.confirmPassword && formData.newPassword === formData.confirmPassword && formData.newPassword.length > 0 && (
                                <CheckCircle2 className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                        </div>
                        {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <span>Passwords do not match</span>
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl shadow-blue-500/30 transition-all duration-200 rounded-lg font-semibold text-sm cursor-pointer"
                        disabled={isLoading || formData.newPassword !== formData.confirmPassword || formData.newPassword.length === 0}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Resetting password...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </Button>

                    <div className="text-center">
                        <a href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            Back to Sign In
                        </a>
                    </div>
                </form>
            )}
        </div>
    )
}
