"use client"

import { X, Globe, Building, Users, MapPin, Mail, Phone, Calendar, DollarSign, FileText, TrendingUp, ExternalLink } from "lucide-react"

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .co-modal * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .co-fade {
          animation: coFadeIn 0.22s ease;
        }
        @keyframes coFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .co-section-title {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #94a3b8;
          margin-bottom: 12px;
        }

        .co-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .co-info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .co-info-row:first-child { padding-top: 0; }

        .co-icon-box {
          width: 32px; height: 32px; border-radius: 8px;
          background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .co-metric-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .co-metric-label {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .co-metric-value {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          font-family: 'DM Mono', monospace;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .co-metric-sub {
          font-size: 11px;
          color: #94a3b8;
        }

        .co-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .co-tag.active  { background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0; }
        .co-tag.inactive { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

        .co-close-btn {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .co-close-btn:hover { background: #f1f5f9; }

        .co-website-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #0f766e;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.15s;
        }
        .co-website-link:hover { color: #0d9488; text-decoration: underline; }

        @media (max-width: 540px) {
          .co-metrics-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div
        className="co-modal"
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
          className="co-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 620,
            maxHeight: "92vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── Hero Header ── */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            borderRadius: "16px 16px 0 0",
            padding: "28px 24px 24px",
            position: "relative",
          }}>
            {/* Close */}
            <button
              className="co-close-btn"
              onClick={onClose}
              style={{ position: "absolute", top: 16, right: 16, borderColor: "rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 16, height: 16, color: "rgba(255,255,255,0.7)" }} />
            </button>

            {/* Company identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Building style={{ width: 26, height: 26, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  {company.name}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Globe style={{ width: 12, height: 12 }} />
                  {company.industry}
                </div>
              </div>
            </div>

            {/* Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span className={`co-tag ${company.status}`} style={{ background: company.status === "active" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", color: company.status === "active" ? "#4ade80" : "#f87171", border: "none" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
                {company.status === "active" ? "Active" : "Inactive"}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <Calendar style={{ width: 10, height: 10 }} />
                Est. {new Date(company.foundedDate).getFullYear()} &nbsp;·&nbsp; {getYearsActive(company.foundedDate)} old
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <Users style={{ width: 10, height: 10 }} />
                Owner: {company.ownerName}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <TrendingUp style={{ width: 10, height: 10 }} />
                Rating: {company.rating} / 5
              </span>
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Key Metrics */}
            <div>
              <div className="co-section-title">Key Metrics</div>
              <div
                className="co-metrics-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                <div className="co-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Users style={{ width: 14, height: 14, color: "#0f766e" }} />
                    <span className="co-metric-label">Employees</span>
                  </div>
                  <div className="co-metric-value">{company.employees.toLocaleString()}</div>
                  <div className="co-metric-sub">Total headcount</div>
                </div>

                <div className="co-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <TrendingUp style={{ width: 14, height: 14, color: "#7c3aed" }} />
                    <span className="co-metric-label">Revenue</span>
                  </div>
                  <div className="co-metric-value" style={{ fontSize: 20 }}>{formatCurrency(company.revenue)}</div>
                  <div className="co-metric-sub">Annual</div>
                </div>

                <div className="co-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar style={{ width: 14, height: 14, color: "#ea580c" }} />
                    <span className="co-metric-label">Founded</span>
                  </div>
                  <div className="co-metric-value" style={{ fontSize: 20 }}>{new Date(company.foundedDate).getFullYear()}</div>
                  <div className="co-metric-sub">{getYearsActive(company.foundedDate)} ago</div>
                </div>
              </div>
            </div>

            {/* About */}
            {company.description && (
              <div>
                <div className="co-section-title">About</div>
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "16px 18px",
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: "#475569",
                }}>
                  {company.description}
                </div>
              </div>
            )}

            {/* Contact & Info grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}>
              {/* Company Info */}
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
                    Company Info
                  </span>
                </div>
                <div style={{ padding: "4px 16px 14px" }}>
                  {[
                    { icon: Building,  label: "Name",        value: company.name },
                    { icon: Globe,     label: "Industry",    value: company.industry },
                    { icon: Calendar,  label: "Founded",     value: formatDate(company.foundedDate) },
                    { icon: Users,     label: "Owner",       value: company.ownerName },
                  ].map(({ icon: Icon, label, value }) => (
                    <div className="co-info-row" key={label}>
                      <div className="co-icon-box">
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
                    { icon: Mail,  label: "Email",   value: company.email,   isEmail: true },
                    { icon: Phone, label: "Phone",   value: company.phone },
                    { icon: MapPin, label: "Address", value: company.address },
                    { icon: Globe, label: "Website", value: company.website, isLink: true },
                  ].map(({ icon: Icon, label, value, isLink, isEmail }: any) => (
                    <div className="co-info-row" key={label}>
                      <div className="co-icon-box">
                        <Icon style={{ width: 13, height: 13, color: "#0f766e" }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 500 }}>{label}</div>
                        {isLink ? (
                          <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="co-website-link">
                            {value} <ExternalLink style={{ width: 11, height: 11 }} />
                          </a>
                        ) : isEmail ? (
                          <a href={`mailto:${value}`} className="co-website-link">
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
          </div>

          {/* ── Footer ── */}
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