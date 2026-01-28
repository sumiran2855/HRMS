"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react"
import { Alert, AlertVariant } from "@/components/ui/Alert"

interface AlertItem {
    id: string
    variant: AlertVariant
    message: string
}

interface AlertContextType {
    showAlert: (variant: AlertVariant, message: string, duration?: number) => void
    hideAlert: (id: string) => void
    clearAllAlerts: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function useAlert() {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider")
    }
    return context
}

interface AlertProviderProps {
    children: React.ReactNode
}

export function AlertProvider({ children }: AlertProviderProps) {
    const [alerts, setAlerts] = useState<AlertItem[]>([])
    const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

    const hideAlert = useCallback((id: string) => {
        const timer = timersRef.current.get(id)
        if (timer) {
            clearTimeout(timer)
            timersRef.current.delete(id)
        }

        setAlerts(prev => prev.filter(alert => alert.id !== id))
    }, [])

    const showAlert = useCallback((variant: AlertVariant, message: string, duration?: number) => {
        const id = Date.now().toString()
        setAlerts(prev => [...prev, { id, variant, message }])

        const defaultDurations = {
            error: 4000,
            warning: 3000,
            success: 3000,
            info: 3000
        }

        const autoDismissDuration = duration ?? defaultDurations[variant]

        const timer = setTimeout(() => {
            hideAlert(id)
        }, autoDismissDuration)

        timersRef.current.set(id, timer)
    }, [hideAlert])

    const clearAllAlerts = useCallback(() => {
        timersRef.current.forEach(timer => clearTimeout(timer))
        timersRef.current.clear()

        setAlerts([])
    }, [])

    useEffect(() => {
        return () => {
            timersRef.current.forEach(timer => clearTimeout(timer))
            timersRef.current.clear()
        }
    }, [])

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert, clearAllAlerts }}>
            {children}

            <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
                {alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        variant={alert.variant}
                        message={alert.message}
                        onClose={() => hideAlert(alert.id)}
                        className="shadow-lg border-0"
                    />
                ))}
            </div>
        </AlertContext.Provider>
    )
}

export const useErrorAlert = () => {
    const { showAlert } = useAlert()
    return (message: string, duration?: number) => showAlert("error", message, duration)
}

export const useInfoAlert = () => {
    const { showAlert } = useAlert()
    return (message: string, duration?: number) => showAlert("info", message, duration)
}

export const useSuccessAlert = () => {
    const { showAlert } = useAlert()
    return (message: string, duration?: number) => showAlert("success", message, duration)
}

export const useWarningAlert = () => {
    const { showAlert } = useAlert()
    return (message: string, duration?: number) => showAlert("warning", message, duration)
}