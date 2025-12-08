"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { Header } from "@/components/header";
import { StatCard } from "@/components/stat-card";
import { RevenueChart } from "@/components/revenue-chart";
import { RecentPayments } from "@/components/recent-payments";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getPaymentsByLibrary } from "@/lib/slices/paymentsSlice";
import {
  fetchLibraryAnalytics,
  fetchLibrarySummary,
} from "@/lib/slices/dashboardSlice";
import MonthPicker from "../MonthSelector";
import DashboardSkeleton from '@/components/loaders/DashboardSkeleton';

export function Dashboard() {
  const { analytics, summary,isLoading } = useSelector(
    (state: RootState) => state.dashboard
  );
  const { libraryPayments } = useSelector((state: RootState) => state.payments);
  const { userFullData } = useSelector((state: RootState) => state.auth);
  const [month,setMonth] = useState<any>(null)

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!userFullData?.libraryId) return;
    dispatch(getPaymentsByLibrary({ libraryId: userFullData?.libraryId!,page:1,limit : 10 }));

    dispatch(fetchLibrarySummary({ libraryId: userFullData?.libraryId!,month }));
    dispatch(fetchLibraryAnalytics({ libraryId: userFullData?.libraryId! }));
  }, [userFullData?.libraryId,month]);

  return (
    <div>
      <Header title="Dashboard" subtitle="" />
      <div className="flex items-center justify-start gap-2 pt-3 pl-8" >

      <h3>Select Month</h3>

        <MonthPicker
          onChange={(value) => {
           setMonth(value)
          }}
        />
      </div>

      {
        isLoading ? <DashboardSkeleton/> :     <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={summary?.totalStudents || 0}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Pending Payments"
            value={summary?.totalPendingPayments || 0}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Paid Students (This Month)"
            value={summary?.totalPaidPayments || 0}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Total Revenue (This Month)"
            value={summary?.totalRevenue || 0}
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>

        {/* Charts and Recent Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart data={summary?.monthlyRevenue || []} />
          <RecentPayments payments={libraryPayments.slice(0, 5)} />
        </div>
      </div>
      }

  

    
    </div>
  );
}
