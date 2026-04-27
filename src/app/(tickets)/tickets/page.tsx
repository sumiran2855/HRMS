"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useTicket } from "@/hooks/ticket/useTicket"
import {
  TicketActionModal,
  TicketFilters,
  TicketModal,
  TicketPagination,
  TicketStatsCards,
  TicketTable,
  ViewTicketModal,
} from "@/components/dashboard/tickets"

export default function TicketsPage() {
  const t = useTicket()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ticket Management</h1>
          <p className="text-slate-500 text-sm mt-1">Track support requests, assignments, and resolution workflow.</p>
        </div>
        <Button
          onClick={() => {
            t.setAddOpen(true)
          }}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Ticket
        </Button>
      </div>

      <TicketStatsCards stats={t.stats} />

      <TicketFilters
        searchQuery={t.searchQuery}
        setSearchQuery={t.setSearchQuery}
        selectedCategory={t.selectedCategory}
        setSelectedCategory={t.setSelectedCategory}
        selectedStatus={t.selectedStatus}
        setSelectedStatus={t.setSelectedStatus}
        selectedPriority={t.selectedPriority}
        setSelectedPriority={t.setSelectedPriority}
      />

      <TicketTable
        tickets={t.paginatedTickets}
        filteredCount={t.filteredTickets.length}
        clearFilters={t.clearFilters}
        onView={t.handleView}
        onEdit={t.handleEdit}
        activeRole="hr"
        onAction={t.openActionModal}
      />

      <TicketPagination
        totalPages={t.totalPages}
        currentPage={t.currentPage}
        rowsPerPage={t.rowsPerPage}
        setRowsPerPage={t.setRowsPerPage}
        goToPage={t.goToPage}
        filteredCount={t.filteredTickets.length}
      />

      <TicketModal
        key={t.selectedTicket?.id ?? (t.addOpen ? "new-ticket-open" : "new-ticket-closed")}
        isOpen={t.addOpen}
        onClose={() => t.setAddOpen(false)}
        ticket={t.selectedTicket}
        onSubmit={t.handleSaveTicket}
      />

      <ViewTicketModal
        isOpen={t.viewOpen}
        onClose={t.handleCloseView}
        ticket={t.selectedTicket}
      />

      <TicketActionModal
        isOpen={t.actionOpen}
        actionType={t.actionType}
        ticket={t.selectedTicket}
        onClose={t.closeActionModal}
        onConfirm={t.confirmAction}
      />
    </div>
  )
}
