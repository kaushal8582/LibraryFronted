import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiCaller } from "../Network/api"; // your existing helper

// Define the student interface
export interface Student {
  _id: string;
  joinDate: string;
  address?: string;
  status: "active" | "inactive" | "suspended";
  fee: string;
  timing?: string;
  user: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
  };
  libraryName: string;
  libraryId?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


interface StudentState {
  students: Student[];
  student: Student | null;
  filteredStudents: Student[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: StudentState = {
  students: [],
  student: null,
  filteredStudents: [],
  isLoading: false,
  error: null,
  searchQuery: "",
};

//
// ─── ASYNC THUNKS ──────────────────────────────────────────────
//

// ✅ Get All Students
export const getStudents = createAsyncThunk(
  "students/getAll",
  async (queryParams: string, { rejectWithValue }) => {
    try {
      const res: any = await apiCaller({
        method: "GET",
        url: `/students?${queryParams}`,
        
      });
      return res.data; // should be array
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch students");
    }
  }
);

// ✅ Get Student By ID
export const getStudentById = createAsyncThunk(
  "students/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await apiCaller({
        method: "GET",
        url: `/students/${id}`,
      });
      return res.data; // should be a single student object
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch student");
    }
  }
);

// ✅ Add Student
export const addStudent = createAsyncThunk(
  "students/add",
  async (studentData: Partial<Student>, { rejectWithValue }) => {
    try {
      const res: any = await apiCaller({
        method: "POST",
        url: "/students",
        data: studentData,
      });
      return res.data; // newly created student
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to add student");
    }
  }
);

// ✅ Edit Student
export const editStudent = createAsyncThunk(
  "students/edit",
  async (
    { id, updates }: { id: string; updates: Partial<any> },
    { rejectWithValue }
  ) => {
    try {
      const res: any = await apiCaller({
        method: "PUT",
        url: `/students/${id}`,
        data: updates,
      });
      return res.data; // updated student
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update student");
    }
  }
);

// ✅ Delete Student
export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await apiCaller({
        method: "DELETE",
        url: `/students/${id}`,
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete student");
    }
  }
);

//
// ─── SLICE ────────────────────────────────────────────────────
//

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    searchStudents: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredStudents = state.students.filter((student) =>
        student.user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Get All ───
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.isLoading = false;
        state.students = action.payload;
        state.filteredStudents = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ─── Get By ID ───
      .addCase(getStudentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentById.fulfilled, (state, action: PayloadAction<Student>) => {
        state.isLoading = false;
        state.student = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ─── Add ───
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        state.isLoading = false;
        // state.students.push(action.payload);
        state.filteredStudents = state.students;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ─── Edit ───
      .addCase(editStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        state.isLoading = false;
        const index = state.students.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.students[index] = action.payload;
        state.filteredStudents = state.students;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ─── Delete ───
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.students = state.students.filter((s) => s._id !== action.payload);
        state.filteredStudents = state.students;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { searchStudents, clearError } = studentsSlice.actions;
export default studentsSlice.reducer;
