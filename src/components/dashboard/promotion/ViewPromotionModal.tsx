"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { PROMOTION_STATUS_BADGE, PROMOTION_STATUS_LABELS } from "@/constants/promotion"
import { PromotionRequest } from "@/types/promotion.types"

interface ViewPromotionModalProps {
  isOpen: boolean
  onClose: () => void
  request: PromotionRequest | null
  onAddComment: (requestId: string, text: string) => void
}

export function ViewPromotionModal({ isOpen, onClose, request, onAddComment }: ViewPromotionModalProps) {
  const [commentText, setCommentText] = useState("")

  if (!isOpen || !request) return null

  const infoCard = "rounded-xl border border-slate-200 bg-slate-50 p-4"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-slate-200 shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center">{request.employee.avatar}</div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{request.employee.name}</h3>
              <p className="text-xs text-slate-500">{request.employee.id} • {request.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${PROMOTION_STATUS_BADGE[request.status]}`}>
              {PROMOTION_STATUS_LABELS[request.status]}
            </span>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full border border-slate-200 bg-slate-100 text-slate-700 capitalize">
              {request.proposedPromotion.promotionType}
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className={infoCard}>
              <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Employee Details</div>
              <div className="space-y-1.5 text-sm text-slate-700">
                <p><span className="font-semibold">Name:</span> {request.employee.name}</p>
                <p><span className="font-semibold">ID:</span> {request.employee.id}</p>
                <p><span className="font-semibold">Department:</span> {request.employee.department}</p>
                <p><span className="font-semibold">Joining Date:</span> {request.employee.joiningDate}</p>
              </div>
            </div>

            <div className={infoCard}>
              <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Current Role Information</div>
              <div className="space-y-1.5 text-sm text-slate-700">
                <p><span className="font-semibold">Designation:</span> {request.currentRole.designation}</p>
                <p><span className="font-semibold">Salary:</span> ₹{request.currentRole.salary.toLocaleString()}</p>
                <p><span className="font-semibold">Reporting Manager:</span> {request.currentRole.reportingManager}</p>
                <div>
                  <p className="font-semibold">Responsibilities:</p>
                  <ul className="list-disc ml-5 mt-1 space-y-0.5">
                    {request.currentRole.responsibilities.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className={infoCard}>
              <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Proposed Promotion Details</div>
              <div className="space-y-1.5 text-sm text-slate-700">
                <p><span className="font-semibold">New Designation:</span> {request.proposedPromotion.designation}</p>
                <p><span className="font-semibold">Department:</span> {request.proposedPromotion.department}</p>
                <p><span className="font-semibold">New Reporting Manager:</span> {request.proposedPromotion.reportingManager}</p>
                <p><span className="font-semibold">Effective Date:</span> {request.proposedPromotion.effectiveDate}</p>
              </div>
            </div>

            <div className={infoCard}>
              <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Effective Timeline</div>
              <div className="space-y-1.5 text-sm text-slate-700">
                <p><span className="font-semibold">Promotion Start Date:</span> {request.timeline.promotionStartDate}</p>
                <p><span className="font-semibold">Probation:</span> {request.timeline.probationMonths} months</p>
              </div>
            </div>
          </div>

          <div className={infoCard}>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Salary Revision</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              <div>
                <p><span className="font-semibold">Salary:</span> ₹{request.salaryRevision.oldSalary.toLocaleString()} → ₹{request.salaryRevision.newSalary.toLocaleString()}</p>
                <p><span className="font-semibold">Bonus:</span> ₹{request.salaryRevision.oldBonus.toLocaleString()} → ₹{request.salaryRevision.newBonus.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Allowances</p>
                <ul className="list-disc ml-5 mt-1 space-y-0.5">
                  {request.salaryRevision.allowanceChanges.map((item, idx) => (
                    <li key={idx}>{item.label}: {item.oldValue} → {item.newValue}</li>
                  ))}
                </ul>
                <p className="font-semibold mt-2">Benefits</p>
                <ul className="list-disc ml-5 mt-1 space-y-0.5">
                  {request.salaryRevision.benefitChanges.map((item, idx) => (
                    <li key={idx}>{item.label}: {item.oldValue} → {item.newValue}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={infoCard}>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Reason for Promotion</div>
            <p className="text-sm text-slate-700 leading-6">{request.reasonForPromotion}</p>
          </div>

          <div className={infoCard}>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Performance Summary</div>
            <div className="text-sm text-slate-700 space-y-2">
              <p><span className="font-semibold">Rating:</span> {request.performanceSummary.rating.toFixed(1)} / 5</p>
              <div>
                <p className="font-semibold">KPIs</p>
                <ul className="list-disc ml-5 mt-1 space-y-0.5">{request.performanceSummary.kpis.map((kpi, idx) => <li key={idx}>{kpi}</li>)}</ul>
              </div>
              <div>
                <p className="font-semibold">Achievements</p>
                <ul className="list-disc ml-5 mt-1 space-y-0.5">{request.performanceSummary.achievements.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
              </div>
              <p><span className="font-semibold">Appraisal History:</span> {request.performanceSummary.appraisalHistory}</p>
            </div>
          </div>

          <div className={infoCard}>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Approval Workflow</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="font-semibold text-slate-800">Manager Approval</p>
                <p className="text-slate-600 capitalize">{request.approvalWorkflow.manager.status.replace("_", " ")}</p>
                {request.approvalWorkflow.manager.approverName && <p className="text-xs text-slate-500">By {request.approvalWorkflow.manager.approverName}</p>}
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="font-semibold text-slate-800">HR Approval</p>
                <p className="text-slate-600 capitalize">{request.approvalWorkflow.hr.status.replace("_", " ")}</p>
                {request.approvalWorkflow.hr.approverName && <p className="text-xs text-slate-500">By {request.approvalWorkflow.hr.approverName}</p>}
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="font-semibold text-slate-800">Higher Authority</p>
                <p className="text-slate-600 capitalize">{request.approvalWorkflow.higherAuthority.status.replace("_", " ")}</p>
                {request.approvalWorkflow.higherAuthority.approverName && <p className="text-xs text-slate-500">By {request.approvalWorkflow.higherAuthority.approverName}</p>}
              </div>
            </div>
          </div>

          <div className={infoCard}>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Document Attachments</div>
            {request.attachments.length === 0 ? (
              <p className="text-sm text-slate-500">No attachments uploaded.</p>
            ) : (
              <ul className="space-y-1.5 text-sm text-slate-700">
                {request.attachments.map((att) => (
                  <li key={att.id} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <span className="font-medium">{att.name}</span>
                    <span className="text-xs text-slate-500"> • by {att.uploadedBy} on {att.uploadedAt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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

            <div className={infoCard}>
              <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Notifications</div>
              {request.notifications.length === 0 ? (
                <p className="text-sm text-slate-500">No notifications dispatched yet.</p>
              ) : (
                <div className="space-y-2">
                  {request.notifications.map((note) => (
                    <div key={note.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-sm text-slate-800">{note.message}</p>
                      <p className="text-xs text-slate-500 mt-1">To: {note.target} • {note.sentAt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <textarea
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"
                placeholder="Add manager/HR remarks..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                onClick={() => {
                  if (!commentText.trim()) return
                  onAddComment(request.id, commentText)
                  setCommentText("")
                }}
                className="self-end px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
