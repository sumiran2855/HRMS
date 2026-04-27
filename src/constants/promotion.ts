import { PromotionRequest, PromotionRole, PromotionStatus } from "@/types/promotion.types"

export const PROMOTION_STATUS_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "pending_approval", label: "Pending Approval" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

export const PROMOTION_TYPE_OPTIONS = [
  { value: "vertical", label: "Vertical" },
  { value: "lateral", label: "Lateral" },
  { value: "temporary", label: "Temporary / Acting" },
] as const

export const PROMOTION_ROLE_OPTIONS: Array<{ value: PromotionRole; label: string }> = [
  { value: "employee", label: "Employee" },
  { value: "manager", label: "Manager" },
  { value: "hr", label: "HR" },
  { value: "higher_authority", label: "Higher Authority" },
]

export const PROMOTION_DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Design",
  "Finance",
  "HR",
  "Marketing",
  "Operations",
]

export const PROMOTION_PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export const PROMOTION_STATUS_BADGE: Record<PromotionStatus, string> = {
  draft: "text-slate-700 bg-slate-100 border-slate-200",
  pending_approval: "text-yellow-700 bg-yellow-100 border-yellow-200",
  approved: "text-green-700 bg-green-100 border-green-200",
  rejected: "text-red-700 bg-red-100 border-red-200",
}

export const PROMOTION_STATUS_LABELS: Record<PromotionStatus, string> = {
  draft: "Draft",
  pending_approval: "Pending Approval",
  approved: "Approved",
  rejected: "Rejected",
}

export function getAllowedPromotionActions(request: PromotionRequest, role: PromotionRole) {
  if (role === "employee") {
    return request.status === "draft" ? ["submit"] as const : []
  }

  if (role === "manager") {
    return request.status === "pending_approval" && request.approvalWorkflow.manager.status === "pending"
      ? ["approve", "reject"] as const
      : []
  }

  if (role === "hr") {
    return request.status === "pending_approval" && request.approvalWorkflow.manager.status === "approved" && request.approvalWorkflow.hr.status === "pending"
      ? ["approve", "reject"] as const
      : []
  }

  if (role === "higher_authority") {
    return request.status === "pending_approval" && request.requiresHigherAuthority && request.approvalWorkflow.hr.status === "approved" && request.approvalWorkflow.higherAuthority.status === "pending"
      ? ["approve", "reject"] as const
      : []
  }

  return []
}

