"use client"

import { FileText, Upload, X } from "lucide-react"
import { EditModal } from "./EditModal"
import { Button } from "@/components/ui/Button"
import { useState } from "react"

interface EmployeeData {
  id: string
  name: string
  jobTitle: string
  position: string
  dateOfJoin: string
  phone: string
  email: string
  birthday: string
  address: string
  gender: string
  socialProfiles: {
    linkedin: string
    twitter: string
    facebook: string
    instagram: string
    whatsapp: string
  }
  emergencyContact: {
    primary: {
      name: string
      relationship: string
      phone: string
      email: string
      address: string
    }
    secondary: {
      name: string
      relationship: string
      phone: string
      email: string
      address: string
    }
  }
  experience: Array<{
    company: string
    role: string
    year: string
  }>
  bankAccount: {
    accountHolderName: string
    accountNumber: string
    bankName: string
    branchName: string
    swiftCode: string
  }
  passport: {
    passportNumber: string
    nationality: string
    issueDate: string
    expiryDate: string
    scanCopy: string
  }
}

interface EmployeeModalsProps {
  activeModal: string | null
  closeModal: () => void
  employeeData: EmployeeData
  uploadedFile: File | null
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: () => void
}

interface ExperienceEntry {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  isCurrentlyWorking: boolean
}

