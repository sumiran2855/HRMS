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
import { Bell, Mail, Search, Menu, ChevronDown, LogOut, User, Settings } from "lucide-react"

export function Navbar() {
  const { toggleSidebar } = useSidebarStore()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="bg-gradient-to-r from-card via-card to-card/95 border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
      <div className="flex h-21 items-center px-6 lg:px-8 gap-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="shrink-0 hover:bg-accent/50 transition-all duration-200 rounded-lg h-10 w-10 p-0" 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5 text-foreground/80 cursor-pointer" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="hidden sm:block">
          <h2 className="text-base font-semibold text-foreground tracking-tight">
            Hello, <span className="text-primary font-bold">Thomas</span>
            <span className="inline-block ml-1.5 animate-pulse">👋</span>
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

        <div className="flex items-center gap-2">
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50 relative h-10 w-10 p-0 rounded-lg transition-all duration-200"
          >
            <Mail className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full ring-2 ring-card animate-pulse" />
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50 relative h-10 w-10 p-0 rounded-lg transition-all duration-200"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full ring-2 ring-card animate-pulse" />
          </Button>

          <div className="hidden md:block w-px h-8 bg-border/50 mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-3 h-12 rounded-lg transition-all duration-200">
                <Avatar className="h-9 w-9 ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all duration-200 hover:ring-primary/40">
                  <AvatarImage src="/professional-man-avatar.png" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm">JS</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-semibold text-foreground">Jhon Smith</span>
                  <span className="text-xs text-success flex items-center gap-1.5 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse shadow-sm shadow-success/50" />
                    Online
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground/70 hidden md:block transition-transform duration-200 group-hover:translate-y-0.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-54 mt-4 rounded-xl border-border/50 shadow-lg py-2 px-3 ml-10" align="end">
              <DropdownMenuLabel className="font-normal py-3">
                <div className="flex flex-col space-y-1.5">
                  <p className="text-sm font-semibold text-foreground">Jhon Smith</p>
                  <p className="text-xs text-muted-foreground font-medium">jhon.smith@company.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="cursor-pointer py-2.5 rounded-lg mx-1 transition-colors">
                <User className="mr-3 h-4 w-4" />
                <span className="font-medium">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2.5 rounded-lg mx-1 transition-colors">
                <Settings className="mr-3 h-4 w-4" />
                <span className="font-medium">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="cursor-pointer py-2.5 rounded-lg mx-1 text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors">
                <LogOut className="mr-3 h-4 w-4" />
                <span className="font-medium">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
