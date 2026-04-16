"use client"

import { useLeaveManagement } from "@/hooks/leave/useLeaveManagement"
import LeaveStatsCards from "@/components/dashboard/leave-management/LeaveStatsCards"
import LeaveBalanceCards from "@/components/dashboard/leave-management/LeaveBalanceCards"
import LeaveTabs from "@/components/dashboard/leave-management/LeaveTabs"
import LeaveFilters from "@/components/dashboard/leave-management/LeaveFilters"
import LeaveTable from "@/components/dashboard/leave-management/LeaveTable"
import LeaveApprovalTable from "@/components/dashboard/leave-management/LeaveApprovalTable"
import LeaveApplyForm from "@/components/dashboard/leave-management/LeaveApplyForm"
import LeaveCalendar from "@/components/dashboard/leave-management/LeaveCalendar"

export default function LeaveManagementPage() {
  const {
    activeTab, setActiveTab,
    search, setSearch,
    statusFilter, setStatusFilter,
    selectedMonth, prevMonth, nextMonth, monthLabel,
    formData, setFormData, submitted, setSubmitted,
    stats, filteredMyLeaves, filteredRequests,
    calendarCells, leaveDays, allLeaves,
    handleSubmitLeave,
  } = useLeaveManagement()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-5 pb-12">
        {/* Page Title */}
        <div className="pt-7 pb-5">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Leave Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage, apply, and approve leave requests — all in one place.
          </p>
        </div>

        <LeaveTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <LeaveStatsCards stats={stats} />
            <LeaveBalanceCards />
          </div>
        )}

        {/* Apply */}
        {activeTab === "apply" && (
          <LeaveApplyForm
            formData={formData}
            setFormData={setFormData}
            submitted={submitted}
            setSubmitted={setSubmitted}
            onSubmit={handleSubmitLeave}
          />
        )}

        {/* My Leaves */}
        {activeTab === "my-leaves" && (
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
            <LeaveFilters search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            <LeaveTable rows={filteredMyLeaves} />
          </div>
        )}

        {/* Approvals */}
        {activeTab === "approve" && (
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
            <LeaveFilters search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            <LeaveApprovalTable rows={filteredRequests} />
          </div>
        )}

        {/* Calendar */}
        {activeTab === "calendar" && (
          <LeaveCalendar
            monthLabel={monthLabel}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            calendarCells={calendarCells}
            leaveDays={leaveDays}
            selectedMonth={selectedMonth}
            allLeaves={allLeaves}
          />
        )}
      </div>
    </div>
  )
}
