interface Payment {
  id: string
  name: string
  date: string
  amount: number
  avatar: string
}

interface RecentPaymentsProps {
  payments: Payment[]
}

export function RecentPayments({ payments }: RecentPaymentsProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Recent Payments</h3>
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              <img src={payment.avatar || "/placeholder.svg"} alt={payment.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-medium text-foreground">{payment.name}</p>
                <p className="text-xs text-muted-foreground">{payment.date}</p>
              </div>
            </div>
            <p className="font-semibold text-foreground">${payment.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
