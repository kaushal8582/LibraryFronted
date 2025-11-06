import { createSlice } from "@reduxjs/toolkit"

interface DashboardState {
  totalStudents: number
  pendingPayments: number
  paidStudents: number
  totalRevenue: number
  monthlyRevenue: Array<{ month: string; revenue: number }>
  recentPayments: Array<{
    id: string
    name: string
    date: string
    amount: number
    avatar: string
  }>
}

const initialState: DashboardState = {
  totalStudents: 1250,
  pendingPayments: 1500,
  paidStudents: 850,
  totalRevenue: 8500,
  monthlyRevenue: [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 2800 },
    { month: "Apr", revenue: 3100 },
    { month: "May", revenue: 4200 },
    { month: "Jun", revenue: 4800 },
    { month: "Jul", revenue: 3900 },
  ],
  recentPayments: [
    {
      id: "1",
      name: "Emily White",
      date: "Oct 26, 2023",
      amount: 15,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    {
      id: "2",
      name: "David Green",
      date: "Oct 26, 2023",
      amount: 25,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      id: "3",
      name: "Sarah Blue",
      date: "Oct 25, 2023",
      amount: 15,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "4",
      name: "James Brown",
      date: "Oct 24, 2023",
      amount: 50,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    {
      id: "5",
      name: "Laura Black",
      date: "Oct 24, 2023",
      amount: 25,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
    },
  ],
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
})

export default dashboardSlice.reducer
