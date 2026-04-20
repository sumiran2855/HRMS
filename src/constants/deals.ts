import type { Deal, DealStageConfig, DealStatCardConfig, DealPipelineCardConfig } from "@/types/deals.types"

export const DEALS_DATA: Deal[] = [
  { id: 1, dealName: "Enterprise Software License", companyName: "Tech Solutions Inc.", contactPerson: "John Smith", email: "john.smith@company.com", phone: "+1 234-567-8901", value: 250000, stage: "proposal", probability: 75, expectedCloseDate: "2024-04-15", assignedTo: "Alex Johnson", location: "New York, USA", products: ["Software License", "Support Package"], source: "Website" },
  { id: 2, dealName: "Marketing Automation Platform", companyName: "Digital Marketing Co.", contactPerson: "Sarah Williams", email: "sarah.williams@business.com", phone: "+1 234-567-8902", value: 120000, stage: "negotiation", probability: 90, expectedCloseDate: "2024-04-10", assignedTo: "Emma Davis", location: "Los Angeles, USA", products: ["Marketing Platform", "Training"], source: "LinkedIn" },
  { id: 3, dealName: "Cloud Infrastructure Setup", companyName: "StartupHub", contactPerson: "Michael Brown", email: "michael.brown@startup.io", phone: "+1 234-567-8903", value: 180000, stage: "qualified", probability: 60, expectedCloseDate: "2024-05-01", assignedTo: "Chris Wilson", location: "San Francisco, USA", products: ["Cloud Services", "Migration Support"], source: "Referral" },
  { id: 4, dealName: "ERP System Implementation", companyName: "Enterprise Solutions", contactPerson: "Emily Davis", email: "emily.davis@enterprise.com", phone: "+1 234-567-8904", value: 450000, stage: "discovery", probability: 25, expectedCloseDate: "2024-06-15", assignedTo: "Alex Johnson", location: "Chicago, USA", products: ["ERP System", "Customization"], source: "Cold Email" },
  { id: 5, dealName: "Cybersecurity Package", companyName: "TechCorp International", contactPerson: "David Martinez", email: "david.martinez@techcorp.com", phone: "+1 234-567-8905", value: 95000, stage: "closed-won", probability: 100, expectedCloseDate: "2024-03-20", assignedTo: "Emma Davis", location: "Houston, USA", products: ["Security Suite", "Monitoring"], source: "Conference" },
  { id: 6, dealName: "Data Analytics Platform", companyName: "Retail Giants", contactPerson: "Lisa Anderson", email: "lisa.anderson@retail.com", phone: "+1 234-567-8906", value: 200000, stage: "proposal", probability: 80, expectedCloseDate: "2024-04-20", assignedTo: "Chris Wilson", location: "Miami, USA", products: ["Analytics Platform", "BI Tools"], source: "Website" },
  { id: 7, dealName: "Mobile App Development", companyName: "Finance Hub", contactPerson: "Robert Taylor", email: "robert.taylor@finance.com", phone: "+1 234-567-8907", value: 150000, stage: "qualified", probability: 55, expectedCloseDate: "2024-05-15", assignedTo: "Alex Johnson", location: "Boston, USA", products: ["App Development", "Maintenance"], source: "Referral" },
  { id: 8, dealName: "Healthcare Management System", companyName: "Healthcare Plus", contactPerson: "Jennifer White", email: "jennifer.white@healthcare.com", phone: "+1 234-567-8908", value: 320000, stage: "negotiation", probability: 85, expectedCloseDate: "2024-04-05", assignedTo: "Emma Davis", location: "Seattle, USA", products: ["HMS Software", "Training"], source: "LinkedIn" },
  { id: 9, dealName: "Supply Chain Solution", companyName: "Manufacturing Pro", contactPerson: "James Thompson", email: "james.thompson@manufacturing.com", phone: "+1 234-567-8909", value: 280000, stage: "discovery", probability: 30, expectedCloseDate: "2024-06-30", assignedTo: "Chris Wilson", location: "Dallas, USA", products: ["SCM Software", "Integration"], source: "Cold Email" },
  { id: 10, dealName: "E-commerce Platform", companyName: "Consulting Group", contactPerson: "Maria Garcia", email: "maria.garcia@consulting.com", phone: "+1 234-567-8910", value: 175000, stage: "proposal", probability: 70, expectedCloseDate: "2024-04-25", assignedTo: "Alex Johnson", location: "Phoenix, USA", products: ["E-commerce Platform", "Payment Gateway"], source: "Conference" },
  { id: 11, dealName: "Real Estate CRM", companyName: "Real Estate Ventures", contactPerson: "William Jones", email: "william.jones@realestate.com", phone: "+1 234-567-8911", value: 125000, stage: "closed-lost", probability: 0, expectedCloseDate: "2024-03-15", assignedTo: "Emma Davis", location: "Denver, USA", products: ["CRM Software", "Mobile App"], source: "Website" },
  { id: 12, dealName: "Legal Practice Management", companyName: "Legal Services", contactPerson: "Patricia Miller", email: "patricia.miller@legal.com", phone: "+1 234-567-8912", value: 95000, stage: "qualified", probability: 65, expectedCloseDate: "2024-05-10", assignedTo: "Chris Wilson", location: "Atlanta, USA", products: ["Practice Management", "Document Management"], source: "Referral" },
]

