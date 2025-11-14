"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppDispatch, RootState } from "@/lib/store";
import {
  Loader2,
  Calendar,
  DollarSign,
  CreditCard,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sidebar } from "@/components/sidebar";
import { getPaymentsByStudent } from "@/lib/slices/paymentsSlice";
import { formatMongoDate } from "@/common/commonAction";

interface Payment {
  _id: string;
  amount: number;
  status: "pending" | "paid" | "failed";
  month: string;
  year: number;
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  libraryId: string;
  studentId: string;
  createdAt: string;
}

export default function StudentPayments() {
  const router = useRouter();
  const { user, userFullData, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const { payments,totalPaid,totalPending,totalAmount } = useSelector(
    (state: RootState) => state.payments
  );
  // const [payments, setPayments] = useState<Payment[]>([]);
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // router.push("/auth/login");
      // return;
    }

    if (isAuthenticated && userFullData) {
      fetchStudentPayments();
    }
  }, [isAuthenticated, isLoading, router, userFullData]);

  const fetchStudentPayments = async () => {
    await dispatch(getPaymentsByStudent(userFullData?._id!));
  };

  // const filteredPayments = payments.filter((payment) => {
  //   if (monthFilter && payment.month !== monthFilter) return false;
  //   if (yearFilter && payment.year !== parseInt(yearFilter)) return false;
  //   return true;
  // });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  // if (isLoading || loadingPayments) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <Loader2 className="h-8 w-8 animate-spin" />
  //     </div>
  //   );
  // }

  if (!isAuthenticated || !userFullData) {
    // return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Payment History</h1>
              <p className="text-muted-foreground">
                View all your payment transactions and history
              </p>
            </div>
            <Button onClick={() => router.push("/student/payment")}>
              <CreditCard className="h-4 w-4 mr-2" />
              Make Payment
            </Button>
          </div>

        

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Total Paid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  ₹{totalPaid}
                  
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Pending Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600">
                  {totalPending}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Total Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalAmount}</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Records</CardTitle>
              <CardDescription>
                Showing {payments.length} payment
                {payments.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (  
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No payment records found</p>
                  <p className="text-sm mt-2">
                    Try adjusting your filters or make your first payment
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month/Year</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Transaction ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment._id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {payment.month} 
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              ₹{payment.amount}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(payment.status)}
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {payment.paymentDate
                              ? formatMongoDate(payment.paymentDate)
                              : "Not paid"}
                          </TableCell>
                          <TableCell>
                            {payment.paymentMethod || "N/A"}
                          </TableCell>
                          <TableCell>
                            <span className="font-mono text-sm">
                              {payment.razorpayPaymentId || "N/A"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Card */}
          
        </div>
      </main>
    </div>
  );
}
