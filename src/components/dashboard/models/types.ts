import { CalendarEventForm, CalendarEvent } from "@/types/dashboard"

export interface EmployeeData {
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
  departmentId: string
  hireDate: string
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
    position: string
    startDate?: string;
    endDate?: string;
  }>
  education: Array<{
    degree: string
    institution: string
    fieldOfStudy: string
    cgpa: string
    startDate?: string;
    endDate?: string;
  }>
  bankAccount: {
    accountHolderName: string
    accountNumber: string
    bankName: string
    branchName: string
    bicCode: string
    salary: number | string
  }
  passport: {
    passportNumber: string
    nationality: string
    issueDate: string
    expiryDate: string
    scanCopy: string
  }
}

export interface EmployeeModalsProps {
  activeModal: string | null
  closeModal: () => void
  employeeData: EmployeeData
  employeeId: string
  uploadedFile: File | null
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: () => void
  onSave: () => void
}

export interface ExperienceEntry {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  isCurrentlyWorking: boolean
}

export interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onSave?: () => void
  description?: string
  lastUpdated?: string
}

export interface CalendarEventModalProps {
  showEventModal: boolean
  setShowEventModal: (show: boolean) => void
  eventForm: CalendarEventForm
  setEventForm: (form: CalendarEventForm) => void
  editingEvent: CalendarEvent | null
  handleSaveEvent: () => void
}