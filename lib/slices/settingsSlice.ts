import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiCaller } from "../Network/api"

// ------------------ Types ------------------

export  interface AccountInfo {
  name: string
  contactEmail: string
  address: string
  contactPhone: string
  userName : string
  profileImg: string
}

interface RazorpayIntegration {
  isConnected: boolean
  apiKey: string
  apiSecret: string
}

interface SubscriptionInfo {
  plan: string
  nextBillingDate: string
}

interface SettingsState {
  account: AccountInfo | null
  razorpay: RazorpayIntegration | null
  subscription: SubscriptionInfo | null
  isLoading: boolean
  error: string | null
}

// ------------------ Initial State ------------------

const initialState: SettingsState = {
  account: null,
  razorpay: null,
  subscription: null,
  isLoading: false,
  error: null,
}

// ------------------ Async Thunks ------------------

// GET full settings
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (libraryId: string, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: SettingsState }>({
        method: "GET",
        url: `/settings/${libraryId}`,
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch settings")
    }
  }
)

// UPDATE account info
export const updateAccount = createAsyncThunk(
  "settings/updateAccount",
  async (
    { libraryId, data }: { libraryId: string; data: AccountInfo | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCaller<{ data: AccountInfo }>({
        method: "PUT",
        url: `/libraries/${libraryId}`,
        data,
        
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update account")
    }
  }
)

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
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update Razorpay settings")
    }
  }
)

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
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update subscription")
    }
  }
)

// ------------------ Slice ------------------

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSettingsError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 Fetch Settings
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false
        state.account = action.payload.account
        state.razorpay = action.payload.razorpay
        state.subscription = action.payload.subscription
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

      // 📌 Update Account
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.account = action.payload
      })

      // 📌 Update Razorpay
      .addCase(updateRazorpay.fulfilled, (state, action) => {
        state.razorpay = action.payload
      })

      // 📌 Update Subscription
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.subscription = action.payload
      })
  },
})

export const { clearSettingsError } = settingsSlice.actions
export default settingsSlice.reducer
