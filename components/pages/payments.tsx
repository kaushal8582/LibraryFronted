"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Download, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect } from "react"
import { getPaymentsByLibrary } from "@/lib/slices/paymentsSlice"

export function Payments() {
  const dispatch = useDispatch<AppDispatch>()
  const { libraryPayments  } = useSelector((state: RootState) => state.payments)
  const { userFullData,  } = useSelector((state: RootState) => state.auth)

  // const startIndex = (currentPage - 1) * itemsPerPage
  // const endIndex = startIndex + itemsPerPage
  // const paginatedPayments = payments.slice(startIndex, endIndex)
  // const totalPages = Math.ceil(payments.length / itemsPerPage)

  useEffect(()=>{
    if(!userFullData?.libraryId) return
    dispatch(getPaymentsByLibrary(userFullData?.libraryId!))
  },[userFullData?.libraryId])



  return (
    <div>
      <Header title="Payments & Transactions" />

      <div className="p-8 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <select
              value={'Last 30 Days'}
              onChange={(e) => console.log(e.target.value)}
              className="px-4 py-2 rounded-lg bg-card border border-border text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Last 30 Days</option>
              <option>Last 60 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {libraryPayments.map((payment) => (
                <tr key={payment._id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{payment.user.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">${payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{payment.razorpayPaymentId}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {/* <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, payments.length)} of {payments.length} results
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
                disabled={currentPage === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
