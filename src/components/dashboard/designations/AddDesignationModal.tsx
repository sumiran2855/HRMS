"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { X, Briefcase, DollarSign } from "lucide-react"

interface AddDesignationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddDesignationModal({ isOpen, onClose }: AddDesignationModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    level: "",
    description: "",
    skills: "",
    minSalary: "",
    maxSalary: "",
    status: "active"
  })

  const departments = ["Engineering", "Product", "Design", "Human Resources", "Marketing", "Sales", "Finance"]
  const levels = ["Junior", "Mid", "Senior", "Lead", "Principal"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding designation:", formData)
    onClose()
    setFormData({
      title: "",
      department: "",
      level: "",
      description: "",
      skills: "",
      minSalary: "",
      maxSalary: "",
      status: "active"
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Add New Designation
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Designation Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Senior Developer"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level *</Label>
                  <select
                    id="level"
                    value={formData.level}
                    onChange={(e) => handleInputChange("level", e.target.value)}
                    className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
                    required
                  >
                    <option value="">Select Level</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Describe the role and responsibilities..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g. React, Node.js, TypeScript (comma-separated)"
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                />
                <p className="text-xs text-slate-500">Enter skills separated by commas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minSalary" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Minimum Salary
                  </Label>
                  <Input
                    id="minSalary"
                    type="number"
                    placeholder="e.g. 50000"
                    value={formData.minSalary}
                    onChange={(e) => handleInputChange("minSalary", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxSalary" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Maximum Salary
                  </Label>
                  <Input
                    id="maxSalary"
                    type="number"
                    placeholder="e.g. 80000"
                    value={formData.maxSalary}
                    onChange={(e) => handleInputChange("maxSalary", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  Add Designation
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
