import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  )
}
