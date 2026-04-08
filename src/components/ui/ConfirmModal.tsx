"use client"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { X, AlertTriangle, Trash2, CheckCircle, Info } from "lucide-react"

export type ConfirmModalType = "delete" | "warning" | "info" | "success"

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  type?: ConfirmModalType
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
}

const iconConfig = {
  delete: {
    icon: Trash2,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  info: {
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  success: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  }
}

const buttonConfig = {
  delete: {
    confirm: "Delete",
    confirmClass: "bg-red-600 hover:bg-red-700 text-white"
  },
  warning: {
    confirm: "Continue",
    confirmClass: "bg-yellow-600 hover:bg-yellow-700 text-white"
  },
  info: {
    confirm: "Confirm",
    confirmClass: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  success: {
    confirm: "OK",
    confirmClass: "bg-green-600 hover:bg-green-700 text-white"
  }
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "delete",
  confirmText,
  cancelText = "Cancel",
  isLoading = false
}: ConfirmModalProps) {
  if (!isOpen) return null

  const config = iconConfig[type]
  const buttonConfigItem = buttonConfig[type]
  const Icon = config.icon

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${config.bgColor} ${config.borderColor} border-2 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              {title}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-slate-100 cursor-pointer"
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="pb-6">
            <p className="text-slate-600 mb-6 leading-relaxed">
              {message}
            </p>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 cursor-pointer"
                disabled={isLoading}
              >
                {cancelText}
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                className={`flex-1 ${buttonConfigItem.confirmClass} cursor-pointer`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  confirmText || buttonConfigItem.confirm
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
