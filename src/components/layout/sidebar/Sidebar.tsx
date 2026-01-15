"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebarStore, type SidebarItem, sidebarConfig } from "@/store/useSidebarStore"
import { cn } from "@/components/utils"
import {
  LayoutDashboard,
  Users,
  UserCircle,
  BarChart3,
  Building2,
  Grid3X3,
  CreditCard,
  Wallet,
  FolderKanban,
  Activity,
  BookOpen,
  LogOut,
  TrendingUp,
  Award,
  Calendar,
  Ticket,
  Shuffle,
  XCircle,
  FileText,
  ChevronDown,
  ChevronRight,
  BadgeCheck,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  "user-group": <Users className="h-5 w-5" />,
  "user-circle": <UserCircle className="h-5 w-5" />,
  "chart-bar": <BarChart3 className="h-5 w-5" />,
  building: <Building2 className="h-5 w-5" />,
  grid: <Grid3X3 className="h-5 w-5" />,
  "credit-card": <CreditCard className="h-5 w-5" />,
  wallet: <Wallet className="h-5 w-5" />,
  folder: <FolderKanban className="h-5 w-5" />,
  activity: <Activity className="h-5 w-5" />,
  book: <BookOpen className="h-5 w-5" />,
  "log-out": <LogOut className="h-5 w-5" />,
  "trending-up": <TrendingUp className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  calendar: <Calendar className="h-5 w-5" />,
  ticket: <Ticket className="h-5 w-5" />,
  shuffle: <Shuffle className="h-5 w-5" />,
  "x-circle": <XCircle className="h-5 w-5" />,
  "file-text": <FileText className="h-5 w-5" />,
  "badge-check": <BadgeCheck className="h-5 w-5" />,
}

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, expandedItems, toggleSidebar, toggleExpanded } = useSidebarStore()

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.children && item.children.length > 0

    if (!hasChildren) {
      return (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
            level > 0 ? "ml-6 text-sm" : "",
            isActive
              ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-sm border border-primary/20"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
            !isOpen && "lg:justify-center lg:px-2",
          )}
        >
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
          )}
          <span
            className={cn(
              "flex-shrink-0 transition-transform duration-200",
              isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground group-hover:scale-105",
            )}
          >
            {iconMap[item.icon] || <FileText className="h-5 w-5" />}
          </span>
          <span className={cn("font-medium truncate", !isOpen && "lg:hidden")}>{item.label}</span>
          {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
        </Link>
      )
    }

    return (
      <div key={item.id} className="space-y-1">
        <button
          onClick={() => isOpen && toggleExpanded(item.id)}
          className={cn(
            "flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl transition-all duration-200 group relative",
            isActive
              ? "text-primary bg-primary/5"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
            !isOpen && "lg:justify-center lg:px-2",
          )}
        >
          <div className={cn("flex items-center gap-3", !isOpen && "lg:gap-0")}>
            <span
              className={cn(
                "flex-shrink-0 transition-transform duration-200",
                isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground group-hover:scale-105",
              )}
            >
              {iconMap[item.icon] || <FileText className="h-5 w-5" />}
            </span>
            <span className={cn("font-medium truncate", !isOpen && "lg:hidden")}>{item.label}</span>
          </div>
          {isOpen && (
            <span className={cn("text-muted-foreground transition-transform duration-200", isExpanded && "rotate-0")}>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          )}
        </button>
        {isExpanded && isOpen && (
          <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">{item.children?.map((child) => renderSidebarItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={toggleSidebar}
      />

      <aside
        className={cn(
          "fixed z-50 inset-y-0 left-0 bg-gradient-to-b from-card via-card to-card/95 border-r border-border/50 shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-xl",
          isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-blue-600 flex-shrink-0 shadow-lg shadow-primary/20 ring-2 ring-primary/10">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <div className={cn("transition-opacity", !isOpen && "lg:hidden")}>
            <span className="text-xl font-bold text-foreground tracking-tight">HRMS</span>
            <p className="text-xs text-muted-foreground font-medium">Management System</p>
          </div>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-96px)] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <p
            className={cn(
              "px-3 py-2 text-xs font-bold text-muted-foreground/80 uppercase tracking-wider",
              !isOpen && "lg:text-center lg:px-0",
            )}
          >
            {isOpen ? "Main Menu" : <span className="hidden lg:inline">•</span>}
            <span className={cn(!isOpen && "lg:hidden")}></span>
          </p>
          <div className="space-y-1">
            {sidebarConfig.map((item) => renderSidebarItem(item))}
          </div>
        </nav>
      </aside>
    </>
  )
}
