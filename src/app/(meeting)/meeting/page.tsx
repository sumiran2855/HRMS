"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useMeeting } from "@/hooks/meeting/useMeeting"
import {
  MeetingFilters,
  MeetingModal,
  MeetingPagination,
  MeetingStatsCards,
  MeetingTable,
  ViewMeetingModal,
} from "@/components/dashboard/meeting"

export default function MeetingPage() {
  const m = useMeeting()

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 md:p-8">
        <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Meeting Management</h1>
            <p className="text-slate-600 mt-2 text-sm md:text-base">
              Manage meetings with complete client, project, and attendee details in one workflow.
            </p>
          </div>
          <Button
            onClick={m.handleAdd}
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Meeting
          </Button>
        </div>
      </section>

      <MeetingStatsCards stats={m.stats} />

      <MeetingFilters
        searchQuery={m.searchQuery}
        setSearchQuery={m.setSearchQuery}
        selectedStatus={m.selectedStatus}
        setSelectedStatus={m.setSelectedStatus}
        selectedType={m.selectedType}
        setSelectedType={m.setSelectedType}
        clearFilters={m.clearFilters}
      />

      <MeetingTable
        meetings={m.paginatedMeetings}
        filteredCount={m.filteredMeetings.length}
        onView={m.handleView}
        onEdit={m.handleEdit}
        clearFilters={m.clearFilters}
      />

      <MeetingPagination
        totalPages={m.totalPages}
        currentPage={m.currentPage}
        rowsPerPage={m.rowsPerPage}
        setRowsPerPage={m.setRowsPerPage}
        goToPage={m.goToPage}
        filteredCount={m.filteredMeetings.length}
      />

      <MeetingModal
        key={m.formModalKey}
        isOpen={m.addEditOpen}
        onClose={m.handleCloseAddEdit}
        onSubmit={m.handleSubmitMeeting}
        meeting={m.selectedMeeting}
      />

      <ViewMeetingModal isOpen={m.viewOpen} onClose={m.handleCloseView} meeting={m.selectedMeeting} />
    </div>
  )
}
