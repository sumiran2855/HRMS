"use client"

import { Umbrella, Heart, User, Briefcase, CheckCircle, FileText } from "lucide-react"
import { LEAVE_BALANCES } from "@/constants/leave-management"
import type { LeaveFormData } from "@/types/leave.types"

const ICON_MAP: Record<string, React.ElementType> = { Umbrella, Heart, User, Briefcase }

function pct(used: number, total: number) {
  return total > 0 ? Math.round((used / total) * 100) : 0
}

interface LeaveApplyFormProps {
  formData: LeaveFormData
  setFormData: React.Dispatch<React.SetStateAction<LeaveFormData>>
  submitted: boolean
  setSubmitted: (b: boolean) => void
  onSubmit: () => void
}

export default function LeaveApplyForm({ formData, setFormData, submitted, setSubmitted, onSubmit }: LeaveApplyFormProps) {
  if (submitted) {
    return (
      <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="py-20 text-center">
          <div className="w-[72px] h-[72px] rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-9 h-9 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-foreground mb-2">Request Submitted!</div>
          <div className="text-sm text-muted-foreground mb-7">Your leave request has been sent for approval.</div>
          <button
            onClick={() => setSubmitted(false)}
            className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:opacity-90 transition-opacity"
          >
            Apply Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] min-h-[500px]">
        {/* Form */}
        <div className="p-8 lg:border-r border-slate-200/50 dark:border-slate-800">
          <div className="mb-7">
            <div className="text-lg font-bold text-foreground">Apply for Leave</div>
            <div className="text-sm text-muted-foreground mt-1">Fill in the details below to submit your request</div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Leave type */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Leave Type *</label>
              <div className="grid grid-cols-2 gap-2.5">
                {LEAVE_BALANCES.map((b) => {
                  const Icon = ICON_MAP[b.icon] ?? Umbrella
                  const sel = formData.type === b.type
                  return (
                    <button
                      key={b.type}
                      onClick={() => setFormData((f) => ({ ...f, type: b.type }))}
                      className={`px-3.5 py-3 rounded-xl border-2 flex items-center gap-2.5 transition-all duration-200
                        ${sel
                          ? `border-primary bg-primary/10 dark:bg-primary/20`
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-primary/50"
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${sel ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-semibold ${sel ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>{b.type}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              {([["Start Date", "startDate"], ["End Date", "endDate"]] as const).map(([label, key]) => (
                <div key={key}>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">{label} *</label>
                  <input
                    type="date"
                    value={formData[key]}
                    onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full h-11 rounded-xl border-[1.5px] border-slate-200 dark:border-slate-700 px-3 text-sm text-foreground bg-slate-50/50 dark:bg-slate-800/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Reason */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Reason *</label>
              <textarea
                rows={4}
                placeholder="Briefly describe the reason for your leave..."
                value={formData.reason}
                onChange={(e) => setFormData((f) => ({ ...f, reason: e.target.value }))}
                className="w-full rounded-xl border-[1.5px] border-slate-200 dark:border-slate-700 p-3 text-sm text-foreground bg-slate-50/50 dark:bg-slate-800/50 outline-none resize-y focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Attachment */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Attachment <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <div className="h-20 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-center gap-2.5 cursor-pointer hover:border-primary/50 transition-colors">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload a file</span>
              </div>
            </div>

            <button
              onClick={onSubmit}
              className="h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:opacity-90 transition-opacity tracking-wide"
            >
              Submit Leave Request
            </button>
          </div>
        </div>

        {/* Sidebar balance */}
        <div className="p-7 bg-slate-50/50 dark:bg-slate-800/20 rounded-r-2xl">
          <div className="text-sm font-bold text-foreground mb-4">Your Balances</div>
          <div className="flex flex-col gap-3">
            {LEAVE_BALANCES.map((b) => {
              const Icon = ICON_MAP[b.icon] ?? Umbrella
              const p = pct(b.used, b.total)
              return (
                <div key={b.type} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 text-${b.color}-500`} />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{b.type}</span>
                    </div>
                    <span className={`text-sm font-bold text-${b.color}-500`}>{b.remaining}d</span>
                  </div>
                  <div className={`h-1.5 rounded-full bg-${b.color}-100 dark:bg-${b.color}-950/30 overflow-hidden`}>
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${b.gradient} transition-all duration-500`}
                      style={{ width: `${p}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
