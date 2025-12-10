import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiCaller } from "../Network/api";

// ------------------ Types ------------------

export interface QueryInterface {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

interface QueryState {
  queries: QueryInterface[];
  singleQuery: QueryInterface | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: QueryState = {
  queries: [],
  singleQuery: null,
  isLoading: false,
  error: null,
};

// ------------------ API Calls ------------------




// CREATE QUERY (POST)
export const createQuery = createAsyncThunk(
  "query/createQuery",
  async (payload: Omit<QueryInterface, "_id">, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: QueryInterface }>({
        method: "POST",
        url: "/query/add",
        data: payload,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create query");
    }
  }
);


//  GET ALL QUERIES
export const fetchQueries = createAsyncThunk(
  "query/fetchQueries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: QueryInterface[] }>({
        method: "GET",
        url: "/query",
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch queries");
    }
  }
);

//  GET QUERY BY ID
export const fetchQueryById = createAsyncThunk(
  "query/fetchQueryById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiCaller<{ data: QueryInterface }>({
        method: "GET",
        url: `/query/${id}`,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch query");
    }
  }
);

//  DELETE QUERY
export const deleteQuery = createAsyncThunk(
  "query/deleteQuery",
  async (id: string, { rejectWithValue }) => {
    try {
      await apiCaller({
        method: "DELETE",
        url: `/query/${id}`,
      });

      return id; // delete ke baad id return karenge list se hata denge
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete query");
    }
  }
);

//  UPDATE QUERY
export const updateQuery = createAsyncThunk(
  "query/updateQuery",
  async (
    { id, payload }: { id: string; payload: Partial<QueryInterface> },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCaller<{ data: QueryInterface }>({
        method: "PUT",
        url: `/query/${id}`,
        data: payload,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update query");
    }
  }
);

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    clearQueryError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder


    // CREATE QUERY
.addCase(createQuery.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(
  createQuery.fulfilled,
  (state, action: PayloadAction<QueryInterface>) => {
    state.isLoading = false;
    state.queries.unshift(action.payload); // newest query top par
  }
)
.addCase(createQuery.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload as string;
})

      // GET ALL
      .addCase(fetchQueries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchQueries.fulfilled,
        (state, action: PayloadAction<QueryInterface[]>) => {
          state.isLoading = false;
          state.queries = action.payload;
        }
      )
      .addCase(fetchQueries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // GET BY ID
      .addCase(fetchQueryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchQueryById.fulfilled,
        (state, action: PayloadAction<QueryInterface>) => {
          state.isLoading = false;
          state.singleQuery = action.payload;
        }
      )
      .addCase(fetchQueryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteQuery.fulfilled, (state, action) => {
        state.queries = state.queries.filter((q) => q._id !== action.payload);
      })

      // UPDATE
      .addCase(updateQuery.fulfilled, (state, action) => {
        state.queries = state.queries.map((q) =>
          q._id === action.payload._id ? action.payload : q
        );
      });
  },
});

export const { clearQueryError } = querySlice.actions;
export default querySlice.reducer;
