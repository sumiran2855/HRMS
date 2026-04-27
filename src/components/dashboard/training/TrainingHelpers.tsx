import React from "react"
import { Star, X } from "lucide-react"
import { STATUS_CONFIG, AVATAR_COLORS } from "@/constants/training"

export const cardClass = "bg-white rounded-xl border border-slate-200 shadow-sm"

export const inputClass =
  "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"

export const inputWithIconClass =
  "w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"

export const selectClass =
  "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 appearance-none bg-white text-sm cursor-pointer"

function getAvatarColor(id: string): string {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

export function Avatar({ initials, id, size = 40 }: { initials: string; id: string; size?: number }) {
  const bg = getAvatarColor(id)

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
      style={{ width: size, height: size, backgroundColor: bg, fontSize: `${Math.floor(size * 0.35)}px` }}
    >
      {initials}
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.not_started

  return (
    <span
      className="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      {cfg.label}
    </span>
  )
}

export function ProgressBar({ value, color = "#6366f1" }: { value: number; color?: string }) {
  return (
    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  )
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={12} fill={i <= rating ? "#f59e0b" : "none"} color={i <= rating ? "#f59e0b" : "#d1d5db"} />
      ))}
    </div>
  )
}

export function SkillTag({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {name}
    </span>
  )
}

export function Modal({ open, onClose, title, children }: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-5" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-7 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
