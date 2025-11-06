import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Payment {
  id: string
  studentName: string
  amount: number
  transactionId: string
  date: string
  status: "Paid" | "Pending"
}

interface PaymentsState {
  payments: Payment[]
  currentPage: number
  itemsPerPage: number
  dateFilter: string
}

const initialState: PaymentsState = {
  payments: [
    {
      id: "1",
      studentName: "Olivia Martin",
      amount: 15,
      transactionId: "TXN-12345678",
      date: "Jan 20, 2024",
      status: "Paid",
    },
    {
      id: "2",
      studentName: "Liam Johnson",
      amount: 25,
      transactionId: "TXN-23456789",
      date: "Jan 19, 2024",
      status: "Pending",
    },
    {
      id: "3",
      studentName: "Sophia Williams",
      amount: 10,
      transactionId: "TXN-34567890",
      date: "Jan 18, 2024",
      status: "Paid",
    },
    {
      id: "4",
      studentName: "Noah Brown",
      amount: 30,
      transactionId: "TXN-45678901",
      date: "Jan 17, 2024",
      status: "Paid",
    },
    {
      id: "5",
      studentName: "Ava Jones",
      amount: 5,
      transactionId: "TXN-56789012",
      date: "Jan 16, 2024",
      status: "Pending",
    },
    {
      id: "6",
      studentName: "Emma White",
      amount: 20,
      transactionId: "TXN-67890123",
      date: "Jan 15, 2024",
      status: "Paid",
    },
    {
      id: "7",
      studentName: "Oliver Taylor",
      amount: 35,
      transactionId: "TXN-78901234",
      date: "Jan 14, 2024",
      status: "Paid",
    },
    {
      id: "8",
      studentName: "Charlotte Davis",
      amount: 12,
      transactionId: "TXN-89012345",
      date: "Jan 13, 2024",
      status: "Pending",
    },
  ],
  currentPage: 1,
  itemsPerPage: 5,
  dateFilter: "Last 30 Days",
}

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setDateFilter: (state, action: PayloadAction<string>) => {
      state.dateFilter = action.payload
    },
  },
})

export const { setCurrentPage, setDateFilter } = paymentsSlice.actions
export default paymentsSlice.reducer