export const PROMOTION_DATA: PromotionRequest[] = [
  {
    id: "PRO-1001",
    status: "pending_approval",
    employee: {
      id: "EMP-2401",
      name: "Aarav Sharma",
      avatar: "AS",
      department: "Engineering",
      joiningDate: "2021-07-12",
    },
    currentRole: {
      designation: "Frontend Developer",
      responsibilities: ["Lead module delivery", "Code review", "Mentoring juniors"],
      salary: 900000,
      reportingManager: "Nisha Verma",
    },
    proposedPromotion: {
      designation: "Senior Frontend Developer",
      department: "Engineering",
      reportingManager: "Nisha Verma",
      effectiveDate: "2026-05-01",
      promotionType: "vertical",
    },
    salaryRevision: {
      oldSalary: 900000,
      newSalary: 1120000,
      oldBonus: 90000,
      newBonus: 140000,
      allowanceChanges: [{ label: "Mobile Allowance", oldValue: 12000, newValue: 18000 }],
      benefitChanges: [{ label: "Medical Plan", oldValue: "Standard", newValue: "Premium" }],
    },
    reasonForPromotion: "High ownership in strategic releases and team mentorship.",
    performanceSummary: {
      rating: 4.6,
      kpis: ["Sprint predictability 96%", "Bug leakage reduced by 32%"],
      achievements: ["Led Design System v2 migration", "Delivered payroll integration"],
      appraisalHistory: "Exceeds expectations in last two appraisal cycles.",
    },
    approvalWorkflow: {
      manager: { status: "pending" },
      hr: { status: "pending" },
      higherAuthority: { status: "not_required" },
    },
    requiresHigherAuthority: false,
    timeline: {
      promotionStartDate: "2026-05-01",
      probationMonths: 3,
    },
    attachments: [
      { id: "att-1", name: "Q4_Appraisal_Report.pdf", fileType: "pdf", uploadedBy: "Nisha Verma", uploadedAt: "2026-03-15" },
      { id: "att-2", name: "Recommendation_Letter.docx", fileType: "docx", uploadedBy: "Nisha Verma", uploadedAt: "2026-03-15" },
    ],
    auditTrail: [
      { id: "aud-1", action: "Request initiated", actorRole: "employee", actorName: "Aarav Sharma", date: "2026-03-15" },
    ],
    notifications: [
      { id: "not-1", target: "manager", message: "New promotion request pending your approval.", sentAt: "2026-03-15" },
    ],
    comments: [
      { id: "com-1", authorRole: "manager", authorName: "Nisha Verma", text: "Strong candidate for next level scope.", createdAt: "2026-03-16" },
    ],
  },
  {
    id: "PRO-1002",
    status: "approved",
    employee: {
      id: "EMP-1752",
      name: "Rohan Dutta",
      avatar: "RD",
      department: "Design",
      joiningDate: "2020-11-02",
    },
    currentRole: {
      designation: "UI Designer",
      responsibilities: ["Design system maintenance", "Usability testing"],
      salary: 780000,
      reportingManager: "Sonal Khanna",
    },
    proposedPromotion: {
      designation: "Senior UI/UX Designer",
      department: "Design",
      reportingManager: "Sonal Khanna",
      effectiveDate: "2026-04-01",
      promotionType: "vertical",
    },
    salaryRevision: {
      oldSalary: 780000,
      newSalary: 950000,
      oldBonus: 78000,
      newBonus: 115000,
      allowanceChanges: [{ label: "Learning Allowance", oldValue: 15000, newValue: 25000 }],
      benefitChanges: [{ label: "WFH Benefit", oldValue: "Basic", newValue: "Enhanced" }],
    },
    reasonForPromotion: "Impactful contribution to product conversion metrics.",
    performanceSummary: {
      rating: 4.3,
      kpis: ["Design handoff quality +24%", "A/B win rate 61%"],
      achievements: ["Rolled out design audit framework"],
      appraisalHistory: "Consistent high performer for 3 years.",
    },
    approvalWorkflow: {
      manager: { status: "approved", approverName: "Sonal Khanna", actedAt: "2026-02-24", remark: "Approved from performance and leadership angle." },
      hr: { status: "approved", approverName: "HR Admin", actedAt: "2026-02-27", remark: "Budget aligned." },
      higherAuthority: { status: "not_required" },
    },
    requiresHigherAuthority: false,
    timeline: {
      promotionStartDate: "2026-04-01",
      probationMonths: 2,
    },
    attachments: [
      { id: "att-3", name: "UX_Impact_Review.pdf", fileType: "pdf", uploadedBy: "Sonal Khanna", uploadedAt: "2026-02-21" },
    ],
    auditTrail: [
      { id: "aud-2", action: "Request submitted", actorRole: "employee", actorName: "Rohan Dutta", date: "2026-02-20" },
      { id: "aud-3", action: "Manager approved", actorRole: "manager", actorName: "Sonal Khanna", date: "2026-02-24" },
      { id: "aud-4", action: "HR approved", actorRole: "hr", actorName: "HR Admin", date: "2026-02-27" },
    ],
    notifications: [
      { id: "not-2", target: "employee", message: "Your promotion request has been approved.", sentAt: "2026-02-27" },
      { id: "not-3", target: "hr", message: "Update compensation and org chart for PRO-1002.", sentAt: "2026-02-27" },
    ],
    comments: [
      { id: "com-2", authorRole: "hr", authorName: "HR Admin", text: "Promotion letter draft prepared.", createdAt: "2026-02-28" },
    ],
  },
  {
    id: "PRO-1003",
    status: "rejected",
    employee: {
      id: "EMP-1883",
      name: "Priya Menon",
      avatar: "PM",
      department: "Finance",
      joiningDate: "2022-01-19",
    },
    currentRole: {
      designation: "Analyst",
      responsibilities: ["MIS reporting", "Variance analysis"],
      salary: 820000,
      reportingManager: "Karan Arora",
    },
    proposedPromotion: {
      designation: "Senior Analyst",
      department: "Finance",
      reportingManager: "Karan Arora",
      effectiveDate: "2026-04-15",
      promotionType: "vertical",
    },
    salaryRevision: {
      oldSalary: 820000,
      newSalary: 980000,
      oldBonus: 70000,
      newBonus: 105000,
      allowanceChanges: [{ label: "Travel Allowance", oldValue: 10000, newValue: 15000 }],
      benefitChanges: [{ label: "Insurance", oldValue: "Tier 1", newValue: "Tier 2" }],
    },
    reasonForPromotion: "Enhanced reporting quality and turnaround time.",
    performanceSummary: {
      rating: 3.8,
      kpis: ["Close cycle improved by 8%"],
      achievements: ["Automated reporting template"],
      appraisalHistory: "Meets expectations; limited leadership evidence.",
    },
    approvalWorkflow: {
      manager: { status: "rejected", approverName: "Karan Arora", actedAt: "2026-03-10", remark: "Needs stronger cross-functional leadership." },
      hr: { status: "not_required" },
      higherAuthority: { status: "not_required" },
    },
    requiresHigherAuthority: false,
    timeline: {
      promotionStartDate: "2026-04-15",
      probationMonths: 0,
    },
    attachments: [
      { id: "att-4", name: "Finance_Performance_Sheet.xlsx", fileType: "xlsx", uploadedBy: "Karan Arora", uploadedAt: "2026-03-06" },
    ],
    auditTrail: [
      { id: "aud-5", action: "Request submitted", actorRole: "employee", actorName: "Priya Menon", date: "2026-03-05" },
      { id: "aud-6", action: "Manager rejected", actorRole: "manager", actorName: "Karan Arora", date: "2026-03-10", remark: "Needs stronger leadership indicators." },
    ],
    notifications: [
      { id: "not-4", target: "employee", message: "Your promotion request was rejected by manager.", sentAt: "2026-03-10" },
    ],
    comments: [
      { id: "com-3", authorRole: "manager", authorName: "Karan Arora", text: "Reassess in next appraisal cycle.", createdAt: "2026-03-10" },
    ],
  },
  {
    id: "PRO-1004",
    status: "draft",
    employee: {
      id: "EMP-2514",
      name: "Tanvi Sethi",
      avatar: "TS",
      department: "Marketing",
      joiningDate: "2023-05-03",
    },
    currentRole: {
      designation: "Content Specialist",
      responsibilities: ["Campaign copywriting", "Editorial planning"],
      salary: 700000,
      reportingManager: "Ritika Jain",
    },
    proposedPromotion: {
      designation: "Content Lead",
      department: "Marketing",
      reportingManager: "Ritika Jain",
      effectiveDate: "2026-06-01",
      promotionType: "temporary",
    },
    salaryRevision: {
      oldSalary: 700000,
      newSalary: 860000,
      oldBonus: 50000,
      newBonus: 75000,
      allowanceChanges: [{ label: "Internet Allowance", oldValue: 8000, newValue: 12000 }],
      benefitChanges: [{ label: "Leave Travel", oldValue: "Standard", newValue: "Standard Plus" }],
    },
    reasonForPromotion: "Temporary role expansion for product launch quarter.",
    performanceSummary: {
      rating: 4.1,
      kpis: ["Campaign CTR up 22%"],
      achievements: ["Launched editorial framework"],
      appraisalHistory: "Above expectations in latest review.",
    },
    approvalWorkflow: {
      manager: { status: "pending" },
      hr: { status: "pending" },
      higherAuthority: { status: "pending" },
    },
    requiresHigherAuthority: true,
    timeline: {
      promotionStartDate: "2026-06-01",
      probationMonths: 6,
    },
    attachments: [],
    auditTrail: [
      { id: "aud-7", action: "Draft created", actorRole: "employee", actorName: "Tanvi Sethi", date: "2026-04-02" },
    ],
    notifications: [],
    comments: [],
  },
]
