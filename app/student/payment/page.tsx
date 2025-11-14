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
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sidebar } from "@/components/sidebar";
import paymentService from "@/lib/services/paymentService";
import toast from "react-hot-toast";
import { formatMongoDate } from "@/common/commonAction";
import { fetchCurrentUser } from "@/lib/slices/authSlice";

interface PendingPayment {
  _id: string;
  month: string;
  year: number;
  amount: number;
  status: "pending";
  dueDate: string;
}

export default function StudentPayment() {
  const router = useRouter();
  const { user, userFullData, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();

  async function handlePayment() {
    try {
      // 🟢 STEP 1: Create Razorpay order from backend
      // --------------------------------------------
      // We call our backend API via paymentService.createOrder().
      // It returns a Razorpay order_id which we’ll use to open the checkout popup.
      const res: any = await paymentService.createOrder({
        amount: 500, // amount in INR (backend should convert to paise)
        studentId: userFullData?._id || "",
        libraryId: userFullData?.libraryId || "",
      });

      // console.log("🧾 Order created successfully:", res);

      if (!res?.razorpayOrder?.id) {
        toast.error("Failed to create payment order");
        return;
      }

      // 🟡 STEP 2: Initialize Razorpay checkout
      // --------------------------------------
      // When order is successfully created, open Razorpay payment window.
      // The handler defined in initializeRazorpay will get triggered after payment.
      paymentService.initializeRazorpay(
        res.razorpayOrder.id, // Razorpay order ID
        res.razorpayOrder.amount, // Amount in paise
        userFullData?.name || "Student", // Prefill name
        userFullData?.email || "student@example.com", // Prefill email
        userFullData?.phone || "9999999999", // Prefill phone

        // ✅ Success callback
        async function onSuccess(response) {
          // console.log("✅ Payment successful:", response);

          // 🟢 STEP 3: Verify payment on backend
          // ------------------------------------
          // We call backend again to verify the Razorpay signature.
          // This ensures the payment is genuine and successful.
          try {
            const verifyRes = await paymentService.verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );

            // console.log("🔍 Verification result:", verifyRes);

            dispatch(fetchCurrentUser());

            // if (verifyRes.status) {
            //   toast.success("Payment successful and verified ✅");

            //   // 🟣 STEP 4: Update your frontend or redirect
            //   // ------------------------------------------
            //   // You can now update your local DB/UI state or navigate user to a success page
            //   // e.g.:
            //   // await updatePaymentStatusInDB(response.razorpay_order_id);
            //   // router.push("/payment-success");
            // } else {
            //   toast.error("Payment verification failed ❌");
            // }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Error verifying payment");
          }
        },

        // ❌ Failure callback
        function onFailure(error) {
          console.error("Payment failed or cancelled:", error);
          toast.error("Payment failed or cancelled");
        }
      );
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Something went wrong while starting payment");
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Make Payment</h1>
              <p className="text-muted-foreground">
                Pay your monthly library fees securely
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/student/payments")}
            >
              View Payment History
            </Button>
          </div>

          {/* Pending Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Pending Payments
              </CardTitle>
              <CardDescription>
                Select a pending payment to proceed with the payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userFullData?.studentData?.nextDueDate &&
              userFullData?.studentData?.nextDueDate <=
                new Date().toISOString().split("T")[0] ? (
                <button
                  onClick={handlePayment}
                  className="w-[250px] mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 
             text-white font-semibold py-2 rounded-lg 
             shadow-md hover:shadow-lg hover:-translate-y-0.5 
             transition-all duration-300 ease-in-out 
             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer"
                >
                  Make Payment 💳
                </button>
              ) : (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Great! You have no pending payments. All your payments are
                    up to date.{" "}
                    <b>
                      Next Pay Date :{" "}
                      {formatMongoDate(userFullData?.studentData?.nextDueDate!)}
                    </b>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
