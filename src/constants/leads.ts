import type { Lead, LeadStatusConfig, LeadStatCardConfig } from "@/types/leads.types"

export const LEADS_DATA: Lead[] = [
  { id: 1, name: "Sarah Chen", position: "VP of Sales", company: "Nexus Corp", location: "San Francisco, CA", email: "sarah@nexus.io", phone: "+1 415-555-0101", source: "LinkedIn", status: "qualified", value: 48000, assignedTo: "Alex Kim" },
  { id: 2, name: "Marcus Webb", position: "CTO", company: "Pixel Dynamics", location: "Austin, TX", email: "m.webb@pixel.dev", phone: "+1 512-555-0188", source: "Conference", status: "proposal", value: 91500, assignedTo: "Jamie Lee" },
  { id: 3, name: "Priya Nair", position: "Head of Ops", company: "BlueOcean Ltd", location: "London, UK", email: "p.nair@blueocean.co", phone: "+44 20-5554-0203", source: "Referral", status: "new", value: 22000, assignedTo: "Alex Kim" },
  { id: 4, name: "David Ramos", position: "CEO", company: "Lumen AI", location: "Chicago, IL", email: "dramos@lumen.ai", phone: "+1 312-555-0144", source: "Website", status: "contacted", value: 67000, assignedTo: "Sam Torres" },
  { id: 5, name: "Elena Kovács", position: "Procurement Lead", company: "Argon Systems", location: "Berlin, DE", email: "e.kovacs@argon.de", phone: "+49 30-555-0177", source: "Cold Email", status: "negotiation", value: 115000, assignedTo: "Jamie Lee" },
  { id: 6, name: "Tom Bradley", position: "IT Director", company: "Crestfield Inc", location: "New York, NY", email: "t.bradley@crest.com", phone: "+1 212-555-0166", source: "LinkedIn", status: "qualified", value: 39500, assignedTo: "Sam Torres" },
  { id: 7, name: "Aisha Diallo", position: "CFO", company: "Solaris Group", location: "Dubai, UAE", email: "adiallo@solaris.ae", phone: "+971-4-555-0199", source: "Conference", status: "proposal", value: 84000, assignedTo: "Alex Kim" },
  { id: 8, name: "Oliver Grant", position: "Founder", company: "Quarx Labs", location: "Toronto, CA", email: "ogrant@quarx.io", phone: "+1 416-555-0122", source: "Referral", status: "new", value: 18000, assignedTo: "Jamie Lee" },
  { id: 9, name: "Mei Zhang", position: "Purchasing Mgr", company: "Horizons Co", location: "Singapore, SG", email: "mzhang@horizons.sg", phone: "+65-6555-0133", source: "Website", status: "contacted", value: 55000, assignedTo: "Sam Torres" },
  { id: 10, name: "Rafael Souza", position: "COO", company: "PrimeTech", location: "São Paulo, BR", email: "r.souza@primetech.br", phone: "+55-11-5555-0155", source: "Cold Email", status: "negotiation", value: 132000, assignedTo: "Alex Kim" },
  { id: 11, name: "Nina Petrov", position: "Product Manager", company: "Velox Ltd", location: "Stockholm, SE", email: "nina@velox.se", phone: "+46-8-555-0177", source: "LinkedIn", status: "qualified", value: 44000, assignedTo: "Jamie Lee" },
  { id: 12, name: "Chris Adeyemi", position: "Sales Manager", company: "Brightline AG", location: "Zurich, CH", email: "c.adeyemi@bright.ch", phone: "+41-44-555-0188", source: "Conference", status: "new", value: 29000, assignedTo: "Sam Torres" },
]

export const STATUS_CONFIG: Record<string, LeadStatusConfig> = {
  new: { label: "New", pill: "bg-blue-50 text-blue-700 border border-blue-100" },
  contacted: { label: "Contacted", pill: "bg-emerald-50 text-emerald-700 border border-emerald-100" },
  qualified: { label: "Qualified", pill: "bg-violet-50 text-violet-700 border border-violet-100" },
  proposal: { label: "Proposal", pill: "bg-amber-50 text-amber-700 border border-amber-100" },
  negotiation: { label: "Negotiation", pill: "bg-orange-50 text-orange-700 border border-orange-100" },
}

export const LEAD_STAT_CARDS: LeadStatCardConfig[] = [
  { key: "total", label: "Total Leads", gradient: "from-blue-50 to-indigo-50", borderColor: "border-blue-200", textColor: "text-blue-600", valueColor: "text-blue-900" },
  { key: "new", label: "New", gradient: "from-blue-50 to-indigo-50", borderColor: "border-blue-200", textColor: "text-blue-600", valueColor: "text-blue-900" },
  { key: "contacted", label: "Contacted", gradient: "from-yellow-50 to-amber-50", borderColor: "border-yellow-200", textColor: "text-yellow-600", valueColor: "text-yellow-900" },
  { key: "qualified", label: "Qualified", gradient: "from-green-50 to-emerald-50", borderColor: "border-green-200", textColor: "text-green-600", valueColor: "text-green-900" },
  { key: "proposal", label: "Proposal", gradient: "from-purple-50 to-violet-50", borderColor: "border-purple-200", textColor: "text-purple-600", valueColor: "text-purple-900" },
  { key: "negotiation", label: "Negotiation", gradient: "from-orange-50 to-amber-50", borderColor: "border-orange-200", textColor: "text-orange-600", valueColor: "text-orange-900" },
]

export const SOURCE_OPTIONS = ["All Sources", "Website", "LinkedIn", "Referral", "Cold Email", "Conference"]

export const ENTRIES_OPTIONS = [10, 25, 50, 100]

export const TABLE_HEADERS = [
  { label: "Lead", align: "text-left", width: "w-48", hidden: "" },
  { label: "Company", align: "text-left", width: "w-40", hidden: "hidden sm:table-cell" },
  { label: "Contact", align: "text-left", width: "w-48", hidden: "hidden md:table-cell" },
  { label: "Source", align: "text-left", width: "w-28", hidden: "hidden lg:table-cell" },
  { label: "Status", align: "text-center", width: "w-28", hidden: "" },
  { label: "Value", align: "text-right", width: "w-28", hidden: "" },
  { label: "Assigned To", align: "text-left", width: "w-32", hidden: "hidden xl:table-cell" },
  { label: "Actions", align: "text-center", width: "w-24", hidden: "" },
]
