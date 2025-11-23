"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getStudentById } from "@/lib/slices/studentsSlice";
import { getPaymentsByStudent } from "@/lib/slices/paymentsSlice";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  CreditCard,
  Loader2,
} from "lucide-react";
import { formatMongoDate } from "@/common/commonAction";

const StudentDetails = ({ studentId }: { studentId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    student,
    isLoading: studentLoading,
    error: studentError,
  } = useSelector((state: RootState) => state.students);

  console.log(student);

  const {
    payments,
    totalPaid,
    totalPending,
    totalAmount,
    isLoading: paymentsLoading,
    error: paymentsError,
  } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    if (studentId) {
      dispatch(getStudentById(studentId));
      dispatch(getPaymentsByStudent(studentId));
    }
  }, [dispatch, studentId]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
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

  if (studentLoading || paymentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // if (studentError || paymentsError) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen text-red-500">
  //       Error: {studentError || paymentsError}
  //     </div>
  //   );
  // }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        No student found.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </Button>

      {/* Student Info */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center space-x-4 border-b pb-4">
          <Avatar className="h-16 w-16">
            {/* <AvatarImage src={student?.user?.profileImage || ""} /> */}
            <AvatarFallback>
              {student?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-semibold">
              {student?.user?.name}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {student?.user?.email}
            </p>
            <p className="text-muted-foreground text-sm">
              📞 {student?.user?.phone || "No phone provided"}
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p className="font-semibold">{student?.address || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Fee</p>
            <p className="font-semibold">₹{student?.fee}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Timing</p>
            <p className="font-semibold">{student?.timing}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <Badge
              variant={
                student?.status === "active" ? "default" : "destructive"
              }
            >
              {student?.status || "Unknown"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="payments" className="w-full">
        {/* <TabsList className="mb-4">
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList> */}

        {/* Payment History Tab */}
        <TabsContent value="payments">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">₹{totalPaid}</p>
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

          {/* Payment Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
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
                    No transactions yet for this student.
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
                          <TableCell className="font-mono text-sm">
                            {payment.razorpayPaymentId || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reminders Tab */}
        <TabsContent value="reminders">
          <Card>
            <CardHeader>
              <CardTitle>Reminders</CardTitle>
              <CardDescription>
                Reminders and notifications will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                No reminders set for this student yet.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetails;
