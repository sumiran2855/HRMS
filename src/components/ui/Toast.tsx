"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"

export type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastProps {
  toast: Toast
  onRemove: (id: string) => void
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-900"
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-900"
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-900"
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900"
  }
}

function ToastItem({ toast, onRemove }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const config = toastConfig[toast.type]
  const Icon = config.icon
  const duration = toast.duration || 5000

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true)

    // Auto remove after duration
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onRemove(toast.id), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [toast.id, duration, onRemove])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      <div className={`
        ${config.bgColor} ${config.borderColor}
        border rounded-xl p-4 shadow-lg backdrop-blur-sm
        min-w-[320px] max-w-[400px]
      `}>
        <div className="flex items-start gap-3">
          <div className={`w-6 h-6 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
            <Icon className={`w-4 h-4 ${config.iconColor}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className={`font-semibold ${config.titleColor} text-sm mb-1`}>
              {toast.title}
            </p>
            {toast.message && (
              <p className="text-slate-600 text-xs leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>
          
          <button
            onClick={handleRemove}
            className={`
              w-6 h-6 rounded-full flex items-center justify-center
              hover:bg-black/10 transition-colors flex-shrink-0
              ${config.iconColor} opacity-60 hover:opacity-100
            `}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

// Toast management hook
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    return id
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const success = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'success', title, message, duration })
  }

  const error = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'error', title, message, duration })
  }

  const warning = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'warning', title, message, duration })
  }

  const info = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'info', title, message, duration })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}
