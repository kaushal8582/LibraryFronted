import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiCaller } from "../Network/api";

// ─────────────────────────────────────────────
// 1️⃣ Define Type Interfaces
// ─────────────────────────────────────────────
export interface Payment {
  _id: string;
  studentId: string;
  libraryId: string;
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  description?: string;
  month?: string;
  createdAt?: string;
  updatedAt?: string;
  // Optional joined data
  studentName?: string;
  libraryName?: string;
}
export interface PaymentRecord {
  _id: string;
  studentId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  month: string;
  razorpayOrderId: string;
  status: "pending" | "completed" | "failed" | "refunded";
  description: string;
  paymentDate: string; // ISO date string
  createdAt: string;
  updatedAt: string;
  razorpayPaymentId?: string;

  student: {
    _id: string;
    fee: string;
  };

  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    avtar : string;
  };
}


interface PaymentState {
  payments: Payment[];
  filteredPayments: Payment[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  totalPaid: number;
  totalPending: number;
  totalAmount: number;
  libraryPayments: PaymentRecord[];
  TotalInPagination : number;
}

// ─────────────────────────────────────────────
// 2️⃣ Initial State
// ─────────────────────────────────────────────
const initialState: PaymentState = {
  payments: [],
  filteredPayments: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  totalPaid: 0,
  totalPending: 0,
  totalAmount: 0,
  libraryPayments: [],
  TotalInPagination: 0,
};


// ✅ Get Payments by Student
export const getPaymentsByStudent = createAsyncThunk(
  "payments/getByStudent",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const res: any = await apiCaller({
        method: "GET",
        url: `/payments/student/${studentId}`,
      });
      return res.data; // expect { totalPaid, totalPending, totalAmount, payments: [...] }
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch payments");
    }
  }
);

export const getPaymentsByLibrary = createAsyncThunk(
  "payments/getByLibrary",
  async ({ libraryId, page, limit,lastDays }: { libraryId: string; page: number; limit: number,lastDays?: number }, { rejectWithValue }) => {
    try {
      const res: any = await apiCaller({
        method: "GET",
        url: `/payments/library/${libraryId}`,
        params: { page, limit,lastDays },
      });
      return res.data; 
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch payments");
    }
  }
);

export const makePaymentInCash = createAsyncThunk(
  "payments/makeInCash",
  async (paymentData: {
    studentId: string;
    paymentDate: string;
    numberOfMonths: number;
  }, { rejectWithValue }) => {
    try {
      const res: any = await apiCaller({
        method: "POST",
        url: `/payments/cash`,
        data: paymentData,
      });
      return res.data; 
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to make payment in cash");
    }
  }
);





// ─────────────────────────────────────────────
// 4️⃣ Slice Definition
// ─────────────────────────────────────────────
const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    searchPayments: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredPayments = state.payments.filter((p) =>
        (p.studentName || "")
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
    },
    clearPaymentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Get Payments by Student ───
      .addCase(getPaymentsByStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentsByStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload.payments || [];
        state.filteredPayments = state.payments;
        state.totalPaid = action.payload.totalPaid || 0;
        state.totalPending = action.payload.totalPending || 0;
        state.totalAmount = action.payload.totalAmount || 0;
      })
      .addCase(getPaymentsByStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      

      // ─── Get Payments by Library ───
      .addCase(getPaymentsByLibrary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentsByLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.libraryPayments = action.payload.payments || [];
        state.TotalInPagination = action.payload.totalPayments || 0;
      })
      .addCase(getPaymentsByLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ─── Make Payment in Cash ───
      .addCase(makePaymentInCash.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makePaymentInCash.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments.push(action.payload);
        state.filteredPayments.push(action.payload);
        state.totalAmount += action.payload.amount;
        state.totalPending += action.payload.numberOfMonths;
      })
      .addCase(makePaymentInCash.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
  },
});


export const { searchPayments, clearPaymentError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
