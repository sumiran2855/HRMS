"use client"

import { Edit2, Phone, Mail, Calendar, MapPin, User, Globe, Facebook, Twitter, Linkedin, Instagram, Briefcase, GraduationCap, CreditCard, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useState, useEffect } from "react"
import { useEmployee } from "@/hooks/employee/useEmployee"
import { Employee } from "@/types/employee.types"
import { useParams } from "next/navigation"
import { EmployeeModals } from "@/components/dashboard/models/EmployeeModals"

export default function EmployeeProfile() {
  const params = useParams()
  const employeeId = params.id as string
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [employeeData, setEmployeeData] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { getEmployeeById } = useEmployee()

  useEffect(() => {
    fetchEmployee()
  }, [employeeId])

  const fetchEmployee = async () => {
    try {
      setLoading(true)
      const response = await getEmployeeById(employeeId)
      if (response.success && response.data) {
        setEmployeeData(response.data)
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch employee")
    } finally {
      setLoading(false)
    }
  }

  const formatPhoneNumber = (phone?: string) => phone || '-'
  const formatDate = (date?: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }
  const formatDateForInput = (date?: string) => {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-500">Loading employee details...</p>
      </div>
    )
  }

  if (error || !employeeData) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-500">{error || "Employee not found"}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
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
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    {employeeData.employeePhoto ? (
                      <img
                        src={employeeData.employeePhoto}
                        alt={`${employeeData.firstName} ${employeeData.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-semibold text-blue-600">
                        {`${employeeData.firstName} ${employeeData.lastName}`.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">{`${employeeData.firstName} ${employeeData.lastName}`}</h3>
                    <p className="text-slate-600 text-sm">{employeeData.position || '-'}</p>
                    <p className="text-slate-700 text-sm mt-2"><span className="font-semibold">Employee ID :</span> {employeeData.employeeId || employeeData._id}</p>
                    <p className="text-slate-700 text-sm"><span className="font-semibold">Date of Join :</span> {formatDate(employeeData.joiningDate)}</p>
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
                      <p className="text-sm font-semibold text-slate-900">{formatPhoneNumber(employeeData.contactInfo?.phone || employeeData.contactNumber)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">Email</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{employeeData.contactInfo?.email || employeeData.email || '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">Hire Date</p>
                      <p className="text-sm font-semibold text-slate-900">{formatDate(employeeData.contactInfo?.hireDate || employeeData.hireDate || employeeData.joiningDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">Address</p>
                      <p className="text-sm font-semibold text-slate-900">{employeeData.contactInfo?.address || employeeData.address || '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">Username</p>
                      <p className="text-sm font-semibold text-slate-900">{employeeData.contactInfo?.userName || employeeData.userName || '-'}</p>
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
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Linkedin className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">LinkedIn</p>
                  <p className="text-xs text-slate-600 truncate">{employeeData.socialProfile?.linkedin || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                  <Twitter className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Twitter</p>
                  <p className="text-xs text-slate-600 truncate">{employeeData.socialProfile?.twitter || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center group-hover:bg-blue-800 transition-colors">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Facebook</p>
                  <p className="text-xs text-slate-600 truncate">{employeeData.socialProfile?.facebook || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center group-hover:bg-pink-700 transition-colors">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Instagram</p>
                  <p className="text-xs text-slate-600 truncate">{employeeData.socialProfile?.instagram || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center group-hover:bg-green-700 transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">WhatsApp</p>
                  <p className="text-xs text-slate-600">{formatPhoneNumber(employeeData.socialProfile?.whatsapp || employeeData.contactNumber)}</p>
                </div>
              </div>
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
                <span className="text-sm font-semibold text-slate-900">{employeeData.emergencyContact?.primary?.name || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Relationship</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.emergencyContact?.primary?.relationship || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Phone</span>
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-800">{formatPhoneNumber(employeeData.emergencyContact?.primary?.phone)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Email</span>
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-800 truncate">{employeeData.emergencyContact?.primary?.email || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Address</span>
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-800 truncate">{employeeData.emergencyContact?.primary?.address || '-'}</span>
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
                <span className="text-sm font-semibold text-slate-900">{employeeData.emergencyContact?.secondary?.name || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Relationship</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.emergencyContact?.secondary?.relationship || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Phone</span>
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-800">{formatPhoneNumber(employeeData.emergencyContact?.secondary?.phone)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Email</span>
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-800 truncate">{employeeData.emergencyContact?.secondary?.email || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Address</span>
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-800 truncate">{employeeData.emergencyContact?.secondary?.address || '-'}</span>
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
            {employeeData.education && employeeData.education.length > 0 ? (
              employeeData.education.map((edu, index) => (
                <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">{edu.degree || '-'}</p>
                      <p className="text-sm text-slate-600">{edu.institution || '-'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>No education data available</p>
              </div>
            )}
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
            {employeeData.experience && employeeData.experience.length > 0 ? (
              employeeData.experience.map((exp, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">{exp.position || '-'}</p>
                      <p className="text-sm text-slate-600">{exp.company || '-'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>No experience data available</p>
              </div>
            )}
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
                <span className="text-sm font-semibold text-slate-900">{employeeData.bankDetails?.accountHolderName || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Account Number</span>
                <span className="text-sm font-semibold text-slate-900 font-mono">{employeeData.bankDetails?.accountNumber || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Bank Name</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.bankDetails?.bankName || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Branch Name</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.bankDetails?.branchName || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Salary</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.bankDetails?.salary ? `$${employeeData.bankDetails.salary.toLocaleString()}` : employeeData.salary ? `$${employeeData.salary.toLocaleString()}` : '-'}</span>
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
                <span className="text-sm font-semibold text-slate-900 font-mono">{employeeData.passport?.passportNumber || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Nationality</span>
                <span className="text-sm font-semibold text-slate-900">{employeeData.passport?.nationality || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Issue Date</span>
                <span className="text-sm font-semibold text-slate-900">{formatDate(employeeData.passport?.issueDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Expiry Date</span>
                <span className="text-sm font-semibold text-slate-900">{formatDate(employeeData.passport?.expiryDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Scan Copy</span>
                <span className="text-sm font-semibold text-slate-500">{employeeData.passport?.scanCopy || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {employeeData && (
        <EmployeeModals
          activeModal={activeModal}
          closeModal={closeModal}
          employeeData={{
            id: employeeData.employeeId || employeeData._id,
            name: `${employeeData.firstName} ${employeeData.lastName}`,
            jobTitle: employeeData.position || employeeData.employeeDesignation || '',
            position: employeeData.position || employeeData.employeeDesignation || '',
            dateOfJoin: formatDateForInput(employeeData.joiningDate) || '',
            phone: employeeData.contactNumber || '',
            email: employeeData.email || '',
            birthday: formatDateForInput(employeeData.birthday) || '',
            address: employeeData.address || '',
            gender: employeeData.gender || '',
            socialProfiles: {
              linkedin: employeeData.socialProfile?.linkedin || '-',
              twitter: employeeData.socialProfile?.twitter || '-',
              facebook: employeeData.socialProfile?.facebook || '-',
              instagram: employeeData.socialProfile?.instagram || '-',
              whatsapp: employeeData.socialProfile?.whatsapp || employeeData.contactNumber || '-'
            },
            emergencyContact: {
              primary: {
                name: employeeData.emergencyContact?.primary?.name || '-',
                relationship: employeeData.emergencyContact?.primary?.relationship || '-',
                phone: employeeData.emergencyContact?.primary?.phone || '-',
                email: employeeData.emergencyContact?.primary?.email || '-',
                address: employeeData.emergencyContact?.primary?.address || '-'
              },
              secondary: {
                name: employeeData.emergencyContact?.secondary?.name || '-',
                relationship: employeeData.emergencyContact?.secondary?.relationship || '-',
                phone: employeeData.emergencyContact?.secondary?.phone || '-',
                email: employeeData.emergencyContact?.secondary?.email || '-',
                address: employeeData.emergencyContact?.secondary?.address || '-'
              }
            },
            experience: employeeData.experience?.map(exp => ({
              company: exp.company || '',
              position: exp.position || '',
              startDate: exp.startDate || '',
              endDate: exp.endDate || ''
            })) || [],
            education: employeeData.education?.map(edu => ({
              degree: edu.degree || '',
              institution: edu.institution || '',
              fieldOfStudy: edu.fieldOfStudy || '',
              cgpa: edu.cgpa || '',
              startDate: edu.startDate || '',
              endDate: edu.endDate || ''
            })) || [],
            bankAccount: {
              accountHolderName: employeeData.bankDetails?.accountHolderName || '',
              accountNumber: employeeData.bankDetails?.accountNumber || '',
              bankName: employeeData.bankDetails?.bankName || '',
              branchName: employeeData.bankDetails?.branchName || '',
              bicCode: employeeData.bankDetails?.bicCode || '',
              salary: employeeData.bankDetails?.salary || ''
            },
            departmentId: employeeData.departmentId || '',
            hireDate: formatDateForInput(employeeData.hireDate) || '',
            passport: {
              passportNumber: employeeData.passport?.passportNumber || '-',
              nationality: employeeData.passport?.nationality || '-',
              issueDate: employeeData.passport?.issueDate || '-',
              expiryDate: employeeData.passport?.expiryDate || '-',
              scanCopy: employeeData.passport?.scanCopy || '-'
            }
          }}
          employeeId={employeeData._id}
          uploadedFile={uploadedFile}
          handleFileUpload={handleFileUpload}
          removeFile={removeFile}
          onSave={fetchEmployee}
        />
      )}
    </div>
  )
}
