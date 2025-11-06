"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Revenue Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="revenue" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
