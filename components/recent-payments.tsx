import { Payment, PaymentRecord } from "@/lib/slices/paymentsSlice";

interface RecentPaymentsProps {
  payments: PaymentRecord[];
}

export function RecentPayments({ payments }: RecentPaymentsProps) {

  console.log("payments", payments);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Recent Payments</h3>
      <div className="space-y-4">
        { payments?.length>0 &&  payments.map((payment) => (
          <div key={payment._id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              <img src={payment?.user?.avtar || "/placeholder.svg"} alt={payment?.user?.name || "Student"} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-medium text-foreground">{payment?.user?.name || "Student"}</p>
                <p className="text-xs text-muted-foreground">{new Date(payment.paymentDate).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="font-semibold text-foreground">₹{payment.amount.toFixed(2)}</p>
          </div>
        ))}

        { payments?.length === 0 && (
          <div className="text-center text-muted-foreground flex justify-center items-center">
            No payments found .
          </div>
        )}

      </div>
    </div>
  )
}
