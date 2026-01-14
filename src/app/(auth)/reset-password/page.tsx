"use client"

import { ForgetPassword } from "@/components/auth/reset-password"
import AuthSidebar from "@/components/auth/AuthSidebar"

export default function LoginPage() {

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <AuthSidebar />

            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 relative">
                <div className="absolute inset-0 bg-gradient-to-tl from-white via-blue-50/30 to-indigo-50/30" />
                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
                        <ForgetPassword />
                    </div>
                </div>
            </div>
        </div>
    )
}