"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Users, CreditCard, Bell, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutGrid },
    { href: "/students", label: "Students", icon: Users },
    { href: "/payments", label: "Payments", icon: CreditCard },
    { href: "/reminders", label: "Reminders", icon: Bell },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="hidden md:flex w-64 border-r border-border bg-sidebar p-6 flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold">L</span>
        </div>
        <h1 className="text-xl font-bold text-sidebar-foreground">LibTrack</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  )
}
