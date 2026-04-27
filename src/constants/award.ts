import { AwardRequest, AwardRole, AwardStatus } from "@/types/award.types"

export const AWARD_STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "pending_manager", label: "Pending Manager" },
  { value: "pending_hr", label: "Pending HR" },
  { value: "pending_finance", label: "Pending Finance" },
  { value: "approved", label: "Approved" },
  { value: "published", label: "Published" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "rejected", label: "Rejected" },
  { value: "returned", label: "Returned" },
  { value: "cancelled", label: "Cancelled" },
] as const

export const AWARD_ROLE_OPTIONS: Array<{ value: AwardRole; label: string }> = [
  { value: "employee", label: "Employee" },
  { value: "manager", label: "Manager" },
  { value: "hr", label: "HR" },
  { value: "finance", label: "Finance" },
]

export const AWARD_TYPE_OPTIONS = [
  "Performance Excellence",
  "Employee of the Month",
  "Spot Award",
  "Values Award",
  "Innovation Award",
  "Customer Impact Award",
  "Leadership Award",
  "Service Anniversary",
  "Sales Achievement",
  "Learning Excellence",
]

export const AWARD_CATEGORY_OPTIONS = [
  "Monetary",
  "Non-Monetary",
  "Service",
  "Performance",
  "Culture",
  "Leadership",
]

export const AWARD_DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Design",
  "Finance",
  "HR",
  "Marketing",
  "Operations",
  "Sales",
]

export const AWARD_VISIBILITY_OPTIONS = [
  { value: "private", label: "Private" },
  { value: "manager_only", label: "Manager Only" },
  { value: "team", label: "Team" },
  { value: "company_wide", label: "Company Wide" },
] as const

export const AWARD_REWARD_KIND_OPTIONS = [
  { value: "cash", label: "Cash" },
  { value: "voucher", label: "Voucher" },
  { value: "points", label: "Points" },
  { value: "gift", label: "Gift" },
  { value: "certificate", label: "Certificate" },
] as const

export const AWARD_NOMINATION_SOURCE_OPTIONS = [
  { value: "manager", label: "Manager" },
  { value: "peer", label: "Peer" },
  { value: "self", label: "Self" },
  { value: "hr", label: "HR" },
  { value: "system_triggered", label: "System Triggered" },
] as const

export const AWARD_PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export const AWARD_STATUS_LABELS: Record<AwardStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under Review",
  pending_manager: "Pending Manager",
  pending_hr: "Pending HR",
  pending_finance: "Pending Finance",
  approved: "Approved",
  published: "Published",
  fulfilled: "Fulfilled",
  rejected: "Rejected",
  returned: "Returned",
  cancelled: "Cancelled",
}

export const AWARD_STATUS_BADGE: Record<AwardStatus, string> = {
  draft: "text-slate-700 bg-slate-100 border-slate-200",
  submitted: "text-blue-700 bg-blue-100 border-blue-200",
  under_review: "text-indigo-700 bg-indigo-100 border-indigo-200",
  pending_manager: "text-amber-700 bg-amber-100 border-amber-200",
  pending_hr: "text-violet-700 bg-violet-100 border-violet-200",
  pending_finance: "text-cyan-700 bg-cyan-100 border-cyan-200",
  approved: "text-green-700 bg-green-100 border-green-200",
  published: "text-fuchsia-700 bg-fuchsia-100 border-fuchsia-200",
  fulfilled: "text-emerald-700 bg-emerald-100 border-emerald-200",
  rejected: "text-red-700 bg-red-100 border-red-200",
  returned: "text-orange-700 bg-orange-100 border-orange-200",
  cancelled: "text-slate-700 bg-slate-100 border-slate-200",
}

