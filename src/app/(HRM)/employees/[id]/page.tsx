"use client"

import { Edit2, Phone, Mail, Calendar, MapPin, User, Globe, Facebook, Twitter, Linkedin, Instagram, MessageCircle, ArrowLeft, Briefcase, GraduationCap, CreditCard, FileText, Users, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { EditModal } from "@/components/dashboard/models/EditModal"
import { EmployeeModals } from "@/components/dashboard/models/EmployeeModals"
import { useState } from "react"

const employeeData = {
  id: "MD-0001",
  name: "Ethan Mitchell",
  jobTitle: "UI/UX Design Team",
  position: "Web Designer",
  dateOfJoin: "05.01.2024",
  phone: "+1 (555) 123-4567",
  email: "ethan.mitchell@company.com",
  birthday: "15.08.1992",
  address: "123 Main St, New York, NY 10001",
  gender: "Male",
  avatar: "/api/placeholder/150/150",
  
  emergencyContact: {
    primary: {
      name: "Sarah Mitchell",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
      email: "sarah.mitchell@email.com",
      address: "123 Main St, New York, NY 10001"
    },
    secondary: {
      name: "John Mitchell",
      relationship: "Father",
      phone: "+1 (555) 456-7890",
      email: "john.mitchell@email.com",
      address: "456 Oak Ave, Boston, MA 02101"
    }
  },
  
  education: [
    {
      degree: "Master of Fine Arts",
      field: "Graphic Design",
      year: "2014-2016"
    },
    {
      degree: "Bachelor of Arts",
      field: "Digital Media",
      year: "2010-2014"
    }
  ],
  
  experience: [
    {
      company: "Tech Solutions Inc.",
      role: "Senior UI/UX Designer",
      year: "2020-2024"
    },
    {
      company: "Creative Agency",
      role: "Web Designer",
      year: "2018-2020"
    },
    {
      company: "Design Studio",
      role: "Junior Designer",
      year: "2016-2018"
    }
  ],
  
  bankAccount: {
    accountHolderName: "Ethan Mitchell",
    accountNumber: "1234567890123456",
    bankName: "First National Bank",
    branchName: "Manhattan Branch",
    swiftCode: "FNBAUS33XXX"
  },
  
  passport: {
    passportNumber: "A12345678",
    nationality: "United States",
    issueDate: "15.03.2020",
    expiryDate: "15.03.2030",
    scanCopy: "#"
  },
  
  socialProfiles: {
    linkedin: "linkedin.com/in/ethanmitchell",
    twitter: "twitter.com/ethanmitchell",
    facebook: "facebook.com/ethanmitchell",
    instagram: "instagram.com/ethanmitchell",
    whatsapp: "+1 (555) 123-4567"
  }
}

export default function EmployeeProfile() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const openModal = (modalType: string) => setActiveModal(modalType)
  const closeModal = () => setActiveModal(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
    }
  }

  const removeFile = () => {
    setUploadedFile(null);
    console.log('File removed');
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
        <Link href="/employees" className="hover:text-blue-600 transition-colors flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg font-medium text-blue-700">
          <ArrowLeft className="w-4 h-4" />
          Employees
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-900 font-medium">Employee Profile</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Personal Information Card */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-purple-50 cursor-pointer" onClick={() => openModal('personal')}>
                <Edit2 className="w-4 h-4 text-purple-600 cursor-pointer" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Employee Info */}
              <div className="space-y-4">
                {/* Employee Profile Card */}
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                    <img 
                      src="https://html.bdevs.net/manez.prev/assets/images/avatar/avatar1.png"
                      alt={employeeData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">{employeeData.name}</h3>
                    <p className="text-slate-600 text-sm">{employeeData.position}</p>
                    <p className="text-slate-500 text-xs">{employeeData.jobTitle}</p>
                    <p className="text-slate-700 text-sm mt-2"><span className="font-semibold">Employee ID :</span> {employeeData.id}</p>
                    <p className="text-slate-700 text-sm"><span className="font-semibold">Date of Join :</span> {employeeData.dateOfJoin}</p>
                  </div>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all py-3 text-base font-semibold">
                  Send Message
                </Button>
              </div>
              
              {/* Right Column: Contact Details */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-600" />
                  Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">Phone</p>
                      <p className="text-sm font-semibold text-slate-900">{employeeData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">Email</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{employeeData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">Birthday</p>
                      <p className="text-sm font-semibold text-slate-900">{employeeData.birthday}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">Address</p>
                      <p className="text-sm font-semibold text-slate-900">{employeeData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">Gender</p>
                      <p className="text-sm font-semibold text-slate-900">{employeeData.gender}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Profile Card */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow p-6 h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Social Profile</h2>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-purple-50 cursor-pointer" onClick={() => openModal('social')}>
                <Edit2 className="w-4 h-4 text-purple-600 cursor-pointer" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Linkedin className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">LinkedIn</p>
                  <p className="text-xs text-slate-600 truncate">{employeeData.socialProfiles.linkedin}</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                  <Twitter className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Twitter</p>
                  <p className="text-xs text-slate-600 truncate">{employeeData.socialProfiles.twitter}</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center group-hover:bg-blue-800 transition-colors">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Facebook</p>
                  <p className="text-xs text-slate-600 truncate">{employeeData.socialProfiles.facebook}</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center group-hover:bg-pink-700 transition-colors">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Instagram</p>
                  <p className="text-xs text-slate-600 truncate">{employeeData.socialProfiles.instagram}</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center group-hover:bg-green-700 transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">WhatsApp</p>
                  <p className="text-xs text-slate-600">{employeeData.socialProfiles.whatsapp}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Emergency Contact</h2>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-red-50" onClick={() => openModal('emergency')}>
            <Edit2 className="w-4 h-4 cursor-pointer" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Contact */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-5 border border-red-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900">Primary Contact</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Name</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.emergencyContact.primary.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Relationship</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.emergencyContact.primary.relationship}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Phone</span>
                <a href={`tel:${employeeData.emergencyContact.primary.phone}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                  {employeeData.emergencyContact.primary.phone}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Email</span>
                <a href={`mailto:${employeeData.emergencyContact.primary.email}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 truncate">
                  {employeeData.emergencyContact.primary.email}
                </a>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Address</span>
                <p className="text-sm font-semibold text-slate-900 mt-1">{employeeData.emergencyContact.primary.address}</p>
              </div>
            </div>
          </div>
          
          {/* Secondary Contact */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900">Secondary Contact</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Name</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.emergencyContact.secondary.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Relationship</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.emergencyContact.secondary.relationship}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Phone</span>
                <a href={`tel:${employeeData.emergencyContact.secondary.phone}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                  {employeeData.emergencyContact.secondary.phone}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Email</span>
                <a href={`mailto:${employeeData.emergencyContact.secondary.email}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 truncate">
                  {employeeData.emergencyContact.secondary.email}
                </a>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Address</span>
                <p className="text-sm font-semibold text-slate-900 mt-1">{employeeData.emergencyContact.secondary.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education and Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Education Qualification */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Education Qualification</h2>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-emerald-50" onClick={() => openModal('education')}>
              <Edit2 className="w-4 h-4 cursor-pointer" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {employeeData.education.map((edu, index) => (
              <div key={index} className="relative pl-6 pb-4 border-l-2 border-emerald-200 last:border-l-0 last:pb-0">
                <div className="absolute left-0 top-0 w-3 h-3 bg-emerald-500 rounded-full -translate-x-1/2"></div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-100">
                  <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                  <p className="text-slate-600 text-sm">{edu.field}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">{edu.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Details */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Experience Details</h2>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50" onClick={() => openModal('experience')}>
              <Edit2 className="w-4 h-4 cursor-pointer" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {employeeData.experience.map((exp, index) => (
              <div key={index} className="relative pl-6 pb-4 border-l-2 border-blue-200 last:border-l-0 last:pb-0">
                <div className="absolute left-0 top-0 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2"></div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                  <h3 className="font-semibold text-slate-900">{exp.role}</h3>
                  <p className="text-slate-600 text-sm">{exp.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">{exp.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bank Account and Passport */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bank Account */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Bank Account</h2>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-green-50" onClick={() => openModal('bank')}>
              <Edit2 className="w-4 h-4 cursor-pointer" />
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Account Holder Name</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.bankAccount.accountHolderName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Account Number</span>
                <span className="text-sm font-semibold text-slate-900 font-mono">{employeeData.bankAccount.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Bank Name</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.bankAccount.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Branch Name</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.bankAccount.branchName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">SWIFT Code</span>
                <span className="text-sm font-semibold text-slate-900 font-mono">{employeeData.bankAccount.swiftCode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Passport Information */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Passport Information</h2>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-indigo-50" onClick={() => openModal('passport')}>
              <Edit2 className="w-4 h-4 cursor-pointer" />
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Passport Number</span>
                <span className="text-sm font-semibold text-slate-900 font-mono">{employeeData.passport.passportNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Nationality</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.passport.nationality}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Issue Date</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.passport.issueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Expiry Date</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.passport.expiryDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Scan Copy</span>
                <a 
                  href={employeeData.passport.scanCopy} 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  View Document
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EmployeeModals 
        activeModal={activeModal}
        closeModal={closeModal}
        employeeData={employeeData}
        uploadedFile={uploadedFile}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
      />
    </div>
  )
}
