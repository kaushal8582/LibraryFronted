import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiCaller } from "../Network/api";

// ------------------ Types ------------------

interface MonthlyRevenue {
  month: string;
  revenue: number;
}

interface RecentPayment {
  id: string;
  name: string;
  date: string;
  amount: number;
  avatar: string;
}

interface LibrarySummary {
  totalStudents: number;
  totalPendingPayments: number;
  totalPaidPayments: number;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenue[];
  recentPayments?: RecentPayment[];
}

interface PaymentTrend {
  date: string;
  completed: number;
  pending: number;
  failed: number;
}

interface RevenueByMonth {
  month: string;
  revenue: number;
}

interface StudentGrowth {
  month: string;
  count: number;
}

interface LibraryAnalytics {
  paymentTrends: PaymentTrend[];
  revenueByMonth: RevenueByMonth[];
  studentGrowth: StudentGrowth[];
}

// ------------------ State ------------------

interface DashboardState {
  summary: LibrarySummary | null;
  analytics: LibraryAnalytics | null;
  isLoading: boolean;
  error: string | null;
  sidebarOpen: boolean;
}

const initialState: DashboardState = {
  summary: null,
  analytics: null,
  isLoading: false,
  error: null,
  sidebarOpen: false,
};

// ------------------ Async Thunks ------------------

// 📊 Get summary for library dashboard
export const fetchLibrarySummary = createAsyncThunk(
  "dashboard/fetchLibrarySummary",
  async (libraryId: string, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: LibrarySummary }>({
        method: "GET",
        url: `/dashboard/library/${libraryId}/summary`,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch library summary");
    }
  }
);

// 📈 Get analytics (payment trends, student growth, etc.)
export const fetchLibraryAnalytics = createAsyncThunk(
  "dashboard/fetchLibraryAnalytics",
  async (
    {
      libraryId,
      startDate,
      endDate,
    }: { libraryId: string; startDate?: string; endDate?: string },
    { rejectWithValue }
  ) => {
    try {
      const query = [];
      if (startDate) query.push(`startDate=${startDate}`);
      if (endDate) query.push(`endDate=${endDate}`);
      const queryString = query.length ? `?${query.join("&")}` : "";

      const response = await apiCaller<{ data: LibraryAnalytics }>({
        method: "GET",
        url: `/dashboard/library/${libraryId}/analytics${queryString}`,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch analytics");
    }
  }
);

// ------------------ Slice ------------------

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📊 Summary
      .addCase(fetchLibrarySummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchLibrarySummary.fulfilled,
        (state, action: PayloadAction<LibrarySummary>) => {
          state.isLoading = false;
          state.summary = action.payload;
        }
      )
      .addCase(fetchLibrarySummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // 📈 Analytics
      .addCase(fetchLibraryAnalytics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchLibraryAnalytics.fulfilled,
        (state, action: PayloadAction<LibraryAnalytics>) => {
          state.isLoading = false;
          state.analytics = action.payload;
        }
      )
      .addCase(fetchLibraryAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDashboardError,toggleSidebar } = dashboardSlice.actions;
export default dashboardSlice.reducer;
