"use client"

import { useState } from "react"
import { X, Upload, User, Briefcase, CreditCard, Camera, CheckCircle, Save, Mail, Phone, MapPin, Building2, Calendar, Users } from "lucide-react"
import { useEmployee } from "@/hooks/employee/useEmployee"
import { EmployeeFormData } from "@/types/employee.types"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AddEmployeeModal({ isOpen, onClose, onSuccess }: AddEmployeeModalProps) {
  const { createEmployee, loading, error, clearError } = useEmployee()
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    userName: "",
    employeeId: "",
    address: "",
    employeeDesignation: "",
    joiningDate: "",
    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      bicCode: "",
      salary: ""
    },
    employeePhoto: null,
    socialProfile: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      whatsapp: ""
    },
    emergencyContact: {
      primary: {
        name: "",
        relationship: "",
        phone: ""
      },
      secondary: {
        name: "",
        relationship: "",
        phone: ""
      }
    },
    education: [],
    experience: [],
    passport: {
      passportNumber: "",
      nationality: "",
      issueDate: "",
      expiryDate: "",
      scanCopy: ""
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'accountHolderName' || name === 'accountNumber' || name === 'bankName' || name === 'branchName' || name === 'bicCode' || name === 'salary') {
      setFormData(prev => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [name]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      employeePhoto: file
    }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.firstName.trim()) e.firstName = "First name is required"
    if (!formData.lastName.trim()) e.lastName = "Last name is required"
    if (!formData.contactNumber.trim()) e.contactNumber = "Phone number is required"
    if (!formData.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email"
    if (!formData.userName.trim()) e.userName = "Username is required"
    if (!formData.employeeId.trim()) e.employeeId = "Employee ID is required"
    if (!formData.address.trim()) e.address = "Address is required"
    if (!formData.employeeDesignation) e.employeeDesignation = "Designation is required"
    if (!formData.joiningDate) e.joiningDate = "Joining date is required"
    if (!formData.bankDetails.accountHolderName.trim()) e.accountHolderName = "Account holder name is required"
    if (!formData.bankDetails.accountNumber.trim()) e.accountNumber = "Account number is required"
    if (!formData.bankDetails.bankName.trim()) e.bankName = "Bank name is required"
    if (!formData.bankDetails.branchName.trim()) e.branchName = "Branch name is required"
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    try {
      const submitData = {
        ...formData,
        contactInfo: {
          phone: formData.contactNumber,
          email: formData.email,
          address: formData.address,
          hireDate: formData.joiningDate,
          userName: formData.userName
        },
        bankDetails: {
          accountHolderName: formData.bankDetails.accountHolderName,
          accountNumber: formData.bankDetails.accountNumber,
          bankName: formData.bankDetails.bankName,
          branchName: formData.bankDetails.branchName,
          bicCode: formData.bankDetails.bicCode,
          salary: formData.bankDetails.salary ? formData.bankDetails.salary : undefined
        }
      }
      await createEmployee(submitData)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        setFormData({
          firstName: "",
          lastName: "",
          contactNumber: "",
          email: "",
          userName: "",
          employeeId: "",
          address: "",
          employeeDesignation: "",
          joiningDate: "",
          bankDetails: {
            accountHolderName: "",
            accountNumber: "",
            bankName: "",
            branchName: "",
            bicCode: "",
            salary: ""
          },
          employeePhoto: null,
          socialProfile: {
            linkedin: "",
            twitter: "",
            facebook: "",
            instagram: "",
            whatsapp: ""
          },
          emergencyContact: {
            primary: {
              name: "",
              relationship: "",
              phone: ""
            },
            secondary: {
              name: "",
              relationship: "",
              phone: ""
            }
          },
          education: [],
          experience: [],
          passport: {
            passportNumber: "",
            nationality: "",
            issueDate: "",
            expiryDate: "",
            scanCopy: ""
          }
        })
        onClose()
        if (onSuccess) onSuccess()
      }, 1500)
    } catch (err) {
      console.error("Failed to create employee:", err)
    }
  }

  if (!isOpen) return null

  const designations = [
    "Senior Developer", "Product Manager", "UX Designer", "DevOps Engineer",
    "HR Manager", "Backend Developer", "Frontend Developer", "QA Engineer"
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .employee-modal-overlay * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .employee-modal-fade {
          animation: employeeModalFadeIn 0.2s ease;
        }

        @keyframes employeeModalFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .section-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .section-card-header {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-card-body {
          padding: 16px;
        }

        .section-card-body.two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .field-group {
          margin-bottom: 16px;
        }

        .label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .input-wrap {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #94a3b8;
          z-index: 1;
        }

        .input {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          padding: 0 14px 0 38px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .input.with-icon {
          padding-left: 38px;
        }

        .input:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .input.error {
          border-color: #ef4444;
          background: #fff5f5;
        }

        .select {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
          padding: 0 38px 0 14px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
          appearance: none;
        }

        .select.with-icon {
          padding-left: 38px;
        }

        .select:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .error-msg {
          color: #dc2626;
          font-size: 11.5px;
          font-weight: 500;
          margin-top: 4px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-primary {
          background: #3b82f6;
          color: #fff;
        }

        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: transparent;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
        }

        .btn-secondary:hover {
          background: #f8fafc;
          transform: translateY(-1px);
        }

        .btn-success {
          background: #16a34a;
          color: #fff;
        }

        .btn-success:hover:not(:disabled) {
          background: #15803d;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
        }

        .upload-zone {
          display: block;
          border: 2px dashed #e2e8f0;
          border-radius: 10px;
          padding: 32px;
          text-align: center;
          transition: all 0.15s;
          cursor: pointer;
        }

        .upload-zone:hover {
          border-color: #3b82f6;
          background: #f8fafc;
        }

        @media (max-width: 768px) {
          .section-card-body.two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div
        className="employee-modal-overlay"
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
          className="employee-modal-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 900,
            maxHeight: "92vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "sticky", top: 0, zIndex: 10,
              background: "#fff",
              borderBottom: "1px solid #e2e8f0",
              padding: "16px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <User style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Add New Employee</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                  Employee personal, work, and bank information
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 8,
                border: "1.5px solid #e2e8f0",
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 16, height: 16, color: "#64748b" }} />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} style={{ padding: "24px", flex: 1 }}>
            {/* Personal Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <User style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Personal Information
                </span>
              </div>
              <div className="section-card-body two-col">
                <div className="field-group">
                  <label className="label">First Name</label>
                  <div className="input-wrap">
                    <User className="input-icon" />
                    <input
                      className={`input with-icon${errors.firstName ? " error" : ""}`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                    />
                  </div>
                  {errors.firstName && <div className="error-msg">{errors.firstName}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Last Name</label>
                  <div className="input-wrap">
                    <User className="input-icon" />
                    <input
                      className={`input with-icon${errors.lastName ? " error" : ""}`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                    />
                  </div>
                  {errors.lastName && <div className="error-msg">{errors.lastName}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Contact Number</label>
                  <div className="input-wrap">
                    <Phone className="input-icon" />
                    <input
                      className={`input with-icon${errors.contactNumber ? " error" : ""}`}
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                    />
                  </div>
                  {errors.contactNumber && <div className="error-msg">{errors.contactNumber}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Email Address</label>
                  <div className="input-wrap">
                    <Mail className="input-icon" />
                    <input
                      className={`input with-icon${errors.email ? " error" : ""}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      type="email"
                    />
                  </div>
                  {errors.email && <div className="error-msg">{errors.email}</div>}
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Briefcase style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Work Information
                </span>
              </div>
              <div className="section-card-body two-col">
                <div className="field-group">
                  <label className="label">Username</label>
                  <div className="input-wrap">
                    <Users className="input-icon" />
                    <input
                      className={`input with-icon${errors.userName ? " error" : ""}`}
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                    />
                  </div>
                  {errors.userName && <div className="error-msg">{errors.userName}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Employee ID</label>
                  <div className="input-wrap">
                    <Building2 className="input-icon" />
                    <input
                      className={`input with-icon${errors.employeeId ? " error" : ""}`}
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      placeholder="EMP-001"
                    />
                  </div>
                  {errors.employeeId && <div className="error-msg">{errors.employeeId}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Designation</label>
                  <div className="input-wrap">
                    <Briefcase className="input-icon" />
                    <select
                      className={`select with-icon${errors.employeeDesignation ? " error" : ""}`}
                      name="employeeDesignation"
                      value={formData.employeeDesignation}
                      onChange={handleInputChange}
                    >
                      <option value="">Select designation</option>
                      {designations.map((designation) => (
                        <option key={designation} value={designation}>{designation}</option>
                      ))}
                    </select>
                  </div>
                  {errors.employeeDesignation && <div className="error-msg">{errors.employeeDesignation}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Joining Date</label>
                  <div className="input-wrap">
                    <Calendar className="input-icon" />
                    <input
                      className={`input with-icon${errors.joiningDate ? " error" : ""}`}
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleInputChange}
                      type="date"
                    />
                  </div>
                  {errors.joiningDate && <div className="error-msg">{errors.joiningDate}</div>}
                </div>

                <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="label">Address</label>
                  <div className="input-wrap">
                    <MapPin className="input-icon" />
                    <input
                      className={`input with-icon${errors.address ? " error" : ""}`}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Street, City, State 12345"
                    />
                  </div>
                  {errors.address && <div className="error-msg">{errors.address}</div>}
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CreditCard style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Bank Information
                </span>
              </div>
              <div className="section-card-body two-col">
                <div className="field-group">
                  <label className="label">Account Holder Name</label>
                  <div className="input-wrap">
                    <User className="input-icon" />
                    <input
                      className={`input with-icon${errors.accountHolderName ? " error" : ""}`}
                      name="accountHolderName"
                      value={formData.bankDetails.accountHolderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.accountHolderName && <div className="error-msg">{errors.accountHolderName}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Account Number</label>
                  <div className="input-wrap">
                    <CreditCard className="input-icon" />
                    <input
                      className={`input with-icon${errors.accountNumber ? " error" : ""}`}
                      name="accountNumber"
                      value={formData.bankDetails.accountNumber}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                  {errors.accountNumber && <div className="error-msg">{errors.accountNumber}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Bank Name</label>
                  <div className="input-wrap">
                    <Building2 className="input-icon" />
                    <input
                      className={`input with-icon${errors.bankName ? " error" : ""}`}
                      name="bankName"
                      value={formData.bankDetails.bankName}
                      onChange={handleInputChange}
                      placeholder="Bank of America"
                    />
                  </div>
                  {errors.bankName && <div className="error-msg">{errors.bankName}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Branch Name</label>
                  <div className="input-wrap">
                    <Building2 className="input-icon" />
                    <input
                      className={`input with-icon${errors.branchName ? " error" : ""}`}
                      name="branchName"
                      value={formData.bankDetails.branchName}
                      onChange={handleInputChange}
                      placeholder="Main Branch"
                    />
                  </div>
                  {errors.branchName && <div className="error-msg">{errors.branchName}</div>}
                </div>

                <div className="field-group">
                  <label className="label">BIC Code</label>
                  <div className="input-wrap">
                    <Building2 className="input-icon" />
                    <input
                      className={`input with-icon${errors.bicCode ? " error" : ""}`}
                      name="bicCode"
                      value={formData.bankDetails.bicCode}
                      onChange={handleInputChange}
                      placeholder="e.g. CHASUS33"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                  {errors.bicCode && <div className="error-msg">{errors.bicCode}</div>}
                </div>

                <div className="field-group">
                  <label className="label">Salary</label>
                  <div className="input-wrap">
                    <Building2 className="input-icon" />
                    <input
                      className={`input with-icon${errors.salary ? " error" : ""}`}
                      name="salary"
                      type="number"
                      value={formData.bankDetails.salary}
                      onChange={handleInputChange}
                      placeholder="e.g. 50000"
                    />
                  </div>
                  {errors.salary && <div className="error-msg">{errors.salary}</div>}
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Camera style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Employee Photo
                </span>
              </div>
              <div className="section-card-body">
                <input
                  type="file"
                  id="employeePhoto"
                  name="employeePhoto"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <label htmlFor="employeePhoto" className="upload-zone">
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <Upload style={{ width: 24, height: 24, color: "#3b82f6" }} />
                  </div>
                  <div style={{ color: "#0f172a", fontSize: "14px", fontWeight: 600, marginBottom: 4 }}>
                    {formData.employeePhoto ? formData.employeePhoto.name : "Click to upload photo"}
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>
                    PNG, JPG, GIF up to 10MB
                  </div>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div style={{
              display: "flex", justifyContent: "flex-end", gap: 12,
              paddingTop: 20, borderTop: "1px solid #e2e8f0",
            }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                disabled={loading || saved}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn ${saved ? "btn-success" : "btn-primary"}`}
                disabled={loading || saved}
              >
                {saved ? (
                  <>
                    <CheckCircle style={{ width: 16, height: 16 }} />
                    Employee Added Successfully!
                  </>
                ) : loading ? (
                  "Submitting..."
                ) : (
                  <>
                    <Save style={{ width: 16, height: 16 }} />
                    Add Employee
                  </>
                )}
              </button>
            </div>
            {error && (
              <div style={{
                marginTop: 16, padding: 12,
                background: "#fef2f2", border: "1px solid #fecaca",
                borderRadius: 10, color: "#dc2626", fontSize: "13px", fontWeight: 500,
              }}>
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
