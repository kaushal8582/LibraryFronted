import { apiCaller } from "@/lib/Network/api";
import toast from "react-hot-toast";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface CreateOrderResponse {
  success: boolean;
  order: {
    id: string;
    amount: number;
    currency: string;
    status: string;
  };
}

interface VerifyPaymentResponse {
  success: boolean;
  message: string;
}

interface PaymentData {
  amount: number;
  currency?: string;
  studentId: string;
  libraryId: string;
  // month: string;
  // year: number;
  paymentId?: string;
}

export const paymentService = {
  // Create Razorpay order
  async createOrder(paymentData: PaymentData): Promise<CreateOrderResponse> {
    try {
      const response = await apiCaller({
        method: "POST",
        url: "/payments/create-order",
        data: paymentData,
        showError: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create payment order");
      throw error;
    }
  },
  async testPayment(paymentData: PaymentData): Promise<CreateOrderResponse> {
    try {
      const response = await apiCaller({
        method: "POST",
        url: "/payments/test-razorpay-setup",
        data: paymentData,
        showError: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create payment order");
      throw error;
    }
  },

  // Verify payment
  async verifyPayment(
    paymentId: string,
    orderId: string,
    signature: string
  ): Promise<VerifyPaymentResponse> {
    try {
      const response = await apiCaller({
        method: "POST",
        url: "/payments/verify-payment",
        data: {
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature,
        },
        showError: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Payment verification failed");
      throw error;
    }
  },

  // Initialize Razorpay payment
  initializeRazorpay(
    orderId: string,
    amount: number,
    studentName: string,
    studentEmail: string,
    studentPhone: string,
    key: string,  
    onSuccess: (response: RazorpayResponse) => void,
    onFailure: (error: any) => void
  ): void {
    if (typeof window === "undefined" || !(window as any).Razorpay) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: key, 
      amount: amount,
      currency: "INR",
      name: "Library Management System",
      description: "Library Fee Payment",
      order_id: orderId,
      handler: function (response: RazorpayResponse) {
        onSuccess(response);
      },
      prefill: {
        name: studentName,
        email: studentEmail,
        contact: studentPhone,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled by user");
          onFailure("Payment cancelled");
        },
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    
    razorpay.on("payment.failed", function (response: any) {
      console.error("Payment failed:", response);
      toast.error(`Payment failed: ${response.error?.description || "Unknown error"}`);
      onFailure(response);
    });

    razorpay.open();
  },
};

export default paymentService;