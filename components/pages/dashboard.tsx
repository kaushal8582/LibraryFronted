"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Header } from "@/components/header"
import { StatCard } from "@/components/stat-card"
import { RevenueChart } from "@/components/revenue-chart"
import { RecentPayments } from "@/components/recent-payments"
import { TrendingUp } from "lucide-react"

export function Dashboard() {
  const { totalStudents, pendingPayments, paidStudents, totalRevenue, monthlyRevenue, recentPayments } = useSelector(
    (state: RootState) => state.dashboard,
  )

  return (
    <div>
      <Header title="Dashboard" subtitle="Last 30 Days" />

      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={totalStudents.toLocaleString()}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Pending Payments"
            value={`$${pendingPayments.toLocaleString()}`}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Paid Students (This Month)"
            value={paidStudents.toLocaleString()}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Total Revenue (This Month)"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>

        {/* Charts and Recent Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart data={monthlyRevenue} />
          <RecentPayments payments={recentPayments} />
        </div>
      </div>
    </div>
  )
}
