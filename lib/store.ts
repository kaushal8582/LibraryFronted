import { configureStore } from "@reduxjs/toolkit"
import dashboardReducer from "./slices/dashboardSlice"
import studentsReducer from "./slices/studentsSlice"
import paymentsReducer from "./slices/paymentsSlice"
import remindersReducer from "./slices/remindersSlice"
import settingsReducer from "./slices/settingsSlice"
import authReducer from "./slices/authSlice"
import queryReducer from "./slices/querySlice"


export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    students: studentsReducer,
    payments: paymentsReducer,
    reminders: remindersReducer,
    settings: settingsReducer,
    auth: authReducer,
    query: queryReducer,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