export const STAGE_CONFIG: Record<string, DealStageConfig> = {
  discovery:    { label: "Discovery",    pill: "bg-slate-50 text-slate-700 border border-slate-100" },
  qualified:    { label: "Qualified",    pill: "bg-blue-50 text-blue-700 border border-blue-100" },
  proposal:     { label: "Proposal",     pill: "bg-violet-50 text-violet-700 border border-violet-100" },
  negotiation:  { label: "Negotiation",  pill: "bg-orange-50 text-orange-700 border border-orange-100" },
  "closed-won": { label: "Won",          pill: "bg-emerald-50 text-emerald-700 border border-emerald-100" },
  "closed-lost":{ label: "Lost",         pill: "bg-red-50 text-red-700 border border-red-100" },
}

export const DEAL_STAT_CARDS: DealStatCardConfig[] = [
  { key: "total", label: "Total Deals", subtitle: "Active pipeline", gradient: "from-blue-50 to-indigo-50", borderColor: "border-blue-200", textColor: "text-blue-600", valueColor: "text-blue-900", icon: "Handshake", iconBg: "bg-blue-100", format: "count" },
  { key: "closedWon", label: "Closed Won", subtitle: "Successfully closed", gradient: "from-green-50 to-emerald-50", borderColor: "border-green-200", textColor: "text-green-600", valueColor: "text-green-900", icon: "DollarSign", iconBg: "bg-green-100", format: "count" },
  { key: "totalValue", label: "Total Value", subtitle: "Pipeline value", gradient: "from-purple-50 to-violet-50", borderColor: "border-purple-200", textColor: "text-purple-600", valueColor: "text-purple-900", icon: "DollarSign", iconBg: "bg-purple-100", format: "currency" },
  { key: "weightedValue", label: "Weighted Value", subtitle: "Expected revenue", gradient: "from-orange-50 to-amber-50", borderColor: "border-orange-200", textColor: "text-orange-600", valueColor: "text-orange-900", icon: "TrendingUp", iconBg: "bg-orange-100", format: "currency" },
]

export const DEAL_PIPELINE_CARDS: DealPipelineCardConfig[] = [
  { key: "discovery", label: "Discovery", gradient: "from-gray-50 to-slate-50", borderColor: "border-gray-200", textColor: "text-gray-600", valueColor: "text-gray-900" },
  { key: "qualified", label: "Qualified", gradient: "from-blue-50 to-indigo-50", borderColor: "border-blue-200", textColor: "text-blue-600", valueColor: "text-blue-900" },
  { key: "proposal", label: "Proposal", gradient: "from-purple-50 to-violet-50", borderColor: "border-purple-200", textColor: "text-purple-600", valueColor: "text-purple-900" },
  { key: "negotiation", label: "Negotiation", gradient: "from-orange-50 to-amber-50", borderColor: "border-orange-200", textColor: "text-orange-600", valueColor: "text-orange-900" },
  { key: "closedWon", label: "Won", gradient: "from-green-50 to-emerald-50", borderColor: "border-green-200", textColor: "text-green-600", valueColor: "text-green-900" },
  { key: "closedLost", label: "Lost", gradient: "from-red-50 to-rose-50", borderColor: "border-red-200", textColor: "text-red-600", valueColor: "text-red-900" },
]

export const SOURCE_OPTIONS = ["All Sources", "Website", "LinkedIn", "Referral", "Cold Email", "Conference"]

export const ENTRIES_OPTIONS = [10, 25, 50, 100]

export const TABLE_HEADERS = [
  { label: "Deal", align: "text-left", width: "w-48", hidden: "" },
  { label: "Company", align: "text-left", width: "w-40", hidden: "hidden sm:table-cell" },
  { label: "Contact", align: "text-left", width: "w-48", hidden: "hidden md:table-cell" },
  { label: "Stage", align: "text-center", width: "w-28", hidden: "" },
  { label: "Probability", align: "text-center", width: "w-32", hidden: "hidden lg:table-cell" },
  { label: "Value", align: "text-right", width: "w-28", hidden: "" },
  { label: "Close Date", align: "text-center", width: "w-32", hidden: "hidden xl:table-cell" },
  { label: "Assigned To", align: "text-left", width: "w-32", hidden: "hidden 2xl:table-cell" },
  { label: "Actions", align: "text-center", width: "w-24", hidden: "" },
]