export function getAllowedAwardActions(request: AwardRequest, role: AwardRole) {
  if (role === "employee") {
    if (request.status === "draft" || request.status === "returned") return ["submit", "cancel"] as const
    return []
  }

  if (role === "manager") {
    if (request.status === "submitted" || request.status === "pending_manager") return ["approve", "reject", "return"] as const
    return []
  }

  if (role === "hr") {
    if (request.status === "under_review" || request.status === "pending_hr") return ["approve", "reject", "return", "publish"] as const
    if (request.status === "approved") return ["publish"] as const
    return []
  }

  if (role === "finance") {
    if (request.status === "pending_finance") return ["approve", "reject", "fulfill"] as const
    if (request.status === "published" || request.status === "approved") return ["fulfill"] as const
    return []
  }

  return []
}

export const AWARD_DATA: AwardRequest[] = [
  {
    id: "AWD-1001",
    status: "pending_hr",
    employee: {
      employeeId: "1",
      employeeCode: "EMP-2401",
      employeeName: "Aarav Sharma",
      avatar: "AS",
      department: "Engineering",
      designation: "Senior Frontend Developer",
      manager: "Nisha Verma",
      location: "Bangalore",
      joiningDate: "2021-07-12",
    },
    summary: {
      awardType: "Performance Excellence",
      category: "Performance",
      awardTitle: "Delivery Excellence Award",
      citation: "For driving critical payroll release with exceptional ownership and quality.",
      achievementDate: "2026-03-20",
      awardPeriod: "Q1 2026",
      visibility: "company_wide",
      publishDate: "2026-04-30",
    },
    nomination: {
      nominationSource: "manager",
      nominatorName: "Nisha Verma",
      nominatorRole: "manager",
      businessJustification: "Exceeded delivery KPIs and mentored the frontend pod during a critical launch.",
      linkedValues: ["Ownership", "Excellence"],
      competencies: ["Leadership", "Execution"],
      projectReference: "Payroll Revamp",
    },
    reward: {
      rewardKind: "cash",
      currency: "INR",
      rewardValue: 50000,
      oldBonusEquivalent: 15000,
      newBonusEquivalent: 50000,
      taxable: true,
      financeSettlementRequired: true,
      fulfillmentStatus: "in_progress",
      allowancesImpact: [{ label: "Recognition Points", oldValue: 2000, newValue: 5000 }],
      benefitsImpact: [{ label: "Gift Hamper", oldValue: "Standard", newValue: "Premium" }],
    },
    performance: {
      rating: 4.8,
      kpis: ["95% sprint commitment accuracy", "0 critical defects in release"],
      achievements: ["Led cross-team release planning", "Improved frontend performance by 18%"],
      appraisalSummary: "Top performer in latest cycle with consistent delivery excellence.",
    },
    workflow: {
      manager: { status: "approved", approverName: "Nisha Verma", actedAt: "2026-04-02", remark: "Strong business case." },
      hr: { status: "pending" },
      finance: { status: "pending" },
    },
    attachments: [
      { id: "att-1", name: "Client_Feedback.pdf", fileType: "pdf", uploadedBy: "Nisha Verma", uploadedAt: "2026-04-01" },
      { id: "att-2", name: "Appraisal_Snapshot.pdf", fileType: "pdf", uploadedBy: "HR Admin", uploadedAt: "2026-04-02" },
    ],
    comments: [
      { id: "com-1", authorRole: "manager", authorName: "Nisha Verma", text: "Recommend company-wide announcement.", internal: true, createdAt: "2026-04-02" },
    ],
    auditTrail: [
      { id: "aud-1", action: "Nomination submitted", actorRole: "manager", actorName: "Nisha Verma", date: "2026-04-01" },
      { id: "aud-2", action: "Manager approved", actorRole: "manager", actorName: "Nisha Verma", date: "2026-04-02" },
    ],
    notifications: [
      { id: "not-1", target: "hr", message: "Award request AWD-1001 is pending HR review.", sentAt: "2026-04-02" },
    ],
  },
  {
    id: "AWD-1002",
    status: "published",
    employee: {
      employeeId: "2",
      employeeCode: "EMP-1752",
      employeeName: "Rohan Dutta",
      avatar: "RD",
      department: "Design",
      designation: "Senior UI/UX Designer",
      manager: "Sonal Khanna",
      location: "Pune",
      joiningDate: "2020-11-02",
    },
    summary: {
      awardType: "Innovation Award",
      category: "Culture",
      awardTitle: "Innovation Spotlight",
      citation: "For reimagining the design review workflow and cutting turnaround time by 30%.",
      achievementDate: "2026-02-18",
      awardPeriod: "Q1 2026",
      visibility: "company_wide",
      publishDate: "2026-03-05",
    },
    nomination: {
      nominationSource: "peer",
      nominatorName: "Priya Menon",
      nominatorRole: "employee",
      businessJustification: "Transformed collaboration between product and design through a repeatable review process.",
      linkedValues: ["Innovation", "Collaboration"],
      competencies: ["Problem Solving", "Influence"],
    },
    reward: {
      rewardKind: "voucher",
      currency: "INR",
      rewardValue: 15000,
      oldBonusEquivalent: 0,
      newBonusEquivalent: 15000,
      taxable: false,
      financeSettlementRequired: false,
      fulfillmentStatus: "completed",
      allowancesImpact: [],
      benefitsImpact: [{ label: "Gift Voucher", oldValue: "None", newValue: "₹15,000" }],
    },
    performance: {
      rating: 4.5,
      kpis: ["Design turnaround -30%", "Stakeholder satisfaction 4.7/5"],
      achievements: ["Introduced reusable design critique template"],
      appraisalSummary: "Strong innovator and collaborator.",
    },
    workflow: {
      manager: { status: "approved", approverName: "Sonal Khanna", actedAt: "2026-02-25" },
      hr: { status: "approved", approverName: "HR Admin", actedAt: "2026-02-28" },
      finance: { status: "not_required" },
    },
    attachments: [{ id: "att-3", name: "Recommendation.docx", fileType: "docx", uploadedBy: "Priya Menon", uploadedAt: "2026-02-20" }],
    comments: [],
    auditTrail: [
      { id: "aud-3", action: "Award published", actorRole: "hr", actorName: "HR Admin", date: "2026-03-05" },
    ],
    notifications: [
      { id: "not-2", target: "employee", message: "Congratulations! Your award has been published company-wide.", sentAt: "2026-03-05" },
    ],
  },
  {
    id: "AWD-1003",
    status: "draft",
    employee: {
      employeeId: "3",
      employeeCode: "EMP-1883",
      employeeName: "Priya Menon",
      avatar: "PM",
      department: "Finance",
      designation: "Senior Analyst",
      manager: "Karan Arora",
      location: "Mumbai",
      joiningDate: "2022-01-19",
    },
    summary: {
      awardType: "Service Anniversary",
      category: "Service",
      awardTitle: "5 Year Service Milestone",
      citation: "Recognition for long-term commitment and consistent contribution.",
      achievementDate: "2026-06-01",
      awardPeriod: "2026",
      visibility: "team",
      publishDate: "2026-06-05",
    },
    nomination: {
      nominationSource: "system_triggered",
      nominatorName: "HR System",
      nominatorRole: "hr",
      businessJustification: "Automated milestone nomination based on tenure policy.",
      linkedValues: ["Commitment"],
      competencies: ["Consistency"],
    },
    reward: {
      rewardKind: "certificate",
      currency: "INR",
      rewardValue: 0,
      oldBonusEquivalent: 0,
      newBonusEquivalent: 0,
      taxable: false,
      financeSettlementRequired: false,
      fulfillmentStatus: "not_started",
      allowancesImpact: [],
      benefitsImpact: [{ label: "Service Certificate", oldValue: "None", newValue: "Issued" }],
    },
    performance: {
      rating: 4.1,
      kpis: ["Process accuracy 99%"],
      achievements: ["Improved monthly reporting cadence"],
      appraisalSummary: "Reliable and consistent contributor over time.",
    },
    workflow: {
      manager: { status: "pending" },
      hr: { status: "not_required" },
      finance: { status: "not_required" },
    },
    attachments: [],
    comments: [],
    auditTrail: [{ id: "aud-4", action: "Draft created", actorRole: "hr", actorName: "HR System", date: "2026-04-20" }],
    notifications: [],
  },
]
