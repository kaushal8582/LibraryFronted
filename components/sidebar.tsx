"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Users,
  CreditCard,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const { userFullData } = useSelector((state: RootState) => state.auth);
  const role = userFullData?.role;
  

  // Define all routes (base)
  const baseLinks = [
    { href: "/", label: "Dashboard", icon: LayoutGrid },
    { href: "/students", label: "Students", icon: Users },
    { href: "/payments", label: "Payments", icon: CreditCard },
    
    { href: "/reminders", label: "Reminders", icon: Bell },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/student/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/student/payments", label: "Student Payments", icon: CreditCard },
    { href: "/student/payment", label: "Make Payment", icon: Bell },
  ];

  // Filter links based on user role
  const links = baseLinks.filter((link) => {
    if (role === "student") {
      // student dashboard should show minimal options
      return [ "/student/dashboard","/student/payments","/student/payment"].includes(link.href);
    }
    if (role === "librarian") {
      // librarian has full access except /student
      return [ "/","/students","/payments","/reminders","/settings"].includes(link.href);
    }
    if (role === "admin") {
      // admin sees all
      return true;
    }
    return false;
  });

  const router = useRouter();
  
  // Only redirect once when role is first loaded and we're not on a valid route
  useEffect(() => {
    if (!role) return; // Don't do anything if role isn't loaded yet
    
    // Define valid routes for each role
    const validStudentRoutes = ["/student/dashboard", "/student/payments", "/student/payment"];
    const validLibrarianRoutes = ["/", "/students", "/payments", "/reminders", "/settings"];
    
    // Check if current path is valid for the role
    const isOnValidRoute = 
      (role === "student" && validStudentRoutes.includes(pathname)) ||
      (role === "librarian" && validLibrarianRoutes.includes(pathname)) ||
      (role === "admin" && pathname !== "/auth/login"); // Admin can access everything except login
    
    // Only redirect if we're not on a valid route for this role
    if (!isOnValidRoute) {
      if (role === "student") {
        router.push("/student/dashboard");
      } else if (role === "librarian") {
        router.push("/");
      }
      // Admin doesn't need redirect, they can access everything
    }
  }, [role, pathname]) // Add pathname to dependencies

  return (
    <div className="hidden md:flex w-64 border-r border-border bg-sidebar p-6 flex-col">
      {/* ---- Logo Section ---- */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">L</span>
        </div>
        <h1 className="text-xl font-bold text-sidebar-foreground">LibTrack</h1>
      </div>

      {/* ---- Navigation Links ---- */}
      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ---- Logout Button ---- */}
      <button
        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        onClick={() => {
          localStorage.removeItem("accessToken");
          router.push("/auth/login");
        }}
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
