"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, PencilLine, X } from "lucide-react"
import { AWARD_STATUS_BADGE, AWARD_STATUS_LABELS } from "@/constants/award"
import { AwardApprovalStep, AwardRequest } from "@/types/award.types"

interface ViewAwardModalProps {
  isOpen: boolean
  onClose: () => void
  request: AwardRequest | null
  onEdit: (request: AwardRequest) => void
  onAddComment: (requestId: string, text: string, internal: boolean) => void
}

export function ViewAwardModal({ isOpen, onClose, request, onEdit, onAddComment }: ViewAwardModalProps) {
  const [commentText, setCommentText] = useState("")
  const [internal, setInternal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const infoCard = useMemo(() => "rounded-xl border border-slate-200 bg-slate-50 p-4", [])
  const steps = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "performance", label: "Performance" },
      { id: "workflow", label: "Workflow" },
      { id: "activity", label: "Activity" },
    ],
    []
  )
  const workflowSteps: Array<{ label: string; step: AwardApprovalStep }> = [
    { label: "Manager Approval", step: request?.workflow.manager ?? { status: "pending" } },
    { label: "HR Approval", step: request?.workflow.hr ?? { status: "pending" } },
    { label: "Finance Approval", step: request?.workflow.finance ?? { status: "pending" } },
  ]

  useEffect(() => {
    if (!isOpen) return
    setCurrentStep(0)
    setCommentText("")
    setInternal(false)
  }, [isOpen, request?.id])

  if (!isOpen || !request) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto border border-slate-200 shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center">{request.employee.avatar}</div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{request.summary.awardTitle}</h3>
              <p className="text-xs text-slate-500">{request.employee.employeeName} • {request.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(request)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-fuchsia-200 text-fuchsia-700 bg-fuchsia-50 rounded-lg hover:bg-fuchsia-100"
            >
              <PencilLine className="w-3.5 h-3.5" />
              Edit Award
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => {
              const isActive = index === currentStep
              const isDone = index < currentStep

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "border-fuchsia-300 bg-fuchsia-100 text-fuchsia-700"
                      : isDone
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-500"
                  }`}
                >
                  <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                    isActive
                      ? "bg-fuchsia-600 text-white"
                      : isDone
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-600"
                  }`}
                  >
                    {index + 1}
                  </span>
                  {step.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${AWARD_STATUS_BADGE[request.status]}`}>
              {AWARD_STATUS_LABELS[request.status]}
            </span>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full border border-slate-200 bg-slate-100 text-slate-700">
              {request.summary.awardType}
            </span>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 capitalize">
              {request.summary.visibility.replace("_", " ")}
            </span>
          </div>

          {currentStep === 0 && (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className={infoCard}>
                  <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Employee Snapshot</div>
                  <div className="space-y-1.5 text-sm text-slate-700">
                    <p><span className="font-semibold">Name:</span> {request.employee.employeeName}</p>
                    <p><span className="font-semibold">Code:</span> {request.employee.employeeCode}</p>
                    <p><span className="font-semibold">Department:</span> {request.employee.department}</p>
                    <p><span className="font-semibold">Designation:</span> {request.employee.designation}</p>
                    <p><span className="font-semibold">Manager:</span> {request.employee.manager}</p>
                    <p><span className="font-semibold">Location:</span> {request.employee.location}</p>
                  </div>
                </div>

                <div className={infoCard}>
                  <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Award Summary</div>
                  <div className="space-y-1.5 text-sm text-slate-700">
                    <p><span className="font-semibold">Category:</span> {request.summary.category}</p>
                    <p><span className="font-semibold">Achievement Date:</span> {request.summary.achievementDate}</p>
                    <p><span className="font-semibold">Award Period:</span> {request.summary.awardPeriod}</p>
                    <p><span className="font-semibold">Publish Date:</span> {request.summary.publishDate}</p>
                    <p className="leading-6"><span className="font-semibold">Citation:</span> {request.summary.citation}</p>
                  </div>
                </div>
              </div>

              <div className={infoCard}>
                <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Nomination & Business Justification</div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 text-sm text-slate-700">
                  <div className="space-y-1.5">
                    <p><span className="font-semibold">Source:</span> <span className="capitalize">{request.nomination.nominationSource.replace("_", " ")}</span></p>
                    <p><span className="font-semibold">Nominator:</span> {request.nomination.nominatorName}</p>
                    <p><span className="font-semibold">Linked Values:</span> {request.nomination.linkedValues.join(", ") || "—"}</p>
                    <p><span className="font-semibold">Competencies:</span> {request.nomination.competencies.join(", ") || "—"}</p>
                    {request.nomination.projectReference && <p><span className="font-semibold">Project:</span> {request.nomination.projectReference}</p>}
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Business Justification</p>
                    <p className="leading-6">{request.nomination.businessJustification}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className={infoCard}>
                <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Reward Details</div>
                <div className="space-y-1.5 text-sm text-slate-700">
                  <p><span className="font-semibold">Reward Kind:</span> {request.reward.rewardKind}</p>
                  <p><span className="font-semibold">Value:</span> {request.reward.currency} {request.reward.rewardValue.toLocaleString()}</p>
                  <p><span className="font-semibold">Taxable:</span> {request.reward.taxable ? "Yes" : "No"}</p>
                  <p><span className="font-semibold">Finance Settlement:</span> {request.reward.financeSettlementRequired ? "Required" : "Not required"}</p>
                  <p><span className="font-semibold">Fulfillment:</span> <span className="capitalize">{request.reward.fulfillmentStatus.replace("_", " ")}</span></p>
                </div>
              </div>

              <div className={infoCard}>
                <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Performance Evidence</div>
                <div className="space-y-2 text-sm text-slate-700">
                  <p><span className="font-semibold">Rating:</span> {request.performance.rating.toFixed(1)} / 5</p>
                  <div>
                    <p className="font-semibold">KPIs</p>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5">
                      {request.performance.kpis.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Achievements</p>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5">
                      {request.performance.achievements.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </div>
                  <p><span className="font-semibold">Summary:</span> {request.performance.appraisalSummary}</p>
                </div>
              </div>

              <div className="xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className={infoCard}>
                  <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Attachments</div>
                  {request.attachments.length === 0 ? (
                    <p className="text-sm text-slate-500">No attachments uploaded.</p>
                  ) : (
                    <div className="space-y-2">
                      {request.attachments.map((attachment) => (
                        <div key={attachment.id} className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-sm font-medium text-slate-800">{attachment.name}</p>
                          <p className="text-xs text-slate-500">{attachment.fileType.toUpperCase()} • {attachment.uploadedBy} • {attachment.uploadedAt}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={infoCard}>
                  <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Notifications</div>
                  {request.notifications.length === 0 ? (
                    <p className="text-sm text-slate-500">No notifications recorded.</p>
                  ) : (
                    <div className="space-y-2">
                      {request.notifications.map((notification) => (
                        <div key={notification.id} className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-sm text-slate-800">{notification.message}</p>
                          <p className="text-xs text-slate-500 mt-1">To: {notification.target} • {notification.sentAt}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <>
              <div className={infoCard}>
                <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Approval Workflow</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  {workflowSteps.map(({ label, step: workflowStep }) => {
                    return (
                      <div key={label} className="rounded-lg border border-slate-200 bg-white p-3">
                        <p className="font-semibold text-slate-800">{label}</p>
                        <p className="text-slate-600 capitalize">{workflowStep.status.replace("_", " ")}</p>
                        {workflowStep.approverName && <p className="text-xs text-slate-500">By {workflowStep.approverName}</p>}
                        {workflowStep.actedAt && <p className="text-xs text-slate-500">On {workflowStep.actedAt}</p>}
                        {workflowStep.remark && <p className="text-xs text-slate-600 mt-1">{workflowStep.remark}</p>}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className={infoCard}>
                <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Audit Trail</div>
                <div className="space-y-2">
                  {request.auditTrail.map((entry) => (
                    <div key={entry.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-sm font-semibold text-slate-800">{entry.action}</p>
                      <p className="text-xs text-slate-500">{entry.actorName} ({entry.actorRole}) • {entry.date}</p>
                      {entry.remark && <p className="text-sm text-slate-700 mt-1">{entry.remark}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <div className={infoCard}>
              <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Comments / Remarks</div>
              <div className="space-y-2 mb-3">
                {request.comments.length === 0 ? (
                  <p className="text-sm text-slate-500">No comments yet.</p>
                ) : (
                  request.comments.map((comment) => (
                    <div key={comment.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-sm text-slate-800">{comment.text}</p>
                      <p className="text-xs text-slate-500 mt-1">{comment.authorName} ({comment.authorRole}) • {comment.createdAt}</p>
                      {comment.internal && <p className="text-[11px] text-orange-600 mt-1">Internal note</p>}
                    </div>
                  ))
                )}
              </div>
              <div className="space-y-2">
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"
                  placeholder="Add remarks or context..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="flex items-center justify-between gap-3">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={internal} onChange={(e) => setInternal(e.target.checked)} className="accent-indigo-600" />
                    Internal comment
                  </label>
                  <button
                    onClick={() => {
                      if (!commentText.trim()) return
                      onAddComment(request.id, commentText, internal)
                      setCommentText("")
                      setInternal(false)
                    }}
                    className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-200">
            <div className="pt-3 text-xs text-slate-500">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
            </div>

            <div className="pt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                disabled={currentStep === steps.length - 1}
                className="inline-flex items-center gap-1 rounded-lg border border-fuchsia-200 bg-fuchsia-50 px-4 py-2 text-sm font-semibold text-fuchsia-700 hover:bg-fuchsia-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
