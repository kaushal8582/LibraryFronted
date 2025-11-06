import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ReminderSettings {
  emailReminders: boolean
  smsReminders: boolean
  whatsappReminders: boolean
  frequency: string
  timing: string
}

interface RemindersState {
  settings: ReminderSettings
  previewTab: "Email" | "SMS" | "WhatsApp"
}

const initialState: RemindersState = {
  settings: {
    emailReminders: true,
    smsReminders: false,
    whatsappReminders: false,
    frequency: "Weekly",
    timing: "3 days before due date",
  },
  previewTab: "Email",
}

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    toggleEmailReminders: (state) => {
      state.settings.emailReminders = !state.settings.emailReminders
    },
    toggleSmsReminders: (state) => {
      state.settings.smsReminders = !state.settings.smsReminders
    },
    toggleWhatsappReminders: (state) => {
      state.settings.whatsappReminders = !state.settings.whatsappReminders
    },
    setFrequency: (state, action: PayloadAction<string>) => {
      state.settings.frequency = action.payload
    },
    setTiming: (state, action: PayloadAction<string>) => {
      state.settings.timing = action.payload
    },
    setPreviewTab: (state, action: PayloadAction<"Email" | "SMS" | "WhatsApp">) => {
      state.previewTab = action.payload
    },
  },
})

export const {
  toggleEmailReminders,
  toggleSmsReminders,
  toggleWhatsappReminders,
  setFrequency,
  setTiming,
  setPreviewTab,
} = remindersSlice.actions
export default remindersSlice.reducer
