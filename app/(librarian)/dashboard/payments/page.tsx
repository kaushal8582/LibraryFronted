import { Sidebar } from "@/components/sidebar"
import { Payments } from "@/components/pages/payments"

export default function PaymentsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Payments />
      </main>
    </div>
  )
}
