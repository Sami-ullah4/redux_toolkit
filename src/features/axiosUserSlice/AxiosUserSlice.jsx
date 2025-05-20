import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserApi } from "../../axiosCalling";
import { isAxiosError } from "axios";
//get Request
export const getDataUser = createAsyncThunk(
  "gettingUser/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "Axios error occurred"
        );
      }

      return rejectWithValue(error.message || "Failed to get user from API");
    }
  }
);

// Slice
const userData = createSlice({
  name: "apiUser",
  initialState: {
    users: [],
    isRejected: false,
    isAxiosError: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataUser.pending, (state) => {
        state.isLoading = true;
        state.isRejected = false;
        state.isAxiosError = false;
      })
      .addCase(getDataUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getDataUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.isAxiosError = true;
        console.error("Error fetching users:", action.payload);
      });
  },
});

export default userData.reducer;
