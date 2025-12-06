import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiCaller } from "../Network/api";

// ------------------ Types ------------------

export interface AccountInfo {
  name: string;
  contactEmail: string;
  address: string;
  contactPhone: string;
  userName: string;
  profileImg: string;
  heroImage?: string;
  aboutLibrary?: string;
  bio?: string;
}

interface RazorpayIntegration {
  isConnected: boolean;
  apiKey: string;
  apiSecret: string;
}

interface SubscriptionInfo {
  plan: string;
  nextBillingDate: string;
}

interface SettingsState {
  account: AccountInfo | null;
  razorpay: RazorpayIntegration | null;
  subscription: SubscriptionInfo | null;
  isLoading: boolean;
  error: string | null;
  libraries: any[] | null;
  libraryLoading: boolean;

  libraryDetails: any | null;
  libraryDetailsLoading: boolean;
}

// ------------------ Initial State ------------------

const initialState: SettingsState = {
  account: null,
  razorpay: null,
  subscription: null,
  isLoading: false,
  error: null,
  libraries: null,
  libraryLoading: false,

  libraryDetails: null,
  libraryDetailsLoading: false,
};

// ------------------ Async Thunks ------------------

// GET full settings
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (libraryId: string, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: SettingsState }>({
        method: "GET",
        url: `/settings/${libraryId}`,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch settings");
    }
  }
);

// UPDATE account info
export const updateAccount = createAsyncThunk(
  "settings/updateAccount",
  async (
    { libraryId, data }: { libraryId: string; data: any | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCaller<{ data: any }>({
        method: "PUT",
        url: `/libraries/${libraryId}`,
        data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update account");
    }
  }
);

// UPDATE Razorpay settings
export const updateRazorpay = createAsyncThunk(
  "settings/updateRazorpay",
  async (
    { libraryId, data }: { libraryId: string; data: RazorpayIntegration },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCaller<{ data: RazorpayIntegration }>({
        method: "PUT",
        url: `/settings/${libraryId}/razorpay`,
        data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to update Razorpay settings"
      );
    }
  }
);

// UPDATE Subscription
export const updateSubscription = createAsyncThunk(
  "settings/updateSubscription",
  async (
    { libraryId, data }: { libraryId: string; data: SubscriptionInfo },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCaller<{ data: SubscriptionInfo }>({
        method: "PUT",
        url: `/settings/${libraryId}/subscription`,
        data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update subscription");
    }
  }
);

// Filter Libraries
export const filterLibraries = createAsyncThunk(
  "settings/filterLibraries",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: any }>({
        method: "POST",
        url: `/libraries/filter/libraries`,
        data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update subscription");
    }
  }
);

// get library details
export const getLibraryById = createAsyncThunk(
  "settings/libraryDetails",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: any }>({
        method: "GET",
        url: `/libraries/${data.id}`,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update subscription");
    }
  }
);

// ------------------ Slice ------------------

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSettingsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 Fetch Settings
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.account = action.payload.account;
        state.razorpay = action.payload.razorpay;
        state.subscription = action.payload.subscription;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // 📌 Update Account
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.account = action.payload;
      })

      // 📌 Update Razorpay
      .addCase(updateRazorpay.fulfilled, (state, action) => {
        state.razorpay = action.payload;
      })

      // 📌 Update Subscription
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.subscription = action.payload;
      })

      // 📌 Filter Libraries
      .addCase(filterLibraries.fulfilled, (state, action) => {
        state.libraries = action.payload;
        state.libraryLoading = false;
      })
      .addCase(filterLibraries.pending, (state) => {
        state.libraryLoading = true;
      })
      .addCase(filterLibraries.rejected, (state, action) => {
        state.libraryLoading = false;
        state.error = action.payload as string;
      })

      //  Get Library By ID
      .addCase(getLibraryById.fulfilled, (state, action) => {
        state.libraryDetails = action.payload; 
        state.libraryDetailsLoading = false; 
      })
      .addCase(getLibraryById.pending, (state) => {
        state.libraryDetailsLoading = true; 
      })
      .addCase(getLibraryById.rejected, (state, action) => {
        state.libraryDetailsLoading = false; 
        state.error = action.payload as string;
      });
  },
});

export const { clearSettingsError } = settingsSlice.actions;
export default settingsSlice.reducer;
