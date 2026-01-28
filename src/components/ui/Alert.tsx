"use client"

import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

export type AlertVariant = "error" | "info" | "success" | "warning"

interface AlertProps {
    variant: AlertVariant
    message: string
    onClose?: () => void
    className?: string
}

const alertConfig = {
    error: {
        container: "bg-white border-l-4 border-l-red-600 border-y border-r border-gray-200 text-gray-900 shadow-lg",
        icon: AlertCircle,
        iconWrapper: "bg-red-100",
        iconColor: "text-red-600",
        closeButton: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
    },
    info: {
        container: "bg-white border-l-4 border-l-blue-600 border-y border-r border-gray-200 text-gray-900 shadow-lg",
        icon: Info,
        iconWrapper: "bg-blue-100",
        iconColor: "text-blue-600",
        closeButton: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
    },
    success: {
        container: "bg-white border-l-4 border-l-green-600 border-y border-r border-gray-200 text-gray-900 shadow-lg",
        icon: CheckCircle,
        iconWrapper: "bg-green-100",
        iconColor: "text-green-600",
        closeButton: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
    },
    warning: {
        container: "bg-white border-l-4 border-l-amber-600 border-y border-r border-gray-200 text-gray-900 shadow-lg",
        icon: AlertTriangle,
        iconWrapper: "bg-amber-100",
        iconColor: "text-amber-600",
        closeButton: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
    }
}

export function Alert({ variant, message, onClose, className = "" }: AlertProps) {
    const config = alertConfig[variant]
    const Icon = config.icon

    return (
        <div
            className={`
                relative border-2 rounded-lg px-4 py-2
                animate-in fade-in-0 slide-in-from-top-4 duration-300
                ${config.container} 
                ${className}
            `}
            role="alert"
        >
            <div className="flex items-center gap-3">
                <div className={`
                    flex-shrink-0 rounded-md p-2
                    ${config.iconWrapper}
                `}>
                    <Icon className={`w-5 h-5 ${config.iconColor}`} strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-relaxed">
                        {message}
                    </p>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className={`
                            flex-shrink-0 rounded-md p-2
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
                            active:scale-90
                            ${config.closeButton}
                        `}
                        aria-label="Close alert"
                    >
                        <X className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                )}
            </div>
        </div>
    )
}

export function ErrorAlert(props: Omit<AlertProps, "variant">) {
    return <Alert {...props} variant="error" />
}

export function InfoAlert(props: Omit<AlertProps, "variant">) {
    return <Alert {...props} variant="info" />
}

export function SuccessAlert(props: Omit<AlertProps, "variant">) {
    return <Alert {...props} variant="success" />
}

export function WarningAlert(props: Omit<AlertProps, "variant">) {
    return <Alert {...props} variant="warning" />
}