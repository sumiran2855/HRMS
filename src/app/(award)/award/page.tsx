"use client"

import { Gift, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AwardActionModal } from "@/components/dashboard/award/AwardActionModal"
import { AwardFilters } from "@/components/dashboard/award/AwardFilters"
import { AwardModal } from "@/components/dashboard/award/AwardModal"
import { AwardPagination } from "@/components/dashboard/award/AwardPagination"
import { AwardStatsCards } from "@/components/dashboard/award/AwardStatsCards"
import { AwardTable } from "@/components/dashboard/award/AwardTable"
import { ViewAwardModal } from "@/components/dashboard/award/ViewAwardModal"
import { AWARD_ROLE_OPTIONS } from "@/constants/award"
import { useAward } from "@/hooks/award/useAward"

export default function AwardPage() {
  const a = useAward()

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[28px] border border-fuchsia-100 bg-gradient-to-br from-[#fff7ed] via-[#fff1f2] to-[#f5f3ff] p-6 shadow-[0_24px_80px_-40px_rgba(217,70,239,0.45)]">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-amber-200/40 blur-3xl" />

        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-700 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Recognition hub
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Award & Recognition Center</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Celebrate impact with a more expressive experience for nominations, approvals, publishing, and reward fulfillment.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-700">
              <span className="rounded-full bg-white/80 px-3 py-1.5 font-medium shadow-sm">Peer and manager nominations</span>
              <span className="rounded-full bg-white/80 px-3 py-1.5 font-medium shadow-sm">Approval workflow visibility</span>
              <span className="rounded-full bg-white/80 px-3 py-1.5 font-medium shadow-sm">Reward publication and fulfillment</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[360px]">
            <div className="rounded-2xl border border-white/80 bg-white/75 p-4 backdrop-blur">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-fuchsia-300/40">
                <Gift className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current role view</p>
              <select
                value={a.activeRole}
                onChange={(e) => a.setActiveRole(e.target.value as typeof a.activeRole)}
                className="mt-2 w-full rounded-xl border border-fuchsia-100 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none ring-0 transition focus:border-fuchsia-300 focus-visible:ring-2 focus-visible:ring-fuchsia-400/40"
              >
                {AWARD_ROLE_OPTIONS.map((role) => (
                  <option key={role.value} value={role.value}>{role.label} View</option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-fuchsia-200 bg-slate-950 p-4 text-white shadow-xl shadow-fuchsia-200/30">
              <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-200">Quick action</p>
              <p className="mt-1 text-sm text-slate-300">Create a new nomination with evidence, reward details, and publication settings.</p>
              <Button
                onClick={() => a.setAddOpen(true)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-400/30 hover:opacity-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Award
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AwardStatsCards stats={a.stats} />

      <AwardFilters
        searchQuery={a.searchQuery}
        setSearchQuery={a.setSearchQuery}
        selectedDepartment={a.selectedDepartment}
        setSelectedDepartment={a.setSelectedDepartment}
        selectedStatus={a.selectedStatus}
        setSelectedStatus={a.setSelectedStatus}
        selectedType={a.selectedType}
        setSelectedType={a.setSelectedType}
      />

      <AwardTable
        requests={a.paginatedRequests}
        filteredCount={a.filteredRequests.length}
        clearFilters={a.clearFilters}
        onView={a.handleView}
        activeRole={a.activeRole}
        onAction={a.openActionModal}
      />

      <AwardPagination
        totalPages={a.totalPages}
        currentPage={a.currentPage}
        rowsPerPage={a.rowsPerPage}
        setRowsPerPage={a.setRowsPerPage}
        goToPage={a.goToPage}
        filteredCount={a.filteredRequests.length}
      />

      <AwardModal
        isOpen={a.addOpen}
        onClose={() => a.setAddOpen(false)}
        onSubmit={a.handleAddRequest}
      />

      <AwardModal
        isOpen={a.editOpen}
        mode="edit"
        initialRequest={a.editingRequest}
        onClose={a.closeEditModal}
        onSubmit={a.handleUpdateRequest}
      />

      <ViewAwardModal
        isOpen={a.viewOpen}
        onClose={a.handleCloseView}
        request={a.selectedRequest}
        onEdit={a.openEditModal}
        onAddComment={a.addComment}
      />

      <AwardActionModal
        isOpen={a.actionOpen}
        actionType={a.actionType}
        request={a.actionRequest}
        onClose={a.closeActionModal}
        onConfirm={a.confirmAction}
      />
    </div>
  )
}
