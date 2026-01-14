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
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
            level > 0 ? "ml-6 text-sm" : "",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
            !isOpen && "lg:justify-center lg:px-2",
          )}
        >
          <span
            className={cn(
              "flex-shrink-0",
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
            )}
          >
            {iconMap[item.icon] || <FileText className="h-5 w-5" />}
          </span>
          <span className={cn("font-medium truncate", !isOpen && "lg:hidden")}>{item.label}</span>
        </Link>
      )
    }

    return (
      <div key={item.id} className="space-y-1">
        <button
          onClick={() => isOpen && toggleExpanded(item.id)}
          className={cn(
            "flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200 group",
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
            !isOpen && "lg:justify-center lg:px-2",
          )}
        >
          <div className={cn("flex items-center gap-3", !isOpen && "lg:gap-0")}>
            <span
              className={cn(
                "flex-shrink-0",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              {iconMap[item.icon] || <FileText className="h-5 w-5" />}
            </span>
            <span className={cn("font-medium truncate", !isOpen && "lg:hidden")}>{item.label}</span>
          </div>
          {isOpen && (
            <span className="text-muted-foreground">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          )}
        </button>
        {isExpanded && isOpen && (
          <div className="space-y-1">{item.children?.map((child) => renderSidebarItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={toggleSidebar}
      />

      <aside
        className={cn(
          "fixed z-50 inset-y-0 left-0 bg-card border-r border-border transition-all duration-300 ease-in-out",
          isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex-shrink-0">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <span className={cn("text-xl font-bold text-foreground transition-opacity", !isOpen && "lg:hidden")}>
            HRMS
          </span>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          <p
            className={cn(
              "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
              !isOpen && "lg:text-center lg:px-0",
            )}
          >
            {isOpen ? "Main" : <span className="hidden lg:inline">-</span>}
            <span className={cn(!isOpen && "lg:hidden")}></span>
          </p>
          {sidebarConfig.map((item) => renderSidebarItem(item))}
        </nav>
      </aside>
    </>
  )
}
