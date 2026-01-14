"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Loader2, Mail, Check, UserPlus } from "lucide-react"
import { PasswordInput } from "@/components/auth/shared"
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
                    <UserPlus className="w-8 h-8 text-white" />
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

                    <PasswordInput
                        id="newPassword"
                        label="New Password"
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={(value) => setFormData({ ...formData, newPassword: value })}
                        showPassword={showNewPassword}
                        onTogglePassword={toggleNewPasswordVisibility}
                        strength={strength}
                        showStrengthIndicator={true}
                    />

                    <PasswordInput
                        id="confirmPassword"
                        label="Confirm New Password"
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
                        showPassword={showConfirmPassword}
                        onTogglePassword={toggleConfirmPasswordVisibility}
                        confirmPassword={formData.newPassword}
                        showConfirmCheck={true}
                    />

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
