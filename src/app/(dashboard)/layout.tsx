"use client"

import type { ReactNode } from "react"
import { Navbar } from "@/components/layout/navbar/Navbar"
import Sidebar from "@/components/layout/sidebar/Sidebar"
import { useSidebarStore } from "@/store/useSidebarStore"
import { cn } from "@/components/utils"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { isOpen } = useSidebarStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className={cn("transition-all duration-300 flex flex-col h-screen", isOpen ? "lg:ml-64" : "lg:ml-0")}>
        <Navbar />

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto mt-0">{children}</main>
      </div>
    </div>
  )
}
