import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AccountInfo {
  libraryName: string
  contactEmail: string
  address: string
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
  account: AccountInfo
  razorpay: RazorpayIntegration
  subscription: SubscriptionInfo
}

const initialState: SettingsState = {
  account: {
    libraryName: "The Grand Library",
    contactEmail: "contact@grandlibrary.com",
    address: "123 Knowledge Ave, Wisdom City, 12345",
  },
  razorpay: {
    isConnected: true,
    apiKey: "••••••••••••••••••••",
    apiSecret: "••••••••••••••••••••",
  },
  subscription: {
    plan: "Pro Plan",
    nextBillingDate: "July 31, 2024",
  },
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateAccountInfo: (state, action: PayloadAction<AccountInfo>) => {
      state.account = action.payload
    },
    updateRazorpaySettings: (state, action: PayloadAction<RazorpayIntegration>) => {
      state.razorpay = action.payload
    },
  },
})

export const { updateAccountInfo, updateRazorpaySettings } = settingsSlice.actions
export default settingsSlice.reducer
