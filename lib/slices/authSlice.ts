import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiCaller } from "../Network/api";

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LibraryData {
  _id: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
  subscriptionStatus: "pending" | "active" | "canceled" | string; // can expand
  settings: {
    notificationChannels: {
      email: boolean;
      sms: boolean;
    };
    reminderFrequency: "daily" | "weekly" | "monthly" | string;
    paymentGateway: "razorpay" | "stripe" | "paypal" | string;
  };
  isActive: boolean;
  createdAt: string;
  address : string;
}

interface UserFullData {
  _id: string;
  name: string;
  email: string;
  avtar : string;
  role: "librarian" | "admin" | "student" | string;
  phone: string;
  libraryId: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  libraryData: LibraryData;
  studentData : {
    address : string;
    fee : string;
    joinDate : string;
    status : "active" | "inactive" | string;
    timing : string;
    userId : string;
    _id : string;
    nextDueDate : string;
    isPaymentDoneForThisMonth : boolean;
    avtar : string;
  }
}


interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  userFullData : UserFullData | null,
  libraries : LibraryData[]
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UpdatePasswordCredentials {
  oldPassword: string;
  newPassword: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  userFullData : null,
  libraries : []
};

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response:any = await apiCaller<{ user: User; token: string }>({
        method: "POST",
        url: "/auth/login",
        data: credentials,
      });
      
      // Store token in localStorage
      console.log("response",response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
       return {
        user: response.data.user,
        token: response.data.accessToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (credentials: UpdatePasswordCredentials, { rejectWithValue }) => {
    try {
      const response:any = await apiCaller<{ user: User; token: string }>({
        method: "POST",
        url: "/auth/update-password",
        data: credentials,
      });
       return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Update password failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ user: User; token: string }>({
        method: "POST",
        url: "/auth/register",
        data: credentials,
      });
      
      // Store token in localStorage
      localStorage.setItem("accessToken", response.token);
      console.log("response",response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Call logout endpoint if your API requires it
      await apiCaller({
        method: "POST",
        url: "/auth/logout",
      });
      
      // Remove token from localStorage
      localStorage.removeItem("accessToken");
      
      return null;
    } catch (error: any) {
      // Even if API call fails, we should still clear local state
      localStorage.removeItem("accessToken");
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: UserFullData }>({
        method: "GET",
        url: "/auth/info",
      });

      console.log("response ",response);
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: UserFullData }>({
        method: "POST",
        url: "/auth/forgot-password",
        data : {
          email
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: UserFullData }>({
        method: "POST",
        url: "/auth/reset-password",
        data : data
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);
export const fetchAllLibrary = createAsyncThunk(
  "auth/fetchAllLibrary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: LibraryData[] }>({
        method: "GET",
        url: "/libraries",
      });

      console.log("response ",response);
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch libraries");
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        console.log("loginUser.fulfilled",action);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        console.log("registerUser.fulfilled",action.payload);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      
      // Fetch current user cases
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<UserFullData>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userFullData = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch all libraries cases
      .addCase(fetchAllLibrary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllLibrary.fulfilled, (state, action: PayloadAction<LibraryData[]>) => {
        state.isLoading = false;
        state.libraries = action.payload;
      })
      .addCase(fetchAllLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // update password cases
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // rest password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })


  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;