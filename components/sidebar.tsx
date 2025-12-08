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
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { toggleSidebar } from "@/lib/slices/dashboardSlice";

export function Sidebar() {
  const pathname = usePathname();
  const { userFullData } = useSelector((state: RootState) => state.auth);
  const { sidebarOpen } = useSelector((state: RootState) => state.dashboard);
  const role = userFullData?.role;
  const dispatch = useDispatch<AppDispatch>();

  // Define all routes (base)
  const baseLinks = [

    { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/", label: "Home", icon: Home },

    { href: "/dashboard/students", label: "Students", icon: Users },
    { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/reminders", label: "Reminders", icon: Bell },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },

    { href: "/student/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/student/payments", label: "Student Payments", icon: CreditCard },
    { href: "/student/payment", label: "Make Payment", icon: Bell },
  ];

  // Filter links based on user role
  const links = baseLinks.filter((link) => {
    if (role === "student") {
      // student dashboard should show minimal options
      return [
        "/student/dashboard",
        "/student/payments",
        "/student/payment",
      ].includes(link.href);
    }
    if (role === "librarian") {
      // librarian has full access except /student
      return [
        "/dashboard",
  "/",

        "/dashboard/students",
        "/dashboard/payments",
        "/dashboard/reminders",
        "/dashboard/settings",
        "/",
      ].includes(link.href);
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
    const validStudentRoutes = [
      "/student/dashboard",
      "/student/payments",
      "/student/payment",
      "/",
    ];
    const validLibrarianRoutes = [
  "/dashboard",
  "/",

  "/dashboard/students",
  "/dashboard/payments",
  "/dashboard/reminders",
  "/dashboard/settings",
];

const isLibrarianValid =
  validLibrarianRoutes.includes(pathname) ||
  pathname.startsWith("/dashboard/students/"); 
  

const isOnValidRoute =
  (role === "student" && validStudentRoutes.includes(pathname)) ||
  (role === "librarian" && isLibrarianValid) ||
  (role === "admin" && pathname !== "/auth/login");

    // Only redirect if we're not on a valid route for this role
    if (!isOnValidRoute) {
      if (role === "student") {
        router.push("/student/dashboard");
      } else if (role === "librarian") {
        router.push("/dashboard");
      }
      // Admin doesn't need redirect, they can access everything
    }
  }, [role, pathname]); // Add pathname to dependencies

  return (
    <div
  className={` md:flex w-64 border-r border-border bg-sidebar p-6 flex-col ${
    sidebarOpen
      ? "block absolute top-0 left-0 h-screen z-50"
      : "hidden relative"
  }`}
>

      {/* ---- Logo Section ---- */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 ">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">
            LibTrack
          </h1>
        </div>
        {sidebarOpen && (
          <button
            className="md:hidden  flex  z-50"
            onClick={() => {
              dispatch(toggleSidebar(!sidebarOpen));
            }}
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6 text-sidebar-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
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
              onClick={() => {
                dispatch(toggleSidebar(false));
              }}
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
        className=" absolute bottom-6 flex items-center gap-3 w-[calc(100%-50px)] px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-red-400 cursor-pointer bg-red-600  transition-colors"
        onClick={() => {
          localStorage.removeItem("accessToken");
          localStorage.clear();
          router.push("/auth/login");
        }}
      >
        <LogOut className="w-5 h-5 text-white" />
        <span className="font-semibold text-white">Logout</span>
      </button>
    </div>
  );
}
