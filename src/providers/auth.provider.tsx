"use client"

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth.service'

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { isAuthenticated, user, setAuth, logout } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        const token = authService.getToken()
        const storedUser = localStorage.getItem('user')

        if (token && storedUser && !isAuthenticated) {
            try {
                const userData = JSON.parse(storedUser)
                setAuth(userData, token)
            } catch (error) {
                console.info('Error parsing stored user data:', error)
                logout()
            }
        }
    }, [isAuthenticated, setAuth, logout])

    return <>{children}</>
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}
