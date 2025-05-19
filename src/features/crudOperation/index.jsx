import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// GET users
export const getUsers = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://68273edc6b7628c5290f9f00.mockapi.io/CRUD"
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(`${error} - Something went wrong in API call`);
    }
  }
);

// POST user (you named it `addMokUser`, not a PUT)

export const addMokUser = createAsyncThunk(
  "addingUser/post",
  async (newUserData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://68273edc6b7628c5290f9f00.mockapi.io/CRUD",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "POST request failed");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deletingUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://68273edc6b7628c5290f9f00.mockapi.io/CRUD/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "DELETE request failed");
    }
  }
);

// Redux slice
const userData = createSlice({
  name: "products",
  initialState: {
    products: [],
    isProductsLoading: false,
    isProductsRejected: false,
    isProducts: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET users
    builder
      .addCase(getUsers.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = true;
        state.products = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = false;
        state.isProductsRejected = true;
        state.error = action.payload;
      });

    // POST user
    builder
      .addCase(addMokUser.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(addMokUser.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = true;
        state.products.push(action.payload);
      })
      .addCase(addMokUser.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = false;
        state.isProductsRejected = true;
        state.error = action.payload;
      });
    //delet user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isProductsLoading = false;

        const id = action.payload;
        if (id) {
          state.products = state.products.filter((user) => user.id !== id);
        }
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = false;
        state.isProductsRejected = true;
        state.error = action.payload;
      });
  },
});

export default userData.reducer;
