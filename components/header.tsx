"use client"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border p-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </header>
  )
}
