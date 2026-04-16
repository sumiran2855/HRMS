"use client"

import { X, Globe, Building, Users, MapPin, Mail, Phone, Calendar, TrendingUp, ExternalLink } from "lucide-react"

interface ViewCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  company: any
}

export function ViewCompanyModal({ isOpen, onClose, company }: ViewCompanyModalProps) {
  if (!isOpen || !company) return null

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(amount)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  const getYearsActive = (dateString: string) => {
    const years = new Date().getFullYear() - new Date(dateString).getFullYear()
    return `${years} year${years !== 1 ? "s" : ""}`
  }

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[620px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl">

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-t-2xl pt-7 px-6 pb-6 relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-[34px] h-[34px] rounded-lg border-[1.5px] border-white/15 bg-transparent hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>

          {/* Company identity */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-[14px] bg-white/10 border-[1.5px] border-white/15 flex items-center justify-center shrink-0">
              <Building className="w-[26px] h-[26px] text-white" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white tracking-tight leading-tight">
                {company.name}
              </div>
              <div className="text-[13px] text-white/50 mt-1 flex items-center gap-1.5">
                <Globe className="w-3 h-3" />
                {company.industry}
              </div>
            </div>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full text-[11px] font-semibold uppercase tracking-wide ${company.status === "active" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {company.status === "active" ? "Active" : "Inactive"}
            </span>
            <span className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full bg-white/[0.08] text-white/60 text-[11px] font-medium">
              <Calendar className="w-2.5 h-2.5" />
              Est. {new Date(company.foundedDate).getFullYear()} &nbsp;·&nbsp; {getYearsActive(company.foundedDate)} old
            </span>
            <span className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full bg-white/[0.08] text-white/60 text-[11px] font-medium">
              <Users className="w-2.5 h-2.5" />
              Owner: {company.ownerName}
            </span>
            <span className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full bg-white/[0.08] text-white/60 text-[11px] font-medium">
              <TrendingUp className="w-2.5 h-2.5" />
              Rating: {company.rating} / 5
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">

          {/* Key Metrics */}
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-slate-400 mb-3">Key Metrics</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-700" />
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Employees</span>
                </div>
                <div className="text-[22px] font-extrabold text-slate-900 font-mono tracking-tight leading-none">{company.employees.toLocaleString()}</div>
                <div className="text-[11px] text-slate-400">Total headcount</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-violet-600" />
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Revenue</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight leading-none">{formatCurrency(company.revenue)}</div>
                <div className="text-[11px] text-slate-400">Annual</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-600" />
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Founded</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight leading-none">{new Date(company.foundedDate).getFullYear()}</div>
                <div className="text-[11px] text-slate-400">{getYearsActive(company.foundedDate)} ago</div>
              </div>
            </div>
          </div>

          {/* About */}
          {company.description && (
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-slate-400 mb-3">About</div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[13.5px] leading-relaxed text-slate-500">
                {company.description}
              </div>
            </div>
          )}

          {/* Contact & Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company Info */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-br from-slate-800 to-slate-600 px-4 py-2.5">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-white/75">
                  Company Info
                </span>
              </div>
              <div className="px-4 pt-1 pb-3.5">
                {[
                  { icon: Building,  label: "Name",     value: company.name },
                  { icon: Globe,     label: "Industry", value: company.industry },
                  { icon: Calendar,  label: "Founded",  value: formatDate(company.foundedDate) },
                  { icon: Users,     label: "Owner",    value: company.ownerName },
                ].map(({ icon: Icon, label, value }) => (
                  <div className="flex items-center gap-3 py-[11px] border-b border-slate-100 last:border-b-0 last:pb-0 first:pt-0" key={label}>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <Icon className="w-[13px] h-[13px] text-slate-500" />
                    </div>
                    <div>
                      <div className="text-[10.5px] text-slate-400 font-medium">{label}</div>
                      <div className="text-[13px] text-slate-900 font-medium">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-br from-teal-700 to-teal-500 px-4 py-2.5">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-white/75">
                  Contact Details
                </span>
              </div>
              <div className="px-4 pt-1 pb-3.5">
                {[
                  { icon: Mail,   label: "Email",   value: company.email,   isEmail: true },
                  { icon: Phone,  label: "Phone",   value: company.phone },
                  { icon: MapPin, label: "Address", value: company.address },
                  { icon: Globe,  label: "Website", value: company.website, isLink: true },
                ].map(({ icon: Icon, label, value, isLink, isEmail }: any) => (
                  <div className="flex items-center gap-3 py-[11px] border-b border-slate-100 last:border-b-0 last:pb-0 first:pt-0" key={label}>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <Icon className="w-[13px] h-[13px] text-teal-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10.5px] text-slate-400 font-medium">{label}</div>
                      {isLink ? (
                        <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-teal-700 text-[13px] font-medium no-underline hover:text-teal-500 hover:underline transition-colors">
                          {value} <ExternalLink className="w-[11px] h-[11px]" />
                        </a>
                      ) : isEmail ? (
                        <a href={`mailto:${value}`} className="inline-flex items-center gap-1 text-teal-700 text-[13px] font-medium no-underline hover:text-teal-500 hover:underline transition-colors">
                          {value}
                        </a>
                      ) : (
                        <div className="text-[13px] text-slate-900 font-medium break-words">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3.5 flex justify-end bg-neutral-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-[10px] border-[1.5px] border-slate-200 bg-transparent text-slate-500 text-[13.5px] font-semibold cursor-pointer transition-all hover:bg-slate-50 hover:-translate-y-px"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}