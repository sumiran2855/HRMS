"use client"

import { X } from "lucide-react"
import { EditModal } from "./EditModal"
import { useState } from "react"
import { useEmployee } from "@/hooks/employee/useEmployee"
import { EmployeeModalsProps, ExperienceEntry } from "./types"

export function EmployeeModals({
  activeModal,
  closeModal,
  employeeData,
  employeeId,
  uploadedFile,
  handleFileUpload,
  removeFile,
  onSave
}: EmployeeModalsProps) {
  const { updateEmployee, loading } = useEmployee()
  const [experienceEntries, setExperienceEntries] = useState<ExperienceEntry[]>(
    employeeData.experience.map((exp, index) => ({
      id: `exp-${index}`,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      isCurrentlyWorking: false
    }))
  )

  // Social profile state
  const [socialProfile, setSocialProfile] = useState({
    linkedin: employeeData.socialProfiles.linkedin || '',
    twitter: employeeData.socialProfiles.twitter || '',
    facebook: employeeData.socialProfiles.facebook || '',
    instagram: employeeData.socialProfiles.instagram || '',
    whatsapp: employeeData.socialProfiles.whatsapp || ''
  })

  const handleSocialProfileChange = (field: string, value: string) => {
    setSocialProfile(prev => ({ ...prev, [field]: value }))
  }

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: employeeData.name.split(' ')[0] || '',
    lastName: employeeData.name.split(' ').slice(1).join(' ') || '',
    email: employeeData.email || '',
    phone: employeeData.phone || '',
    address: employeeData.address || '',
    gender: employeeData.gender || '',
    birthday: employeeData.birthday || '',
    position: employeeData.position || '',
    jobTitle: employeeData.jobTitle || '',
    dateOfJoin: employeeData.dateOfJoin || '',
    departmentId: employeeData.departmentId || '',
    hireDate: employeeData.hireDate || ''
  })

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  // Emergency contact state
  const [emergencyContact, setEmergencyContact] = useState({
    primary: {
      name: employeeData.emergencyContact.primary.name || '',
      relationship: employeeData.emergencyContact.primary.relationship || '',
      phone: employeeData.emergencyContact.primary.phone || '',
      email: employeeData.emergencyContact.primary.email || '',
      address: employeeData.emergencyContact.primary.address || ''
    },
    secondary: {
      name: employeeData.emergencyContact.secondary.name || '',
      relationship: employeeData.emergencyContact.secondary.relationship || '',
      phone: employeeData.emergencyContact.secondary.phone || '',
      email: employeeData.emergencyContact.secondary.email || '',
      address: employeeData.emergencyContact.secondary.address || ''
    }
  })

  const handleEmergencyContactChange = (type: 'primary' | 'secondary', field: string, value: string) => {
    setEmergencyContact(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }))
  }

  // Education state
  const [educationEntries, setEducationEntries] = useState<Array<{
    id: string
    degree: string
    institution: string
    fieldOfStudy: string
    cgpa: string
    startDate: string
    endDate: string
  }>>(
    (() => {
      const entries = employeeData.education?.map((edu, index) => ({
        id: `edu-${index}`,
        degree: edu.degree || '',
        institution: edu.institution || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        cgpa: edu.cgpa || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || ''
      })) || []

      while (entries.length < 3) {
        entries.push({
          id: `edu-${entries.length}`,
          degree: '',
          institution: '',
          fieldOfStudy: '',
          cgpa: '',
          startDate: '',
          endDate: ''
        })
      }

      return entries
    })()
  )

  const handleEducationChange = (id: string, field: string, value: string) => {
    setEducationEntries(educationEntries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ))
  }

  // Bank account state
  const [bankAccount, setBankAccount] = useState({
    accountHolderName: employeeData.bankAccount.accountHolderName || '',
    accountNumber: employeeData.bankAccount.accountNumber || '',
    bankName: employeeData.bankAccount.bankName || '',
    branchName: employeeData.bankAccount.branchName || '',
    bicCode: employeeData.bankAccount.bicCode || '',
    salary: employeeData.bankAccount.salary?.toString() || ''
  })

  const handleBankAccountChange = (field: string, value: string) => {
    setBankAccount(prev => ({ ...prev, [field]: value }))
  }

  // Passport state
  const [passport, setPassport] = useState({
    passportNumber: employeeData.passport.passportNumber || '',
    nationality: employeeData.passport.nationality || '',
    issueDate: employeeData.passport.issueDate || '',
    expiryDate: employeeData.passport.expiryDate || '',
    scanCopy: employeeData.passport.scanCopy || ''
  })

  const handlePassportChange = (field: string, value: string) => {
    setPassport(prev => ({ ...prev, [field]: value }))
  }

  const addExperienceEntry = () => {
    const newEntry: ExperienceEntry = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
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

  const handleSavePersonal = async () => {
    try {
      await updateEmployee(employeeId, {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        contactNumber: personalInfo.phone,
        address: personalInfo.address,
        userName: `${personalInfo.firstName}${personalInfo.lastName}`.toLowerCase(),
        employeeDesignation: personalInfo.jobTitle,
        joiningDate: personalInfo.dateOfJoin,
        position: personalInfo.position,
        departmentId: personalInfo.departmentId,
        hireDate: personalInfo.hireDate,
        birthday: personalInfo.birthday,
        gender: personalInfo.gender
      })
      onSave()
      closeModal()
    } catch (error) {
      console.error('Failed to save personal info:', error)
    }
  }

  const handleSaveSocial = async () => {
    try {
      await updateEmployee(employeeId, {
        socialProfile: {
          linkedin: socialProfile.linkedin,
          twitter: socialProfile.twitter,
          facebook: socialProfile.facebook,
          instagram: socialProfile.instagram,
          whatsapp: socialProfile.whatsapp
        }
      })
      onSave()
      closeModal()
    } catch (error) {
      console.error('Failed to save social profile:', error)
    }
  }

  const handleSaveEmergency = async () => {
    try {
      await updateEmployee(employeeId, {
        emergencyContact: emergencyContact
      })
      onSave()
      closeModal()
    } catch (error) {
      console.error('Failed to save emergency contact:', error)
    }
  }

  const handleSaveEducation = async () => {
    try {
      await updateEmployee(employeeId, {
        education: educationEntries.map(edu => ({
          degree: edu.degree,
          institution: edu.institution,
          fieldOfStudy: edu.fieldOfStudy,
          cgpa: edu.cgpa,
          startDate: edu.startDate,
          endDate: edu.endDate
        }))
      })
      onSave()
      closeModal()
    } catch (error) {
      console.error('Failed to save education:', error)
    }
  }

  const handleSaveExperience = async () => {
    try {
      await updateEmployee(employeeId, {
        experience: experienceEntries.map(entry => ({
          company: entry.company,
          position: entry.position,
          startDate: entry.startDate,
          endDate: entry.isCurrentlyWorking ? '' : entry.endDate,
          description: ''
        }))
      })
      onSave()
      closeModal()
    } catch (error) {
      console.error('Failed to save experience:', error)
    }
  }

  const handleSaveBank = async () => {
    try {
      await updateEmployee(employeeId, {
        bankDetails: {
          accountHolderName: bankAccount.accountHolderName,
          accountNumber: bankAccount.accountNumber,
          bankName: bankAccount.bankName,
          branchName: bankAccount.branchName,
          bicCode: bankAccount.bicCode,
          salary: bankAccount.salary || undefined
        }
      })
      onSave()
      closeModal()
    } catch (error) {
      console.error('Failed to save bank account:', error)
    }
  }

  const handleSavePassport = async () => {
    try {
      await updateEmployee(employeeId, {
        passport: passport
      })
      onSave()
      closeModal()
    } catch (error) {
      console.error('Failed to save passport info:', error)
    }
  }

  return (
    <>
      <EditModal
        isOpen={activeModal === 'personal'}
        onClose={closeModal}
        title="Edit Personal Information"
        onSave={handleSavePersonal}
      >
        <div style={{ fontFamily: 'var(--font-sans)' }}>

          {/* Section: Identity */}
          <div className="mb-5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Identity</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">First name</label>
                <input
                  type="text"
                  value={personalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Last name</label>
                <input
                  type="text"
                  value={personalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Gender</label>
                <select
                  value={personalInfo.gender}
                  onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Birthday</label>
                <input
                  type="date"
                  value={personalInfo.birthday}
                  onChange={(e) => handlePersonalInfoChange('birthday', e.target.value)}
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
                  value={personalInfo.position}
                  onChange={(e) => handlePersonalInfoChange('position', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Job title</label>
                <input
                  type="text"
                  value={personalInfo.jobTitle}
                  onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Date of joining</label>
                <input
                  type="date"
                  value={personalInfo.dateOfJoin}
                  onChange={(e) => handlePersonalInfoChange('dateOfJoin', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Department ID</label>
                <input
                  type="text"
                  value={personalInfo.departmentId}
                  onChange={(e) => handlePersonalInfoChange('departmentId', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Hire Date</label>
                <input
                  type="date"
                  value={personalInfo.hireDate}
                  onChange={(e) => handlePersonalInfoChange('hireDate', e.target.value)}
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
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Address</label>
                <input
                  type="text"
                  value={personalInfo.address}
                  onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
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
        onSave={handleSaveSocial}
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
                value={socialProfile.linkedin}
                onChange={(e) => handleSocialProfileChange('linkedin', e.target.value)}
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
                value={socialProfile.twitter}
                onChange={(e) => handleSocialProfileChange('twitter', e.target.value)}
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
                value={socialProfile.facebook}
                onChange={(e) => handleSocialProfileChange('facebook', e.target.value)}
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
                value={socialProfile.instagram}
                onChange={(e) => handleSocialProfileChange('instagram', e.target.value)}
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
                value={socialProfile.whatsapp}
                onChange={(e) => handleSocialProfileChange('whatsapp', e.target.value)}
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
        onSave={handleSaveEmergency}
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
                  value={emergencyContact.primary.name}
                  onChange={(e) => handleEmergencyContactChange('primary', 'name', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Relationship</label>
                <select
                  value={emergencyContact.primary.relationship}
                  onChange={(e) => handleEmergencyContactChange('primary', 'relationship', e.target.value)}
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
                  value={emergencyContact.primary.phone}
                  onChange={(e) => handleEmergencyContactChange('primary', 'phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Email</label>
                <input
                  type="email"
                  value={emergencyContact.primary.email}
                  onChange={(e) => handleEmergencyContactChange('primary', 'email', e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Address</label>
                <input
                  type="text"
                  value={emergencyContact.primary.address}
                  onChange={(e) => handleEmergencyContactChange('primary', 'address', e.target.value)}
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
                  value={emergencyContact.secondary.name}
                  onChange={(e) => handleEmergencyContactChange('secondary', 'name', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Relationship</label>
                <select
                  value={emergencyContact.secondary.relationship}
                  onChange={(e) => handleEmergencyContactChange('secondary', 'relationship', e.target.value)}
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
                  value={emergencyContact.secondary.phone}
                  onChange={(e) => handleEmergencyContactChange('secondary', 'phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Email</label>
                <input
                  type="email"
                  value={emergencyContact.secondary.email}
                  onChange={(e) => handleEmergencyContactChange('secondary', 'email', e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Address</label>
                <input
                  type="text"
                  value={emergencyContact.secondary.address}
                  onChange={(e) => handleEmergencyContactChange('secondary', 'address', e.target.value)}
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
        onSave={handleSaveEducation}
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
                  value={educationEntries[0]?.degree || ''}
                  onChange={(e) => handleEducationChange(educationEntries[0]?.id || '', 'degree', e.target.value)}
                  placeholder="e.g. Masters in Computer Science"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Institution name</label>
                <input
                  type="text"
                  value={educationEntries[0]?.institution || ''}
                  onChange={(e) => handleEducationChange(educationEntries[0]?.id || '', 'institution', e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Field of study</label>
                <input
                  type="text"
                  value={educationEntries[0]?.fieldOfStudy || ''}
                  onChange={(e) => handleEducationChange(educationEntries[0]?.id || '', 'fieldOfStudy', e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">CGPA</label>
                <input
                  type="text"
                  value={educationEntries[0]?.cgpa || ''}
                  onChange={(e) => handleEducationChange(educationEntries[0]?.id || '', 'cgpa', e.target.value)}
                  placeholder="e.g. 3.5"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Start date</label>
                <input
                  type="date"
                  value={educationEntries[0]?.startDate || ''}
                  onChange={(e) => handleEducationChange(educationEntries[0]?.id || '', 'startDate', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Completion date</label>
                <input
                  type="date"
                  value={educationEntries[0]?.endDate || ''}
                  onChange={(e) => handleEducationChange(educationEntries[0]?.id || '', 'endDate', e.target.value)}
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
                  value={educationEntries[1]?.degree || ''}
                  onChange={(e) => handleEducationChange(educationEntries[1]?.id || '', 'degree', e.target.value)}
                  placeholder="e.g. BSc in Information Technology"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Institution name</label>
                <input
                  type="text"
                  value={educationEntries[1]?.institution || ''}
                  onChange={(e) => handleEducationChange(educationEntries[1]?.id || '', 'institution', e.target.value)}
                  placeholder="e.g. MIT"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Field of study</label>
                <input
                  type="text"
                  value={educationEntries[1]?.fieldOfStudy || ''}
                  onChange={(e) => handleEducationChange(educationEntries[1]?.id || '', 'fieldOfStudy', e.target.value)}
                  placeholder="e.g. Information Technology"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">CGPA</label>
                <input
                  type="text"
                  value={educationEntries[1]?.cgpa || ''}
                  onChange={(e) => handleEducationChange(educationEntries[1]?.id || '', 'cgpa', e.target.value)}
                  placeholder="e.g. 3.2"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Start date</label>
                <input
                  type="date"
                  value={educationEntries[1]?.startDate || ''}
                  onChange={(e) => handleEducationChange(educationEntries[1]?.id || '', 'startDate', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Completion date</label>
                <input
                  type="date"
                  value={educationEntries[1]?.endDate || ''}
                  onChange={(e) => handleEducationChange(educationEntries[1]?.id || '', 'endDate', e.target.value)}
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
                  value={educationEntries[2]?.degree || ''}
                  onChange={(e) => handleEducationChange(educationEntries[2]?.id || '', 'degree', e.target.value)}
                  placeholder="e.g. High School Diploma"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Institution name</label>
                <input
                  type="text"
                  value={educationEntries[2]?.institution || ''}
                  onChange={(e) => handleEducationChange(educationEntries[2]?.id || '', 'institution', e.target.value)}
                  placeholder="e.g. Lincoln High School"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Field of study</label>
                <input
                  type="text"
                  value={educationEntries[2]?.fieldOfStudy || ''}
                  onChange={(e) => handleEducationChange(educationEntries[2]?.id || '', 'fieldOfStudy', e.target.value)}
                  placeholder="e.g. General Studies"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">CGPA</label>
                <input
                  type="text"
                  value={educationEntries[2]?.cgpa || ''}
                  onChange={(e) => handleEducationChange(educationEntries[2]?.id || '', 'cgpa', e.target.value)}
                  placeholder="e.g. 4.0"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Start date</label>
                <input
                  type="date"
                  value={educationEntries[2]?.startDate || ''}
                  onChange={(e) => handleEducationChange(educationEntries[2]?.id || '', 'startDate', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Completion date</label>
                <input
                  type="date"
                  value={educationEntries[2]?.endDate || ''}
                  onChange={(e) => handleEducationChange(educationEntries[2]?.id || '', 'endDate', e.target.value)}
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
        onSave={handleSaveExperience}
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
                    value={entry.position}
                    onChange={(e) => updateExperienceEntry(entry.id, 'position', e.target.value)}
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
        onSave={handleSaveBank}
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
                  value={bankAccount.accountHolderName}
                  onChange={(e) => handleBankAccountChange('accountHolderName', e.target.value)}
                  placeholder="Full legal name"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Account number</label>
                <input
                  type="text"
                  value={bankAccount.accountNumber}
                  onChange={(e) => handleBankAccountChange('accountNumber', e.target.value)}
                  placeholder="e.g. 0000 0000 0000 0000"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Bank name</label>
                <input
                  type="text"
                  value={bankAccount.bankName}
                  onChange={(e) => handleBankAccountChange('bankName', e.target.value)}
                  placeholder="e.g. Chase Bank"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Branch name</label>
                <input
                  type="text"
                  value={bankAccount.branchName}
                  onChange={(e) => handleBankAccountChange('branchName', e.target.value)}
                  placeholder="e.g. Downtown Branch"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">BIC code</label>
                <input
                  type="text"
                  value={bankAccount.bicCode}
                  onChange={(e) => handleBankAccountChange('bicCode', e.target.value)}
                  placeholder="e.g. CHASUS33"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Salary</label>
                <input
                  type="number"
                  value={bankAccount.salary}
                  onChange={(e) => handleBankAccountChange('salary', e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        onSave={handleSavePassport}
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
                  value={passport.passportNumber}
                  onChange={(e) => handlePassportChange('passportNumber', e.target.value)}
                  placeholder="e.g. A12345678"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Nationality</label>
                <input
                  type="text"
                  value={passport.nationality}
                  onChange={(e) => handlePassportChange('nationality', e.target.value)}
                  placeholder="e.g. United States"
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Issue date</label>
                <input
                  type="date"
                  value={passport.issueDate}
                  onChange={(e) => handlePassportChange('issueDate', e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Expiry date</label>
                <input
                  type="date"
                  value={passport.expiryDate}
                  onChange={(e) => handlePassportChange('expiryDate', e.target.value)}
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
