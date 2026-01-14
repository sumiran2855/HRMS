"use client"

import { useState } from "react"
import { useSidebarStore } from "@/store/useSidebarStore"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Bell, Mail, Search, Menu, ChevronDown, LogOut, User, Settings, Globe, Sliders } from "lucide-react"

export function Navbar() {
  const { toggleSidebar } = useSidebarStore()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="flex h-20 items-center px-4 lg:px-6 gap-4">
        <Button variant="ghost" size="sm" className="shrink-0" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="hidden sm:block">
          <h2 className="text-lg font-semibold text-foreground">
            Hello Thomas <span className="inline-block animate-pulse">👋</span>
          </h2>
        </div>

        <div className="flex-1 max-w-md ml-auto">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Here . . ."
              className="pr-10 bg-secondary border-border placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground relative">
            <Mail className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
          </Button>

          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 ml-2">
                <Avatar className="h-9 w-9 border-2 border-primary/30">
                  <AvatarImage src="/professional-man-avatar.png" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground">JS</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-foreground">Jhon Smith</span>
                  <span className="text-xs text-success flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    online
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-4" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Jhon Smith</p>
                  <p className="text-xs text-muted-foreground">jhon.smith@company.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
