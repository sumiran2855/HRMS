"use client"

import { X, Globe, Building2, Users, MapPin, Mail, Phone, Calendar, DollarSign, FileText, TrendingUp, ExternalLink, Briefcase, UserCheck, Clock, Star, CheckCircle, AlertCircle } from "lucide-react"

interface ViewClientModalProps {
  isOpen: boolean
  onClose: () => void
  client: any
}

export function ViewClientModal({ isOpen, onClose, client }: ViewClientModalProps) {
  if (!isOpen || !client) return null

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(amount)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  const getContractDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    return `${months} months`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '#bbf7d0' }
      case 'completed': return { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '#93c5fd' }
      case 'pending': return { bg: 'rgba(250,204,21,0.15)', color: '#facc15', border: '#fde047' }
      case 'inactive': return { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '#fecaca' }
      default: return { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8', border: '#cbd5e1' }
    }
  }

  const statusColors = getStatusColor(client.status)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .client-modal * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .client-fade {
          animation: clientFadeIn 0.22s ease;
        }
        @keyframes clientFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .client-section-title {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #94a3b8;
          margin-bottom: 12px;
        }

        .client-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .client-info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .client-info-row:first-child { padding-top: 0; }

        .client-icon-box {
          width: 32px; height: 32px; border-radius: 8px;
          background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .client-metric-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .client-metric-label {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .client-metric-value {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          font-family: 'DM Mono', monospace;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .client-metric-sub {
          font-size: 11px;
          color: #94a3b8;
        }

        .client-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
        }

        .client-close-btn {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .client-close-btn:hover { background: #f1f5f9; }

        .client-website-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #0f766e;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.15s;
        }
        .client-website-link:hover { color: #0d9488; text-decoration: underline; }

        .client-service-chip {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 500;
          background: #f1f5f9;
          color: #475569;
          margin-right: 6px;
          margin-bottom: 6px;
        }

        .client-document-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 12px;
          color: #475569;
          margin-bottom: 8px;
          background: #f8fafc;
        }

        @media (max-width: 540px) {
          .client-metrics-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div
        className="client-modal"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15, 23, 42, 0.55)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="client-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 800,
            maxHeight: "92vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Hero Header */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            borderRadius: "16px 16px 0 0",
            padding: "28px 24px 24px",
            position: "relative",
          }}>
            {/* Close */}
            <button
              className="client-close-btn"
              onClick={onClose}
              style={{ position: "absolute", top: 16, right: 16, borderColor: "rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 16, height: 16, color: "rgba(255,255,255,0.7)" }} />
            </button>

            {/* Client identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Building2 style={{ width: 26, height: 26, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  {client.companyName}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Globe style={{ width: 12, height: 12 }} />
                  {client.industry}
                </div>
              </div>
            </div>

            {/* Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span className="client-tag" style={{ background: statusColors.bg, color: statusColors.color, border: `1px solid ${statusColors.border}` }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
                {client.status === 'active' ? 'Active' : client.status === 'completed' ? 'Completed' : client.status === 'pending' ? 'Pending' : 'Inactive'}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <Calendar style={{ width: 10, height: 10 }} />
                {getContractDuration(client.startDate, client.endDate)} contract
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <FileText style={{ width: 10, height: 10 }} />
                ID: {client.id}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <Users style={{ width: 10, height: 10 }} />
                {client.contactPerson}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <TrendingUp style={{ width: 10, height: 10 }} />
                Rating: {client.rating} / 5
              </span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Key Metrics */}
            <div>
              <div className="client-section-title">Key Metrics</div>
              <div
                className="client-metrics-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                <div className="client-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <DollarSign style={{ width: 14, height: 14, color: "#0f766e" }} />
                    <span className="client-metric-label">Contract Value</span>
                  </div>
                  <div className="client-metric-value">{formatCurrency(client.contractValue)}</div>
                  <div className="client-metric-sub">{client.contractType}</div>
                </div>

                <div className="client-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Briefcase style={{ width: 14, height: 14, color: "#7c3aed" }} />
                    <span className="client-metric-label">Active Projects</span>
                  </div>
                  <div className="client-metric-value" style={{ fontSize: 20 }}>{client.projects}</div>
                  <div className="client-metric-sub">Ongoing</div>
                </div>

                <div className="client-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Users style={{ width: 14, height: 14, color: "#ea580c" }} />
                    <span className="client-metric-label">Employees</span>
                  </div>
                  <div className="client-metric-value" style={{ fontSize: 20 }}>{client.employees}</div>
                  <div className="client-metric-sub">Total headcount</div>
                </div>

                <div className="client-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Star style={{ width: 14, height: 14, color: "#f59e0b" }} />
                    <span className="client-metric-label">Client Rating</span>
                  </div>
                  <div className="client-metric-value" style={{ fontSize: 20 }}>{client.rating}</div>
                  <div className="client-metric-sub">Out of 5</div>
                </div>
              </div>
            </div>

            {/* Contract Details */}
            <div>
              <div className="client-section-title">Contract Details</div>
              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "16px 18px",
                fontSize: 13.5,
                lineHeight: 1.7,
                color: "#475569",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Contract Type:</strong> {client.contractType}
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Duration:</strong> {formatDate(client.startDate)} - {formatDate(client.endDate)}
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Payment Terms:</strong> {client.paymentTerms}
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Billing Cycle:</strong> {client.billingCycle}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Info grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}>
              {/* Client Info */}
              <div style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #1e293b, #334155)",
                  padding: "10px 16px",
                }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "rgba(255,255,255,0.75)" }}>
                    Client Information
                  </span>
                </div>
                <div style={{ padding: "4px 16px 14px" }}>
                  {[
                    { icon: FileText,  label: "Client ID",    value: client.id },
                    { icon: Building2, label: "Company",     value: client.companyName },
                    { icon: Globe,     label: "Industry",     value: client.industry },
                    { icon: Users,     label: "Contact",      value: client.contactPerson },
                    { icon: UserCheck, label: "Account Manager", value: client.accountManager },
                  ].map(({ icon: Icon, label, value }) => (
                    <div className="client-info-row" key={label}>
                      <div className="client-icon-box">
                        <Icon style={{ width: 13, height: 13, color: "#475569" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 500 }}>{label}</div>
                        <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 500 }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #0f766e, #0d9488)",
                  padding: "10px 16px",
                }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "rgba(255,255,255,0.75)" }}>
                    Contact Details
                  </span>
                </div>
                <div style={{ padding: "4px 16px 14px" }}>
                  {[
                    { icon: Mail,  label: "Email",   value: client.email,   isEmail: true },
                    { icon: Phone, label: "Phone",   value: client.phone },
                    { icon: MapPin, label: "Address", value: client.address },
                    { icon: Globe,  label: "Website", value: client.website, isLink: true },
                  ].map(({ icon: Icon, label, value, isLink, isEmail }: any) => (
                    <div className="client-info-row" key={label}>
                      <div className="client-icon-box">
                        <Icon style={{ width: 13, height: 13, color: "#0f766e" }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 500 }}>{label}</div>
                        {isLink ? (
                          <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="client-website-link">
                            {value} <ExternalLink style={{ width: 11, height: 11 }} />
                          </a>
                        ) : isEmail ? (
                          <a href={`mailto:${value}`} className="client-website-link">
                            {value}
                          </a>
                        ) : (
                          <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 500, wordBreak: "break-word" }}>{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            {client.services && client.services.length > 0 && (
              <div>
                <div className="client-section-title">Services</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {client.services.map((service: string, index: number) => (
                    <div key={index} className="client-service-chip">
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {client.notes && (
              <div>
                <div className="client-section-title">Notes</div>
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "16px 18px",
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: "#475569",
                }}>
                  {client.notes}
                </div>
              </div>
            )}

            {/* Documents */}
            {client.documents && client.documents.length > 0 && (
              <div>
                <div className="client-section-title">Documents</div>
                <div>
                  {client.documents.map((doc: string, index: number) => (
                    <div key={index} className="client-document-item">
                      <FileText style={{ width: 14, height: 14, color: "#3b82f6" }} />
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            borderTop: "1px solid #e2e8f0",
            padding: "14px 24px",
            display: "flex",
            justifyContent: "flex-end",
            background: "#fafafa",
            borderRadius: "0 0 16px 16px",
          }}>
            <button
              onClick={onClose}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "9px 20px",
                borderRadius: 10,
                border: "1.5px solid #e2e8f0",
                background: "transparent",
                color: "#475569",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.transform = "translateY(-1px)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
