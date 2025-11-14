"use client";

import { RootState } from "@/lib/store";
import { Search, Bell } from "lucide-react";
import { useSelector } from "react-redux";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { userFullData } = useSelector((state: RootState) => state.auth);

  return (
    <header className="border-b border-border bg-background sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex-1">
          {title && (
            <div className="">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 ml-8">
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
              JD
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">
                {userFullData?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {userFullData?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