export function EmployeeModals({
  activeModal,
  closeModal,
  employeeData,
  uploadedFile,
  handleFileUpload,
  removeFile
}: EmployeeModalsProps) {
  const [experienceEntries, setExperienceEntries] = useState<ExperienceEntry[]>(
    employeeData.experience.map((exp, index) => ({
      id: `exp-${index}`,
      company: exp.company,
      role: exp.role,
      startDate: '',
      endDate: '',
      isCurrentlyWorking: false
    }))
  )

  const addExperienceEntry = () => {
    const newEntry: ExperienceEntry = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      isCurrentlyWorking: false
    }
    setExperienceEntries([...experienceEntries, newEntry])
  }

  const updateExperienceEntry = (id: string, field: keyof ExperienceEntry, value: string | boolean) => {
    setExperienceEntries(experienceEntries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ))
  }

  const removeExperienceEntry = (id: string) => {
    setExperienceEntries(experienceEntries.filter(entry => entry.id !== id))
  }

  return (
    <>
      <EditModal
        isOpen={activeModal === 'personal'}
        onClose={closeModal}
        title="Edit Personal Information"
        onSave={() => console.log('Personal info saved')}
      >
        <div style={{ fontFamily: 'var(--font-sans)' }}>

          {/* Section: Identity */}
          <div className="mb-5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Identity</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Full name</label>
                <input
                  type="text"
                  defaultValue={employeeData.name}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Employee ID</label>
                <input
                  type="text"
                  defaultValue={employeeData.id}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Gender</label>
                <select
                  defaultValue={employeeData.gender}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Birthday</label>
                <input
                  type="date"
                  defaultValue={employeeData.birthday}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 my-4" />

          {/* Section: Role */}
          <div className="mb-5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Role</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Position</label>
                <input
                  type="text"
                  defaultValue={employeeData.position}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Job title</label>
                <input
                  type="text"
                  defaultValue={employeeData.jobTitle}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Date of joining</label>
                <input
                  type="date"
                  defaultValue={employeeData.dateOfJoin}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 my-4" />

          {/* Section: Contact */}
          <div className="mb-1">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Contact</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Email</label>
                <input
                  type="email"
                  defaultValue={employeeData.email}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Phone</label>
                <input
                  type="tel"
                  defaultValue={employeeData.phone}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Address</label>
                <input
                  type="text"
                  defaultValue={employeeData.address}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'social'}
        onClose={closeModal}
        title="Social profiles"
        description="Connect your social accounts to your employee profile."
        onSave={() => console.log('Social profile saved')}
      >
        <div className="space-y-3">

          {/* LinkedIn */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">LinkedIn</label>
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <svg className="w-4 h-4 shrink-0 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <input
                type="url"
                defaultValue={employeeData.socialProfiles.linkedin}
                placeholder="linkedin.com/in/username"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-300 outline-none"
              />
            </div>
          </div>

          {/* Twitter / X */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Twitter / X</label>
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <svg className="w-4 h-4 shrink-0 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <input
                type="url"
                defaultValue={employeeData.socialProfiles.twitter}
                placeholder="x.com/username"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-300 outline-none"
              />
            </div>
          </div>

          {/* Facebook */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Facebook</label>
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <svg className="w-4 h-4 shrink-0 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <input
                type="url"
                defaultValue={employeeData.socialProfiles.facebook}
                placeholder="facebook.com/username"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-300 outline-none"
              />
            </div>
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Instagram</label>
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFDC80" />
                    <stop offset="30%" stopColor="#F77737" />
                    <stop offset="60%" stopColor="#C13584" />
                    <stop offset="100%" stopColor="#833AB4" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#ig)" />
                <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="17.5" cy="6.5" r="1" fill="white" />
              </svg>
              <input
                type="url"
                defaultValue={employeeData.socialProfiles.instagram}
                placeholder="instagram.com/username"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-300 outline-none"
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">WhatsApp</label>
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <svg className="w-4 h-4 shrink-0 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              <input
                type="tel"
                defaultValue={employeeData.socialProfiles.whatsapp}
                placeholder="+1 (555) 000-0000"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-300 outline-none"
              />
            </div>
          </div>

        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'emergency'}
        onClose={closeModal}
        title="Emergency contacts"
        description="Keep these details up to date for urgent situations."
        onSave={() => console.log('Emergency contact saved')}
      >
        <div className="space-y-5">

          {/* Primary Contact */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">

            {/* Section Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <span className="block w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">Primary contact</p>
              <span className="ml-auto text-[11px] text-red-400 font-medium">Required</span>
            </div>

            {/* Fields */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Full name</label>
                <input
                  type="text"
                  defaultValue={employeeData.emergencyContact.primary.name}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Relationship</label>
                <select
                  defaultValue={employeeData.emergencyContact.primary.relationship}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select relationship</option>
                  <option>Spouse</option>
                  <option>Parent</option>
                  <option>Sibling</option>
                  <option>Child</option>
                  <option>Friend</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Phone</label>
                <input
                  type="tel"
                  defaultValue={employeeData.emergencyContact.primary.phone}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Email</label>
                <input
                  type="email"
                  defaultValue={employeeData.emergencyContact.primary.email}
                  placeholder="name@example.com"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Address</label>
                <input
                  type="text"
                  defaultValue={employeeData.emergencyContact.primary.address}
                  placeholder="Street, City, State, ZIP"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Secondary Contact */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">

            {/* Section Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                <span className="block w-1.5 h-1.5 rounded-full bg-slate-400" />
              </div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">Secondary contact</p>
              <span className="ml-auto text-[11px] text-slate-400 font-medium">Optional</span>
            </div>

            {/* Fields */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Full name</label>
                <input
                  type="text"
                  defaultValue={employeeData.emergencyContact.secondary.name}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Relationship</label>
                <select
                  defaultValue={employeeData.emergencyContact.secondary.relationship}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select relationship</option>
                  <option>Spouse</option>
                  <option>Parent</option>
                  <option>Sibling</option>
                  <option>Child</option>
                  <option>Friend</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Phone</label>
                <input
                  type="tel"
                  defaultValue={employeeData.emergencyContact.secondary.phone}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Email</label>
                <input
                  type="email"
                  defaultValue={employeeData.emergencyContact.secondary.email}
                  placeholder="name@example.com"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Address</label>
                <input
                  type="text"
                  defaultValue={employeeData.emergencyContact.secondary.address}
                  placeholder="Street, City, State, ZIP"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'education'}
        onClose={closeModal}
        title="Education qualifications"
        description="Add or update your academic background and credentials."
        onSave={() => console.log('Education saved')}
      >
        <div className="space-y-4">

          {/* Higher Degree */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="w-6 h-6 rounded-md bg-violet-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">Higher degree</p>
              <span className="ml-auto text-[11px] font-medium text-violet-400">Postgraduate</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Degree</label>
                <input
                  type="text"
                  defaultValue="Masters in Computer Science"
                  placeholder="e.g. Masters in Computer Science"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Institution name</label>
                <input
                  type="text"
                  defaultValue="Stanford University"
                  placeholder="e.g. Stanford University"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Start date</label>
                <input
                  type="date"
                  defaultValue="2020-09-01"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Completion date</label>
                <input
                  type="date"
                  defaultValue="2022-06-30"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Bachelor Degree */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">Bachelor degree</p>
              <span className="ml-auto text-[11px] font-medium text-blue-400">Undergraduate</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Degree</label>
                <input
                  type="text"
                  defaultValue="BSc in Information Technology"
                  placeholder="e.g. BSc in Information Technology"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Institution name</label>
                <input
                  type="text"
                  defaultValue="MIT"
                  placeholder="e.g. MIT"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Start date</label>
                <input
                  type="date"
                  defaultValue="2016-09-01"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Completion date</label>
                <input
                  type="date"
                  defaultValue="2020-06-30"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Secondary Education */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">Secondary education</p>
              <span className="ml-auto text-[11px] font-medium text-emerald-400">High school</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Degree / certificate</label>
                <input
                  type="text"
                  defaultValue="High School Diploma"
                  placeholder="e.g. High School Diploma"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Institution name</label>
                <input
                  type="text"
                  defaultValue="Lincoln High School"
                  placeholder="e.g. Lincoln High School"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Start date</label>
                <input
                  type="date"
                  defaultValue="2012-09-01"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Completion date</label>
                <input
                  type="date"
                  defaultValue="2016-06-30"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'experience'}
        onClose={closeModal}
        title="Work experience"
        description="Your professional history and previous roles."
        onSave={() => console.log('Experience saved')}
      >
        <div className="space-y-4">
          {experienceEntries.map((entry, index) => (
            <div key={entry.id} className="rounded-xl border border-slate-200 overflow-hidden">

              {/* Card Header */}
              <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
                <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    <line x1="12" y1="12" x2="12" y2="16" />
                    <line x1="10" y1="14" x2="14" y2="14" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">
                  {entry.company || `Company ${index + 1}`}
                </p>
                <span className="ml-auto text-[11px] font-medium text-amber-400">
                  Position {index + 1}
                </span>
                {experienceEntries.length > 1 && (
                  <button
                    onClick={() => removeExperienceEntry(entry.id)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Fields */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Company name</label>
                  <input
                    type="text"
                    value={entry.company}
                    onChange={(e) => updateExperienceEntry(entry.id, 'company', e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Role / title</label>
                  <input
                    type="text"
                    value={entry.role}
                    onChange={(e) => updateExperienceEntry(entry.id, 'role', e.target.value)}
                    placeholder="e.g. Senior Engineer"
                    className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Start date</label>
                  <input
                    type="date"
                    value={entry.startDate}
                    onChange={(e) => updateExperienceEntry(entry.id, 'startDate', e.target.value)}
                    className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">End date</label>
                  <div className="space-y-1.5">
                    <input
                      type="date"
                      value={entry.endDate}
                      onChange={(e) => updateExperienceEntry(entry.id, 'endDate', e.target.value)}
                      disabled={entry.isCurrentlyWorking}
                      className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={entry.isCurrentlyWorking}
                        onChange={(e) => updateExperienceEntry(entry.id, 'isCurrentlyWorking', e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-slate-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-400">Currently working here</span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          ))}

          {/* Add Another Entry */}
          <button
            onClick={addExperienceEntry}
            className="w-full h-9 rounded-xl border border-dashed border-slate-300 text-xs text-slate-400 hover:border-slate-400 hover:text-slate-500 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add another position
          </button>

        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'bank'}
        onClose={closeModal}
        title="Bank account"
        description="Your salary and reimbursements will be sent to this account."
        onSave={() => console.log('Bank account saved')}
      >
        <div className="space-y-4">

          {/* Security Notice */}
          <div className="flex items-start gap-3 px-3.5 py-3 rounded-lg bg-amber-50 border border-amber-100">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p className="text-[12px] text-amber-700 leading-relaxed">
              This information is encrypted and only accessible to authorized HR personnel. Never share your account details over email.
            </p>
          </div>

          {/* Account Details Card */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">Account details</p>
              <span className="ml-auto text-[11px] font-medium text-emerald-500">Encrypted</span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Account holder name</label>
                <input
                  type="text"
                  defaultValue={employeeData.bankAccount.accountHolderName}
                  placeholder="Full legal name"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Account number</label>
                <input
                  type="text"
                  defaultValue={employeeData.bankAccount.accountNumber}
                  placeholder="e.g. 0000 0000 0000 0000"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Bank name</label>
                <input
                  type="text"
                  defaultValue={employeeData.bankAccount.bankName}
                  placeholder="e.g. Chase Bank"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Branch name</label>
                <input
                  type="text"
                  defaultValue={employeeData.bankAccount.branchName}
                  placeholder="e.g. Downtown Branch"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">SWIFT / BIC code</label>
                <input
                  type="text"
                  defaultValue={employeeData.bankAccount.swiftCode}
                  placeholder="e.g. CHASUS33"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'passport'}
        onClose={closeModal}
        title="Passport information"
        description="Used for travel, identity verification, and compliance records."
        onSave={() => console.log('Passport info saved')}
      >
        <div className="space-y-4">

          {/* Passport Details Card */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">Document details</p>
              <span className="ml-auto text-[11px] font-medium text-blue-400">Travel document</span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Passport number</label>
                <input
                  type="text"
                  defaultValue={employeeData.passport.passportNumber}
                  placeholder="e.g. A12345678"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Nationality</label>
                <input
                  type="text"
                  defaultValue={employeeData.passport.nationality}
                  placeholder="e.g. United States"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Issue date</label>
                <input
                  type="date"
                  defaultValue={employeeData.passport.issueDate}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Expiry date</label>
                <input
                  type="date"
                  defaultValue={employeeData.passport.expiryDate}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Scan Upload Card */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">Scan copy</p>
              <span className="ml-auto text-[11px] font-medium text-slate-400">PDF, PNG, JPG</span>
            </div>

            <div className="p-4">
              {uploadedFile ? (
                <div className="flex items-center justify-between px-3.5 py-3 rounded-lg border border-emerald-200 bg-emerald-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-800">{uploadedFile.name}</p>
                      <p className="text-[11px] text-emerald-500">
                        {(uploadedFile.size / 1024).toFixed(1)} KB · {uploadedFile.type || 'Unknown type'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 border border-red-100 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                    id="passport-scan"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="passport-scan"
                    className="flex flex-col items-center justify-center gap-3 py-7 rounded-lg border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                      <svg className="w-4.5 h-4.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-600">Click to upload</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, PDF or DOC up to 10MB</p>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>

        </div>
      </EditModal>
    </>
  )
}
