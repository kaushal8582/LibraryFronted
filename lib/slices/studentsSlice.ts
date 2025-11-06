import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Student {
  id: string
  name: string
  joinDate: string
  fee: number
  status: "Active" | "Inactive"
}

interface StudentsState {
  students: Student[]
  filteredStudents: Student[]
  searchQuery: string
}

const initialState: StudentsState = {
  students: [],
  filteredStudents: [],
  searchQuery: "",
  
}

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    ...initialState,
    filteredStudents: initialState.students,
  },
  reducers: {
    searchStudents: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.filteredStudents = state.students.filter((student) =>
        student.name.toLowerCase().includes(action.payload.toLowerCase()),
      )
    },
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload)
      state.filteredStudents = state.students
    },
  },
})

export const { searchStudents, addStudent } = studentsSlice.actions
export default studentsSlice.reducer
