import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch GitHub users
export const getAllData = createAsyncThunk(
  "users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.github.com/users");
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error)
      return rejectWithValue("Something went wrong");
    }
  }
);

// Create slice
export const gitUser = createSlice({
  name: "gitUser",
  initialState: {
    user: [],
    loading: false,
    error: null, // use null or empty string
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default gitUser.reducer;
