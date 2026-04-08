"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar/Navbar"
import Sidebar from "@/components/layout/sidebar/Sidebar"
import { useSidebarStore } from "@/store/useSidebarStore"

export default function ERPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen } = useSidebarStore()

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className={`transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-16"}`}>
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
