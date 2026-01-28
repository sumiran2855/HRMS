"use client"

import { createContext, useContext, useEffect, ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types/auth.types'
import { encryptData, decryptData } from '@/utils/encryption'
import Loader from '@/components/ui/Loader'

const STORAGE_KEYS = {
    USER: 'auth-user',
    ACCESS_TOKEN: 'auth-access-token',
    REFRESH_TOKEN: 'auth-refresh-token',
    IS_AUTHENTICATED: 'auth-is-authenticated'
} as const

interface AuthContextType {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
    setAuth: (user: User, accessToken: string, refreshToken: string) => void
    logout: () => void
    setLoading: (loading: boolean) => void
    clearAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

const clearAuthStorage = () => {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
    })
}

const getStoredAuthData = () => {
    return {
        user: localStorage.getItem(STORAGE_KEYS.USER),
        accessToken: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
        refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
        isAuthenticated: localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED)
    }
}

const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return Date.now() >= payload.exp * 1000
    } catch {
        return true
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedData = getStoredAuthData()

                if (storedData.user && storedData.accessToken && storedData.refreshToken && storedData.isAuthenticated === 'true') {
                    const userData = decryptData<User>(storedData.user)
                    if (userData && !isTokenExpired(storedData.accessToken)) {
                        setUser(userData)
                        setAccessToken(storedData.accessToken)
                        setRefreshToken(storedData.refreshToken)
                        setIsAuthenticated(true)
                        return
                    }
                }

                const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
                const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/reset-password'
                
                logout(!isAuthPage)
            } catch (error) {
                console.error('Auth initialization error:', error)
                const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
                const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/reset-password'
                logout(!isAuthPage)
            } finally {
                setIsLoading(false)
            }
        }

        initializeAuth()
    }, [])


    const setAuth = (userData: User, accessToken: string, refreshToken: string) => {
        if (!userData?.email || !accessToken) {
            console.error('Invalid auth data provided')
            logout()
            return
        }

        try {
            const encryptedUser = encryptData(userData)

            localStorage.setItem(STORAGE_KEYS.USER, encryptedUser)
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
            if (refreshToken) {
                localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
            }
            localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true')

            setUser(userData)
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
            setIsAuthenticated(true)
            setIsLoading(false)
        } catch (error) {
            console.error('Error setting auth data:', error)
            logout()
        }
    }

    const logout = (redirectToLogin = true) => {
        clearAuthStorage()

        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
        setIsAuthenticated(false)
        setIsLoading(false)

        if (redirectToLogin) {
            router.push('/login')
        }
    }

    const setLoading = (loading: boolean) => {
        setIsLoading(loading)
    }

    const clearAuth = () => {
        clearAuthStorage()

        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
        setIsAuthenticated(false)
        setIsLoading(false)
    }

    const value: AuthContextType = {
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoading,
        setAuth,
        logout,
        setLoading,
        clearAuth,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return <Loader fullScreen />;
    }

    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}
